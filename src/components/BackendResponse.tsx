import React, { useState, useEffect } from 'react';

interface BackendResponseProps {
  response: string;
}

export default function BackendResponse({ response }: BackendResponseProps) {
  const [fadeIn, setFadeIn] = useState(false);

  useEffect(() => {
    setFadeIn(false);
    const timer = setTimeout(() => setFadeIn(true), 10);
    return () => clearTimeout(timer);
  }, [response]);

  return (
    <div className={`bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-opacity duration-300 ease-in-out backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90 ${
      fadeIn ? 'opacity-100' : 'opacity-0'
    }`}>
      <h2 className="text-lg font-semibold mb-2 text-gray-800 dark:text-gray-200">Backend Response:</h2>
      <p className="text-gray-700 dark:text-gray-300">{response}</p>
    </div>
  );
}

