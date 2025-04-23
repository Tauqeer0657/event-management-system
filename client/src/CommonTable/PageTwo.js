import React, { useEffect, useState } from 'react';
import CommonTable from './CommonTable';

// Function to generate random product data
const generateRandomProductData = (num) => {
  const products = [
    'Laptop', 'Smartphone', 'Tablet', 'Headphones', 'Smartwatch',
    'Monitor', 'Keyboard', 'Mouse', 'Printer', 'Camera'
  ];

  return Array.from({ length: num }, (_, index) => ({
    id: index + 1,
    title: products[Math.floor(Math.random() * products.length)],
    description: `This is a description for ${products[Math.floor(Math.random() * products.length)]}.`,
    price: (Math.random() * 100).toFixed(2), // Random price between 0 and 100
  }));
};

const PageTwo = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const randomData = generateRandomProductData(20); // Generate 20 random product data
    setData(randomData);
  }, []);

  const columns = [
    { field: 'id', headerName: 'Product ID', flex: 1 }, // Use flex instead of width
    { field: 'title', headerName: 'Product Name', flex: 2 }, // More space for product name
    { field: 'description', headerName: 'Description', flex: 3 }, // More space for description
    { field: 'price', headerName: 'Price', flex: 1 }, // Use flex instead of width
  ];

  return (
    <CommonTable columns={columns} rows={data} pageSize={5} />
  );
};

export default PageTwo;
