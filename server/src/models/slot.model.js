import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema(
  {
    experienceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Experience',
      required: true,
    },
    date: { type: String, required: true },
    time: { type: String, required: true },
    totalSeats: { type: Number, default: 10 },
    bookedSeats: { type: Number, default: 0 },
  },
  { timestamps: true }
);

slotSchema.index({ experienceId: 1, date: 1, time: 1 }, { unique: true });

export default mongoose.model('Slot', slotSchema);
