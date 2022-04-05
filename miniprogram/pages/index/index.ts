// index.ts
// 获取应用实例
const app = getApp<IAppOption>()

Page({
  data: {
    chatInfo: [] as string[],
    inputMessage: '',
    realTime: null
  },
  onLoad() {
  },
  initMessage() {
    // Tom 用自己的名字作为 clientId 来登录即时通讯服务
    this.data.realTime.createIMClient('Tom').then(function(tom) {
      console.log('tom', tom)
      // 成功登录
      tom.createConversation({ // tom 是一个 IMClient 实例
        // 指定对话的成员除了当前用户 Tom（SDK 会默认把当前用户当做对话成员）之外，还有 Jerry
        members: ['Jerry'],
        // 对话名称
        name: 'Tom & Jerry',
        unique: true
      }).then(/* 略 */);
    }).catch(console.error);
  },
  sendMessage() {
    // 建立ws连接，并监听message事件，收到receive的事件后更新至chatInfo
    console.log(Realtime, '1')
    this.initMessage();
    // 获取到InputMessage，发消息
    const { chatInfo, inputMessage} = this.data
    this.setData({
      chatInfo: [...chatInfo, inputMessage]
    })
  },
})
