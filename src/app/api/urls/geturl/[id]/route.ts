import { NextApiRequest, NextApiResponse } from "next";
import { useParams } from "next/navigation";
import { NextResponse } from "next/server";
import Url from "../../../../../../model/urlschema";


export async function GET(req: NextApiRequest, { params } : { params: { id:string}}, res: NextApiResponse) {
     const {id} = params;
     console.log(id)
     const UrlData = await Url.findOne({ shortUrl: id })
     const { originalUrl } = UrlData;
     console.log("requet on get route");
     if (origina;o) {
          return NextResponse.json({
               originalUrl,
          },{status:200})
          
     } else {
          return NextResponse.json({
               msg: "Url not found"
          }, {status:404})
     }

}