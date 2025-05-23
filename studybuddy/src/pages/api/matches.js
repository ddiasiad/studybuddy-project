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

    const myProfile = await db.collection('profiles').findOne({ userId: currentUser.userId.toString() });
    if (!myProfile) return res.status(404).json({ message: 'Your profile was not found' });

    const allProfiles = await db.collection('profiles').find({
      userId: { $ne: currentUser.userId }
    }).toArray();

    // Step 1: Score matches
    const rawMatches = allProfiles
      .map(profile => {
        const sharedCourses = Array.isArray(myProfile.courses) && Array.isArray(profile.courses)
          ? myProfile.courses.filter(c => profile.courses.includes(c))
          : [];

        const sharedAvailability = Array.isArray(myProfile.availability) && Array.isArray(profile.availability)
          ? myProfile.availability.filter(a => profile.availability.includes(a))
          : [];

        const score = sharedCourses.length * 2 + sharedAvailability.length;

        return {
          userId: profile.userId.toString(),
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
        fullName: user?.fullName || 'Unknown',
        photo: user?.photo || null 
      };
    });

    return res.status(200).json({ matches });
  } catch (err) {
    console.error('🔥 Server error in /api/matches:', err);
    return res.status(500).json({ message: 'Internal server error' });
  }
}
