import "reflect-metadata";
import express from "express";
import { useExpressServer } from "routing-controllers";

import { IService } from "../types/services";
import { controllers } from "../app/domain";
import { middlewares } from "../app/middlewares";
require("dotenv").config();

const { PORT } = process.env;

export class Tcp implements IService {
  private static instance: Tcp;

  private routePrefix = "/api";
  public server = express();

  constructor() {
    if (!Tcp.instance) {
      Tcp.instance = this;
    }

    return Tcp.instance;
  }

  async init() {
    const { server, routePrefix } = this;

    server.use(express.json());
    server.use(express.static("public"));

    useExpressServer(server, {
      routePrefix,
      controllers,
      middlewares,
      cors: true,
      defaultErrorHandler: true,
      validation: false,
    });

    return new Promise<boolean>((resolve) => {
      server.listen(PORT, () => {
        console.log("Tcp service started on port 4000");

        return resolve(true);
      });
    });
  }
}
