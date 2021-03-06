import { PgSql } from "../config/db-connection";
import { catCodes } from './../models/response-codes';
import { ResponseCodes } from "../models/enums";

interface ChatModel{
    user_message_id: number,
    sender_id: number,
    recipient_id: number
}

interface ChatViewModel {
    chatsInfo: Array<ChatModel>,
};

export class FetchDataOperations {

    // VERIFICAR ESTO, PARA QUE NO USE NUEVA INSTANCIA DE DB, SINO EL SINGLETON
    static async getUserInfo (user_id: number) {
      try {
        let response;
        PgSql.instance;
        const querystr = `SELECT * FROM users WHERE user_id = ${user_id}`;
        const resp = await PgSql.instance.cnn.query(querystr);
        response = resp.rows[0];
        return response;
      } catch (error) {
        return catCodes[ResponseCodes.GENERAL_ERROR];
      }
    }

    // CHATS

    private static async getPrivateChatsRoomsWhenSenderId (user_id: number) {
    /**
     * Function that brings those chats where currrent user is sender 
     * (started conversation)
     * unexposed func
     */
      try {
        let response;
        PgSql.instance;
        const querystr = `
            SELECT * FROM users_messages WHERE sender_id = ${user_id}
            ORDER BY user_message_id ASC
            `;
        const resp = await PgSql.instance.cnn.query(querystr);
        response = resp.rows;
        const rta: ChatViewModel = {
            chatsInfo: response,
        }
        return rta;
      } catch (error) {
        return new Error('error fetching chats when sender');
      }
    }

    private static async getPrivateChatsRoomsWhenRecipientId (user_id: number) {
    /**
     * Function that brings those chats where currrent user is recipient 
     * (somebody else started conversation)
     * unexposed func
     */
        try {
            let response;
            PgSql.instance;
            const querystr = `
                SELECT * FROM users_messages WHERE recipient_id = ${user_id}
                ORDER BY user_message_id ASC
                `;
            const resp = await PgSql.instance.cnn.query(querystr);
            response = resp.rows;
            const rta: ChatViewModel = {
                chatsInfo: response,
            }
            return rta;
        } catch (error) {
            return new Error('error fetching chats when recipient');
        }
    }

    private static async getOtherUserInChatInfo (user_id: number) {
    /**
     * Function that processes chats info
     * and bring info of user which is texting with current user 
     */
        try {
            let usersRta: Array<any> = [];
            const senderChats: any = await this.getPrivateChatsRoomsWhenSenderId(user_id);
            const recipientChats: any = await this.getPrivateChatsRoomsWhenRecipientId(user_id);
            const promisesSender = senderChats.chatsInfo.map(async (element: ChatModel) => {
                const uData = await this.getUserInfo(element.recipient_id)
                return {...uData, chat_id: element.user_message_id}
            })
            const promisesRecipient = recipientChats.chatsInfo.map(async (element: ChatModel) => {
                const uData = await this.getUserInfo(element.sender_id)
                return {...uData, chat_id: element.user_message_id}
            })
            const rtaSender: any = await Promise.all(promisesSender);
            const rtaRecipient: any = await Promise.all(promisesRecipient);
            // set user chat status in response
            for (let i = 0; i < rtaSender.length; i++) {
                rtaSender[i].status = 'recipient';
            }
            for (let i = 0; i < rtaRecipient.length; i++) {
                rtaRecipient[i].status = 'sender';
            }
            usersRta = [...rtaRecipient, ...rtaSender];
            return usersRta;
        } catch (error) {
            console.error(error);
            return new Error('Error raised while processing chats info')
        }
        
    }

    static async getPrivateChatsInfo (user_id: number) {
        try {
            const rta = await this.getOtherUserInChatInfo(user_id);
            return rta;
        }catch (error) {
            console.error(error);
            return catCodes[ResponseCodes.GENERAL_ERROR];
        }
    }

    static async getMessagesFromPrivateChat (chat_id: number) {
        try {
            let response;
            PgSql.instance;
            const querystr = `
                SELECT * FROM messages WHERE user_message_id = ${chat_id}
                ORDER BY created ASC
            `;
            const resp = await PgSql.instance.cnn.query(querystr);
            response = resp.rows;
            return response;
        } catch (error) {
            return catCodes[ResponseCodes.GENERAL_ERROR];
        }
    }

    // LETTERS

    static async getAvailableLetters () {
        try {
            let response;
            PgSql.instance;
            const querystr = `
                SELECT * FROM letters
                ORDER BY created ASC
            `;
            const resp = await PgSql.instance.cnn.query(querystr);
            response = resp.rows;
            return response;
        } catch (error) {
            return catCodes[ResponseCodes.GENERAL_ERROR];
        }
    }

    static async getLetterInfo (letter_id: number) {
        try {
            let response;
            PgSql.instance;
            const querystr = `
                SELECT * FROM letters WHERE letter_id = ${letter_id}
            `;
            const resp = await PgSql.instance.cnn.query(querystr);
            response = resp.rows[0];
            return response;
        } catch (error) {
            return catCodes[ResponseCodes.GENERAL_ERROR];
        }
    }

    static async getLettersFromUser (user_id: number) {
        try {
            let response;
            PgSql.instance;
            const querystr = `
                SELECT * FROM letters WHERE user_id = ${user_id}
                ORDER BY created ASC
            `;
            const resp = await PgSql.instance.cnn.query(querystr);
            response = resp.rows;
            return response;
        } catch (error) {
            return catCodes[ResponseCodes.GENERAL_ERROR];
        }
    }

    static async getRepliesFromUser (user_id: number) {
        try {
            let response;
            PgSql.instance;
            const querystr = `
                SELECT * FROM responses WHERE user_id = ${user_id}
                ORDER BY created ASC
            `;
            const resp = await PgSql.instance.cnn.query(querystr);
            response = resp.rows;
            return response;
        } catch (error) {
            return catCodes[ResponseCodes.GENERAL_ERROR];
        }
    }

    static async getRepliesForSpecificLetter (letter_id: number) {
        try {
            let response;
            PgSql.instance;
            const querystr = `
                SELECT * FROM responses WHERE letter_id = ${letter_id}
                ORDER BY created ASC
            `;
            const resp = await PgSql.instance.cnn.query(querystr);
            response = resp.rows;
            return response;
        } catch (error) {
            return catCodes[ResponseCodes.GENERAL_ERROR];
        }
    }

    static async getResponseInfo (response_id: number) {
        try {
            let response;
            PgSql.instance;
            const querystr = `
                SELECT * FROM responses WHERE response_id = ${response_id}
            `;
            const resp = await PgSql.instance.cnn.query(querystr);
            response = resp.rows[0];
            return response;
        } catch (error) {
            return catCodes[ResponseCodes.GENERAL_ERROR];
        }
    }

    static async interactionsTracking ( user_id_1: number, user_id_2: number ) {
        try {
            let counter;
            PgSql.instance;
            const querystr = `
                SELECT * FROM "Interactions" 
                    WHERE (user_id_1 = ${user_id_1} OR user_id_1 = ${user_id_2})
                    AND (user_id_2 = ${user_id_1} OR user_id_2 = ${user_id_2})
            `;
            const response = await PgSql.instance.cnn.query(querystr);
            console.log(response.rows);
            
            if (response.rows[0]) {
                counter = response.rows[0].counter;
                const querystr = `
                    UPDATE "Interactions"
                        SET counter=${counter + 1}
                        WHERE (user_id_1 = ${user_id_1} OR user_id_1 = ${user_id_2})
                        AND (user_id_2 = ${user_id_1} OR user_id_2 = ${user_id_2})
                `;
                await PgSql.instance.cnn.query(querystr);
            } else {
                const querystr = `
                    INSERT INTO "Interactions"(
                        user_id_1, user_id_2, counter)
                        VALUES (${user_id_1}, ${user_id_2}, ${1});
                `;
                await PgSql.instance.cnn.query(querystr);
            }
            if (counter === 10) {
                return catCodes[ResponseCodes.INIT_CHAT];
            } else {
                return catCodes[ResponseCodes.INTERACTION_TRACKED];
            }
        } catch (error) {
            console.log(error);
            return catCodes[ResponseCodes.GENERAL_ERROR];
        }
    }
  }