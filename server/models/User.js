import mongoose from "mongoose";

const schema = mongoose.Schema(
  {
    name: String,
    email: { type: String, unique: true, required: true },
    phone: { type: String, required: true },
    password: String,
    subscribed: { type: Boolean, default: true },
    isAdmin: { type: Boolean, default: false },
  },
  { timestamps: true }
);
const User = mongoose.model("User", schema);
export default User;
