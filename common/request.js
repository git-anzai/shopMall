//服务器地址
const host = "https://dev.shijijiaming.cn:8003";
//API定义
const apis = {
  APP_USER_USERLOGIN:"App/User/userLogin"
}
//网络请求
function request(api, data, success, fail) {
  //console.log({ service: api, data: data });
  var header = {
    'Content-type': 'application/x-www-form-urlencoded'
  };
  if (getApp().globalData.sess) {
    header["Cookie"] = 'PHPSESSID=' + getApp().globalData.sess;
  }
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
      if(res.data.success==false){
        wx.showModal({
          title: '提示',
          content: res.data.message,
          showCancel: false
        });
      }
      if (res.statusCode == 200) {
        var result = res.data;
        if (result.error == 0) {
          getApp().globalData.sess = result.sess;
          success && success(result);
        } else {
          //业务错误
          if (fail) {
            fail(result);
          } else {
            wx.showModal({
              title: '提示',
              content: result.msg,
              showCancel: false
            });
          }
        }
      } else {
        //服务错误
        wx.showModal({
          title: '提示',
          content: '当前服务器异常,请稍后尝试！',
          showCancel: false
        });
      }
    },
    fail: function(result) {
      wx.hideNavigationBarLoading();
      //网络错误
      wx.showModal({
        title: '提示',
        content: '当前网络环境不稳定，请稍后尝试！',
        showCancel: false
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