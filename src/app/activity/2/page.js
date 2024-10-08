"use client";

import { Button } from "@/components/ui/button"
import React, { useState } from 'react';
// Activity 2: Create a counter app
// increment, decrement
// Add an element that states whether a number is odd or even.
// Add a reset button that returns the counter to 0.
const Activity2 = () => {

    const [count, setCount] = useState(0);
    return (
        <div>
            <h1>Counter: {count}</h1>
            <h1>{count % 2 === 0 ? "Even" : "Odd"}</h1>
            <Button 
            disabled={count === 0}
            onClick={() => setCount(count - 1)}>Decrement</Button>
            <Button 
            onClick={() => setCount(count + 1)}>Increment</Button>
            <Button
            onClick={() => setCount(0)}>Reset</Button>
        </div>
    );
}


export default Activity2;