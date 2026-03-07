import express from 'express';
import {
  registerPage,
  register,
  loginPage,
  login,
  logout,
} from '../controllers/authController.js';

const router = express.Router();

router.get('/register', registerPage);
router.post('/register', register);
router.get('/login', loginPage);
router.post('/login', login);
router.get('/logout', logout);

export default router;
