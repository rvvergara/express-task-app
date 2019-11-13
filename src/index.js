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

app.post('/tasks', async (req, res) => {
  const task = new Task(req.body);

  try {
    const newTask = await task.save();
    res.status(201).json(newTask);
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

app.get('/users/:id', (req, res) => {
  User.findOne({ _id: req.params.id })
    .then(user => {
      if (!user) {
        res.status(404);
        return res.json({ error: 'Cannot find user' });
      }
      res.json(user);
    })
    .catch(e => {
      res.status(400).json(e);
    });
});

app.get('/tasks', (req, res) => {
  Task.find()
    .then(tasks => res.json(tasks))
    .catch(e => {
      res.status(500).json(e);
    });
});

app.get('/tasks/:id', (req, res) => {
  Task.findOne({ _id: req.params.id })
    .then(task => (task
        ? res.json(task)
        : res.status(404).json({ error: 'Cannot find task' })))
    .catch(error => {
      res.status(500).json(error);
    });
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
