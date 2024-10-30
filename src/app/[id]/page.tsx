"use client";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

const RedirectPage = ({ params }: { params: { id: string } }) => {
  const router = useRouter();
  const { id } = params;
  console.log(id);
  useEffect(() => {
    const redirectTOriginal = async () => {
      console.log("request url on get route");
      if (id) {
        try {
          const response = await axios.get(
            `http://localhost:3000/api/urls/geturl/${id}`
          );
          console.log(response);
          const originalUrl = response.data.originalUrl;

          window.location.href = originalUrl;
        } catch (err) {
          console.error("Error while fetching original Url");
          router.push("/404");
        }
      } else {
        alert("invalid page");
      }
    };
    redirectTOriginal();
  }, [id, router]);
  return <div></div>;
};

export default RedirectPage;
