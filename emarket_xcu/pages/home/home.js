var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置

const app = getApp();

Page({
  data: {
    tabs: ["待发包裹", "在途包裹", "已达包裹"],
    activeIndex: 1,
    sliderOffset: 0,
    sliderLeft: 0,
    role: "ROLE_MEMBER",
    waitYundans: [],
    transportYundans: [],
    completeYundans: []
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
      url: app.apiURL + '/order/getYundans?uname=' + app.globalData.weiUser.uname + '&yundanStatus=待发货',
      success: function (res) {
        that.setData({
          waitYundans: res.data
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
  yundanComplete: function (e) {
    var theThat=this
    wx.showModal({
      title: '确认收货',
      content: '确认收货，货款将进入卖家账户',
      confirmText: "确认",
      cancelText: "取消",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户确认确认收货')
          var that = theThat;

          wx.request({
            url: app.apiURL + '/order/setYundanComplete?yundan=' + e.target.dataset.yundan,
            success:function(res){
              console.log("服务器更新包裹为已送达的结果：", res.data);
              if(res.data==true){
                console.log("确认到达：", e.target.dataset.yundan);
                for (var i = 0; i < that.data.transportYundans.length; i++) {
                  var tempCompleteYundans = that.data.completeYundans;
                  var tempTransportYundans = [];
                  var tempYundan = {}
                  if (that.data.transportYundans[i].yundan == e.target.dataset.yundan) {
                    //标记为已送达的订单
                    tempYundan.yundan = e.target.dataset.yundan;
                    tempYundan.yundanDetailList = [];
                    for (var j = 0; j < that.data.transportYundans[i].yundanDetailList.length; j++) {
                      that.data.transportYundans[i].yundanDetailList[j].yundanStatus = "已送达"
                      tempYundan.yundanDetailList.push(that.data.transportYundans[i].yundanDetailList[j]);
                    }
                    tempCompleteYundans.push(tempYundan);
                  } else {//未送达的订单
                    tempTransportYundans.push(that.data.transportYundans[i]);
                  }
                }
                that.setData({
                  completeYundans: tempCompleteYundans,
                  transportYundans: tempTransportYundans
                })
                wx.showToast({
                  title: '确认收货成功',
                  duration:1000
                })
              }else{//数据库更新包裹为已送达失败
                wx.showModal({
                  content: '确认收获失败，我也不知道怎么会失败。这条信息应该不会出现才对',
                  showCancel: false,
                  success: function (res) {
                    if (res.confirm) {
                      console.log('用户点击确定')
                    }
                  }
                });
              }
            }
          })




        } else {
          console.log('用户取消确认收货')
        }
      }
    });
  }
});