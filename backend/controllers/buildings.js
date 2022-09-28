const { sequelize } = require('../models');
const models = require('../models');

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
              let metalPrice = parseInt(joinedData[0].building.metal_price * Math.pow((joinedData[0].building.price_multiplier / 100), (joinedData[0].liaison_planet_building.level)))
              let crystalPrice = parseInt(joinedData[0].building.crystal_price * Math.pow((joinedData[0].building.price_multiplier / 100), (joinedData[0].liaison_planet_building.level)))
              let deuteriumPrice = parseInt(joinedData[0].building.deuterium_price * Math.pow((joinedData[0].building.price_multiplier / 100), (joinedData[0].liaison_planet_building.level)))

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
                    { where: { id_building: idBuilding } }
                  )
                    .then(async () => {
                      return res.status(200).json({ newLevel: newLevel, metalPrice: joinedData[0].building.metal_price, crystalPrice: joinedData[0].building.crystal_price, deuteriumPrice: joinedData[0].building.deuterium_price, priceMultiplier: joinedData[0].building.price_multiplier })
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
  const planet = await models.Planet.findOne({ where: { id_user: idUser, selected: 1 } })
    .then(async (planet) => {
      const liaison = await models.Liaison_planets_building.findOne({
        where: { id_planet: planet.id, id_building: req.body.idBuilding }
      })
        .then(async (liaison) => {
          newLevel = liaison.level - 1;
          if (newLevel >= 0) {
            liaison.update(
              { level: liaison.level - 1 },
              { where: { id_user: idUser, id_building: req.body.idBuilding } }
            )
              .then(async (liaison) => {
                const building = await models.Building.findOne({ where: { id: liaison.id_building } })
                  .then((building) => {
                    return res.status(200).json({ newLevel: liaison.level, metalPrice: building.metal_price, crystalPrice: building.crystal_price, deuteriumPrice: building.deuterium_price, priceMultiplier: building.price_multiplier })
                  })
                  .catch(() => { return res.status(400).json({ error: 'ERROR' }) });
              })
              .catch(() => { return res.status(400).json({ error: 'ERROR' }) });
          } else {
            const building = await models.Building.findOne({ where: { id: liaison.id_building } })
              .then((building) => {
                return res.status(200).json({ newLevel: liaison.level, metalPrice: building.metal_price, crystalPrice: building.crystal_price, deuteriumPrice: building.deuterium_price, priceMultiplier: building.price_multiplier })
              })
              .catch(() => { return res.status(400).json({ error: 'ERROR' }) });
          }
        })
        .catch(() => { return res.status(400).json({ error: 'ERROR' }) });
    })
    .catch(() => { return res.status(400).json({ error: 'ERROR' }) });
}