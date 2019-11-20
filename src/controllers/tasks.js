const Task = require('../models/task');

module.exports = {
  async index(req, res) {
    try {
      const tasks = await Task.find();
      res.json(tasks);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  async show(req, res) {
    try {
      const task = await Task.findById(req.params.id);
      return task
        ? res.json(task)
        : res.status(404).json({ error: 'Cannot find task' });
    } catch (error) {
      res.json(error);
    }
  },

  async create(req, res) {
    const task = new Task({
       ...req.body,
       owner: req.user._id,
});
    try {
      const newTask = await task.save();
      res.status(201).json(newTask);
    } catch (err) {
      res.status(422).json(err.errors);
    }
  },

  async update(req, res) {
    const allowedUpdates = ['description', 'completed'];
    const updates = Object.keys(req.body);
    const isValid = updates.every(update => allowedUpdates.includes(update));

    if (!isValid) {
      return res.status(422).json({ error: 'Disallowed property/ies' });
    }

    try {
      const task = await Task.findById(req.params.id);

      updates.forEach(update => task[update] = req.body[update]);
      await task.save();

      return task ? res.status(202).json(task) : res.status(404).json({ error: 'Cannot find task' });
    } catch (e) {
      res.status(422).json(e.errors);
    }
  },

  async delete(req, res) {
    try {
      const task = await Task.findByIdAndDelete(req.params.id);

      return task ? res.status(202).json({ message: 'Task deleted' }) : res.status(404).json({ error: 'Cannot find task' });
    } catch (error) {
      res.status(500).json(error);
    }
  },
};
