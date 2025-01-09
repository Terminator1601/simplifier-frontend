import React, { useState } from 'react';
import FileUpload from './FileUpload.tsx';
import TextDisplay from './TextDisplay.tsx';
import LoadingSpinner from './LoadingSpinner.tsx';
import BackendResponse from './BackendResponse.tsx';

export default function Simplifier() {
  const [file, setFile] = useState<File | null>(null);
  const [inputText, setInputText] = useState<string>('');
  const [extractedText, setExtractedText] = useState<string[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [backendResponse, setBackendResponse] = useState('');
  const [selectedText, setSelectedText] = useState('');

  const handleFileUpload = async (uploadedFile: File) => {
    setFile(uploadedFile);
    setInputText('');
    setIsLoading(true);
    // Simulating file upload and text extraction
    setTimeout(() => {
      setExtractedText(['Sample extracted text from PDF page 1', 'Sample extracted text from PDF page 2', 'Sample extracted text from PDF page 3']);
      setIsLoading(false);
    }, 2000);
  };

  const handleTextInput = (text: string) => {
    setInputText(text);
    setFile(null);
    setIsLoading(true);
    // Simulating text processing
    setTimeout(() => {
      setExtractedText(text.split('\n\n')); // Split text into pages based on double line breaks
      setIsLoading(false);
    }, 1000);
  };

  const handleTextSelection = async (selection: string) => {
    setSelectedText(selection);
    setIsLoading(true);
  
    try {
      const response = await fetch('http://localhost:5000/saveSelectedText', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ text: selection }),
      });
  
      if (!response.ok) {
        throw new Error('Failed to process text');
      }
  
      const data = await response.json();
      setBackendResponse(data.response || 'No response from backend');
    } catch (error) {
      console.error('Error:', error);
      setBackendResponse('Error processing text. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };
  

  return (
    <div className="space-y-8 bg-white dark:bg-gray-800 p-6 rounded-lg shadow-lg backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
      <FileUpload onFileUpload={handleFileUpload} onTextInput={handleTextInput} file={file} />
      {isLoading && <LoadingSpinner />}
      {extractedText.length > 0 && (
        <TextDisplay
          text={extractedText}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          onTextSelection={handleTextSelection}
        />
      )}
      {backendResponse && <BackendResponse response={backendResponse} />}
    </div>
  );
}

