'use client';

import { Button } from "@/components/ui/button"
import { useRouter } from 'next/navigation'
import { usePathname } from 'next/navigation'

export default function Template({ children }) {
    const router = useRouter();
    return <div
        className="h-screen p-4  flex flex-col justify-center items-center"
    >
        <header className="flex w-full">
            <Button 
            onClick={() => router.push("/")}
            >Back</Button>
            <h1>Activity #
                {usePathname().split("/").pop()}
            </h1>
        </header>

        <div class="border-2 bg-gray-100 rounded-xl h-full w-full border-dashed ">    
            {children}
        </div>   
    </div>
  }