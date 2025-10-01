-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 01, 2025 at 07:31 PM
-- Server version: 10.11.5-MariaDB-1:10.11.5+maria~ubu1804
-- PHP Version: 8.4.11

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `esential_english`
--

-- --------------------------------------------------------

--
-- Table structure for table `courses`
--

CREATE TABLE `courses` (
  `id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `exercises`
--

CREATE TABLE `exercises` (
  `id` int(11) NOT NULL,
  `flashcard_id` int(11) DEFAULT NULL,
  `en` varchar(500) DEFAULT NULL,
  `story` longtext DEFAULT NULL,
  `sound` varchar(255) DEFAULT NULL,
  `titlehidden` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `flashcards`
--

CREATE TABLE `flashcards` (
  `id` int(11) NOT NULL,
  `course_id` int(11) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `en` varchar(500) DEFAULT NULL,
  `vi` varchar(500) DEFAULT NULL,
  `desc` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `idioms`
--

CREATE TABLE `idioms` (
  `id` int(11) NOT NULL,
  `flashcard_id` int(11) DEFAULT NULL,
  `en` varchar(500) DEFAULT NULL,
  `pron` varchar(255) DEFAULT NULL,
  `desc` text DEFAULT NULL,
  `exam` text DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `sound` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `readings`
--

CREATE TABLE `readings` (
  `id` int(11) NOT NULL,
  `flashcard_id` int(11) DEFAULT NULL,
  `type` varchar(100) DEFAULT NULL,
  `block` varchar(255) DEFAULT NULL,
  `en` varchar(500) DEFAULT NULL,
  `story` longtext DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `sound` varchar(255) DEFAULT NULL,
  `vi` varchar(500) DEFAULT NULL,
  `raw_text` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `wordlist`
--

CREATE TABLE `wordlist` (
  `id` int(11) NOT NULL,
  `flashcard_id` int(11) DEFAULT NULL,
  `en` varchar(500) DEFAULT NULL,
  `pron` varchar(255) DEFAULT NULL,
  `desc` text DEFAULT NULL,
  `exam` text DEFAULT NULL,
  `vi` varchar(500) DEFAULT NULL,
  `image` varchar(255) DEFAULT NULL,
  `sound` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3 COLLATE=utf8mb3_general_ci;

--
-- Indexes for dumped tables
--

--
-- Indexes for table `courses`
--
ALTER TABLE `courses`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `exercises`
--
ALTER TABLE `exercises`
  ADD PRIMARY KEY (`id`),
  ADD KEY `flashcard_id` (`flashcard_id`);

--
-- Indexes for table `flashcards`
--
ALTER TABLE `flashcards`
  ADD PRIMARY KEY (`id`),
  ADD KEY `course_id` (`course_id`);

--
-- Indexes for table `idioms`
--
ALTER TABLE `idioms`
  ADD PRIMARY KEY (`id`),
  ADD KEY `flashcard_id` (`flashcard_id`);

--
-- Indexes for table `readings`
--
ALTER TABLE `readings`
  ADD PRIMARY KEY (`id`),
  ADD KEY `flashcard_id` (`flashcard_id`);

--
-- Indexes for table `wordlist`
--
ALTER TABLE `wordlist`
  ADD PRIMARY KEY (`id`),
  ADD KEY `flashcard_id` (`flashcard_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `courses`
--
ALTER TABLE `courses`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `exercises`
--
ALTER TABLE `exercises`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `flashcards`
--
ALTER TABLE `flashcards`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `idioms`
--
ALTER TABLE `idioms`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `readings`
--
ALTER TABLE `readings`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `wordlist`
--
ALTER TABLE `wordlist`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `exercises`
--
ALTER TABLE `exercises`
  ADD CONSTRAINT `exercises_ibfk_1` FOREIGN KEY (`flashcard_id`) REFERENCES `flashcards` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `flashcards`
--
ALTER TABLE `flashcards`
  ADD CONSTRAINT `flashcards_ibfk_1` FOREIGN KEY (`course_id`) REFERENCES `courses` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `idioms`
--
ALTER TABLE `idioms`
  ADD CONSTRAINT `idioms_ibfk_1` FOREIGN KEY (`flashcard_id`) REFERENCES `flashcards` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `readings`
--
ALTER TABLE `readings`
  ADD CONSTRAINT `readings_ibfk_1` FOREIGN KEY (`flashcard_id`) REFERENCES `flashcards` (`id`) ON DELETE CASCADE;

--
-- Constraints for table `wordlist`
--
ALTER TABLE `wordlist`
  ADD CONSTRAINT `wordlist_ibfk_1` FOREIGN KEY (`flashcard_id`) REFERENCES `flashcards` (`id`) ON DELETE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
