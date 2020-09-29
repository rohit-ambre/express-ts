import { Request, Response, Application } from 'express';
import express = require('express');
require('dotenv').config();

const app: Application = express();
const PORT: Number = parseInt(process.env.PORT);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req: Request, res: Response) => res.send('Express + TypeScript Server'));

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});