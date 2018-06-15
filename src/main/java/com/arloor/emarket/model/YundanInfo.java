package com.arloor.emarket.model;

import java.util.List;

public class YundanInfo {
    private String yundan;
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
}
