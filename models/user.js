import mongoose from "mongoose";

// import passportLocalMongoose from "passport-local-mongoose";

// You're free to define your User how you like. 
// Passport-Local Mongoose will add a username, hash and salt field to store the username,the hashed password and the salt value.


import passportLocalMongoosePackage from "passport-local-mongoose";

const passportLocalMongoose =
    passportLocalMongoosePackage.default || passportLocalMongoosePackage;
    
const userSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
    },    
})


userSchema.plugin(passportLocalMongoose);

const User = mongoose.model("User",userSchema);

export  {User} ;

