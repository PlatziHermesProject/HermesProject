import { ResponseCodes } from './../models/enums';
import { IResolvers } from "graphql-tools";
import { catCodes } from '../models/response-codes';
import { RegisterOperations } from '../controllers/register-account';

const mutation: IResolvers = {
  Mutation: {
    helloUpdate: () => 'Hola mundo',
    async createAccount(__:void, { email, password, name }) {
      try {
        const response = await RegisterOperations.resgisterAccount(email, password, name);
        return response;
      } catch (error) {
        return catCodes[ResponseCodes.GENERAL_ERROR];
      }
    }
  }
};

export default mutation;
