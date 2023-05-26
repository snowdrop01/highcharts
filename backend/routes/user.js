const express = require('express');
const routes = express();
const userController = require('../controllers/user');

routes.use(express.json());

routes.get('/dashboard', userController.getData);

module.exports = routes;