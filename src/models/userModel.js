const mongoose= require("mongoose");
const userSchema= new mongoose.Schema({
    Name:{
        type: String,
        required: true
    },
    phoneNumber:{
        type: Number
    },
    Password:{
        type: String
    },
    // Profile:{
    //     type:String
    // },
},{timestamps:true});

module.exports= mongoose.model("User", userSchema);