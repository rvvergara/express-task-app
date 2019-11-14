const express = require('express');
const Task = require('../models/task');

const router = new express.Router();

router.post('', async (req, res) => {
  const task = new Task(req.body);

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(422).json(err.errors);
  }
});

router.get('', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json(error);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    return task
      ? res.json(task)
      : res.status(404).json({ error: 'Cannot find task' });
  } catch (error) {
    res.json(error);
  }
});

router.put('/:id', async (req, res) => {
  const allowedUpdates = ['description', 'completed'];
  const updates = Object.keys(req.body);
  const isValid = updates.every(update => allowedUpdates.includes(update));

  if (!isValid) {
    return res.status(422).json({ error: 'Disallowed property/ies' });
  }

  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    return task ? res.status(202).json(task) : res.status(404).json({ error: 'Cannot find task' });
  } catch (e) {
    res.status(422).json(e.errors);
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);

    return task ? res.status(202).json({ message: 'Task deleted' }) : res.status(404).json({ error: 'Cannot find task' });
  } catch (error) {
    res.status(500).json(error);
  }
});

module.exports = router;
