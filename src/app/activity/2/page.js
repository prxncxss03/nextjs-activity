"use client";

import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const Activity2 = () => {
  const [count, setCount] = useState(0);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      {/* Counter Display */}
      <div className="mb-6 text-center">
        <h1 className="text-4xl font-bold mb-2 text-gray-800">Counter: {count}</h1>
        <h2 className={`text-2xl ${count % 2 === 0 ? "text-blue-500" : "text-red-500"}`}>
          {count % 2 === 0 ? "Even" : "Odd"}
        </h2>
      </div>

      {/* Button Controls */}
      <div className="flex space-x-4">
        <Button
          variant="outline"
          disabled={count === 0}
          onClick={() => setCount(count - 1)}
          className="w-32"
        >
          Decrement
        </Button>
        <Button
          variant="default"
          onClick={() => setCount(count + 1)}
          className="w-32"
        >
          Increment
        </Button>
        <Button
          variant="secondary"
          onClick={() => setCount(0)}
          className="w-32"
        >
          Reset
        </Button>
      </div>
    </div>
  );
};

export default Activity2;
