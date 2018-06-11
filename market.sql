/*
Navicat MariaDB Data Transfer

Source Server         : 电子商务网站
Source Server Version : 50556
Source Host           : mysql.moontell.cn:3306
Source Database       : market

Target Server Type    : MariaDB
Target Server Version : 50556
File Encoding         : 65001

Date: 2018-06-11 21:59:46
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for cart
-- ----------------------------
DROP TABLE IF EXISTS `cart`;
CREATE TABLE `cart` (
  `uname` varchar(30) NOT NULL,
  `pid` int(30) NOT NULL,
  `num` int(10) DEFAULT NULL,
  PRIMARY KEY (`uname`,`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of cart
-- ----------------------------

-- ----------------------------
-- Table structure for consignee
-- ----------------------------
DROP TABLE IF EXISTS `consignee`;
CREATE TABLE `consignee` (
  `uname` varchar(30) NOT NULL,
  `addr` varchar(60) NOT NULL,
  `consignee` varchar(30) NOT NULL,
  `tel` varchar(15) NOT NULL,
  `zipcode` varchar(15) NOT NULL,
  `isDefault` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`uname`,`addr`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of consignee
-- ----------------------------

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `oid` int(11) NOT NULL AUTO_INCREMENT COMMENT '''已支付、未支付、正在运送、完成''',
  `uname` varchar(30) DEFAULT NULL,
  `orderStatus` varchar(30) DEFAULT NULL,
  `time` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `total` double(10,2) DEFAULT NULL,
  PRIMARY KEY (`oid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order
-- ----------------------------

-- ----------------------------
-- Table structure for orderDetail
-- ----------------------------
DROP TABLE IF EXISTS `orderDetail`;
CREATE TABLE `orderDetail` (
  `yundan` varchar(30) NOT NULL,
  `pid` int(30) NOT NULL,
  `oid` int(30) NOT NULL,
  `num` int(10) DEFAULT NULL,
  `price` double(10,2) DEFAULT NULL,
  `yundanStatus` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`yundan`,`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of orderDetail
-- ----------------------------

-- ----------------------------
-- Table structure for product
-- ----------------------------
DROP TABLE IF EXISTS `product`;
CREATE TABLE `product` (
  `pid` int(30) NOT NULL AUTO_INCREMENT,
  `imageURL` varchar(255) CHARACTER SET utf8 NOT NULL,
  `pname` varchar(50) CHARACTER SET utf8 NOT NULL,
  `inventory` int(10) NOT NULL,
  `tag` varchar(10) CHARACTER SET utf8 NOT NULL DEFAULT '1' COMMENT 'tag存储tag的路径',
  `pinfo` varchar(255) CHARACTER SET utf8 NOT NULL,
  `sellerName` varchar(30) CHARACTER SET utf8 NOT NULL,
  `status` varchar(30) CHARACTER SET utf8 NOT NULL,
  `price` double(10,2) NOT NULL,
  `oldPrice` double(10,2) NOT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of product
-- ----------------------------

-- ----------------------------
-- Table structure for productTag
-- ----------------------------
DROP TABLE IF EXISTS `productTag`;
CREATE TABLE `productTag` (
  `tagId` varchar(10) NOT NULL,
  `tagName` varchar(20) NOT NULL,
  PRIMARY KEY (`tagId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of productTag
-- ----------------------------

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uname` varchar(30) CHARACTER SET utf8 NOT NULL,
  `nickName` varchar(30) CHARACTER SET utf8 NOT NULL,
  `passwd` varchar(30) CHARACTER SET utf8 NOT NULL,
  `email` varchar(30) CHARACTER SET utf8 NOT NULL,
  `role` varchar(30) CHARACTER SET utf8 NOT NULL,
  `balance` double(10,2) NOT NULL,
  `paykey` varchar(6) CHARACTER SET utf8 NOT NULL,
  `code` varchar(6) CHARACTER SET utf8 NOT NULL DEFAULT '000000',
  `codeValid` tinyint(1) NOT NULL DEFAULT '0',
  PRIMARY KEY (`uname`)
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('moontell', '刘港欢', '123456', '1293181335@qq.com', 'ROLE_MEMBE', '100.00', '123456', '000000', '0');

-- ----------------------------
-- Table structure for weuname
-- ----------------------------
DROP TABLE IF EXISTS `weuname`;
CREATE TABLE `weuname` (
  `openId` varchar(50) NOT NULL,
  `uname` varchar(30) DEFAULT NULL,
  `avatarUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`openId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of weuname
-- ----------------------------
INSERT INTO `weuname` VALUES ('o9YQ65Gne9YDl4Fr_ftyp8joLPrk', null, null);
SET FOREIGN_KEY_CHECKS=1;
