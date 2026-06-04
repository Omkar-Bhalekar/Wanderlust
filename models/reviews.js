import mongoose from "mongoose";

const reviewSchema = new mongoose.Schema({
    comment:String,

    rating:{
        type:Number,
        min:1,
        max:5,
    },
    
    createdAt:{
        type:Date,
        default: Date.now(),
    },

    createdBy:{
        type:String,
    }

})


const Review = mongoose.model("Review",reviewSchema);

export {Review};