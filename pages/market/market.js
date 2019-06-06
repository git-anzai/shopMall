// pages/market/market.js
import requestApi from '../../common/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgWidth: 0, imgHeight: 0,
    showtab: 0,  //顶部选项卡索引
      tabitem: [],
    note: []
  },
  goAdd:function() {
    wx.navigateTo({
      url: '../add/add'
    })
  },
  goDetail:function(e) {
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url: '../goodsDetail/goodsDetail?id='+id
    })
  },
  setTab: function (e) {
    const edata = e.currentTarget.dataset;
    this.setData({
      showtab: edata.tabindex,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
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
    this.getGoodsList();
    this.getClassList();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },
  getClassList: function () {
    let param = {
      type: 2
    }
    requestApi.request("App/Goods/classList", param, (result) => {//signUp
      if (result.code == "A00006") {
        this.setData({
          tabitem: result.data
        })
      }
    })
  },
  getGoodsList: function () {
    let param = {
      type: 2,
      class_1:1,
      storeId:0
    }
    requestApi.request("App/Goods/goodsList", param, (result) => {
      if (result.code == "A00006") {
        this.setData({
          note: result.data
        })
        console.log(this.data.note)
      }
    })
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