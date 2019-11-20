const User = require('../models/user');

  exports.show = async (req, res) => {
    res.send(req.user);
  };

  exports.create = async (req, res) => {
    const user = new User(req.body);
    try {
      await user.save();
      const token = await user.generateAuthToken();
      res.status(201).json({ user, token });
    } catch (err) {
      res.status(422).json(err.errors || err);
    }
  };

  exports.update = async (req, res) => {
    const allowedUpdates = ['name', 'email', 'age', 'password'];
    const updates = Object.keys(req.body);
    const isValid = updates.every(update => allowedUpdates.includes(update));

    if (!isValid) {
      return res.status(422).json({ error: 'Disallowed property/ies' });
    }
    try {
      const user = await req.user;
      updates.forEach(update => user[update] = req.body[update]);

      await user.save();
      return res.status(202).json(user);
    } catch (e) {
      res.status(422).send(e.errors);
    }
  };

  exports.delete = async (req, res) => {
    try {
      await req.user.remove();
      return res.status(202).json({
        message: 'Successfully deleted user',
      });
    } catch (error) {
      res.json(error);
    }
  };
