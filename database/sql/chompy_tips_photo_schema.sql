--
-- Current Database: `chompy_tips_photos`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `chompy_tips_photos` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `chompy_tips_photos`;

--
-- Table structure for table `photo`
--

DROP TABLE IF EXISTS `photo`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `photo` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `photo_id` varchar(22) NOT NULL,
  `business_id` varchar(22) NOT NULL,
  `caption` varchar(255) DEFAULT NULL,
  `label` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
CREATE INDEX photo_id_idx ON photo(photo_id);
CREATE INDEX business_id_idx ON photo(business_id);

--
-- Table structure for table `tip`
--

DROP TABLE IF EXISTS `tip`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!40101 SET character_set_client = utf8 */;
CREATE TABLE `tip` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `tip_id` varchar(22) NOT NULL,
  `business_id` varchar(22) NOT NULL,
  `text` mediumtext,
  `date` datetime DEFAULT NULL,
  `likes` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=1098326 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;
CREATE INDEX tip_id_idx ON tip(tip_id);
CREATE INDEX business_id_idx ON tip(business_id);

GRANT ALL PRIVILEGES ON chompy_tips_photos.* TO 'chompy';