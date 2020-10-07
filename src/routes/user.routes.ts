import express = require('express');
import getAllUsers from '../controllers/users.controller';
import { verifyToken } from '../utils/auth.util';

const router = express.Router();

router.get('/users', verifyToken, getAllUsers);

export default router;
