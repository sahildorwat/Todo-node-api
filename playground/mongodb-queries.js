const {mongoose} = require('../server/db/mongoose');
const {Todo} = require('../server/models/Todo');
const {User} = require('../server/models/User')

const id = '5b4393c40759fe1d26b42e43';

// Todo.find({_id: id }).then( (res) => {
//     console.log(res)
// }, (e) => console.log('Invalid id', e.name));

// Todo.findById(id).then( (res) => {
//     console.log(res)
// }, (e) => console.log(e));

// Todo.findOne({_id: id}).then( (res) => {
//     console.log(res)
// }, (e) => console.log(e));

User.find({_id: id }).then( (res) => {
    console.log(res)
}, (e) => console.log('Invalid id', e.name));

User.findById(id).then( (res) => {
    console.log(res)
}, (e) => console.log(e));

User.findOne({_id: id}).then( (res) => {
    console.log(res)
}, (e) => console.log(e));