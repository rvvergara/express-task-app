const mongoose = require('mongoose');

mongoose.connect('mongodb://127.0.0.1:27017/task-manager', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

const User = mongoose.model('User', {
  name: {
    type: String,
  },
  age: {
    type: Number,
  },
});

const brandon = new User({ name: true, age: 'twenty-one' });

brandon.save().then(user => console.log(user)).catch(e => console.log(e));
