import React, { useState } from 'react';
import { Document, Page } from 'react-pdf';
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';  // for better annotation support

const PdfViewer = ({ fileUrl }) => {
  const [pageNumber, setPageNumber] = useState(1);
  const [numPages, setNumPages] = useState(null);

  const onLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <h1>PDF Viewer</h1>

      <Document
        file={fileUrl}
        onLoadSuccess={onLoadSuccess}
      >
        <Page pageNumber={pageNumber} />
      </Document>

      <div>
        <button
          disabled={pageNumber <= 1}
          onClick={() => setPageNumber(pageNumber - 1)}
          style={{ padding: '10px', margin: '5px', fontSize: '16px' }}
        >
          Prev
        </button>
        
        <span>
          Page {pageNumber} of {numPages}
        </span>
        
        <button
          disabled={pageNumber >= numPages}
          onClick={() => setPageNumber(pageNumber + 1)}
          style={{ padding: '10px', margin: '5px', fontSize: '16px' }}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default PdfViewer;
