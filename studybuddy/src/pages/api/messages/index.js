import clientPromise from '@/lib/mongodb';
import jwt from 'jsonwebtoken';
import { ObjectId } from 'mongodb';

export default async function handler(req, res) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) return res.status(401).json({ message: 'Missing token' });

  let currentUser;
  try {
    currentUser = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(403).json({ message: 'Invalid token' });
  }

  const client = await clientPromise;
  const db = client.db('studybuddy');

  if (req.method === 'GET') {
    const partnerId = req.query.partnerId;
    if (!partnerId) return res.status(400).json({ message: 'Missing partnerId' });

    const messages = await db.collection('messages')
      .find({
        $or: [
          { senderId: currentUser.userId, recipientId: partnerId },
          { senderId: partnerId, recipientId: currentUser.userId }
        ]
      })
      .sort({ createdAt: 1 })
      .toArray();

    const formatted = messages.map(msg => ({
      id: msg._id,
      fromSelf: msg.senderId === currentUser.userId,
      text: msg.text,
      timestamp: msg.createdAt
    }));

    return res.status(200).json({ messages: formatted });
  }

  if (req.method === 'POST') {
    const { recipientId, text } = req.body;
    if (!recipientId || !text) {
      return res.status(400).json({ message: 'Missing recipientId or text' });
    }

    const newMessage = {
      senderId: currentUser.userId,
      recipientId,
      text,
      createdAt: new Date()
    };

    const result = await db.collection('messages').insertOne(newMessage);

    return res.status(201).json({
      message: 'Message sent',
      insertedId: result.insertedId
    });
  }

  return res.status(405).json({ message: 'Method not allowed' });
}
