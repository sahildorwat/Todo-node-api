const env = process.env.NODE_ENV || 'development'
console.log('end *****' , env);

if ( env === 'development' ){
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/Todos'
} else if (env === 'test' ) {
    process.env.PORT = 3000;
    process.env.MONGODB_URI = 'mongodb://localhost:27017/TodosTest'

}

const express = require('express');
const bodyParser = require('body-parser');
const { ObjectId} = require('mongodb');
const _= require('lodash');

const {mongoose} = require('./db/mongoose');
const {User} = require('./models/User');
var {Todo} = require('./models/Todo');
const {authenticate} = require('./middleware/authenticate')
const port = process.env.PORT;
const app = express();
app.listen(3000,()=> {console.log(`listening on port ${port}` ) })

app.use(bodyParser.json());


app.get('/users/me', authenticate,(req, res) => {
   res.send(req.user)
})

app.post('/users', (req, res) => {
    const body = _.pick(req.body, ['email', 'password']);
    const user = new User(body);
    // console.log(user)
    user.save().then( () => {
        return user.generateAuthToken()})
    .then( (token) => res.header('x-auth', token).send(user))
    .catch( e => {
        console.log(e);
        res.status(400).send(e)});
    
})
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

app.patch('/todos/:id', (req, res) => {
    if(!ObjectId.isValid(req.params.id)){
        return res.status(404).send();
    }
    const body = _.pick(req.body, ['text', 'completed']);

    if(_.isBoolean(body.completed) && body.completed) {
        body.completedAt = new Date().getTime();
    }else{
        body.completed = false;
        body.completedAt = null;
    }

    Todo.findByIdAndUpdate(req.params.id, {$set: body}, {new: true}).then((todo) => {
        if(!todo){
            return res.status(404).send();
        }
        res.send({todo})
    }).catch(e => res.status(400).send(e))
})

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