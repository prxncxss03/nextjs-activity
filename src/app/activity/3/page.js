'use client'
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import React, { useState, useEffect } from 'react';
import { verify } from "./action";

const Activity3 = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            const data = await verify();
            setUser(data);
        }
        fetchUserData();
    }, []);

   const [num1, setNum1] = useState(0);
   const [num2, setNum2] = useState(0);
    return (
        <div className="flex justify-center items-center h-full bg-gray-100">
            <h1>Add Number</h1>
            <h1>{parseInt(num1) + parseInt(num2)}</h1>
            <Input 
            type="number"
            value={num1}
            onChange={(e) => setNum1(e.target.value)}
            />
            <Input
            type="number"
            value={num2}
            onChange={(e) => setNum2(e.target.value)}
            />
            <Button
            onClick={() => setNum1(0) & setNum2(0)}
            >Reset</Button>

        </div>
    )
}
export default Activity3