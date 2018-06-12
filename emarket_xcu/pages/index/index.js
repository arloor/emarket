//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: 'Hello World',
    weiUser:null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    grids: ["T恤", "帆布袋", "钥匙扣", "笔记本", "杯子", "卡贴", "书签", "明信片", "U盘"]
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '/pages/home/home'
    })
  },
  onLoad: function () {
    //获取用户信息（原来的代码无效）
    if (app.globalData.weiUser) {
      this.setData({
        weiUser: app.globalData.weiUser
      })
      console.log("uname",this.data.weiUser.uname);
      console.log("weiUser", this.data.weiUser);
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
        console.log("index 用户信息：", this.data.weiUser);
      }
      
    }
    //多搞一个js_code
    wx.login({
      success: function (res) {
        if (res.code) {
          console.log("多余地js_code",res.code)
        }
      }
    })
  },
  getUserInfo: function(e) {
    // console.log(e)
    app.globalData.weiUser.avatarUrl = e.detail.userInfo.avatarUrl;
    // app.globalData.weiUser.nickName = e.detail.userInfo.nickName;
    this.setData({
      weiUser: app.globalData.weiUser,
      hasUserInfo: true
    })
    console.log("更新后的weiUser", app.globalData.weiUser);
    wx.redirectTo({
      url: '/pages/bind/bind',
    })
  },
  cancelBind:function(e){
    console.log("注销绑定");
    //todo：连接后端数据库，进行注销
    wx.request({
      url: app.apiURL + '/weixin/unBind?openId=' + this.data.weiUser.openId,
      success:function(res){
        console.log("注销所删除的记录数量",res.data)
      }
    })
    //设置微信小程序的weiUser
    var varWeiUser={};
    varWeiUser.openId=this.data.weiUser.openId;
    this.setData({
      weiUser: varWeiUser,
      hasUserInfo:false//一个标记，用于条件渲染
    })
    app.globalData.weiUser=this.data.weiUser;
    console.log("注销之后的weiUser", app.globalData.weiUser);
    
  },


  //搜索栏相关
  showInput: function () {
    this.setData({
      inputShowed: true
    });
  },
  hideInput: function () {
    this.setData({
      inputVal: "",
      inputShowed: false
    });
  },
  clearInput: function () {
    this.setData({
      inputVal: ""
    });
  },
  inputTyping: function (e) {
    this.setData({
      inputVal: e.detail.value
    });
  }
  
})
