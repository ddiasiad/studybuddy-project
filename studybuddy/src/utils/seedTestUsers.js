// Script to seed test users into MongoDB for presentation/demo
// Usage: node src/utils/seedTestUsers.js

const { MongoClient } = require('mongodb');
const bcrypt = require('bcryptjs');

const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/studybuddy';
const client = new MongoClient(uri);

async function seed() {
  try {
    await client.connect();
    const db = client.db('studybuddy');
    const users = db.collection('users');

    // Test users to insert (without hashed passwords yet)
    const testUsersRaw = [
      {
        fullName: 'Alice Example',
        email: 'alice@example.com',
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
        university: 'Test Institute',
        field: 'Mathematics',
        year: '3',
        courses: 'Algebra,Statistics',
        interests: 'Data Science,Math',
        environment: 'Group-Setting',
        createdAt: new Date(),
      },
      {
        fullName: 'Diana Demo',
        email: 'diana@example.com',
        university: 'Demo University',
        field: 'Physics',
        year: '4',
        courses: 'Physics,Math',
        interests: 'Quantum,Astro',
        environment: 'On-Campus',
        createdAt: new Date(),
      },
      {
        fullName: 'Ethan Test',
        email: 'ethan@example.com',
        university: 'Sample College',
        field: 'Biology',
        year: '1',
        courses: 'Biology,Chemistry',
        interests: 'Genetics,Ecology',
        environment: 'Online',
        createdAt: new Date(),
      },
      {
        fullName: 'Fiona Filter',
        email: 'fiona@example.com',
        university: 'Test Institute',
        field: 'Engineering',
        year: '2',
        courses: 'Robotics,Math',
        interests: 'AI,Robotics',
        environment: 'Group-Setting',
        createdAt: new Date(),
      },
      {
        fullName: 'George Group',
        email: 'george@example.com',
        university: 'Demo University',
        field: 'Computer Science',
        year: '3',
        courses: 'Math,Programming',
        interests: 'ML,Programming',
        environment: 'Group-Setting',
        createdAt: new Date(),
      },
      {
        fullName: 'Hannah Hybrid',
        email: 'hannah@example.com',
        university: 'Sample College',
        field: 'Physics',
        year: '4',
        courses: 'Physics,Math',
        interests: 'Astro,Quantum',
        environment: 'Online',
        createdAt: new Date(),
      },
      {
        fullName: 'Ivan InPerson',
        email: 'ivan@example.com',
        university: 'Test Institute',
        field: 'Mathematics',
        year: '1',
        courses: 'Statistics,Algebra',
        interests: 'Math,Data Science',
        environment: 'On-Campus',
        createdAt: new Date(),
      },
      {
        fullName: 'Julia Joiner',
        email: 'julia@example.com',
        university: 'Demo University',
        field: 'Engineering',
        year: '2',
        courses: 'Robotics,Physics',
        interests: 'Robotics,AI',
        environment: 'Online',
        createdAt: new Date(),
      },
    ];

    // Add hashed passwords
    const testUsers = await Promise.all(
      testUsersRaw.map(async user => ({
        ...user,
        password: await bcrypt.hash('Password123', 10),
      })),
    );

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
