const jwt = require('jsonwebtoken');


const token = jwt.sign('sahil123','secret123');
console.log(token);

const data = jwt.verify(token, 'secret123');
console.log(data);