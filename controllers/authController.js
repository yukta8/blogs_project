
const User = require("../models/User");
const jwt= require('jsonwebtoken')

// handle errors
const handleErrors = (error) => {
  console.log(error.message, error.code);
  let errors = { email: '', password: '' };

//   duplicate email error
  if (error.code === 11000) {
    errors.email = 'that email is already registered';
    return errors;
  }

  // validation errors
  if (error.message.includes('User validation failed')) {
    // console.log(err);
    Object.values(error.errors).forEach(({ properties }) => {
      // console.log(val);
      // console.log(properties);
      errors[properties.path] = properties.message;
    });
  }

  //incorrect email
  if (error.message === 'Incorrect email!'){
    errors.email='That email is not registered!'
  }

  //incorrect password
  if (error.message === 'Incorrect password!'){
    errors.password = 'Wrong password!'
  }

  return errors;
}

const createToken = function(id) {
  return jwt.sign({id}, 'net ninja sign', {  //options object)
  })
}

// controller actions
module.exports.signup_get = (req, res) => {
  res.render('signup');
}

module.exports.login_get = (req, res) => {
  res.render('login');
}

module.exports.signup_post = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    const token = createToken(user._id);
    res.cookie('jwt',token,{httpOnly : true})

    res.status(201).json({user:user._id});
}
  
  
  catch(error) {
    const errors = handleErrors(error);
    res.status(400).json({ errors });
  }
 
}

module.exports.login_post = async (req, res) => {
  const { email, password } = req.body;

  try{
    const user = await User.login(email,password);
    
    const token = createToken(user._id);
    res.cookie('jwt',token,{httpOnly : true})

    res.status(200).json({user: user._id})
  }
  catch (error){
    const errors = handleErrors(error);
    res.status(400).json({errors})
  }
}
