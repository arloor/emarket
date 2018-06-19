// pages/sellerHome/sellerHome.js
var sliderWidth = 96; // 需要设置slider的宽度，用于计算中间位置
const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tabs: ["待发包裹", "在途包裹", "已达包裹","管理商品"],
    activeIndex: 0,
    sliderOffset: 0,
    sliderLeft: 0,


    waitOrders:[],
    transportOrders:[],
    completeOrders:[],

    products:[],
    hasMore: true
  },

  //点击tab
  tabClick: function (e) {
    this.setData({
      sliderOffset: e.currentTarget.offsetLeft,
      activeIndex: e.currentTarget.id
    });
  },
  fahuo:function(e){
    console.log(e.target.dataset.oid,"发货");

    wx.showModal({
      title: '确认发货',
      content: '请检查输入信息',
      confirmText: "确认",
      cancelText: "修改",
      success: function (res) {
        console.log(res);
        if (res.confirm) {
          console.log('用户点击主操作')
          wx.request({
            url: app.apiURL + '/order/fahuo?oid=' + e.target.dataset.oid + "&sellerName=" + app.globalData.weiUser.uname,
            success: function (res) {
              wx.showModal({
                content: res.data.errMsg,
                showCancel: false,
                success: function (res) {
                  if (res.confirm) {
                    wx.redirectTo({
                      url: '/pages/sellerHome/sellerHome',
                    })
                  }
                }
              });
            }
          })


        } else {
          console.log('用户点击辅助操作')
        }
      }
    });

   

  },
  bohui:function(e){
    console.log(e.target.dataset.oid,"驳回");
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.openLoading();
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

    var that=this;
    wx.request({
      url: app.apiURL +'/order/getSellerOrdersByStatus?sellerName='+app.globalData.weiUser.uname+'&yundanStatus=已送达',
      success:function(res){
        console.log("已送达",res.data);
        that.setData({
          completeOrders:res.data
        })
      }
    })
    wx.request({
      url: app.apiURL + '/order/getSellerOrdersByStatus?sellerName=' + app.globalData.weiUser.uname + '&yundanStatus=待发货',
      success: function (res) {
        console.log("待发货", res.data);
        that.setData({
          waitOrders:res.data
        })
      }
    })
    wx.request({
      url: app.apiURL + '/order/getSellerOrdersByStatus?sellerName=' + app.globalData.weiUser.uname + '&yundanStatus=正在运送',
      success: function (res) {
        console.log("正在运送", res.data);
        that.setData({
          transportOrders:res.data
        })
      }
    })
    //加载不同状态的order完毕


    var that = this
    wx.request({
      url: app.apiURL + '/product/productList?param=sellerName&value=' + app.globalData.weiUser.uname,
      success: function (res) {
        console.log("获取的列表为", res.data);
        if (res.data.length == 0) {
          that.setData({
            hasMore: false
          })
        }
        that.setData({
          products: that.data.products.concat(res.data),
        })
        console.log("更新之后的商品列表", that.data.products);
        if (res.data.length > 0) {
          that.setData({
            minId: res.data[res.data.length - 1].pid
          })
        }
        console.log("此时的minId", that.data.minId);
      }
    })


  },
  //查看更多
  viewMore: function () {
    var that = this
    this.openLoading();
    var varurl = app.apiURL + '/product/productList?param=sellerName&value=' + app.globalData.weiUser.uname + "&minId=" + that.data.minId;
    console.log("更新所请求的url", varurl);
    wx.request({
      url: varurl,
      success: function (res) {
        console.log("获取的列表为", res.data);
        if (res.data.length == 0) {
          that.setData({
            hasMore: false
          })
          wx.showToast({
            title: '没有更多啦',
            duration: 500
          })
        }
        that.setData({
          products: that.data.products.concat(res.data),
        })
        console.log("更新之后的商品列表", that.data.products);
        if (res.data.length > 0) {
          that.setData({
            minId: res.data[res.data.length - 1].pid
          })
        }
        console.log("此时的minId", that.data.minId);
      }
    })
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