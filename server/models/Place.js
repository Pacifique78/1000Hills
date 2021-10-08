import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    name: { type: String, unique: true, required: true },
    albumNumber: { type: String, required: true },
    description: { type: String, required: true },
    images: [String],
  },
  { timestamps: true }
);
const Place = mongoose.model("Place", schema);
export default Place;
