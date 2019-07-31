// pages/goods/goods.js
import requestApi from '../../common/request.js'
// const constants = require('../../utils/constants.js');
// 右侧每一类的 bar 的高度（固定）
const RIGHT_BAR_HEIGHT = 20;
// 右侧每个子类的高度（固定）
const RIGHT_ITEM_HEIGHT = 100;
// 左侧每个类的高度（固定）
const LEFT_ITEM_HEIGHT = 50
var QQMapWX = require('../../utils/qqmap-wx-jssdk.min.js');
var qqmapsdk;
var app = getApp();
Page({
  data: {
    //是否显示下面的购物车
    HZL_isCat: 0,
    //购物车的商品
    HZL_my_cat: [],
    // 购物车的数量
    HZL_num: 0,
    //swiper滑动的数组
    HZL_swiper_ID: 0,

    //模拟 数据
    constants: [],
    // 左 => 右联动 右scroll-into-view 所需的id
    HZL_toView: null,
    // 当前左侧选择的
    HZL_currentLeftSelect: null,
    // 右侧每类数据到顶部的距离（用来与 右 => 左 联动时监听右侧滚动到顶部的距离比较）
    HZL_eachRightItemToTop: [],
    HZL_leftToTop: 0,
    carArray:[],
    totalPrice:0,
    storeList: [],
    currentClass: 1,
    index: 0,
    address: "",
    currentShop: {},
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
  pay() {
    //确认支付逻辑
    let carArray = this.data.carArray
    let num = 0;
    for (let i = 0; i < carArray.length; i++) {
      num += carArray[i].goods_num
    }
    if (num <= 0) {
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
  onLoad: function () {
    var that = this;
    //导航栏的文字
    wx.setNavigationBarTitle({
      title: '商城',
    }),
      // 导航栏的文字颜色和背景的颜色
      wx.setNavigationBarColor({
        frontColor: '#ffffff',
      backgroundColor: '#00a0dc',
        animation: {
          duration: 400,
          timingFunc: 'easeIn'
        }
      })
    //高度大小
    wx.getSystemInfo({
      success: function (res) {
        var HZL_height = res.windowHeight - 50
        var HZL_height1 = res.windowHeight - 110
        that.setData({
          HZL_height: HZL_height,
          HZL_height1: HZL_height1
        })
      }
    });
    qqmapsdk = new QQMapWX({
      key: 'ZFZBZ-ZN5KP-QE4DV-VSBLO-TT2H6-7ZFWJ'
    });
    // that.setData({
    //   // constants: this.data.constants,
    //   // HZL_currentLeftSelect: this.data.constants[0].class_id,
    //   // HZL_eachRightItemToTop: this.HZL_getEachRightItemToTop()
    // })

    this.getGoodsList();
    this.setData({
      HZL_my_cat:[],
      totalPrice:0,
      HZL_num: 0,
      carArray:[]
    })

  },
  calTotalPrice: function () {
    var carArray = this.data.carArray;
    var totalPrice = 0;
    var totalCount = 0;
    console.log(carArray)
    for (var i = 0; i < carArray.length; i++) {
      
      totalPrice += carArray[i].goods_price * carArray[i].num;
      // totalCount += carArray[i].num;
    }
    this.setData({
      // HZL_num: totalPrice,
      totalPrice: totalPrice,
    });
  },
  getGoodsList: function () {
    // let idx = this.data.index;
    // let storeId = this.data.storeList[idx].id;
    let that = this
    let param = {
      // class_1: this.data.currentClass,
      storeId: Number(this.data.index)+1,
      type: 1
    }
    requestApi.request("App/Goods/goodsList", param, (result) => {
      if (result.code == "A00006") {
        for (let i = 0; i < result.data.length; i++) {
           for(let j = 0; j<result.data[i].goods.length;j++){
             result.data[i].goods[j].count = 0;
           }
        }
        that.setData({
          constants: result.data,
          HZL_currentLeftSelect: result.data[0].class_id,
        })
        that.setData({
          HZL_eachRightItemToTop: this.HZL_getEachRightItemToTop()
        })
      }
    })
  },
  onShow: function () {
    let vm = this;
    vm.getUserLocation();
    vm.getStoreList();

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
  //点击分类栏
  HZL_categories: function (e) {
    var that = this;
    that.setData({
      HZL_swiper_ID: e.currentTarget.dataset.index
    })
  },

  // 获取每个右侧的 bar 到顶部的距离，用来做后面的计算。
  HZL_getEachRightItemToTop: function () {
    var obj = {};
    var totop = 0;
    // 右侧第一类肯定是到顶部的距离为 0
    console.log(this.data.constants)
    obj[this.data.constants[0].class_id] = totop
    // 循环来计算每个子类到顶部的高度
    for (let i = 1; i < (this.data.constants.length + 1); i++) {
      totop += (RIGHT_BAR_HEIGHT + this.data.constants[i - 1].goods.length * RIGHT_ITEM_HEIGHT)
      // 这个的目的是 例如有两类，最后需要 0-1 1-2 2-3 的数据，所以需要一个不存在的 'last' 项，此项即为第一类加上第二类的高度。
      obj[this.data.constants[i] ? this.data.constants[i].class_id : 'last'] = totop
    }
    return obj
  },
  // 监听右侧的滚动事件与 HZL_eachRightItemToTop 的循环作对比 从而判断当前可视区域为第几类，从而渲染左侧的对应类。
  right: function (e) {
    for (let i = 0; i < this.data.constants.length; i++) {
      let left = this.data.HZL_eachRightItemToTop[this.data.constants[i].class_id]
      let right = this.data.HZL_eachRightItemToTop[this.data.constants[i + 1] ? this.data.constants[i + 1].class_id : 'last'];
      if (e.detail.scrollTop < right && e.detail.scrollTop >= left) {
        this.setData({
          HZL_currentLeftSelect: this.data.constants[i].class_id,
          HZL_leftToTop: LEFT_ITEM_HEIGHT * i
        })
      }
    }
  },
  // 左侧类的点击事件，点击时，右侧会滚动到对应分类
  left: function (e) {
    console.log(e)
    this.setData({
      HZL_toView: e.target.id || e.target.dataset.id,
      HZL_currentLeftSelect: e.target.id || e.target.dataset.id
    })
    console.log(this.data.HZL_toView)
  },


  //是否显示下面的购物车
  HZL_isCat: function (e) {
    var that = this;
    if (that.data.HZL_isCat == 0 && that.data.HZL_num > 0) {
      that.setData({
        HZL_isCat: 1
      })
    } else if (that.data.HZL_isCat == 1 && that.data.HZL_num > 0) {
      that.setData({
        HZL_isCat: 0
      })
    }
  },

  //关闭
  HZL_isCat_close: function (e) {
    this.setData({
      HZL_isCat: 0
    })
  },

  //清空
  HZL_zero: function (e) {
    for (var i = 0; i < this.data.constants.length; i++) {
      for (var j = 0; j < this.data.constants[i].goods.length; j++) {
        this.data.constants[i].goods[j].count = 0
      }
    }
    this.setData({
      HZL_isCat: 0,
      HZL_num: 0,
      HZL_my_cat: [],
      constants: this.data.constants,
    })
  },

  // 增加
  HZL_jia: function (e) {
    var index = e.currentTarget.dataset.index;
    var parentIndex = e.currentTarget.dataset.parentindex;
    var HZL_my_cat = this.HZL_my_jia(parentIndex, index)
    this.setData({
      HZL_num: this.data.HZL_num,
      HZL_my_cat: HZL_my_cat,
      constants: this.data.constants,
    })
  },

  //减少
  HZL_jian: function (e) {
    var index = e.currentTarget.dataset.index;
    var parentIndex = e.currentTarget.dataset.parentindex;
    var HZL_my_cat = this.HZL_my_jian(parentIndex, index)

    if (this.data.HZL_num == 0) {
      this.data.HZL_isCat = 0;
    } else {
      this.data.HZL_isCat = 1;
    }

    this.setData({
      HZL_num: this.data.HZL_num,
      HZL_my_cat: HZL_my_cat,
      constants: this.data.constants,
    })
    
  },

  // 下面购物车增加
  HZL_jia1: function (e) {
    var index = e.currentTarget.dataset.index;
    var parentIndex = e.currentTarget.dataset.parentindex;
    var HZL_my_cat = this.HZL_my_jia(parentIndex, index)
    this.setData({
      HZL_num: this.data.HZL_num,
      HZL_my_cat: HZL_my_cat,
      constants: this.data.constants,
    })
  },

  //下面购物车减少
  HZL_jian1: function (e) {
    var index = e.currentTarget.dataset.index;
    var parentIndex = e.currentTarget.dataset.parentindex;
    var HZL_my_cat = this.HZL_my_jian(parentIndex, index)

    if (this.data.HZL_num == 0) {
      this.data.HZL_isCat = 0;
    } else {
      this.data.HZL_isCat = 1;
    }

    this.setData({
      HZL_num: this.data.HZL_num,
      HZL_my_cat: HZL_my_cat,
      constants: this.data.constants,
      HZL_isCat: this.data.HZL_isCat
    })
  },

  //封装加的方法
  HZL_my_jia: function (parentIndex, index) {
    this.data.HZL_num++;
    var index = index;
    var parentIndex = parentIndex;
    var id = this.data.constants[parentIndex].goods[index].id;
    var name = this.data.constants[parentIndex].goods[index].goods_name;
    var num = ++this.data.constants[parentIndex].goods[index].count;
    var goods_price = this.data.constants[parentIndex].goods[index].goods_price;
    //弄一个元素判断会不会是重复的
    var mark = 'a' + index + 'b' + parentIndex + 'c' + '0' + 'd' + '0'
    var obj = { num: num, name: name, mark: mark, index: index, parentIndex: parentIndex, goods_price: goods_price, store_id: Number(this.data.index) + 1, goods_num: num, goods_name: name,id:id};
    var HZL_my_cat = this.data.HZL_my_cat;
    HZL_my_cat.push(obj)

    var arr = [];
    //去掉重复的
    for (var i = 0; i < HZL_my_cat.length; i++) {
      if (obj.mark == HZL_my_cat[i].mark) {
        HZL_my_cat.splice(i, 1, obj)
      }
      if (arr.indexOf(HZL_my_cat[i]) == -1) {
        arr.push(HZL_my_cat[i]);
      }
    }
    this.setData({
      carArray: arr
    })
    this.calTotalPrice();
    return arr
  },

  //封装减的方法
  HZL_my_jian: function (parentIndex, index) {
    this.data.HZL_num--;
    var index = index;
    var parentIndex = parentIndex;
    var id = this.data.constants[parentIndex].goods[index].id;
    var name = this.data.constants[parentIndex].goods[index].goods_name;
    var num = --this.data.constants[parentIndex].goods[index].count;
    var goods_price = this.data.constants[parentIndex].goods[index].goods_price;
    //弄一个元素判断会不会是重复的
    var mark = 'a' + index + 'b' + parentIndex + 'c' + '0' + 'd' + '0'
    var obj = { num: num, name: name, mark: mark, index: index, parentIndex: parentIndex, goods_price: goods_price, store_id: Number(this.data.index) + 1, goods_num: num, goods_name: name,id:id};
    var HZL_my_cat = this.data.HZL_my_cat;
    HZL_my_cat.push(obj)

    var arr = [];
    //去掉重复的
    for (var i = 0; i < HZL_my_cat.length; i++) {
      if (obj.mark == HZL_my_cat[i].mark) {
        HZL_my_cat.splice(i, 1, obj)
      }
    }


    var arr1 = [];
    //当数量大于1的时候加
    for (var i = 0; i < HZL_my_cat.length; i++) {
      if (arr1.indexOf(HZL_my_cat[i]) == -1) {
        arr1.push(HZL_my_cat[i]);
        if (HZL_my_cat[i].num > 0) {
          arr.push(arr1[i])
        }
      }
    }

    this.setData({
      carArray:arr
    })
    this.calTotalPrice();
    return arr
  },

})