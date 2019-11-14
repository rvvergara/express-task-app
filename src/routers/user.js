const express = require('express');
const User = require('../models/user');

const router = new express.Router();

router.post('', async (req, res) => {
  const user = new User(req.body);
  try {
    const newUser = await user.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(422).json(err.errors);
  }
});

router.get('', async (req, res) => {
  try {
    const users = await User.find();
    res.send(users);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get('/:id', async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    return user
      ? res.json(user)
      : res.status(404).json({ error: 'Cannot find user' });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put('/:id', async (req, res) => {
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

router.delete('/:id', async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    return user ? res.status(202).json({ message: 'Successfully deleted user' }) : res.status(404).json({ error: 'Cannot find user' });
  } catch (error) {
    res.json(error);
  }
});

module.exports = router;
