import { catCodes } from './../models/response-codes';
import { PgSql } from "../config/db-connection";
import { ResponseCodes } from "../models/enums";


export class RegisterOperations {

  static async resgisterAccount(email: string, password: string, name: string) {
    try {
      let response;

      PgSql.instance;
      const querystr = "SELECT public.register($1, $2, $3)";
      const resp = await PgSql.executeQuery(querystr, [email, password, name]);
      const respJson = resp.register;
      // console.log(JSON.stringify(respJson));

      if ( respJson.user_id && respJson.created ) {
        response = catCodes[ResponseCodes.REGISTER_OK];
      } else {
        response = catCodes[ResponseCodes.REGISTER_EXISTS];
      }
      return response;
    } catch (error) {
      return catCodes[ResponseCodes.GENERAL_ERROR];
    }
  }

}
