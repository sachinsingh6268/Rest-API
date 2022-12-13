// MongoDB is a NoSQL database used to store large amounts of data without any traditional relational database table. Instead of rows & columns, MongoDB used collections & documents to store data. A collections consist of a set of documents & a document consists of key-value pairs which are the basic unit of data in MongoDB.

// To connect a Node.js application to MongoDB, we have to use a library called Mongoose.  

// mongoose.connect("mongodb://localhost:27017/collectionName", {
//    useNewUrlParser: true,
//    useUnifiedTopology: true
// });

require('dotenv').config(); // here we are importing all the environment variables so that we can use them here.However, the config method takes a .env file path as an argument, it parses it and sets environment vars defined in that file in process.env.


const express = require('express');
const app = express();
const mongoose = require('mongoose'); // mongoose is a package that is used to connect Node.js application with mongoDB databse


mongoose.connect(process.env.DATABASE_URL,{ // TO USE environment variables,we have to import them first
    useNewUrlParser: true
});

const db = mongoose.connection;
db.on('error',(error)=>console.error(error));
db.once('open',()=>console.log("application connected to Database"));


// app.use(); // it will allow us to use any middleware we want which is essentially code that runs when the server gets a request but before it gets passed to our routes

app.use(express.json()); // it essentially just let's our server accept JSON as a body inside of a post or a get element or whatever

const subscribersRouter = require('./routes/subscribers');
app.use('/subscribers',subscribersRouter);




app.listen(3000,()=>console.log("Server Started"));