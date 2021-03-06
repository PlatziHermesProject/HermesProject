
export enum ResponseCodes{
  GENERAL_ERROR = 'general/bad',
  REGISTER_OK = 'registermail/ok',
  REGISTER_EXISTS = 'registermail/exist',
  LOGIN_OK = 'login/ok',
  LOGIN_BAD = 'login/bad',
  LETTER_CREATION = 'lettercreate/ok',
  LETTER_REACTION = 'letterreaction/ok',
  REPLY_REACTION = 'replyreaction/ok',
  INTERACTION_TRACKED = 'interaction/tracking',
  INIT_CHAT = 'initchat/ok',
  CHAT_CREATED = 'chatcreation/ok',
}
