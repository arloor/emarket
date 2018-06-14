// pages/tagproducts/tagproducts.js
const app=getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
      products:[],
      minId:null,
      sellerNickName:"",
      sellerName:"",
      paramName:null,
      paramValue:null,
      hasMore:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log("跳转到商品列表页面的参数为：",options)
      this.openLongLoading();


      //根据分类进行设置
      if(options.tag!=undefined){
        this.setData({
          paramName: "tag",
          paramValue: options.tag
        })
        var that=this
        wx.request({
          url: app.apiURL + '/product/productList?param=tag&value=' + options.tag,
          success:function(res){
            console.log("获取的列表为",res.data);
            if (res.data.length == 0) {
              that.setData({
                hasMore: false
              })
            }
            that.setData({
              products:that.data.products.concat(res.data),

            })
            console.log("更新之后的商品列表", that.data.products);
            if(res.data.length>0){
              that.setData({
                minId: res.data[res.data.length - 1].pid
              })
            }
            console.log("此时的minId",that.data.minId);
          }
        })
      }

      //根据店铺
      if (options.sellerName != undefined) {
        this.setData({
          paramName: "sellerName",
          paramValue: options.sellerName,
          sellerName: options.sellerName,
          sellerNickName:options.sellerNickName
        })
        var that = this
        wx.request({
          url: app.apiURL + '/product/productList?param=sellerName&value=' + options.sellerName,
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
      }

      //根据查找关键词
      if (options.keyword != undefined) {
        this.setData({
          paramName: "keyword",
          paramValue: options.keyword
        })
        var that = this
        wx.request({
          url: app.apiURL + '/product/productList?param=keyword&value=' + options.keyword,
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
                minId: res.data[res.data.length-1].pid
              })
            }
            console.log("此时的minId", that.data.minId);
          }
        })
      }
  },

  //查看更多
  viewMore:function(){
    var that = this
    this.openLoading();
    var varurl = app.apiURL + '/product/productList?param=' + that.data.paramName + '&value=' + that.data.paramValue + "&minId=" + that.data.minId;
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
            duration:500
          })
        }
        that.setData({
          products: that.data.products.concat(res.data),
        })
        console.log("更新之后的商品列表", that.data.products);
        if (res.data.length > 0) {
          that.setData({
            minId: res.data[res.data.length-1].pid
          })
        }
        console.log("此时的minId", that.data.minId);
      }
    })
  },

  //进店
  enterSeller:function(e){
    wx.redirectTo({
      url: e.target.dataset.url,
    })
  },
  openLoading: function () {
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 500
    });
  },
  openLongLoading: function () {
    wx.showToast({
      title: '数据加载中',
      icon: 'loading',
      duration: 1000
    });
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
  
  },

//预览商品图片
  previewImage: function (e) {
    var src=e.target.dataset.src;
    var srcArray=new Array(src);
    console.log(e);
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: srcArray // 需要预览的图片http链接列表
    })
    return false;
  }
})