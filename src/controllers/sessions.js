const User = require('../models/user');

module.exports = {
  async create(req, res) {
    try {
      const user = await User.findByCredentials(req.body.email, req.body.password);
      res.json(user);
    } catch (error) {
      res.status(401).send(error);
    }
  },
};
