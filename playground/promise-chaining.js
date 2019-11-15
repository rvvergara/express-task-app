require('../src/db/mongoose');

const User = require('../src/models/user');

// User
// .findOneAndUpdate({ _id: '5dca659377a10e2b4618ebaf' }, { age: 34 })
// .then(() => User.find({ age: 34 }))
// .then(users => console.log(users.length));

const updateAgeAndCount = async (id, age) => {
  await User.findByIdAndUpdate(id, { age });
  const usersCount = await User.countDocuments({ age });
  return usersCount;
};

updateAgeAndCount('5dca659377a10e2b4618ebaf', 31).then(users => console.log(users));
