var mongoose = require('mongoose');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/Todos');


const Todo = mongoose.model('Todo',{
    text: { type: String },
    completed: { type: Boolean },
    completedAt: { type: Number } })

// const newTodo = new Todo({ text: 'coock dinner' });
const newTodo = new Todo({  text: 'tsting 123',
                            completed: true, 
                            completedAt: 8888888 })

newTodo.save().then( docs => console.log(docs), err =>  console.log(err) )