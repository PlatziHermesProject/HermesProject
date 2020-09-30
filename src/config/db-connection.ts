import { Client } from 'pg';
import cfg from './config'


export class PgSql {

  private static _instance: PgSql;

  cnn: Client;
  connecting: boolean = false;

  constructor() {

    this.cnn = new Client({
      host: cfg.db.host,
      port: cfg.db.port,
      user: cfg.db.user,
      database: cfg.db.database,
      password: cfg.db.password
    });

    this.connectDB();
  }

  public static get instance() {
    return this._instance || (this._instance = new this());
  }

  /**
   * Method return rows from database
   * @param query Query string to execute on database
   */
  static async executeQuery(query: string, params:any[]) {
    return await (await this.instance.cnn.query(query,params)).rows[0];
  }

  private connectDB() {
    this.cnn.connect(err => {
      if (err) {
        console.error('connection error', err.stack)
      } else {
        console.log('Connected to BD')
      }
    });
  }

}
