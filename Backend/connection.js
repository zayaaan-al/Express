import mongoose from "mongoose";

export default async function connection(){
    const db = await mongoose.connect('mongodb://127.0.0.1:27017/backend');
    console.log("Database connected");
    return db;
    
}