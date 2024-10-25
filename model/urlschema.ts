import mongoose from "mongoose"
import { redirect } from "next/dist/server/api-utils"

const urlSchema = new mongoose.Schema({
     shortUrl : {
          type: String,
          required: true
     },
     mainUrl: {
          type: String,
          required : true
     },
     userId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User",
          require: true
     },
     createAt: {
          type: Date,
          default : Date.now
     }
})

const Url = mongoose.model("Url", urlSchema)
export default Url;