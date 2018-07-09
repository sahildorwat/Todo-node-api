const {MongoClient, ObjectId}  = require('mongodb');

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect mongo db server.')
    }
    console.log('connected to mongodb server.');

    // db.collection('Todos').deleteMany({completed: true}).then((result) => {
    //     console.log(result)
    // })
    
    // db.collection('Todos').deleteOne({completed: false}).then((result) => {
    //     console.log(result)
    // })
    
    // db.collection('Todos').findOneAndDelete({completed: false}).then((result) => {
    //     console.log(result)
    // })
    // db.collection('Users').deleteMany({name: 'sahil'}).then((result) => {
    //     console.log(result)
    // })
    
    // db.collection('Users').deleteOne({age: 27}).then((result) => {
    //     console.log(result)
    // })
    
    db.collection('Users').findOneAndDelete({age: 26}).then((result) => {
        console.log(result)
    })
    
    
    // db.close();

})