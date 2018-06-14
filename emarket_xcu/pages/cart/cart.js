// pages/cart/cart.js
const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
  cart:null
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
    //保证每次显示cart，cart都是最新的app。globalData。cart
    if (app.globalData.cart != null) {
      this.setData({
        cart: app.globalData.cart
      })
      console.log("cart 购物车信息", this.data.cart);
    } else {
      app.cartInfoReadyCallBack = res => {
        console.log("尚未加载购物车");
        this.setData({
          cart: res.data
        })
        console.log("cart 购物车信息", this.data.cart);
      }
    }
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