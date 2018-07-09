const express = require('express');
const request = require('supertest');
const expect = require('expect');

const {app} = require('../server/server');
const {Todo} = require('../server/models/Todo');

const insertArray = [ { text: 'test100'}, {text: 'test200'}]

// beforeEach((done) => {
//     Todo.remove({}).then(() => {
//         return Todo.insertMany(insertArray).then(() => done());
//     });
// });

// describe('POST /todos', ()=> {
//     it('should create a new todo', (done)=> {
//         var text = 'Test todo next'

//         request(app)
//             .post('/todos')
//             .send({text})
//             .expect(200)
//             .expect((res) => {
//                 expect(res.body.text).toBe(text)
//             })
//             .end((err, res) => {
//                 if(err) {
//                     return done(err)
//                 }
//                 Todo.find({text}).then( (todos) => {
//                     expect(todos.length).toBe(1);
//                     expect(todos[0].text).toBe(text);
//                     done();
//                 }).catch((e) => done(e));
//             });
//     });

//     it('should not create object in database', (done) => {
//         request(app)
//             .post('/todos')
//             .send({text: ''})
//             .expect(400)
//             .end( (err, res) => {
//                 if(err) {
//                     return done(err);
//                 } 
//                 Todo.find().then((todos) => {
//                     expect(todos.length).toBe(2);
//                     done();
//                 }).catch((e) => done(e));
//             });
//     })
// });

// describe('get /todos', () => {
//     it('should return all todos', (done) => {
//         request(app)
//             .get('/todos')
//             .expect(200)
//             .expect((res)=> {
//                 // console.log(res);
//                 expect(res.body.length).toBe(2);
//             })
//             .end(done)
//     })
// })

describe('get /todos/:id', () => {
    it('should respond with object', (done)=> {
        request(app)
            .get('/todos/5b43c1d441be15f448bb10e6')
            .expect(200)
            .expect( (res) => expect(res.body).toInclude({response: {text: 'test200'}}))
            .end(done);
    });

    it('should return 404 ', (done) => {
        request(app)
            .get('/todos/5b43c1d441be15f448cc10e5')
            .expect(404)
            .end(done)
    });

    it('should return 404 for invalid id ', (done) => {
        request(app)
            .get('/todos/5b43c1d441be15fa448cc10e5')
            .expect(404)
            .end(done)
    })
});