//服务器地址
const host = "https://dev.shijijiaming.cn:8003";
//API定义
const apis = {
  APP_USER_USERLOGIN:"App/User/userLogin"
}
//网络请求
function request(api, data, success, fail) {
  //console.log({ service: api, data: data });
  data.openId = wx.getStorageSync("openId")||"";
  var header = {
    'Content-type': 'application/x-www-form-urlencoded'
  };
  // if (getApp().globalData.sess) {
  //   header["Cookie"] = 'PHPSESSID=' + getApp().globalData.sess;
  // }
  //console.log(getApp().globalData.sess);
  wx.showNavigationBarLoading();
  wx.request({
    url: api,
    method: 'POST',
    dataType: 'json',
    data: {
      // service: api,
      data: JSON.stringify(data)
    },
    header: header,
    success: function(res) {
      wx.hideNavigationBarLoading();
      console.log(res);
      if(res.data.code=="A00005"){
        wx.showToast({
          title: result.message || "",
          icon: none,
          duration: 2000
        })
      }
      if (res.statusCode == 200) {
        var result = res.data;
        if (res.data.code == "A00006") {
          getApp().globalData.sess = result.sess;
          success && success(result);
        } else {
          //业务错误
          if (fail) {
            fail(result);
          } else {
            wx.showToast({
              title: result.message || "",
              icon: none,
              duration: 2000
            })
          }
        }
      } else {
        //服务错误
        wx.showToast({
          title: "当前服务器异常,请稍后尝试！",
          icon: none,
          duration: 2000
        })
      }
    },
    fail: function(result) {
      wx.hideNavigationBarLoading();
      //网络错误
      wx.showModal({
        title: '提示',
        content: '当前网络环境不稳定，请稍后尝试！',
        showCancel: false,
        success(res) {
          wx.redirectTo({
            url: '../authorize/authorize',//授权页面
          })
        }
      });
    },
    complete: function(res) {
      wx.hideNavigationBarLoading();
    }
  });
}





module.exports = {
  host: host,
  request: request,
  api: apis,
  // service: service
}