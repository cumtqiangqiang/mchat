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
  id: string,
  name: string,
  sendMessage: any,
  getConversation: any,
  onMessage: any
}
interface ILeanConversation {
  queryMessages: any,
  send: any
}
interface IChat {
  login: any,
  getConversationList: any,
  user: any
}