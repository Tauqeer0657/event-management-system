import React, { useState } from 'react';
import { QrReader } from 'react-qr-reader';
import { jwtDecode } from 'jwt-decode';

const QRScanner = () => {
  const [decodedData, setDecodedData] = useState(null);
  const [error, setError] = useState("");

  const handleScan = (result, error) => {
    if (!!result) {
      try {
        const decoded = jwtDecode(result?.text);
        setDecodedData(decoded);
        setError("");
      } catch (err) {
        setError("Invalid QR code or token.");
      }
    }

    if (!!error) {
      console.error(error);
      setError("Camera access error or QR code not readable.");
    }
  };

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Scan Event QR Code</h2>
      <div style={{ width: "100%" }}>
        <QrReader
          constraints={{ facingMode: 'environment' }}
          onResult={handleScan}
          style={{ width: "100%" }}
        />
      </div>

      {decodedData && (
        <div className="mt-4 bg-gray-100 p-4 rounded shadow">
          <h3 className="text-lg font-bold">Student Info:</h3>
          <p><strong>Name:</strong> {decodedData.student_name}</p>
          <p><strong>Email:</strong> {decodedData.student_email}</p>
          <p><strong>Event:</strong> {decodedData.event_name}</p>
          <p><strong>Description:</strong> {decodedData.event_description}</p>
          <p><strong>Date:</strong> {new Date(decodedData.event_time).toLocaleString()}</p>
          <p><strong>Venue:</strong> {decodedData.event_venue}</p>
        </div>
      )}

      {error && (
        <p className="text-red-500 mt-4">{error}</p>
      )}
    </div>
  );
};

export default QRScanner;
