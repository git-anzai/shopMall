// pages/goods/goods.js
import requestApi from '../../common/request.js'
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
Page({
  data: {
    storeList: [{
      "id": "1",
      "store_name": "\u6bcd\u5a74\u4e00\u53f7\u5e97",
      "store_owner": "\u6653\u767d",
      "store_create": "2019-05-22 14:04:02",
      "store_phone": "13112322345",
      "store_location": null,
      "store_update": "2019-05-22 14:07:03",
      "stroe_address": "\u5c71\u4e1c\u7701\uff0c\u70df\u53f0\u5e02\uff0c\u88d5\u534e\u533a\uff0c\u548c\u5e73\u8def234\u53f7"
    }, {
      "id": "2",
      "store_name": "222",
      "store_owner": "\u6653\u767d",
      "store_create": "2019-05-22 14:04:02",
      "store_phone": "222",
      "store_location": null,
      "store_update": "2019-05-22 14:07:03",
      "stroe_address": "222"
    }],
    classList: [{ "id": "1", "class_name": "\u6d17\u62a4\u7c7b", "class_parent_id": "0", "class_type": "1", "class_create": "2019-06-01 16:01:30" }],
    currentClass: 1,
    goodsList: [],
    index: 0,
    address: "",
    listShow: false,
    currentShop: {},
    goods: [],
    scrollTop: 100,
    foodCounts: 0,
    totalPrice: 0,// 总价格
    totalCount: 0, // 总商品数
    carArray: [],
    fold: true,
    selectFoods: [{ price: 20, count: 2 }],
    cartShow: 'none',
    status: 0,
  },
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail)
    let idx = e.detail.value;
    let currentShop = this.data.storeList[idx];
    this.setData({
      index: e.detail.value,
      currentShop: currentShop
    })
    this.getGoodsList();
  },
  selectMenu: function (e) {
    var index = e.currentTarget.dataset.itemIndex;
    this.setData({
      currentClass:index+1
    })
    this.getGoodsList();
  },
  //移除商品
  decreaseCart: function (e) {
    // var index = e.currentTarget.dataset.itemIndex;
    var parentIndex = e.currentTarget.dataset.parentindex;
    if (this.data.goodsList[parentIndex].Count<=0){
      return;
    }
    this.data.goodsList[parentIndex].Count--;
    var num = this.data.goodsList[parentIndex].Count;
    var name = this.data.goodsList[parentIndex].goods_name;
    var mark = 'a' + parentIndex + "b" + this.data.currentClass
    var price = this.data.goodsList[parentIndex].goods_price;
    var store_id = this.data.goodsList[parentIndex].store_id;
    var id = this.data.goodsList[parentIndex].id;
    var obj = { goods_price: price, goods_num: num, goods_name: name, store_id: store_id, mark: mark, id: id, parentIndex: parentIndex };
    var carArray1 = this.data.carArray.filter(item => item.mark != mark)
    carArray1.push(obj)
    this.setData({
      carArray: carArray1,
      goodsList: this.data.goodsList
    })
    this.calTotalPrice()
    //关闭弹起
    var count1 = 0
    for (let i = 0; i < this.data.carArray.length; i++) {
      if (this.data.carArray[i].goods_num == 0) {
        count1++;
      }
    }
    //console.log(count1)
    if (count1 == this.data.carArray.length) {
      if (num == 0) {
        this.setData({
          cartShow: 'none',
          listShow: false
        })
      }
    }
  },
  decreaseShopCart: function (e) {
    this.decreaseCart(e);
  },
  empty:function() {
    for(var i =0;i<this.data.goodsList.length;i++){
      this.data.goodsList[i].Count=0
    }
      this.data.carArray = []
    this.setData({
      goodsList:this.data.goodsList,
      carArray: this.data.carArray,
      cartShow:"none",
      listShow: false
    })
    this.calTotalPrice();

  },
  //添加到购物车
  addCart(e) {
    var parentIndex = e.currentTarget.dataset.parentindex;
    this.data.goodsList[parentIndex].Count++;
    var mark = 'a' + parentIndex + "b" + this.data.currentClass
    var price = this.data.goodsList[parentIndex].goods_price;
    var num = this.data.goodsList[parentIndex].Count;
    var name = this.data.goodsList[parentIndex].goods_name;
    var store_id = this.data.goodsList[parentIndex].store_id;
    var id = this.data.goodsList[parentIndex].id;
    var obj = { goods_price: price, goods_num: num, goods_name: name, store_id: store_id, mark: mark, id: id, parentIndex: parentIndex};
    var carArray1 = this.data.carArray.filter(item => item.mark != mark)
    carArray1.push(obj)
    this.setData({
      carArray: carArray1,
      goodsList: this.data.goodsList
    })
    this.calTotalPrice();
  },
  addShopCart: function (e) {
    this.addCart(e);
  },
  //计算总价
  calTotalPrice: function () {
    var carArray = this.data.carArray;
    var totalPrice = 0;
    var totalCount = 0;
    for (var i = 0; i < carArray.length; i++) {
      totalPrice += carArray[i].goods_price * carArray[i].goods_num;
      totalCount += carArray[i].goods_num;
    }
    this.setData({
      totalPrice: totalPrice,
      totalCount: totalCount,
    });
  },
  //差几元起送
  payDesc() {
    if (this.data.totalPrice === 0) {
      return `￥${this.data.minPrice}元起送`;
    } else if (this.data.totalPrice < this.data.minPrice) {
      let diff = this.data.minPrice - this.data.totalPrice;
      return '还差' + diff + '元起送';
    } else {
      return '去结算';
    }
  },
  //結算
  pay() {
    //确认支付逻辑
    let carArray = this.data.carArray
    let num = 0;
    for (let i = 0; i < carArray.length;i++ ){
      num += carArray[i].goods_num
    }
    if(num<=0){
      wx.showToast({
        title: '请添加商品到购物车',
        icon: 'none',
        duration: 2000
      })
    } else {
      let param = {
        list: this.data.carArray,
        type: "1"
      }
      requestApi.request("App/order/makeOrder", param, (result) => {//signUp
        if ("A00006" == result.code) {
          wx.navigateTo({
            url: '../pay/pay?orderCode=' + result.data
          })
        }
      })
    }
  },
  //彈起購物車
  toggleList: function () {
    if (!this.data.totalCount) {
      return;
    }
    this.setData({
      fold: !this.data.fold,
    })
    var fold = this.data.fold
    //console.log(this.data.fold);
    this.cartShow(fold)
  },
  cartShow: function (fold) {
    console.log(fold);
    
    if (fold == false) {
      this.setData({
        cartShow: 'block',
        listShow: true
      })
    } else {
      this.setData({
        cartShow: 'none',
        listShow: false
      })
    }
    console.log(this.data.cartShow);
  },
  tabChange: function (e) {
    var showtype = e.target.dataset.type;
    this.setData({
      status: showtype,
    });
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数

    qqmapsdk = new QQMapWX({
      key: 'ZFZBZ-ZN5KP-QE4DV-VSBLO-TT2H6-7ZFWJ'
    });
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    let vm = this;
    vm.getUserLocation();
    vm.getStoreList();
    // vm.getClassList();
    vm.getGoodsList();
  },
  getStoreList: function () {
    let param = {
    }
    requestApi.request("App/Store/storeList", param, (result) => {//signUp
      if (result.code == "A00006") {
        this.setData({
          storeList: result.data
        })
        let idx = this.data.index;
        let currentShop = this.data.storeList[idx];
        this.setData({
          currentShop: currentShop
        })
      }
    })
  },
  getClassList: function () {
    let param = {
      type:1
    }
    requestApi.request("App/Goods/classList", param, (result) => {//signUp
      if (result.code == "A00006") {
        this.setData({
          classList: result.data
        })
      }
    })
  },
  getGoodsList: function () {
    let idx = this.data.index;
    let storeId = this.data.storeList[idx].id;
    let param = {
      class_1: this.data.currentClass,
      storeId: storeId,
      type:1
    }
    requestApi.request("App/Goods/goodsList", param, (result) => {
      if (result.code == "A00006") {
        for(let i =0;i<result.data.length;i++){
            result.data[i].Count=0
        }
        this.setData({
          goodsList: result.data
        })
      }
    })
  },
  getUserLocation: function () {
    let vm = this;
    wx.getSetting({
      success: (res) => {
        // res.authSetting['scope.userLocation'] == undefined    表示 初始化进入该页面
        // res.authSetting['scope.userLocation'] == false    表示 非初始化进入该页面,且未授权
        // res.authSetting['scope.userLocation'] == true    表示 地理位置授权
        if (res.authSetting['scope.userLocation'] != undefined && res.authSetting['scope.userLocation'] != true) {
          wx.showModal({
            title: '请求授权当前位置',
            content: '需要获取您的地理位置，请确认授权',
            success: function (res) {
              if (res.cancel) {
                wx.showToast({
                  title: '拒绝授权',
                  icon: 'none',
                  duration: 1000
                })
              } else if (res.confirm) {
                wx.openSetting({
                  success: function (dataAu) {
                    if (dataAu.authSetting["scope.userLocation"] == true) {
                      wx.showToast({
                        title: '授权成功',
                        icon: 'success',
                        duration: 1000
                      })
                      //再次授权，调用wx.getLocation的API
                      vm.getLocation();
                    } else {
                      wx.showToast({
                        title: '授权失败',
                        icon: 'none',
                        duration: 1000
                      })
                    }
                  }
                })
              }
            }
          })
        } else if (res.authSetting['scope.userLocation'] == undefined) {
          //调用wx.getLocation的API
          vm.getLocation();
        }
        else {
          //调用wx.getLocation的API
          vm.getLocation();
        }
      }
    })
  },
  // 微信获得经纬度
  getLocation: function () {
    let vm = this;
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var speed = res.speed
        var accuracy = res.accuracy;
        vm.getLocal(latitude, longitude)
      },
      fail: function (res) {
        console.log('fail' + JSON.stringify(res))
      }
    })
  },
  // 获取当前地理位置
  getLocal: function (latitude, longitude) {
    let vm = this;
    qqmapsdk.reverseGeocoder({
      location: {
        latitude: latitude,
        longitude: longitude
      },
      success: function (res) {
        let address = res.result.address
        vm.setData({
          address: address,
        })
      },
      fail: function (res) {
        console.log(res);
      },
      complete: function (res) {
        // console.log(res);
      }
    });
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})
