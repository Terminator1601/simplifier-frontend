



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import './FileUpload.css';  // Import the CSS file

// const FileUpload = () => {
//   const [file, setFile] = useState(null);
//   const [pagesText, setPagesText] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [jumpPage, setJumpPage] = useState('');  // To store the user input for page number
//   const [backendResponse, setBackendResponse] = useState('');  // State to store response from backend

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleFileUpload = () => {
//     const formData = new FormData();
//     formData.append('pdf', file);

//     axios.post('http://localhost:5000/upload', formData, {
//       headers: {
//         'Content-Type': 'multipart/form-data',
//       },
//     })
//     .then((response) => {
//       setPagesText(response.data.pages);  // Store page-wise text
//       setCurrentPage(0);  // Start from the first page
//     })
//     .catch((error) => {
//       console.error('Error uploading the file:', error);
//     });
//   };

//   const nextPage = () => {
//     if (currentPage < pagesText.length - 1) {
//       setCurrentPage(currentPage + 1);
//     }
//   };

//   const prevPage = () => {
//     if (currentPage > 0) {
//       setCurrentPage(currentPage - 1);
//     }
//   };

//   const goToPage = (pageNumber) => {
//     if (pageNumber >= 0 && pageNumber < pagesText.length) {
//       setCurrentPage(pageNumber);
//     }
//   };

//   const handleJumpChange = (e) => {
//     setJumpPage(e.target.value);  // Update jumpPage state with user input
//   };

//   const handleJumpToPage = () => {
//     const pageNumber = parseInt(jumpPage) - 1;  // Adjust for 0-indexed array
//     if (pageNumber >= 0 && pageNumber < pagesText.length) {
//       setCurrentPage(pageNumber);
//       setJumpPage('');  // Clear the input field after jump
//     } else {
//       alert('Invalid page number');
//     }
//   };

//   // Function to send selected text to the backend
//   const sendSelectedTextToBackend = (selectedText) => {
//     if (selectedText) {
//       axios.post('http://localhost:5000/saveSelectedText', { text: selectedText })
//         .then(response => {
//           console.log('Selected text sent to the backend:', response.data);
//           // Set the backend response to state
//           setBackendResponse(response.data.response);  // Store the response from the backend
//         })
//         .catch(error => {
//           console.error('Error sending selected text:', error);
//         });
//     }
//   };

//   // Event listener to capture text selection
//   useEffect(() => {
//     const handleTextSelection = () => {
//       const selectedText = window.getSelection().toString();
//       if (selectedText) {
//         sendSelectedTextToBackend(selectedText);
//       }
//     };

//     // Attach the event listener for mouseup
//     document.addEventListener('mouseup', handleTextSelection);

//     // Cleanup the event listener on component unmount
//     return () => {
//       document.removeEventListener('mouseup', handleTextSelection);
//     };
//   }, []); // Empty dependency array ensures this runs only once

//   return (
//     <div className="file-upload-container">
//       <h2>Simplifier</h2>
//       <input type="file" accept="application/pdf" onChange={handleFileChange} />
//       <button onClick={handleFileUpload}>Upload PDF</button>

//       <div className="file-details">
//         {file && <p><strong>File Name:</strong> {file.name}</p>}
//         {file && <p><strong>File Size:</strong> {(file.size / 1024).toFixed(2)} KB</p>}
//       </div>

//       <div>
//         {pagesText.length > 0 && (
//           <>
//             <h3>Extracted Text - Page {currentPage + 1}:</h3>
//             <pre>{pagesText[currentPage]}</pre>

//             <div className="pagination">
//               <button onClick={() => goToPage(0)} disabled={currentPage === 0}>First</button>
//               <button onClick={prevPage} disabled={currentPage === 0}>Previous</button>
//               <span>Page {currentPage + 1} of {pagesText.length}</span>
//               <button onClick={nextPage} disabled={currentPage === pagesText.length - 1}>Next</button>
//               <button onClick={() => goToPage(pagesText.length - 1)} disabled={currentPage === pagesText.length - 1}>Last</button>
//             </div>

//             {/* Jump to page input */}
//             <div className="jump-to-page">
//               <input
//                 type="number"
//                 value={jumpPage}
//                 onChange={handleJumpChange}
//                 placeholder="Jump to page"
//                 min="1"
//                 max={pagesText.length}
//               />
//               <button onClick={handleJumpToPage}>Go</button>
//             </div>
//           </>
//         )}
//       </div>

//       {/* Display the backend response below the selected text */}
//       {backendResponse && (
//         <div className="backend-response">
//           <h4>Backend Response:</h4>
//           <p>{backendResponse}</p>
//         </div>
//       )}
//     </div>
//   );
// };

// export default FileUpload;














import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FileUpload.css';  // Import the CSS file

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [pagesText, setPagesText] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [jumpPage, setJumpPage] = useState('');  // To store the user input for page number
  const [backendResponse, setBackendResponse] = useState('');  // State to store response from backend
  const [loading, setLoading] = useState(false);  // State to track loading status

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append('pdf', file);

    setLoading(true);  // Set loading to true when the request starts

    axios.post('http://localhost:5000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      setPagesText(response.data.pages);  // Store page-wise text
      setCurrentPage(0);  // Start from the first page
      setLoading(false);  // Set loading to false when the response is received
    })
    .catch((error) => {
      console.error('Error uploading the file:', error);
      setLoading(false);  // Set loading to false in case of an error
    });
  };

  const nextPage = () => {
    if (currentPage < pagesText.length - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  const goToPage = (pageNumber) => {
    if (pageNumber >= 0 && pageNumber < pagesText.length) {
      setCurrentPage(pageNumber);
    }
  };

  const handleJumpChange = (e) => {
    setJumpPage(e.target.value);  // Update jumpPage state with user input
  };

  const handleJumpToPage = () => {
    const pageNumber = parseInt(jumpPage) - 1;  // Adjust for 0-indexed array
    if (pageNumber >= 0 && pageNumber < pagesText.length) {
      setCurrentPage(pageNumber);
      setJumpPage('');  // Clear the input field after jump
    } else {
      alert('Invalid page number');
    }
  };

  // Function to send selected text to the backend
  const sendSelectedTextToBackend = (selectedText) => {
    if (selectedText) {
      setLoading(true);  // Set loading to true when the request starts

      axios.post('http://localhost:5000/saveSelectedText', { text: selectedText })
        .then(response => {
          console.log('Selected text sent to the backend:', response.data);
          // Set the backend response to state
          setBackendResponse(response.data.response);  // Store the response from the backend
          setLoading(false);  // Set loading to false when the response is received
        })
        .catch(error => {
          console.error('Error sending selected text:', error);
          setLoading(false);  // Set loading to false in case of an error
        });
    }
  };

  // Event listener to capture text selection
  useEffect(() => {
    const handleTextSelection = () => {
      const selectedText = window.getSelection().toString();
      if (selectedText) {
        sendSelectedTextToBackend(selectedText);
      }
    };

    // Attach the event listener for mouseup
    document.addEventListener('mouseup', handleTextSelection);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mouseup', handleTextSelection);
    };
  }, []); // Empty dependency array ensures this runs only once

  return (
    <div className="file-upload-container">
      <h2>Simplifier</h2>
      <input type="file" accept="application/pdf" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload PDF</button>

      <div className="file-details">
        {file && <p><strong>File Name:</strong> {file.name}</p>}
        {file && <p><strong>File Size:</strong> {(file.size / 1024).toFixed(2)} KB</p>}
      </div>

      <div>
        {pagesText.length > 0 && (
          <>
            <h3>Extracted Text - Page {currentPage + 1}:</h3>
            <pre>{pagesText[currentPage]}</pre>

            <div className="pagination">
              <button onClick={() => goToPage(0)} disabled={currentPage === 0}>First</button>
              <button onClick={prevPage} disabled={currentPage === 0}>Previous</button>
              <span>Page {currentPage + 1} of {pagesText.length}</span>
              <button onClick={nextPage} disabled={currentPage === pagesText.length - 1}>Next</button>
              <button onClick={() => goToPage(pagesText.length - 1)} disabled={currentPage === pagesText.length - 1}>Last</button>
            </div>

            {/* Jump to page input */}
            <div className="jump-to-page">
              <input
                type="number"
                value={jumpPage}
                onChange={handleJumpChange}
                placeholder="Jump to page"
                min="1"
                max={pagesText.length}
              />
              <button onClick={handleJumpToPage}>Go</button>
            </div>
          </>
        )}
      </div>

      {/* Display the loading spinner while fetching response */}
      {loading && (
        <div className="loading-spinner">
          <p>Loading...</p>
        </div>
      )}

      {/* Display the backend response below the selected text */}
      {backendResponse && (
        <div className="backend-response">
          <h4>Backend Response:</h4>
          <p>{backendResponse}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
