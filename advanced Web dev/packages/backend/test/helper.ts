import { exec } from "child_process";
import express, { Express } from "express";
import {
  Connection,
  createConnection,
  getConnectionOptions,
  ObjectType,
} from "typeorm";
import apiRouter from "../src/router/api.router";

export class Helper {
  public app: Express | null;
  private dbConnection: Connection;

  public async init() {
    jest.setTimeout(10000);
    this.app = express();

    //register middlewares
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true, limit: "10kb" }));

    //Register Routers
    this.app.use("/api", apiRouter);

    const config = await getConnectionOptions("default");

    this.dbConnection = await createConnection(
      // tslint:disable-next-line: prefer-object-spread
      Object.assign({}, config, { database: process.env.DBNAME })
    );
    await this.resetDatabase();
    //await this.loadFixtures();
  }
  public resetDatabase = async () => {
    await this.dbConnection.synchronize(true);
  };
  public async shutdown() {
    return this.dbConnection.close();
  }

  public getConnection() {
    return this.dbConnection;
  }

  public getRepo<Entity>(target: ObjectType<Entity>) {
    return this.dbConnection.getRepository(target);
  }
}
