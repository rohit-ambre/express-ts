import "reflect-metadata";
import { createConnection } from "typeorm";

createConnection()
  .then(async connection => {
    console.log("Database connected");
  })
  .catch(error => {
    console.log(error)
  });
