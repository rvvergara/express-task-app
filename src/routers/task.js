const express = require('express');
const tasksController = require('../controllers/tasks');
const { auth } = require('../middleware/auth');

const router = new express.Router();

router.post('/tasks', auth, tasksController.create);

router.get('/tasks', tasksController.index);

router.get('/tasks/:id', tasksController.show);

router.put('/tasks/:id', tasksController.update);

router.delete('/tasks/:id', tasksController.delete);

module.exports = router;
