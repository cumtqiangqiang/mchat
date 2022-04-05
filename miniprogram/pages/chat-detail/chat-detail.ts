// pages/chat-detail/chat-detail.ts
// 获取应用实例
const app = getApp<IAppOption>()
Page({

    /**
     * 页面的初始数据
     */
    data: {
        historyMessages: [] as {from: string, msg: string}[],
        inputMessage: ''
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    async onReady() {
        this.getHistory()
        this.addListener()  
    },
    addListener() {
        // 监听消息，append至最末尾
        const current: IConversation = app.globalData.currentConversation
        current.onMessage((message: {from: string, msg: string}) => {
            console.log('收到了消息！', message)
            const {historyMessages} = this.data
            this.setData({
                historyMessages: [...historyMessages, message]
            })
        })
    },

    async getHistory () {
        const current: IConversation = app.globalData.currentConversation
        await current.getConversation()
        const messages = await current.getMessage(10)
        console.log('历史记录', messages)
        this.setData({
            historyMessages: messages.map((item: {from: string, _lctext: string}) => ({
                from: item.from,
                msg: item._lctext
            }))
        })
    },

    sendMessage () {
        const current: IConversation = app.globalData.currentConversation
        current.sendMessage(this.data.inputMessage)
        // 如果发送成功，需要在history增加一条记录
        const { historyMessages } = this.data
        console.log('查一下“我”！', current)
        this.setData({
            historyMessages: [...historyMessages, {
                from: current.user.id,
                msg: this.data.inputMessage
            }],
            inputMessage: ''
        })
    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})