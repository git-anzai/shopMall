// pages/authorize/authorize.js
import requestUrl from '../../utils/util.js'
import requestApi from '../../common/request.js'
var app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 判断小程序的API，回调，参数，组件等是否在当前版本可用。
    canIUse: wx.canIUse('button.open-type.getUserInfo'), //获取用户信息是否在当前版本可用
    orderId:"",
    key:"",
    avatarUrl:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    if(options.orderId&&options.key&&options.avatarUrl){
      this.setData({
        orderId: options.orderId,
        key: options.key,
        avatarUrl: options.avatarUrl
      })
    }
  },
  bindGetUserInfo: function(e) { //点击的“拒绝”或者“允许
    if (e.detail.userInfo) { //点击了“允许”按钮，
      //调用应用实例的方法获取全局数据
      //更新数据
      app.globalData.userInfo = e.detail.userInfo;
      var param = {
        userInfo: app.globalData.userInfo,
      };
      requestApi.request("App/User/userUpdate", param, (result)=> {
        if ("A00006" == result.code) {
          console.log(this)
          if (this.data.orderId != "undefined" && this.data.key != "undefined" && this.data.avatarUrl != "undefined" ){
            setTimeout( ()=> {
              wx.navigateTo({
                url: '../share/share?orderId= ' + this.data.orderId + "&key=" + this.data.key + "&avatarUrl=" + this.data.avatarUrl,
              })
            }, 1000)  
          } else {
            let param = {};
            requestApi.request("App/User/userInfo", param, function (result) {
              wx.setStorageSync('userId', result.data.id)
              setTimeout(function () {
                wx.reLaunch({
                  url: '../shop/shop'
                })
              }, 1000);
            });
          }
        } else {
          // $Message({ content: result.message, type: 'error' });
        }
      });
    }else {
      wx.navigateBack({
        delta: -2
      })
    }
  }
})