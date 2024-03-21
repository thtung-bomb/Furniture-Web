import React, { useState, useEffect, useContext } from 'react';
import TextField from '@mui/material/TextField';
import { fetchAvailableWorkspace, fetchAvailableProducts } from './http';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { ToastContainer, toast } from 'react-toastify';
import { Autocomplete, Button, Checkbox, FormControlLabel } from '@mui/material';
import { CheckBox } from '@mui/icons-material';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function Project() {

    const [availableWorkspace, setAvailableWorkspace] = useState([]);
    const [availableProducts, setAvailableProducts] = useState([]);
    const [selectedWorkspace, setSelectedWorkspace] = useState(null);
    const customer = localStorage.getItem('customer');
    const token = Cookies.get('token');
    const userData = JSON.parse(customer);
    const [selectedProducts, setSelectedProducts] = useState([]); // State lưu các sản phẩm được chọn

    const [requestDetails, setRequestDetails] = useState([]);

    const handleProductQuantityChange = (event, productId) => {
        const { name, value } = event.target;
        const quantity = parseFloat(value);
        setSelectedProducts(prevSelectedProducts => ({
            ...prevSelectedProducts,
            [productId]: {
                ...prevSelectedProducts[productId],
                quantity: quantity,
                description: prevSelectedProducts[productId]?.description || ''
            }
        }));
    };

    const handleProductSelect = (event, productId) => {
        const isChecked = event.target.checked;
        setSelectedProducts(prevSelectedProducts => ({
            ...prevSelectedProducts,
            [productId]: {
                ...prevSelectedProducts[productId],
                isChecked: isChecked
            }
        }));
    };

    // Lưu giá trị từ form vào mảng requestDetails
    // Hàm xử lý khi form được gửi
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const form = event.target;
        const formData = new FormData(form);

        // Kiểm tra xem các trường cần thiết đã được điền hay chưa
        const workspaceName = formData.get('workspaceName');
        const length = formData.get('length');
        const width = formData.get('width');
        const description = formData.get('description');

        // Nếu có ít nhất một trường không được điền, không thêm đối tượng rỗng vào mảng requestDetails
        if (!workspaceName || !length || !width || !description) {
            return;
        }

        // Chuyển đổi giá trị length và width từ chuỗi sang số
        const parsedLength = parseFloat(length);
        const parsedWidth = parseFloat(width);

        // Tạo một đối tượng mới đại diện cho chi tiết yêu cầu
        const newRequestDetail = {
            workspaceName: workspaceName,
            description: description,
            length: parsedLength,
            width: parsedWidth,
            products: availableProducts
                .filter(product => selectedProducts[product.id] && selectedProducts[product.id].quantity > 0)
                .map(product => ({
                    productId: product.id,
                    quantity: selectedProducts[product.id].quantity,
                    description: selectedProducts[product.id].description || ''
                }))
        };

        // Thêm chi tiết yêu cầu mới vào mảng requestDetails
        setRequestDetails([...requestDetails, newRequestDetail]);

        // Reset form
        form.reset();
        setSelectedProducts([]); // Xóa các sản phẩm đã chọn
    };

    // get workspace
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
    // end get workspace

    // get product by workspacename
    useEffect(() => {
        async function fetchProductsByWorkspace() {
            try {
                if (selectedWorkspace) {
                    const products = await fetchAvailableProducts(selectedWorkspace.workspace_name);
                    setAvailableProducts(products);
                }
            } catch (error) {
                setError({ message: error.message || 'Could not fetch products, please try again later.' });
            }
        }

        fetchProductsByWorkspace();
    }, [selectedWorkspace]);
    // End get product by workspacename

    const userRequest = {
        fullName: userData.fullName,
        email: userData.email,
        phone: userData.phone
    }


    const handleSubmitRequest = () => {

        const requestDataToSend = requestDetails.filter(detail => Object.keys(detail).length !== 0);

        const requestData = {
            customer: userRequest,
            requestDetails: requestDataToSend
        }

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
            toast.error("Nothings to request");
            return;
        }

        console.log('Request Data Sent to server', requestData);
        console.log('Request Details sent successfully');
        toast.success('Request Details sent successfully')
        // Reset requestDetails sau khi gửi thành công
        setRequestDetails([]);
    };


    return (

        <div className='flex flex-col gap-6 border-[2px]'>

            {/* Show message when success or fail to send request */}
            <ToastContainer position='top-center' />
            {/* Show message when success or fail to send request */}

            {/* Tag create request */}
            <div className="isolate bg-white py-24 sm:py-32 lg:px-96 px-12 mr-[10em]">
                <div className="absolute inset-x-0 top-[-10rem] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[-20rem]" aria-hidden="true">
                </div>
                {/* Title */}
                <div className="mx-auto max-w-2xl text-center px-12">
                    <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Create Request</h2>
                </div>

                <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
                    {/* Customer Info */}
                    <div className='sm:col-span-2'>
                        <label htmlFor="email" className="block text-2xl font-semibold leading-6 text-gray-900 mt-5">Email</label>
                        <div className="flex mt-2.5 justify-center">
                            <input defaultValue={customer ? userData.email : ''} type="text" name="email" id="last-name" autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                                placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" readOnly />
                        </div>
                        <label htmlFor="fullName" className="block text-2xl font-semibold leading-6 text-gray-900 mt-6">
                            Họ và Tên
                        </label>
                        <div className="mt-2.5">
                            <input type="text" name="fullName" id="first-name" autoComplete="given-name"
                                defaultValue={userData ? userData.fullName : ''}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset 
                                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                                    sm:text-sm sm:leading-6" readOnly />
                        </div>
                        <label htmlFor="phone" className="block text-2xl font-semibold leading-6 text-gray-900 mt-5">
                            Số điện thoại
                        </label>
                        <div className="mt-2.5">
                            <input type="text" defaultValue={customer ? userData.phone : ''} name="phone" id="phone" autoComplete="organization"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 
                                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                                focus:ring-indigo-600 sm:text-sm sm:leading-6" readOnly />
                        </div>
                    </div>
                    {/* End Customer Info */}

                    {/* Add workspace and Product */}
                    {/* //'onSubmit=' */}
                    <form className="mt-16 max-w-xl sm:mt-20 flex flex-row gap-5" onSubmit={handleFormSubmit}>
                        {/* Details  */}
                        <div className="sm:col-span-2 bg-[#DFE9F4] px-60 flex flex-col gap-5">

                            <h1 className='font-semibold text-center text-2xl text-gray-900 py-10'>Details</h1>

                            {/* Choose workspace */}
                            <Autocomplete
                                disablePortal
                                id="combo-box-demo"
                                options={availableWorkspace}
                                getOptionLabel={(option) => option.workspace_name}
                                onChange={(event, newValue) => setSelectedWorkspace(newValue)}
                                renderInput={(params) => <TextField {...params} key={availableWorkspace.id} name="workspaceName" label="Room" variant="outlined" sx={{ width: 300 }} />}
                                fullWidth
                            />
                            {/* End choose workspace */}

                            {/* Input length */}
                            <div className='flex flex-row'>
                                <TextField
                                    id="standard-basic"
                                    label="Chiều dài (m)"
                                    variant="standard"
                                    name="length"
                                />
                                <p className='text-red-600'>&#8727;</p>
                            </div>
                            {/* End Input length */}

                            {/* Input width */}
                            <div className='flex flex-row'>
                                <TextField
                                    id="standard-basic"
                                    label="Chiều rộng (m)"
                                    variant="standard"
                                    name="width"
                                />
                                <p className='text-red-600'>&#8727;</p>
                            </div>
                            {/* End input width */}

                            {/* Description when create request */}
                            <label htmlFor="description"
                                className="block text-sm font-semibold leading-6 text-gray-900">
                                Ghi chú
                            </label>

                            <textarea
                                id="description"
                                name='description'
                                rows="4"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 
                                shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 
                                focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                            />
                        </div>
                        {/* End Details */}

                        <div className="sm:col-span-2 bg-[#DFE9F4]">
                            {/* Product form */}
                            <div className="mt-2.5 text-center flex flex-col gap-10 py-10 px-10">
                                <h1 htmlFor="productCheckbox"
                                    className="font-semibold leading-6 text-gray-900 text-2xl">
                                    Sản Phẩm
                                </h1>

                                {/* Render Product by workspacename */}
                                {availableProducts.map(product => (
                                    <div key={product.id} className="flex gap-20 items-center">
                                        <FormControlLabel
                                            control={<Checkbox />}
                                            sx={{ '& .MuiSvgIcon-root': { fontSize: 28 } }}
                                            onChange={(event) => handleProductSelect(event, product.id)}
                                        />
                                        <label htmlFor={`productCheckbox_${product.id}`} className="text-2xl text-gray-900 w-20">{product.name}</label>
                                        <TextField
                                            id={`productQuantity_${product.id}`}
                                            label="Số lượng"
                                            type="number"
                                            name={`productQuantity_${product.id}`}
                                            variant="outlined"
                                            sx={{ width: 300 }}
                                            inputProps={{ min: 0 }}
                                            value={selectedProducts[product.id]?.quantity || ''}
                                            onChange={(event) => handleProductQuantityChange(event, product.id)}
                                        />
                                        <TextField fullWidth label="Ghi chú" id="fullWidth" />
                                    </div>
                                ))}
                            </div>
                            {/* End Product form */}
                        </div>
                        <button type="submit" className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            Lưu
                        </button>
                    </form>
                    {/* <button type="submit" className='px-4 py-2 border-[2px] bg-cyan-700 hover:bg-cyan-900 text-white'>Add Product</button> */}
                    {/* End Add workspace and Product */}
                </div>

                <div className="mt-10">
                    <button type="submit" className="block w-full rounded-md bg-indigo-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm 
                        hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                        onClick={handleSubmitRequest}
                    >
                        Gửi Báo Giá
                    </button>
                </div>

            </div>
        </div>

    );
}

export default Project;
