const mongoose  = require("mongoose")

module.exports = ()=>{
   
    mongoose.connect(process.env.MONGODB_URL).then((res)=>{
        console.log("Connected to the DB")
    }).catch((err)=>{
        console.log("Error while connecting to the DB", err.message)
    }).finally(()=>{
        console.log("DB Process completed.")
    }) 
}