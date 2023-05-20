const mongoose= require('mongoose');
const { isEmail } = require('validator')
const bcrypt=require('bcrypt')
const alert = require('alert')

const userSchema= new mongoose.Schema({
    email:{
        type:'String',
        required:[true, 'Please enter an email!'],
        unique : true,
        lowercase: true,
        validate:[isEmail, 'Please enter a valid email']
    },
    password:{
        type: 'String', 
        required : [true, 'Please enter a password!'],
        minlength: [8, 'Password must be of atleast 8 characters'],
    },
    // cpassword:{
	// 	type: String,
	// 	required:true
	// },
})

// fire a function after doc saved to db
userSchema.post('save',function(doc,next) {
    console.log("New user was created and saved!",doc)
    next();
})

// fire a function before doc saved to db
userSchema.pre('save',async function(next){
    const salt=await bcrypt.genSalt();
    this.password = await bcrypt.hash(this.password,salt);
    
    // console.log('New user about to be created and saved!',this)   //this refers to the local instance of the user before we saved it to the database
    next();
})

userSchema.statics.login = async function(email , password){
    const user = await this.findOne({email});

    if (user){
       const auth = await bcrypt.compare(password,user.password);   //unhashed , hashed
        if (auth){
            return user;
        }
        else{
            throw Error('Incorrect password!');
        }
    }
    else{
        throw Error('Incorrect email!');
    }
}
module.exports = mongoose.model('User',userSchema) 