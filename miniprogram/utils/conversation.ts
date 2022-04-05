import { addRecord } from './db'
export const conversationIndex = 'conversation'
const { TextMessage } = require('../libs/im.min.js');
interface IUser {
    createConversation: any, 
    getConversation: any
}
interface IConversation {
    queryMessages: any,
    id: string,
    name: string,
    send: any,
}
export class Conversation {
    user: IUser  = {} as IUser
    conversationId = ''
    conversation: IConversation = {} as IConversation
    constructor(user: any, conversationId?: string) {
        this.user = user
        this.conversationId = conversationId || ''
    }
    getConversation () {
        this.user.getConversation(this.conversationId).then(conversation => {
            this.conversation = conversation
        })
    }
    getMessage (limit: number = 10) {
        return this.conversation.queryMessages({
            limit
        })
    }
    sendMessage (message: string) {
        return this.conversation.send(new TextMessage(message)).then(msg => {
            console.log('send message success')
        })
    }
}
export async function createConversation (user: any, members:string[], name?: string, unique = true) {
    name = name || generateConversionName(members)
    const conversation = await user.createConversation({ // tom 是一个 IMClient 实例
        // 指定对话的成员除了当前用户 Tom（SDK 会默认把当前用户当做对话成员）之外，还有 Jerry
        members: members,
        name,
        unique
    })
    saveConversation(conversation)
    return new Conversation(user, conversation.id)
}

function saveConversation (conversation: any) {
    console.log('conversation', conversation)
    const {id, name} = conversation
    addRecord(conversationIndex, {id, name})
}

function generateConversionName(members: string[]) {
    return `${members.join(',')}的对话`
}
