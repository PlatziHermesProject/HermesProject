import * as express from 'express';
import * as cors from 'cors';
import * as compression from 'compression';
import cfg from './../config/config';
import * as http from 'http';
import * as https from 'https';
import { ApolloServer } from 'apollo-server-express';
import schema from './../schema';
import * as path from 'path';

export default class Server {

  public app: express.Application;
  public port: number;
  private apolloServer: any;
  public server: any;

  constructor(port: number) {
    this.port = port;
    this.app = express();
    this.app.use('*', cors());
    this.app.use(compression());
    this.setApolloServer(this.app);
  }

  static init(port) {
    return new Server(port);
  }

  private setApolloServer(app: express.Application) {

    const apolloConfig = {
      schema,
      introspection: true
    }

    this.apolloServer = new ApolloServer(apolloConfig);
    this.apolloServer.applyMiddleware({app})
  }

  private publicFolder() {
    const publicPath = path.resolve(__dirname, '../public');
    this.app.use(express.static(publicPath));
  }

  start(callback: (...args: any[]) => void) {

    if(cfg.prod) {
      this.server = https.createServer({
        ca: '',
        key: '',
        cert: '',
        passphrase: ''
      }, this.app);
    } else {
      this.server = http.createServer(this.app);
    }

    this.server.listen(this.port, callback);
    this.publicFolder();
  }
}
