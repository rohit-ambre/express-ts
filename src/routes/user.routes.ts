import express = require('express');
import getAllUsers from '../controllers/users.controller';

const router = express.Router();

router.get('/users', getAllUsers);

export default router;
