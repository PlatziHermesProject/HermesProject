import { IResolvers } from "graphql-tools";
import { FetchDataOperations } from '../controllers/fetch-data';
import { ResponseCodes } from './../models/enums';
import { catCodes } from '../models/response-codes';

const query: IResolvers = {
  Query: {
    hello: () => 'Hola mundo',
    async getUserInfo(__:void, { user_id }) {
      try {
        const response = await FetchDataOperations.getUserInfo(user_id);
        return response;
      } catch (error) {
        return catCodes[ResponseCodes.GENERAL_ERROR];
      }
    },
    async getPrivateChatsRooms(__:void, { user_id }) {
      try {
        const response  = await FetchDataOperations.getPrivateChatsInfo(user_id);
        return response;
      } catch(error) {
        return catCodes[ResponseCodes.GENERAL_ERROR];
      }
    }
  }
};

export default query;
