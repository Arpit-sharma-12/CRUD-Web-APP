// filepath: c:\Users\arpit\Downloads\project\CRUD web App\components\Footer.tsx
import React from "react";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-4">
      <div className="container mx-auto text-center">
        <p className="text-sm">
          Developed by <strong>Arpit Sharma</strong>
        </p>
        <div className="flex justify-center space-x-4 mt-2">
          <a
            href="https://github.com/arpitsharma"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            GitHub
          </a>
          <a
            href="https://linkedin.com/in/arpitsharma"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline"
          >
            LinkedIn
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
