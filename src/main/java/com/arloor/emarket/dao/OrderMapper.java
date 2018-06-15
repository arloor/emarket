package com.arloor.emarket.dao;

import com.arloor.emarket.domain.Order;
import com.arloor.emarket.model.YundanDetail;
import com.arloor.emarket.model.YundanInfo;
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
}
