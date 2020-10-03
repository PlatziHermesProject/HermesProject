import { catCodes } from './../models/response-codes';
import { PgSql } from '../config/db-connection';
import { ResponseCodes } from '../models/enums';
import * as jwt from 'jsonwebtoken';

export class LoginOperations {

  static async loginAccount(email: string, password: string) {
    try {
      let response;

      PgSql.instance;
      const querystr = "SELECT public.login($1, $2)";
      const resp = await PgSql.executeQuery(querystr, [email, password]);
      const respJson = resp.login;
      // console.log(JSON.stringify(respJson));
      const token = jwt.sign({ email: respJson.email }, 'hermes', { algorithm: 'HS256' })

      console.log(token);
      

      if ( respJson.user_id && respJson.credentials === true ) {
        response = catCodes[ResponseCodes.LOGIN_OK];
      } else {
        response = catCodes[ResponseCodes.LOGIN_BAD];
      }
      return response;

    } catch (error) {
      return catCodes[ResponseCodes.LOGIN_BAD];      
    }
  }
}
