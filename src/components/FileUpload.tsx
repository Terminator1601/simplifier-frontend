import React, { useState, ChangeEvent, DragEvent } from 'react';
import axios from 'axios';

interface FileUploadProps {
  onFileUpload: (file: File) => void;
  onTextInput: (text: string) => void;
  file: File | null;
}

export default function FileUpload({ onFileUpload, onTextInput, file }: FileUploadProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [activeMode, setActiveMode] = useState<'pdf' | 'text'>('pdf');
  const [inputText, setInputText] = useState('');
  const [extractedText, setExtractedText] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      onFileUpload(selectedFile);
      await uploadFileToBackend(selectedFile);
    }
  };

  const handleDragEnter = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = async (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      const droppedFile = e.dataTransfer.files[0];
      onFileUpload(droppedFile);
      await uploadFileToBackend(droppedFile);
    }
  };

  const uploadFileToBackend = async (selectedFile: File) => {
    setLoading(true);
    setError(null);
    setExtractedText(null);

    const formData = new FormData();
    formData.append('pdf', selectedFile);

    try {
      const response = await axios.post('http://127.0.0.1:5000/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.data.pages) {
        setExtractedText(response.data.pages.join('\n\n')); // Combine all pages' text
      } else {
        setError('Failed to extract text from the uploaded PDF.');
      }
    } catch (err) {
      console.error(err);
      setError('Error uploading file or extracting text.');
    } finally {
      setLoading(false);
    }
  };

  const handleTextChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInputText(e.target.value);
    onTextInput(e.target.value);
  };

  return (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-lg shadow-md transition-colors duration-200 backdrop-blur-sm bg-opacity-90 dark:bg-opacity-90">
      <div className="flex justify-center space-x-4 mb-4">
        <button
          onClick={() => setActiveMode('pdf')}
          className={`px-4 py-2 rounded-md transition-colors duration-200 ${
            activeMode === 'pdf'
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'text-blue-600 hover:text-blue-700 border border-blue-600'
          }`}
        >
          Upload PDF
        </button>
        <button
          onClick={() => setActiveMode('text')}
          className={`px-4 py-2 rounded-md transition-colors duration-200 ${
            activeMode === 'text'
              ? 'bg-blue-600 hover:bg-blue-700 text-white'
              : 'text-blue-600 hover:text-blue-700 border border-blue-600'
          }`}
        >
          Upload Text
        </button>
      </div>
      {activeMode === 'pdf' ? (
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="dropzone-file"
            className={`flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 dark:border-gray-600 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:bg-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 transition-all duration-300 ease-in-out ${
              isDragging ? 'border-blue-500 bg-blue-50 dark:bg-blue-900' : ''
            }`}
            onDragEnter={handleDragEnter}
            onDragOver={handleDragEnter}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <svg className="w-10 h-10 mb-3 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"></path>
              </svg>
              <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
              <p className="text-xs text-gray-500 dark:text-gray-400">PDF (MAX. 10MB)</p>
            </div>
            <input id="dropzone-file" type="file" className="hidden" onChange={handleFileChange} accept=".pdf" />
          </label>
        </div>
      ) : (
        <textarea
          placeholder="Enter your text here..."
          value={inputText}
          onChange={handleTextChange}
          className="w-full h-64 p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-gray-300"
        />
      )}
      {loading && <p className="text-sm text-blue-600 dark:text-blue-400 mt-4">Uploading and processing file...</p>}
      {error && <p className="text-sm text-red-600 dark:text-red-400 mt-4">{error}</p>}
      {extractedText && (
        <div className="mt-4">
          <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-2">Extracted Text:</h3>
          <pre className="bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 p-4 rounded-md overflow-auto">
            {extractedText}
          </pre>
        </div>
      )}
      {file && activeMode === 'pdf' && (
        <div className="mt-4">
          <p className="text-sm text-gray-500 dark:text-gray-400">File: {file.name}</p>
          <p className="text-sm text-gray-500 dark:text-gray-400">Size: {(file.size / 1024 / 1024).toFixed(2)} MB</p>
        </div>
      )}
    </div>
  );
}
