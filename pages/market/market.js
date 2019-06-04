// pages/market/market.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgWidth: 0, imgHeight: 0,
    showtab: 0,  //顶部选项卡索引
    tabnav: {
      tabnum: 5,
      tabitem: [
        {
          "id": 0,
          "text": "商品"
        },
        {
          "id": 1,
          "text": "商品分类2"
        },
        {
          "id": 2,
          "text": "商品分类3"
        },
        {
          "id": 3,
          "text": "商品分类4"
        },
        {
          "id": 4,
          "text": "商品分类5"
        },
        {
          "id": 5,
          "text": "商品分类6"
        },
        {
          "id": 6,
          "text": "商品分类7"
        }
      ],
      productList: [],
    },
    note: [
      {
        title: '案例名称',
        url: 'http://zq.jhcms.cn/attachs/photo/201711/20171130_176CFE51B6710715B1BBBEF2F86ACB0C.jpg',
      },
      {
        title: '你所不知道的红酒知识',
        url: 'http://img3.imgtn.bdimg.com/it/u=1417732605,3777474040&fm=26&gp=0.jpg',
      },
      {
        title: '红酒知识',
        url: 'http://f10.baidu.com/it/u=121654667,1482133440&fm=72',
      },
      {
        title: '案例名称',
        url: 'http://zq.jhcms.cn/attachs/photo/201711/20171130_9E39DA252E3946BE36218D85876C4AB4.jpg',
      },
      {
        title: '案例名称',
        url: 'http://img3.imgtn.bdimg.com/it/u=1417732605,3777474040&fm=26&gp=0.jpg'
      },

      {
        title: '案例名称',
        url: 'http://f10.baidu.com/it/u=121654667,1482133440&fm=72'
      },
      {
        title: '案例名称',
        url: 'http://img4.imgtn.bdimg.com/it/u=2748975304,2710656664&fm=26&gp=0.jpg'
      },
      {
        title: '案例名称',
        url: 'http://img2.imgtn.bdimg.com/it/u=1561660534,130168102&fm=26&gp=0.jpg'
      },
      {
        title: '案例名称案例名称案例名称案例名称案例名称',
        url: 'http://img3.imgtn.bdimg.com/it/u=1417732605,3777474040&fm=26&gp=0.jpg'
      }
    ]
  },
  goAdd:function() {
    wx.navigateTo({
      url: '../add/add'
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