require('../src/db/mongoose');
const Task = require('../src/models/task');

// Task.findByIdAndDelete('5dcba9cc4c748f574b49b6c0')
//   .then(() => Task.countDocuments({ completed: false }))
//   .then(count => console.log(count));

const deleteAndCountIncomplete = async (id) => {
  await Task.findByIdAndDelete(id);
  const count = await Task.countDocuments({ completed: false });
  return count;
};

deleteAndCountIncomplete('5dcbca79a3403a6003a1cc21').then(count => console.log('NEW COUNT', count)).catch(e => console.log(e));
