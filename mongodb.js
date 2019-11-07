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

    db.collection('tasks').updateMany(
      {
        completed: false,
      },
      {
        $set: {
          completed: true,
        },
      },
    )
      .then((result) => console.log(result))
      .catch((updateError) => console.log({ updateError }));
  });
