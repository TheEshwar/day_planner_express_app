const mongoose = require("mongoose")
const connectDb = async ()=>{
    try{
        
        const connect = await mongoose.connect("mongodb+srv://deshmukheshwar:AWSEawse123@cluster0.zdbh1.mongodb.net/trading_db?retryWrites=true&w=majority")
        if(connect){
            console.log('MongoDB Database connection success...!');
        }
        else{
            console.log("MongoDB Database connection failed");
        }
    }
    catch(err){
        console.log(err);
    }
}

module.exports = connectDb