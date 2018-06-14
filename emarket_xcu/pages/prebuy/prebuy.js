// pages/prebuy/prebuy.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: 0,
    products: [],
    showPaykey:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if (options.pid != undefined) {//由单个商品详情页面转入
      var that = this;
      wx.request({
        url: app.apiURL + '/product/productDetail?pid=' + options.pid,
        success: function (res) {
          res.data.num = options.num;
          var varProducts = [];
          that.setData({
            products: varProducts.concat(res.data),
            total: res.data.num * res.data.price
          })
          console.log(that.data.products);
        }
      })
    } else {//由购物车进入
      console.log(app.globalData.cartCells);
      this.setData({
        products: app.globalData.cartCells
      })

      var varTotal = 0;
      for (var i = 0; i < app.globalData.cartCells.length; i++) {
        varTotal = varTotal + app.globalData.cartCells[i].num * app.globalData.cartCells[i].price
      }
      this.setData({
        total: varTotal
      })
    }
  },
  checkPaykey:function(){
    this.setData({
      showPaykey:true
    })
  },
  order: function (e) {
    wx.request({
      url: app.apiURL + '/order/new?total=' + this.data.total + '&uname=' + app.globalData.weiUser.uname + '&paykey='+e.detail.value.paykey,
      header: { 'content-type': 'application/json' },
      method: "post",
      data:this.data.products,
      success:function(res){
        console.log(res)
      }
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