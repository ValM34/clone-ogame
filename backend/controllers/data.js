const models = require('../models');

// Récupère le nom, numéro et localisation de la planète sélectionnée
exports.getPlanet = async (req, res, next) => {
  const idUser = req.auth.id_user;

  const planet = await models.Planet.findOne({
    attributes: ['id', 'name', 'number', 'localisation'],
    where: { id_user: idUser, selected: 1 }
  })
    .then(async (planet) => {

      return res.status(200).json({ planet })
    })
    .catch(() => {
      return res.status(400).json({ error: 'ERROR' })
    })
}

exports.getData = async (req, res, next) => {
  const idUser = req.auth.id_user;

  const planet = await models.Planet.findOne({
    attributes: ['id', 'metal', 'crystal', 'deuterium', 'last_call'],
    where: { id_user: idUser, selected: 1 }
  })
    .then(async (planet) => {
      const liaison_planet_building = await models.Liaison_planets_building.findAll({
        attributes: ["id", "id_planet", "id_building", "level"],
        where: { id_planet: planet.id }
      })
        .then(async (liaison_planet_building) => {
          const Building = await models.Building.findAll({
            attributes: ['id', 'multiplier', 'role', 'name']
          })
            .then(async (building) => {
              // Ici je dois transformer les tableaux liaison_planet_building et building pour
              // Lier leurs valeurs entre elles
              joinedData = [];
              for (let i = 0; i < liaison_planet_building.length; i++) {
                for (let o = 0; o < building.length; o++) {
                  if (liaison_planet_building[i].id_building === building[o].id) {
                    joinedData[i] = {
                      liaison_planet_building: liaison_planet_building[i],
                      building: building[o]
                    }
                  }
                }
              }

              // La date de la dernière actualisation des ressources:
              const last_call = planet.last_call;
              // Le nombre de secondes depuis la dernière actualisation:
              const diffTime = (Date.now() - last_call) / 1000;
              // Le nombre de ressources produites depuis la dernière actualisation:
              for (let i = 0; i < joinedData.length; i++) {
                joinedData[i][joinedData[i].building.name] = joinedData[i].building.multiplier * joinedData[i].liaison_planet_building.level * Math.pow(1.1, joinedData[i].liaison_planet_building.level) / 3600 * diffTime;
              }

              // Le nouveau total de métal possédé sur la planète sélectionnée:
              const totalMetal = planet.metal + joinedData[0]['Mine de métal']
              const totalCrystal = planet.crystal + joinedData[1]['Mine de cristal']
              const totalDeuterium = planet.deuterium + joinedData[2]['Synthétiseur de deutérium']

              // Je mets à jours la table planet pour actualiser last_call et la nouvelle valeur des ressources
              const updatePlanet = await models.Planet.update(
                { last_call: Date.now(), metal: totalMetal, crystal: totalCrystal, deuterium: totalDeuterium },
                { where: { id_user: idUser, selected: true } }
              )
                .then(async () => {
                  return res.status(200).json({ totalMetal, totalCrystal, totalDeuterium })
                })
                .catch(() => { return res.status(400).json({ error: 'ERROR' }) });
            })
            .catch(() => { return res.status(400).json({ error: 'ERROR' }) });
        })
        .catch(() => { return res.status(400).json({ error: 'ERROR' }) });
    })
    .catch(() => { return res.status(400).json({ error: 'ERROR' }) });
}

exports.displayBuildings = async (req, res, next) => {
  const idUser = req.auth.id_user;
  const planet = await models.Planet.findOne({
    attributes: ['id', 'number', 'metal', 'crystal', 'deuterium', 'selected'],
    where: { id_user: idUser, selected: 1 }
  })
    .then(async (planet) => {
      const liaison_planet_building = await models.Liaison_planets_building.findAll({
        attributes: ["id", "id_planet", "id_building", "level"],
        where: { id_planet: planet.id }
      })
        .then(async (liaison_planet_building) => {
          const Building = await models.Building.findAll({
            attributes: ['id', 'name', 'metal_price', 'crystal_price', 'deuterium_price', 'price_multiplier', 'description', 'role', 'page', 'img_src'],
          })
            .then(async (building) => {
              console.log(req.body)
              let newArr = [];
              for (let i = 0; i < building.length; i++) {
                if (building[i].page === req.body.url) {
                  newArr.push(building[i]);
                } else {
                  newArr.push(false)
                }
              }
              building.forEach(building => building.img_src = "http://localhost:3001/" + building.img_src)
              let newArr2 = [];
              console.log(building.length)
              for (let i = 0; i < newArr.length; i++) {
                for (let o = 0; o < newArr.length; o++) {
                  if (newArr[i].id === liaison_planet_building[o].id_building) {
                    newArr2.push([newArr[i], [liaison_planet_building[o]]]);
                  }
                }
              }
              
              return res.status(200).json({ planet: planet, liaison_planet_building: liaison_planet_building, building: newArr2 })
            })
            .catch(() => { return res.status(400).json({ error: 'ERROR' }) });
        })
        .catch(() => { return res.status(400).json({ error: 'ERROR' }) });
    })
    .catch(() => { return res.status(400).json({ error: 'ERROR' }) });
}
