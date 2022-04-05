
import { setData, getData, addRecord } from './db'
const contactIndex = 'contact'
export class  Contact {
    constructor() {}
    getContacts (): string[] {
        // 从db中获取该用户的通讯录录列表
        return getData(contactIndex) || []
    }
    AddContact(userId: string) {
        addRecord(contactIndex, userId)
    }
}