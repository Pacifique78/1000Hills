import express from "express";
import { signIn, signUp } from "../controllers/userController.js";
import checkSignIn from "../middleware/checkSignin.js";
import checkSignUp from "../middleware/checkSignup.js";

const router = express.Router();

router.post("/auth/signup", checkSignUp, signUp);
router.post("/auth/signin", checkSignIn, signIn);

export default router;
