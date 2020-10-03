import { IResolvers } from "graphql-tools";
import { FetchDataOperations } from '../controllers/fetch-data';

const query: IResolvers = {
  Query: {
    async getUserInfo(__:void, { user_id }) {
      try {
        const response = await FetchDataOperations.getUserInfo(user_id);
        return response;
      } catch (error) {
        return error;
      }
    },
    async getPrivateChatsRooms(__:void, { user_id }) {
      try {
        const response  = await FetchDataOperations.getPrivateChatsInfo(user_id);
        return response;
      } catch(error) {
        return error;
      }
    },
    async getMessagesPrivateChat(__:void, { chat_id }) {
      try {
        const response  = await FetchDataOperations.getMessagesFromPrivateChat(chat_id);
        return response;
      } catch(error) {
        return error;
      }
    },
    async getLetters (__:void, {}) {
      try {
        const response = await FetchDataOperations.getAvailableLetters();
        return response;
      } catch(error) {
        return error
      }
    },
    async getLetterInfo (__:void, {letter_id}) {
      try {
        const response = await FetchDataOperations.getLetterInfo(letter_id);
        return response;
      } catch(error) {
        return error
      }
    },
    async getUserLetters(__: void, {user_id}) {
      try {
        const response = await FetchDataOperations.getLettersFromUser(user_id);
        return response;
      } catch (error) {
        return error;
      }
    },
    async getUserReplies(__: void, {user_id}) {
      try {
        const response = await FetchDataOperations.getRepliesFromUser (user_id);
        return response;
      } catch (error) {
        return error;
      }
    },
    async getLetterReplies(__: void, {letter_id}) {
      try {
        const response = await FetchDataOperations.getRepliesForSpecificLetter (letter_id);
        return response;
      } catch (error) {
        return error;
      }
    },
    async getResponseInfo(__:void, { response_id }) {
      try {
        const response  = await FetchDataOperations.getResponseInfo(response_id);
        return response;
      } catch(error) {
        return error;
      }
    }
  }
};

export default query;
