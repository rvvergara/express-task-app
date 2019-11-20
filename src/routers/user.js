const express = require('express');
const usersController = require('../controllers/users');
const sessionsController = require('../controllers/sessions');
const { auth } = require('../middleware/auth');

const router = new express.Router();

router.post('/users', usersController.create);

router.post('/login', sessionsController.create);

router.delete('/logout', auth, sessionsController.destroy);

router.delete('/logoutAll', auth, sessionsController.destroyAll);

router.get('/users/me', auth, usersController.show);

router.put('/users/me', auth, usersController.update);

router.delete('/users/me', auth, usersController.delete);

module.exports = router;
