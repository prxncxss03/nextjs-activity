"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button"; 

const Activity4 = () => {
  const [size, setSize] = useState(1);
  const [bgColor, setBgColor] = useState("bg-blue-800");

  const getRandomColor = () => {
    const colors = [
      "bg-red-500",
      "bg-blue-300",
      "bg-green-700",
      "bg-yellow-400",
      "bg-purple-600",
      "bg-pink-200",
      "bg-teal-500",
      "bg-indigo-400",
      "bg-orange-300",
      "bg-rose-600",
      "bg-cyan-500",
      "bg-lime-300",
      "bg-violet-700",
      "bg-amber-400",
      "bg-fuchsia-500",
      "bg-emerald-600",
      "bg-gray-500",
      "bg-sky-300",
      "bg-stone-700",
      "bg-slate-400",
    ];

    return colors[Math.floor(Math.random() * colors.length)];
  };

  const handleClick = () => {
    setSize(size * 2);
    setBgColor(getRandomColor());
  };

  return (
    <div className="flex justify-center items-center h-full">
      <Button
        onClick={handleClick}
        className={`${bgColor} text-white px-6 py-3 transition-all duration-300`}
        style={{ transform: `scale(${size})` }}
      >
        GROW
      </Button>
    </div>
  );
};

export default Activity4;
