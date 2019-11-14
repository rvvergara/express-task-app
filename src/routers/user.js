const express = require('express');
const usersController = require('../controllers/users');

const router = new express.Router();

router.post('/users', usersController.create);

router.get('/users', usersController.index);

router.get('/users/:id', usersController.show);

router.put('/users/:id', usersController.update);

router.delete('/users/:id', usersController.delete);

module.exports = router;
