package com.arloor.emarket.service;

import com.arloor.emarket.dao.EuserMapper;
import com.arloor.emarket.domain.Euser;
import com.arloor.emarket.model.NewOrderResult;
import com.arloor.emarket.model.ProductDetailWithNum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;


@Component
public class OrderService {
    @Autowired
    EuserMapper euserMapper;

    @Transactional
    public NewOrderResult newOrder(List<ProductDetailWithNum> products, String uname, double total, String paykey) {
        NewOrderResult orderResult=null;
        //首先要判断支付密码是否正确
        Euser euser=euserMapper.selectByPrimaryKey(uname);
        if(!euser.getPaykey().equals(paykey)) {
            orderResult = new NewOrderResult();
            orderResult.setErrMsg("支付密码错误");
            orderResult.setErrCode("fail");
            return orderResult;
        }
        //判断余额是否充足
        if(euser.getBalance()<total){
            orderResult=new NewOrderResult();
            orderResult.setErrMsg("余额不足");
            orderResult.setErrCode("fail");
            return orderResult;
        }

        //下面要判断库存够不够
        for (ProductDetailWithNum productDetailWithNum: products
             ) {
            //todo:回去再写
        }

        throw new RuntimeException("数据库回滚");
    }
}
