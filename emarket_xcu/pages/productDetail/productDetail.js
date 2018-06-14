// pages/productDetail/productDetail.js
const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    product:{},
    op:null,//操作：加购物车还是购买 加车 购买
    nums:[1,2,3,4,5,6,7,8,9,10],
    pickIndex:0,
    num:1
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("页面跳转options", options)
    console.log("查询商品信息，pid", options.pid);
    var that=this;
    wx.request({
      url: app.apiURL + '/product/productDetail?pid=' + options.pid,
      success: function (res) {
        that.setData({
          product:res.data
        })
        console.log(that.data.product);
      }
    })
  },
  pressAddCart:function(){
    this.setData({
      op:"加车"
    })
    console.log(this.data.op);
  },
  pressBuy: function () {
    this.setData({
      op: "购买"
    })
    console.log(this.data.op);
  },
  doOp:function(e){
    console.log(this.data.op+"数量",this.data.num);

    //加入购物车
    if(this.data.op=="加车"){
      console.log("要加入global cart的产品信息：", this.data.product)
      //遍历查看是否有同样的商品
      var key = this.data.product.pid
      //未加过车
      if (app.globalData.cart[key] == undefined) {
        app.globalData.cart[key] = this.data.product
        app.globalData.cart[key].num = this.data.num;
      } else {
        app.globalData.cart[key].num += this.data.num
      }
      console.log("现在的global cart ", key, " 商品的数量", app.globalData.cart[key].num);
      console.log("现在的global cart ",app.globalData.cart);
      app.uploadCart();
      var that=this
      wx.showModal({
        content: '加入购物车成功',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            wx.redirectTo({
              url: '/pages/productDetail/productDetail?pid=' + that.data.product.pid,
            })
          }
        }
      });
    }else{//点击购买  todo

    }
  },
  bindPickerChange: function (e) {
    // console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      pickIndex: e.detail.value,
      num: parseInt(e.detail.value)+1
    })
    // console.log(this.data.op,"数量被设为",this.data.num)
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

  },
  //预览商品图片
  previewImage: function (e) {
    var src = e.target.dataset.src;
    var srcArray = new Array(src);
    console.log(e);
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: new Array().concat(this.data.product.imageURL) // 需要预览的图片http链接列表
    })
    return false;
  }
})