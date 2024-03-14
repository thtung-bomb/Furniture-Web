import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Cookies from 'js-cookie';

export default function RequestDetails() {
  const { id } = useParams();
  const [selectedRowData, setSelectedRowData] = useState(null);
  const [workspaceOptions, setWorkspaceOptions] = useState([]);
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const [workspaceProducts, setWorkspaceProducts] = useState({});
  const [showForm, setShowForm] = useState(true); // State mới để theo dõi trạng thái hiển thị của form
  const token = Cookies.get('token');

  useEffect(() => {
    fetchRequestDetails(id);
    fetchWorkspaceOptions();
  }, [id]);

  const fetchRequestDetails = async (id) => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      const apiUrl = `http://localhost:8080/api/v1/request/auth/${id}`;
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();
      console.log(data);
      setSelectedRowData(data);
    } catch (error) {
      console.error('Error fetching request details:', error);
    }
  };

  const fetchWorkspaceOptions = async () => {
    try {
      const requestOptions = {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };
      const response = await fetch('http://localhost:8080/api/v1/workspace', requestOptions);
      const data = await response.json();
      console.log(data);
      setWorkspaceOptions(data);
      
      // Fetch sản phẩm cho từng workspace và lưu lại
      data.forEach(workspace => {
        fetchProductsByWorkspace(workspace.workspace_name);
      });
    } catch (error) {
      console.error('Error fetching workspace options:', error);
    }
  };

  const handleChangeWorkspace = (index, workspaceName) => {
    const newDetails = [...selectedRowData.requestDetails];
    newDetails[index].workspaceName = workspaceName;
    setSelectedRowData(prevData => ({ ...prevData, requestDetails: newDetails }));
    setSelectedWorkspace(workspaceName); 
  };

  const fetchProductsByWorkspace = async (workspaceName) => {
    console.log("Fetching products for workspace:", workspaceName);
    try {
      const response = await fetch(`http://localhost:8080/api/v1/workspace/${workspaceName}/products`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      const data = await response.json();
      console.log("Fetched products:", data);
      setWorkspaceProducts(prevProducts => ({
        ...prevProducts,
        [workspaceName]: data
      }));
    } catch (error) {
      console.error('Error fetching products:', error);
    }
  };

  const renderDetailInputs = () => {
    if (!selectedRowData || selectedRowData.requestDetails.length === 0) {
      return (
        <div>
          <label>Product 1 Quantity:</label>
          <input
            type="number"
            value=""
            onChange={(e) => {
              const newDetails = [{ quantity: parseInt(e.target.value), workspaceName: '', description: null, product: null }];
              setSelectedRowData(prevData => ({ ...prevData, requestDetails: newDetails }));
            }}
          />
          <label>Workspace:</label>
        <Select
          onChange={(e) => {
            const selectedValue = e.target.value; 
            setSelectedWorkspace(selectedValue); 
          }}
          value={selectedWorkspace || ''}
        >
          {workspaceOptions.map((workspace) => (
            <MenuItem key={workspace.id} value={workspace.workspace_name}>{workspace.workspace_name}</MenuItem>
          ))}
        </Select>
          <label>Product 1 Description:</label>
          <input
            type="text"
            value=""
            onChange={(e) => {
              const newDetails = [{ quantity: 0, workspaceName: '', description: e.target.value, product: null }];
              setSelectedRowData(prevData => ({ ...prevData, requestDetails: newDetails }));
            }}
          />
          <label>Product 1:</label>
          
          <Select
            value={null}
            onChange={(e) => {
              const newDetails = [{ quantity: 0, workspaceName: '', description: null, product: e.target.value }];
              setSelectedRowData(prevData => ({ ...prevData, requestDetails: newDetails }));
            }}
          >
            {workspaceProducts['']?.map((product, index) => (
              <MenuItem key={index} value={product.id}>{product.name}</MenuItem>
            ))}
          </Select>
        </div>
      );
    } else {
      return selectedRowData.requestDetails.map((detail, index) => (
        <div key={index}>
          {/* Các trường khác */}
          <label>Product {index + 1} Quantity:</label>
          <input
            type="number"
            value={detail.quantity || ''}
            onChange={(e) => {
              const newDetails = [...selectedRowData.requestDetails];
              newDetails[index].quantity = parseInt(e.target.value);
              setSelectedRowData(prevData => ({ ...prevData, requestDetails: newDetails }));
            }}
          />
          <label>Product {index + 1} Workspace:</label>
          <select
            value={detail.workspaceName || ''}
            onChange={(e) => handleChangeWorkspace(index, e.target.value)}
          >
            {workspaceOptions.map((workspace, index) => (
              <option key={index} value={workspace.workspace_name}>{workspace.workspace_name}</option>
            ))}
          </select>
          <label>Product {index + 1} Description:</label>
          <input
            type="text"
            value={detail.description || ''}
            onChange={(e) => {
              const newDetails = [...selectedRowData.requestDetails];
              newDetails[index].description = e.target.value;
              setSelectedRowData(prevData => ({ ...prevData, requestDetails: newDetails }));
            }}
          />
          <label>Product {index + 1}:</label>
          <Select
            value={detail.product || ''}
            onChange={(e) => {
              const newDetails = [...selectedRowData.requestDetails];
              newDetails[index].product = e.target.value;
              setSelectedRowData(prevData => ({ ...prevData, requestDetails: newDetails }));
            }}
          >
            {workspaceProducts[detail.workspaceName]?.map((product, index) => (
              <MenuItem key={index} value={product.id}>{product.name}</MenuItem>
            ))}
          </Select>
        </div>
      ));
    }
  };
  


  const handleConfirm = async () => {
    console.log(selectedRowData);
    try {
      const requestOptions = {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(selectedRowData) // Gửi dữ liệu của yêu cầu đã chọn
      };

      const apiUrl = `http://localhost:8080/api/v1/request/auth/${selectedRowData.id}/confirmRequest`; // Endpoint để xác nhận yêu cầu
      const response = await fetch(apiUrl, requestOptions);
      const data = await response.json();
      console.log(data); // Log response từ API để kiểm tra
      
      // Cập nhật lại trạng thái của yêu cầu hoặc thực hiện các hành động phù hợp khác
      // Ví dụ: Hiển thị thông báo xác nhận thành công, cập nhật UI, vv.
    } catch (error) {
      console.error('Error confirming request:', error);
    }
  };

  const navigate = useNavigate();

  const handleBackToList = () => {
    setShowForm(false);
    navigate('/staff/requestList'); // Thực hiện chuyển hướng tới trang requestList
  };




  return (
    <TableContainer component={Paper}>
      {showForm && selectedRowData ? (
        <div>
          <div>
            <p>ID: {selectedRowData.id}</p>
            <p>Estimated Price: {selectedRowData.estimatedPrice}</p>
            <label>Email:</label>
            <input
              type="text"
              value={selectedRowData.customer?.email || ''}
              onChange={(e) => setSelectedRowData(prevData => ({ ...prevData, customer: { ...prevData.customer, email: e.target.value } }))}
            />
            <label>Phone:</label>
            <input
              type="text"
              value={selectedRowData.customer?.phone || ''}
              onChange={(e) => setSelectedRowData(prevData => ({ ...prevData, customer: { ...prevData.customer, phone: e.target.value } }))}
            />
            <label>ID Card:</label>
            <input
              type="text"
              value={selectedRowData.customer?.id_card || ''}
              onChange={(e) => setSelectedRowData(prevData => ({ ...prevData, customer: { ...prevData.customer, id_card: e.target.value } }))}
            />
            <label>Note:</label>
            <input
              type="text"
              value={selectedRowData.customer?.note || ''}
              onChange={(e) => setSelectedRowData(prevData => ({ ...prevData, customer: { ...prevData.customer, note: e.target.value } }))}
            />
            <label>Address:</label>
            <input
              type="text"
              value={selectedRowData.customer?.address || ''}
              onChange={(e) => setSelectedRowData(prevData => ({ ...prevData, customer: { ...prevData.customer, address: e.target.value } }))}
            />
            <label>Full Name:</label>
            <input
              type="text"
              value={selectedRowData.customer?.full_name || ''}
              onChange={(e) => setSelectedRowData(prevData => ({ ...prevData, customer: { ...prevData.customer, full_name: e.target.value } }))}
            />
            {renderDetailInputs()}
          </div>
          <button onClick={handleConfirm}>Confirm</button>
          <button onClick={handleBackToList}>Back to List</button>
        </div>
      ) : (
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>ID</TableCell>
              <TableCell align="right">Estimated Price</TableCell>
              <TableCell align="right">Customer Name</TableCell>
              <TableCell align="right">Request Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {selectedRowData && selectedRowData.requestDetails.map((row) => (
              <TableRow
                key={row.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell align="right">{row.estimatedPrice}</TableCell>
                <TableCell align="right">{row.customer?.full_name}</TableCell>
                <TableCell align="right">{row.customerRequestStatus}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </TableContainer>
  );
}
