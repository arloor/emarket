var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

const app =getApp();

Page({
  data: {
    tabs: ["待发包裹", "在途包裹", "已达包裹"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    role: "ROLE_MEMBER",
  },
  onLoad: function () {
    this.openLoading();
    this.setData({
      role: app.globalData.weiUser.role
    });
    console.log(this.data.role, app.globalData.weiUser.nickName, "进入个人中心");

    //设置tab相关
    var that = this;
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          sliderLeft: (res.windowWidth / that.data.tabs.length - sliderWidth) / 2,
          sliderOffset: res.windowWidth / that.data.tabs.length * that.data.activeIndex
        });
      }
    });
  },

  //点击tab
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },

  openLoading: function () {
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 1000
    });
  },
});