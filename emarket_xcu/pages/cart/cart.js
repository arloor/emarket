// pages/cart/cart.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cart: null,
    cartCells: null,//带num的product数组
    total:0
  },
  countTotal:function(){
    var varTotal=0;
    for (var i = 0; i < this.data.cartCells.length;i++){
      varTotal = varTotal + this.data.cartCells[i].num * this.data.cartCells[i].price
    }
    this.setData({
      total: varTotal
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
   
    console.log("cart onshow 更新cart")
    console.log(app.globalData.cart);
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

    //遍历cart的各个属性（各个属性就是不同的商品）
    var products = [];
    for (var name in this.data.cart) {//遍历对象属性名  
      // console.log(name + ":" + JSON.stringify(this.data.cart[name]));
      products.push(this.data.cart[name]);
    }
    this.setData({
      cartCells:products
    })
    console.log("cartCells: ",this.data.cartCells);
    this.countTotal();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  //页面隐藏，更新后台cart
  onHide: function () {
    console.log("cart onHide 更新cart")
    app.uploadCart();
  },
  //预览商品图片
  previewImage: function (e) {
    var src = e.target.dataset.src;
    var srcArray = new Array(src);
    console.log(e);
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: srcArray // 需要预览的图片http链接列表
    })
    return false;
  },
  minus:function(e){
    console.log("减少", e.target.dataset.pid, "index", e.target.dataset.index)
    var varPid = e.target.dataset.pid
    //减少要做 1 cartCells 2 cart 3 计算总价 4 updatecart
    var varCartCells=this.data.cartCells;
    if (varCartCells[e.target.dataset.index].num>0){
      varCartCells[e.target.dataset.index].num = -1 + varCartCells[e.target.dataset.index].num;
      app.globalData.cart[varPid].num = -1+app.globalData.cart[varPid].num
      this.countTotal();
    }
    this.setData({
      cartCells: varCartCells
    })
    
  },
  add:function(e){
    console.log("增加", e.target.dataset.pid, "index", e.target.dataset.index)
    var varPid = e.target.dataset.pid
    //减少要做 1 cartCells 2 cart 3 计算总价 4 updatecart
    var varCartCells = this.data.cartCells;
      varCartCells[e.target.dataset.index].num = 1 + varCartCells[e.target.dataset.index].num;
      app.globalData.cart[varPid].num = 1 + app.globalData.cart[varPid].num
      console.log(app.globalData.cart[varPid]);
      console.log(app.globalData.cart);
      this.countTotal();
    this.setData({
      cartCells: varCartCells
    })
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    console.log("cart onUnload 更新cart")
    app.uploadCart();
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