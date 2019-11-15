const express = require('express');
const tasksController = require('../controllers/tasks');

const router = new express.Router();

router.post('/tasks', tasksController.create);

router.get('/tasks', tasksController.index);

router.get('/tasks/:id', tasksController.show);

router.put('/tasks/:id', tasksController.update);

router.delete('/tasks/:id', tasksController.delete);

module.exports = router;
