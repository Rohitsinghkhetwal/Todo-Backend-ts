import mongoose from "mongoose";
import "dotenv/config";

const connection = async() => {
    try{
        const result = await mongoose.connect(process.env.MONGO_URI);
        if(result){
            console.log("Connection established !");
        }else {
            console.log("Something went wwrong ===");
        }

    }catch(err){
        throw err;

    }
}

export default connection;