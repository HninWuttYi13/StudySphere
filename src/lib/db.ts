import mongoose from "mongoose";
const connectDB = async()=>{
    try {
       const mongoURL = process.env.MONGO_URL;
       if(!mongoURL){
        throw new Error("mongoURL is not defined in environment variables");
       }
       await mongoose.connect(mongoURL);
       console.log("MongoDB is connected");
       console.log("MONGO_URL:", process.env.MONGO_URL);
    } catch (error) {
        console.log(error);
        process.exit(1)
    }
}
export default connectDB