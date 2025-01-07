



// import React, { useState } from 'react';
// import axios from 'axios';
// import './FileUpload.css';  // Import the CSS file

// const FileUpload = () => {
//   const [file, setFile] = useState(null);
//   const [pagesText, setPagesText] = useState([]);
//   const [currentPage, setCurrentPage] = useState(0);
//   const [jumpPage, setJumpPage] = useState('');  // To store the user input for page number

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

//   return (
//     <div className="file-upload-container">
//       <input type="file" accept="application/pdf" onChange={handleFileChange} />
//       <button onClick={handleFileUpload}>Upload PDF</button>

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
//     </div>
//   );
// };

// export default FileUpload;




import React, { useState } from 'react';
import axios from 'axios';
import './FileUpload.css';  // Import the CSS file

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [pagesText, setPagesText] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [jumpPage, setJumpPage] = useState('');  // To store the user input for page number

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleFileUpload = () => {
    const formData = new FormData();
    formData.append('pdf', file);

    axios.post('http://localhost:5000/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      setPagesText(response.data.pages);  // Store page-wise text
      setCurrentPage(0);  // Start from the first page
    })
    .catch((error) => {
      console.error('Error uploading the file:', error);
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

  return (
    <div className="file-upload-container">
      <h2>PDF File Upload and Text Viewer</h2>
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
    </div>
  );
};

export default FileUpload;
