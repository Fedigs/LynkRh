-- phpMyAdmin SQL Dump
-- version 4.7.9
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1
-- Généré le :  sam. 14 avr. 2018 à 23:19
-- Version du serveur :  10.1.31-MariaDB
-- Version de PHP :  7.1.15

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
SET AUTOCOMMIT = 0;
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données :  `sotutechtest`
--

-- --------------------------------------------------------

--
-- Structure de la table `candidat_reponse`
--

CREATE TABLE `candidat_reponse` (
  `id` bigint(20) NOT NULL,
  `correcte` bit(1) NOT NULL,
  `duree` varchar(255) DEFAULT NULL,
  `errors` varchar(255) DEFAULT NULL,
  `reponse_bol` bit(1) NOT NULL,
  `reponse_text` text,
  `score` double NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `warnings` varchar(255) DEFAULT NULL,
  `invitation_candidat_username` varchar(255) DEFAULT NULL,
  `invitation_offre_id` bigint(20) DEFAULT NULL,
  `question_id` bigint(20) DEFAULT NULL,
  `reponse_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `competence`
--

CREATE TABLE `competence` (
  `id` bigint(20) NOT NULL,
  `candidat_username` varchar(255) DEFAULT NULL,
  `experience_id` bigint(20) DEFAULT NULL,
  `framework_id` bigint(20) DEFAULT NULL,
  `langage_id` bigint(20) DEFAULT NULL,
  `niveau_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `competence`
--

INSERT INTO `competence` (`id`, `candidat_username`, `experience_id`, `framework_id`, `langage_id`, `niveau_id`) VALUES
(1, 'ddrame', 6, 5, NULL, 5),
(2, 'ddrame', 6, 6, NULL, 4),
(3, 'ddrame', 2, NULL, 1, 1),
(4, 'ddrame', 4, NULL, 2, 1),
(5, 'ddrame', 5, NULL, 3, 2);

-- --------------------------------------------------------

--
-- Structure de la table `contrat`
--

CREATE TABLE `contrat` (
  `id` bigint(20) NOT NULL,
  `disponibilite` datetime DEFAULT NULL,
  `lieu_travail` varchar(255) DEFAULT NULL,
  `nb_mois` int(11) NOT NULL,
  `salaire_journalier` double NOT NULL,
  `salaire_mensuel` double NOT NULL,
  `type_freelance` varchar(255) DEFAULT NULL,
  `candidat_username` varchar(255) DEFAULT NULL,
  `type_contrat_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `contrat`
--

INSERT INTO `contrat` (`id`, `disponibilite`, `lieu_travail`, `nb_mois`, `salaire_journalier`, `salaire_mensuel`, `type_freelance`, `candidat_username`, `type_contrat_id`) VALUES
(5, NULL, NULL, 0, 0, 1200, NULL, 'ddrame', 1),
(6, NULL, NULL, 0, 0, 1200, NULL, 'ddrame', 2),
(7, '2018-04-14 01:00:00', 'Bureau', 0, 12, 0, 'Plein temps', 'ddrame', 5),
(8, '2018-04-13 01:00:00', NULL, 3, 0, 0, NULL, 'ddrame', 6);

-- --------------------------------------------------------

--
-- Structure de la table `entretien`
--

CREATE TABLE `entretien` (
  `id` bigint(20) NOT NULL,
  `date_entretien` datetime DEFAULT NULL,
  `invite` bit(1) NOT NULL,
  `message` varchar(255) DEFAULT NULL,
  `candidat_username` varchar(255) DEFAULT NULL,
  `offre_id` bigint(20) DEFAULT NULL,
  `accepte` bit(1) NOT NULL,
  `invite_definitif` bit(1) NOT NULL,
  `vu` bit(1) NOT NULL,
  `lieux_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `experience`
--

CREATE TABLE `experience` (
  `id` bigint(20) NOT NULL,
  `experience` int(11) NOT NULL,
  `label` varchar(255) DEFAULT NULL,
  `point` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `experience`
--

INSERT INTO `experience` (`id`, `experience`, `label`, `point`) VALUES
(1, 1, '1 an', 0),
(2, 2, '2 ans ', 0),
(3, 3, '3 ans', 0),
(4, 4, '4 ans', 0),
(5, 5, '5 ans', 0),
(6, 6, '6 ans', 0),
(7, 7, '7 ans', 0),
(8, 8, '8 ans', 0),
(9, 9, '9 ans', 0),
(10, 10, '10 ans', 0);

-- --------------------------------------------------------

--
-- Structure de la table `fonctionnalites`
--

CREATE TABLE `fonctionnalites` (
  `id` bigint(20) NOT NULL,
  `nom` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `framework`
--

CREATE TABLE `framework` (
  `id` bigint(20) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL,
  `point` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `framework`
--

INSERT INTO `framework` (`id`, `description`, `nom`, `point`) VALUES
(4, NULL, 'Lavarel', 0),
(5, NULL, 'Django', 0),
(6, NULL, 'Spring', 0),
(7, NULL, 'symfony', 0),
(8, NULL, 'Ruby', 0);

-- --------------------------------------------------------

--
-- Structure de la table `invitation`
--

CREATE TABLE `invitation` (
  `checked` bit(1) NOT NULL,
  `end` bit(1) NOT NULL,
  `invite` bit(1) NOT NULL,
  `see` bit(1) NOT NULL,
  `start` bit(1) NOT NULL,
  `offre_id` bigint(20) NOT NULL,
  `candidat_username` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `invitation`
--

INSERT INTO `invitation` (`checked`, `end`, `invite`, `see`, `start`, `offre_id`, `candidat_username`) VALUES
(b'0', b'0', b'0', b'0', b'0', 1, 'ddrame');

-- --------------------------------------------------------

--
-- Structure de la table `langage`
--

CREATE TABLE `langage` (
  `id` bigint(20) NOT NULL,
  `compiler_args` varchar(255) DEFAULT NULL,
  `default_text` text,
  `description` varchar(255) DEFAULT NULL,
  `nom` varchar(255) NOT NULL,
  `numbre_of_question` int(11) NOT NULL,
  `numero_langage` int(11) NOT NULL,
  `point` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `langage`
--

INSERT INTO `langage` (`id`, `compiler_args`, `default_text`, `description`, `nom`, `numbre_of_question`, `numero_langage`, `point`) VALUES
(1, NULL, '//\'main\' method must be in a class \'Rextester\'.\n//Compiler version 1.8.0_111\n\nimport java.util.*;\nimport java.lang.*;\n\nclass Rextester\n{  \n    public static void main(String args[])\n    {\n        System.out.println(\"Hello, World!\");\n    }\n}', 'c\'est un langage java', 'JAVA', 0, 4, 0),
(2, NULL, '<?php //php 7.0.8\n\n    echo \"Hello, world! \"\n    \n?>', 'c\'est du php', 'PHP', 0, 8, 0),
(3, NULL, '//Rextester.Program.Main is the entry point for your code. Don\'t change it.\r\n//Compiler version 4.0.30319.17929 for Microsoft (R) .NET Framework 4.5\r\n\r\nusing System;\r\nusing System.Collections.Generic;\r\nusing System.Linq;\r\nusing System.Text.RegularExpressions;\r\n\r\nnamespace Rextester\r\n{\r\n    public class Program\r\n    {\r\n        public static void Main(string[] args)\r\n        {\r\n            //Your code goes here\r\n            Console.WriteLine(\"Hello, world!\");\r\n        }\r\n    }\r\n}', NULL, 'C#', 0, 1, 0),
(4, '-Wall -std=gnu99 -O2 -o a.out source_file.c', '//gcc 5.4.0\r\n\r\n#include  <stdio.h>\r\n\r\nint main(void)\r\n{\r\n    printf(\"Hello, world!\\n\");\r\n    return 0;\r\n}', NULL, 'C', 0, 6, 0),
(5, '-Wall -std=c++14 -O2 -o a.out source_file.cpp', '//g++  5.4.0\r\n\r\n#include <iostream>\r\n\r\nint main()\r\n{\r\n    std::cout << \"Hello, world!\\n\";\r\n}', NULL, 'C++', 0, 7, 0),
(6, NULL, '//JavaScript-C24.2.0 (SpiderMonkey)\r\n\r\nprint(\"Hello, world!\")', NULL, 'Javascript', 0, 17, 0);

-- --------------------------------------------------------

--
-- Structure de la table `langage_programmation`
--

CREATE TABLE `langage_programmation` (
  `id` bigint(20) NOT NULL,
  `description` varchar(255) DEFAULT NULL,
  `nom` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `langage_programmation`
--

INSERT INTO `langage_programmation` (`id`, `description`, `nom`) VALUES
(1, 'c\'est du java', 'JAVA'),
(2, NULL, 'PHP'),
(3, NULL, 'JAVASCRIPT'),
(4, NULL, 'PYTHON'),
(5, NULL, 'C/C++'),
(6, NULL, 'C#'),
(7, NULL, 'XML'),
(8, NULL, 'HTML'),
(9, NULL, 'CSS'),
(10, NULL, 'SQL'),
(12, NULL, 'PYTHON1');

-- --------------------------------------------------------

--
-- Structure de la table `lieux`
--

CREATE TABLE `lieux` (
  `id` bigint(20) NOT NULL,
  `nom` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `lieux`
--

INSERT INTO `lieux` (`id`, `nom`) VALUES
(1, 'Tunis'),
(2, 'Manouba'),
(3, 'Ariana'),
(4, 'Nabeul'),
(5, 'Sfax'),
(6, 'Monastir'),
(7, 'Gabes'),
(8, 'Jendouba'),
(9, 'Bizerte');

-- --------------------------------------------------------

--
-- Structure de la table `niveau`
--

CREATE TABLE `niveau` (
  `id` bigint(20) NOT NULL,
  `label` varchar(255) DEFAULT NULL,
  `niveau` int(11) NOT NULL,
  `point` double NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `niveau`
--

INSERT INTO `niveau` (`id`, `label`, `niveau`, `point`) VALUES
(1, 'Débutant', 1, 0),
(2, 'Intermédiaire', 2, 0),
(3, 'Bon', 3, 0),
(4, 'Très bon', 4, 0),
(5, 'Expert', 5, 0);

-- --------------------------------------------------------

--
-- Structure de la table `offre`
--

CREATE TABLE `offre` (
  `id` bigint(20) NOT NULL,
  `create_at` date DEFAULT NULL,
  `description` text NOT NULL,
  `status` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `proprietaire_username` varchar(255) DEFAULT NULL,
  `test_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `offre`
--

INSERT INTO `offre` (`id`, `create_at`, `description`, `status`, `titre`, `proprietaire_username`, `test_id`) VALUES
(1, '2018-04-14', '<p>Offre de travail</p>', 1, 'Offre de travail', 'Entreprise1', 1),
(2, '2018-04-14', '<p>Offre de stage</p>', 1, 'Offre de stage', 'Entreprise1', 2);

-- --------------------------------------------------------

--
-- Structure de la table `offre_contrats`
--

CREATE TABLE `offre_contrats` (
  `offre_id` bigint(20) NOT NULL,
  `contrats_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `offre_contrats`
--

INSERT INTO `offre_contrats` (`offre_id`, `contrats_id`) VALUES
(2, 6),
(1, 1),
(1, 2),
(1, 3);

-- --------------------------------------------------------

--
-- Structure de la table `offre_frameworks`
--

CREATE TABLE `offre_frameworks` (
  `offre_id` bigint(20) NOT NULL,
  `frameworks_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `offre_frameworks`
--

INSERT INTO `offre_frameworks` (`offre_id`, `frameworks_id`) VALUES
(2, 4),
(2, 5),
(2, 6),
(2, 7),
(2, 8),
(1, 4),
(1, 5),
(1, 6),
(1, 7);

-- --------------------------------------------------------

--
-- Structure de la table `offre_langages`
--

CREATE TABLE `offre_langages` (
  `offre_id` bigint(20) NOT NULL,
  `langages_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `offre_langages`
--

INSERT INTO `offre_langages` (`offre_id`, `langages_id`) VALUES
(2, 1),
(2, 2),
(2, 5),
(2, 6),
(1, 1),
(1, 2),
(1, 3),
(1, 4);

-- --------------------------------------------------------

--
-- Structure de la table `persistent_logins`
--

CREATE TABLE `persistent_logins` (
  `series` varchar(255) NOT NULL,
  `last_used` datetime DEFAULT NULL,
  `ip_address` varchar(255) DEFAULT NULL,
  `token` varchar(255) DEFAULT NULL,
  `user_agent` varchar(255) DEFAULT NULL,
  `user_login` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `question`
--

CREATE TABLE `question` (
  `id` bigint(20) NOT NULL,
  `compile_errors` varchar(255) DEFAULT NULL,
  `compile_result` varchar(255) DEFAULT NULL,
  `compile_warning` varchar(255) DEFAULT NULL,
  `description` varchar(255) NOT NULL,
  `difficulte` varchar(20) NOT NULL,
  `duree` varchar(255) NOT NULL,
  `enonce` text NOT NULL,
  `score` int(11) NOT NULL,
  `titre` varchar(255) NOT NULL,
  `type` varchar(20) NOT NULL,
  `type_question` varchar(20) NOT NULL,
  `visibilite` bit(1) NOT NULL,
  `create_by_username` varchar(255) DEFAULT NULL,
  `langage_id` bigint(20) DEFAULT NULL,
  `theme_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `question`
--

INSERT INTO `question` (`id`, `compile_errors`, `compile_result`, `compile_warning`, `description`, `difficulte`, `duree`, `enonce`, `score`, `titre`, `type`, `type_question`, `visibilite`, `create_by_username`, `langage_id`, `theme_id`) VALUES
(1, NULL, 'Hello, World!\n', NULL, 'C\'est juste un test', '0', '00:30', '<p>Ecrire un programme qui affiche hello world</p>', 30, 'Question-java-prog', '0', '2', b'1', 'admin', 1, 1),
(3, NULL, NULL, NULL, 'test', '0', '00:30', '<p>Pourquoi le langage java est moins rapide que celui de C</p>', 25, 'Question-java-libre', '0', '1', b'1', 'admin', 1, 1),
(4, NULL, NULL, NULL, 'descr', '0', '00:30', '<p>Comment php permet d&#39;afficher un message</p>', 20, 'Question-php-qcm', '0', '0', b'1', 'admin', 2, 1),
(5, NULL, 'Hello, world! ', NULL, 'description', '0', '00:30', '<p>Ecrire un proggrame qui affiche hello world</p>', 25, 'Question-php-prog', '0', '2', b'1', 'admin', 2, 1),
(6, NULL, 'Hello, world!\r\n', NULL, 'description', '0', '00:30', '<p>Ecrire un programme qui permet d&#39;afficher hello world</p>', 30, 'Question-c#-prog', '0', '2', b'1', 'admin', 3, 1),
(7, NULL, NULL, NULL, 'tst', '0', '00:30', '<p>Le langage est :</p>', 20, 'Question-c#-qcm', '0', '0', b'1', 'admin', 3, 1),
(8, NULL, NULL, NULL, 'test', '0', '00:30', '<p>Le javascript est un langage ex&eacute;cute&nbsp;</p>', 20, 'Question-javascript-qcm', '0', '0', b'1', 'admin', 6, 1),
(9, NULL, '1\n\n2\n\n3\n\n4\n\n5\n\n6\n\n7\n\n8\n\n9\n\n10\n\n11\n\n12\n\n13\n\n14\n\n15\n\n16\n\n17\n\n18\n\n19\n\n20\n\n', NULL, 'test', '0', '00:20', '<p>Ecrire un programme qui permet d&#39;afficher 1 &agrave; 20 en javascript</p>', 30, 'Question-javascript-qcm', '0', '2', b'1', 'admin', 6, 1);

-- --------------------------------------------------------

--
-- Structure de la table `reponse`
--

CREATE TABLE `reponse` (
  `id` bigint(20) NOT NULL,
  `reponse_bol` bit(1) NOT NULL,
  `reponse_text` text,
  `titre` varchar(255) DEFAULT NULL,
  `question_id` bigint(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `reponse`
--

INSERT INTO `reponse` (`id`, `reponse_bol`, `reponse_text`, `titre`, `question_id`) VALUES
(1, b'0', '//\'main\' method must be in a class \'Rextester\'.\n//Compiler version 1.8.0_111\n\nimport java.util.*;\nimport java.lang.*;\n\nclass Rextester\n{  \n    public static void main(String args[])\n    {\n        System.out.println(\"Hello, World!\");\n    }\n}', NULL, 1),
(4, b'0', 'Machine virtuelle', NULL, 3),
(5, b'1', NULL, 'echo', 4),
(6, b'0', NULL, 'print', 4),
(7, b'0', NULL, 'printf', 4),
(8, b'0', '<?php //php 7.0.8\n\n    echo \"Hello, world! \"\n    \n?>', NULL, 5),
(9, b'0', '//Rextester.Program.Main is the entry point for your code. Don\'t change it.\r\n//Compiler version 4.0.30319.17929 for Microsoft (R) .NET Framework 4.5\r\n\r\nusing System;\r\nusing System.Collections.Generic;\r\nusing System.Linq;\r\nusing System.Text.RegularExpressions;\r\n\r\nnamespace Rextester\r\n{\r\n    public class Program\r\n    {\r\n        public static void Main(string[] args)\r\n        {\r\n            //Your code goes here\r\n            Console.WriteLine(\"Hello, world!\");\r\n        }\r\n    }\r\n}', NULL, 6),
(10, b'1', NULL, 'Orienté objet', 7),
(11, b'0', NULL, 'Procédural', 7),
(12, b'0', NULL, 'Les deux', 7),
(13, b'1', NULL, 'Coté client', 8),
(14, b'0', NULL, 'Coté serveur sans aucun supplément', 8),
(15, b'1', NULL, 'Coté serveur mais il faut Nodejs', 8),
(16, b'0', '//JavaScript-C24.2.0 (SpiderMonkey)\r\nvar i;\r\nfor(i=0;i<20;i++){\r\nprint((i+1)+\"\\n\");\r\n}', NULL, 9);

-- --------------------------------------------------------

--
-- Structure de la table `role`
--

CREATE TABLE `role` (
  `role` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `role`
--

INSERT INTO `role` (`role`) VALUES
('ADMIN'),
('CANDIDAT'),
('ENTREPRISE'),
('GESTIONNAIRE');

-- --------------------------------------------------------

--
-- Structure de la table `test`
--

CREATE TABLE `test` (
  `id` bigint(20) NOT NULL,
  `affichage` varchar(255) DEFAULT NULL,
  `titre` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `test`
--

INSERT INTO `test` (`id`, `affichage`, `titre`) VALUES
(1, NULL, 'Test1'),
(2, NULL, 'Test2');

-- --------------------------------------------------------

--
-- Structure de la table `test_questions`
--

CREATE TABLE `test_questions` (
  `test_id` bigint(20) NOT NULL,
  `questions_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `test_questions`
--

INSERT INTO `test_questions` (`test_id`, `questions_id`) VALUES
(1, 1),
(1, 3),
(1, 4),
(1, 5),
(1, 6),
(2, 1),
(2, 3),
(2, 9),
(2, 8);

-- --------------------------------------------------------

--
-- Structure de la table `theme`
--

CREATE TABLE `theme` (
  `id` bigint(20) NOT NULL,
  `description` varchar(50) DEFAULT NULL,
  `nom` varchar(255) NOT NULL,
  `numbre_of_question` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `theme`
--

INSERT INTO `theme` (`id`, `description`, `nom`, `numbre_of_question`) VALUES
(1, NULL, 'Connaissance', 0),
(2, NULL, 'Modélisation', 0);

-- --------------------------------------------------------

--
-- Structure de la table `type_contrat`
--

CREATE TABLE `type_contrat` (
  `id` bigint(20) NOT NULL,
  `nom` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `type_contrat`
--

INSERT INTO `type_contrat` (`id`, `nom`) VALUES
(1, 'CDD'),
(2, 'CDI'),
(3, 'SVIP1'),
(4, 'SVIP2'),
(5, 'FREELANCE'),
(6, 'STAGE');

-- --------------------------------------------------------

--
-- Structure de la table `user`
--

CREATE TABLE `user` (
  `type` varchar(2) NOT NULL,
  `username` varchar(255) NOT NULL,
  `actived` bit(1) NOT NULL,
  `adresse` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `nom` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `tel` varchar(255) NOT NULL,
  `prenom` varchar(255) DEFAULT NULL,
  `create_at` datetime DEFAULT NULL,
  `cv_url` varchar(255) DEFAULT NULL,
  `date_naissance` datetime DEFAULT NULL,
  `invite` tinyint(1) DEFAULT '0',
  `modify_at` datetime DEFAULT NULL,
  `note` varchar(255) DEFAULT NULL,
  `photo_url` varchar(255) DEFAULT NULL,
  `score` double DEFAULT NULL,
  `role_role` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Déchargement des données de la table `user`
--

INSERT INTO `user` (`type`, `username`, `actived`, `adresse`, `email`, `nom`, `password`, `tel`, `prenom`, `create_at`, `cv_url`, `date_naissance`, `invite`, `modify_at`, `note`, `photo_url`, `score`, `role_role`) VALUES
('A', 'admin', b'1', 'adress', 'dieynedrame@gmail.com', 'dramé', '12345', '2525225455', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, NULL, 'ADMIN'),
('A', 'admin1', b'1', 'dakar', 'dieynedrame@gmail.fr', 'drame', 'admin', '5656', 'dieyne', NULL, NULL, NULL, 0, NULL, NULL, NULL, 0, 'ADMIN'),
('C', 'candidat1', b'1', 'Sfax', 'candidat1@candidat.fr', 'Drame', '12345', '55555', 'Dieyne', NULL, NULL, NULL, 0, NULL, NULL, NULL, 0, 'CANDIDAT'),
('C', 'candidatw', b'1', 'Tunis', 'candidatw@candidatw.fr', 'candidatw', 'candidatw', '21747474', 'candidatw', '2017-10-24 16:28:48', NULL, NULL, 0, '2017-10-24 16:28:48', NULL, NULL, 0, 'CANDIDAT'),
('C', 'candidatx', b'1', 'Manouba', 'candidatx@candidatx.fr', 'candidatx', '12345', '21747474', 'candidatx', '2017-10-24 16:16:29', NULL, NULL, 0, '2017-11-16 13:51:18', NULL, NULL, 0, 'CANDIDAT'),
('C', 'candidaty', b'1', 'Tunis', 'candidaty@candidaty.fr', 'candidaty', 'candidatx', '21747474', 'candidaty', '2017-10-24 16:17:58', NULL, NULL, 0, '2017-10-24 16:17:58', NULL, NULL, 0, 'CANDIDAT'),
('C', 'candidatz', b'1', 'Tunis', 'candidatz@candidatz.fr', 'candidatz', 'candidatz', '21747474', 'candidatz', '2017-10-24 16:28:13', NULL, NULL, 0, '2017-10-24 16:28:13', NULL, NULL, 0, 'CANDIDAT'),
('C', 'ddrame', b'1', 'ccc', 'ddrame.toolynk@gmail.com', 'Drame', 'ddrame', '69335962', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, 0, 'CANDIDAT'),
('C', 'dieyne', b'1', 'Tunis', 'dieyne12@hotmail.com', 'dieyne', '12345', '21747447', 'drame', '2017-11-07 16:05:56', NULL, NULL, 0, '2017-11-16 08:49:59', 'un candidat à appeler', 'Kostya_1511193419809.png', 0, 'CANDIDAT'),
('C', 'dieyne1', b'1', 'Tunis', 'dieyne12@hotmail.tn', 'dieyne', '12345', '1235', 'drame', '2017-11-07 16:06:54', NULL, NULL, 0, '2017-11-07 17:22:02', NULL, NULL, 0, 'CANDIDAT'),
('C', 'dieyne2', b'1', 'Manouba', 'dieyne2@gmail.com', 'dramé', '12345', '+33613705043', 'diéyné', '2017-11-07 16:11:55', NULL, NULL, 0, '2017-11-07 16:11:55', NULL, NULL, 0, 'CANDIDAT'),
('C', 'dieyne3', b'1', 'Tunis', 'dieyne13@hotmail.com', 'dramé', '12345', '21747447', 'dieyné', '2017-11-17 10:25:54', NULL, NULL, 0, '2017-11-17 10:25:54', NULL, NULL, 0, 'CANDIDAT'),
('C', 'dieyne4', b'1', 'Monastir', 'dieyne12@hotmail1.fr', 'drame', '12345', '21747447', 'dieyné', '2017-11-21 10:38:12', NULL, NULL, 0, '2017-11-21 10:38:12', NULL, NULL, 0, 'CANDIDAT'),
('C', 'dieyne5', b'1', 'Jendouba', 'dieyne12@hotmail2.fr', 'dramé', '12345', '27447147', 'dieyné', '2017-11-21 10:52:58', 'dieyne5.pdf', NULL, 0, '2017-11-21 10:52:58', NULL, NULL, 0, 'CANDIDAT'),
('C', 'dieyne6', b'1', 'Jendouba', 'dieyne12@hotmail6.fr', 'dramé', '12345', '27447147', 'dieyné', '2017-11-21 10:54:51', 'dieyne6.pdf', NULL, 0, '2017-11-21 10:54:51', NULL, NULL, 0, 'CANDIDAT'),
('C', 'dieyne7', b'1', 'Ariana', 'dieyne12@hotmail3.fr', 'Dramé', '12345', '21747474', 'dieyné', '2017-11-21 10:59:20', 'dieyne7.pdf', NULL, 0, '2017-11-21 10:59:20', NULL, NULL, 0, 'CANDIDAT'),
('C', 'dieyne8', b'1', 'Nabeul', 'dieyne12@hotmail4.fr', 'dramé', '12345', '21747447', 'dieyné', '2017-11-21 11:03:22', 'dieyne8_cv_2_10_117.pdf', NULL, 0, '2017-11-21 13:06:53', NULL, 'Vlad_1511283816326.png', 0, 'CANDIDAT'),
('C', 'drame', b'1', 'Manouba', 'dieyne12@hotmail.fr', 'Dramé', '12345', '272545', 'dieyné', NULL, NULL, NULL, 0, NULL, NULL, NULL, 0, 'CANDIDAT'),
('C', 'dramedieyne', b'1', 'Manouba', 'dieynedrame@gmail.co', 'Dramé', '12345', '456525', 'dieyné', NULL, 'dramedieyne_cv_6_2_118.pdf', NULL, 0, NULL, NULL, NULL, 0, 'CANDIDAT'),
('C', 'drm', b'1', 'Manouba', 'dieynedrame1@gmail.fr', 'dramé', '12345', '2545', 'dieyné', NULL, NULL, NULL, 0, NULL, NULL, NULL, 0, 'CANDIDAT'),
('E', 'Entreprise1', b'1', 'Tunis', 'entreprise1@gmail.com', 'enteprise1', '123', '55555', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, 0, 'ENTREPRISE'),
('E', 'Entreprise2', b'1', 'Sfax', 'entreprise2@gmail.com', 'Entreprise2', '123', '5555', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, 0, 'ENTREPRISE'),
('G', 'Gestionnaire1', b'1', 'dakar', 'dieyne2@gmail.com', 'dramedieyne', '12345', '231', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, 0, 'GESTIONNAIRE'),
('G', 'Gestionnaire4', b'1', 'dakar', 'gestionnaire4@gmail.com', 'gestionnaire', '12345', '54555', 'gestionnaire', NULL, NULL, NULL, 0, NULL, NULL, NULL, 0, 'GESTIONNAIRE'),
('G', 'Gestioonaire2', b'1', 'd', 'dieyne3@gmail.com', 'dd123', '123', '444', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, 0, 'GESTIONNAIRE'),
('G', 'Gestioonaire3', b'0', 'd', 'dieyne@gmail.com', 'dd', '123', '444', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, 0, 'GESTIONNAIRE'),
('C', 'j', b'1', '5rue', 'jihed@gmail.com', 'j', '12345', '55047720', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, 0, 'CANDIDAT'),
('C', 'j12345', b'1', '5rue', 'j12345@gmail.com', 'j12', '12345', '55047720', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, 0, 'CANDIDAT'),
('C', 'jihed1', b'1', '5rue', 'fedi.toolynk@gmail.com', 'jihed1', '12345', '55047720', 'jihed1', NULL, 'jihed1_cv_2_2_118.pdf', NULL, 0, '2018-03-14 15:57:21', NULL, NULL, 0, 'CANDIDAT'),
('C', 's', b'1', '5dfdf', 'seif1@gmail.com', 's', '12345', '550477132', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, 0, 'CANDIDAT'),
('C', 's1234@gmail.com', b'1', '5reu', 'seif12345@gmail.com', 's123', '12345', '50472201', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, 0, 'CANDIDAT'),
('C', 'sdsd', b'0', 'dfdsf', 'seifsfsdf@gmail.com', 'dsds', 'sdsd', '56894123', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, 0, 'GESTIONNAIRE'),
('C', 'seif allah medini', b'1', '5 NewYork', 'seifallah.toolynk@gmail.com', 'seif allah', '12345', '55047720', 'medini', NULL, 'seif allah medini_cv_1_2_118.pdf', NULL, 1, '2018-03-19 09:52:10', NULL, 'thumbnail_product_100033_1426051568_1521449520986.png', 0, 'CANDIDAT'),
('C', 'seifallah12', b'1', 'Tunis', 'seifallah@gmail.com', 'seifallah12', '12345', '89123000', 'seifallah12', '2018-03-19 09:43:50', 'seifallah12_cv_1_2_118.pdf', NULL, 0, '2018-03-19 09:43:50', NULL, NULL, 0, 'CANDIDAT'),
('C', 'test', b'1', '5dd', 'seif@gmail.com', 'test', '12345', '55047720', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, 0, 'CANDIDAT'),
('C', 'test89', b'1', 'sdfsdf', 'fedi.to@gmail.com', 'fdfd', '12345', '556789421', NULL, NULL, NULL, NULL, 1, NULL, NULL, NULL, 0, 'CANDIDAT'),
('C', 'tunis', b'1', '5ruetunis', 'tunis@gmail.com', 'tu', '12345', '55047720', NULL, NULL, NULL, NULL, 0, NULL, NULL, NULL, 0, 'CANDIDAT'),
('C', 'xxxxx', b'1', 'Manouba', 'xxx@gg.ff', 'xxxxx', '12345', '22555', 'xxxx', '2017-11-10 14:39:51', NULL, NULL, 0, '2017-11-10 14:39:51', NULL, NULL, 0, 'CANDIDAT');

-- --------------------------------------------------------

--
-- Structure de la table `user_competences`
--

CREATE TABLE `user_competences` (
  `candidat_username` varchar(255) NOT NULL,
  `competences_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `user_entretiens`
--

CREATE TABLE `user_entretiens` (
  `candidat_username` varchar(255) NOT NULL,
  `entretiens_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `user_fonctions`
--

CREATE TABLE `user_fonctions` (
  `gestionnaire_username` varchar(255) NOT NULL,
  `fonctions_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

-- --------------------------------------------------------

--
-- Structure de la table `user_invitations`
--

CREATE TABLE `user_invitations` (
  `candidat_username` varchar(255) NOT NULL,
  `invitations_candidat_username` varchar(255) NOT NULL,
  `invitations_offre_id` bigint(20) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Index pour les tables déchargées
--

--
-- Index pour la table `candidat_reponse`
--
ALTER TABLE `candidat_reponse`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKprqr3ytx4wtjnjce7947vhrku` (`invitation_candidat_username`,`invitation_offre_id`),
  ADD KEY `FKt4f3c3n0gtffq84bwvqah4fxx` (`question_id`),
  ADD KEY `FKn5kvschs75d8cpaxrejdt8qps` (`reponse_id`);

--
-- Index pour la table `competence`
--
ALTER TABLE `competence`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKn77e8kc5k0fljlrtjprmvb27p` (`candidat_username`),
  ADD KEY `FKogv7dh376ejyssnxtiun3tiis` (`experience_id`),
  ADD KEY `FKifig5ic5y8bn2338ks3sb9rbx` (`framework_id`),
  ADD KEY `FKli41b41b2d1g3bo8g9bra0veu` (`langage_id`),
  ADD KEY `FKr1j27eewxa73biao5uchis8gt` (`niveau_id`);

--
-- Index pour la table `contrat`
--
ALTER TABLE `contrat`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FK6xvjjp57k2j1xmkpc3ftm07kh` (`candidat_username`),
  ADD KEY `FK7dol63w3s57avky5yqol0kns8` (`type_contrat_id`);

--
-- Index pour la table `entretien`
--
ALTER TABLE `entretien`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKt0935okvxplnnwve4yeebix19` (`candidat_username`),
  ADD KEY `FK8vf7h85xre4hx9aaitm8ekcw4` (`offre_id`),
  ADD KEY `FKt1fx4m62m2xrahd5uludwasif` (`lieux_id`);

--
-- Index pour la table `experience`
--
ALTER TABLE `experience`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `fonctionnalites`
--
ALTER TABLE `fonctionnalites`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `framework`
--
ALTER TABLE `framework`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `invitation`
--
ALTER TABLE `invitation`
  ADD PRIMARY KEY (`candidat_username`,`offre_id`),
  ADD KEY `FKkgm6sqk8fma1eyerugqp9cim8` (`offre_id`);

--
-- Index pour la table `langage`
--
ALTER TABLE `langage`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `langage_programmation`
--
ALTER TABLE `langage_programmation`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `lieux`
--
ALTER TABLE `lieux`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `niveau`
--
ALTER TABLE `niveau`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `offre`
--
ALTER TABLE `offre`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKihcimblvgn145brtnoqqkfxm9` (`proprietaire_username`),
  ADD KEY `FKelra26gcjdshu3ko6tuemp1p1` (`test_id`);

--
-- Index pour la table `offre_contrats`
--
ALTER TABLE `offre_contrats`
  ADD KEY `FKsvanh8obw1xq3s3r77b5ia6q0` (`contrats_id`),
  ADD KEY `FKl2uvf5ygi92jqloqv2qce94sw` (`offre_id`);

--
-- Index pour la table `offre_frameworks`
--
ALTER TABLE `offre_frameworks`
  ADD KEY `FKlas4ad501e9skkr8rrcxq9ova` (`frameworks_id`),
  ADD KEY `FKd2i3ho8ssge0w9t6845dj3v8b` (`offre_id`);

--
-- Index pour la table `offre_langages`
--
ALTER TABLE `offre_langages`
  ADD KEY `FK3u0x2bh5m03xgq3rykkwc4pxa` (`langages_id`),
  ADD KEY `FKpthlcd5rjjh73v6l740ottw2a` (`offre_id`);

--
-- Index pour la table `persistent_logins`
--
ALTER TABLE `persistent_logins`
  ADD PRIMARY KEY (`series`);

--
-- Index pour la table `question`
--
ALTER TABLE `question`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKne136404ta294qw7qs3xchmpw` (`create_by_username`),
  ADD KEY `FKbkef0tlapcktmj1rabpa41do8` (`langage_id`),
  ADD KEY `FKtaeshr4q838ro18em8hpec8b3` (`theme_id`);

--
-- Index pour la table `reponse`
--
ALTER TABLE `reponse`
  ADD PRIMARY KEY (`id`),
  ADD KEY `FKp0yq2hox7fyw8rpbhx9t514rt` (`question_id`);

--
-- Index pour la table `role`
--
ALTER TABLE `role`
  ADD PRIMARY KEY (`role`);

--
-- Index pour la table `test`
--
ALTER TABLE `test`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `test_questions`
--
ALTER TABLE `test_questions`
  ADD KEY `FKramd83xrqk5s2hwob9sj2m8ne` (`questions_id`),
  ADD KEY `FKjyd3d00gosup8x9q5ojnhop0q` (`test_id`);

--
-- Index pour la table `theme`
--
ALTER TABLE `theme`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `type_contrat`
--
ALTER TABLE `type_contrat`
  ADD PRIMARY KEY (`id`);

--
-- Index pour la table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`username`),
  ADD KEY `FKcvwl5hanfnwfyvy3bclo1w9c9` (`role_role`);

--
-- Index pour la table `user_competences`
--
ALTER TABLE `user_competences`
  ADD UNIQUE KEY `UK_68ymuyexjr3f6sw9av5dahuqr` (`competences_id`),
  ADD KEY `FKdsn3gqbee3qnjqja13wwtjs9k` (`candidat_username`);

--
-- Index pour la table `user_entretiens`
--
ALTER TABLE `user_entretiens`
  ADD UNIQUE KEY `UK_auk4fpjbbw1se56kytd2fqyvp` (`entretiens_id`),
  ADD KEY `FKemmj9igiu861ct7iol6vdhy59` (`candidat_username`);

--
-- Index pour la table `user_fonctions`
--
ALTER TABLE `user_fonctions`
  ADD KEY `FK197a741ifg37cetwdh1hkipn4` (`fonctions_id`),
  ADD KEY `FKmbq4935bkfaxhein3kdwo0tvf` (`gestionnaire_username`);

--
-- Index pour la table `user_invitations`
--
ALTER TABLE `user_invitations`
  ADD UNIQUE KEY `UK_hmx86o3wmwl7ipj9y86ko3hk6` (`invitations_candidat_username`,`invitations_offre_id`),
  ADD KEY `FKlbehhdmf8plqfirlxcpjmachi` (`candidat_username`);

--
-- AUTO_INCREMENT pour les tables déchargées
--

--
-- AUTO_INCREMENT pour la table `candidat_reponse`
--
ALTER TABLE `candidat_reponse`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `competence`
--
ALTER TABLE `competence`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `contrat`
--
ALTER TABLE `contrat`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `entretien`
--
ALTER TABLE `entretien`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `experience`
--
ALTER TABLE `experience`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT pour la table `fonctionnalites`
--
ALTER TABLE `fonctionnalites`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT pour la table `framework`
--
ALTER TABLE `framework`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT pour la table `langage`
--
ALTER TABLE `langage`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT pour la table `langage_programmation`
--
ALTER TABLE `langage_programmation`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT pour la table `lieux`
--
ALTER TABLE `lieux`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `niveau`
--
ALTER TABLE `niveau`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT pour la table `offre`
--
ALTER TABLE `offre`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `question`
--
ALTER TABLE `question`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT pour la table `reponse`
--
ALTER TABLE `reponse`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT pour la table `test`
--
ALTER TABLE `test`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `theme`
--
ALTER TABLE `theme`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT pour la table `type_contrat`
--
ALTER TABLE `type_contrat`
  MODIFY `id` bigint(20) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `candidat_reponse`
--
ALTER TABLE `candidat_reponse`
  ADD CONSTRAINT `FKn5kvschs75d8cpaxrejdt8qps` FOREIGN KEY (`reponse_id`) REFERENCES `reponse` (`id`),
  ADD CONSTRAINT `FKprqr3ytx4wtjnjce7947vhrku` FOREIGN KEY (`invitation_candidat_username`,`invitation_offre_id`) REFERENCES `invitation` (`candidat_username`, `offre_id`),
  ADD CONSTRAINT `FKt4f3c3n0gtffq84bwvqah4fxx` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`);

--
-- Contraintes pour la table `competence`
--
ALTER TABLE `competence`
  ADD CONSTRAINT `FKifig5ic5y8bn2338ks3sb9rbx` FOREIGN KEY (`framework_id`) REFERENCES `framework` (`id`),
  ADD CONSTRAINT `FKli41b41b2d1g3bo8g9bra0veu` FOREIGN KEY (`langage_id`) REFERENCES `langage_programmation` (`id`),
  ADD CONSTRAINT `FKn77e8kc5k0fljlrtjprmvb27p` FOREIGN KEY (`candidat_username`) REFERENCES `user` (`username`),
  ADD CONSTRAINT `FKogv7dh376ejyssnxtiun3tiis` FOREIGN KEY (`experience_id`) REFERENCES `experience` (`id`),
  ADD CONSTRAINT `FKr1j27eewxa73biao5uchis8gt` FOREIGN KEY (`niveau_id`) REFERENCES `niveau` (`id`);

--
-- Contraintes pour la table `contrat`
--
ALTER TABLE `contrat`
  ADD CONSTRAINT `FK6xvjjp57k2j1xmkpc3ftm07kh` FOREIGN KEY (`candidat_username`) REFERENCES `user` (`username`),
  ADD CONSTRAINT `FK7dol63w3s57avky5yqol0kns8` FOREIGN KEY (`type_contrat_id`) REFERENCES `type_contrat` (`id`);

--
-- Contraintes pour la table `entretien`
--
ALTER TABLE `entretien`
  ADD CONSTRAINT `FK8vf7h85xre4hx9aaitm8ekcw4` FOREIGN KEY (`offre_id`) REFERENCES `offre` (`id`),
  ADD CONSTRAINT `FKt0935okvxplnnwve4yeebix19` FOREIGN KEY (`candidat_username`) REFERENCES `user` (`username`),
  ADD CONSTRAINT `FKt1fx4m62m2xrahd5uludwasif` FOREIGN KEY (`lieux_id`) REFERENCES `lieux` (`id`);

--
-- Contraintes pour la table `invitation`
--
ALTER TABLE `invitation`
  ADD CONSTRAINT `FK33ut0puixt2xacx97lccg0hf7` FOREIGN KEY (`candidat_username`) REFERENCES `user` (`username`),
  ADD CONSTRAINT `FKkgm6sqk8fma1eyerugqp9cim8` FOREIGN KEY (`offre_id`) REFERENCES `offre` (`id`);

--
-- Contraintes pour la table `offre`
--
ALTER TABLE `offre`
  ADD CONSTRAINT `FKelra26gcjdshu3ko6tuemp1p1` FOREIGN KEY (`test_id`) REFERENCES `test` (`id`),
  ADD CONSTRAINT `FKihcimblvgn145brtnoqqkfxm9` FOREIGN KEY (`proprietaire_username`) REFERENCES `user` (`username`);

--
-- Contraintes pour la table `offre_contrats`
--
ALTER TABLE `offre_contrats`
  ADD CONSTRAINT `FKl2uvf5ygi92jqloqv2qce94sw` FOREIGN KEY (`offre_id`) REFERENCES `offre` (`id`),
  ADD CONSTRAINT `FKsvanh8obw1xq3s3r77b5ia6q0` FOREIGN KEY (`contrats_id`) REFERENCES `type_contrat` (`id`);

--
-- Contraintes pour la table `offre_frameworks`
--
ALTER TABLE `offre_frameworks`
  ADD CONSTRAINT `FKd2i3ho8ssge0w9t6845dj3v8b` FOREIGN KEY (`offre_id`) REFERENCES `offre` (`id`),
  ADD CONSTRAINT `FKlas4ad501e9skkr8rrcxq9ova` FOREIGN KEY (`frameworks_id`) REFERENCES `framework` (`id`);

--
-- Contraintes pour la table `offre_langages`
--
ALTER TABLE `offre_langages`
  ADD CONSTRAINT `FK3u0x2bh5m03xgq3rykkwc4pxa` FOREIGN KEY (`langages_id`) REFERENCES `langage_programmation` (`id`),
  ADD CONSTRAINT `FKpthlcd5rjjh73v6l740ottw2a` FOREIGN KEY (`offre_id`) REFERENCES `offre` (`id`);

--
-- Contraintes pour la table `question`
--
ALTER TABLE `question`
  ADD CONSTRAINT `FKbkef0tlapcktmj1rabpa41do8` FOREIGN KEY (`langage_id`) REFERENCES `langage` (`id`),
  ADD CONSTRAINT `FKne136404ta294qw7qs3xchmpw` FOREIGN KEY (`create_by_username`) REFERENCES `user` (`username`),
  ADD CONSTRAINT `FKtaeshr4q838ro18em8hpec8b3` FOREIGN KEY (`theme_id`) REFERENCES `theme` (`id`);

--
-- Contraintes pour la table `reponse`
--
ALTER TABLE `reponse`
  ADD CONSTRAINT `FKp0yq2hox7fyw8rpbhx9t514rt` FOREIGN KEY (`question_id`) REFERENCES `question` (`id`);

--
-- Contraintes pour la table `test_questions`
--
ALTER TABLE `test_questions`
  ADD CONSTRAINT `FKjyd3d00gosup8x9q5ojnhop0q` FOREIGN KEY (`test_id`) REFERENCES `test` (`id`),
  ADD CONSTRAINT `FKramd83xrqk5s2hwob9sj2m8ne` FOREIGN KEY (`questions_id`) REFERENCES `question` (`id`);

--
-- Contraintes pour la table `user`
--
ALTER TABLE `user`
  ADD CONSTRAINT `FKcvwl5hanfnwfyvy3bclo1w9c9` FOREIGN KEY (`role_role`) REFERENCES `role` (`role`);

--
-- Contraintes pour la table `user_entretiens`
--
ALTER TABLE `user_entretiens`
  ADD CONSTRAINT `FKemmj9igiu861ct7iol6vdhy59` FOREIGN KEY (`candidat_username`) REFERENCES `user` (`username`),
  ADD CONSTRAINT `FKj6ytrds2w1hcnhnsrtl7mo6qm` FOREIGN KEY (`entretiens_id`) REFERENCES `entretien` (`id`);

--
-- Contraintes pour la table `user_fonctions`
--
ALTER TABLE `user_fonctions`
  ADD CONSTRAINT `FK197a741ifg37cetwdh1hkipn4` FOREIGN KEY (`fonctions_id`) REFERENCES `fonctionnalites` (`id`),
  ADD CONSTRAINT `FKmbq4935bkfaxhein3kdwo0tvf` FOREIGN KEY (`gestionnaire_username`) REFERENCES `user` (`username`);

--
-- Contraintes pour la table `user_invitations`
--
ALTER TABLE `user_invitations`
  ADD CONSTRAINT `FK47vt52kjcgpfdif5uap28g12e` FOREIGN KEY (`invitations_candidat_username`,`invitations_offre_id`) REFERENCES `invitation` (`candidat_username`, `offre_id`),
  ADD CONSTRAINT `FKlbehhdmf8plqfirlxcpjmachi` FOREIGN KEY (`candidat_username`) REFERENCES `user` (`username`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
