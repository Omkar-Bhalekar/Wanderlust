import mongoose from "mongoose";


const listingSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    price:{
        type: Number,
        required: true,
        min: 1,
    },
    image:{
        type: String,
        default: "https://images.unsplash.com/photo-1592595896616-c37162298647?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        set: (v) => v ==="" ? "https://images.unsplash.com/photo-1592595896616-c37162298647?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" : v,
    },
    location:{
        type: String,
        required: true,
    },
    country:{
        type: String,
        required: true,
    },
    reviews:[
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Review",
        }
    ]
})

const Listing = mongoose.model("Listing",listingSchema);

export {Listing};
