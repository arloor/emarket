package com.arloor.emarket.service;

import com.arloor.emarket.dao.*;
import com.arloor.emarket.domain.Consignee;
import com.arloor.emarket.domain.Euser;
import com.arloor.emarket.domain.Order;
import com.arloor.emarket.domain.Product;
import com.arloor.emarket.model.Result;
import com.arloor.emarket.model.ProductDetailWithNum;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.transaction.annotation.Transactional;

import java.util.Iterator;
import java.util.LinkedList;
import java.util.List;


@Component
public class OrderService {
    private Logger logger=LoggerFactory.getLogger(OrderService.class);

    @Autowired
    EuserMapper euserMapper;
    @Autowired
    ProductMapper productMapper;
    @Autowired
    OrderMapper orderMapper;
    @Autowired
    ConsigneeMapper consigneeMapper;

    @Transactional
    public Result newOrder(List<ProductDetailWithNum> products, String uname, double total, String paykey) {
        Result result =null;
        //首先要判断支付密码是否正确
        Euser euser=euserMapper.selectByPrimaryKey(uname);
        if(!euser.getPaykey().equals(paykey)) {
            result = new Result();
            result.setErrMsg("支付密码错误");
            result.setErrCode("fail");
            return result;
        }
        //判断余额是否充足
        if(euser.getBalance()<total){
            result =new Result();
            result.setErrMsg("余额不足");
            result.setErrCode("fail");
            return result;
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
        //首先是order表，然后是orderDetail表,注意order要加入收货人信息
        Consignee consignee=consigneeMapper.selectConsigneeByUname(uname);
        logger.info("订单的收货人信息： "+consignee.getConsignee()+" "+consignee.getAddr()+" "+consignee.getTel());
        Order order=new Order();
        order.setTotal(trueTotal);
        order.setUname(uname);
        order.setAddr(consignee.getAddr());
        order.setTel(consignee.getTel());
        order.setConsignee(consignee.getConsignee());
        order.setZipcode(consignee.getZipcode());
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
        result =new Result();
        result.setErrCode("OK");

        StringBuffer sb=new StringBuffer();
        sb.append("实际支出："+trueTotal+"元");
        if(!noEnoughInventoryPnameList.isEmpty()){
            sb.append(" \r\n因为库存原因未能购买的商品有: ");
            for (String pname:noEnoughInventoryPnameList
                    ) {
                sb.append(pname+" ");
            }
        }
        result.setErrMsg(sb.toString());

        return result;
    }

    @Transactional
    public boolean setYundanComplete(String yundan) {
        //要做的事，首先 更新包裹状态 然后钱款从admin到seller

        //计算订单总额
        double total=orderMapper.selectCountTotalPriceByYundan(yundan);
        //找到运单对应的商家
        String sellerName=orderMapper.selectSellerNameByYundan(yundan);
        int num=orderMapper.updateYundanStatusAsComplete(yundan);
        if(num==0){
            return false;
        }else{
            orderMapper.addBalanceForEuser("admin",-total);
            orderMapper.addBalanceForEuser(sellerName,total);
        }
        return true;
    }

    @Transactional
    public Result fahuo(String oid, String sellerName) {
        String yundan=oid+sellerName;

        int numRows=orderMapper.updateOrderDetailSetFahuo(oid,yundan,sellerName);

        if(numRows>0){
            Result result =new Result();
            result.setErrCode("OK");
            result.setErrMsg("发货成功，运单号为: "+yundan);
            return result;
        }else{
            Result result =new Result();
            result.setErrCode("FAIL");
            result.setErrMsg("发货失败");
            return result;
        }
    }
}
