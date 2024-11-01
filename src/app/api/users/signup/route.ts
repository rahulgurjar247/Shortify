import { NextResponse } from "next/server";  
import User from "../../../../../model/userSchema";
import bcrypt from "bcryptjs"
import { NextApiResponse } from "next";
import connectToMongo from "../../../../../lib/connectToDatabase";


interface ApiResponse{
     message: string;
     success: string;
}

 export const POST = async (req: Request, res: NextApiResponse<ApiResponse>) => {
     await connectToMongo();
     const { email, password } = await req.json();
     try {
          const Exitinguser = await User.findOne({ email })
          if (Exitinguser) {
               return NextResponse.json({
                    message: "User Already Exit ",
                    success : false
               }, {status:400})
          }
          
          const hashedPassword = await bcrypt.hash(password, 10);
          await User.create({
               username:"bhvbajdbhvab",
               email,
               password: hashedPassword
          }) 
          return NextResponse.json({
               message: "account create successfully",
               success:true
          },{status:200})
          
     }
     catch (err) {
          console.log("error:", err);
          return NextResponse.json({
               message: "Something is wrong on server side",
               success:false
          },{status:500})          
     }     
} 
