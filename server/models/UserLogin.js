import mongoose from 'mongoose';

const schema = mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    numberOfTimes: { type: Number, default: 1 },
  },
  { timestamps: true }
);
const UserLogin = mongoose.model('UserLogin', schema);
export default UserLogin;
