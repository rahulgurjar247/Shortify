import mongoose from "mongoose"; 

async function connectToMongo() {
     await mongoose.connect(process.env.MongoUrl || "mongodb://27017/Shortner").then(
          () => {
               console.log("connect to mogodb database");
          }
     ).catch((err) => {
          console.log("mongoDb error : ",err)
     })
}
export default connectToMongo