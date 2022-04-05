import { Chat } from '../../utils/chat'
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

        userInfo: {
            avatarUrl: '',
            nickName: ''
        },
        hasUserInfo: false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
    },
    getUserProfile() {
        // 推荐使用wx.getUserProfile获取用户信息，开发者每次通过该接口获取用户个人信息均需用户确认，开发者妥善保管用户快速填写的头像昵称，避免重复弹窗
        wx.getUserProfile({
            desc: '展示用户信息', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
            success: (res) => {
                console.log(res)
                this.setUserInfoData(res.userInfo)
            }
        })
    },
    setUserInfoData (userInfo: any) {
        this.setData({
            userInfo,
            hasUserInfo: true,
        })
        chat.login(this.data.userInfo.nickName)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        chat = new Chat()
        this.setData({
           //  chat,
            conversationList: chat.getConversationList()
        })
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
        console.log('on show! chat is:', chat)
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