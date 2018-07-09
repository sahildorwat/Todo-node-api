const {MongoClient, ObjectId}  = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect mongo db server.')
    }
    console.log('connected to mongodb server.');

    // db.collection('Todos').find({_id: new ObjectId('5b43003a81bce5396025bf7e')}).toArray()
    // .then((docs) => {
    //     console.log(JSON.stringify(docs, undefined, 2))
    // }, (err) => {
    //     console.log(err)
    // })
  
    // db.collection('Todos').find().count().then((count) => {
    //     console.log(`todos count is ${count}`)
    // }, (err) => {
    //     console.log(err)
    // })


    db.collection('Users').find({name: 'sahil'}).toArray().then(
        docs => console.log(JSON.stringify(docs, undefined, 2)),
        err => console.log(err) 
    )
    // db.close();

})