package com.arloor.emarket.controller;

import com.arloor.emarket.dao.ConsigneeMapper;
import com.arloor.emarket.dao.OrderMapper;
import com.arloor.emarket.domain.Consignee;
import com.arloor.emarket.model.ForSellerOrderInfo;
import com.arloor.emarket.model.Result;
import com.arloor.emarket.model.ProductDetailWithNum;
import com.arloor.emarket.model.YundanInfo;
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
    @Autowired
    OrderMapper orderMapper;

    Logger logger=LoggerFactory.getLogger(OrderController.class);


    @RequestMapping("/new")
    public Result newOrder(@RequestBody List<ProductDetailWithNum> products , @RequestParam String uname, @RequestParam double total, @RequestParam String paykey){
        Result result =null;
        try {
            result =orderService.newOrder(products,uname,total,paykey);
        }catch (Exception e){
            logger.info(uname+"新建价值“"+total+"”的订单，失败。数据库回滚");
            e.printStackTrace();
            result =new Result();
            result.setErrCode("sqlErr");
            result.setErrMsg("交易事务失败，请重试");
            return result;
        }

        return result;
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

    @RequestMapping("/getYundans")
    public List<YundanInfo> getYundansByYundanStatus(
            @RequestParam("uname") String uname,
            @RequestParam(value = "minTime",required = false)String minTime,
            @RequestParam("yundanStatus") String yundanStatus){
        return orderMapper.selectYundansByUnameStatus(uname,minTime,yundanStatus);
    }

    @RequestMapping("/setYundanComplete")
    public boolean setYundanComplete(@RequestParam String yundan){
        boolean result=false;

        try {
            result =orderService.setYundanComplete(yundan);
        }catch (Exception e){
            e.printStackTrace();
            logger.info("设置运单完成失败，数据库回滚");
            return false;
        }
        return result;
    }


    @RequestMapping("/getSellerOrdersByStatus")
    public List<ForSellerOrderInfo> getSellerOrdersByStatus(
            @RequestParam("sellerName") String sellerName,
            @RequestParam("yundanStatus") String yundanStatus){
        return orderMapper.selectSellerOrderInfo(sellerName,yundanStatus);
    }


    @RequestMapping("/fahuo")
    public Result fahuo(@RequestParam String oid, @RequestParam String sellerName){
        try {
            return orderService.fahuo(oid,sellerName);
        }catch (RuntimeException e){
            Result result =new Result();
            result.setErrCode("FAIL");
            result.setErrMsg("发生异常");
            return result;
        }
    }


}
