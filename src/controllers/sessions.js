const User = require('../models/user');

module.exports = {
  async create(req, res) {
    try {
      const user = await User.findByCredentials(req.body.email, req.body.password);
      const token = await user.generateAuthToken();
      res.status(201).json({ user, token });
    } catch (error) {
      res.status(401).send(error);
    }
  },

  async destroy(req, res) {
    try {
       const { user } = req;
       user.tokens = user.tokens.filter(({ token }) => token !== req.token);
       await user.save();
       res.json({ message: 'Successfully logged out' });
    } catch (e) {
      res.status(500).send('Something went wrong');
    }
  },

  async destroyAll(req, res) {
    try {
      const { user } = req;
      user.tokens = [];
      await user.save();
      res.json({ message: 'Logged out from all devices' });
    } catch (e) {
      res.status(500).send('Something went wrong');
    }
  },
};
