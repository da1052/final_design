/*
Navicat MySQL Data Transfer

Source Server         : Test
Source Server Version : 50722
Source Host           : localhost:3306
Source Database       : design

Target Server Type    : MYSQL
Target Server Version : 50722
File Encoding         : 65001

Date: 2019-03-11 12:35:00
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for classify
-- ----------------------------
DROP TABLE IF EXISTS `classify`;
CREATE TABLE `classify` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `category` varchar(30) NOT NULL,
  `photo` varchar(255) NOT NULL,
  `summary` varchar(100) NOT NULL,
  `address` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`,`name`),
  KEY `name` (`name`),
  KEY `category` (`category`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for classify_all
-- ----------------------------
DROP TABLE IF EXISTS `classify_all`;
CREATE TABLE `classify_all` (
  `category` varchar(30) NOT NULL,
  PRIMARY KEY (`category`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for collection
-- ----------------------------
DROP TABLE IF EXISTS `collection`;
CREATE TABLE `collection` (
  `name` varchar(30) NOT NULL,
  `user` varchar(20) NOT NULL,
  PRIMARY KEY (`name`,`user`),
  KEY `user` (`user`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for comment
-- ----------------------------
DROP TABLE IF EXISTS `comment`;
CREATE TABLE `comment` (
  `id` int(11) NOT NULL,
  `commenter` varchar(20) NOT NULL,
  `time` date NOT NULL,
  `picture` varchar(100) DEFAULT NULL,
  `comment_detail` varchar(255) NOT NULL,
  `user_img` varchar(100) DEFAULT NULL,
  `reply_user` varchar(20) DEFAULT NULL,
  `reply_detail` tinytext,
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`comment_id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=91 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for comment_copy
-- ----------------------------
DROP TABLE IF EXISTS `comment_copy`;
CREATE TABLE `comment_copy` (
  `id` int(11) NOT NULL,
  `commenter` varchar(20) NOT NULL,
  `time` date NOT NULL,
  `picture` varchar(100) DEFAULT NULL,
  `comment_detail` varchar(255) NOT NULL,
  `user_img` varchar(100) DEFAULT NULL,
  `reply_user` varchar(20) DEFAULT NULL,
  `reply_detail` tinytext,
  `comment_id` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`comment_id`),
  KEY `id` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=84 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for course
-- ----------------------------
DROP TABLE IF EXISTS `course`;
CREATE TABLE `course` (
  `catanum` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(30) NOT NULL,
  `category` varchar(30) NOT NULL,
  `catalog` varchar(40) NOT NULL,
  `address` varchar(100) DEFAULT NULL,
  `title` varchar(30) DEFAULT NULL,
  `prev` longtext,
  PRIMARY KEY (`catanum`,`name`),
  KEY `name` (`name`),
  KEY `category` (`category`),
  CONSTRAINT `course_ibfk_1` FOREIGN KEY (`name`) REFERENCES `classify` (`name`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `course_ibfk_2` FOREIGN KEY (`category`) REFERENCES `classify` (`category`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=510 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for info
-- ----------------------------
DROP TABLE IF EXISTS `info`;
CREATE TABLE `info` (
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `synopsis` varchar(255) NOT NULL,
  `author` varchar(50) NOT NULL,
  `time` date NOT NULL,
  `comment_num` tinyint(4) DEFAULT '0',
  `address` varchar(100) DEFAULT NULL,
  `prev` text NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for info_detail
-- ----------------------------
DROP TABLE IF EXISTS `info_detail`;
CREATE TABLE `info_detail` (
  `id` int(11) NOT NULL,
  `text` text NOT NULL,
  KEY `id` (`id`),
  CONSTRAINT `id` FOREIGN KEY (`id`) REFERENCES `info` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for q_a
-- ----------------------------
DROP TABLE IF EXISTS `q_a`;
CREATE TABLE `q_a` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `title` varchar(255) NOT NULL,
  `user` varchar(20) NOT NULL,
  `comment_num` tinyint(4) NOT NULL DEFAULT '0',
  `detail` mediumtext NOT NULL,
  `time` date NOT NULL,
  `img` varchar(100) DEFAULT NULL,
  `user_img` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `questioner` (`user`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `user` varchar(20) NOT NULL,
  `id` int(10) NOT NULL AUTO_INCREMENT,
  `sex` varchar(5) DEFAULT NULL,
  `age` int(4) DEFAULT NULL,
  `password` varchar(20) NOT NULL,
  `user_img` varchar(100) DEFAULT NULL,
  `email` varchar(100) DEFAULT NULL,
  `phone` varchar(15) DEFAULT NULL,
  `question` varchar(255) DEFAULT NULL,
  `answer` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `user` (`user`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
