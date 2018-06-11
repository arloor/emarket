package com.arloor.emarket.controller;

import com.arloor.emarket.dao.WeixinMapper;
import com.arloor.emarket.model.OpenIdJson;
import com.arloor.emarket.model.WeiUser;
import com.arloor.emarket.utils.MyHttpClient;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;


@RestController
@RequestMapping("/api/weixin")
public class WeixinController {



    private Logger logger= LoggerFactory.getLogger(WeixinController.class);

    @Autowired
    private MyHttpClient httpClient;
    @Autowired
    private WeixinMapper weixinMapper;

    private String accessTokenJson ="{\"access_token\":\"8__Z7Cf3BnUmz7-n1oUzSbLXJgOokDGXHxdaswVsc6IUXYzSqktGHVOL6MUIFo5Mi1SQHXYP7sMSloDa8uIcghOOQxhCQtw0zWEKVRNwbRI-Y46s0Vis62Y-OoUT43EEtqfa05w9bVsu2Az4MgONFiADAZYQ\",\"expires_in\":7200}";

    public void setAccessTokenJson(String accessTokenJson) {
        this.accessTokenJson = accessTokenJson;
    }

    @Value("${weixin.appid}")
    private String appid;
    @Value("${weixin.appsecret}")
    private String appsecret;

    public String getAppid() {
        return appid;
    }

    public String getAppsecret() {
        return appsecret;
    }

    //获取用户信息，包括openId
    @RequestMapping("/getInfo")
    public WeiUser openid(@RequestParam String js_code) {
        String getUrl=String.format("https://api.weixin.qq.com/sns/jscode2session?appid=%s&secret=%s&grant_type=authorization_code&js_code=%s",appid,appsecret,js_code);
        ObjectMapper objectMapper=new ObjectMapper();
        String openIdStr=httpClient.get(getUrl);
        OpenIdJson openIdJson=null;
        try {
            openIdJson=objectMapper.readValue(openIdStr,OpenIdJson.class);
            String openId=openIdJson.getOpenid();
            logger.info("openid为: "+openId);

            WeiUser weiUser=weixinMapper.weiGetUserIngo(openId);
            if(weiUser==null) {//说明没有使用过这个小程序
                //插入这个openId
                weixinMapper.insertNewOpenId(openId);
                weiUser=new WeiUser();
                weiUser.setOpenId(openId);
            }
            return weiUser;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }


    @RequestMapping("/updateaccesstoken")
//    @Transactional(propagation = Propagation.REQUIRED,isolation = Isolation.READ_COMMITTED)
    public String updateaccesstoken() {
        String getUrl=String.format("https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=%s&secret=%s",appid,appsecret);
        this.accessTokenJson=httpClient.get(getUrl);
        logger.info("更新access token为："+this.accessTokenJson);
        return this.accessTokenJson;
    }
    @RequestMapping("/accesstoken")
    public String getAccessTokenJson(){
        return this.accessTokenJson;
    }

}
