Délai de construction des bâtiments/recherches/unités défensives/unités offensives

Bâtiments :

Backend :
Un délai mentionné en nombre brut de millisecondes
J'utiliserai l'heure du lancement de la construction puis je calculerai l'heure de fin.
Quand le joueur actualisera son compte, si le délai est terminé, le bâtiment sera augmenté. (A faire plus tard : De plus, si c'est un 
bâtiment de production, il faut faire un calcul pour voir combien aurait dû gagner le joueur si le bâtiment avait été augmenté avant.).
Si la construction n'est pas terminée, le délai restant sera affiché.
Modifier : le controller getData, le model de bâtiment, la BDD de bâtiment

Frontend : 
Il faudra adapter pour afficher les temps de construction. De plus, 


{
  "name": "backend",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "author": "",
  "license": "ISC",
  "dependencies": {
    "bcrypt": "^5.0.1",
    "body-parser": "^1.20.0",
    "dotenv": "^16.0.2",
    "express": "^4.18.1",
    "helmet": "^6.0.0",
    "http-errors": "^2.0.0",
    "jsonwebtoken": "^8.5.1",
    "multer": "^1.4.4",
    "mysql2": "^2.3.3",
    "nodemon": "^2.0.19",
    "path": "^0.12.7",
    "sequelize": "^6.21.5"
  }
}