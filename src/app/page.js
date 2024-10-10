"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Activities from "../data/activities.json";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import { verify, logout } from "./activity/action";
import { useEffect, useState } from "react";

import UserProfile from "@/components/UserProfile";

export default function Home() {
  const router = useRouter();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      const data = await verify("/");
      if (data && data.user) {
        setUser(data.user);
      }
    };
    fetchUserData();
  }, []);

  return (
    <div className="flex h-screen flex-col items-center justify-between">
      {/* Header */}
      <header className="flex justify-end w-full p-6">
        {user ? (
          <UserProfile user={user} />
        ) : (
          <Button
            onClick={async () => {
              router.push("/login");
            }}
          >
            Login
          </Button>
        )}
      </header>

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-gray-900 mb-6">Activities</h1>

      {/* Activities Section */}
      <div className="flex flex-wrap justify-center gap-2 w-full max-w-5xl">
        {Activities.map((activity, index) => {
          return (
            <Card
              key={index}
              className="rounded-xl w-80 m-2 shadow-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold">
                  {activity.name}
                </CardTitle>
                <CardDescription className="text-sm text-gray-600">
                  {activity.description}
                </CardDescription>
              </CardHeader>
              <CardContent className="flex justify-center items-center">
                <Image
                  src={activity.image}
                  alt={activity.name}
                  width={310}
                  height={150}
                  className="rounded-lg select-none"
                />
              </CardContent>
              <CardFooter className="flex justify-center">
                <Button
                  className="w-full text-white"
                  onClick={() => router.push(`/activity/${index + 1}`)}
                >
                  Check it out
                  <ArrowRightIcon className="ml-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      {/* Footer */}
      <footer className="w-full p-6 text-center">
        <p>
          Made by{" "}
          <Link
            href="https://github.com/prxncxss03"
            className="text-slate-500 hover:underline"
            target="_blank"
          >
            Princess Pocon ☠️
          </Link>
        </p>
      </footer>
    </div>
  );
}
