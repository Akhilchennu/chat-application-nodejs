const express = require('express');
const userModel = require('../models/users');
const router = new express.Router();

const login = (passport, LocalStrategy) => {
    passport.serializeUser(function (userid, done) {
        done(null, userid);
    });

    passport.deserializeUser(function (userid, done) {
        done(null, userid);
    });
    

    passport.use(new LocalStrategy(async (username, password, done) => {
        try {
            const user = await userModel.findByCredentials(username,password);
            // res.status(200).send({ success: true, userinfo: { userData, token } })
            return done(null, {
                userData: user
            })
        } catch (error) {
            return done(null, false);
        }
    }))

    router.post('/login', passport.authenticate('local', {
        successRedirect: '/success',
        failureRedirect: '/failure'
    }));

    router.get('/success',async (req, res) => {
        res.status(200).send({ success: true,...req.user });
    
    })

    router.get('/failure', (req, res) => {
        res.status(400).send({ success: false, message: 'Invalid username or password.' });
    })

    return router;
}


module.exports = login;

