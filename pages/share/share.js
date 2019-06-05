// pages/share/share.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  rules:function() {
    wx.showModal({
      title: '砍价规则',
      content: '企业的专业办公管理工具。与微信一致的沟通体验，提供丰富免费的办公应用，并与微信消息、小程序、微信支付等互通，助力企业高效办公和管理。',
      showCancel: false,
      success(res) {
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})