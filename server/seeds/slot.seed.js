import '../db/connectDb.js';
import dayjs from 'dayjs';
import Experience from '../src/models/experiences.model.js';
import Slot from '../src/models/slot.model.js';

const seedSlots = async () => {
  try {
    const experiences = await Experience.find({});
    if (!experiences.length) {
      console.log('❌ No experiences found. Seed experiences first.');
      process.exit(1);
    }

    await Slot.deleteMany({});
    console.log('🧹 Old slots deleted.');

    const slotsData = [];

    experiences.forEach(exp => {
      slotsData.push(
        {
          experienceId: exp._id,
          date: dayjs().add(1, 'day').format('YYYY-MM-DD'),
          time: '09:00 AM',
          totalSeats: 10,
          bookedSeats: 0,
        },
        {
          experienceId: exp._id,
          date: dayjs().add(2, 'day').format('YYYY-MM-DD'),
          time: '02:00 PM',
          totalSeats: 10,
          bookedSeats: 0,
        },
        {
          experienceId: exp._id,
          date: dayjs().add(3, 'day').format('YYYY-MM-DD'),
          time: '06:00 PM',
          totalSeats: 10,
          bookedSeats: 0,
        },
        {
          experienceId: exp._id,
          date: dayjs().add(4, 'day').format('YYYY-MM-DD'),
          time: '03:00 PM',
          totalSeats: 10,
          bookedSeats: 0,
        }
      );
    });

    await Slot.insertMany(slotsData);
    console.log(`✅ Inserted ${slotsData.length} slots.`);
  } catch (error) {
    console.error('❌ Slot seeding failed:', error);
  } finally {
    process.exit(0);
  }
};

await seedSlots();
