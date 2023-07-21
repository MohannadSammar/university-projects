import { createConnection } from "typeorm";

export const createDBConnection = () => {
  createConnection()
    .then(async () => {
      console.log("Database Connection established");
    })
    .catch((error) => console.log(error));
};
