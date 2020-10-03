import { Request, Response, Application } from 'express';
import express = require('express');
import apiRoutes from './src/routes';

require('dotenv').config();

const app: Application = express();
const PORT: Number = parseInt(process.env.PORT, 10);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api', apiRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('Express + TypeScript Server');
});

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
