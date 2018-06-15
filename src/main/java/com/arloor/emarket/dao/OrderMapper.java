package com.arloor.emarket.dao;

import com.arloor.emarket.domain.Order;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface OrderMapper {
    void insertOrder(Order order);
}
