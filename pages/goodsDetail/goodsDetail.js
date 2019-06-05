//logs.js
const util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
    userInfo: {},
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    duration: 1000
  },
  payMent:function() {
    wx.navigateTo({
      url: '../payment/payment'
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    wx.getUserInfo({
      success: (res) => {
        console.log("userinfo", res)
        //调用应用实例的方法获取全局数据
        //更新数据
        app.globalData.userInfo = res.userInfo;
        var userInfo = app.globalData.userInfo;
        this.setData({
          userInfo: userInfo
        })
      }
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})