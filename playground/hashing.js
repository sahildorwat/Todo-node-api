const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const password = 'password'
bcrypt.genSalt(10,(err, salt) => {
    bcrypt.hash(password, salt, (err, hash) => {
        console.log(hash);
    })
})

bcrypt.compare(password, '$2a$10$xllbZx151vDVC0qW6cjTkuKiYt2wZGfmVxfcdlBls0fUS1Kj1pJFK',
(err, suc) => {
    console.log(suc);
})

// const token = jwt.sign('sahil123','secret123');
// console.log(token);

// const data = jwt.verify(token, 'secret123');
// console.log(data);