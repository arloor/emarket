package com.arloor.emarket.model;

import java.util.Date;
import java.util.List;

public class ForSellerOrderInfo {
    private int oid;
    private String sellerName;
    private String yundan;
    private String addr;
    private String consignee;
    private String tel;
    private Date time;
    private List<ForSellerYundanInfo> yundanInfoList;


    public Date getTime() {
        return time;
    }

    public void setTime(Date time) {
        this.time = time;
    }

    public int getOid() {
        return oid;
    }

    public void setOid(int oid) {
        this.oid = oid;
    }

    public String getYundan() {
        return yundan;
    }

    public void setYundan(String yundan) {
        this.yundan = yundan;
    }

    public String getAddr() {
        return addr;
    }

    public void setAddr(String addr) {
        this.addr = addr;
    }

    public String getConsignee() {
        return consignee;
    }

    public void setConsignee(String consignee) {
        this.consignee = consignee;
    }

    public String getSellerName() {
        return sellerName;
    }

    public void setSellerName(String sellerName) {
        this.sellerName = sellerName;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public List<ForSellerYundanInfo> getYundanInfoList() {
        return yundanInfoList;
    }

    public void setYundanInfoList(List<ForSellerYundanInfo> yundanInfoList) {
        this.yundanInfoList = yundanInfoList;
    }
}
