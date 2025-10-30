import mongoose from "mongoose";

const promoCodeSchema = new mongoose.Schema(
  {
    code: { type: String, required: true, unique: true, uppercase: true },
    discount: { type: Number, required: true }, 
    minAmount: { type: Number, default: 0 },
    validTill: { type: Date, required: true },
    isActive: { type: Boolean, default: true },
  },
  { timestamps: true }
);

export default mongoose.model("PromoCode", promoCodeSchema);
