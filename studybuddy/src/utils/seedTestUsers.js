// Script to seed test users into MongoDB for presentation/demo
// Usage: node src/utils/seedTestUsers.js

require('dotenv').config();

const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const uri = process.env.MONGODB_URI;
const client = new MongoClient(uri);

async function seed() {
  try {
    await client.connect();
    const db = client.db('studybuddy');
    const users = db.collection('users');

    // Test users to insert
    const testUsers = [
      {
        fullName: 'Alice Example',
        email: 'alice@example.com',
        password: await bcrypt.hash('Password123', 10),
        university: 'Demo University',
        field: 'Computer Science',
        year: '1',
        courses: 'Math,Physics',
        interests: 'AI,ML',
        environment: 'Online',
        createdAt: new Date(),
      },
      {
        fullName: 'Bob Example',
        email: 'bob@example.com',
        password: await bcrypt.hash('Password123', 10),
        university: 'Sample College',
        field: 'Engineering',
        year: '2',
        courses: 'Chemistry,Biology',
        interests: 'Robotics,IoT',
        environment: 'On-Campus',
        createdAt: new Date(),
      },
      {
        fullName: 'Charlie Example',
        email: 'charlie@example.com',
        password: await bcrypt.hash('Password123', 10),
        university: 'Test Institute',
        field: 'Mathematics',
        year: '3',
        courses: 'Algebra,Statistics',
        interests: 'Data Science,Math',
        environment: 'Group-Setting',
        createdAt: new Date(),
      },
    ];

    // Remove existing test users (by email)
    await users.deleteMany({ email: { $in: testUsers.map(u => u.email) } });
    // Insert test users
    await users.insertMany(testUsers);
    console.log('✅ Test users seeded successfully!');
  } catch (err) {
    console.error('❌ Error seeding test users:', err);
  } finally {
    await client.close();
  }
}

seed();
