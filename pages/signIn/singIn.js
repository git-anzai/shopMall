// pages/signIn2/signIn2.js
import requestApi from '../../common/request.js'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    newSignBtnState: false, //按钮签到状态
    continuityDays7: false, //连续7
    continuityDays3: false, //连续3 
    myToday: '', //周几
    newSignNum: 0, //签到天数
    newSignIntegral: 0, //签到积分
    //是否已签到 周一到周日都有这个是否已签到 isSigned
    isSign:false,
    isNewSignedArr: [],
  },

  //-------新签到---------
  signNewFn: function(e) {
    let param = {}
    requestApi.request("http://39.97.224.136/App/User/signUp", param, (result) => {//
      if (result.code =="A00006") {
        this.setData({
          isSign:false
        })
      } else {
        this.setData({
          isSign: true
        })
      }
    })
  },

  integralSign:function() {
    var param = {};
    console.log(33)
    requestApi.request("http://39.97.224.136/App/User/integralSign", param, (result) => {//signUp
      this.setData({
        isNewSignedArr: result.data
      })
    });
  },
  allreadySign:function() {
    var param = {}
    requestApi.request("http://39.97.224.136/App/User/allreadySign", param, (result) => {//signUp
      if (result.code == "A00006") {
        this.setData({
          isSign: false
        })
      } else {
        this.setData({
          isSign: true
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    let vm = this;
    vm.integralSign();
    vm.allreadySign();
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {
    var that = this,
      myDate = new Date(),
      myToday = myDate.getDay(); //周几   0 1 2 3 4 5 6
    that.setData({
      myToday: myToday
    })
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})