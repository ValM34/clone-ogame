-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Hôte : 127.0.0.1:3306
-- Généré le : lun. 26 sep. 2022 à 18:05
-- Version du serveur : 5.7.36
-- Version de PHP : 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de données : `clone_ogame_dev`
--

-- --------------------------------------------------------

--
-- Structure de la table `buildings`
--

DROP TABLE IF EXISTS `buildings`;
CREATE TABLE IF NOT EXISTS `buildings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `metal_price` int(11) UNSIGNED NOT NULL,
  `crystal_price` int(11) UNSIGNED NOT NULL,
  `deuterium_price` int(11) UNSIGNED NOT NULL,
  `multiplier` smallint(11) UNSIGNED DEFAULT NULL,
  `price_multiplier` smallint(3) UNSIGNED NOT NULL,
  `description` varchar(1500) NOT NULL,
  `role` enum('production','reduce_construction_time','other','energy','research') NOT NULL,
  `page` enum('ressources','installations','research') NOT NULL,
  `img_src` varchar(120) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `buildings`
--

INSERT INTO `buildings` (`id`, `name`, `metal_price`, `crystal_price`, `deuterium_price`, `multiplier`, `price_multiplier`, `description`, `role`, `page`, `img_src`, `created_at`, `updated_at`) VALUES
(1, 'Mine de métal', 60, 15, 0, 30, 150, 'Principale ressource pour la construction de bâtiments et de vaisseaux. Le métal est la matière première la moins chère, mais c`est la plus importante. La production du métal consomme moins d`énergie que la production des autres ressources. Plus les mines sont développées, plus elles sont profondes. Les réserves minérales sont situées en profondeur sur la majorité des planètes. Les mines les plus profondes permettent d`extraire plus de métal, ce qui augment leur rendement. Cependant, les mines les plus développées consomment aussi plus d`énergie.', 'production', 'ressources', 'images/mine_de_metal.webp', '2022-09-09 18:04:08', '2022-09-09 18:04:08'),
(2, 'Mine de cristal', 48, 24, 0, 20, 160, 'Le cristal est la principale ressource pour l`électronique et pour les alliages et son exploitation consomme environ une fois et demi plus d`énergie que celle du métal, le cristal est donc plus précieux. Tous les vaisseaux et bâtiments ont besoin de cristal. Malheureusement, la plupart des cristaux nécessaires pour la construction de vaisseaux sont très rares et se trouvent en grande profondeur, comme le métal. La production augmente avec le développement des mines car on atteint des gisement plus grands et plus purs.', 'production', 'ressources', 'images/mine_de_cristal.webp', '2022-09-10 22:24:46', '2022-09-10 22:24:46'),
(3, 'Synthétiseur de deutérium', 225, 75, 0, 10, 150, 'Le deutérium est produit à partir d`hydrogène lourd qu`on trouve principalement sur les fonds marins. Le développement du bâtiment permet d`accéder à des réserves de deutérium à de plus grandes profondeurs et de concentrer ce deutérium. Le deutérium sert de carburant pour les vaisseaux et il est nécessaire pour presque toutes les recherches. Il est également utilisé pour l`observation de galaxies ou les scanners à l`aide d`une phalange de capteur.', 'production', 'ressources', 'images/mine_de_deuterium.webp', '2022-09-10 22:33:26', '2022-09-10 22:33:26'),
(4, 'Centrale électrique solaire', 75, 30, 0, 20, 150, 'Pour assurer l`alimentation des mines et des synthétiseurs en énergie, des centrales électriques solaires géantes sont nécessaires. Plus ces installations sont développées, plus la surface de la planète est recouverte de cellules photovoltaïques qui transforment les rayons de soleil en énergie électrique. Les centrales électriques solaires sont la base de l`alimentation énergétique d`une planète.', 'energy', 'ressources', 'images/centrale_electrique_solaire.webp', '2022-09-10 22:25:55', '2022-09-10 22:25:55'),
(5, 'Usine de robots', 400, 120, 200, NULL, 200, 'Les usines de robots produisent des robots ouvriers qui servent à la construction de l`infrastructure planétaire. Chaque niveau augmente la vitesse de construction des différents bâtiments.', 'reduce_construction_time', 'installations', 'images/usine_de_robots.webp', '2022-09-10 22:27:54', '2022-09-10 22:27:54'),
(6, 'Laboratoire de recherche', 200, 400, 200, NULL, 200, 'Le laboratoire de recherche est nécessaire pour développer de nouvelles technologies. Le niveau du laboratoire détermine la vitesse de la recherche. Pour accélérer la recherche, tous les chercheurs de votre empire sont rassemblés dans le laboratoire de la planète sur laquelle se fait la recherche. Ces chercheurs ne peuvent donc plus faire de recherches sur une autre planète. Dès qu`une nouvelle technologie est développée, les chercheurs retournent à leurs planètes d`origine et emmènent le savoir. Par conséquent, toutes les technologies recherchées peuvent être utilisées sur toutes les planètes.', 'research', 'installations', 'images/laboratoire_de_recherche.webp', '2022-09-10 22:30:52', '2022-09-10 22:30:52');

-- --------------------------------------------------------

--
-- Structure de la table `liaison_planets_buildings`
--

DROP TABLE IF EXISTS `liaison_planets_buildings`;
CREATE TABLE IF NOT EXISTS `liaison_planets_buildings` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_planet` int(11) DEFAULT NULL,
  `id_building` int(11) NOT NULL,
  `level` smallint(5) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `liaison_planets_buildings_ibfk_1` (`id_planet`),
  KEY `liaison_planets_buildings_ibfk_2` (`id_building`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `liaison_planets_buildings`
--

INSERT INTO `liaison_planets_buildings` (`id`, `id_planet`, `id_building`, `level`, `created_at`, `updated_at`) VALUES
(1, 2, 1, 19, '2022-09-15 20:28:50', '2022-09-25 17:59:57'),
(2, 2, 2, 14, '2022-09-15 20:29:04', '2022-09-23 13:02:36'),
(3, 2, 3, 10, '2022-09-15 20:29:19', '2022-09-25 21:35:42'),
(4, 2, 4, 6, '2022-09-15 22:45:10', '2022-09-26 17:49:47'),
(5, 2, 5, 0, '2022-09-18 13:40:33', '2022-09-18 14:24:34'),
(6, 2, 6, 0, '2022-09-18 13:40:41', '2022-09-18 14:24:29');

-- --------------------------------------------------------

--
-- Structure de la table `liaison_users_researches`
--

DROP TABLE IF EXISTS `liaison_users_researches`;
CREATE TABLE IF NOT EXISTS `liaison_users_researches` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `id_research` int(11) NOT NULL,
  `level` smallint(5) UNSIGNED NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `liaison_users_researchs_ibfk_1` (`id_user`),
  KEY `liaison_users_researchs_ibfk_2` (`id_research`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `liaison_users_researches`
--

INSERT INTO `liaison_users_researches` (`id`, `id_user`, `id_research`, `level`, `created_at`, `updated_at`) VALUES
(7, 22, 10, 4, '2022-09-19 21:59:50', '2022-09-26 18:00:03'),
(8, 22, 11, 4, '2022-09-21 16:39:11', '2022-09-26 17:53:51');

-- --------------------------------------------------------

--
-- Structure de la table `planets`
--

DROP TABLE IF EXISTS `planets`;
CREATE TABLE IF NOT EXISTS `planets` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `id_user` int(11) NOT NULL,
  `number` tinyint(1) NOT NULL,
  `name` varchar(50) NOT NULL,
  `localisation` int(11) NOT NULL,
  `metal` int(10) UNSIGNED NOT NULL,
  `crystal` int(10) UNSIGNED NOT NULL,
  `deuterium` int(10) UNSIGNED NOT NULL,
  `selected` tinyint(4) NOT NULL,
  `last_call` timestamp NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  PRIMARY KEY (`id`),
  KEY `planet_ibfk_1` (`id_user`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `planets`
--

INSERT INTO `planets` (`id`, `id_user`, `number`, `name`, `localisation`, `metal`, `crystal`, `deuterium`, `selected`, `last_call`, `created_at`, `updated_at`) VALUES
(2, 22, 1, 'Homeworld', 1, 68594, 7457, 2848, 1, '2022-09-26 18:01:59', '2022-09-10 09:49:18', '2022-09-26 18:01:59');

-- --------------------------------------------------------

--
-- Structure de la table `research`
--

DROP TABLE IF EXISTS `research`;
CREATE TABLE IF NOT EXISTS `research` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `metal_price` int(11) UNSIGNED NOT NULL,
  `crystal_price` int(11) UNSIGNED NOT NULL,
  `deuterium_price` int(11) UNSIGNED NOT NULL,
  `multiplier` smallint(11) UNSIGNED DEFAULT NULL,
  `price_multiplier` smallint(3) UNSIGNED NOT NULL,
  `description` varchar(1500) NOT NULL,
  `img_src` varchar(120) NOT NULL,
  `created_at` timestamp NOT NULL,
  `updated_at` timestamp NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `research`
--

INSERT INTO `research` (`id`, `name`, `metal_price`, `crystal_price`, `deuterium_price`, `multiplier`, `price_multiplier`, `description`, `img_src`, `created_at`, `updated_at`) VALUES
(10, 'énergie', 0, 800, 400, NULL, 200, 'La technologie énergétique se concentre surtout sur le développement des réseaux et du stockage d`énergie. Une telle technologie bien développée permet de stocker plus d`énergie et de la transporter plus efficacement.', 'images/energie.webp', '2022-09-19 21:59:02', '2022-09-19 21:59:02'),
(11, 'espionnage', 200, 1000, 200, NULL, 200, 'La technique d`espionnage est principalement un développement poussé de la technologie des capteurs. Plus cette technique est développée, plus le joueur peut posséder d`informations sur ce qui ce passe dans son environnement.\r\nLa différence entre le propre niveau d`espionnage et celui de l`ennemi est l`aspect déterminant du succès d`une sonde. Chaque niveau supplémentaire de technique d`espionnage augmente les détails que vous verrez sur vos rapports et réduit les chances que l`ennemi remarquera votre espionnage. En envoyant une grande quantité de sondes par mission, on augmente non seulement les chances d`un rapport détaillé mais aussi les chances de découverte.\r\nLa technique d`espionnage améliore aussi la localisation des flottes ennemies. En ce qui concerne la localisation, seul votre niveau est déterminant. Dès le niveau 2, l`affichage d`une attaque comportera le nombre de vaisseaux attaquants. Au niveau 4 vous pourrez identifier les types des vaisseaux attaquants et le nombre total des vaisseaux, au niveau 8 le nombre de vaisseaux de chaque type.\r\nCette technologie est indispensable lorsque vous planifiez une attaque, car elle permet de voir si la cible a des flottes et/ou des défenses en place.\r\nCette technique devrait donc être développée très rapidement.', 'images/espionnage.webp', '2022-09-21 16:34:40', '2022-09-21 16:34:40');

-- --------------------------------------------------------

--
-- Structure de la table `users`
--

DROP TABLE IF EXISTS `users`;
CREATE TABLE IF NOT EXISTS `users` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `email` varchar(250) NOT NULL,
  `password` varchar(250) NOT NULL,
  `name` varchar(250) NOT NULL,
  `surname` varchar(250) NOT NULL,
  `pseudo` varchar(30) NOT NULL,
  `is_admin` tinyint(4) NOT NULL,
  `role` enum('user','admin') NOT NULL,
  `metal` bigint(20) UNSIGNED NOT NULL,
  `crystal` bigint(20) UNSIGNED NOT NULL,
  `deuterium` bigint(20) UNSIGNED NOT NULL,
  `energy` int(11) NOT NULL,
  `points` int(11) NOT NULL,
  `last_call` datetime NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4;

--
-- Déchargement des données de la table `users`
--

INSERT INTO `users` (`id`, `email`, `password`, `name`, `surname`, `pseudo`, `is_admin`, `role`, `metal`, `crystal`, `deuterium`, `energy`, `points`, `last_call`, `created_at`, `updated_at`) VALUES
(22, 'vmoreau@user.fr', '$2b$05$EtKZ1BauC4Wbc/v2OpCHVuZTzt9Ee6MYBGffUJb.BJbtaxVcmPGye', 'Moreau', 'Valentin', 'Vlads', 0, 'user', 9223372036854775808, 500, 0, 0, 0, '2022-09-14 18:21:33', '2022-09-10 09:49:18', '2022-09-16 15:56:02');

--
-- Contraintes pour les tables déchargées
--

--
-- Contraintes pour la table `liaison_planets_buildings`
--
ALTER TABLE `liaison_planets_buildings`
  ADD CONSTRAINT `liaison_planets_buildings_ibfk_1` FOREIGN KEY (`id_planet`) REFERENCES `planets` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `liaison_planets_buildings_ibfk_2` FOREIGN KEY (`id_building`) REFERENCES `buildings` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `liaison_users_researches`
--
ALTER TABLE `liaison_users_researches`
  ADD CONSTRAINT `liaison_users_researches_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `liaison_users_researches_ibfk_2` FOREIGN KEY (`id_research`) REFERENCES `research` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Contraintes pour la table `planets`
--
ALTER TABLE `planets`
  ADD CONSTRAINT `planets_ibfk_1` FOREIGN KEY (`id_user`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
