package com.arloor.emarket.dao;

import com.arloor.emarket.domain.Order;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface OrderMapper {
    void insertOrder(Order order);

    void insertOrderDetail(@Param("pid") Integer pid,@Param("oid") long oid,@Param("num") Integer num,@Param("price") Double price);

    void addBalanceForEuser(@Param("uname")String uname, @Param("change")double chanege);
}
