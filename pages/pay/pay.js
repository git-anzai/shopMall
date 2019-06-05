import requestApi from '../../common/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    address: {},
    array: ['不限时送货时间', '工作日送货', '双休日、假日送货'],
    index: 0,
    hasAddress: false,
    orderList:[],
    total_price:''
  },
  select: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  goaddress: function () {
    wx.navigateTo({
      url: '../../pages/address/address',
    })
  },

  onShow: function () {
    var _this = this
    wx.getStorage({
      key: 'address',
      success(res) {
        _this.setData({
          address: res.data,
          hasAddress: true
        })
      }
    })
  },

  pay: function (e) {
    // wx.showModal({
    //   title: '支付提示',
    //   content: '本程序仅用于演示，支付接口API已屏蔽！',
    //   showCancel: false,
    //   success: function (res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     }
    //   }
    // })
    // Cash.request(Cash.api.CASH_CMS_WXPAY_WX_PAY, { "uOpenid": getApp().globalData.openId, "amount": I.data.num }, function (result) {
    //   if (true == result.success) {
    //     wx.requestPayment(
    //       {
    //         'timeStamp': result.data.timeStamp,
    //         'nonceStr': result.data.nonceStr,
    //         'package': result.data.package,
    //         'signType': 'MD5',
    //         'paySign': result.data.sign,
    //         'success': function (res) {
    //           wx.showToast({
    //             title: '支付成功',
    //             icon: 'success',
    //             duration: 2000
    //           })
    //         },
    //         'fail': function (res) { },
    //         'complete': function (res) { }
    //       })
    //   } else {
    //     wx.showModal({
    //       title: '提示',
    //       content: result.message,
    //       showCancel: false
    //     });
    //   }
    // });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var orderCode = options.orderCode
    console.log(orderCode)
    let order_num = orderCode
    let param = {
      order_num: order_num
    }
    requestApi.request("App/order/orderDetail", param, (result) => {//signUp
      if(result.code=="A00006"){
        this.setData({
          total_price: result.data.total_price,
          orderList:result.data.list
        })
      }
    })
  }
})