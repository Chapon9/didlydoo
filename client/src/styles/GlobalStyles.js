// GlobalStyles.js

import { useEffect } from 'react';

const GlobalStyles = () => {
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
      }

      body {
        font-family: 'Arial', sans-serif;
        background-color: #f4f4f4;
        color: #333;
        padding: 20px;
      }

      h1, h2, h3 {
        font-weight: bold;
      }

      a {
        text-decoration: none;
        color: #007bff;
      }

      a:hover {
        color: #0056b3;
      }

      button {
        padding: 10px 20px;
        border-radius: 5px;
        background-color: #28a745;
        color: white;
        border: none;
        cursor: pointer;
      }

      button:hover {
        background-color: #218838;
      }
    `;

    // Append the styles to the head of the document
    document.head.appendChild(style);

    // Cleanup on component unmount
    return () => {
      document.head.removeChild(style);
    };
  }, []);

  return null; // This component doesn't render anything
};

export default GlobalStyles;
