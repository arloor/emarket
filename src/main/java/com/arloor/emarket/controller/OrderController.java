package com.arloor.emarket.controller;

import com.arloor.emarket.model.NewOrderResult;
import com.arloor.emarket.model.ProductDetail;
import com.arloor.emarket.model.ProductDetailWithNum;
import com.arloor.emarket.service.OrderService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/order")
public class OrderController {
    @Autowired
    OrderService orderService;

    Logger logger=LoggerFactory.getLogger(OrderController.class);


    @RequestMapping("/new")
    public NewOrderResult newOrder(@RequestBody List<ProductDetailWithNum> products , @RequestParam String uname,@RequestParam double total,@RequestParam String paykey){
        NewOrderResult newOrderResult=null;
        try {
            newOrderResult=orderService.newOrder(products,uname,total,paykey);
        }catch (Exception e){
            logger.info(uname+"新建价值“"+total+"”的订单，失败。数据库回滚");
            e.printStackTrace();
        }
        if(newOrderResult==null){
            newOrderResult=new NewOrderResult();
            newOrderResult.setErrCode("sql err");
            newOrderResult.setErrMsg("下单失败");
        }

        return newOrderResult;
    }
}
