const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId} = require('mongodb');

const {mongoose} = require('./db/mongoose');
const {User} = require('./models/User');
var {Todo} = require('./models/Todo');

const port = process.env.PORT || 3000;
const app = express();
app.listen(3000,()=> {console.log(`listening on port ${port}` ) })

app.use(bodyParser.json());

// app.post('/todos', (req, res) => {
//     var todo = new Todo({ 
//         text: req.body.text
//     });
//     todo.save().then( doc => res.send(doc),
//         (e) => res.status(400).send(e));
// })

app.post('/todos', (req, res) => {
    var todo = new Todo({
      text: req.body.text
    });
  
    todo.save().then((doc) => {
      res.send(doc);
    }, (e) => {
      res.status(400).send(e);
    });
  });

app.get('/todos', (req, res) => {
    Todo.find().then( todos => res.send(todos),
                        (e) => res.status(400).send(e)
                    )
})


app.delete('/todos/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(404).send()
    }
    Todo.findByIdAndRemove(req.params.id)
        .then( (response) => {
            if(!response) {
                return res.status(404).send()
            }
            res.send({response})
        }).catch(e => res.status(400).send())
});


app.get('/todos/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)) {
        return res.status(404).send({})
    }else {
        Todo.findById(req.params.id).then( (response)=> {
            if(!response){
                return res.status(404).send()
            }
            res.send({response})
        }).catch((e) => res.status(400).send({errorMessage: 'Unable to connect to dataBase'}))
    }
})

app.get('/',(req, res) => {
    res.send( '<h1>Welcome </h1>')
});

module.exports = { app }