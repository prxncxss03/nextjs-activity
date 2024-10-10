"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";

const Activity3 = () => {
  const [num1, setNum1] = useState(0);
  const [num2, setNum2] = useState(0);

  const addTwoNumbers = () => {
    if (num1 && num2) {
      return parseInt(num1) + parseInt(num2);
    } else if (num1) {
      return parseInt(num1);
    } else if (num2) {
      return parseInt(num2);
    }
    return 0;
  };

  return (
    <div className="flex flex-col justify-center items-center  p-4 h-full">
      {/* Title */}
      <h1 className="text-2xl font-semibold mb-6 text-gray-800">Add Numbers</h1>

      {/* Display Result */}
      <h2 className="text-3xl font-bold text-blue-600 mb-4">
        {addTwoNumbers()}
      </h2>

      {/* Number Inputs */}
      <div className="flex flex-col space-y-4 mb-6 w-full max-w-xs">
        <Input
          type="number"
          value={num1}
          onChange={(e) => setNum1(e.target.value)}
          placeholder="Enter first number"
          className="text-center"
        />
        <Input
          type="number"
          value={num2}
          onChange={(e) => setNum2(e.target.value)}
          placeholder="Enter second number"
          className="text-center"
        />
      </div>

      {/* Reset Button */}
      <Button
        variant="secondary"
        onClick={() => {
          setNum1(0);
          setNum2(0);
        }}
        className="w-full max-w-xs"
      >
        Reset
      </Button>
    </div>
  );
};

export default Activity3;
