import requestApi from '../../common/request.js'
const {
  $Message
} = require('../../iview/base/index');
var app = getApp()

Page({
  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
  },
  onLoad: function () {
    // 判断是否已经授权
    wx.getSetting({
      success: (res) => {
        wx.login({
          success: loginRes => {
            var param = {
              code: loginRes.code
            };
            requestApi.request("http://39.97.224.136/App/User/userLogin", param, function (result) {
              if (result.code = "A00006") {
                // $Message({ content: result.message });
                getApp().globalData.openId = result.data;
                wx.setStorageSync('openId', getApp().globalData.openId)
                // setTimeout(function () {
                //   wx.reLaunch({
                //     url: '../index/index'
                //   })
                // }, 1000);
                if (res.authSetting['scope.userInfo']) {//授权了，可以获取用户信息了
                  wx.getUserInfo({
                    success: (res) => {
                      console.log("userinfo", res)
                      //调用应用实例的方法获取全局数据
                      //更新数据
                      app.globalData.userInfo = res.userInfo;
                      var param = {
                        userInfo: res.userInfo,
                      };
                      requestApi.request("http://39.97.224.136/App/User/userUpdate", param, function (result) {
                        if (true == result.success) {
                          // $Message({ content: result.message });
                          setTimeout(function () {
                            wx.reLaunch({
                              url: '../shop/shop'
                            })
                          }, 1000);
                        } else {
                          // $Message({ content: result.message, type: 'error' });
                        }
                      });
                    }
                  })
                } else {//未授权，跳到授权页面
                  setTimeout(function () {
                    wx.redirectTo({
                      url: '../authorize/authorize',//授权页面
                    })
                  }, 1000)
                }
              } else {
                // $Message({ content: result.message, type: 'error' });
              }
            });
            wx.reLaunch({
              url: '../shop/shop'
            });
          }
        })

      }
    })
  },
})
