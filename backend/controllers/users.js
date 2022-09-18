const models = require('../models');
const bcrypt = require('bcrypt');
const jwtUtils = require('../utils/jwt.utils');

// Constants
const EMAIL_REGEX = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
const PASSWORD_REGEX = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/;

// Routes
exports.signupUser = async (req, res) => {
  // Params
  const email = req.body.email;
  const password = req.body.password;
  const surname = req.body.surname;
  const name = req.body.name;
  const pseudo = req.body.pseudo;

  if (!email || !surname || !name || !password) {
    return res.status(400).json({ 'error': 'NULL PARAMETER' });
  }

  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ 'error': 'EMAIL IS NOT VALID' });
  }

  if (!PASSWORD_REGEX.test(password)) {
    return res.status(400).json({ 'error': 'PASSWORD IS NOT VALID' });
  }

  models.User.findOne({
    attributes: ['email'],
    where: { email: email }
  })

    .then(function (userFound) {
      if (!userFound) {
        models.User.findOne({
          attributes: ['pseudo'],
          where: { pseudo: pseudo }
        })

          .then(function (userFound) {
            if (!userFound) {
              bcrypt.hash(password, 5, function (err, bcryptedPassword) {
                const newUser = models.User.create({
                  email: email,
                  password: bcryptedPassword,
                  surname: surname,
                  name: name,
                  is_admin: 0,
                  role: 'user',
                  pseudo: pseudo,
                  metal: 500,
                  crystal: 500,
                  deuterium: 0,
                  points: 0,
                  energy: 0
                })
                  // test d'ajouter une plane=ète à l'utilisateur
                  .then(function (newUser) {
                    const newPlanet = models.Planet.create({
                      id_user: newUser.id,
                      number: 0,
                      name: "Homeworld",
                      localisation: 1,
                      metal_mine: 1
                    })
                  })
                  // Fin du test
                  .then(function () {
                    return res.status(201).json({
                      'succes': 'USER CREATED'
                    })
                  })
              });
            } else {
              return res.status(409).json({ 'error': 'PSEUDO ALREADY EXIST' });
            }
          })

          .catch(function (err) {
            return res.status(500).json({ 'error': 'CANNOT ADD USER' });
          })
      } else {
        return res.status(409).json({ 'error': 'USER ALREADY EXIST' });
      }
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': 'ERROR' });
    });
};


exports.signinUser = async (req, res) => {

  // Params
  const email = req.body.email;
  const password = req.body.password;

  if (email == null || password == null) {
    return res.status(400).json({ 'error': 'MISSING PARAMETER' });
  }


  if (!EMAIL_REGEX.test(email)) {
    return res.status(400).json({ 'error': 'EMAIL IS NOT VALID' });
  }

  if (!PASSWORD_REGEX.test(password)) {
    return res.status(400).json({ 'error': 'PASSWORD IS NOT VALID' });
  }

  models.User.findOne({
    where: { email: email }
  })
    .then(function (userFound) {
      if (userFound) {
        bcrypt.compare(password, userFound.password, function (errBcrypt, resBcrypt) {
          if (resBcrypt) {
            return res.status(200).json({
              'userId': userFound.id,
              'token': jwtUtils.generateTokenForUser(userFound)
            });
          } else {
            return res.status(403).json({ 'error': 'INVALID PASSWORD' });
          }
        })
      } else {
        return res.status(404).json({ 'error': 'USER NOT EXIST IN DB' });
      }
    })
    .catch(function (err) {
      return res.status(500).json({ 'error': 'UNABLE TO VERIFY USER' });
    });
}

exports.getAllUsers = async (req, res, next) => {

  const allUsers = await models.User.findAll({ attributes: ['id', 'name', 'surname'] })
    .then(users => { res.status(200).json(users) })
    .catch(error => res.status(400).json({ error: "ERROR" }))
};

exports.isLoggedIn = async (req, res, next) => {

  models.User.findOne({
    attributes: ['id'],
    where: { id: req.auth.id_user }
  })
    .then((user) => { return res.status(200).json(user) })
    .catch(error => { return res.status(400).json({ error: "ERROR" })})
};

exports.deleteUser = async (req, res, next) => {

  const user = req.auth.users_idusers;
  if (!user) {
    return res.send(" ERROR ");
  }
  const verifyUser = await models.User.findOne({
    where: { id: req.auth.users_idusers }
  })
  if (verifyUser) {
    const deleteUser = await models.User.destroy({
      where: { id: req.auth.users_idusers }
    });
    return res.send("USER_DELETED");
  } else {
    return res.send(" ERROR ");
  }
};

exports.isAdmin = async (req, res, next) => {

  const allUsers = await models.User.findOne({
    attributes: ['id', 'isAdmin'],
    where: { id: req.auth.users_idusers }
  })
    .then(users => { res.status(200).json(users) })
    .catch(error => res.status(400).json({ error: "ERROR" }))
};