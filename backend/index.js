require('./pkg/db');
const express = require('express');
const bodyParser = require('body-parser');
// const jwt = require('express-jwt');
var { expressjwt: jwt } = require("express-jwt");
const cors = require('cors');
const users = require('./handlers/users/users');
const auth = require('./handlers/auth/auth');
const tasks = require('./handlers/tasks/tasks');
const inprogress = require('./handlers/inprogress/inprogress');
const done = require('./handlers/done/done');
require("dotenv").config();

const api = express();
api.use(bodyParser.json());

api.use(cors({
    origin: "http://localhost:4200"
}));

api.use(jwt({
    secret: process.env.JWT_SECRET,
    algorithms: ['HS256']
}).unless({
    path: [
        '/api/v1/auth/create-account',
        '/api/v1/auth/login'
    ]
}));
api.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
        res.status(401).send('Bad Token');
    }
});

api.post('/api/v1/auth/create-account', auth.createAccount);
api.post('/api/v1/auth/login', auth.login);
api.get('/api/v1/auth/refresh-token', auth.refreshToken);

api.get('/api/v1/users', users.getAll);
api.get('/api/v1/users/:id', users.getOne);
api.post('/api/v1/users', users.create);
api.put('/api/v1/users/current-user', users.updateCurrentUser);
api.put('/api/v1/users/:id', users.update);
api.patch('/api/v1/users/:id', users.updatePartial);
api.delete('/api/v1/users/:id', users.remove);

api.get('/api/v1/tasks', tasks.getAll);
api.get('/api/v1/tasks/:id', tasks.getOne);
api.post('/api/v1/tasks', tasks.create);
api.put('/api/v1/tasks/current-task', tasks.updateCurrentTask);
api.put('/api/v1/tasks/:id', tasks.update);
api.patch('/api/v1/tasks/:id', tasks.updatePartial);
api.delete('/api/v1/tasks/:id', tasks.remove);

api.get('/api/v1/inprogress', inprogress.getAll);
api.put('/api/v1/inprogress/update-inprogress', inprogress.updateInprogress);

api.get('/api/v1/done', done.getAll);
api.put('/api/v1/done/update-done', done.updateDone);




api.listen(3000, err => {
    if (err) {
        return console.log('Could not start API', err);
    }
    console.log('Server successfully start on port 3000');
})