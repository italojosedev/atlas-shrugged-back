import { Server as HttpServer, createServer } from 'http';
import express, { Application, urlencoded, json } from 'express';
import 'express-async-errors';
import cors from 'cors';
import { dataSource } from '@config/dataSource';

import Routes from '@infra/routes';

// import Socket from './socket';

// import Swagger from './swagger';

import 'reflect-metadata';

class Server {
  public app: Application;

  public server: HttpServer;

  constructor() {
    this.app = express();
    this.server = createServer(this.app);
    this.setupServer(this.app);
  }

  private setupServer(app: Application): void {
    // * support application/json type post data
    app.use(json());
    // * support application/x-www-form-urlencoded post data
    app.use(urlencoded({ extended: false }));
    // * enable cors
    app.use(cors());
    // * setup swagger
    // Swagger.setup(app);
  }

  public async init(): Promise<void> {
    try {
      // * connect to postgres
      await dataSource.initialize();

      // * set routes
      Routes.setRoutes(this.app);

      // * setup and start socket
      // Socket.setup(this.server);

      // * start server
      this.server.listen(process.env.PORT, () => {
        console.log(`[SERVER] Running on port: ${process.env.PORT}`);
      });
    } catch (error) {
      console.log(error);
    }
  }
}

export default new Server();
