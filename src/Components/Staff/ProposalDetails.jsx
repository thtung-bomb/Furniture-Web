import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductTable from "./ProductTable";
import Cookies from "js-cookie";
import Select from "react-select";
import { toast } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const ProposalDetails = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [availableWorkspaces, setAvailableWorkspaces] = useState([]);
  const [requestData, setRequestData] = useState(null);
  const [selectedWorkspaces, setSelectedWorkspaces] = useState({});
  const [selectedWorkspace, setSelectedWorkspace] = useState(null);
  const { id } = useParams();
  const [isValidLength, setIsValidLength] = useState(true);
  const [isValidWidth, setIsValidWidth] = useState(true);
  const [isConfirmed, setIsConfirmed] = useState(false); // State để theo dõi trạng thái xác nhận
  const navigate = useNavigate(); // Sử dụng useNavigate để lấy hàm điều hướng

  useEffect(() => {
    fetchWorkspaces();
    fetchRequestData();
  }, []);

  const fetchWorkspaces = async () => {
    try {
      const response = await fetch("http://localhost:8080/api/v1/workspace");
      if (!response.ok) {
        throw new Error("Failed to fetch workspaces.");
      }
      const data = await response.json();
      setAvailableWorkspaces(data);
    } catch (error) {
      console.error("Error fetching workspaces:", error);
    }
  };

  const fetchRequestData = async () => {
    try {
      const token = getToken();
      const response = await fetch(`http://localhost:8080/api/v1/request/auth/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch request data.");
      }
      const data = await response.json();
      setRequestData(data);
    } catch (error) {
      console.error("Error fetching request data:", error);
    }
  };

  const getToken = () => {
    return Cookies.get('token');
  };

  const addWorkspace = () => {
    const newWorkspace = { id: "", workspaceName: "", description: '', length: 0, width: 0, products: [] };
    setRequestData(prevData => ({
      ...prevData,
      requestDetails: [...prevData.requestDetails, newWorkspace]
    }));
  };

  const addProduct = (workspaceIndex) => {
    const updatedRequestData = { ...requestData };
    const products = [...updatedRequestData.requestDetails[workspaceIndex].products, { productId: "", quantity: 0, description: "" }];
    updatedRequestData.requestDetails[workspaceIndex].products = products;
    updatedRequestData.requestDetails[workspaceIndex].workspaceName = selectedWorkspaces[updatedRequestData.requestDetails[workspaceIndex].id].label;
    setRequestData(updatedRequestData);
  };

  const deleteWorkspace = (workspaceIndex) => {
    const updatedRequestData = { ...requestData };
    updatedRequestData.requestDetails.splice(workspaceIndex, 1);
    setRequestData(updatedRequestData);
  };

  const deleteProduct = (workspaceIndex, productIndex) => {
    const updatedRequestData = { ...requestData };
    updatedRequestData.requestDetails[workspaceIndex].products.splice(productIndex, 1);
    setRequestData(updatedRequestData);
  };

  const handleWorkspaceChange = (selectedOption, requestDetailId) => {
    setSelectedWorkspaces({
      ...selectedWorkspaces,
      [requestDetailId]: selectedOption
    });
    setSelectedWorkspace(selectedOption);
  };

  const handleEditQuantity = (workspaceIndex, productIndex, newQuantity) => {
    const updatedRequestData = { ...requestData };
    updatedRequestData.requestDetails[workspaceIndex].products[productIndex].quantity = newQuantity;
    setRequestData(updatedRequestData);
  };

  const handleEditNote = (workspaceIndex, productIndex, newNote) => {
    const updatedRequestData = { ...requestData };
    updatedRequestData.requestDetails[workspaceIndex].products[productIndex].description = newNote;
    setRequestData(updatedRequestData);
  };

  const handleProductChange = (workspaceIndex, productIndex, productId) => {
    const updatedRequestData = { ...requestData };
    updatedRequestData.requestDetails[workspaceIndex].products[productIndex].productId = productId;
    setRequestData(updatedRequestData);
  };

  const handleWorkspaceDescriptionChange = (workspaceIndex, description) => {
    const updatedRequestData = { ...requestData };
    updatedRequestData.requestDetails[workspaceIndex].description = description;
    updatedRequestData.requestDetails[workspaceIndex].workspaceName = selectedWorkspaces[updatedRequestData.requestDetails[workspaceIndex].id].label;
    setRequestData(updatedRequestData);
  };

  const handleWorkspaceLengthChange = (workspaceIndex, length) => {
    const updatedRequestData = { ...requestData };
    updatedRequestData.requestDetails[workspaceIndex].length = length;
    updatedRequestData.requestDetails[workspaceIndex].workspaceName = selectedWorkspaces[updatedRequestData.requestDetails[workspaceIndex].id].label;

    // Validate length
    const isValid = !isNaN(parseFloat(length)) && parseFloat(length) > 0;
    setIsValidLength(isValid);

    setRequestData(updatedRequestData);
  };

  const handleWorkspaceWidthChange = (workspaceIndex, width) => {
    const updatedRequestData = { ...requestData };
    updatedRequestData.requestDetails[workspaceIndex].width = width;
    updatedRequestData.requestDetails[workspaceIndex].workspaceName = selectedWorkspaces[updatedRequestData.requestDetails[workspaceIndex].id].label;

    // Validate width
    const isValid = !isNaN(parseFloat(width)) && parseFloat(width) > 0;
    setIsValidWidth(isValid);

    setRequestData(updatedRequestData);
  };

  const handleConfirmRequest = async () => {

    if (!requestData || !requestData.customer || !requestData.customer.email) {
      toast.error('Please enter customer email');
      return;
    }

    try {
      const token = getToken();
      console.log(requestData);
      const response = await fetch(`http://localhost:8080/api/v1/request/auth/${id}/confirmRequest`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(requestData)
      });
      if (!response.ok) {
        throw new Error('Failed to confirm request.');
      }
      toast.success('Request confirmed successfully!');
      // Handle success response as needed
    } catch (error) {
      console.error('Error confirming request:', error);
      alert('Failed to confirm request. Please try again later.');
    }
  };

  const handleCloseRequest = async () => {
    try {
      const token = getToken();
      const response = await fetch(`http://localhost:8080/api/v1/request/auth/${id}/lock`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(requestData)
      });
      if (!response.ok) {
        throw new Error('Failed to unlock');
      }
      console.log("Unlocked");
      navigate('/staff');
      // Handle success response as needed
    } catch (error) {
      console.error('Error confirming request:', error);
      alert('Failed to confirm request. Please try again later.');
    }
  };

  useEffect(() => {
    if (requestData) {
      const updatedSelectedWorkspaces = {};
      requestData.requestDetails.forEach(detail => {
        const workspace = availableWorkspaces.find(workspace => workspace.workspace_name === detail.workspaceName);
        if (workspace) {
          updatedSelectedWorkspaces[detail.id] = {
            value: workspace.id,
            label: workspace.workspace_name
          };
        }
      });
      setSelectedWorkspaces(updatedSelectedWorkspaces);
    }
  }, [requestData, availableWorkspaces]);

  return (
    <div className="container mx-auto p-4 pointer-events-none">
      <ToastContainer />
      <HiArrowSmallLeft className="left-60 text-6xl absolute font-semibold hover:cursor-pointer pointer-events-auto" onClick={handleCloseRequest} />

      <h1 className="text-3xl font-bold mb-8">Manage Request Details</h1>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Request Status</h2>
        <p className="text-gray-700">Customer Request Status: {requestData && requestData.customerRequestStatus}</p>
        <p className="text-gray-700">Employee Request Status: {requestData && requestData.employeeRequestStatus}</p>
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold mb-2">Customer Information</h2>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-gray-700">Email:</label>
            <input
              type="text"
              value={requestData && requestData.customer.email ? requestData.customer.email : ''}
              onChange={(e) => setRequestData(prevData => ({ ...prevData, customer: { ...prevData.customer, email: e.target.value } }))}
              placeholder="Email"
              className="border border-gray-300 rounded px-4 py-2 mt-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Phone:</label>
            <input
              type="text"
              value={requestData && requestData.customer.phone ? requestData.customer.phone : ''}
              onChange={(e) => setRequestData(prevData => ({ ...prevData, customer: { ...prevData.customer, phone: e.target.value } }))}
              placeholder="Phone"
              className="border border-gray-300 rounded px-4 py-2 mt-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Full Name:</label>
            <input
              type="text"
              value={requestData && requestData.customer.full_name ? requestData.customer.full_name : ''}
              onChange={(e) => setRequestData(prevData => ({ ...prevData, customer: { ...prevData.customer, full_name: e.target.value } }))}
              placeholder="Full Name"
              className="border border-gray-300 rounded px-4 py-2 mt-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">ID Card:</label>
            <input
              type="text"
              value={requestData && requestData.customer.id_card ? requestData.customer.id_card : ''}
              onChange={(e) => setRequestData(prevData => ({ ...prevData, customer: { ...prevData.customer, id_card: e.target.value } }))}
              placeholder="ID Card"
              className="border border-gray-300 rounded px-4 py-2 mt-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Address:</label>
            <input
              type="text"
              value={requestData && requestData.customer.address ? requestData.customer.address : ''}
              onChange={(e) => setRequestData(prevData => ({ ...prevData, customer: { ...prevData.customer, address: e.target.value } }))}
              placeholder="Address"
              className="border border-gray-300 rounded px-4 py-2 mt-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-gray-700">Note:</label>
            <input
              type="text"
              value={requestData && requestData.customer.note ? requestData.customer.note : ''}
              onChange={(e) => setRequestData(prevData => ({ ...prevData, customer: { ...prevData.customer, note: e.target.value } }))}
              placeholder="Note"
              className="border border-gray-300 rounded px-4 py-2 mt-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      {requestData && requestData.requestDetails.map((requestDetail, workspaceIndex) => (
        <div key={requestDetail.id} className="mt-8">
          <h2 className="text-xl font-bold">{requestDetail.workspaceName}</h2>
          <Select
            value={selectedWorkspaces[requestDetail.id] || ""}
            onChange={(selectedOption) => handleWorkspaceChange(selectedOption, requestDetail.id)}
            options={availableWorkspaces.map((workspace) => ({
              value: workspace.id,
              label: workspace.workspace_name,
              workspace_name: workspace.workspace_name // Additional custom data
            }))}
            placeholder="Select Workspace"
            className="w-1/2 mr-2 border border-gray-300 rounded px-4 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
            getOptionLabel={(option) => option.label}
            getOptionValue={(option) => option.value}
          />

          <div className="mt-4">
            <label className="block text-gray-700">Description:</label>
            <input
              type="text"
              value={requestDetail.description}
              onChange={(e) => handleWorkspaceDescriptionChange(workspaceIndex, e.target.value)}
              placeholder="Workspace Description"
              className="border border-gray-300 rounded px-4 py-2 mt-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Length:</label>
            <input
              type="number"
              value={requestDetail.length}
              onChange={(e) => handleWorkspaceLengthChange(workspaceIndex, e.target.value)}
              placeholder="Workspace Length"
              className="border border-gray-300 rounded px-4 py-2 mt-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>
          <div className="mt-4">
            <label className="block text-gray-700">Width:</label>
            <input
              type="number"
              value={requestDetail.width}
              onChange={(e) => handleWorkspaceWidthChange(workspaceIndex, e.target.value)}
              placeholder="Workspace Width"
              className="border border-gray-300 rounded px-4 py-2 mt-2 w-full focus:outline-none focus:border-blue-500"
            />
          </div>

          <ProductTable
            products={requestDetail.products}
            onDeleteProduct={(productIndex) => deleteProduct(workspaceIndex, productIndex)}
            onEditQuantity={(productIndex, newQuantity) => handleEditQuantity(workspaceIndex, productIndex, newQuantity)}
            onEditNote={(productIndex, newNote) => handleEditNote(workspaceIndex, productIndex, newNote)}
            onAddProduct={() => addProduct(workspaceIndex)}
            selectedWorkspace={selectedWorkspaces[requestDetail.id] ? selectedWorkspaces[requestDetail.id].label : ""}
            handleProductChange={(productIndex, productId) => handleProductChange(workspaceIndex, productIndex, productId)}
          />
        </div>
      ))}

    </div>
  );
};

export default ProposalDetails
