import mongoose from "mongoose";
const userSchema =new mongoose.Schema({
    firstName:{
        type:String,
        required:true,
        
    },
    lastName:{
        type:String,
        required:true,
    },

    email:{
        type:String,
        required:true,
        union:true,
    },
    password: {
       type:String,
        required:true,
      },
      creatorId: {
        type: mongoose.Types.ObjectId,
        ref: "User",
      },
})

    export const Users = mongoose.model("users", userSchema);