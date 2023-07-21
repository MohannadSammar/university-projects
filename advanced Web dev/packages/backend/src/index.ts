/* eslint @typescript-eslint/no-var-requires: "off" */
require("dotenv-safe").config({
  allowEmptyValues: true,
});

import "reflect-metadata";

import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";

import apiRouter from "./router/api.router";
import { createDBConnection } from "./util/database";
import { instantiateApi } from "./util/api_conn";

const port: number = Number(process.env.PORT) || 3010;

export const startServer = async () => {
  try {
    const app = express();

    app.use("/storage", express.static("storage/"));

    //register middlewares
    app.use(morgan("combined"));

    app.use(
      cors({
        origin: (origin, callback) => {
          callback(null, true);
          return;
        },
        credentials: true,
      })
    );

    app.use(express.json());
    app.use(express.urlencoded({ extended: true, limit: "10kb" }));
    app.use(cookieParser());
    app.use(express.static("uploads"));

    //instantiate API-Object
    instantiateApi();
    //create DB connection
    const dbConnection = await createDBConnection();
    //Register Routers
    app.use("/api", apiRouter);

    const server = app.listen(port, () =>
      console.log(`Server is running on port ${port}`)
    );
    return { server, dbConnection };
  } catch (e) {
    console.log(e);
    throw e;
  }
};

startServer();
