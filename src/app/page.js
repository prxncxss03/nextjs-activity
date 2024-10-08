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
    <div class="flex h-screen flex-col items-center">
      <h1>Princess Pocon Activity Submission</h1>
      <div class="flex">
        {Activities.map((activity, index) => {
          return (
            <Card key={index}>
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
                  See
                  <ArrowRightIcon className="mr-2 h-4 w-4" />
                </Button>
              </CardFooter>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
