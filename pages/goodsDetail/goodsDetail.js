//logs.js
const util = require('../../utils/util.js');
import requestApi from '../../common/request.js'

var app = getApp()
Page({
  data: {
    userInfo: {},
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    duration: 1000,
    orderId:'',
    goods:{}
  },
  payMent:function() {
    let orderId = wx.getStorageSync("orderId") || '';
    if(orderId){
      console.log(this.data.goods)
      wx.navigateTo({
        url: '../payment/payment?orderId=' + orderId + "&sellOpenid=" + this.data.goods.user_openid
      })
    }else{
      let obj = { store_id: this.data.goods.store_id, id: this.data.goods.id, goods_num: 1 }
      let param = {
        list: [obj],
        type: 2
      }
      requestApi.request("App/order/makeOrder", param, (result) => {//signUp
        if (result.code == "A00006") {
          let orderId = result.data;
          wx.navigateTo({
            url: '../payment/payment?orderId=' + orderId + "&sellOpenid=" + this.data.goods.user_openid
          })
        }
      })
    }
  },
  bargain:function() {
    let param = {
      goodsId: this.data.goods.id
    }
    requestApi.request("App/Order/ifBargain", param, (result) => {
      if (result.code == "A00006") {
        let params = {
          orderId: this.data.orderId,
          key: result.data
        }
        wx.showToast({
          title: result.message,
          icon: "none",
          duration: 2000
        })
        let param = JSON.stringify(params)
        wx.navigateTo({
          url: '../bargain/bargain?param=' + param
        })
      } else {
        this.markOrder();
      }
    }) 
  },
  markOrder:function() {
    let obj = { store_id:this.data.goods.store_id,id:this.data.goods.id,goods_num:1}
    let param = {
      list: [obj],
      type: 2
    }
    requestApi.request("App/order/makeOrder", param, (result) => {//signUp
      if(result.code=="A00006"){
        this.setData({
          orderId:result.data
        })
        wx.setStorageSync('orderId', result.data);
        this.shareKey();
      }
    })
  },
  shareKey:function() {
    let param ={orderId:this.data.orderId}
    requestApi.request("App/Order/shareKey", param, (result) => {//signUp
      if (result.code == "A00006") {
        console.log(result)
        let params = {
          orderId:this.data.orderId,
          key:result.data
        }
        let param = JSON.stringify(params)
         wx.navigateTo({
           url: '../bargain/bargain?param=' + param
          })
      }
    })
  },
  getGoods: function (id) {
    let param = {
      id:id
    }
    requestApi.request("App/Goods/goodsDetail", param, (result) => {
      if (result.code == "A00006") {
        this.setData({
          goods: result.data
        })
        console.log(result)
      }
    })
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    this.getGoods(options.id);
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