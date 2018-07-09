const MongoClient = require('mongodb').MongoClient;

MongoClient.connect('mongodb://localhost:27017/TodoApp', (err, db) => {
    if(err) {
        return console.log('Unable to connect mongo db server.')
    }
    console.log('connected to mongodb server.');

    // db.collection('Todos')
    //     .insertOne({ text: 'something to do',
    //                 completed: false }, 
    //                 (err, res)=> {  
    //                    if(err) {
    //                        console.log(err);
    //                    } else { 
    //                        console.log(JSON.stringify(res.ops,undefined, 2))  
    //                     }
    //                 })


    db.collection('Users').insertOne({name: 'sahil', age: 25}, (err,res) => {
        if(err) console.log(err)
        else console.log(JSON.stringify(res))
    })
    db.close();

})