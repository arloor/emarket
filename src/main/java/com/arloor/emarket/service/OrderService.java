package com.arloor.emarket.service;

import com.arloor.emarket.dao.EuserMapper;
import com.arloor.emarket.dao.ProductMapper;
import com.arloor.emarket.domain.Euser;
import com.arloor.emarket.domain.Product;
import com.arloor.emarket.model.NewOrderResult;
import com.arloor.emarket.model.ProductDetailWithNum;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;


@Component
public class OrderService {
    @Autowired
    EuserMapper euserMapper;
    @Autowired
    ProductMapper productMapper;

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

        //库存不足的商品pid列表
        List<Integer> noEnoughInventoryPId=new LinkedList<>();
        //真实的总额
        double trueTotal=0;

        //下面要判断各个商品库存足不足，然后减少充足的库存，记录不充足的库存
        //数据库你辛苦了。。服务器你也辛苦了。。让我放这么多东西。。。
        Iterator<ProductDetailWithNum> iterator=products.iterator();
        //因为涉及到删除，改变链表的结构，所以使用iterator，防止出现ConcurrtModifactionException
        while(iterator.hasNext()){
            ProductDetailWithNum productDetailWithNum=iterator.next();
            int num=productDetailWithNum.getNum();
            int pid=productDetailWithNum.getPid();
            Product trueProduct=productMapper.selectByPrimaryKey(pid);
            if(trueProduct.getInventory()<num){//如果库存不足
                noEnoughInventoryPId.add(pid);
                iterator.remove();
            }else{//库存足够
                trueProduct.setInventory(trueProduct.getInventory()-num);
                trueTotal+=(double)productDetailWithNum.getNum()*productDetailWithNum.getPrice();
                //更新库存
                productMapper.updateByPrimaryKeySelective(trueProduct);
            }
        }

        //下面记录订单信息
        //首先是order表，然后是orderDetail表

        throw new RuntimeException("数据库回滚");
    }
}
