//logs.js
const util = require('../../utils/util.js')

var app = getApp()
Page({
  data: {
    userInfo: {}
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    //调用应用实例的方法获取全局数据
      //更新数据


    // wx.getUserInfo({
    //   success: (res) => {
    //     console.log("userinfo", res)
    //     //调用应用实例的方法获取全局数据
    //     //更新数据
    //     app.globalData.userInfo = res.userInfo;
    //     var userInfo = app.globalData.userInfo;
    //     this.setData({
    //       userInfo: userInfo
    //     })
    //   }
    // })
  },
  goSignIn: function() {
    wx.navigateTo({
      url: '../signIn/singIn'
    })
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
    var userInfo = app.globalData.userInfo;
    this.setData({
      userInfo: userInfo
    })
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})