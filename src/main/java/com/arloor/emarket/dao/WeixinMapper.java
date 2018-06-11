package com.arloor.emarket.dao;

import com.arloor.emarket.model.WeiUser;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface WeixinMapper {
    WeiUser weiGetUserIngo(@Param("openId") String openId);

    void insertNewOpenId(@Param("openId") String openId);

    void bindOpenIdUser(WeiUser weiUser);
}
