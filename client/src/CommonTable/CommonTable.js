import React from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { Toolbar, Typography, Button, Box } from '@mui/material';

// Custom Toolbar component
const CustomToolbar = ({ onAdd }) => {
  return (
    <Toolbar sx={{ justifyContent: 'space-between', padding: '0 16px' }}>
      <Typography variant="h6">Data Table</Typography>
      <Button variant="contained" color="primary" onClick={onAdd}>
        Add New Item
      </Button>
    </Toolbar>
  );
};

const CommonTable = ({ columns, rows, pageSize = 5, onRowClick, onAdd }) => {
  return (
    <Box sx={{ height:"80vh", width: '100%', '& .MuiDataGrid-root': { border: 'none' } }}>
      <CustomToolbar onAdd={onAdd} />
      <DataGrid
        rows={rows}
        columns={columns}
        pageSize={pageSize}
        rowsPerPageOptions={[5, 10, 20]}
        checkboxSelection
        onRowClick={onRowClick}
        disableSelectionOnClick
        sx={{
          '& .MuiDataGrid-columnHeader': {
            backgroundColor: '#1976d2', // Header background color
            color: '#ffffff', // Header text color
            fontWeight: 'bold',
          },
          '& .MuiDataGrid-cell': {
            padding: '10px',
          },
          '& .MuiDataGrid-footerContainer': {
            backgroundColor: '#f5f5f5', // Footer background color
          },
          '& .MuiCheckbox-root': {
            color: '#1976d2', // Checkbox color
          },
        }}
      />
    </Box>
  );
};

export default CommonTable;
