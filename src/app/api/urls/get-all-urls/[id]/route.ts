import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid"
import connectToMongo from "../../../../../../lib/connectToDatabase";
import User from "../../../../../../model/userSchema";
import Url from "../../../../../../model/urlschema";


export async function GET(req: Request, res: Response) {
     await connectToMongo();
     console.log("request on get route")
     
     try {
        
               
     } catch (err) {
          console.log("error :",err)
               return NextResponse.json({
                    msg: "something is wrong on server side",
                    success: false,                    
               },{status:400})
                               
     }
} 
          
     
     
     
     
