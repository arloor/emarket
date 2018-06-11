//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    weiUser:null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    //获取用户信息（原来的代码无效）
    if (app.globalData.weiUser) {
      this.setData({
        weiUser: app.globalData.weiUser
      })
      console.log("uname"+this.data.weiUser.uname);
      if (this.data.weiUser.uname != null) {
        this.setData({
          hasUserInfo: true
        })
      }
    } else {
      // 由于 请求getinfo接口 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        console.log("尚未加载用户信息");
        this.setData({
          weiUser: res.data
        })
        console.log("uname" , this.data.weiUser.uname);
        if (this.data.weiUser.uname != null) {
          this.setData({
            hasUserInfo: true
          })
        }
        console.log("index 用户信息：", this.data);
      }
      
    }
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log("js_code",res.code)
        }
      }
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
    wx.navigateTo({
      url: '/pages/bind/bind',
    })
  }
  
})
