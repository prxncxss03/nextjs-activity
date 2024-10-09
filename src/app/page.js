"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
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


export default function Home() {
  const router = useRouter();
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <header className="flex w-full mb-2">
        <Button onClick={() => router.push("/login")}>
          Login
        </Button>
      </header>
      <h1 className="text-3xl font-bold">Activities</h1>
      <div className="flex flex-wrap justify-center items-center w-full">
        {Activities.map((activity, index) => {
          return (
            <Card key={index}
              className="w-80 m-2"
            >
              <CardHeader>
                <CardTitle>{activity.name}</CardTitle>
                <CardDescription>
                  {activity.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Image
                  src={activity.image}
                  alt={activity.name}
                  width={100}
                  height={100}
                />
              </CardContent>
              <CardFooter>
                <Button 
                className="w-full"
                onClick={() => router.push(`/activity/${index + 1}`)}>
                  Check it out
                  <ArrowRightIcon className="mr-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>

      <footer className="flex justify-center absolute bottom-0 w-full bg-gray-100 p-4">
        <p> Made with ❤️ by <a href="https://github.com/prxncxss03">prxncxss03</a></p>
      </footer>
    </div>
  );
}
