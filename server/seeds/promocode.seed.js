import fs from 'fs';
import path from 'path';
import '../db/connectDb.js';
import Promocode from '../src/models/promocode.model.js';

const seedData = async () => {
  try {
    const dataPath = path.join(process.cwd(), 'data', 'promocode.json');
    const jsonData = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
    await Promocode.deleteMany({});
    console.log('🧹 Old data deleted.');
    await Promocode.insertMany(jsonData);
    console.log(`✅ Inserted ${jsonData.length} promocodes.`);
    process.exit(0);
  } catch (error) {
    console.error('❌ Seeding failed:', error);
    process.exit(1);
  }
};

await seedData();
