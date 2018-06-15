package com.arloor.emarket.model;

public class YundanDetail {
    private String time;
    private int pid;
    private String pname;
    private String pinfo;
    private String imageURL;
    private int num;
    private double price;
    private String yundanStatus;

    public int getPid() {
        return pid;
    }

    public void setPid(int pid) {
        this.pid = pid;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public String getPname() {
        return pname;
    }

    public void setPname(String pname) {
        this.pname = pname;
    }

    public String getPinfo() {
        return pinfo;
    }

    public void setPinfo(String pinfo) {
        this.pinfo = pinfo;
    }

    public String getImageURL() {
        return imageURL;
    }

    public void setImageURL(String imageURL) {
        this.imageURL = imageURL;
    }

    public int getNum() {
        return num;
    }

    public void setNum(int num) {
        this.num = num;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getYundanStatus() {
        return yundanStatus;
    }

    public void setYundanStatus(String yundanStatus) {
        this.yundanStatus = yundanStatus;
    }
}
