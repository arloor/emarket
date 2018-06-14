package com.arloor.emarket.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cart")
public class CartController {
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
        valueOps.set("cart:"+uname,cart);
    }
}
