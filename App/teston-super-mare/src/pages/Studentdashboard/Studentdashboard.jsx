import React from 'react';
import './Studentdashboard.css';
import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid';
import { Button, Paper } from '@mui/material';


const columns = [
  //{ field: 'id', headerName: 'ID', width: 90 },
  {
    field: 'testName',
    headerName: 'Test Name',
    width: 200,
    editable: true,
    sortable: true,
  },
  {
    field: 'subject',
    headerName: 'Subject',
    width: 200,
    editable: true,
    sortable: true,
  },
  {
    field: 'lecturer',
    headerName: 'Lecturer',
    width: 200,
    editable: true,
    sortable: true,
  },
  {
    field: 'status',
    headerName: 'Status',
    sortable: true,
    width: 200,
  },
  {
    field: 'takeTest',
    headerName: 'Take Test',
    sortable: false,
    width: 200,
    cellRenderer: ({ id }) => (
      <button>Take Test</button>
    ),
  },
];

const rows = [
  { id: 1, testName: "Algebra", subject: 'Math', lecturer: 'Jon', status: "Available", takeTest: <button>Take Test</button> },
  { id: 1, testName: "Algebra", subject: 'Math', lecturer: 'Jon', status: "Available" },
  { id: 1, testName: "Algebra", subject: 'Math', lecturer: 'Jon', status: "Available" },
  { id: 1, testName: "Algebra", subject: 'Math', lecturer: 'Jon', status: "Available" },

];


export default function StudentDashboard() {
  return (
    <Paper sx={{ height: 800, width: 1100 }}>
    <Box sx={{ height: 700, width: 1000 }}>
      <DataGrid
        rows={rows}
        columns={columns}
        checkboxSelection
        disableSelectionOnClick
      />
    </Box>
    </Paper>
  );
}


