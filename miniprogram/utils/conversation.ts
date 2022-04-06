import { addRecord } from './db'
export const conversationIndex = 'conversation'
const { TextMessage, Event } = require('../libs/im.min.js');
export class Conversation {
    user: IUser  = {} as IUser
    conversationId = ''
    conversation: ILeanConversation = {} as ILeanConversation
    constructor(user: any, conversationId?: string) {
        this.user = user
        this.conversationId = conversationId || ''
    }
    async getConversation () {
        this.conversation = await this.user.getConversation(this.conversationId)
        console.log('获取conversation', this.conversation)
    }
    onMessage(cb) {
        this.user.on(Event.MESSAGE, (message: {_lctext: string, from: string}) => {
            cb({
                from: message.from,
                msg: message._lctext
            })
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
    return `Chat with ${members.join(',')}`
}
