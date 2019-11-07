const { MongoClient, ObjectID } = require('mongodb');

const connectionUrl = 'mongodb://127.0.0.1:27017';
const databaseName = 'task-manager';

const id = new ObjectID();
console.log(id.id.length);
console.log(id.toHexString().length);
console.log(id.getTimestamp());

MongoClient.connect(connectionUrl,
  { useNewUrlParser: true, useUnifiedTopology: true },
  (error, client) => {
    if (error) {
      return console.log({ error });
    }

    const db = client.db(databaseName);

    // db.collection('users').insertOne({
    //   name: 'Dwight',
    //   age: 33,
    // }, (insertError, result) => {
    //   if (insertError) {
    //     return console.log({ insertError });
    //   }

    //   console.log(result.ops);
    // });

    // db.collection('users').insertMany([
    //   {
    //     name: 'Lebron',
    //     age: 35,
    //   },
    //   {
    //     name: 'Anthony',
    //     age: 26,
    //   },
    // ], (insertError, result) => {
    //   if (insertError) {
    //     return console.log({ insertError });
    //   }

    //   console.log(result.ops);
    // });

    // db.collection('tasks').insertMany([
    //   {
    //     description: 'Learn NodeJS',
    //     completed: false,
    //   },
    //   {
    //     description: 'Learn React hooks',
    //     completed: true,
    //   },
    //   {
    //     description: 'Learn Data Structures and Algorithms',
    //     completed: false,
    //   },
    // ], (insertError, result) => {
    //   if (insertError) {
    //     return console.log({ insertError });
    //   }
    //   console.log(result.ops);
    // });
  });
