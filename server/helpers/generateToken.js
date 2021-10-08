import jwt from "jsonwebtoken";

const generateToken = (_id, name, email, isAdmin) =>
  jwt.sign(
    {
      _id,
      name,
      email,
      isAdmin,
    },
    process.env.secret
  );
export default generateToken;
