import { Conversation, createConversation } from '../../utils/conversation'
import {isEmtyObj} from '../../utils/util'

let chat = {} as IChat
Page({
    /**
     * 页面的初始数据
     */
    data: {
        conversationList: [],
        friendName: '',
        hasUserInfo: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
    },
    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
    },
    async toDetail(event: {currentTarget: {dataset: {cid: string}}}) {
        const cid = event.currentTarget.dataset.cid
        const conversation = new Conversation(chat.user, cid)
        // 跳转至对话详情页 fixme
        getApp().globalData.chat = chat
        getApp().globalData.currentConversation = conversation
        wx.navigateTo({
            url: `/pages/chat-detail/chat-detail?conversationId=${conversation.conversationId}`,
        })
    },
    async startConversation () {
        const { friendName } = this.data
        console.log('chat', chat.user)
        // 创建一个对话
        const conversation = await createConversation(chat.user, [friendName])
        console.log('get conversation', conversation)
        this.setData({
            friendName: ''
        })
        // 跳转至对话详情页
        getApp().globalData.chat = chat
        getApp().globalData.currentConversation = conversation
        wx.navigateTo({
            url: `/pages/chat-detail/chat-detail?conversationId=${conversation.conversationId}`,
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {
        // 判断登录状态，如果未登录，跳转至home页
        if(!getApp().globalData.hasUserInfo) {
            wx.switchTab({
                url: '/pages/home/home'
            })
            return
        } else {
            this.setData({
                hasUserInfo: true
            })
        }
        chat = getApp().globalData.chat
        // 更新列表
        if (!isEmtyObj(chat)) {
            this.setData({
                conversationList: chat.getConversationList()
            })
        }
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