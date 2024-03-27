import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import ProductTable from "../Staff/ProductTable.jsx";
import Cookies from "js-cookie";
import Select from "react-select";
import { toast } from "react-hot-toast";
import { ToastContainer } from "react-toastify";
import { HiArrowSmallLeft } from "react-icons/hi2";
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import axios from "axios";

const getCustomerInfo = () => {

    const customer = JSON.parse(localStorage.getItem('customer'));
    if (customer) {
        const { fullName, phone, email } = customer;
        return { fullName, phone, email };
    } else {
        return null;
    }

}

function Project() {

    const initialCustomerInfo = getCustomerInfo();

    const [workspaces, setWorkspaces] = useState([]);
    const [availableWorkspaces, setAvailableWorkspaces] = useState([]);
    const [requestData, setRequestData] = useState({
        customer: initialCustomerInfo,
        requestDetails: [
            {
                workspaceName: "",
                description: '',
                length: 0,
                width: 0,
                products: []
            }
        ]
    });
    const [selectedWorkspaces, setSelectedWorkspaces] = useState({});
    const [selectedWorkspace, setSelectedWorkspace] = useState(null);
    const [isValidLength, setIsValidLength] = useState(true);
    const [isValidWidth, setIsValidWidth] = useState(true);
    const [isConfirmed, setIsConfirmed] = useState(false); // State để theo dõi trạng thái xác nhận
    const navigate = useNavigate(); // Sử dụng useNavigate để lấy hàm điều hướng


    useEffect(() => {
        fetchWorkspaces();
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

    const getToken = () => {
        return Cookies.get('token');
    };

    const addWorkspace = () => {
        const newWorkspace = {
            id: "", // Có thể sử dụng một giá trị duy nhất như timestamp hoặc GUID
            workspaceName: "",
            description: '',
            length: 0,
            width: 0,
            products: []
        };
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
        const parsedLength = parseFloat(length); // Chuyển đổi length thành kiểu số

        const updatedRequestData = { ...requestData };
        updatedRequestData.requestDetails[workspaceIndex].length = parsedLength;
        updatedRequestData.requestDetails[workspaceIndex].workspaceName = selectedWorkspaces[updatedRequestData.requestDetails[workspaceIndex].id].label;

        // Validate length
        const isValid = !isNaN(parsedLength) && parsedLength > 0;
        setIsValidLength(isValid);

        setRequestData(updatedRequestData);
    };

    // Hàm để cập nhật thông tin của khách hàng vào trong requestData
    const updateCustomerInfo = (field, value) => {
        setRequestData(prevData => ({
            ...prevData,
            customer: {
                ...prevData.customer,
                [field]: value
            }
        }));
    };

    const handleWorkspaceWidthChange = (workspaceIndex, width) => {
        const parsedWidth = parseFloat(width); // Chuyển đổi width thành kiểu số

        const updatedRequestData = { ...requestData };
        updatedRequestData.requestDetails[workspaceIndex].width = parsedWidth;
        updatedRequestData.requestDetails[workspaceIndex].workspaceName = selectedWorkspaces[updatedRequestData.requestDetails[workspaceIndex].id].label;

        // Validate width
        const isValid = !isNaN(parsedWidth) && parsedWidth > 0;
        setIsValidWidth(isValid);

        setRequestData(updatedRequestData);
    };

    const handleConfirmRequest = async () => {
        console.log("Nếu chạy cái này mà không in ra thì sửa", requestData);

        if (!requestData || !requestData.customer || !requestData.customer.email) {
            toast.error('Please enter customer email');
            return;
        }

        try {
            // Xử lý requestData ở đây để đảm bảo tất cả các workspace và sản phẩm được bao gồm
            let isValid = true;

            requestData.requestDetails.forEach(workspace => {
                // Kiểm tra xem mỗi workspace có sản phẩm không
                if (workspace.products.length === 0) {
                    isValid = false;
                    toast.error(`Workspace ${workspace.workspaceName} must have at least one product`);
                }

                // Kiểm tra xem các trường thông tin cần thiết đã được điền đầy đủ không
                if (!workspace.description || !workspace.length || !workspace.width) {
                    isValid = false;
                    toast.error(`Please fill in all required fields for workspace ${workspace.workspaceName}`);
                }
            });

            if (!isValid) {
                return;
            }

            // Cập nhật requestDetail trước khi gửi yêu cầu
            const updatedRequestData = { ...requestData };
            updatedRequestData.requestDetails.forEach(detail => {
                // Xóa các trường không cần thiết trước khi gửi yêu cầu
                delete detail.workspaceName;
                detail.products.forEach(product => {
                    delete product.description;
                });
            });

            setRequestData(updatedRequestData); // Cập nhật requestData với giá trị mới

            const token = getToken();
            const response = await axios.post('http://localhost:8080/api/v1/request/auth', updatedRequestData, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`
                },
            });

            if (response.status === 200) {
                console.log(updatedRequestData);
                toast.success('Request confirmed successfully!');
                // Xử lý phản hồi thành công theo nhu cầu
            } else {
                throw new Error('Failed to confirm request.');
            }
        } catch (error) {
            console.error('Error confirming request:', error);
            alert('Failed to confirm request. Please try again later.');
        }
    };





    const handleCloseRequest = () => {
        navigate('/customer');
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

        <div className="container p-4 bg-white">
            <ToastContainer />
            <HiArrowSmallLeft className="left-60 text-6xl absolute font-semibold hover:cursor-pointer" onClick={handleCloseRequest} />

            <h1 className="text-3xl font-bold mb-8">Manage Request Details</h1>

            <div className="mt-8">
                <h2 className="text-xl font-bold mb-2">Customer Information</h2>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-gray-700">Email:</label>
                        <input
                            type="text"
                            value={getCustomerInfo().email}
                            onChange={(e) => updateCustomerInfo('email', e.target.value)}
                            placeholder="Email"
                            className="border border-gray-300 rounded px-4 py-2 mt-2 w-full focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Phone:</label>
                        <input
                            type="text"
                            value={getCustomerInfo().phone}
                            onChange={(e) => updateCustomerInfo('phone', e.target.value)}
                            placeholder="Phone"
                            className="border border-gray-300 rounded px-4 py-2 mt-2 w-full focus:outline-none focus:border-blue-500"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Full Name:</label>
                        <input
                            type="text"
                            value={getCustomerInfo().fullName}
                            onChange={(e) => updateCustomerInfo('full_name', e.target.value)}
                            placeholder="Full Name"
                            className="border border-gray-300 rounded px-4 py-2 mt-2 w-full focus:outline-none focus:border-blue-500"
                        />
                    </div>
                </div>
            </div>

            <button onClick={addWorkspace} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mt-4">
                Add Workspace
            </button>

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
                    <button onClick={() => deleteWorkspace(workspaceIndex)} className="text-red-500 hover:text-red-700 font-bold">
                        Delete Workspace
                    </button>
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
            <button onClick={handleConfirmRequest} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                Confirm Request
            </button>
        </div>

    );
}

export default Project;
