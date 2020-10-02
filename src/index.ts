import 'reflect-metadata';
import { createConnection } from 'typeorm';

createConnection()
  .then(() => {
    console.log('Database connected');
  })
  .catch((error) => {
    console.log(error);
  });
