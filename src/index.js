const express = require('express');
require('./db/mongoose');

const User = require('./models/user');
const Task = require('./models/task');

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.post('/users', (req, res) => {
  const user = new User(req.body);

  user.save()
    .then(newUser => {
      res
        .status(201)
        .json(newUser);
    })
    .catch(({ errors }) => {
      res
        .status(422)
        .json(errors);
    });
});

app.post('/tasks', (req, res) => {
  const task = new Task(req.body);

  task.save()
    .then(newTask => {
      res
        .status(201)
        .json(newTask);
    })
    .catch(error => {
      res
        .status(422)
        .json(error.errors);
    });
});

app.listen(port, () => {
  console.log(`Listening to port ${port}`);
});
