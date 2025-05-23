import clientPromise from '@/lib/mongodb';
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  } 

  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Missing token' });

  let user;
  try {
    user = jwt.verify(token, process.env.JWT_SECRET);
  } catch {
    return res.status(403).json({ message: 'Invalid token' });
  }

  const { recipientId, date, time } = req.body;
  if (!recipientId || !date || !time) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    const client = await clientPromise;
    const db = client.db('studybuddy');

    const session = {
      senderId: user.userId,
      recipientId,
      date,
      time,
      createdAt: new Date(),
      status: 'pending'
    };

    const result = await db.collection('sessions').insertOne(session);

    return res.status(201).json({
      message: 'Session scheduled',
      insertedId: result.insertedId, // ✅ important for Accept/Decline to work
    });

  } catch (err) {
    console.error('❌ Failed to insert session:', err);
    return res.status(500).json({ message: 'Server error' });
  }
}
