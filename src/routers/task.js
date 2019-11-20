const express = require('express');
const tasksController = require('../controllers/tasks');
const { auth } = require('../middleware/auth');

const router = new express.Router();

router.post('/tasks', auth, tasksController.create);

router.get('/tasks', auth, tasksController.index);

router.get('/tasks/:id', auth, tasksController.show);

router.put('/tasks/:id', auth, tasksController.update);

router.delete('/tasks/:id', auth, tasksController.delete);

module.exports = router;
