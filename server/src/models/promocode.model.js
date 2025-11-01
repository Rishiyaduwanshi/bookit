import mongoose from "mongoose";

const promoCodeSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true },
    discountPercentage: { type: Number, required: true, min: 0, max: 100 }, 
    minAmount: { type: Number, default: 0 },
    validTill: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("PromoCode", promoCodeSchema);
