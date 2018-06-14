package com.arloor.emarket.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.TimeUnit;

@RestController
@RequestMapping("/api/cart")
public class CartController {

    Logger logger=LoggerFactory.getLogger(CartController.class);
    @Autowired
    RedisTemplate redisTemplate;

    @RequestMapping(value = "/getCart",produces = "application/json")
    public  String getCartByUname(@RequestParam String uname){
        ValueOperations valueOps=redisTemplate.opsForValue();
        if(redisTemplate.hasKey("cart:"+uname)){
            return valueOps.get("cart:"+uname).toString();
        }else return "{}";
    }
    @RequestMapping(value = "/updateCart",produces = "application/json")
    public  void updateCartByUname(@RequestParam String uname,@RequestParam String cart){
        ValueOperations valueOps=redisTemplate.opsForValue();
        valueOps.set("cart:"+uname,cart,60*5,TimeUnit.SECONDS);
        logger.info("cart:"+uname+" redis记录设置成功，超时时间："+redisTemplate.getExpire("cart:"+uname)+" seconds");
    }
}
