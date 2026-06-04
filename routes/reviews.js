import express from "express";
import wrapAsync from '../utils/wrapAsync.js';
import ExpressError from '../utils/ExpressError.js';
import {Listing} from "../models/listing.js";
import { reviewSchema, listingSchema } from "../utils/schemaValidation.js"
import { Review } from '../models/reviews.js';
import {isLoggedIn} from "../utils/isLoggedIn.js";
const router = express.Router({mergeParams:true});


// mergeParams: true merges parameters from the parent route 
// into the child router so nested routes can access parent route parameters.

// Reviews

const validateReview = (req,res,next)=>{
    let {error} = reviewSchema.validate(req.body)
    
    if(error){
        throw new ExpressError(400,error);
    }
    else{
        next();
    }
} 

router.get("/review", isLoggedIn, async (req, res) => {
    
    let { id } = req.params;
    let listing = await Listing.findById(id);
    res.render("listings/reviewForm.ejs", { listing });
});

router.post("/review", isLoggedIn, validateReview, wrapAsync(async (req, res) => {
    let { id } = req.params;
    let { review } = req.body;
    const listing = await Listing.findById(id);
    const newReview = new Review(review);
    newReview.createdBy = req.user.username;
    await newReview.save();
    listing.reviews.push(newReview);
    await listing.save();
    req.flash("success","Review Added");
    res.redirect(`/listings/${id}`); 
}));


// Delete Review 

router.delete("/delete/:reviewId", async (req,res)=>{
    let { id, reviewId} = req.params;

    // const listing = await Listing.findById(id);
    // listing.reviews.pull(reviewId);
    // await listing.save();

    // The Above method also works but is more slower and two steps 


    // let result = await Listing.findByIdAndUpdate(id,
    //     {$pull:{reviews:{_id:reviewId}}}
    // )

    // let deletedReview = await Review.findByIdAndDelete(reviewId);

    // This above mthos is usefull when the review objects are directly embedded in 
    // listing and not as ObjectId

    // For ObjectId we use below syntax of $pull

    let result = await Listing.findByIdAndUpdate(id,
        {$pull: { reviews: reviewId }}
    )

    console.log(result);
    
    let deletedReview = await Review.findByIdAndDelete(reviewId);

    console.log(deletedReview);
    req.flash("success","Review Deleted");

    res.redirect(`/listings/${id}`)
    
});


export {router as reviewRouter};