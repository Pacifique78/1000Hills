import mongoose from 'mongoose';

const schema = mongoose.Schema(
  {
    email: String,
    name: String,
    phone: String,
    message: String,
    reply: { type: String, default: '' },
  },
  { timestamps: true }
);
const Message = mongoose.model('Message', schema);
export default Message;
