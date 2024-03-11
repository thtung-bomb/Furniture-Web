import React, { useState, useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

export default function BasicTable() {
  const [rows, setRows] = useState([]);

  useEffect(() => {
    fetchAPI();
  }, []);

  const fetchAPI = async () => {
    try {
      const token = 'eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJUcm9uZ0hhb0BnbWFpbC5jb20iLCJpYXQiOjE3MTAxNDU4NDUsImV4cCI6MTcxMDE0NzY0NX0.Y-VrsjgbA06STTT8wagyLSK6lhHldZb5X-Wqdg_o9og';
      const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      const response = await fetch('http://localhost:8080/api/v1/request/auth/status/REQUESTED?page=1&pageSize=9', requestOptions);
      const data = await response.json();
      console.log(data);
      setRows(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Estimated Price</TableCell>
            <TableCell align="right">Customer Name</TableCell>
            <TableCell align="right">Status</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.id}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.estimatedPrice}</TableCell>
              <TableCell align="right">{row.customer.full_name}</TableCell>
              <TableCell align="right">{row.customerRequestStatus}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
