import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import React, { useState } from 'react';
import axios from 'axios';

function ImageUploader({ onUpload }) {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'portfolio_unsigned'); // Set this in your Cloudinary dashboard

    const res = await axios.post(
      'https://res.cloudinary.com/dozb1abfn/image/upload/full_pic_eldrc0.jpg',
      formData
    );
    onUpload(res.data.secure_url); // This is the image URL
  };

  return (
    <div>
      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload</button>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(<App />);
