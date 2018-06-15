// pages/prebuy/prebuy.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    total: 0,
    products: [],
    consignee: null,
    paykey:null,
    cart:false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that=this;
    wx.request({
      url: app.apiURL + '/order/getConsignee?uname='+app.globalData.weiUser.uname,
      success:function(res){
        that.setData({
          consignee:res.data
        })
        console.log( "从服务器获得的用户收获人信息：",res.data)
      }
    })
    console.log(options);

    if (options.pid != undefined) {//由单个商品详情页面转入
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
        products: app.globalData.cartCells,
        cart:true
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
  checkConsignee: function (e) {
    console.log("用户点击付款，表单的值：",e.detail.value)
    //检查非空
    for (var name in e.detail.value) {
      if (e.detail.value[name] == "") {
        wx.showModal({
          content: '请完整填写信息',
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        });
        return false;
      }
    }
    //设置收货人信息
    var varConsignee = {};
    varConsignee.uname = app.globalData.weiUser.uname
    varConsignee.consignee = e.detail.value.consignee
    varConsignee.tel = e.detail.value.tel
    varConsignee.addr = e.detail.value.addr
    varConsignee.zipcode = e.detail.value.zipcode
    this.setData({
      consignee: varConsignee,
      paykey: e.detail.value.paykey
    })

    var that=this
    wx.request({
      url: app.apiURL + '/order/updateConsignee',
      header: { 'content-type': 'application/json' },
      method: "post",
      data: this.data.consignee,
      success: function () {
        var thatthat=that
        wx.showModal({
          title: '确认收货人信息',
          content: that.data.consignee.consignee + "  " + that.data.consignee.tel + "  " + that.data.consignee.addr,
          confirmText: "确认",
          cancelText: "修改",
          success: function (res) {
            if (res.confirm) {
              console.log('用户确认收货人信息，开始下单')
              var thatthatthat=thatthat;
              wx.request({
                url: app.apiURL + '/order/new?total=' + thatthat.data.total + '&uname=' + app.globalData.weiUser.uname + '&paykey=' + thatthat.data.paykey,
                header: { 'content-type': 'application/json' },
                method: "post",
                data: thatthat.data.products,
                success: function (res) {
                  console.log("下单结果",res.data)
                  if(res.data.errCode=="OK"){
                    wx.showModal({
                      content: "下单成功    "+res.data.errMsg,
                      showCancel: false,
                      success: function (res) {
                        if (thatthatthat.data.cart == true) {
                          console.log('清空购物车信息')
                          app.globalData.cart = {};
                        }
                        if (res.confirm) {
                          console.log('用户确定下单成功')
                          wx.reLaunch({
                            url: '/pages/index/index',
                          })
                        }
                        
                      }
                    });
                  }else{
                    wx.showModal({
                      content: "下单失败    " + res.data.errMsg,
                      showCancel: false,
                      success: function (res) {
                        if (res.confirm) {
                          console.log('用户确定下单失败结果')
                        }
                      }
                    });
                  }
                }
              })

            } else {
              console.log('用户点击修改收货人信息')
            }
          }
        });
      }

    })



  },
  order: function (e) {
    
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