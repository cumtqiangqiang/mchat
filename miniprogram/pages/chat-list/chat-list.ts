import { Chat } from '../../utils/chat'
import { createConversation } from '../../utils/conversation'
interface IChat {
    login: any,
    getConversationList: any
}
Page({
    /**
     * 页面的初始数据
     */
    data: {
        conversationList: [],
        friendName: '',
        chat: {} as IChat,

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
        this.data.chat.login(this.data.userInfo.nickName)
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {
        const chat = new Chat()
        this.setData({
            chat,
            conversationList: chat.getConversationList()
        })
    },
    async startConversation () {
        console.log('startConversation')
        const { friendName, chat } = this.data

        console.log('chat', chat.user)
        // 创建一个对话
        const conversation = await createConversation(chat.user, [friendName])
        
        // 跳转至对话详情页
        wx.navigateTo({
            url: `/pages/chat-detail/chat-detail?conversationId=${conversation.id}`,
        })
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

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