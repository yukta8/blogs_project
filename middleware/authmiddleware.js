const jwt = require('jsonwebtoken');
const dotenv = require("dotenv");
const User = require('../models/User')
dotenv.config();


const authenticated = (req, res, next) => {
    const token = req.cookies.jwt;

    // see if token exists
    if(token){
        jwt.verify(token, process.env.KEY , (error,decodedToken) =>{
            if(error){
                console.log(error.message);
                res.redirect('/login')
            }
            else{
                console.log(decodedToken);
                next();
            }
        } )
    }
    else{
        res.redirect('/login');
    }
}

const checkUser = (req,res,next) => {
    const token = req.cookies.jwt;

    if(token){
        jwt.verify(token, process.env.KEY , async (error,decodedToken) =>{
            if(error){
                console.log(error.message);
                res.locals.user = null;
                next();
            }
            else{
                console.log(decodedToken);
                const user = await User.findById(decodedToken.id);
                res.locals.user = user;
                next();
            }
        } )
    }
    else{
        res.locals.user=null;
        next();
    }
}



module.exports = { authenticated, checkUser }; 