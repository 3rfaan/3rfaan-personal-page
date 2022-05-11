import mongoose, { Schema } from "mongoose";

const CardSchema = new Schema(
  {
    img_ar: {
      type: String,
      required: true,
      unique: true,
    },
    img_en: {
      type: String,
      required: true,
      unique: true,
    },
    firebase_ar: {
      type: String,
      required: true,
    },
    firebase_en: {
      type: String,
      required: true,
    },
    tags_ar: [String],
    tags_en: [String],
  },
  { timestamps: true }
);

export default mongoose.models.Card || mongoose.model("Card", CardSchema);
