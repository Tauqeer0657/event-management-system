import React, { useEffect, useState } from 'react';
import CommonTable from './CommonTable';

// Function to generate random user data
const generateRandomUserData = (num) => {
  const names = [
    'John Doe', 'Jane Smith', 'Alice Johnson', 'Chris Lee', 'Michael Brown',
    'Jessica Taylor', 'David Wilson', 'Emily Davis', 'Daniel Martinez', 'Sarah Miller'
  ];
  
  return Array.from({ length: num }, (_, index) => ({
    id: index + 1,
    name: names[Math.floor(Math.random() * names.length)],
    age: Math.floor(Math.random() * (60 - 18 + 1)) + 18, // Random age between 18 and 60
    email: `user${index + 1}@example.com`
  }));
};

const PageOne = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const randomData = generateRandomUserData(20); // Generate 20 random user data
    setData(randomData);
  }, []);

  const columns = [
    { field: 'id', headerName: 'User ID', flex: 1 }, // Set flex property instead of width
    { field: 'name', headerName: 'Full Name', flex: 2 }, // More space for name
    { field: 'age', headerName: 'Age', flex: 1 }, // Set flex property instead of width
    { field: 'email', headerName: 'Email', flex: 2 }, // More space for email
  ];

  return (
    <CommonTable columns={columns} rows={data} pageSize={10} />
  );
};

export default PageOne;
