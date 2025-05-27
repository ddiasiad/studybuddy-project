import clientPromise from '../../lib/mongodb';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    return res.status(401).json({ message: 'Missing or invalid token' });
  }

  let userData;
  try {
    userData = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(403).json({ message: 'Invalid or expired token' });
  }

  const client = await clientPromise;
  const db = client.db('studybuddy');
  const userId = userData.userId;

  if (req.method === 'POST') {
    const {
      fullName,
      university,
      year,
      field,
      availability,
      academicYear,
      courses,
      studyPreferences,
      studyInterests,
      studyEnvironment,
    } = req.body;

    try {
      await db.collection('users').updateOne(
        { _id: new ObjectId(userId) },
        {
          $set: {
            fullName,
            university,
            year,
            field,
            availability,
            academicYear,
            courses,
            studyPreferences,
            studyInterests,
            studyEnvironment,
            updatedAt: new Date(),
          },
        },
        { upsert: false }
      );

      return res.status(200).json({ message: 'Profile saved successfully' });
    } catch (err) {
      return res.status(500).json({ message: 'Error saving profile' });
    }
  }

  if (req.method === 'GET') {
    try {
      const user = await db.collection('users').findOne({ _id: new ObjectId(userId) });

      if (!user) {
        return res.status(404).json({ message: 'Profile not found' });
      }

      return res.status(200).json(user);
    } catch (err) {
      return res.status(500).json({ message: 'Error retrieving profile' });
    }
  }

  res.status(405).json({ message: 'Method not allowed' });
}
