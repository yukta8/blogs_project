
const express=require('express');
const mongoose = require('mongoose');
const authRoutes= require('./routes/authRoutes')
const cookieParser = require('cookie-parser')
const {authenticated} = require('./middleware/authmiddleware')
const app= express();
const User = require('./models/User')
app.set('view engine','ejs');

app.use(express.static('public'));
app.use(express.json());
app.use(authRoutes);
app.use(cookieParser());
const dotenv = require("dotenv");
dotenv.config();

 
 
app.get('/', (req, res) =>  
{res.render('home')} 
);
app.get('/blogs', authenticated,(req, res) => 
res.render('blogs')
);



const DB = process.env.DATABASE;

mongoose.connect(DB)
.then((result) => {
    app.listen(3000)
    console.log("Database connection successful!")
})
.catch((error) => { 
     console.log(error.message)
}) 
 
        