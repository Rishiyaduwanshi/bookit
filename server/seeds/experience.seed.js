import fs from 'fs';
import path from 'path';
import '../db/connectDb.js';
import Experience from '../src/models/experiences.model.js';

const seedData = async () => {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'experiences.json');
    const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    await Experience.deleteMany({});
    console.log('🧹 Old data deleted.');
    await Experience.insertMany(jsonData);
    console.log(`✅ Inserted ${jsonData.length} experiences.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

await seedData();
