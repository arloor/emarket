package com.arloor.emarket.model;

import java.util.List;

public class YundanInfo {
    private String yundan;
    private String consignee;
    private String tel;
    private String addr;
    private List<YundanDetail> yundanDetailList;

    public String getYundan() {
        return yundan;
    }

    public void setYundan(String yundan) {
        this.yundan = yundan;
    }

    public List<YundanDetail> getYundanDetailList() {
        return yundanDetailList;
    }

    public void setYundanDetailList(List<YundanDetail> yundanDetailList) {
        this.yundanDetailList = yundanDetailList;
    }

    public String getConsignee() {
        return consignee;
    }

    public void setConsignee(String consignee) {
        this.consignee = consignee;
    }

    public String getTel() {
        return tel;
    }

    public void setTel(String tel) {
        this.tel = tel;
    }

    public String getAddr() {
        return addr;
    }

    public void setAddr(String addr) {
        this.addr = addr;
    }
}
