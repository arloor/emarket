// pages/bind/bind.js
//获取应用实例
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
  
  },
  showTopTips: function () {
    var that = this;
    this.setData({
      showTopTips: true
    });
    setTimeout(function () {
      that.setData({
        showTopTips: false
      });
    }, 3000);
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
  },

  formSubmit:function(e){
    console.log("填写的用户名密码",e.detail.value);
    if(e.detail.value.username==""||e.detail.value.passwd==""){
      this.showTopTips();
      return;
    }
    app.globalData.weiUser.uname = e.detail.value.username;
    app.globalData.weiUser.passwd = e.detail.value.passwd;
    console.log("全局用户信息：",app.globalData.weiUser);
    //todo
    var that=this;
    wx.request({
      url: app.apiURL+'/weixin/bindUser',
      header: { 'content-type': 'application/json' },
      method: "post",
      data: app.globalData.weiUser,
      success:function(res){
        console.log("绑定结果：",res.data);
        if(res.data.uname==null){
          app.globalData.weiUser=res.data;

          //提示绑定失败
          that.alertBindFail();
        }else{
          app.globalData.weiUser = res.data;
          wx.showToast({
            title: '绑定成功',
          })
          wx.redirectTo({
            url: '/pages/index/index',
          })
        }
        
      }
    })
  },
  quitBind:function(){
    console.log("放弃绑定");
    console.log("全局用户信息：", app.globalData.weiUser);
  },
  alertBindFail: function () {
    wx.showModal({
      content: '用户名或密码错误，请重新绑定',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
        }
      }
    });
  }
})