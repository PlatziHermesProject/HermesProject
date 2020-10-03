import { ResponseCodes } from './../models/enums';
import { IResolvers } from "graphql-tools";
import { catCodes } from '../models/response-codes';
import { RegisterOperations } from '../controllers/register-account';
import { SetDataOperations } from '../controllers/set-data';

const mutation: IResolvers = {
  Mutation: {
    async createAccount(__:void, { email, password, name }) {
      try {
        const response = await RegisterOperations.resgisterAccount(email, password, name);
        return response;
      } catch (error) {
        return catCodes[ResponseCodes.GENERAL_ERROR];
      }
    },
    async createLetter(__:void, { content, user_id, name, avatar }) {
      try {
        const response = await SetDataOperations.createLetter(content, user_id, name, avatar, Date.now(), Date.now());
        return response;
      } catch (error) {
        return catCodes[ResponseCodes.GENERAL_ERROR];
      }
    },
    async replyLetter(__:void, { content, user_id, letter_id, name, avatar, reaction }) {
      try {
        const response = await SetDataOperations.replyLetter(content, user_id, letter_id, name, avatar, reaction, Date.now(), Date.now());
        return response;
      } catch (error) {
        return error;
      }
    },
    async replyReaction(__:void, { user_id, response_id }) {
      try {
        const response = await SetDataOperations.reactToReply(user_id, response_id);
        return response;
      } catch (error) {
        return error;
      }
    },
  }
};

export default mutation;
