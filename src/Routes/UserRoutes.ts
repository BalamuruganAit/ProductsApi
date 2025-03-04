import express from 'express';
// import { registerUser, loginUser } from '../Controller/UserController';

const {
    registerUser,
    loginUser,
  } = require("../Controller/UserController");
const router = express.Router();

router.post('/register', registerUser);
router.post('/login', loginUser);

export default router;
