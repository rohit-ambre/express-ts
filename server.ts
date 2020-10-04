import { Request, Response, Application } from 'express';
import express = require('express');
import { createConnection } from 'typeorm';
import apiRoutes from './src/routes';
import 'reflect-metadata';

require('dotenv').config();

const app: Application = express();
const PORT: Number = parseInt(process.env.PORT, 10);

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

createConnection()
  .then(() => {
    console.log('Database connected');
    app.use('/api', apiRoutes);

    app.get('/', (req: Request, res: Response) => {
      res.send('Express + TypeScript Server');
    });
  })
  .catch((error) => {
    console.log(error);
    throw new Error(`Unable to connect to the database:' ${error.message}`);
  });

app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});
