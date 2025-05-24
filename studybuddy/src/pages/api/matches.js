import clientPromise from '../../lib/mongodb';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  try {
    const token = req.headers.authorization?.split(' ')[1];
    if (!token) return res.status(401).json({ message: 'Missing token' });

    console.log('🔐 Incoming token:', token);
    console.log('🔐 JWT_SECRET:', process.env.JWT_SECRET);

    let currentUser;
    try {
      currentUser = jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
      return res.status(403).json({ message: 'Invalid token' });
    }

    const client = await clientPromise;
    const db = client.db('studybuddy');

    // Switch to users collection
    const myProfile = await db.collection('users').findOne({ _id: new ObjectId(currentUser.userId) });
    if (!myProfile) return res.status(404).json({ message: 'Your profile was not found' });

    const allProfiles = await db.collection('users').find({ _id: { $ne: new ObjectId(currentUser.userId) } }).toArray();

    // Step 1: Score matches
    const rawMatches = allProfiles
      .map(profile => {
        // courses and availability may be stored as comma-separated strings, so split if needed
        const myCourses = Array.isArray(myProfile.courses) ? myProfile.courses : (myProfile.courses ? myProfile.courses.split(',').map(c => c.trim()) : []);
        const theirCourses = Array.isArray(profile.courses) ? profile.courses : (profile.courses ? profile.courses.split(',').map(c => c.trim()) : []);
        const sharedCourses = myCourses.filter(c => theirCourses.includes(c));

        const myAvailability = Array.isArray(myProfile.availability) ? myProfile.availability : (myProfile.availability ? myProfile.availability.split(',').map(a => a.trim()) : []);
        const theirAvailability = Array.isArray(profile.availability) ? profile.availability : (profile.availability ? profile.availability.split(',').map(a => a.trim()) : []);
        const sharedAvailability = myAvailability.filter(a => theirAvailability.includes(a));

        const score = sharedCourses.length * 2 + sharedAvailability.length;

        return {
          userId: profile._id.toString(),
          sharedCourses,
          sharedAvailability,
          score
        };
      })
      .filter(m => m.score > 0)
      .sort((a, b) => b.score - a.score);

    const validIds = rawMatches
      .map(m => {
        try {
          return new ObjectId(m.userId);
        } catch {
          return null;
        }
      })
      .filter(Boolean); // remove nulls
    
    const userDocs = await db.collection('users').find({ _id: { $in: validIds } }).toArray();
    
    // Step 3: Attach fullName to each match
    const matches = rawMatches.map(match => {
      const user = userDocs.find(u => u._id.toString() === match.userId);
      return {
        ...match,
        fullName: user?.fullName || user?.name || 'Unknown',
        photo: user?.photo || null 
      };
    });

    return res.status(200).json({ matches });
  } catch (err) {
    console.error('🔥 Server error in /api/matches:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
