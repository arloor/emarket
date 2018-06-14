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
    // 获取用户信息
    // wx.getSetting({
    //   success: res => {
    //     if (res.authSetting['scope.userInfo']) {
    //       // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
    //       wx.getUserInfo({
    //         success: res => {
    //           // 可以将 res 发送给后台解码出 unionId


    //           this.globalData.userInfo = res.userInfo

    //           // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
    //           // 所以此处加入 callback 以防止这种情况
    //           if (this.userInfoReadyCallback) {
    //             this.userInfoReadyCallback(res)
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
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
      success:function(){
        console.log("更新服务器购物车成功")
      }
    })
  }
})