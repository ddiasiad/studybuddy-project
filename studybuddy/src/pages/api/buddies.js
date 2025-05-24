// API route to fetch all users for dashboard suggestions
import clientPromise from '../../lib/mongodb';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  try {
    const client = await clientPromise;
    const db = client.db('studybuddy');
    if (req.query.id) {
      // Fetch a single buddy by id
      const buddy = await db.collection('users').findOne({ _id: new ObjectId(req.query.id) }, { projection: { password: 0 } });
      if (!buddy) return res.status(404).json({ message: 'User not found' });
      return res.status(200).json({ buddy });
    }
    // Exclude password field for security
    const users = await db.collection('users').find({}, { projection: { password: 0 } }).toArray();
    res.status(200).json({ buddies: users });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch buddies' });
  }
}
