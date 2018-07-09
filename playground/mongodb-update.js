const {MongoClient, ObjectId}  = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect mongo db server.')
    }
    console.log('connected to mongodb server.');

    
    // db.collection('Todos').findOneAndUpdate({completed: false}, {$set: {text: 'sahil1 updated'}}, false).then((result) => {
    //     console.log(result)
    // })

    db.collection('Users').findOneAndUpdate({age: 27}, {$inc: {age: 1}}, true).then((result) => {
        console.log(result)
    })
    
    
    // db.close();

})