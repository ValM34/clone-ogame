# Choses utilises au front : 

## Choses utiles à toutes les pages front :

Pour ces requêtes-là, il est important que je réfléchisse comment je vais les appeler, car je vais devoir les
appeler à chaque actualisation d'une page. Peut-$etre que je devrais créer une sorte de fonction que j'appel à
chaque fois en fin de route.

### Les ressources possédée sur la planète sélectionnée (getData) => FAIT
#### TABLES nécessaires : 
1. users (id)
2. planet (id, last_call, metal, crystal, deuterium)
3. liaison_planet_buildings (id, id_planet, id_buildings, level)
4. buildings (id, multiplier, role)

Calcul des ressources possédées sur la planète sélectionnée :

La date de la dernière actualisation des ressources:  
const last_call = user.last_call;  
Le nombre de secondes depuis la dernière actualisation:  
const diffTime = (Date.now() - last_call) / 1000;   
Le nombre de ressources produites depuis la dernière actualisation:  
production = building.multiplier * liaison_planet_buildings.level * Math.pow(1.1, liaison_planet_buildings.level) / 3600 * diffTime;  
Le nouveau total de métal possédé sur la planète sélectionnée:  
const totalMetal = planet.metal + production  

Il faudra surement adapter le calcul pour calculer aussi le cristal et le deuterium, en faisant une boucle for
ou un forEach


### Les images liées aux ressources possédée sur la planète sélectionnée => FAIT
#### TABLES nécessaires : 
Aucune je pense que je vais l'afficher grâce à react directement

### Le nom, le numéro et la localisation de la panète sélectionnée [getPlanet] => FAIT
#### TABLES nécessaires :
1. users (id)
2. planet (id, name, number, localisation)

## Choses utiles à des pages spécifiques

## Choses utiles à plusieurs pages : 
### Les bâtiments à afficher en fonction de la page (ressources, installations...) [displayBuildings] => FAIT
#### TABLES nécessaires :  
1. users (id)  
2. planet (id, number, metal, crystal, deuterium, selected)  
3. liaison_planets_buildings (id, id_planet, id_buildings, level)
4. buildings (id, name, metal_price, crystal_price, deuterium_price, description, role, page, img_src)

### upgrade un bâtiment  
#### TABLES nécessaires :
1. users (id)  
2. planet (id, metal, crystal, deuterium, selected)  
3. liaison_planets_buildings (id, id_planet, id_buildings, level)
4. buildings (id, name, metal_price, crystal_price, deuterium_price)

#### Marche à suivre pour afficher tout ça :   
Je vais appeler une page et récupérer en post une partie de son URL qui contiendra le nom de la page
Je vais faire une condition dans une boucle for qui va vérifier si le bâtiment et la page appelée correspondent  
Je vais ensuite créer un tableau ou objet pour l'envoyer au front pour qu'il puisse afficher les bâtiments

### downgrade un bâtiment  
#### TABLES nécessaires :  
1. users (id) => le front l'a déjà donc pas besoin
2. planet (id, selected)  
3. liaison_planets_buildings (id_planet, id_buildings, level)  
4. buildings (id) => le front l'a déjà donc pas besoin

# Création du front : 
Je vais réparer la première page front que j'ai fais et je vais la faire correctement afficher toutes les infos dont j'ai besoin