import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid"
import connectToMongo from "../../../../../lib/connectToDatabase";
import Url from "../../../../../model/urlschema";



export async function POST(req: Request, res: Response) {
     await connectToMongo();
     
     try {
          const { url, userId } = await req.json();
          console.log(url,userId)
          if (!url){
               return NextResponse.json({
                    msg: "Url Is required ",
               })
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
          
     
     
     
     
