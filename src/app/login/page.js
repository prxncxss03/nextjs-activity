"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; 
import { signup } from "./action";
import Image from "next/image";
import { ArrowLeftIcon } from "@radix-ui/react-icons"; 

export default function LoginPage() {
  const router = useRouter();

  return (
    <div className="flex h-screen items-center justify-center bg-gradient-to-b from-gray-100 to-gray-200">
      {/* Back Button */}
      <Button
          variant="ghost"
          className="absolute top-4 left-4 flex items-center space-x-2 text-gray-600 hover:text-gray-900"
          onClick={() => router.push("/")}
        >
          <ArrowLeftIcon className="h-4 w-4" />
          <span>Back</span>
        </Button>
      <div className="p-8 bg-white shadow-lg rounded-xl w-full max-w-sm relative">
        
        
        
        {/* Title */}
        <h1 className="text-2xl font-semibold text-center mb-6 text-gray-800">Sign in to Your Account</h1>
        
        {/* Form */}
        <form className="flex flex-col items-center">
          <Button
            type="submit"
            formAction={signup}
            className="w-full bg-white text-gray-700 border border-gray-300 hover:bg-gray-100 focus:ring-4 focus:ring-blue-500 focus:outline-none flex items-center justify-center space-x-3 py-3 px-4 rounded-lg"
          >
            {/* Google Logo */}
            <Image src="/images/logo/google-logo.png" alt="Google Logo" width={24} height={24} />
            <span className="text-gray-700">Continue with Google</span>
          </Button>
        </form>
      </div>
    </div>
  );
}
