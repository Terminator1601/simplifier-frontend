import React, { useState, useRef, useEffect } from 'react';

interface TextDisplayProps {
  text: string[]; // Array of pages' text
  currentPage: number; // Current page number
  setCurrentPage: (page: number) => void; // Function to update the current page
  onTextSelection: (selection: string) => void; // Callback for selected text
}

export default function TextDisplay({
  text,
  currentPage,
  setCurrentPage,
  onTextSelection,
}: TextDisplayProps) {
  const [jumpToPage, setJumpToPage] = useState(''); // State for jump-to-page input
  const [fadeIn, setFadeIn] = useState(true); // State for fade-in animation
  const textRef = useRef<HTMLDivElement>(null); // Reference for the text container

  // Handle fade-in animation on page change
  useEffect(() => {
    setFadeIn(false);
    const timer = setTimeout(() => setFadeIn(true), 50); // Delay for smooth fade
    return () => clearTimeout(timer);
  }, [currentPage]);

  // Handle text selection event
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection();
      if (selection && selection.toString().trim().length > 0) {
        onTextSelection(selection.toString().trim());
      }
    };

    document.addEventListener('mouseup', handleSelection);
    return () => document.removeEventListener('mouseup', handleSelection);
  }, [onTextSelection]);

  // Handle jumping to a specific page
  const handleJumpToPage = () => {
    const page = parseInt(jumpToPage, 10);
    if (page >= 1 && page <= text.length) {
      setCurrentPage(page);
      setJumpToPage(''); // Reset input field
    } else {
      alert('Invalid page number'); // Alert if the input is invalid
    }
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-200 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
      {/* Text Display Section */}
      <div
        ref={textRef}
        className={`h-64 overflow-y-auto mb-4 p-4 border border-gray-200 dark:border-gray-700 rounded transition-opacity duration-300 ease-in-out ${
          fadeIn ? 'opacity-100' : 'opacity-0'
        }`}
        style={{ scrollBehavior: 'smooth' }}
      >
        <p className="text-gray-800 dark:text-gray-200 whitespace-pre-wrap">
          {text[currentPage - 1]}
        </p>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-between">
        {/* Pagination Buttons */}
        <div className="space-x-2">
          <button
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            First
          </button>
          <button
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Previous
          </button>
          <span className="text-gray-600 dark:text-gray-400">
            Page {currentPage} of {text.length}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === text.length}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Next
          </button>
          <button
            onClick={() => setCurrentPage(text.length)}
            disabled={currentPage === text.length}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
          >
            Last
          </button>
        </div>

        {/* Jump to Page Section */}
        <div className="flex items-center space-x-2">
          <input
            type="number"
            value={jumpToPage}
            onChange={(e) => setJumpToPage(e.target.value)}
            placeholder="Page #"
            className="w-20 px-2 py-1 border border-gray-300 dark:border-gray-600 rounded bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          />
          <button
            onClick={handleJumpToPage}
            className="px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-all duration-200"
          >
            Jump
          </button>
        </div>
      </div>
    </div>
  );
}
