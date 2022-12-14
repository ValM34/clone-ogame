const express = require('express');
const helmet = require("helmet");
const createError = require('http-errors');
require('dotenv').config()
const models = require('./models');
const jwt = require('jsonwebtoken');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');

const usersRoutes = require('./routes/users');
const dataRoutes = require('./routes/data');
const buildingsRoutes = require('./routes/buildings');
researchsRoutes = require('./routes/researchs');

app.use(express.json()); // Cela sert à ce que les requêtent comme "req.body" soient comprises par le serveur
app.use(helmet({ crossOriginResourcePolicy: false }));

// Body Parser configuration
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
    next();
});

// const auth = require("./middleware/auth");
const { dirname } = require('path');

// ------------------------------ Routes ------------------------------
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/users', usersRoutes);
app.use('/data', dataRoutes);
app.use('/buildings', buildingsRoutes);
app.use('/researchs', researchsRoutes);

module.exports = app;