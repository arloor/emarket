var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

const app =getApp();

Page({
  data: {
    tabs: ["待发包裹", "在途包裹", "已达包裹"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    role: "ROLE_MEMBER",
    waitYundans:[],
    transportYundans:[],
    completeYundans:[]
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

    //获取运单信息（待发货、正在运输、已送达
    wx.request({
      url: app.apiURL +'/order/getYundans?uname='+app.globalData.weiUser.uname+'&yundanStatus=待发货',
      success:function(res){
        that.setData({
          waitYundans:res.data
        })
        console.log("待发包裹", that.data.waitYundans);
      }
    })
    wx.request({
      url: app.apiURL + '/order/getYundans?uname=' + app.globalData.weiUser.uname + '&yundanStatus=正在运送',
      success: function (res) {
        that.setData({
          transportYundans: res.data
        })
        console.log("在途包裹", that.data.transportYundans);
      }
    })
    wx.request({
      url: app.apiURL + '/order/getYundans?uname=' + app.globalData.weiUser.uname + '&yundanStatus=已送达',
      success: function (res) {
        that.setData({
          completeYundans: res.data
        })
        console.log("已达包裹", that.data.completeYundans);
      }
    })
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
  yundanComplete:function(e){
    console.log("确认到达：",e.target.dataset.yundan);
  }
});