import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
<<<<<<< HEAD
import Button from '@mui/material/Button';
=======
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Cookies from 'js-cookie';
>>>>>>> master

import Cookies from 'js-cookie';
import './RequestList.css';

export default function RequestList() {
  const [rows, setRows] = useState([]);
  const [selectedRowData, setSelectedRowData] = useState(null);
<<<<<<< HEAD
  const [token, setToken] = useState('');

  useEffect(() => {
    const token = Cookies.get('token');
    setToken(token);
    fetchRequestList(token);
=======
  const [workspaceOptions, setWorkspaceOptions] = useState([]);

  useEffect(() => {
    fetchAPI();
    fetchWorkspaceOptions(); // Fetch danh sách workspace
>>>>>>> master
  }, []);

  const fetchRequestList = async (token) => {
    try {
<<<<<<< HEAD
=======
      const token = Cookies.get('token');
>>>>>>> master
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

<<<<<<< HEAD
  

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

=======
  const fetchWorkspaceOptions = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/v1/workspace');
      const data = await response.json();
      console.log(data);
      setWorkspaceOptions(data);
    } catch (error) {
      console.error('Error fetching workspace options:', error);
    }
  };

  const handleClickAPI = async (rowId) => {
    try {
      const token = Cookies.get('token');
      const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      const apiUrl = `http://localhost:8080/api/v1/request/auth/${rowId}`;
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();
      console.log(data);
      setSelectedRowData(data); // Lưu trữ dữ liệu của hàng đã chọn
    } catch (error) {
      console.error('Error handling click:', error);
    }
  };

  const handleClick = (rowId) => {
    handleClickAPI(rowId);
  };

  const handleBackToList = () => {
    setSelectedRowData(null); // Xóa dữ liệu của hàng đã chọn để quay lại danh sách
  };

  const handleConfirm = async () => {
    try {
      const token = Cookies.get('token');
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedRowData)
      };

      const apiUrl = `http://localhost:8080/api/v1/request/auth/${selectedRowData.id}/confirmRequest`;
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();
      console.log(data);

      // Refresh the table after successful confirmation
      fetchAPI();
      setSelectedRowData(null); // Clear the selected row data
    } catch (error) {
      console.error('Error confirming row:', error);
    }
  };

  const renderDetailInputs = () => {
    if (selectedRowData.requestDetails.length === 0) {
      return (
        <div>
          <label>Product 1 Quantity:</label>
          <input
            type="number"
            value=""
            onChange={(e) => {
              const newDetails = [{ quantity: parseInt(e.target.value), workspaceName: '', description: '' }];
              setSelectedRowData(prevData => ({...prevData, requestDetails: newDetails}));
            }}
          />
          <label>Product 1 Workspace:</label>
          <Select
            value=""
            onChange={(e) => {
              const newDetails = [{ quantity: 0, workspaceName: e.target.value, description: '' }];
              setSelectedRowData(prevData => ({...prevData, requestDetails: newDetails}));
            }}
          >
            {workspaceOptions.map((workspace, index) => (
              <MenuItem key={index} value={workspace.workspace_name}>{workspace.workspace_name}</MenuItem>
            ))}
          </Select>
          <label>Product 1 Description:</label>
          <input
            type="text"
            value=""
            onChange={(e) => {
              const newDetails = [{ quantity: 0, workspaceName: '', description: e.target.value }];
              setSelectedRowData(prevData => ({...prevData, requestDetails: newDetails}));
            }}
          />
        </div>
      );
    } else {
      return selectedRowData.requestDetails.map((detail, index) => (
        <div key={index}>
          <label>Product {index + 1} Quantity:</label>
          <input
            type="number"
            value={detail.quantity >= 0 ? detail.quantity : ''}
            onChange={(e) => {
              const newDetails = [...selectedRowData.requestDetails];
              newDetails[index].quantity = parseInt(e.target.value);
              setSelectedRowData(prevData => ({...prevData, requestDetails: newDetails}));
            }}
          />
          <label>Product {index + 1} Workspace:</label>
          <Select
            value={detail.workspaceName || ''}
            onChange={(e) => {
              const newDetails = [...selectedRowData.requestDetails];
              newDetails[index].workspaceName = e.target.value;
              setSelectedRowData(prevData => ({...prevData, requestDetails: newDetails}));
            }}
          >
            {workspaceOptions.map((workspace, index) => (
              <MenuItem key={index} value={workspace.workspace_name}>{workspace.workspace_name}</MenuItem>
            ))}
          </Select>
          <label>Product {index + 1} Description:</label>
          <input
            type="text"
            value={detail.description || ''}
            onChange={(e) => {
              const newDetails = [...selectedRowData.requestDetails];
              newDetails[index].description = e.target.value;
              setSelectedRowData(prevData => ({...prevData, requestDetails: newDetails}));
            }}
          />
        </div>
      ));
    }
  };

  return (
    <TableContainer component={Paper}>
      {selectedRowData ? (
        <div>
          <div>
            <p>ID: {selectedRowData.id}</p>
            <p>Estimated Price: {selectedRowData.estimatedPrice}</p>
            <label>Email:</label>
            <input
              type="text"
              value={selectedRowData.customer.email || ''}
              onChange={(e) => setSelectedRowData(prevData => ({...prevData, customer: {...prevData.customer, email: e.target.value}}))}
            />
            <label>Phone:</label>
            <input
              type="text"
              value={selectedRowData.customer.phone || ''}
              onChange={(e) => setSelectedRowData(prevData => ({...prevData, customer: {...prevData.customer, phone: e.target.value}}))}
            />
            <label>ID Card:</label>
            <input
              type="text"
              value={selectedRowData.customer.id_card || ''}
              onChange={(e) => setSelectedRowData(prevData => ({...prevData, customer: {...prevData.customer, id_card: e.target.value}}))}
            />
            <label>Note:</label>
            <input
              type="text"
              value={selectedRowData.customer.note || ''}
              onChange={(e) => setSelectedRowData(prevData => ({...prevData, customer: {...prevData.customer, note: e.target.value}}))}
            />
            <label>Address:</label>
            <input
              type="text"
              value={selectedRowData.customer.address || ''}
              onChange={(e) => setSelectedRowData(prevData => ({...prevData, customer: {...prevData.customer, address: e.target.value}}))}
            />
            <label>Full Name:</label>
            <input
              type="text"
              value={selectedRowData.customer.full_name || ''}
              onChange={(e) => setSelectedRowData(prevData => ({...prevData, customer: {...prevData.customer, full_name: e.target.value}}))}
            />
            {renderDetailInputs()}
          </div>
          <button onClick={handleBackToList}>Back to List</button>
          <button onClick={handleConfirm}>Confirm</button>
        </div>
      ) : (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Estimated Price</TableCell>
              <TableCell align="right">Customer Name</TableCell>
              <TableCell align="right">Request St</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map((row) => (
              <TableRow 
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                onClick={() => handleClick(row.id)}
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
      )}
>>>>>>> master
    </TableContainer>
  );
}
