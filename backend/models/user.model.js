import mongoose from "mongoose";


const user_schema=new mongoose.Schema({
    name:{type:String,
     required:[true,"Username is required"]},
    user:{type:String,
    required:[true,"Username is required"],
    unique:[true,"username already exist"]
    },
    password:{type:String,
        required:[true,"Password is required"]
    }
});



export default mongoose.model.users||mongoose.model("user",user_schema);