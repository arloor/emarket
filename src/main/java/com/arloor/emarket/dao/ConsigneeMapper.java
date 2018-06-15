package com.arloor.emarket.dao;


import com.arloor.emarket.domain.Consignee;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;

@Mapper
public interface ConsigneeMapper {
    Consignee selectConsigneeByUname(@Param("uname") String uname);

    int updateConsignee(Consignee consignee);

    void insertConsignee(Consignee consignee);
}
