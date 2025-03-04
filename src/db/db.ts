
import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config()

const port = 3000;

const uri = process.env.MONGO_URI // || 'mongodb://localhost:27017'
if (!uri) {
    throw new Error(' ! uri error ! ')
}

export const runDb = async () => {
    try {
        await mongoose.connect(uri)
        console.log('Client connected to Db')
        console.log(`listen on port ${port}`)
    } catch (err) {
        console.log(`${err}`)
        await mongoose.disconnect()
    }
}