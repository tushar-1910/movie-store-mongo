const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const movieRouter = require('../routes');

const app = express();
app.use(cors());
app.use(express.json());

app.use((req,res,next)=>{
    console.log(`${req.method} ${req.url}`);
    next();
})

app.use(movieRouter)

mongoose.connect(`mongodb://localhost:27017/database1`).then(()=>{
    console.log('connected to database');
    }).then(()=>{
        app.listen(8080, ()=>{
            console.log('listening on port 8080');
        })});