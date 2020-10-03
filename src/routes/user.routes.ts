import express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
  res.send('hello');
});

export default router;
