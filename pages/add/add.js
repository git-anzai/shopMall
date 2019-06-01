// pages/add/add.js
var util = require('../../utils/util.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: 0,
    img: null,
    classId: null,
    classification: null,
    userInfo: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

    var that = this

    wx.getStorage({
      key: 'userInfo',
      success: function (res) {
        console.log(res.data)
        that.setData({
          userInfo: res.data
        })
      },
    })
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


  updataimg: function () {
    var that = this
    wx.chooseImage({
      sourceType: ['album', 'camera'],
      success: function (res) {
        //
        var tempFilePaths = res.tempFilePaths
        that.setData({
          img: tempFilePaths
        })
        console.log(res.tempFiles)
        // console.log("临时路径"+tempFilePaths)
      }
    })
  },
  formSubmit: function (e) {
    // console.log(e.detail.value)
    var that = this
    var value = e.detail.value
    if (value.name == "") {
      wx.showToast({
        title: '商品标题不能为空',
        icon: "none"
      })
    } else if (value.describle == "") {
      wx.showToast({
        title: '商品描述不能为空',
        icon: "none"
      })
    } else if (value.price < 0 || value.price == "" || value.price > 99999999) {
      wx.showToast({
        title: '价格不能小于零',
        icon: "none"
      })
    } else if (that.data.img == null) {
      wx.showToast({
        title: '你最好能添加几张图片',
        icon: "none"
      })
    } else if (that.data.classId == null) {
      wx.showToast({
        title: '你是不是没选分类啊',
        icon: "none"
      })
    } else {
      //这里添加一个延迟 以免用户多次添加
      wx.showLoading({
        title: '发布中ing...',
        mask: true
      });
      console.log("userId=" + that.data.userInfo.id +
        " classificationId=" + that.data.classId +
        " describle=" + value.describle +
        " name=" + value.name,
        " price=" + value.price)

    }
  },
  bindPickerChange: function (e) {
    var that = this
    console.log('携带值为', e.detail.value)
    that.setData({
      classId: that.data.classification[e.detail.value].id
    })
  },
})