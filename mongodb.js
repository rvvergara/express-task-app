const { MongoClient, ObjectID } = require('mongodb');

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log({ error });
    }

    const db = client.db(databaseName);

    db.collection('tasks').findOne({ _id: new ObjectID('5dc268f3e0b1a25dfb1d67c2') })
      .then((task) => console.log('FIND ONE TASK', task))
      .catch((findError) => console.log({ findError }));

    db.collection('tasks').find({ completed: true })
      .toArray()
      .then((tasks) => console.log('FIND MULTIPLE TASKS', tasks))
      .catch((findError) => console.log({ findError }));
  });
