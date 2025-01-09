// import React from 'react'
// import FileUpload from './components/FileUpload'

// const App = () => {
//   return (
//     <div>
//       <FileUpload/>
//     </div>
//   )
// }

// export default App






import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './pages/HomePage.tsx';
import UploadPage from './pages/UploadPage.tsx';
import ThemeToggle from './components/ThemeToggle.tsx';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors duration-200">
        {/* <ThemeToggle /> */}
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/upload" element={<UploadPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;

