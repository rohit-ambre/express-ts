import express = require('express');
import { signup, login, validateRules } from '../controllers/auth.controller';
import validate from '../utils/validation.util';

const router = express.Router();

router.post('/signup', validateRules('signup'), validate, signup);

router.post('/login', validateRules('login'), validate, login);

export default router;
