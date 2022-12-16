const express = require('express');
const server = express();
const cors = require('cors');
const User = require('./model/user');
const errorHandler = require('./middleware/error');

const connectDB = require('./db/connect');
require('dotenv').config();



const authRouter = require('./routes/authRoutes');
const privateRouter = require('./routes/private');




//Middleware

server.use(cors());
server.use(express.json());


server.use('/', authRouter);
server.use('/private', privateRouter);

//Error Handler needs to be last piece of middleware
server.use(errorHandler);



server.get('/', (req, res) => {
    res.send('hey');
})

const start = async() => {
    try {
        await connectDB(process.env.MONGO_URL);
        server.listen(8000, () => {
            console.log('Listening on 8000')
        })
    }
    catch(err) {
        console.log('there was an error');
    }
} 

start();
