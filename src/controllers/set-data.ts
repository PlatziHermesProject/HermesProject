import { catCodes } from './../models/response-codes';
import { PgSql } from "../config/db-connection";
import { ResponseCodes } from "../models/enums";
import { FetchDataOperations } from "./fetch-data";

export class SetDataOperations {
    static async createLetter(content: string, user_id: number, name: string, avatar: string, created: any, updated: any) {
        try {
            PgSql.instance;
            const authorLetter: string = name.charAt(0);
            const querystr = `
            INSERT INTO letters(
                user_id, content, author_letter, avatar, created, updated)
                VALUES (${user_id}, '${content}', '${authorLetter}', '${avatar}', to_timestamp(${created} / 1000.0), to_timestamp(${updated} / 1000.0));
            `;
            await PgSql.instance.cnn.query(querystr);
            return catCodes[ResponseCodes.LETTER_CREATION];
        } catch (error) {
            console.log(error);
            return catCodes[ResponseCodes.GENERAL_ERROR];
        }
    }

    static async replyLetter(content: string, user_id: number, letter_id: number,  name: string, avatar: string, reaction: boolean, created: any, updated: any) {
        try {
            PgSql.instance;
            const authorLetter: string = name.charAt(0);
            const querystr = `
            INSERT INTO responses(
                letter_id, content, author_letter, avatar, reaction, created, updated, user_id)
                VALUES (${letter_id}, '${content}', '${authorLetter}', '${avatar}', ${reaction}, to_timestamp(${created} / 1000.0), to_timestamp(${updated} / 1000.0), ${user_id});
            `;
            await PgSql.instance.cnn.query(querystr);
            // bring info of letter that is being replied
            const letterInfo = await FetchDataOperations.getLetterInfo(letter_id);
            const reactionRta = await FetchDataOperations.interactionsTracking(user_id, letterInfo.user_id);
            if (reactionRta.code === "HS-009") {
                const chatCreation = await this.createPrivateChat(user_id, letterInfo.user_id);
                return chatCreation;
            }
            return catCodes[ResponseCodes.LETTER_REACTION];
        } catch (error) {
            console.log(error);
            return catCodes[ResponseCodes.GENERAL_ERROR];
        }
    }

    static async reactToReply(user_id: number, response_id: number) {
        try {
            const responseInfo: any = await FetchDataOperations.getResponseInfo(response_id);
            console.log('resp', responseInfo);
            
            let reaction: boolean;
            let chatCreation: boolean = false;
            let chat;
            PgSql.instance;
            if (responseInfo.reaction) {
                reaction = false;
            } else {
                reaction = true;
                // execute counter only when reaction is set to True
                const reactionRta = await FetchDataOperations.interactionsTracking(user_id, responseInfo.user_id);
                console.log('resp2', reactionRta);
                
                if (reactionRta.code === "HS-009") {
                    chat = await this.createPrivateChat(user_id, responseInfo.user_id);
                    chatCreation = true;
                }
            }
            const querystr = `
                UPDATE responses
                    SET reaction=${reaction}
                    WHERE response_id=${response_id};
            `;
            await PgSql.instance.cnn.query(querystr);
            if(chatCreation) {
                return chat;
            }
            return catCodes[ResponseCodes.REPLY_REACTION];
        } catch (error) {
            console.log(error);
            return catCodes[ResponseCodes.GENERAL_ERROR];
        }
    }

    private static async createPrivateChat(sender_id: number, recipient_id: number) {
        try {
            PgSql.instance;
            const querystr = `
            INSERT INTO users_messages(
                sender_id, recipient_id)
                VALUES (${sender_id}, ${recipient_id});
            `;
            await PgSql.instance.cnn.query(querystr);
            return catCodes[ResponseCodes.CHAT_CREATED];
        } catch (error) {
            console.log(error);
            return catCodes[ResponseCodes.GENERAL_ERROR];
        }
    }

}