const { ObjectId } = require('mongoose').Types;
const Task = require('../models/task');

const findTask = async (user, id) => {
  await user.populate('tasks').execPopulate();
  return user.tasks.find(({ _id }) => ObjectId(_id).toHexString() === id);
};

exports.index = async (req, res) => {
  try {
    await req.user.populate('tasks').execPopulate();
    const { tasks } = req.user;
    res.json(tasks);
  } catch (error) {
    res.status(500).json(error);
  }
};

exports.show = async (req, res) => {
  try {
    const task = await findTask(req.user, req.params.id);
    return task
      ? res.json(task)
      : res.status(404).json({ error: 'Cannot find task' });
  } catch (error) {
    res.json(error);
  }
};

exports.create = async (req, res) => {
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
};

exports.update = async (req, res) => {
  const allowedUpdates = ['description', 'completed'];
  const updates = Object.keys(req.body);
  const isValid = updates.every(update => allowedUpdates.includes(update));

  if (!isValid) {
    return res.status(422).json({ error: 'Disallowed property/ies' });
  }

  try {
    const task = await findTask(req.user, req.params.id);
    updates.forEach(update => task[update] = req.body[update]);
    await task.save();

    return task ? res.status(202).json(task) : res.status(404).json({ error: 'Cannot find task' });
  } catch (e) {
    res.status(422).json(e.errors || e);
  }
};

exports.delete = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({ _id: req.params.id, owner: req.user._id });

    return task ? res.status(202).json({ message: 'Task deleted' }) : res.status(404).json({ error: 'Cannot find task' });
  } catch (error) {
    res.status(500).json(error);
  }
};
