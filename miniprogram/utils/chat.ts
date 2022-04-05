const { Realtime, setAdapters } = require('../libs/im.min.js');
const adapters = require('../libs/leancloud-adapters-weapp.js');
setAdapters(adapters);
import { getData } from './db'
import { conversationIndex } from './conversation'

export class Chat {
    realTime: any
    user: any
    constructor() {
        // 建立ws连接，并监听message事件，收到receive的事件后更新至chatInfo
        this.realTime = new Realtime({
            appId: 'LrS3PQkfegVG5z7RbqMslgFa-gzGzoHsz',
            appKey: 'GIE69soA03t89FerdEyYIuMs',
            server: 'https://lrs3pqkf.lc-cn-n1-shared.com',
        });
    }
    /**
     * 根据
     * @param userId 
     */
    login(userId: string) {
        this.realTime.createIMClient(userId).then(user => {
            console.log('login success', user)
            this.user = user
        })
    }
    logout() {
        this.user.close().then(_ => {
            console.log('exit!')
        })
    }
    getConversationList () {
        // 获取当前用户下的所有聊天列表
        return getData(conversationIndex)
    }
}
