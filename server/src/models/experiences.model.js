import mongoose from 'mongoose';

const experiencesSchema = mongoose.Schema(
  {
    name: { type: String },
    location: { type: String },
    about: { type: String },
    imgSrc: { type: String },
    description: { type: String },
    price: { type: Number },
    tax: { type: Number },
  },
  { timestamps: true }
);

export default mongoose.model('Experience', experiencesSchema);
