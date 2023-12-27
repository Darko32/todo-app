const userData = require('./../../pkg/users');
const { user, createAccountSchema, loginSchema } = require('../.././pkg/users/validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
require("dotenv").config();
// const cfg = require('../../../pkg/config');
// const mailer = require('../../../pkg/mailer');

const createAccount = async (req, res) => {
    try {
        await user(req.body, createAccountSchema);

        if(req.body.password !== req.body.password2) {
            return res.status(400).send('Bad Request. Passwords Missmatch');    
        }

        let u = await userData.getOneByEmail(req.body.email);
        if(u) {
            return res.status(400).send('Bad Request. User Exists');  
        }

        req.body.password = bcrypt.hashSync(req.body.password);

        let data = await userData.create(req.body);

        // let out = await mailer.send(
        //     req.body.email,
        //     'Welcome',
        //     {
        //         first_name: req.body.first_name,
        //         last_name: req.body.last_name,
        //     },
        //     'register'
        // );

        return res.status(201).send('Created');
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal Server Error');
    }
};

const login = async (req, res) => {
    try {
        await user(req.body, loginSchema);

        let u = await userData.getOneByEmail(req.body.email);
        if (!u) {
            // return res.status(400).send('Bad Request');
            return res.status(400).send({ message: 'Bad Request', serverError: 'User not found' });
            // return res.status(400).json({ message: 'Bad Request', serverError: 'User not found' });
        }

        if(!bcrypt.compareSync(req.body.password, u.password)){
            // return res.status(401).send('Unauthorized');
            return res.status(401).json({ message: 'Unauthorized', serverError: 'Incorrect password' });
        }

        let payload = {
            uid: u._id,
            email: u.email,
            exp: (new Date().getTime() + (365 * 24 * 60 * 60 * 1000)) / 1000
        };

        let token = jwt.sign(payload, process.env.JWT_SECRET);

        res.status(200).send({ user:u, jwt: token });

    } catch (err) {
        console.log(err);
        // res.status(500).send('Internal Server Error');
        res.status(500).json({ message: 'Internal Server Error', serverError: 'Unexpected server error' });
    }
};

const refreshToken = (req, res) => {
    console.log(req.auth);
    let payload = {
        uid: req.auth.uid,
        email: req.auth.email,
        exp: (new Date().getTime() + (365 * 24 * 60 * 60 * 1000)) / 1000
    };

    let token = jwt.sign(payload, 'shhhhh');
    res.status(200).send({ jwt: token });
};

module.exports = {
    createAccount,
    login,
    refreshToken,
};