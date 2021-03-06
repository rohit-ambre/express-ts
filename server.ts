import { Request, Response, Application } from 'express';
import express = require('express');
import helmet = require('helmet');
import morgan = require('morgan');
import { createConnection } from 'typeorm';
import apiRoutes from './src/routes';
import logger from './winston-config';
import 'reflect-metadata';

require('dotenv').config();

const app: Application = express();
const PORT: Number = parseInt(process.env.PORT, 10);

app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('combined'));

createConnection()
  .then(() => {
    logger.info('Database connected');
    app.use('/api', apiRoutes);

    app.get('/', (req: Request, res: Response) => {
      res.send('Express + TypeScript Server');
    });
  })
  .catch((error) => {
    logger.error(`Database connection ${error}`);
    throw new Error(`Unable to connect to the database:' ${error.message}`);
  });

const server = app.listen(PORT, () => {
  logger.info(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});

process.on('SIGINT', () => {
  logger.warn('SIGINT RECEIVED. Shutting down gracefully');
  server.close(() => {
    logger.info('💥 Process terminated!');
  });
});
