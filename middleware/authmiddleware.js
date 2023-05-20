const jwt = require('jsonwebtoken');


const authenticated = (req, res, next) => {
    const token = req.cookies.jwt;

    // see if token exists
    if(token){
        jwt.verify(token, 'net ninja sign', (error,decodedToken) =>{
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

module.exports = { authenticated }; 