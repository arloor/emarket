/*
Navicat MariaDB Data Transfer

Source Server         : 电子商务网站
Source Server Version : 50556
Source Host           : mysql.moontell.cn:3306
Source Database       : market

Target Server Type    : MariaDB
Target Server Version : 50556
File Encoding         : 65001

Date: 2018-06-19 16:21:33
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
  PRIMARY KEY (`uname`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of consignee
-- ----------------------------
INSERT INTO `consignee` VALUES ('moontell', '汉口路22号', '刘港欢', '18762832143', '210000');

-- ----------------------------
-- Table structure for order
-- ----------------------------
DROP TABLE IF EXISTS `order`;
CREATE TABLE `order` (
  `oid` int(11) NOT NULL AUTO_INCREMENT COMMENT '''已支付、未支付、正在运送、完成''',
  `uname` varchar(30) NOT NULL,
  `orderStatus` varchar(30) NOT NULL DEFAULT 'paid',
  `time` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `total` double(10,2) DEFAULT NULL,
  `addr` varchar(60) NOT NULL,
  `consignee` varchar(30) NOT NULL,
  `tel` varchar(15) NOT NULL,
  `zipcode` varchar(15) NOT NULL,
  PRIMARY KEY (`oid`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of order
-- ----------------------------
INSERT INTO `order` VALUES ('11', 'moontell', 'paid', '2018-06-19 09:36:27', '100.00', '汉口路22号', '刘港欢', '18762832143', '210000');
INSERT INTO `order` VALUES ('12', 'moontell', 'paid', '2018-06-19 09:36:59', '100.00', '汉口路22号', '刘港欢', '18762832143', '210000');
INSERT INTO `order` VALUES ('13', 'moontell', 'paid', '2018-06-19 09:37:03', '423.00', '汉口路22号', '刘港欢', '18762832143', '210000');
INSERT INTO `order` VALUES ('20', 'moontell', 'paid', '2018-06-19 09:46:30', '25.00', '汉口路22号', '刘港欢', '18762832143', '210000');
INSERT INTO `order` VALUES ('21', 'moontell', 'paid', '2018-06-19 11:26:05', '220.00', '汉口路22号', '刘港欢', '18762832143', '210000');

-- ----------------------------
-- Table structure for orderDetail
-- ----------------------------
DROP TABLE IF EXISTS `orderDetail`;
CREATE TABLE `orderDetail` (
  `pid` int(30) NOT NULL,
  `oid` int(30) NOT NULL,
  `yundan` varchar(30) NOT NULL DEFAULT '',
  `num` int(10) NOT NULL,
  `price` double(10,2) NOT NULL,
  `yundanStatus` varchar(30) NOT NULL DEFAULT '待发货',
  PRIMARY KEY (`pid`,`oid`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of orderDetail
-- ----------------------------
INSERT INTO `orderDetail` VALUES ('9', '13', 'test1111', '1', '48.00', '正在运送');
INSERT INTO `orderDetail` VALUES ('9', '21', '', '1', '48.00', '待发货');
INSERT INTO `orderDetail` VALUES ('10', '12', 'test3333', '4', '100.00', '正在运送');
INSERT INTO `orderDetail` VALUES ('12', '20', '', '1', '25.00', '待发货');
INSERT INTO `orderDetail` VALUES ('17', '11', 'test2222', '4', '100.00', '已送达');
INSERT INTO `orderDetail` VALUES ('17', '13', 'test1111', '15', '375.00', '正在运送');
INSERT INTO `orderDetail` VALUES ('19', '21', '', '1', '20.00', '待发货');
INSERT INTO `orderDetail` VALUES ('21', '21', '', '4', '200.00', '待发货');

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
  `status` varchar(30) CHARACTER SET utf8 NOT NULL DEFAULT '',
  `price` double(10,2) NOT NULL,
  `oldPrice` double(10,2) NOT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=latin1;

-- ----------------------------
-- Records of product
-- ----------------------------
INSERT INTO `product` VALUES ('7', 'http://jianbujingimages.moontell.cn/Fk8iHInXppiDJ8kk2vsEWtRHwVZN', '新款钥匙扣', '2', '13', '就是新款钥匙扣啊', 'nywc', '', '8.00', '12.00');
INSERT INTO `product` VALUES ('8', 'http://jianbujingimages.moontell.cn/FjjImajMjOhOIswp24_YC4KXV_9p', '甜品大活帆布袋', '197', '12', '甜品系列-大活——帆布袋产品', 'nywc', '', '28.00', '35.00');
INSERT INTO `product` VALUES ('9', 'http://jianbujingimages.moontell.cn/FnqLmZog3-44BH_gVFkgPEC9nrzU', '菜根、大事文化衫', '191', '11', '校训：嚼得菜根，做得大事', 'nywc', '', '48.00', '59.00');
INSERT INTO `product` VALUES ('10', 'http://jianbujingimages.moontell.cn/FppqxJKDSQSWN8qdWUBcP9x2PxP3', '蓝鲸马克杯', '996', '15', '红黄绿—马克杯', 'nywc', '', '25.00', '30.00');
INSERT INTO `product` VALUES ('11', 'http://jianbujingimages.moontell.cn/Frij752vDfP1X-nSDjsfeh9Q3NcN', '甜品体育馆-帆布袋', '100', '12', '别人都说这个很血腥', 'nywc', '', '30.00', '34.00');
INSERT INTO `product` VALUES ('12', 'http://jianbujingimages.moontell.cn/FpuIYNlvlsvKLAK8_Si-z-36TFtp', '新菜根大事文化衫', '94', '11', '新款菜根大事校训文化衫', 'nywc', '', '25.00', '36.00');
INSERT INTO `product` VALUES ('13', 'http://jianbujingimages.moontell.cn/Fq1W2ImSUJbRmPMl_bzB0yAUECSZ', '夜北大楼-笔记本', '100', '14', '建筑系列笔记本', 'nywc', '', '10.00', '15.00');
INSERT INTO `product` VALUES ('14', 'http://jianbujingimages.moontell.cn/FuvTClSlEzZDi0CvqAtN615jkbR7', '大活-笔记本', '100', '14', '建筑系列笔记本', 'nywc', '', '10.00', '25.00');
INSERT INTO `product` VALUES ('15', 'http://jianbujingimages.moontell.cn/Fs2fl07Y5A4Bfa9nAL2Yc33ttluc', '甜品图书馆-帆布袋', '100', '12', '甜品图书馆-帆布袋', 'nywc', '', '10.00', '15.00');
INSERT INTO `product` VALUES ('16', 'http://jianbujingimages.moontell.cn/FmaHpIEjqiBBJ3I6RduTs-naHEMH', '甜品北大楼-帆布袋', '154', '12', '甜品北大楼-帆布袋', 'nywc', '', '25.00', '30.00');
INSERT INTO `product` VALUES ('17', 'http://jianbujingimages.moontell.cn/Fvt4ULVCVqy_50_joOyO0m_STdsR', '猫5十-帆布袋', '440', '12', '这是一只猫趴在五食堂窗台上', 'nywc', '', '25.00', '30.00');
INSERT INTO `product` VALUES ('18', 'http://jianbujingimages.moontell.cn/FtlX-zVrlWF1Gnens4oWfhmX4DPI', '诚朴-笔记本', '200', '14', '以诚以朴，嚼菜根，做大事', 'nywc', '', '25.00', '30.00');
INSERT INTO `product` VALUES ('19', 'http://jianbujingimages.moontell.cn/Fq5Cc3bhUR2OzqhaqDCWGGirSRbn', '不怠书签', '90', '17', '不怠？是啥。。累了还要码就是', 'nywc', '', '20.00', '25.00');
INSERT INTO `product` VALUES ('20', 'http://jianbujingimages.moontell.cn/FommgSeWgNGti3bkX7Bht0gD5TmV', '嚼得菜根书签', '200', '17', '书签也要嚼菜根！南大很无情', 'nywc', '', '5.00', '20.00');
INSERT INTO `product` VALUES ('21', 'http://jianbujingimages.moontell.cn/FjndQ68J8RAiansj3MYhR9sWgrlz', '不是商品的商品', '96', '19', '一个非南雍文创出品的鼠标。。测试一个订单多个卖家用', 'seller', '', '50.00', '60.00');

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
INSERT INTO `productTag` VALUES ('1', '未分类');
INSERT INTO `productTag` VALUES ('11', 'T恤');
INSERT INTO `productTag` VALUES ('12', '帆布袋');
INSERT INTO `productTag` VALUES ('13', '钥匙扣');
INSERT INTO `productTag` VALUES ('14', '笔记本');
INSERT INTO `productTag` VALUES ('15', '杯子');
INSERT INTO `productTag` VALUES ('16', '卡贴');
INSERT INTO `productTag` VALUES ('17', '书签');
INSERT INTO `productTag` VALUES ('18', '明信片');
INSERT INTO `productTag` VALUES ('19', 'U盘');

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
INSERT INTO `user` VALUES ('admin', '玉皇大帝', '123456', 'admin@arloor.com', 'ROLE_ADMIN', '99485.00', '123456', '000000', '0');
INSERT INTO `user` VALUES ('moontell', '刘港欢', '123456', '1293181335@qq.coom', 'ROLE_MEMBER', '97884.00', '123456', '000000', '0');
INSERT INTO `user` VALUES ('nywc', '南雍文创', '123456', '151250095@smail.nju.edu.cn', 'ROLE_SELLER', '1867.00', '123456', '000000', '0');
INSERT INTO `user` VALUES ('seller', '一个卖家', '123456', '1293181335@qq.com', 'ROLE_SELLER', '2000.00', '123456', '000000', '0');

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
INSERT INTO `weuname` VALUES ('o9YQ65Gne9YDl4Fr_ftyp8joLPrk', 'nywc', 'https://wx.qlogo.cn/mmopen/vi_32/wYRibk2mdo1CyLbXBgFvIkfBw8c16J3Z8TsqQ2ibBC5Saotjwuprm1jvYzsiaFk8S6zvceuqMT5Vb9KkAmB76beZg/132');
SET FOREIGN_KEY_CHECKS=1;
