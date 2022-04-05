/// <reference path="./types/index.d.ts" />

interface IAppOption {
  globalData: {
    userInfo?: WechatMiniprogram.UserInfo,
    chat?: any,
    currentConversation?: any
  }
  userInfoReadyCallback?: WechatMiniprogram.GetUserInfoSuccessCallback,
}
interface IUser {
  createConversation: any, 
  getConversation: any,
  on: any
}
interface IConversation {
  getMessage: any,
  sendMessage: any,
  getConversation: any,
  onMessage: any,
  conversationId: string,
  user: {
    id: string
  }
}
interface ILeanConversation {
  id: string,
  name: string,
  queryMessages: any,
  send: any
}
interface IChat {
  login: any,
  getConversationList: any,
  user: any
}
interface IConvRecord {
  id: string,
  name: string
}