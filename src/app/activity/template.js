"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { verify, logout } from "./action";
import React, { useState, useEffect } from "react";

export default function Template({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  useEffect(() => {
    const fetchUserData = async () => {
        const data = await verify();
        setUser(data);
    }
    fetchUserData();
}, []);


    
  return (
    <div className="h-screen p-4  flex flex-col justify-center items-center">
      <header className="flex w-full mb-2">
        <Button onClick={() => router.push("/")}>
          <ArrowLeftIcon className="mr-2 h-4 w-4" />
          Back
        </Button>
        <h1>Activity #{usePathname().split("/").pop()}</h1>

        <p>hello</p>
        {/* {
            user ? <Button 
            onClick={() => router.push("/profile")}>
                <Image
                    src={user.user.user_metadata.avatar_url}
                    alt={user.user.user_metadata.full_name}
                    width={40}
                    height={40}
                    className="rounded-full"
                />

                <p>{user.user.user_metadata.full_name}</p>
            </Button> : null
        } */}
        {
            user ? <Button onClick={() => {logout()} }>
            Logout
            </Button> : <Button onClick={() => router.push("/login")}>
            Login
            </Button>
        }

      </header>

      <div
        className="border-2
            overflow-y-auto bg-gray-100 rounded-xl h-full w-full border-dashed "
      >
        {children}
      </div>
    </div>
  );
}
