import clientPromise from '../../../lib/mongodb';
import { hash } from 'bcryptjs';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  // All fields from the registration form
  const { fullName, email, password, university, field, year, courses, interests, environment } = req.body;

  if (!fullName || !email || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
  }

  try {
    // This uses the connection string in .env.local (MONGODB_URI)
    // For localhost, ensure .env.local has: mongodb://localhost:27017/studybuddy
    const client = await clientPromise;
    const db = client.db('studybuddy');

    const existingUser = await db.collection('users').findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await hash(password, 10);

    // Store all registration fields in the user document
    const result = await db.collection('users').insertOne({
      fullName,
      email,
      password: hashedPassword,
      university: university || '',
      field: field || '',
      year: year || '',
      courses: courses || '',
      interests: interests || '',
      environment: environment || '',
      createdAt: new Date(),
    });

    res.status(201).json({ message: 'User registered successfully', userId: result.insertedId });
  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
