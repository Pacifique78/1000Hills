import checkPassword from "../helpers/checkPassword.js";
import generateToken from "../helpers/generateToken.js";
import hashPassword from "../helpers/hashPassword.js";
import User from "../models/User.js";

export const signUp = async (req, res) => {
  try {
    const { name, email, phone, password } = req.body;
    const userFound = await User.findOne({ email: email });
    if (userFound) {
      return res.status(409).json({
        status: 409,
        error: "User with this email exists",
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
        message: "Account created...",
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
    const token = generateToken(_id, name, email, isAdmin);
    const user = { ...userFound }._doc;
    delete user.password;
    const data = {
      ...user,
      token,
    };
    return res.status(200).json({
      status: 200,
      message: "Logged in successfully",
      results: data,
    });
  }
  return res.status(401).json({
    status: 401,
    error: "Invalid email/ password",
  });
};
