package com.arloor.emarket.service;

import com.arloor.emarket.dao.EuserMapper;
import com.arloor.emarket.dao.OrderMapper;
import com.arloor.emarket.dao.ProductMapper;
import com.arloor.emarket.domain.Euser;
import com.arloor.emarket.domain.Order;
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
    @Autowired
    OrderMapper orderMapper;

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
        List<String> noEnoughInventoryPnameList=new LinkedList<>();
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
            if(productDetailWithNum.getNum()==0){//个数为0的商品不加入订单
                iterator.remove();
            }
            if(trueProduct.getInventory()<num){//如果库存不足
                noEnoughInventoryPnameList.add(productDetailWithNum.getPname());
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
        Order order=new Order();
        order.setTotal(trueTotal);
        order.setUname(uname);
        orderMapper.insertOrder(order);//在这里通过mybaits获得了自增主键oid
        long oid=order.getOid();

        //对每个商品增加订单记录
        for (ProductDetailWithNum product:products
             ) {
            Integer pid=product.getPid();
            Integer num=product.getNum();
            Double price=product.getPrice()*num;
            orderMapper.insertOrderDetail(pid,oid,num,price);
        }

        //下面是对用户balance的操作
        //首先哈，要将金额转到管理员的账户中，然后要将用户金额减少
        orderMapper.addBalanceForEuser("admin",trueTotal);
        orderMapper.addBalanceForEuser(uname,-trueTotal);


        //完成了一切
        orderResult=new NewOrderResult();
        orderResult.setErrCode("OK");

        StringBuffer sb=new StringBuffer();
        sb.append("实际支出："+trueTotal+"元");
        if(!noEnoughInventoryPnameList.isEmpty()){
            sb.append(" \r\n因为库存原因未能购买的商品有: ");
            for (String pname:noEnoughInventoryPnameList
                    ) {
                sb.append(pname+" ");
            }
        }
        orderResult.setErrMsg(sb.toString());

        return orderResult;
    }

    @Transactional
    public boolean setYundanComplete(String yundan) {
        //要做
        return false;
    }
}
