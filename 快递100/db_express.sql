/*
Navicat MySQL Data Transfer

Source Server         : 127.0.0.1
Source Server Version : 50505
Source Host           : 127.0.0.1:3306
Source Database       : shopsn

Target Server Type    : MYSQL
Target Server Version : 50505
File Encoding         : 65001

Date: 2018-06-15 14:35:47
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `db_express`
-- ----------------------------
DROP TABLE IF EXISTS `db_express`;
CREATE TABLE `db_express` (
  `id` tinyint(1) unsigned NOT NULL AUTO_INCREMENT COMMENT '索引ID',
  `name` varchar(50) NOT NULL COMMENT '公司名称',
  `status` tinyint(1) NOT NULL DEFAULT '1' COMMENT '状态1启用 2弃用',
  `code` varchar(50) NOT NULL COMMENT '编号',
  `letter` char(1) NOT NULL COMMENT '首字母',
  `order` tinyint(1) NOT NULL DEFAULT '0' COMMENT '1常用0不常用',
  `url` varchar(100) NOT NULL COMMENT '公司网址',
  `zt_state` tinyint(1) NOT NULL DEFAULT '0' COMMENT '是否支持服务站配送0否1是',
  `tel` varchar(50) NOT NULL DEFAULT '0' COMMENT '客服电话',
  `discount` decimal(5,2) NOT NULL DEFAULT '100.00' COMMENT '折扣',
  PRIMARY KEY (`id`),
  UNIQUE KEY `name` (`name`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8 COMMENT='快递公司';

-- ----------------------------
-- Records of db_express
-- ----------------------------
INSERT INTO `db_express` VALUES ('1', '安信达', '1', 'anxindakuaixi', 'A', '0', 'http://www.anxinda.com', '0', '021-54224681', '100.00');
INSERT INTO `db_express` VALUES ('2', '包裹平邮', '2', 'youzhengguonei', 'B', '0', 'http://yjcx.chinapost.com.cn', '0', '11185', '100.00');
INSERT INTO `db_express` VALUES ('3', 'CCES', '2', 'cces', 'C', '0', 'http://www.cces.com.cn', '0', '400-111-1123', '100.00');
INSERT INTO `db_express` VALUES ('4', '传喜物流', '2', 'chuanxiwuliu', 'C', '0', 'http://www.cxcod.com', '0', '400-777-5656', '100.00');
INSERT INTO `db_express` VALUES ('5', 'DHL快递', '2', 'dhl', 'D', '0', 'http://www.cn.dhl.com', '0', '95380', '100.00');
INSERT INTO `db_express` VALUES ('6', '大田物流', '2', 'datianwuliu', 'D', '0', 'http://www.dtw.com.cn', '0', '400-626-1166', '100.00');
INSERT INTO `db_express` VALUES ('7', '德邦物流', '1', 'debangwuliu', 'D', '0', 'http://www.deppon.com', '0', '95353', '100.00');
INSERT INTO `db_express` VALUES ('8', 'EMS', '1', 'ems', 'E', '0', 'http://www.ems.com.cn', '0', '11183', '100.00');
INSERT INTO `db_express` VALUES ('9', 'EMS国际', '2', 'emsguoji', 'E', '0', '###', '0', '11183', '100.00');
INSERT INTO `db_express` VALUES ('10', '飞康达', '2', 'feikangda', 'F', '0', 'http://www.fkd.com.cn', '0', '	010-84223376', '100.00');
INSERT INTO `db_express` VALUES ('11', 'FedEx(国际)', '2', 'fedex', 'F', '0', 'http://fedex.com/cn', '0', '400-886-1888', '100.00');
INSERT INTO `db_express` VALUES ('12', '凡客如风达', '2', 'rufengda', 'F', '0', 'http://www.rufengda.com', '0', '400-010-6660', '100.00');
INSERT INTO `db_express` VALUES ('13', '港中能达', '2', 'ganzhongnengda', 'G', '0', 'http://www.nd56.com', '0', '400-620-1111', '100.00');
INSERT INTO `db_express` VALUES ('14', '挂号信', '2', 'youzhengguonei', 'G', '0', 'http://yjcx.chinapost.com.cn', '0', '11185', '100.00');
INSERT INTO `db_express` VALUES ('15', '共速达', '2', 'gongsuda', 'G', '0', 'http://www.gongsuda.com/mall/Search.aspx', '0', '400-111-0005', '100.00');
INSERT INTO `db_express` VALUES ('16', '汇通快递', '1', 'huitongkuaidi', 'H', '0', 'http://www.htky365.com', '0', '400-956-5656', '100.00');
INSERT INTO `db_express` VALUES ('17', '华宇物流', '2', 'tiandihuayu', 'H', '0', 'http://www.hoau.net', '0', '400-808-6666', '100.00');
INSERT INTO `db_express` VALUES ('18', '佳吉快运', '2', 'jiajiwuliu', 'J', '0', 'http://www.jiaji.com', '0', '400-820-5566', '100.00');
INSERT INTO `db_express` VALUES ('19', '佳怡物流', '2', 'jiayiwuliu', 'J', '0', 'http://www.jiayi56.com', '0', '400-631-999', '100.00');
INSERT INTO `db_express` VALUES ('20', '急先达', '2', 'jixianda', 'J', '0', 'http://www.joust.cn', '0', '400-694-1256', '100.00');
INSERT INTO `db_express` VALUES ('21', '快捷速递', '2', 'kuaijiesudi', 'K', '0', 'http://www.fastexpress.com.cn', '0', '4008333666', '100.00');
INSERT INTO `db_express` VALUES ('22', '龙邦快递', '2', 'longbanwuliu', 'L', '0', 'http://www.lbex.com.cn', '0', '021-39283333', '100.00');
INSERT INTO `db_express` VALUES ('23', '联邦快递', '2', 'lianbangkuaidi', 'L', '0', 'http://cndxp.apac.fedex.com/dxp.html', '0', '400-889-1883', '100.00');
INSERT INTO `db_express` VALUES ('24', '联昊通', '2', 'lianhaowuliu', 'L', '0', 'http://www.lhtex.com.cn', '0', '0769-81515303', '100.00');
INSERT INTO `db_express` VALUES ('25', '全一快递', '2', 'quanyikuaidi', 'Q', '0', 'http://www.apex100.com', '0', '400-663-1111', '100.00');
INSERT INTO `db_express` VALUES ('26', '全峰快递', '2', 'quanfengkuaidi', 'Q', '0', 'http://www.qfkd.com.cn', '0', '400-100-0001', '100.00');
INSERT INTO `db_express` VALUES ('27', '全日通', '2', 'quanritongkuaidi', 'Q', '0', 'http://www.at-express.com', '0', '020-86298999', '100.00');
INSERT INTO `db_express` VALUES ('28', '申通快递', '1', 'shentong', 'S', '0', 'http://www.sto.cn', '0', '95543', '100.00');
INSERT INTO `db_express` VALUES ('29', '顺丰快递', '1', 'shunfeng', 'S', '1', 'http://www.sf-express.com', '0', '95338', '100.00');
INSERT INTO `db_express` VALUES ('30', '速尔快递', '2', 'suer', 'S', '0', 'http://www.sure56.com', '0', '400-158-9888', '100.00');
INSERT INTO `db_express` VALUES ('31', 'TNT快递', '2', 'tnt', 'T', '0', 'http://www.tnt.com.cn', '0', '800-820-9868', '100.00');
INSERT INTO `db_express` VALUES ('32', '天天快递', '1', 'tiantian', 'T', '0', 'http://www.ttkdex.com', '0', '400-188-8888', '100.00');
INSERT INTO `db_express` VALUES ('33', '天地华宇', '2', 'tiandihuayu', 'T', '0', 'http://www.hoau.net', '0', '	400-808-6666', '100.00');
INSERT INTO `db_express` VALUES ('34', 'UPS快递', '2', 'ups', 'U', '0', 'http://www.ups.com/cn', '0', '400-820-8388', '100.00');
INSERT INTO `db_express` VALUES ('35', 'USPS', '2', 'usps', 'U', '0', 'http://www.kuaidi100.com/all/usps.shtml', '0', '800-275-8777', '100.00');
INSERT INTO `db_express` VALUES ('36', '新邦物流', '2', 'xinbangwuliu', 'X', '0', 'http://www.xbwl.cn', '0', '400-800-0222', '100.00');
INSERT INTO `db_express` VALUES ('37', '信丰物流', '2', 'xinfengwuliu', 'X', '0', 'http://www.xf-express.com.cn', '0', '400-830-6333', '100.00');
INSERT INTO `db_express` VALUES ('38', '希伊艾斯', '2', 'cces', 'X', '0', 'http://www.cces.com.cn', '0', '400-111-1123', '100.00');
INSERT INTO `db_express` VALUES ('39', '新蛋物流', '2', 'neweggozzo', 'X', '0', 'http://www.ozzo.com.cn', '0', '400-820-4400', '100.00');
INSERT INTO `db_express` VALUES ('40', '圆通快递', '1', 'yuantong', 'Y', '1', 'http://www.yto.net.cn', '0', '95554', '100.00');
INSERT INTO `db_express` VALUES ('41', '韵达快递', '1', 'yunda', 'Y', '1', 'http://www.yundaex.com', '0', '95546', '100.00');
INSERT INTO `db_express` VALUES ('42', '邮政包裹', '2', 'youzhengguonei', 'Y', '0', 'http://yjcx.chinapost.com.cn', '0', '11185', '100.00');
INSERT INTO `db_express` VALUES ('43', '优速快递', '2', 'youshuwuliu', 'Y', '0', 'http://www.uc56.com', '0', '400-1111-119', '100.00');
INSERT INTO `db_express` VALUES ('44', '中通快递', '1', 'zhongtong', 'Z', '0', 'http://www.zto.cn', '0', '95311', '100.00');
INSERT INTO `db_express` VALUES ('45', '中铁快运', '2', 'zhongtiewuliu', 'Z', '1', 'http://www.cre.cn', '0', '95572', '100.00');
INSERT INTO `db_express` VALUES ('46', '宅急送', '1', 'zhaijisong', 'Z', '0', 'http://www.zjs.com.cn', '0', '400-678-9000', '100.00');
INSERT INTO `db_express` VALUES ('47', '中邮物流', '1', 'zhongyouwuliu', 'Z', '0', 'http://www.cnpl.com.cn', '0', '11183', '100.00');
INSERT INTO `db_express` VALUES ('48', '自营配送', '2', '111111', 'y', '1', 'http://www.aaa.com', '0', '4006600000', '100.00');
INSERT INTO `db_express` VALUES ('49', '安能物流', '1', 'annengwuliu', 'A', '1', 'http://www.ane56.com/home/home.jsp', '0', '40010-40088', '100.00');
INSERT INTO `db_express` VALUES ('50', '亿首配送', '1', 'yishoupeisong', 'Y', '1', 'http://wwwyssc666.com', '0', '0', '100.00');
