import { catCodes } from './../models/response-codes';
import { PgSql } from '../config/db-connection';
import { ResponseCodes } from '../models/enums';
import { sign, SignOptions } from 'jsonwebtoken';
import cfg from '../config/config';

export class LoginOperations {

  static async loginAccount(email: string, password: string) {
    try {
      let response;

      PgSql.instance;
      const querystr = "SELECT public.login($1, $2)";
      const resp = await PgSql.executeQuery(querystr, [email, password]);
      const respJson = resp.login;
      const token = sign(respJson, cfg.jwt.SECRET_TOKEN, cfg.jwt.options as SignOptions )

      if ( respJson.user_id && respJson.credentials === true ) {
        response = {
          ...catCodes[ResponseCodes.LOGIN_OK],
          token
        };
      } else {
        response = catCodes[ResponseCodes.LOGIN_BAD];
        response = {
          ...catCodes[ResponseCodes.LOGIN_BAD],
          token: ''
        };
      }
      return response;

    } catch (error) {
      return {
        ...catCodes[ResponseCodes.LOGIN_BAD],
        token: ''
      };
    }
  }
}
