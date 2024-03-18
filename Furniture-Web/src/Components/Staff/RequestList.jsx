import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';

import Cookies from 'js-cookie';
import './RequestList.css';

export default function RequestList() {
  const [rows, setRows] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [token, setToken] = useState('');

  useEffect(() => {
    const token = Cookies.get('token');
    setToken(token);
    fetchRequestList(token);
  }, []);

  const fetchRequestList = async (token) => {
    try {
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
      console.error('Error fetching data of Request List:', error);
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
            <TableCell align="right">Request Status</TableCell>
            <TableCell align="right">View Details</TableCell>
            <TableCell align="right">Proposal Pdf File</TableCell>
            

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
              <TableCell align="right">{row.price}</TableCell>
              <TableCell align="right">{row.customer?.full_name}</TableCell>
              <TableCell align="right">{row.customerRequestStatus}</TableCell>
              
              <TableCell align="right">
                <button>
                  <Link to={`/staff/requestDetails/${row.id}`}>View</Link>
                </button>
              </TableCell>
              
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Button component={Link} to="/staff">Back to StaffPage</Button> 

    </TableContainer>
  );
}
