package com.arloor.emarket.controller;

import com.arloor.emarket.dao.ConsigneeMapper;
import com.arloor.emarket.domain.Consignee;
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
    @Autowired
    ConsigneeMapper consigneeMapper;

    Logger logger=LoggerFactory.getLogger(OrderController.class);


    @RequestMapping("/new")
    public NewOrderResult newOrder(@RequestBody List<ProductDetailWithNum> products , @RequestParam String uname,@RequestParam double total,@RequestParam String paykey){
        NewOrderResult newOrderResult=null;
        try {
            newOrderResult=orderService.newOrder(products,uname,total,paykey);
        }catch (Exception e){
            logger.info(uname+"新建价值“"+total+"”的订单，失败。数据库回滚");
            e.printStackTrace();
            newOrderResult=new NewOrderResult();
            newOrderResult.setErrCode("sqlErr");
            newOrderResult.setErrMsg("交易事务失败，请重试");
            return newOrderResult;
        }

        return newOrderResult;
    }

    @RequestMapping("/getConsignee")
    public Consignee getConsigneeByuname(@RequestParam String uname){
        return consigneeMapper.selectConsigneeByUname(uname);
    }

    @RequestMapping("/updateConsignee")
    public void upDateConsignee(@RequestBody Consignee consignee){
        int numUpdate= consigneeMapper.updateConsignee(consignee);
        if(numUpdate==0){
            consigneeMapper.insertConsignee(consignee);
        }
    }
}
