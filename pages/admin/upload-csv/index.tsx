import React, { useState } from 'react';
import axios from 'axios';
import Papa from 'papaparse';

function UploadCSV() {
    const [file, setFile] = useState<File | null>(null);

  const onFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files ? e.target.files[0] : null);
  };

  const onFormSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    if (!file) {
      console.error('No file selected');
      return;
    }
  
    Papa.parse(file!, {
      header: true,
      step: async (results: { data: any; }, parser) => {
        try {
          await axios.post('/api/uploads/upload-csv', results.data);
          console.log('Data uploaded successfully');
        } catch (error) {
          console.error(error);
           console.log('Failed to upload data');
           parser.abort(); // Stop parsing and uploading if an error occurs
        }
      },
      error: (error: any) => {
        console.error('Error while parsing CSV:', error);
         console.log('Failed to parse CSV');
      },
    });
  };
  return (
    <form onSubmit={onFormSubmit}>
      <input type="file" accept=".csv" onChange={onFileChange} />
      <button type="submit">Upload</button>
    </form>
  );
}

export default UploadCSV;