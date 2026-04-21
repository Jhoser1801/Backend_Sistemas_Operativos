import bodyParser from "body-parser";
import express, { Express } from "express";
import { Request, Response } from "express";
import cors from "cors";
import { ServerApp } from "../core/server";

export class Server implements ServerApp {
  app: Express;
  server: any;

  constructor() {
    this.app = express();
    this.setServerComunication();
  }

  protected setServerComunication(): void {
    this.app.use(bodyParser.json());
    this.app.use(cors());
  }

  async start() {
    this.app.use(async (_, __, next) => {
      try {
        console.log("se ejecuto otro llamado a el servidor desde una ruta");
        await next(null);
      } catch (error) {
        console.log("the error ocurred in the main app");
        next(error);
      }
    })

    //prueba de ruta en la raiz
    this.app.get("/", (_req: Request, res: Response) => {
      res.send("Hello World");
    });

    this.server = this.app.listen(3000, () => {
      console.log("server started")
    });
  }

  async close(): Promise<void> {
    if (this.server) {
      await this.server.close();
    }
  }
}

const server = new Server();

try {
  (async () => {
    await server.start();
    console.log(`API listen on ${3000}`);
  })();

} catch (error) {
  console.log("error levantando el servidor", { error });
}