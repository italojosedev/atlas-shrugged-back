import { Server as HttpServer } from 'http';
import { Server } from 'socket.io';


import { AuthMiddleware } from '@middlewares';

// import { User } from '@models';

class SocketServer {
  private io: Server;

  // * setup socket
  public setup(server: HttpServer): void {
    this.io = new Server(server, {
      cors: {
        origin: '*',
        methods: ['POST', 'GET', 'PUT', 'DELETE'],
        allowedHeaders: ['Authorization'],
      },
    });

    this.start();
  }

  private start(): void {
    console.log('[SOCKET] Started');

    this.io.use(async (socket, next) => AuthMiddleware.userSocket(socket, next)).on('connection', (socket: any) => {

      console.log('connected');
      socket.emit('connection')

      socket.on('disconnect', () => console.log('disconnect'));
    });


  }
}

export default new SocketServer();
