import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid"
import connectToMongo from "../../../../../lib/connectToDatabase";
import User from "../../../../../model/userSchema";
import Url from "../../../../../model/urlschema";


export async function POST(req: Request, res: Response) {
     await connectToMongo();
     console.log("request on create route")
     
     try {
          const { url, userId } = await req.json();
          console.log(url,userId)
          if (!url || !userId) {
               return NextResponse.json({
                    msg: "you are not valid user or may be there is no url",
               })
          }   
          const user = await User.findById("671cf0e52147799cea228fb5");
          console.log(user)
          
          if (!user) {
               return NextResponse.json({ "error": "you are not a registerd user" }, {status:404});
          }

          const uniqueId = uuidv4().slice(0, 6);
          const newUrl = new Url({
               shortUrl: uniqueId,
               mainUrl: url,
               userId               
          })  

          await newUrl.save();
          return NextResponse.json({
               msg: "Short url create successfully ",
               shorturl: `${uniqueId}`,
          },{status: 201})
               
     } catch (err) {
          console.log("error :",err)
               return NextResponse.json({
                    msg: "something is wrong on server side",
                    success: false,                    
               },{status:400})
                               
          }
} 
          
     
     
     
     
