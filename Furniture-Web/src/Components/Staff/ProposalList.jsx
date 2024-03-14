import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

export default function ProposalList() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [pdfUrl, setPdfUrl] = useState(null);
  const { requestId } = useParams();

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);

      const response = await axios.post(`http://localhost:5174/staff/proposalList/${requestId}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setPdfUrl(response.data.pdfUrl);
    } catch (error) {
      console.error('Error uploading PDF:', error);
    }
  };

  return (
    <div>
      <h1>Proposal List</h1>
      <p>Request ID: {requestId}</p>
      <form onSubmit={handleSubmit}>
        <input type="file" onChange={handleFileChange} accept="application/pdf" />
        <button type="submit">Upload PDF</button>
      </form>
      
      {/* Hiển thị file PDF nếu có URL */}
      {pdfUrl && (
        <iframe
          title="PDF Viewer"
          src={pdfUrl}
          style={{ width: '100%', height: '600px', border: 'none' }}
        />
      )}
    </div>
  );
}
