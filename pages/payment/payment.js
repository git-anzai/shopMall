// pages/payment/payment.js
import requestApi from '../../common/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    detail :[],
    sellOpenid: '',
    orderId: '',
    total_price:''
  },
  detail: function (orderId) {
    let param = {
      order_num: orderId
    }
    requestApi.request("App/order/orderDetail", param, (result) => {//signUp
      if (result.code == "A00006") {
        console.log(result)
        this.setData({
            detail:result.data.list,
            total_price: result.data.total_price
         })
         console.log(this.data.detail)
      }
    })

  
  },
  payMent:function() {
    let param = {
      sellOpenid: this.data.sellOpenid,
      order_num: this.data.orderId
    }
    requestApi.request("App/order/integralPay", param, (result) => {
      if (result.code == "A00006") {
        wx.showModal({
          title: '支付成功',
          content: '此订单已支付完成',
          confirmText: "返回跳蚤市场",
          showCancel: false,
          success(res) {
            wx.switchTab({
              url: '../../pages/market/market',
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let orderId = options.orderId;
    console.log(options)
    this.setData({
      sellOpenid: options.sellOpenid,
      orderId: options.orderId
    })
    this.detail(orderId);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})