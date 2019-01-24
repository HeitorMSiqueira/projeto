-- phpMyAdmin SQL Dump
-- version 4.5.1
-- http://www.phpmyadmin.net
--
-- Host: 127.0.0.1
-- Generation Time: 20-Jan-2019 às 02:35
-- Versão do servidor: 10.1.16-MariaDB
-- PHP Version: 5.6.24

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tasklist`
--

-- --------------------------------------------------------

--
-- Estrutura da tabela `tasklist_tab`
--

CREATE TABLE `tasklist_tab` (
  `ID_TASK` int(11) NOT NULL,
  `TITULO` text COLLATE utf8_unicode_ci NOT NULL,
  `DESCRICAO` text COLLATE utf8_unicode_ci NOT NULL,
  `CONCLUIR` text COLLATE utf8_unicode_ci NOT NULL,
  `DATA_MOVIMENTO` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `PRIORIDADE` int(1) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Extraindo dados da tabela `tasklist_tab`
--

INSERT INTO `tasklist_tab` (`ID_TASK`, `TITULO`, `DESCRICAO`, `CONCLUIR`, `DATA_MOVIMENTO`, `PRIORIDADE`) VALUES
(1, 'Sistema 1', 'Tasklist Sistema 1', 'N', '2019-01-20 01:32:01', 3),
(2, 'Sistema 2', 'Task Sistema 2', 'N', '2019-01-20 01:32:25', 2),
(3, 'Sis 3', 'Sistema 3', 'N', '2019-01-20 01:32:42', 1),
(4, 'Sistema 4', 'Sistema 4 Task', 'S', '2019-01-20 01:33:12', 3);

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
