const { sequelize } = require('../models');
const models = require('../models');

exports.upgrade = async (req, res, next) => {
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
              let idBuilding = parseInt(req.body.idBuilding);
              console.log(idBuilding)
              let array = [];
              for (let i = 0; i < building.length; i++) {
                if (building[i].id === idBuilding) {
                  array.push(building[i])
                }
              }
              
              joinedData = [];
              for (let i = 0; i < liaison_planet_building.length; i++) {
                for (let o = 0; o < building.length; o++) {
                  if (liaison_planet_building[i].id_building === building[o].id && liaison_planet_building[i].id_building === idBuilding) {
                    joinedData[0] = {
                      liaison_planet_building: liaison_planet_building[i],
                      building: building[o]
                    }
                  }
                }
              }
              let metalPrice = parseInt(joinedData[0].building.metal_price * Math.pow((joinedData[0].building.price_multiplier / 100), (joinedData[0].liaison_planet_building.level - 1)))
              let crystalPrice = parseInt(joinedData[0].building.crystal_price * Math.pow((joinedData[0].building.price_multiplier / 100), (joinedData[0].liaison_planet_building.level - 1)))
              let deuteriumPrice = parseInt(joinedData[0].building.deuterium_price * Math.pow((joinedData[0].building.price_multiplier / 100), (joinedData[0].liaison_planet_building.level - 1)))

              // Calcul du reste après la potentielle upgrade
              let newMetal = planet.metal - metalPrice;
              let newCrystal = planet.crystal - crystalPrice;
              let newDeuterium = planet.deuterium - deuteriumPrice;

              let newLevel = joinedData[0].liaison_planet_building.level + 1

              if (newMetal < 0 || newCrystal < 0 || newDeuterium < 0) {
                return res.status(200).json({ fail: 'NOT ENOUGHT MONEY' })
              }
              const upgradePlanetRessources = await models.Planet.update(
                { metal: newMetal, crystal: newCrystal, deuterium: newDeuterium },
                { where: { id_user: idUser, selected: true } }
              )
                .then(async () => {
                  const upgradeBuilding = await models.Liaison_planets_building.update(
                    { level: newLevel },
                    { where: { id_building: idBuilding }}
                  )
                    .then(async () => {
                      return res.status(200).json({ succes: 'UPGRADED' })
                    })
                    .catch(() => { return res.status(400).json({ error: 'ERROR' }) });
                })
                .catch(() => { return res.status(400).json({ error: 'ERROR' }) });
            })
            .catch(() => { return res.status(400).json({ error: 'ERROR' }) });
        })
        .catch(() => { return res.status(400).json({ error: 'ERROR' }) });
    })
    .catch(() => { return res.status(400).json({ error: 'ERROR' }) });
}

exports.downgrade = async (req, res, next) => {
  const idUser = req.auth.id_user;
  const planet = await models.Planet.findOne({
    attributes: ['id', 'selected'],
    where: { id_user: idUser, selected: 1 }
  })
    .then(async (planet) => {
      console.log('salr')
      const testeee = await models.Liaison_planets_building.update(
        {level: sequelize.literal('level - 1')},
        {where: { id_planet: planet.id, id_building: req.body.idBuilding }}
        )
          .then(async () => { return res.status(200).json({ succes: 'SUCCES' }) })
          .catch(() => { return res.status(400).json({ error: 'ERROR' }) })
    })
    .catch(() => { return res.status(400).json({ error: 'ERROR' }) })
}