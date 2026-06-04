import express from "express";
import ejs from "ejs";
import { User } from "../models/user.js";
import wrapAsync from '../utils/wrapAsync.js';
import passport from "passport";

const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("users/signup.ejs")
})

router.post("/signup", wrapAsync(async (req, res, next) => {
  try {

    let { username, email, password } = req.body;
    const newUser = new User({ email, username });
    const registeredUser = await User.register(newUser, password);
    console.log(registeredUser);

    req.login(registeredUser,(err)=>{
      if(err){
        return next(err);
      }
      
      req.flash("success", "Signup Successfull");
      res.redirect("/listings");
    })

  
  } catch (error) {
    req.flash("error", `${error.message}`);
    res.redirect("/signup");
  }
}))

router.get("/login",(req,res)=>{
  res.render("users/login.ejs");
})

router.post(
  "/login",
  passport.authenticate("local",{
    failureRedirect:"/login",
    failureFlash:true,
  }), 
  async (req,res)=>{
    req.flash("success","Logged in successfully");
    res.redirect("/listings");
  }
)

router.get("/logout",(req,res,next)=>{
  req.logout((err)=>{
    if(err){
      next(err);
    }
    req.flash("success","Logged out successfully");
    res.redirect("/listings");
  })
})


export { router as userRouter };