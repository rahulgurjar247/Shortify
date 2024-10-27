import { NextResponse } from "next/server";  
import User from "../../../../../model/userSchema";
import bcrypt from "bcryptjs"
import { NextApiRequest, NextApiResponse } from "next";
import connectToMongo from "../../../../../lib/connectToDatabase";



interface ApiResponse{
     message: string;
     success: string;

}

export const POST = async (req: Request, res: NextApiResponse<ApiResponse>) => {
     await connectToMongo();
     const { email, password } = await req.json();
     try {
          if (!email || !password) {
               return NextResponse.json({
                    message: "Email or password are required",
                    success :false 
               }) 
          }

          const user = await User.findOne({ email })
          if (!user || !(await bcrypt.compare(password, user.password))) {
               return NextResponse.json({
                    message: " Email or password is invalid",
                    success : false
               }, {status:400})
          }
          
          return NextResponse.json({
               message: "Login success",
               success:true
          },{status:200})
     } catch (err) {
          console.log("error:", err);
          return NextResponse.json({
               message: "Something is wrong on server side",
               success:false
          },{status:500})          
     }     
} 
