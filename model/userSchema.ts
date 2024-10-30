import mongoose, { mongo } from "mongoose";  

const userSchema = new mongoose.Schema({
     email: {
          type: String,
          require : true,
          unique:true
     },
     password: {
          type: String,
          require : true
     },
     createAt: {
          type: Date,
          default : Date.now,
          
     },
})

const User = mongoose.models.User || mongoose.model("User", userSchema);

export default  User 