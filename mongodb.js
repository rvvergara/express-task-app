const { MongoClient } = require('mongodb');

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

MongoClient.connect(connectionUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log({ error });
    }

    const db = client.db(databaseName);

    db.collection('tasks').deleteOne({
      description: 'Learn Machine Learning',
    })
      .then((res) => console.log(res))
      .catch((deleteError) => console.log(deleteError));
  });
