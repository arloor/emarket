//app.js
App({
  // apiURL: "https://api.moontell.cn/api",
  apiURL:"https://nywc.moontell.cn/market/api",
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    var that = this;
    // 登录
    wx.login({
      success: res => {
        console.log(res);
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        wx.request({
          url: that.apiURL + "/weixin/getInfo?js_code=" + res.code,
          success: function (e) {
            that.globalData.weiUser = e.data;
            console.log("app用户信息", that.globalData.weiUser);
            if (that.userInfoReadyCallback) {
              that.userInfoReadyCallback(e)
            }
            if (that.globalData.weiUser.uname != null) {
              //加载购物车信息
              wx.request({
                url: that.apiURL + '/cart/getCart?uname=' + that.globalData.weiUser.uname,
                success: function (res) {


                  //删除数量为0的商品
                  for (var name in res.data) {//遍历对象属性名  
                    // console.log(name + ":" + JSON.stringify(this.data.cart[name]));
                    if (res.data[name].num == 0) {
                      delete res.data[name]
                    }
                  }
                  //设置用户的购物车
                  that.globalData.cart = res.data;
                  console.log("app 购物车信息：", res.data);
                  //这里可能需要这个回调 cartInfoReadyCallBack
                  if (that.cartInfoReadyCallBack) {
                    that.cartInfoReadyCallBack(res)
                  }
                }
              })
            }
          }
        })

      }
    })
  },
  globalData: {
    // userInfo: null,
    weiUser: null,
    cart: null
  },
  uploadCart: function () {
    console.log("请求参数", "uname=" + this.globalData.weiUser.uname + "&cart=" + JSON.stringify(this.globalData.cart));
    wx.request({
      url: this.apiURL + '/cart/updateCart',
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      method: "post",
      data: "uname=" + this.globalData.weiUser.uname + "&cart=" + JSON.stringify(this.globalData.cart),
      success: function () {
        console.log("更新服务器购物车成功")
      }
    })

  }
})