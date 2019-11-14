const express = require('express');
require('./db/mongoose');

const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', async (req, res) => {
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(422).json(err.errors);
  }
});

app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

app.get('/users/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return user
      ? res.json(user)
      : res.status(404).json({ error: 'Cannot find user' });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.put('/users/:id', async (req, res) => {
  const allowedUpdates = ['name', 'email', 'age', 'password'];
  const updates = Object.keys(req.body);
  const isValid = updates.every(update => allowedUpdates.includes(update));

  if (!isValid) {
    return res.status(422).json({ error: 'Disallowed property/ies' });
  }
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    });

    return user
      ? res.status(200).json(user)
      : res.status(404).json({ error: 'Cannot find user' });
  } catch (e) {
    res.status(422).send(e.errors);
  }
});

app.delete('/users/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndRemove(req.params.id);
    return user ? res.status(202).json({ message: 'Successfully deleted user' }) : res.status(404).json({ error: 'Cannot find user' });
  } catch (error) {
    res.json(error);
  }
});

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(422).json(err.errors);
  }
});

app.get('/tasks', async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).json(error);
  }
});

app.get('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    return task
      ? res.json(task)
      : res.status(404).json({ error: 'Cannot find task' });
  } catch (error) {
    res.json(error);
  }
});

app.put('/tasks/:id', async (req, res) => {
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

app.delete('/tasks/:id', async (req, res) => {
  try {
    const task = await Task.findByIdAndRemove(req.params.id);

    return task ? res.status(202).json({ message: 'Task deleted' }) : res.status(404).json({ error: 'Cannot find task' });
  } catch (error) {
    res.status(500).json(error);
  }
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
