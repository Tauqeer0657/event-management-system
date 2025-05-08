import React from 'react';

const Cancel = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-red-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h2 className="text-2xl font-bold text-red-600 mb-4">Cancelled</h2>
        <p className="text-gray-700">Your action has been cancelled ❌</p>
      </div>
    </div>
  );
};

export default Cancel;
