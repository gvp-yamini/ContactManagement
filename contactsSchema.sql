-- MySQL dump 10.13  Distrib 8.0.19, for Win64 (x86_64)
--
-- Host: localhost    Database: contacts
-- ------------------------------------------------------
-- Server version	8.0.19

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

CREATE DATABASE contacts;
USE contacts;

--
-- Table structure for table `address`
--

DROP TABLE IF EXISTS `address`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `address` (
  `Address_id` int NOT NULL AUTO_INCREMENT,
  `Address_type` varchar(100) DEFAULT NULL,
  `Address` varchar(100) DEFAULT NULL,
  `City` varchar(100) DEFAULT NULL,
  `State` varchar(100) DEFAULT NULL,
  `Zip` varchar(10) DEFAULT NULL,
  `Contact_id` int NOT NULL,
  PRIMARY KEY (`Address_id`),
  KEY `Contact_id_idx` (`Contact_id`),
  CONSTRAINT `FK03` FOREIGN KEY (`Contact_id`) REFERENCES `contact` (`Contact_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=39 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `address`
--

LOCK TABLES `address` WRITE;
/*!40000 ALTER TABLE `address` DISABLE KEYS */;
INSERT INTO `address` VALUES (31,' Home','Plano',' Dallas',' Texas',' 75080',64),(32,' Home',' UTA',' Arlington',' texas',' 78987',65),(34,' Veera Swamy',' Roypeta',' Narsapuram',' AP',' 275432',66),(35,' Home',' Richardson',' Dallas',' Texas',' 78939',67),(36,' Office',' Mindspace',' Hyderabad',' Telengana',' 530008',67),(37,' Home',' NR peta',' Eluru',' AP',' 564783',69),(38,' test',' test',' test',' test',' 89393',70);
/*!40000 ALTER TABLE `address` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `contact`
--

DROP TABLE IF EXISTS `contact`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `contact` (
  `Contact_id` int NOT NULL AUTO_INCREMENT,
  `Fname` varchar(100) NOT NULL,
  `Mname` varchar(100) DEFAULT NULL,
  `Lname` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`Contact_id`)
) ENGINE=InnoDB AUTO_INCREMENT=71 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `contact`
--

LOCK TABLES `contact` WRITE;
/*!40000 ALTER TABLE `contact` DISABLE KEYS */;
INSERT INTO `contact` VALUES (64,'Yamini','Ratna ','Thota'),(65,'Satya','','Sirigineedi'),(66,'Veera','Swamy','Thota'),(67,'Krishna','veni','Nunsavathu'),(68,'Mrudula','','Ponnada'),(69,'Bhanu','Rekha','Grandhi'),(70,'Srivani','','K');
/*!40000 ALTER TABLE `contact` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `date`
--

DROP TABLE IF EXISTS `date`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `date` (
  `Date_id` int NOT NULL AUTO_INCREMENT,
  `Contact_id` int NOT NULL,
  `Date_type` varchar(100) DEFAULT NULL,
  `Date` date DEFAULT NULL,
  PRIMARY KEY (`Date_id`),
  KEY `FK01_idx` (`Contact_id`),
  CONSTRAINT `FK01` FOREIGN KEY (`Contact_id`) REFERENCES `contact` (`Contact_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=24 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `date`
--

LOCK TABLES `date` WRITE;
/*!40000 ALTER TABLE `date` DISABLE KEYS */;
INSERT INTO `date` VALUES (12,65,' Birthday','1993-05-14'),(13,65,' Marriage Date','2018-09-02'),(14,66,' Birthday','1963-01-05'),(15,67,' Birthday','1992-07-15'),(16,68,' Birthday','1993-07-15'),(17,68,' New Year','2020-01-01'),(18,69,' Child birthday','2018-08-26'),(19,69,' Birthday','1992-04-10'),(20,69,' Marriage','2020-03-12'),(21,70,' test','2020-03-11'),(22,70,' Home type','2020-08-13'),(23,70,' test daa','2020-03-19');
/*!40000 ALTER TABLE `date` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `phone`
--

DROP TABLE IF EXISTS `phone`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `phone` (
  `Phone_id` int NOT NULL AUTO_INCREMENT,
  `Phone_type` varchar(100) DEFAULT NULL,
  `Area_code` varchar(15) DEFAULT NULL,
  `Number` varchar(15) DEFAULT NULL,
  `Contact_id` int NOT NULL,
  PRIMARY KEY (`Phone_id`),
  KEY `Contact_id_idx` (`Contact_id`),
  CONSTRAINT `FK02` FOREIGN KEY (`Contact_id`) REFERENCES `contact` (`Contact_id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `phone`
--

LOCK TABLES `phone` WRITE;
/*!40000 ALTER TABLE `phone` DISABLE KEYS */;
INSERT INTO `phone` VALUES (23,' Home',' 01',' 8790987625',65),(24,' Home',' +91',' 7485009443',66),(25,' Home',' 01',' 9876545678',67),(26,' Mobile',' +91',' 5783922002',68),(27,' Landline',' +01',' 8769033223',68),(28,' Mobile',' +91',' 8987822920',69);
/*!40000 ALTER TABLE `phone` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2020-03-22 15:09:36
