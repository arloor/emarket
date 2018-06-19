package com.arloor.emarket.dao;

import com.arloor.emarket.domain.Order;
import com.arloor.emarket.model.*;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

import java.util.List;

@Mapper
public interface OrderMapper {
    void insertOrder(Order order);

    void insertOrderDetail(@Param("pid") Integer pid,@Param("oid") long oid,@Param("num") Integer num,@Param("price") Double price);

    void addBalanceForEuser(@Param("uname")String uname, @Param("change")double chanege);

    List<YundanInfo> selectYundansByUnameStatus(@Param("uname") String uname, @Param("minTime") String minTime, @Param("yundanStatus") String yundanStatus);

    List<YundanDetail> selectYundanDetailsByYundan(@Param("yundan") String yundan);

    int updateYundanStatusAsComplete(@Param("yundan")String yundan);

    double selectCountTotalPriceByYundan(@Param("yundan")String yundan);

    String selectSellerNameByYundan(@Param("yundan")String yundan);


    List<ForSellerOrderInfo> selectSellerOrderInfo(@Param("sellerName")String sellerName,@Param("yundanStatus")String yundanStatus);

    int updateOrderDetailSetFahuo(@Param("oid")String oid,@Param("yundan")String yundan,@Param("sellerName")String sellerName);
}
