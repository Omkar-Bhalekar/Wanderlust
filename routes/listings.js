import express from "express";
import ejs from "ejs";
import ExpressError from '../utils/ExpressError.js';
import wrapAsync from '../utils/wrapAsync.js';
import {Listing} from "../models/listing.js";
import { reviewSchema, listingSchema } from "../utils/schemaValidation.js"
import { isLoggedIn } from "../utils/isLoggedIn.js";

const router = express.Router();


// Joi validation Function 

const validateListing = (req,res,next)=>{
    let {error} = listingSchema.validate(req.body);

    if(error){
        throw new ExpressError(400,error);
    }
    else{
        next();
    }
}


router.get("/" , async (req,res,next)=>{
    try {
        const allListing = await Listing.find({});
        res.render("./listings/index.ejs",{allListing});

    } catch (error) {
        next(error);
    }
    
})

// router.post("/", async (req,res)=>{
//     try {
//         let { title, price, location, country, description } = req.body;

//         const newListing = await Listing.create({
//             title: title,
//             price: price,
//             description: description,
//             location: location,
//             country: country,
//         })

//         res.redirect("/listings")   

//     } catch (error) {
//        res.send(error);
//     }
    
// })


router.post("/", isLoggedIn, validateListing, wrapAsync( async (req, res,next) => {
    let { listing } = req.body;

    // if(!listing){
    //     throw new ExpressError(400,"Send valid Data");
    // }

    // if (!listing.title || !listing.price || !listing.location || !listing.country || !listing.description) {
    //   return res.status(400).send("All fields are required");
    // }

    // No need of above code as now we will ujse "Joi" for server side validation

    await Listing.create(listing);
    req.flash("success","New Listing Created Successfully");
    res.redirect("/listings");
}));


router.get("/new", isLoggedIn,(req,res)=>{
    res.render("./listings/new.ejs") 
})


// In Express Matches Routes Top → Down
// Express evaluates routes in the order they are defined, and stops at the first match
// so we ahve to keep new above id and expressmay consider new as id if it is kept below 


// router.get("/:id", async (req,res,next)=>{
//     try {
//         let { id }  =   req.params;
//         const listing = await Listing.findById(id);
//         res.render("./listings/show.ejs",{listing})
//     } catch (error) {
//         next(error);
//     } 
// })

router.get("/:id/update",isLoggedIn, async (req, res,next) => {
    try {
        let { id } = req.params;
        const listing = await Listing.findById(id);
        if(!listing){
            req.flash("error","No such listing found");
            res.redirect("/listings");
        }
        else{
            res.render("./listings/update.ejs", { listing })
        }
        
    } catch (error) {
        next(error);
    }
})

router.put("/:id/update", isLoggedIn, validateListing, async (req,res,next)=>{
    try {
        let { id } = req.params;
        let {listing} = req.body;
        await Listing.findByIdAndUpdate(id,listing);
        req.flash("success","Listing is updated successfully");
        res.redirect(`/listings/${id}`);
    } catch (error) {
        next(error);
    }
})

router.delete("/:id/delete",isLoggedIn, async (req, res,next) => {
    try {
        let { id } = req.params;
        const deletedListing = await Listing.findByIdAndDelete(id);
        console.log(deletedListing);
        req.flash("success","Listing deleted successfully");
        res.redirect("/listings");
    } catch (error) {
        next(error);
    }
});

// Show Route
router.get("/:id", async (req, res, next) => {
    try {
        let { id } = req.params;
        const listing = await Listing.findById(id).populate("reviews");
        if(!listing){
            req.flash("error","No such listing found");
            res.redirect("/listings");
        }
        else{
            res.render("./listings/show.ejs", { listing });
        }
        
    } catch (error) {
        next(error);
    }
});


export {router as listingRouter};
