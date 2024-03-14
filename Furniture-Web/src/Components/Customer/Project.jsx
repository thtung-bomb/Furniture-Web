import React, { useState, useEffect, useContext } from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { fetchAvailableWorkspace, fetchAvailableProducts } from './http';
import Cookies from 'js-cookie';
import axios from 'axios';

function Project() {
    
    const [availableWorkspace, setAvailableWorkspace] = useState([]);
    const [availableProducts, setAvailableProducts] = useState([]);
    // set selected workspace to add at link /{workspaceName}/products to get products of that space
    const [selectedWorkspace, setSelectedWorkspace] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [error, setError] = useState();
    const [requestDetails, setRequestDetails] = useState([]);
    const customer = localStorage.getItem('customer');
    const token = Cookies.get('token');
    const userData = JSON.parse(customer);

    const userRequest = {
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone
    }

    console.log(userRequest);

    // console.log(userData);
    // console.log(token);

    useEffect(() => {
        async function fetchWorkspace() {
            try {
                // call method to get all workspace.
                const workspace = await fetchAvailableWorkspace();
                setAvailableWorkspace(workspace);
            } catch (error) {
                setError({ message: error.message || 'Could not fetch places, please try again later.' });
            }
        }
        fetchWorkspace();
    }, []);

    useEffect(() => {
        async function fetchProducts(workspaceName) {
            try {
                const products = await fetchAvailableProducts(workspaceName);
                setAvailableProducts(products);
            } catch (error) {
                setError({ message: error.message || 'Could not fetch products, please try again later.' });
            }
        }
        if (selectedWorkspace) {
            fetchProducts(selectedWorkspace.workspace_name);
        }
    }, [selectedWorkspace]);
    // work when workspace was selected -> render all products of that space

    const handleAddProduct = (event) => {
        event.preventDefault(); // prevent page load
        const productName = event.target.elements.productName.value;
        const productQuantity = event.target.elements.productQuantity.value;
        const description = event.target.elements.description.value;

        if (!productName || !productQuantity) {
            return;
        }

        const selectedProductId = selectedProducts ? selectedProducts.id : null;

        const newRequestDetail = {
            product: selectedProductId, // Sử dụng id của sản phẩm thay vì tên sản phẩm
            quantity: productQuantity,
            workspaceName: selectedWorkspace ? selectedWorkspace.workspace_name : '', // Lấy tên workspace
            description: description
        };

        setRequestDetails(prevDetails => [...prevDetails, newRequestDetail]);

        // Xóa nội dung của các trường input sau khi thêm sản phẩm
        event.target.elements.productName.value = ''; // Xóa giá trị của trường nhập liệu "Product"
        event.target.elements.productQuantity.value = ''; // Xóa giá trị của trường nhập liệu "Product Quantity"
        event.target.elements.description.value = ''; // Xóa giá trị của trường nhập liệu "Description"
    };

    // useEffect(() => {
    //     console.log(requestDetails);
    // }, [requestDetails]);

    // Hàm để gửi yêu cầu lên server
    const handleSubmitRequest = () => {

        const requestData = {
            customer: userRequest,
            requestDetails: requestDetails
        }

        console.log(requestData);

        axios.post('http://localhost:8080/api/v1/request/auth', requestData, {
            headers: {
                'Authorization': `Bearer ${token}`, // Thêm token vào header Authorization
                'Content-Type': 'application/json' // Đảm bảo loại nội dung là JSON
            }
        }).catch(err => {
            console.log(err);
        });

        // Gửi requestDetails lên server
        if (requestDetails.length == 0) {
            console.log("Nothings to request");
            return;
        }
        console.log('Request Details:', requestDetails);
        console.log('Request Details sent successfully');
        // Reset requestDetails sau khi gửi thành công
        setRequestDetails([]);
    };

    return (

        <div className='flex flex-col gap-6'>
            <TextField
                id="outlined-basic"
                label="Your Name"
                variant="outlined"
                sx={{ width: 300 }}
                defaultValue={userData ? userData.fullName : ''}
                fullWidth
            />
            <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                sx={{ width: 300 }}
                defaultValue={customer ? userData.email : ''}
                fullWidth
            />
            <TextField
                id="outlined-basic"
                label="Phone"
                variant="outlined"
                sx={{ width: 300 }}
                defaultValue={customer ? userData.phone : ''}
                fullWidth
            />
            <div className='flex flex-col gap-5'>
                <Autocomplete
                    disablePortal
                    id="combo-box-demo"
                    options={availableWorkspace}
                    getOptionLabel={(option) => option.workspace_name}
                    onChange={(event, newValue) => setSelectedWorkspace(newValue)}
                    renderInput={(params) => <TextField {...params} key={availableWorkspace.id} label="Room" variant="outlined" sx={{ width: 300 }} />}
                    fullWidth
                />

                <form className='flex flex-col gap-4' onSubmit={handleAddProduct}>
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={availableProducts}
                        getOptionLabel={(option) => option.name}
                        getOptionSelected={(option, value) => option.id === value.id} // Specify how to compare the selected option with the options in the list
                        onChange={(event, newValue) => setSelectedProducts(newValue)}
                        renderInput={(params) => <TextField {...params} name="productName" label="Product" variant="outlined" sx={{ width: 300 }} />}
                    />

                    <TextField
                        id="number"
                        label="Product Quantity"
                        type="number"
                        name="productQuantity"
                        variant="outlined"
                        sx={{ width: 150 }}
                    />
                    <TextField
                        id="outlined-basic"
                        label="Description"
                        variant="outlined"
                        multiline
                        size='small'
                        name="description"
                        sx={{ width: 300 }}
                    />
                    <button type="submit" className='px-4 py-2 border-[2px] bg-cyan-700 hover:bg-cyan-900 text-white'>Add Product</button>
                </form>

                <div className='flex gap-6'>
                    {selectedWorkspace && (
                        <div className='flex flex-col gap-4'>
                            <div className='flex flex-col gap-4 w-[500px] overflow-y-scroll'>
                                {requestDetails.map((detail, index) => (
                                    <div key={index} className='flex justify-between items-center gap-2'>
                                        <div>{detail.product}</div>
                                        <div>{detail.quantity}</div>
                                        <div>{detail.workspaceName}</div>
                                        <div>{detail.description}</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                    <button className='px-4 py-2 border-[2px] bg-cyan-700 hover:bg-cyan-900 text-white' onClick={handleSubmitRequest}>Send Request</button>
                </div>
            </div>
        </div>

    );
}

export default Project;
