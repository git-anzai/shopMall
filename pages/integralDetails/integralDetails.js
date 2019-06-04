// pages/integralDetails/integralDetails.js
import requestApi from '../../common/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list:[]
  },
  integralDetails:function() {
    var param = {}
    requestApi.request("http://39.97.224.136/App/User/integralDetails", param, (result) => {//signUp
      if(result.code=="A00006") {
        this.setData({
          list:result.data
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.integralDetails();
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