const mongoose = require("mongoose")
const mongoURI = 'mongodb://127.0.0.1:27017/project1'


const connectToMongo = () => {
    mongoose.connect(mongoURI,{useUnifiedTopology:true, useNewUrlParser:true}).then(()=>{
            console.log("Connection Successfull")
        }).catch(()=>{
            console.log("No Connection");
        })  
}


// console.log("this is database file")

module.exports = connectToMongo;

