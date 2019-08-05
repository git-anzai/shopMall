// pages/share/share.js
import requestApi from '../../common/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderId:"",
    key:"",
    avatarUrl:"",
    openId:''
  },
  rules: function () {
    wx.showModal({
      title: '砍价规则',
      content: '企业的专业办公管理工具。与微信一致的沟通体验，提供丰富免费的办公应用，并与微信消息、小程序、微信支付等互通，助力企业高效办公和管理。',
      showCancel: false,
      success(res) {
      }
    })
  },
  bargain: function () {
    let param = {
      orderId:this.data.orderId,
      key:this.data.key,
      openIds: this.data.openId
    }
    console.log(param)
    requestApi.request("App/Order/bargainShare", param, (result) => {

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      key: options.key,
      orderId: options.orderId,
      avatarUrl: options.avatarUrl,
      openId:options.openId
    })
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
    wx.reLaunch({
      url: '../shop/shop'
    })
    var that = this;
    var pages = getCurrentPages(); // 当前页面  
    var beforePage = pages[pages.length - 2]; // 前一个页面  
    beforePage.onLoad(); // 执行前一个页面的onLoad方法  

    try {
      var beforePage2 = pages[pages.length - 3]; // 前一个页面  
      beforePage2.onLoad(); // 执行前一个页面的onLoad方法  
    } catch (error){
      console.log(1)
    }


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