"use client";

import { Button } from "@/components/ui/button";
import { signUpV2 } from "./action";
import { useRouter } from "next/navigation";

const Loginv2 = () => {
  const router = useRouter();
  return (
    <div className="h-screen flex items-center justify-center">
      <Button
        variant="outline"
        onClick={() => {
          router.push("/");
        }}
        className="w-32"
      >
        Go back
      </Button>
      <Button
        onClick={() => {
          signUpV2();
        }}
        className="w-32"
      >
        Login
      </Button>
    </div>
  );
};

export default Loginv2;
