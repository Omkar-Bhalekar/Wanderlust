import express from 'express';
import ejs from "ejs";
import path from "path";
import { fileURLToPath } from 'url';
import mongoose from 'mongoose';
import methodOverride from "method-override";
import ejsMate from "ejs-mate";
import ExpressError from './utils/ExpressError.js';
import session from 'express-session';
import cookieParser from 'cookie-parser';
import flash from "connect-flash";
import passport from 'passport';
import LocalStrategy from 'passport-local';
import { User } from './models/user.js';

import { listingRouter } from './routes/listings.js';
import { reviewRouter } from './routes/reviews.js';
import { userRouter } from './routes/users.js';

console.log(mongoose.modelNames()); // shows all registered models

const port = 8080;
const app = express();

main()
.then(()=>console.log("Connection Successfull"))
.catch((err)=>console.log(err));

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/app_db")
}

app.use(methodOverride("_method"));

// Layouts
app.engine("ejs", ejsMate);

app.use(express.urlencoded({extended:true}));
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"))

// static files setup
app.use(express.static(path.join(__dirname,"public")));

app.listen(port,()=>{
    console.log("Listening to port "+ port);
})

app.get("/", async (req,res,next)=>{
    try {
        res.redirect("/listings");
    } catch (error) {
        next(error);
    }   
})

app.use(session({
    secret:"MysecretCode",
    resave:false,
    saveUninitialized:true,
    cookie:{
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly:true,
    }
}));

app.use(flash());


app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// res.locals in Express.js is an object used to store data that is
// available only for the current request-response cycle, 
// especially useful for passing variables to your views (EJS, Pug, Handlebars, etc.).

app.use((req,res,next)=>{
    res.locals.successMsg = req.flash("success");
    res.locals.errorMsg = req.flash("error");
    next();
})


// We use req.user to toggle login and logout option
// req.user stores the current user which is logged in and 
// if no user is logged in then it stores undefined 

// but we can not use req.user directly inside ejs file 
// so we use res.locals

app.use((req,res,next)=>{
    res.locals.currUser = req.user;
    next();
})

// app.get("/demouser", async (req, res) => {
//     let fakeUser = new User({
//         email: "student@gmail.com",
//         username: "delta-student",
//     });

//     let registeredUser = await User.register(fakeUser, "helloworld");
//     res.send(registeredUser);
// })

app.use("/listings",listingRouter);
app.use("/listings/:id",reviewRouter);
app.use("/",userRouter)

// Validation Error Handler
const validation = (req,res,err) => {
    err.message = `Validation Error: ${err.message}`;
    return err;
}

app.use((err,req,res,next)=>{
    if(err.name === "ValidationError"){
        err = validation(req,res,err);
    }
    next(err);
})

// ExpressError Class

app.all("{*splat}",(req,res,next)=>{
    next(new ExpressError(400,"Page Not Found"));
})

// Error Handler
app.use((err,req,res,next)=>{
    let {status=500 , message="Some Error Occured"} = err;
    res.render("error.ejs" ,{message,status})
    // res.status(status).send(message);
})


