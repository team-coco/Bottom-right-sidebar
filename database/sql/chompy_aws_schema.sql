--
-- Current Database: `chompy_business`
--

CREATE DATABASE IF NOT EXISTS `chompy` DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

USE `chompy`;
GRANT ALL PRIVILEGES ON chompy.* TO 'chompy'@'localhost' IDENTIFIED BY 'Chompy4&!database';
GRANT ALL PRIVILEGES ON chompy.* TO 'chompy'@'%' IDENTIFIED BY 'Chompy4&!database';

--
-- Table structure for table `business`
--

DROP TABLE IF EXISTS `business`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `business`
(
  `id` INT(11) NOT NULL AUTO_INCREMENT,
  `business_id` INT(11) NOT NULL,
  `business_id_orig` VARCHAR(22) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `neighborhood` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `postal_code` varchar(255) DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `stars` float DEFAULT NULL,
  `review_count` int(11) DEFAULT NULL,
  `is_open` tinyint(1) DEFAULT NULL,
  PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */


LOAD DATA
  LOCAL INFILE '/home/ec2-user/business.csv'
  INTO TABLE chompy.business
  FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
    ESCAPED BY ''
  LINES
    TERMINATED BY '\n'
;

CREATE INDEX business_id_idx ON business(business_id);
CREATE INDEX `postal_code_idx` ON business(`postal_code`);
CREATE INDEX `review_count_idx` ON business(`review_count`);

--
-- Table structure for table `photo`
--

DROP TABLE IF EXISTS `photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `photo`
(
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `photo_id` int(11) NOT NULL,
  `business_id` INT(11) NOT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL,
  PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

LOAD DATA
  LOCAL INFILE '/home/ec2-user/photo.csv'
  INTO TABLE chompy.photo
  FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
    ESCAPED BY ''
  LINES
    TERMINATED BY '\n'
;

CREATE INDEX photo_id_idx ON photo(photo_id);
CREATE INDEX business_id_idx ON photo(business_id);

--
-- Table structure for table `tip`
--

DROP TABLE IF EXISTS `tip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tip`
(
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tip_id` int(11) NOT NULL,
  `business_id` int(11) NOT NULL,
  `text` mediumtext,
  `date` datetime DEFAULT NULL,
  `likes` int(11) DEFAULT NULL,
  PRIMARY KEY(`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1098326 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

LOAD DATA
  LOCAL INFILE '/home/ec2-user/tip.csv'
  INTO TABLE chompy.tip
  FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
    ESCAPED BY ''
  LINES
    TERMINATED BY '\n'
;

CREATE INDEX tip_id_idx ON tip(tip_id);
CREATE INDEX business_id_idx ON tip(business_id);

DROP TABLE IF EXISTS `business_reviews200`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `business_reviews200`
(
  `id` int(11) NOT NULL,
  `name` varchar(255) DEFAULT NULL,
  `neighborhood` varchar(255) DEFAULT NULL,
  `address` varchar(255) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  `postal_code` varchar(255) DEFAULT NULL,
  `latitude` float DEFAULT NULL,
  `longitude` float DEFAULT NULL,
  `stars` float DEFAULT NULL,
  `review_count` int(11) DEFAULT NULL,
  `is_open` tinyint(1) DEFAULT NULL,
  `photo_id` int(11) DEFAULT NULL,
  `encoded_photo` varchar(20000) DEFAULT NULL,
  `tip_id` int(11) DEFAULT NULL,
  `tip_text` mediumtext,
  PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

DROP TABLE IF EXISTS `thumbnails`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `thumbnails`
(
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `photo_id` int(11) NOT NULL,
  `encoded_photo` varchar(20000) NOT NULL,
  PRIMARY KEY(`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

LOAD DATA
  LOCAL INFILE '/home/ec2-user/thumbnails.csv'
  INTO TABLE chompy.thumbnails
  FIELDS
    TERMINATED BY ','
    ENCLOSED BY '"'
    ESCAPED BY ''
  LINES
    TERMINATED BY '\n'
;

CREATE INDEX photo_id_idx ON thumbnails(photo_id);


INSERT INTO chompy.business_reviews200
  (id, name, neighborhood, address, city, state, postal_code, latitude, longitude, stars, review_count, is_open)
SELECT business_id, name, neighborhood, address, city, state, postal_code, latitude, longitude, stars, review_count, is_open
FROM chompy.business
where review_count > 200;

CREATE INDEX `postal_code_idx` ON business_reviews200(`postal_code`);

UPDATE chompy.business_reviews200 br, chompy.thumbnails t
SET br.photo_id = t.photo_id, br.encoded_photo = t.encoded_photo
WHERE t.photo_id =
(SELECT photo_id
FROM chompy.photo
WHERE business_id = br.id
LIMIT 1);

UPDATE chompy.business_reviews200 br, chompy.tip t
SET br.tip_id = t.tip_id, br.tip_text = t.text
WHERE t.tip_id =
(SELECT tip_id
FROM chompy.tip
WHERE business_id = br.id
LIMIT 1);