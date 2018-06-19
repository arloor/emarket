// pages/manageProduct/manageProduct.js
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    tagNames: [],
    pickIndex: 0,
    images: [],
    product: {},
    pid:null

  },
  //tag挑选 相关
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      pickIndex: e.detail.value
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log("管理商品信息，pid: ", options.pid)
    this.setData({
      pid:options.pid
    })

    var that = this;
    wx.request({
      url: app.apiURL + '/product/tags',
      success: function (res) {
        console.log("商品tags", res.data);
        that.setData({
          tags: res.data,
        });
        var tempTagNames = [];
        for (var i = 0; i < that.data.tags.length; i++) {
          tempTagNames.push(that.data.tags[i].tagName);
        }
        console.log("暂时的tagNames", tempTagNames);
        that.setData({
          tagNames: tempTagNames
        })
      }
    })

    var that = this;
    wx.request({
      url: app.apiURL + '/product/productDetail?pid=' + options.pid,
      success: function (res) {
        that.setData({
          product: res.data
        })
        that.setData({
          pickIndex: parseInt(that.data.product.tag.slice(1) - 1)
        })
        console.log(that.data.product);
      }
    })

  },

  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.images.concat(this.data.product.imageURL) // 需要预览的图片http链接列表
    })
  },
  modify:function(e){
    var varTag=parseInt(this.data.pickIndex)+1;
    varTag = "1" + varTag;
    var varData=e.detail.value;
    varData.tag = varTag
    varData.pid=this.data.pid
    console.log(varData);

    wx.request({
      url: app.apiURL+'/product/update',
      header: { 'content-type': 'application/json' },
      method: "post",
      data:varData,
      success:function(res){
        wx.showModal({
          content: res.data.errMsg,
          showCancel: false,
          success: function (res) {
            if (res.confirm) {
              console.log('用户点击确定')
            }
          }
        });
      }
    })
  }
})