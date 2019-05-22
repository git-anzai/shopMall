import requestApi from '../../common/request.js'
var app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
  },
  onLoad: function () {
    var that = this;
    // 判断是否已经授权
    wx.getSetting({
      success: (res) => {
        if (res.authSetting['scope.userInfo']) {//授权了，可以获取用户信息了
          wx.getUserInfo({
            success: (res) => {
              console.log("userinfo",res)
              var that = this
              //调用应用实例的方法获取全局数据
                //更新数据
              app.globalData.userInfo = res.userInfo;
              wx.login({
                success: loginRes => {
                  var param = {
                    code: loginRes.code
                  };
                  requestApi.request("https://dev.shijijiaming.cn:8003/App/User/userLogin", param, function (result) {
                    // if (true == result.success) {
                    //   $Message({ content: result.message });
                    //   setTimeout(function () {
                    //     wx.reLaunch({
                    //       url: '../index/index'
                    //     })
                    //   }, 1000);
                    // } else {
                    //   $Message({ content: result.message, type: 'error' });
                    // }
                  });
                  //https://dev.shijijiaming.cn:8003/App/User/userLogin
                  wx.reLaunch({
                    url: '../shop/shop'
                  });
                }
              })
            }
          })
        } else {//未授权，跳到授权页面
          wx.redirectTo({
            url: '../authorize/authorize',//授权页面
          })
        }
      }
    })
  },
})
