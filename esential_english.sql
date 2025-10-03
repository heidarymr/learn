-- phpMyAdmin SQL Dump
-- version 5.2.2
-- https://www.phpmyadmin.net/
--
-- Host: localhost:3306
-- Generation Time: Oct 03, 2025 at 07:18 AM
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
  `uri` varchar(255) NOT NULL,
  `cover_image` varchar(250) NOT NULL,
  `collection` varchar(100) NOT NULL,
  `collection_part` varchar(100) NOT NULL,
  `image_alt` varchar(250) NOT NULL,
  `image_src` varchar(250) NOT NULL,
  `description` text NOT NULL,
  `name` varchar(250) NOT NULL,
  `guid` varchar(100) NOT NULL
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
-- Stand-in structure for view `v_course_flashcard_stats`
-- (See below for the actual view)
--
CREATE TABLE `v_course_flashcard_stats` (
`course_name` varchar(250)
,`flashcard_id` int(11)
,`flashcard_en` varchar(500)
,`exercise_count` bigint(21)
,`idiom_count` bigint(21)
,`reading_count` bigint(21)
,`wordlist_count` bigint(21)
);

-- --------------------------------------------------------

--
-- Stand-in structure for view `v_course_summary`
-- (See below for the actual view)
--
CREATE TABLE `v_course_summary` (
`course_id` int(11)
,`course_name` varchar(250)
,`flashcard_count` bigint(21)
,`exercise_count` bigint(21)
,`idiom_count` bigint(21)
,`reading_count` bigint(21)
,`wordlist_count` bigint(21)
);

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

-- --------------------------------------------------------

--
-- Structure for view `v_course_flashcard_stats`
--
DROP TABLE IF EXISTS `v_course_flashcard_stats`;

CREATE ALGORITHM=UNDEFINED DEFINER=`esential_english`@`%` SQL SECURITY DEFINER VIEW `v_course_flashcard_stats`  AS SELECT `c`.`name` AS `course_name`, `f`.`id` AS `flashcard_id`, `f`.`en` AS `flashcard_en`, (select count(0) from `exercises` where `exercises`.`flashcard_id` = `f`.`id`) AS `exercise_count`, (select count(0) from `idioms` where `idioms`.`flashcard_id` = `f`.`id`) AS `idiom_count`, (select count(0) from `readings` where `readings`.`flashcard_id` = `f`.`id`) AS `reading_count`, (select count(0) from `wordlist` where `wordlist`.`flashcard_id` = `f`.`id`) AS `wordlist_count` FROM (`courses` `c` join `flashcards` `f` on(`c`.`id` = `f`.`course_id`)) ORDER BY `c`.`name` ASC, `f`.`id` ASC ;

-- --------------------------------------------------------

--
-- Structure for view `v_course_summary`
--
DROP TABLE IF EXISTS `v_course_summary`;

CREATE ALGORITHM=UNDEFINED DEFINER=`esential_english`@`%` SQL SECURITY DEFINER VIEW `v_course_summary`  AS SELECT `c`.`id` AS `course_id`, `c`.`name` AS `course_name`, count(distinct `f`.`id`) AS `flashcard_count`, count(distinct `e`.`id`) AS `exercise_count`, count(distinct `i`.`id`) AS `idiom_count`, count(distinct `r`.`id`) AS `reading_count`, count(distinct `w`.`id`) AS `wordlist_count` FROM (((((`courses` `c` left join `flashcards` `f` on(`c`.`id` = `f`.`course_id`)) left join `exercises` `e` on(`f`.`id` = `e`.`flashcard_id`)) left join `idioms` `i` on(`f`.`id` = `i`.`flashcard_id`)) left join `readings` `r` on(`f`.`id` = `r`.`flashcard_id`)) left join `wordlist` `w` on(`f`.`id` = `w`.`flashcard_id`)) GROUP BY `c`.`id`, `c`.`name` ORDER BY `c`.`name` ASC ;

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
