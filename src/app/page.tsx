"use client";
import Image from "next/image";
import Hello from "./hello";
import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import axios from "axios";

export default function Home() {
  const { userId, isSignedIn } = useAuth();
  const [shortUrl, setShortUrl] = useState(null);
  const [url, setUrl] = useState<string>("");

  console.log(userId, isSignedIn);
  const handleUrlInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setUrl(e.target.value);
    console.log(e.target.value);
  };

  const handleInputButton = async (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/urls/createurl",
        {
          url,
          userId,
        }
      );
      console.log(response.data);
      setShortUrl(response.data);
    } catch (err) {
      console.error("error in api call ", err);
    }
  };

  return (
    <div className="bg-slate-100">
      <div className="w-3/5 m-auto min-h-screen bg-slate-100 flex flex-col md:w-4/5 max-[500px]:w-full">
        <div
          className="w-3/5 pt-40 mx-auto 
        "
        >
          <div className="flex flex-col gap-3 text-center">
            <h1 className="font-semibold">Url shortner</h1>
            <input
              type="text"
              placeholder="Enter Url"
              className="px-2 py-1 w-full rounded-md"
              onChange={handleUrlInput}
            />
            <button
              className="w-full bg-lime-400 rounded-md"
              onClick={handleInputButton}
            >
              Create
            </button>

            <div className="bg-indigo-200 flex px-4 py-1 justify-between max-md:flex-col">
              {shortUrl && (
                <>
                  {" "}
                  <div>
                    <a href={"localhost:3000/" + shortUrl?.shorturl}>
                      {"localhost:3000/" + shortUrl?.shorturl}
                    </a>{" "}
                  </div>
                  <div className="hover:cursor-pointer">Copy</div>
                </>
              )}
            </div>
          </div>
        </div>
        <div className="w-3/5 mx-auto mt-5 max-md:w-4/5 max-[500px]:w-full">
          <div className="">
            <h1> Your short links </h1>
            <div className="flex justify-between">
              <div>Main Link</div>
              <div>Short Link </div>
              <div>Copy icon</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
