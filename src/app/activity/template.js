"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { useRouter, usePathname } from "next/navigation";
import Image from "next/image";
import { verify, logout } from "./action";
import React, { useState, useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import UserProfile from "@/components/UserProfile";
import { Toaster } from "@/components/ui/toaster";

export default function Template({ children }) {
  const router = useRouter();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const currentActivity = usePathname().split("/").pop();

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await verify(currentActivity);
      if (data && data.user) {
        setUser(data.user);
      }
      setLoading(false);
    };
    fetchUserData();
  }, [currentActivity]);

  return (
    <div className="h-screen flex flex-col">
      {/* Header */}
      <header className="flex w-full items-center justify-between p-6 bg-white shadow-md ">
        <div className="flex items-center space-x-4">
          {/* Back Button */}
          <Button variant="outline" onClick={() => router.push("/")}>
            <ArrowLeftIcon className="mr-2 h-4 w-4" />
            Back
          </Button>
          <h1 className="text-lg font-semibold text-gray-900">
            Activity #{usePathname().split("/").pop()}
          </h1>
        </div>

        {/* User Info */}
        <div className="flex items-center space-x-4">
          {loading && user ? (
            <Skeleton className="h-10 w-10 rounded-full" />
          ) : user ? (
            <UserProfile user={user} />
          ) : (
            <Button onClick={() => router.push("/login")}>Login</Button>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow w-full p-6 bg-gray-50 overflow-y-auto">
        {currentActivity === "2" && !user ? (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-semibold text-gray-900">
              Please login to view this activity
            </h1>
          </div>
        ) : currentActivity === "8" && !user ? (
          <div className="flex flex-col items-center justify-center h-full">
            <h1 className="text-2xl font-semibold text-gray-900">
              Please login to view this activity
            </h1>
          </div>
        ) : (
          children
        )}
      </main>
      <Toaster />
    </div>
  );
}
