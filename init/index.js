import mongoose from "mongoose";
import initData from "./data.js";
import {Listing} from "../models/listing.js";

main().then(async ()=>{
    console.log("Connection Successfull");
    await initDB(); 
}).catch((err)=>{
    console.log(err);   
});

async function main(){
    await mongoose.connect("mongodb://127.0.0.1:27017/app_db")
}

const initDB = async () => {
    await Listing.deleteMany({});
    await Listing.insertMany(initData);
    console.log("Data was Initialized");   
}

