const express = require('express');
const {connectionURL,db} =require('../configurations/configuration');
const signup = require('../routes/signup');
const login = require('../routes/login');
const authUser=require('../routes/auth');
const logoutUser=require('../routes/logout');
const usersData=require('../routes/usersData');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const cookieParser = require('cookie-parser');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
// const redis = require("redis");
// const redisClient = redis.createClient();
// const RedisStore = require('connect-redis')(session);
const http=require('http');
const socketio=require('socket.io');
require('../db/mongoose');

const app = express();

const server=http.createServer(app);

const io=socketio(server);

// redisClient.on('error', (err) => {
//     console.log('Redis error: ', err);
// });

app.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});

app.use(cookieParser());
app.use(session({
    secret:'secretissecret',
    resave:false,
    saveUninitialized:false,
    // store:new RedisStore({client :redisClient}),
    store:new MongoStore({url:'mongodb+srv://akhie:sspmb143@cluster0-zn2vn.mongodb.net/Chat' }),
    cookie: { httpOnly: false, maxAge: 86400000 } // configuration for sessions to expire
}))
//initializing passport
app.use(passport.initialize());
app.use(passport.session());
app.use(express.json());
app.use(signup());
app.use(login(passport,LocalStrategy))
app.use(authUser());
app.use(logoutUser());
app.use(usersData());


io.on('connection',(client)=>{
    client.on('sendMessage',(messageObject)=>{
      io.sockets.in(messageObject["toId"]).emit('new_msg',messageObject);

    })

    client.on('LASTMESSAGE',(sentUserData)=>{
        io.sockets.in(sentUserData["sentId"]).emit('LASTMESSAGERECEIVED',sentUserData);
    })

    client.on('blueTickStatus',(userId,sentId)=>{
        io.sockets.in(userId).emit('changeBlueTickStatus',userId,sentId);
    })

    client.on('sendTypeStatus',(userData)=>{
        io.sockets.in(userData["toId"]).emit('typeStatus',userData);
    })

    client.on('join',  (data)=> {
         client.join(data.userid); // We are using room of socket io
      });
})

server.listen(3001, () => {
    console.log("server listening in port 3000")
})
