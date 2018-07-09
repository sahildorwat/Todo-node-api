const express = require('express');
const bodyParser = require('body-parser');

const {mongoose} = require('./db/mongoose');
const {User} = require('./models/User');
var {Todo} = require('./models/Todo');

const app = express();
app.listen(3000,()=> {console.log(`listening on port 3000` ) })

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

app.get('/',(req, res) => {
    res.send( '<h1>Welcome </h1>')
});

module.exports = { app }