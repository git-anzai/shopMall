// pages/add/add.js
import requestApi from '../../common/request.js'
var util = require('../../utils/util.js');
var app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    index: -1,
    img: null,
    classId: null,
    classification: null,
    userInfo: null,
    latitude: '',
    longitude: '',
    goods_cover: '',
    descImg: [],
    classList:[],
    inputTit:'',
    descTxt:'',
    priceTxt:''
  },
  inputTit:function(e) {
    this.data.inputTit = e.detail.value;
  },
  inputDesc:function(e) {
    this.data.descTxt = e.detail.value;
    console.log(this.data.descTxt);
  },
  inputPrice:function(e) {
    this.data.priceTxt = e.detail.value
  },
  getAddress: function() {
    wx.getLocation({
      type: 'wgs84',
      success: (res) => {
        this.setData({
          latitude: res.latitude,
          longitude: res.longitude
        })
      },
      fail: function(res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  updateF: function() {
    var that = this
    wx.chooseImage({
      sourceType: ['album', 'camera'],
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        console.log(tempFilePaths)
        wx.uploadFile({
          url: 'https://www.zdzzk.com/App/Goods/uploadImg', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'userId': wx.getStorageSync("userId") || ''
          },
          success: function(res) {
            let imgName = JSON.parse(res.data).data.imgName;
            that.setData({
              goods_cover: imgName
            })
          }
        })
      }
    })
  },
  updataimg: function() {
    var that = this
    wx.chooseImage({
      sourceType: ['album', 'camera'],
      success: function(res) {
        var tempFilePaths = res.tempFilePaths
        wx.uploadFile({
          url: 'https://www.zdzzk.com/App/Goods/uploadImg', //仅为示例，非真实的接口地址
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'userId': wx.getStorageSync("userId") || ''
          },
          success: (res) => {
            console.log(res)
            let imgName = JSON.parse(res.data).data.imgName;
            let arr = [imgName];
            let img = that.data.descImg.concat(arr);
            that.setData({
              descImg: img
            })
          }
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function(options) {
    this.getAddress();
    // var that = this

    // wx.getStorage({
    //   key: 'userInfo',
    //   success: function (res) {
    //     console.log(res.data)
    //     that.setData({
    //       userInfo: res.data
    //     })
    //   },
    // })
  },
  subMit:function() {
    if (this.data.inputTit == "") {
      wx.showToast({
        title: '商品标题不能为空',
        icon: "none"
      })
    } else if (this.data.descTxt == "") {
      wx.showToast({
        title: '商品描述不能为空',
        icon: "none"
      })
    } else if (this.data.priceTxt < 0 || this.data.priceTxt == "" || this.data.priceTxt > 99999999) {
      wx.showToast({
        title: '价格不能小于零',
        icon: "none"
      })
    } else if (this.data.goods_cover == "") {
      wx.showToast({
        title: '请添加商品封面',
        icon: "none"
      })
    } else if (this.data.descImg.length<=0) {
      wx.showToast({
        title: '你最好能添加几张图片',
        icon: "none"
      })
    } else if (this.data.classId == null) {
      wx.showToast({
        title: '你是不是没选分类啊',
        icon: "none"
      })
    } else {
      //这里添加一个延迟 以免用户多次添加
      wx.showLoading({
        title: '发布中ing...',
      });
      let param = {
        type: 2,
        imgUrl: this.data.descImg,
        goods_cover: this.data.goods_cover,
        introduce: this.data.descTxt,
        title: this.data.inputTit,
        class_1: this.data.classId,
        price: this.data.priceTxt,
        localtion: `${this.data.latitude},${this.data.longitude}`

      }
      requestApi.request("App/Goods/publishGoods", param, (result) => {
        console.log("djshjdkjdsik", result)
        if (result.code == "A00006") {
            wx.hideLoading();
          wx.showToast({
            title: result.message,
            icon: "none",
            duration: 2000
          })
        }
      })
    }


  },
  getClassList: function () {
    let param = {
      type: 2
    }
    requestApi.request("App/Goods/classList", param, (result) => {
      if (result.code == "A00006") {
        this.setData({
          classList: result.data
        })
      }
    })
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
    this.getClassList();
  },

  bindPickerChange: function(e) {
    var that = this
    console.log('携带值为', e.detail.value)
    that.setData({
      classId: that.data.classList[e.detail.value].id,
      index:e.detail.value
    })
  },
})