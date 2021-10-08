import checkPassword from '../helpers/checkPassword.js';
import generateToken from '../helpers/generateToken.js';
import hashPassword from '../helpers/hashPassword.js';
import { sendEmail } from '../helpers/mailsender.js';
import Message from '../models/Message.js';
import User from '../models/User.js';
import UserLogin from '../models/UserLogin.js';

export const signUp = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const userFound = await User.findOne({ email: email });
    if (userFound) {
      return res.status(409).json({
        status: 409,
        error: 'User with this email exists',
      });
    } else {
      const hashedPassword = hashPassword(password);
      let newUser = new User({
        name: name,
        email: email,
        phone: phone,
        password: hashedPassword,
      });
      const user = await newUser.save();
      const myUser = { ...user }._doc;
      delete myUser.password;
      const { _id } = myUser;
      const token = generateToken(_id, name, email, false);
      let data = [myUser];
      data = {
        ...myUser,
        token,
      };
      return res.status(201).json({
        status: 201,
        message: 'Account created...',
        results: data,
      });
    }
  } catch (error) {
    return res.status(500).json({
      status: 500,
      error: error.message,
    });
  }
};
export const signIn = async (req, res) => {
  const { email, password } = req.body;
  const userFound = await User.findOne({ email: email });
  if (userFound && checkPassword(password, userFound.password)) {
    const { _id, name, isAdmin } = userFound;
    const currentDate = new Date().toISOString().split('T')[0];
    const userLogins = await UserLogin.findOne({
      user: _id,
      createdAt: { $gte: currentDate, $lte: currentDate + 'T23:59:59' },
    });
    if (userLogins) {
      await UserLogin.findByIdAndUpdate(
        { _id: userLogins._id },
        { $inc: { numberOfTimes: 1 } }
      );
    } else {
      const newUserLogins = new UserLogin({
        user: _id,
      });
      await newUserLogins.save();
    }
    const token = generateToken(_id, name, email, isAdmin);
    const user = { ...userFound }._doc;
    delete user.password;
    const data = {
      ...user,
      token,
    };
    return res.status(200).json({
      status: 200,
      message: 'Logged in successfully',
      results: data,
    });
  }
  return res.status(401).json({
    status: 401,
    error: 'Invalid email/ password',
  });
};
export const newUsers = async (req, res) => {
  const currentDate = new Date().toISOString().split('T')[0];
  const users = await User.find({
    createdAt: { $gte: currentDate, $lte: currentDate + 'T23:59:59' },
  });
  return res.status(200).json({
    status: 200,
    message: "Today's users",
    results: users,
  });
};
export const activeUsers = async (req, res) => {
  const currentDate = new Date().toISOString().split('T')[0];
  const users = await UserLogin.find({
    createdAt: { $gte: currentDate, $lte: currentDate + 'T23:59:59' },
  }).populate('user');
  return res.status(200).json({
    status: 200,
    message: "Today's users",
    results: users,
  });
};
export const sendMessage = async (req, res) => {
  const { name, email, phone, message } = req.body;
  const newMessage = new Message({ name, email, phone, message });
  const messageCreated = await newMessage.save();
  return res.status(200).json({
    status: 200,
    message: 'Message sent successfully',
    results: messageCreated,
  });
};
export const getMessages = async (req, res) => {
  const messages = await Message.find({ reply: '' });
  return res.status(200).json({
    status: 200,
    message: 'Messages retrieved',
    results: messages,
  });
};
export const replyMessage = async (req, res) => {
  const { messageId } = req.params;
  const { reply } = req.body;
  const messageFound = await Message.findById({ _id: messageId });
  if (!messageFound) {
    return res.status(404).json({
      status: 200,
      erro: 'User Not found',
    });
  } else {
    const { email, message } = messageFound;
    try {
      await sendEmail(
        email,
        '1000Hills Message Reply',
        `<div style="display:flex;flex-direction: column;justify-content:center;width:100%;margin:auto">
          <strong>This is the reply to your message:</strong>
          <p style="font-weight:bold">Message</p>
          <p>${message}</p>
          <strong>Our Reply</strong>
          <p>${reply}</p>
        </div>`
      );
      await Message.findByIdAndUpdate(
        { _id: messageFound._id },
        { $set: { reply: reply } }
      );
      return res.status(200).json({
        status: 200,
        message: 'Reply sent',
      });
    } catch (error) {
      return res.status(200).json({
        status: 200,
        message: error.message,
      });
    }
  }
};
