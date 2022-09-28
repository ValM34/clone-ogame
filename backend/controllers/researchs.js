const models = require('../models');

exports.displayResearchs = async (req, res, next) => {
  const idUser = req.auth.id_user;
  const liaison_user_research = await models.Liaison_users_research.findAll({
    attributes: ["id", "id_user", "id_research", "level"],
    where: { id_user: idUser }
  })
    .then(async (liaison_user_research) => {

      const research = await models.Research.findAll({
        attributes: ['id', 'name', 'metal_price', 'crystal_price', 'deuterium_price', 'price_multiplier', 'description', 'img_src'],
      })
        .then(async (research) => {

          let newArr = [];
          for (let i = 0; i < research.length; i++) {
            newArr.push(research[i]);
          }
          research.forEach(research => research.img_src = "http://localhost:3001/" + research.img_src)
          let newArr2 = [];
          for (let i = 0; i < newArr.length; i++) {
            for (let o = 0; o < newArr.length; o++) {
              if (newArr[i].id === liaison_user_research[o].dataValues.id_research) {
                newArr2.push([newArr[i], [liaison_user_research[o].dataValues]]);
              }
            }
          }
          return res.status(200).json({ liaison_user_research: liaison_user_research, research: newArr2 })
        })
        .catch(() => { return res.status(400).json({ error: 'ERROR' }) });
    })
    .catch(() => { return res.status(400).json({ error: 'ERROR' }) });
  /*})
  .catch(() => { return res.status(400).json({ error: 'ERROR' }) });*/
}

exports.downgrade = async (req, res, next) => {
  const idUser = req.auth.id_user;

  const liaison = await models.Liaison_users_research.findOne({
    where: { id_user: idUser, id_research: req.body.idResearch }
  })
    .then(async (liaison) => {
      newLevel = liaison.level - 1;
      if (newLevel >= 0) {
        liaison.update(
          { level: liaison.level - 1 },
          { where: { id_user: idUser, id_research: req.body.idResearch } }
        )
          .then(async (liaison) => {
            const research = await models.Research.findOne({ where: { id: liaison.id_research } })
              .then((research) => {
                return res.status(200).json({ newLevel: liaison.level, metalPrice: research.metal_price, crystalPrice: research.crystal_price, deuteriumPrice: research.deuterium_price, priceMultiplier: research.price_multiplier })
              })
              .catch(() => { return res.status(400).json({ error: 'ERROR' }) });
          })
          .catch(() => { return res.status(400).json({ error: 'ERROR' }) });
      } else {
        const research = await models.Research.findOne({ where: { id: liaison.id_research } })
          .then((research) => {
            return res.status(200).json({ newLevel: liaison.level, metalPrice: research.metal_price, crystalPrice: research.crystal_price, deuteriumPrice: research.deuterium_price, priceMultiplier: research.price_multiplier })
          })
          .catch(() => { return res.status(400).json({ error: 'ERROR' }) });
      }
    })
    .catch(() => { return res.status(400).json({ error: 'ERROR' }) });
}

exports.upgrade = async (req, res, next) => {
  const idUser = req.auth.id_user;
  const planet = await models.Planet.findOne({
    where: { id_user: idUser, selected: 1 }
  })
    .then(async (planet) => {
      const liaison = await models.Liaison_users_research.findOne({
        where: { id_user: idUser, id_research: req.body.idResearch }
      })
        .then(async (liaison) => {
          const research = await models.Research.findOne({
            where: { id: liaison.id_research }
          })
            .then(async (research) => {
              let metalPrice = parseInt(research.metal_price * Math.pow((research.price_multiplier / 100), (liaison.level)))
              let crystalPrice = parseInt(research.crystal_price * Math.pow((research.price_multiplier / 100), (liaison.level)))
              let deuteriumPrice = parseInt(research.deuterium_price * Math.pow((research.price_multiplier / 100), (liaison.level)))
              let newMetal = planet.metal - metalPrice;
              let newCrystal = planet.crystal - crystalPrice;
              let newDeuterium = planet.deuterium - deuteriumPrice;
              if (newMetal < 0 || newCrystal < 0 || newDeuterium < 0) {
                return;
              }
              planet.update({
                metal: newMetal, crystal: newCrystal, deuterium: newDeuterium
              })
                .then(async (planet) => {
                  liaison.update({
                    level: liaison.level + 1
                  })
                    .then((liaison) => {
                      return res.status(200).json({ newLevel: liaison.level, metalPrice: research.metal_price, crystalPrice: research.crystal_price, deuteriumPrice: research.deuterium_price, priceMultiplier: research.price_multiplier })
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
