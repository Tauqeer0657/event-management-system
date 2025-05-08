import React from 'react';

const Success = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-green-100">
      <div className="bg-white p-8 rounded shadow-md text-center">
        <h2 className="text-2xl font-bold text-green-600 mb-4">Success!</h2>
        <p className="text-gray-700">Created Successfully ✅</p>
      </div>
    </div>
  );
};

export default Success;
