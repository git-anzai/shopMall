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
              console.log(res)
              wx.login({
                success: ress => {
                  console.log(ress)
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
