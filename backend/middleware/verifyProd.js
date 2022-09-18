const models = require('../models');

// En réflexion pour l'utiliser ça peut être une solution 
module.exports = (req, res, next) => {
  const user = models.User.findOne({ where: { id: req.auth.id_user } })
    .then((user) => {
      // res.user = { user };
      console.log(res.user)
      // next();
      //
      const metalProduction = models.MetalMine.findOne({ where: { id: 1 } })
        .then(async (metalProduction) => {
          const planet = await models.Planet.findOne({ where: { id_user: req.auth.id_user } })
            .then(async (planet) => {
              const last_call = user.last_call;
              const diffTime = (Date.now() - last_call) / 1000;
              console.log(diffTime + " seconds");
              console.log((diffTime / (60 * 60)) * 3000 + ' métal produits depuis la dernière actualisation de la page')
              newMetal = user.metal + diffTime
              await user.update({ last_call: Date.now(), metal: newMetal })
                .then(() => {
                  res.user = {
                    "base_production": metalProduction.base_production,
                    "metal lvl": planet.number,
                    "id_user": req.auth.id_user,
                    "production": Math.trunc(metalProduction.base_production * planet.number * Math.pow(1.1, planet.number)),
                    "producted since last update": diffTime
                  }
                  next();
                })
                .catch((err) => {
                  return res.status(500).json({ error: "ERROR" })
                })
            })
            .catch(error => res.status(400).json({ error: "ERROR" }))
        })
        .catch(error => res.status(400).json({ error: "ERROR" }))
    })
    .catch((err) => {
      return res.status(500).json({ error: "ERROR" })
    })
};