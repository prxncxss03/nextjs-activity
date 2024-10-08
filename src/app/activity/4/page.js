'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button'; // Adjust this import as necessary for your setup

const Activity4 = () => {
  // State to track button size and background color
  const [size, setSize] = useState(1); // Initial size is 1 (normal)
  const [bgColor, setBgColor] = useState('bg-blue-500'); // Default color

  // Function to generate a random color class
  const getRandomColor = () => {
    const colors = [
      'bg-red-500',
      'bg-green-500',
      'bg-blue-500',
      'bg-yellow-500',
      'bg-purple-500',
      'bg-pink-500',
      'bg-indigo-500',
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  // Function to handle the click event (size doubling and color change)
  const handleClick = () => {
    setSize(size * 2); // Double the size
    setBgColor(getRandomColor()); // Change to a random color
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
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
