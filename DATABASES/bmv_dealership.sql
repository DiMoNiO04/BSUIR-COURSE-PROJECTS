-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Хост: 127.0.0.1:3306
-- Время создания: Май 12 2023 г., 18:25
-- Версия сервера: 8.0.30
-- Версия PHP: 7.2.34

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- База данных: `bmv_dealership`
--

-- --------------------------------------------------------

--
-- Структура таблицы `authorization`
--

CREATE TABLE `authorization` (
  `id` int NOT NULL,
  `login` varchar(45) COLLATE utf8mb4_general_ci NOT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `access` tinyint NOT NULL,
  `role` tinyint NOT NULL,
  `date_regist` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `email` varchar(60) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `authorization`
--

INSERT INTO `authorization` (`id`, `login`, `password`, `access`, `role`, `date_regist`, `email`) VALUES
(137, 'andrei', '$2y$10$QtGuxF0YC14vvM4w1LEWDOoDoS.Wup7uF5e4BNy3fCRf7E3Oqg7bi', 1, 0, '2023-04-19 14:05:08', 'andrei@mail.ru'),
(138, 'gosha', '$2y$10$4zVRFbZCvk/Ia9Penw.jCO8W4.ezpoXrB9rcvlqmFVskRyUN9Wtpi', 1, 0, '2023-04-19 14:13:32', 'gosha@mail.ru'),
(142, 'yana', '$2y$10$JSxT41MnJuWiOfS5XiByzu80Wl2jrNRa9tSWo5DzmBJt1hs7U7Ydu', 1, 1, '2023-04-19 14:47:15', 'yana@mail.ru'),
(171, 'ost', '$2y$10$qkED2w7vETRHqfNK6t3PBunnZKFn8PiVc5tstzOGZQzh8h0JlnbMm', 1, 0, '2023-05-12 14:31:31', 'ost@mail.ru'),
(172, 'alina', '$2y$10$Ar1RSElhaUN/zrFvkMWS/uixjYn9VwLDbZl6spOLJFlqd9Yk1wFhq', 1, 0, '2023-05-12 14:36:55', 'alina@mail.ru'),
(173, 'sokol', '$2y$10$l4s/b.V0Wml82WI8fN9X/uatAAn99gbiodruJcz6j6653ZWUt3Ucu', 1, 1, '2023-05-12 14:39:43', 'sokol@mail.ru'),
(174, 'mukha', '$2y$10$9J9wct4gvsRTwTY2uIhUS.Nka56n1gbLp.zEbMgIvVdRJ8mSkVlo.', 1, 1, '2023-05-12 14:41:55', 'mukha@mail.ru'),
(175, 'snitko', '$2y$10$FKYcXwIeyp3L6El53DWOq.4ia.R.wW.ejPYpegVCfC1RAycmrfrAy', 1, 1, '2023-05-12 14:43:31', 'snitko@mail.ru');

-- --------------------------------------------------------

--
-- Структура таблицы `auto`
--

CREATE TABLE `auto` (
  `id` int NOT NULL,
  `name` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `engine` varchar(30) COLLATE utf8mb4_general_ci NOT NULL,
  `year` int NOT NULL,
  `price` varchar(12) COLLATE utf8mb4_general_ci NOT NULL,
  `color` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `complexion` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `img` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `status` tinyint NOT NULL,
  `state` varchar(12) COLLATE utf8mb4_general_ci NOT NULL,
  `id_model` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `auto`
--

INSERT INTO `auto` (`id`, `name`, `engine`, `year`, `price`, `color`, `complexion`, `img`, `status`, `state`, `id_model`) VALUES
(98, 'X', 'Бензиновый', 2021, '110000', 'Красный', 'Базовая', '1681642646_iX.webp', 1, 'Новое', 65),
(99, 'X M60', 'Бензиновый', 2023, '160000', 'Тифани', 'Базовая', '1681642715_iX_M60.webp', 1, 'Новое', 65),
(100, '7', 'Бензиновый', 2022, '125000', 'Серый', 'Базовая', '1681642759_I7.webp', 0, 'Бу', 65),
(101, '4 M50', 'Электрический', 2019, '120000', 'Синий', 'Полная', '1681642825_I4_M50.webp', 0, 'Бу', 65),
(102, '7', 'Бензиновый', 2023, '110000', 'Серый', 'Базовая', '1681643228_X7.webp', 1, 'Новое', 56),
(104, '6', 'Электрический', 2020, '95000', 'Голубой', 'Полная', '1681643316_X6.webp', 0, 'Новое', 56),
(105, '6', 'Бензиновый', 2020, '100000', 'Болотный', 'Полная', '1681643351_X6_BROWN.webp', 1, 'Новое', 56),
(106, '5', 'Бензиновый', 2019, '85000', 'Серебристый', 'Базовая', '1681643387_X5.webp', 0, 'Новое', 56),
(107, '5', 'Бензиновый', 2022, '90000', 'Белый', 'Средняя', '1681643417_X5_WHITE.webp', 1, 'Бу', 56),
(108, '4', 'Бензиновый', 2023, '105000', 'Серебристый', 'Полная', '1681643450_X4.webp', 0, 'Новое', 56),
(110, '2', 'Бензиновый', 2019, '50000', 'Желтый', 'Базовая', '1681643527_X2.webp', 0, 'Новое', 56),
(112, '1', 'Электрический', 2020, '55000', 'Серый', 'Средняя', '1681643591_X1.webp', 1, 'Бу', 56),
(113, 'Coupe', 'Бензиновый', 2023, '115000', 'Голубой', 'Полная', '1681643875_8_COUPE.webp', 1, 'Бу', 58),
(114, 'Cabrio', 'Бензиновый', 2020, '125000', 'Серый', 'Полная', '1681643914_8_CABRIO.webp', 1, 'Бу', 58),
(115, 'Gran Coupe', 'Электрический', 2023, '130000', 'Синий', 'Средняя', '1681643941_8_GRAN_CABRIO.webp', 0, 'Новое', 58),
(116, '7', 'Бензиновый', 2022, '85000', 'Серебристый', 'Средняя', '1681644118_7_GRAY.webp', 1, 'Бу', 59),
(117, 'Long', 'Бензиновый', 2022, '135000', 'Серый', 'Полная', '1681644151_7_LONG.webp', 1, 'Новое', 59),
(118, '7', 'Электрический', 2021, '130000', 'Черный', 'Базовая', '1681644184_7_BLACK.webp', 1, 'Новое', 59),
(120, '5', 'Бензиновый', 2023, '80000', 'Синий', 'Базовая', '1681644443_5_5.webp', 1, 'Новое', 61),
(121, 'Coupe', 'Бензиновый', 2019, '65000', 'Голубой', 'Полная', '1681644653_4_COUPE.webp', 1, 'Бу', 62),
(122, 'Cabrio', 'Бензиновый', 2021, '65000', 'Серый', 'Полная', '1681644697_4_CABRIO.webp', 0, 'Бу', 62),
(123, 'Gran Coupe', 'Бензиновый', 2022, '63000', 'Синий', 'Базовая', '1681644732_4_GRAN_CABRIO.webp', 1, 'Бу', 62),
(124, '3', 'Электрический', 2021, '70000', 'Синий', 'Базовая', '1681644914_3_3.webp', 1, 'Новое', 63),
(125, '3', 'Бензиновый', 2019, '65000', 'Белый', 'Средняя', '1681644946_3_WHITE.webp', 1, 'Новое', 63),
(126, 'Coupe', 'Бензиновый', 2022, '67000', 'Фиолетовый', 'Базовая', '1681644986_Coupe.webp', 1, 'Бу', 56),
(127, '2', 'Бензиновый', 2019, '61000', 'Голубой', 'Средняя', '1681645014_2_GRAN_COUPE.webp', 1, 'Новое', 64),
(128, 'Roadstar', 'Электрический', 2019, '55000', 'Красный', 'Средняя', '1681645253_Roadstar.webp', 1, 'Новое', 69),
(129, 'Roadstar', 'Выберите двигатель', 2022, '55000', 'Фиолетовый', 'Базовая', '1681645285_Roadstar_purple.webp', 1, 'Новое', 69),
(130, 'X', 'Бензиновый', 2019, '120000', 'Голубой', 'Базовая', '1681646689_X_M.webp', 1, 'Бу', 57),
(131, '60i xDrive', 'Бензиновый', 2020, '120000', 'Синий', 'Средняя', '1681646756_M7_X60.webp', 1, 'Бу', 57),
(132, '50d X7', 'Электрический', 2021, '135000', 'Белый', 'Полная', '1681646809_X7_M50.webp', 1, 'Новое', 57),
(133, 'X6', 'Бензиновый', 2022, '125000', 'Серебристый', 'Базовая', '1681646849_X6_M.webp', 0, 'Бу', 57),
(134, 'X6 M Competition', 'Бензиновый', 2023, '140000', 'Болотный', 'Средняя', '1681646891_X6_M_COMPETION.webp', 1, 'Новое', 57),
(135, 'X5', 'Бензиновый', 2020, '125000', 'Зеленый', 'Полная', '1681646929_X5_M.webp', 1, 'Новое', 57),
(136, 'X5 Competition', 'Электрический', 2021, '120000', 'Синий', 'Базовая', '1681646967_X5_M_COMPETION.webp', 1, 'Новое', 57),
(137, '8 GRAN COUPE', 'Бензиновый', 2022, '140000', 'Белый', 'Полная', '1681647011_M8_GRAN_COUPE.webp', 1, 'Новое', 57),
(138, '8 CABRIO', 'Электрический', 2023, '135000', 'Болотный', 'Базовая', '1681647056_M8_CABRIO.webp', 0, 'Новое', 57),
(139, '8 Coupe', 'Бензиновый', 2019, '115000', 'Голубой', 'Базовая', '1681647096_M8_COUPE.webp', 1, 'Бу', 57),
(140, '760Li xDrive', 'Бензиновый', 2020, '130000', 'Серебристый', 'Базовая', '1681647158_M760i.webp', 1, 'Новое', 57),
(141, '5 Competition', 'Электрический', 2023, '120000', 'Красный', 'Полная', '1681647198_M5_COMPETITON.webp', 1, 'Бу', 57),
(142, '440i xDrive', 'Электрический', 2022, '80000', 'Синий', 'Базовая', '1681647257_M440i.webp', 0, 'Новое', 57),
(143, '4 Coupe', 'Бензиновый', 2020, '100000', 'Серебристый', 'Средняя', '1681647293_M4_COUPE.webp', 1, 'Новое', 57),
(144, '3 Competition', 'Бензиновый', 2020, '60000', 'Белый', 'Полная', '1681647337_M3_COMPETITON.webp', 1, 'Бу', 57),
(145, '235i xDrive Gran Coupe', 'Бензиновый', 2021, '65000', 'Черный', 'Средняя', '1681647382_M235i.webp', 0, 'Новое', 57),
(146, '2 Coupe', 'Электрический', 2022, '68000', 'Голубой', 'Средняя', '1681647415_M2_COUPE.webp', 1, 'Новое', 57);

--
-- Триггеры `auto`
--
DELIMITER $$
CREATE TRIGGER `delete_auto_update_counts_models` AFTER DELETE ON `auto` FOR EACH ROW UPDATE models 
SET models.counts = models.counts - 1
WHERE models.id = OLD.id_model
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `insert_auto_update_counts_models` AFTER INSERT ON `auto` FOR EACH ROW UPDATE models 
SET models.counts = models.counts + 1
WHERE models.id = NEW.id_model
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `insert_update_price` BEFORE INSERT ON `auto` FOR EACH ROW SET NEW.price = NEW.price + 3000
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `update_update_price` BEFORE UPDATE ON `auto` FOR EACH ROW SET NEW.price = NEW.price + 3000
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Дублирующая структура для представления `autosview`
-- (См. Ниже фактическое представление)
--
CREATE TABLE `autosview` (
`color` varchar(20)
,`complexion` varchar(20)
,`engine` varchar(30)
,`id` int
,`img` varchar(255)
,`model` varchar(30)
,`name` varchar(30)
,`price` varchar(12)
,`state` varchar(12)
,`status` tinyint
,`year` int
);

-- --------------------------------------------------------

--
-- Структура таблицы `clients`
--

CREATE TABLE `clients` (
  `id` int NOT NULL,
  `last_name` varchar(60) COLLATE utf8mb4_general_ci NOT NULL,
  `first_name` varchar(60) COLLATE utf8mb4_general_ci NOT NULL,
  `surname` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date_birth` date DEFAULT NULL,
  `phone` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `img` varchar(255) COLLATE utf8mb4_general_ci DEFAULT NULL,
  `count_orders` int NOT NULL DEFAULT '0',
  `id_address` int DEFAULT NULL,
  `id_auth` int DEFAULT NULL,
  `id_passport` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `clients`
--

INSERT INTO `clients` (`id`, `last_name`, `first_name`, `surname`, `date_birth`, `phone`, `img`, `count_orders`, `id_address`, `id_auth`, `id_passport`) VALUES
(86, 'Шемерей', 'Андрей', 'Олегович', '2003-01-01', '80295454546', '1681913108_user.png', 3, 52, 137, 49),
(87, 'Соболев', 'Георгий', 'Николаевич', '2004-04-04', '80448102123', '1681913612_user.png', 2, 53, 138, 50),
(108, 'Островская', 'Анастасия', 'Викторовна', '2003-08-16', '80256456382', '', 1, 74, 171, 72),
(109, 'Ходаковская', 'Алина', 'Анатольевна', '1996-03-01', '80337134821', '', 0, 75, 172, 73);

--
-- Триггеры `clients`
--
DELIMITER $$
CREATE TRIGGER `delete_client_address` BEFORE DELETE ON `clients` FOR EACH ROW DELETE FROM clients_address WHERE id = OLD.id_address
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `delete_client_auth` BEFORE DELETE ON `clients` FOR EACH ROW DELETE FROM authorization
WHERE id = OLD.id_auth
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `delete_client_passport` BEFORE DELETE ON `clients` FOR EACH ROW DELETE FROM clients_passport
WHERE id = OLD.id_passport
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Дублирующая структура для представления `clientsview`
-- (См. Ниже фактическое представление)
--
CREATE TABLE `clientsview` (
`access` tinyint
,`apartment` varchar(5)
,`city` varchar(60)
,`count_orders` int
,`date_birth` date
,`date_regist` timestamp
,`email` varchar(60)
,`first_name` varchar(60)
,`house` varchar(5)
,`id` int
,`img` varchar(255)
,`issued_by` varchar(60)
,`last_name` varchar(60)
,`login` varchar(45)
,`number` varchar(10)
,`phone` varchar(30)
,`role` tinyint
,`series` varchar(5)
,`street` varchar(50)
,`surname` varchar(60)
);

-- --------------------------------------------------------

--
-- Структура таблицы `clients_address`
--

CREATE TABLE `clients_address` (
  `id` int NOT NULL,
  `city` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `street` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `house` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `apartment` varchar(5) COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `clients_address`
--

INSERT INTO `clients_address` (`id`, `city`, `street`, `house`, `apartment`) VALUES
(52, 'Ивацевичи', 'Набережная', '21', '21'),
(53, 'Жлобин', 'Багратиона', '23', '1'),
(74, 'Минск', 'Панасенко', '81', '99'),
(75, 'Солигорск', 'Богомолова', '13', '124');

-- --------------------------------------------------------

--
-- Структура таблицы `clients_passport`
--

CREATE TABLE `clients_passport` (
  `id` int NOT NULL,
  `series` varchar(5) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `number` varchar(10) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `issued_by` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `clients_passport`
--

INSERT INTO `clients_passport` (`id`, `series`, `number`, `issued_by`) VALUES
(49, 'MP', '2020201', 'Ивацевичским РОВД'),
(50, 'MK', '6567678', 'Жлобинским РОВ'),
(72, 'MC', '9462811', 'Минским РОВД'),
(73, 'MC', '7453718', 'Солигорским РОВД');

-- --------------------------------------------------------

--
-- Структура таблицы `contacts`
--

CREATE TABLE `contacts` (
  `id` int NOT NULL,
  `name` varchar(60) COLLATE utf8mb4_general_ci NOT NULL,
  `phone` varchar(20) COLLATE utf8mb4_general_ci NOT NULL,
  `email` varchar(60) COLLATE utf8mb4_general_ci NOT NULL,
  `work_time` text COLLATE utf8mb4_general_ci NOT NULL,
  `id_address` int NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `contacts`
--

INSERT INTO `contacts` (`id`, `name`, `phone`, `email`, `work_time`, `id_address`) VALUES
(19, 'Отдел продаж автомобиля', '+375294572912', 'info@autoidea.by', 'Пн-Вс: 8:00 - 20:00', 3),
(20, 'Отдел продаж авто с пробегом', '+375172320000', 'info@autoidea.by', 'Пн-Вс 10:00–19:00', 4),
(21, 'Отдел BMW Motorrad', '+375296071177', 'info@autoidea.by', 'Пн-Вс: 8:00–18:00', 5),
(22, 'Отдел сервисного обслуживания', '+375295000819', 'service@autoidea.by', 'Пн-Вс: 8:00 - 20:00', 6),
(23, 'Отдел маркетинга и клиентинга', '+375291545805', 'marketing@autoidea.by', 'Пн - Пт 09:00-18:00', 7),
(24, 'Call-center', '+375172320000', 'call@autoidea.by', 'Пн-Вс: 8:00 - 20:00', 8);

--
-- Триггеры `contacts`
--
DELIMITER $$
CREATE TRIGGER `delete_contact_address` BEFORE DELETE ON `contacts` FOR EACH ROW DELETE FROM contacts_address 
WHERE id = OLD.id_address
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Дублирующая структура для представления `contactsview`
-- (См. Ниже фактическое представление)
--
CREATE TABLE `contactsview` (
`city` varchar(30)
,`email` varchar(60)
,`house` varchar(30)
,`id` int
,`name` varchar(60)
,`phone` varchar(20)
,`street` varchar(30)
,`work_time` text
);

-- --------------------------------------------------------

--
-- Структура таблицы `contacts_address`
--

CREATE TABLE `contacts_address` (
  `id` int NOT NULL,
  `city` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `street` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `house` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `contacts_address`
--

INSERT INTO `contacts_address` (`id`, `city`, `street`, `house`) VALUES
(3, 'Минск', 'Машерова', '76'),
(4, 'Минск', 'Долгиновский тракт', '51'),
(5, 'Минск', 'Партизанский проспект', '91'),
(6, 'Минск', 'Долгиновский тракт', '51'),
(7, 'Минск', 'Машерова', '76'),
(8, 'Минск', 'Партизанский проспект', '91');

-- --------------------------------------------------------

--
-- Структура таблицы `employees`
--

CREATE TABLE `employees` (
  `id` int NOT NULL,
  `last_name` varchar(60) COLLATE utf8mb4_general_ci NOT NULL,
  `first_name` varchar(60) COLLATE utf8mb4_general_ci NOT NULL,
  `surname` varchar(60) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `date_birth` date DEFAULT NULL,
  `img` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `job` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `id_address` int NOT NULL,
  `id_auth` int NOT NULL,
  `id_passport` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `employees`
--

INSERT INTO `employees` (`id`, `last_name`, `first_name`, `surname`, `phone`, `date_birth`, `img`, `job`, `id_address`, `id_auth`, `id_passport`) VALUES
(12, 'Чернова', 'Яна', 'Викторовна', '80338541948', '2005-05-04', '', 'Админ', 23, 142, 32),
(20, 'Соколовская', 'Кристина', 'Юрьевна', '', '1986-05-04', '', 'Менеджер', 32, 173, 43),
(21, 'Мухопад', 'Даниил', 'Михайлович', '80445345657', '1998-03-01', '', 'Менеджер', 33, 174, 44),
(22, 'Снитко', 'Евгений', 'Александрович', '80294518212', '1987-01-20', '', 'Менеджер', 34, 175, 45);

--
-- Триггеры `employees`
--
DELIMITER $$
CREATE TRIGGER `delete_employee_address` BEFORE DELETE ON `employees` FOR EACH ROW DELETE FROM employees_address
WHERE id = OLD.id_address
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `delete_employee_auth` BEFORE DELETE ON `employees` FOR EACH ROW DELETE FROM authorization 
WHERE id = OLD.id_auth
$$
DELIMITER ;
DELIMITER $$
CREATE TRIGGER `delete_employee_passport` BEFORE DELETE ON `employees` FOR EACH ROW DELETE FROM employees_passport 
WHERE id = OLD.id_passport
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Дублирующая структура для представления `employeesview`
-- (См. Ниже фактическое представление)
--
CREATE TABLE `employeesview` (
`access` tinyint
,`apartment` int
,`city` varchar(60)
,`date_birth` date
,`date_regist` timestamp
,`email` varchar(60)
,`first_name` varchar(60)
,`house` varchar(5)
,`id` int
,`img` varchar(255)
,`issued_by` varchar(60)
,`job` varchar(255)
,`last_name` varchar(60)
,`login` varchar(45)
,`number` varchar(10)
,`phone` varchar(20)
,`role` tinyint
,`series` varchar(5)
,`street` varchar(60)
,`surname` varchar(60)
);

-- --------------------------------------------------------

--
-- Структура таблицы `employees_address`
--

CREATE TABLE `employees_address` (
  `id` int NOT NULL,
  `city` varchar(60) COLLATE utf8mb4_general_ci NOT NULL,
  `street` varchar(60) COLLATE utf8mb4_general_ci NOT NULL,
  `house` varchar(5) COLLATE utf8mb4_general_ci NOT NULL,
  `apartment` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `employees_address`
--

INSERT INTO `employees_address` (`id`, `city`, `street`, `house`, `apartment`) VALUES
(23, 'Могилев', 'Новицкого', '82', 21),
(32, 'Столбцы', 'Можевского', '12', 2),
(33, 'Минск', 'Партизанский проспект', '91', 98),
(34, 'Слуцк', 'Жукова', '183', 10);

-- --------------------------------------------------------

--
-- Структура таблицы `employees_passport`
--

CREATE TABLE `employees_passport` (
  `id` int NOT NULL,
  `series` varchar(5) COLLATE utf8mb4_general_ci NOT NULL,
  `number` varchar(10) COLLATE utf8mb4_general_ci NOT NULL,
  `issued_by` varchar(60) COLLATE utf8mb4_general_ci NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `employees_passport`
--

INSERT INTO `employees_passport` (`id`, `series`, `number`, `issued_by`) VALUES
(32, 'MP', '2626343', ''),
(43, 'MK', '8023721', 'Столбцовским РОВД'),
(44, 'MK', '3467291', 'Минским РОВД'),
(45, 'MO', '5378291', 'Слуцким РОВД');

-- --------------------------------------------------------

--
-- Структура таблицы `models`
--

CREATE TABLE `models` (
  `id` int NOT NULL,
  `model` varchar(30) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `main_foto` varchar(255) COLLATE utf8mb4_general_ci NOT NULL,
  `counts` int NOT NULL DEFAULT '0'
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `models`
--

INSERT INTO `models` (`id`, `model`, `main_foto`, `counts`) VALUES
(56, 'X', '1681385693_X.jpg', 7),
(57, 'M', '1681385756_M.jpg', 17),
(58, '8', '1681385922_8.jpg', 4),
(59, '7', '1681385932_7.jpg', 3),
(61, '5', '1681385948_5.jpg', 1),
(62, '4', '1681385956_4.jpg', 3),
(63, '3', '1681385962_3.jpg', 2),
(64, '2', '1681385969_2.jpg', 2),
(65, 'I', '1681386024_I.jpg', 4),
(69, 'Z4', '1681645095_Z4.jpg', 2);

-- --------------------------------------------------------

--
-- Структура таблицы `orders`
--

CREATE TABLE `orders` (
  `id` int NOT NULL,
  `date` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `id_client` int DEFAULT NULL,
  `id_employee` int DEFAULT NULL,
  `id_auto` int DEFAULT NULL,
  `id_contact` int DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Дамп данных таблицы `orders`
--

INSERT INTO `orders` (`id`, `date`, `id_client`, `id_employee`, `id_auto`, `id_contact`) VALUES
(42, '2023-05-05 15:48:04', 87, NULL, 105, 19),
(44, '2023-05-06 06:02:59', 87, NULL, 130, 20),
(45, '2023-05-12 11:10:57', 86, 12, 125, 20),
(47, '2023-05-12 11:16:54', 86, 12, 141, 20),
(49, '2023-05-12 14:30:19', NULL, NULL, 131, 20),
(50, '2023-05-12 14:33:06', 108, NULL, 114, 20),
(51, '2023-05-12 14:58:43', 86, 22, 129, 20),
(52, '2023-05-12 15:00:16', 87, 22, 120, 20),
(55, '2023-05-12 15:05:17', 108, 21, 107, 20);

--
-- Триггеры `orders`
--
DELIMITER $$
CREATE TRIGGER `insert_order_update_counts_order` AFTER INSERT ON `orders` FOR EACH ROW UPDATE clients
SET clients.count_orders = clients.count_orders + 1
WHERE clients.id = NEW.id_client
$$
DELIMITER ;

-- --------------------------------------------------------

--
-- Дублирующая структура для представления `ordersview`
-- (См. Ниже фактическое представление)
--
CREATE TABLE `ordersview` (
`client_first_name` varchar(60)
,`client_last_name` varchar(60)
,`client_surname` varchar(60)
,`date` timestamp
,`email` varchar(60)
,`id` int
,`id_client` int
,`model` varchar(30)
,`name` varchar(30)
,`phone` varchar(30)
,`price` varchar(12)
);

-- --------------------------------------------------------

--
-- Структура для представления `autosview`
--
DROP TABLE IF EXISTS `autosview`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `autosview`  AS SELECT `auto`.`id` AS `id`, `models`.`model` AS `model`, `auto`.`name` AS `name`, `auto`.`engine` AS `engine`, `auto`.`year` AS `year`, `auto`.`price` AS `price`, `auto`.`color` AS `color`, `auto`.`complexion` AS `complexion`, `auto`.`img` AS `img`, `auto`.`status` AS `status`, `auto`.`state` AS `state` FROM (`auto` join `models` on((`auto`.`id_model` = `models`.`id`)))  ;

-- --------------------------------------------------------

--
-- Структура для представления `clientsview`
--
DROP TABLE IF EXISTS `clientsview`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `clientsview`  AS SELECT `clients`.`id` AS `id`, `clients`.`last_name` AS `last_name`, `clients`.`first_name` AS `first_name`, `clients`.`surname` AS `surname`, `clients`.`date_birth` AS `date_birth`, `clients`.`phone` AS `phone`, `clients`.`img` AS `img`, `clients`.`count_orders` AS `count_orders`, `clients_address`.`city` AS `city`, `clients_address`.`street` AS `street`, `clients_address`.`house` AS `house`, `clients_address`.`apartment` AS `apartment`, `clients_passport`.`number` AS `number`, `clients_passport`.`series` AS `series`, `clients_passport`.`issued_by` AS `issued_by`, `authorization`.`login` AS `login`, `authorization`.`access` AS `access`, `authorization`.`role` AS `role`, `authorization`.`email` AS `email`, `authorization`.`date_regist` AS `date_regist` FROM (((`clients` join `clients_passport` on((`clients`.`id_passport` = `clients_passport`.`id`))) join `clients_address` on((`clients`.`id_address` = `clients_address`.`id`))) join `authorization` on((`clients`.`id_auth` = `authorization`.`id`)))  ;

-- --------------------------------------------------------

--
-- Структура для представления `contactsview`
--
DROP TABLE IF EXISTS `contactsview`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `contactsview`  AS SELECT `contacts`.`id` AS `id`, `contacts`.`name` AS `name`, `contacts`.`phone` AS `phone`, `contacts`.`email` AS `email`, `contacts`.`work_time` AS `work_time`, `contacts_address`.`city` AS `city`, `contacts_address`.`street` AS `street`, `contacts_address`.`house` AS `house` FROM (`contacts` join `contacts_address` on((`contacts`.`id_address` = `contacts_address`.`id`)))  ;

-- --------------------------------------------------------

--
-- Структура для представления `employeesview`
--
DROP TABLE IF EXISTS `employeesview`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `employeesview`  AS SELECT `employees`.`id` AS `id`, `employees`.`last_name` AS `last_name`, `employees`.`first_name` AS `first_name`, `employees`.`surname` AS `surname`, `employees`.`date_birth` AS `date_birth`, `employees`.`phone` AS `phone`, `employees`.`img` AS `img`, `employees`.`job` AS `job`, `employees_address`.`city` AS `city`, `employees_address`.`street` AS `street`, `employees_address`.`house` AS `house`, `employees_address`.`apartment` AS `apartment`, `employees_passport`.`number` AS `number`, `employees_passport`.`series` AS `series`, `employees_passport`.`issued_by` AS `issued_by`, `authorization`.`login` AS `login`, `authorization`.`access` AS `access`, `authorization`.`role` AS `role`, `authorization`.`email` AS `email`, `authorization`.`date_regist` AS `date_regist` FROM (((`employees` join `employees_passport` on((`employees`.`id_passport` = `employees_passport`.`id`))) join `employees_address` on((`employees`.`id_address` = `employees_address`.`id`))) join `authorization` on((`employees`.`id_auth` = `authorization`.`id`)))  ;

-- --------------------------------------------------------

--
-- Структура для представления `ordersview`
--
DROP TABLE IF EXISTS `ordersview`;

CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`%` SQL SECURITY DEFINER VIEW `ordersview`  AS SELECT `orders`.`id` AS `id`, `orders`.`id_client` AS `id_client`, `orders`.`date` AS `date`, `auto`.`price` AS `price`, `auto`.`name` AS `name`, `models`.`model` AS `model`, `clients`.`last_name` AS `client_last_name`, `clients`.`first_name` AS `client_first_name`, `clients`.`surname` AS `client_surname`, `clients`.`phone` AS `phone`, `authorization`.`email` AS `email` FROM ((((`orders` join `clients` on((`orders`.`id_client` = `clients`.`id`))) join `auto` on((`orders`.`id_auto` = `auto`.`id`))) join `authorization` on((`authorization`.`id` = `clients`.`id_auth`))) join `models` on((`auto`.`id_model` = `models`.`id`)))  ;

--
-- Индексы сохранённых таблиц
--

--
-- Индексы таблицы `authorization`
--
ALTER TABLE `authorization`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `auto`
--
ALTER TABLE `auto`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_model` (`id_model`),
  ADD KEY `price` (`price`);

--
-- Индексы таблицы `clients`
--
ALTER TABLE `clients`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_address` (`id_address`),
  ADD KEY `id_passport` (`id_passport`),
  ADD KEY `id_auth` (`id_auth`),
  ADD KEY `last_name` (`last_name`);

--
-- Индексы таблицы `clients_address`
--
ALTER TABLE `clients_address`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `clients_passport`
--
ALTER TABLE `clients_passport`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `contacts`
--
ALTER TABLE `contacts`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_address` (`id_address`);

--
-- Индексы таблицы `contacts_address`
--
ALTER TABLE `contacts_address`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `employees`
--
ALTER TABLE `employees`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_auth` (`id_auth`),
  ADD KEY `id_address` (`id_address`),
  ADD KEY `id_passport` (`id_passport`),
  ADD KEY `last_name` (`last_name`);

--
-- Индексы таблицы `employees_address`
--
ALTER TABLE `employees_address`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `employees_passport`
--
ALTER TABLE `employees_passport`
  ADD PRIMARY KEY (`id`);

--
-- Индексы таблицы `models`
--
ALTER TABLE `models`
  ADD PRIMARY KEY (`id`),
  ADD KEY `model` (`model`);

--
-- Индексы таблицы `orders`
--
ALTER TABLE `orders`
  ADD PRIMARY KEY (`id`),
  ADD KEY `orders_ibfk_1` (`id_auto`),
  ADD KEY `orders_ibfk_2` (`id_client`),
  ADD KEY `id_contact` (`id_contact`),
  ADD KEY `id_employee` (`id_employee`);

--
-- AUTO_INCREMENT для сохранённых таблиц
--

--
-- AUTO_INCREMENT для таблицы `authorization`
--
ALTER TABLE `authorization`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=176;

--
-- AUTO_INCREMENT для таблицы `auto`
--
ALTER TABLE `auto`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=158;

--
-- AUTO_INCREMENT для таблицы `clients`
--
ALTER TABLE `clients`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=110;

--
-- AUTO_INCREMENT для таблицы `clients_address`
--
ALTER TABLE `clients_address`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=76;

--
-- AUTO_INCREMENT для таблицы `clients_passport`
--
ALTER TABLE `clients_passport`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=74;

--
-- AUTO_INCREMENT для таблицы `contacts`
--
ALTER TABLE `contacts`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=32;

--
-- AUTO_INCREMENT для таблицы `contacts_address`
--
ALTER TABLE `contacts_address`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT для таблицы `employees`
--
ALTER TABLE `employees`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=23;

--
-- AUTO_INCREMENT для таблицы `employees_address`
--
ALTER TABLE `employees_address`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT для таблицы `employees_passport`
--
ALTER TABLE `employees_passport`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=46;

--
-- AUTO_INCREMENT для таблицы `models`
--
ALTER TABLE `models`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=78;

--
-- AUTO_INCREMENT для таблицы `orders`
--
ALTER TABLE `orders`
  MODIFY `id` int NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=65;

--
-- Ограничения внешнего ключа сохраненных таблиц
--

--
-- Ограничения внешнего ключа таблицы `auto`
--
ALTER TABLE `auto`
  ADD CONSTRAINT `auto_ibfk_1` FOREIGN KEY (`id_model`) REFERENCES `models` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `clients`
--
ALTER TABLE `clients`
  ADD CONSTRAINT `clients_ibfk_1` FOREIGN KEY (`id_address`) REFERENCES `clients_address` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `clients_ibfk_2` FOREIGN KEY (`id_passport`) REFERENCES `clients_passport` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `clients_ibfk_3` FOREIGN KEY (`id_auth`) REFERENCES `authorization` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `contacts`
--
ALTER TABLE `contacts`
  ADD CONSTRAINT `contacts_ibfk_1` FOREIGN KEY (`id_address`) REFERENCES `contacts_address` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `employees`
--
ALTER TABLE `employees`
  ADD CONSTRAINT `employees_ibfk_1` FOREIGN KEY (`id_auth`) REFERENCES `authorization` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employees_ibfk_2` FOREIGN KEY (`id_address`) REFERENCES `employees_address` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `employees_ibfk_3` FOREIGN KEY (`id_passport`) REFERENCES `employees_passport` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Ограничения внешнего ключа таблицы `orders`
--
ALTER TABLE `orders`
  ADD CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`id_auto`) REFERENCES `auto` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`id_client`) REFERENCES `clients` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`id_contact`) REFERENCES `contacts` (`id`) ON DELETE SET NULL ON UPDATE SET NULL,
  ADD CONSTRAINT `orders_ibfk_4` FOREIGN KEY (`id_employee`) REFERENCES `employees` (`id`) ON DELETE SET NULL ON UPDATE SET NULL;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
