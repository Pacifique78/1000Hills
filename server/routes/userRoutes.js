import express from 'express';
import {
  activeUsers,
  getMessages,
  newUsers,
  replyMessage,
  sendMessage,
  signIn,
  signUp,
} from '../controllers/userController.js';
import checkSignIn from '../middleware/checkSignin.js';
import checkSignUp from '../middleware/checkSignup.js';

const router = express.Router();

router.post('/auth/signup', checkSignUp, signUp);
router.post('/auth/signin', checkSignIn, signIn);
router.get('/users/today', newUsers);
router.get('/users/active', activeUsers);
router.post('/messages', sendMessage);
router.get('/messages', getMessages);
router.patch('/messages/:messageId', replyMessage);

export default router;
