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
    total_price:'',
    order_num:""
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
    let params = { "uOpenid":  wx.getStorageSync("userId") || '', "amount": this.data.total_price, "order_id": this.data.order_num }
    requestApi.request('App/Order/wxPay', params , function (result) {
      if ('A00006' == result.code) {
        wx.requestPayment(
          {
            'timeStamp': result.data.timeStamp,
            'nonceStr': result.data.nonceStr,
            'package': result.data.package,
            'signType': 'MD5',
            'paySign': result.data.sign,
            'success': function (res) {
              wx.showModal({
                title: '支付成功',
                content: '此订单已支付完成',
                showCancel: false,
                confirmText: "返回首页",
                success(res) {
                  wx.switchTab({
                    url: '../../pages/shop/shop',
                  })
                }
              })
            },
            'fail': function (res) { },
            'complete': function (res) { }
          })
      }
    });
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var orderCode = options.orderCode
    console.log(orderCode)
    let order_num = orderCode;
    this.setData({
      order_num: order_num
    })
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