//index.js
//获取应用实例
const app = getApp()
const qiniuUploader = require("../../utils/qiniuUploader");

// 初始化七牛相关参数
function initQiniu() {
  var options = {
    region: 'NCN', // 华北区
    uptokenURL: 'https://nywc.moontell.cn/jianbujing/api/qiniu/uptoken',
    domain: 'http://jianbujingimages.moontell.cn',
    shouldUseQiniuFileName: true
  };
  qiniuUploader.init(options);
}

Page({
  data: {
    motto: 'Hello World',
    weiUser:null,
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    tagNames: [],
    pickIndex:0,
    images: [],
    imageObject:null,
    pinfo:""
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '/pages/home/home'
    })
  },
  onLoad: function () {
    var that = this;
    wx.request({
      url: app.apiURL+'/product/tags',
      success:function(res){
        console.log("商品tags",res.data);
        that.setData({
          tags:res.data,
          });
          var tempTagNames=[];
        for(var i=0;i<that.data.tags.length;i++){
          tempTagNames.push(that.data.tags[i].tagName);
        }
        console.log("暂时的tagNames", tempTagNames);
        that.setData({
          tagNames: tempTagNames
        })
      }
    })

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

    initQiniu();
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
  },


  //tag挑选 相关
  bindPickerChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      pickIndex: e.detail.value
    })
  },
  //bindTextareaBlur
  bindTextareaBlur:function(e){
    this.setData(
      {
        pinfo:e.detail.value
      }
    )
    console.log("商品介绍：",this.data.pinfo);
  },

  //发布商品 submit

  upload:function(e){
    //检查图片是否上传成功
    if (this.data.imageObject==null){
      wx.showModal({
        content: '没有选择图片/图片还没有上传成功',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
      return false;
    }
 

    console.log(e.detail.value);
    var product={};
    product.pname=e.detail.value.pname;
    product.tag="1"+(this.data.pickIndex+1);
    product.pinfo=this.data.pinfo;
    product.inventory = e.detail.value.inventory;
    product.price = e.detail.value.price;
    product.oldPrice = e.detail.value.oldPrice;
    product.imageURL = this.data.imageObject.imageURL;
    console.log("商品信息：",product);
    if (product.pname == "" || product.pinfo == "" || product.inventory == "" || product.price == "" || product.oldPrice=="") {
      wx.showModal({
        content: '还有空的数据没有填写哦',
        showCancel: false,
        success: function (res) {
          if (res.confirm) {
            console.log('用户点击确定')
          }
        }
      });
      return false;
    }

    //todo:存储到数据库

    //发布成功
    var that=this;
    wx.showModal({
      content: '上传成功',
      showCancel: false,
      success: function (res) {
        if (res.confirm) {
          console.log('用户点击确定')
          that.data.imageObject=null;
          wx.redirectTo({
            url: '/pages/index/index',
          })
        }
      }
    });
    
    
  },

  //选择图片
  chooseImage: function (e) {
    var that = this;
    wx.chooseImage({
      count: 1,
      // sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
      sizeType: ['original'],
      sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
      success:function(res){
         // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
        that.setData({
          images: that.data.images.concat(res.tempFilePaths)
        });
        var filePath = res.tempFilePaths[0];
        // 交给七牛上传
        qiniuUploader.upload(filePath, (res) => {
          that.setData({
            'imageObject': res
          });
          //调用存储到数据库的api
        }, (error) => {
          console.error('error: ' + JSON.stringify(error));
        },
          // , {
          //     region: 'NCN', // 华北区
          //     uptokenURL: 'https://[yourserver.com]/api/uptoken',
          //     domain: 'http://[yourBucketId].bkt.clouddn.com',
          //     shouldUseQiniuFileName: false
          //     key: 'testKeyNameLSAKDKASJDHKAS'
          //     uptokenURL: 'myServer.com/api/uptoken'
          // }
          null,// 可以使用上述参数，或者使用 null 作为参数占位符
          (progress) => {
            that.setData({ progress: progress.progress })
            console.log('上传进度', progress.progress)
            // console.log('已经上传的数据长度', progress.totalBytesSent)
            // console.log('预期需要上传的数据总长度', progress.totalBytesExpectedToSend)
          }
        );
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.images // 需要预览的图片http链接列表
    })
  }
})
