require('../src/db/mongoose');
const Task = require('../src/models/task');

Task.findByIdAndDelete('5dcba9cc4c748f574b49b6c0')
  .then(() => Task.countDocuments({ completed: false }))
  .then(count => console.log(count));
