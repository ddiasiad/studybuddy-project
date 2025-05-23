import clientPromise from '@/lib/mongodb';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Missing token' });

  let user;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }

  const { sessionId, newStatus } = req.body;

  if (!sessionId || !newStatus) {
    return res.status(400).json({ message: 'Missing sessionId or newStatus' });
  }

  console.log('🧪 Incoming sessionId:', sessionId);

  if (!ObjectId.isValid(sessionId)) {
    return res.status(400).json({ message: 'Invalid sessionId format' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('studybuddy');

    const result = await db.collection('sessions').updateOne(
      { _id: new ObjectId(sessionId) },
      { $set: { status: newStatus } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: 'Session not found or not updated' });
    }

    return res.status(200).json({ message: 'Session status updated' });
  } catch (err) {
    console.error('❌ Error updating session:', err);
    return res.status(500).json({ message: 'Server error' });
  }
}