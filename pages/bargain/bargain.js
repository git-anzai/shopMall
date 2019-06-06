// pages/bargain/bargain.js
import requestApi from '../../common/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    share_query:true,
  },

  bargainShare:function(param) {
    requestApi.request("App/Order/bargainShare", param, (result) => {
     
    })  
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let params = JSON.parse(options.param)
    this.bargainShare(params)
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
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      return {
        title: "请为我助力",
        path: '../index/index?share_query=' + this.data.share_query,
        success:function(res) {
          console.log("转发成功:" + JSON.stringify(res));
        },
        fail:function(res) {
          console.log("转发成功:" + JSON.stringify(res));
        }
      }
    }
  }
})