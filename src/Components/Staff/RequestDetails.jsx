import React, { useState, useEffect, useContext } from 'react';
import TextField from '@mui/material/TextField';
import { fetchAvailableWorkspace, fetchAvailableProducts } from './http';
import Cookies from 'js-cookie';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import { ToastContainer, toast } from 'react-toastify';
import { Autocomplete, Button, Checkbox, FormControlLabel } from '@mui/material';
import { CheckBox } from '@mui/icons-material';
import { useParams } from 'react-router-dom';
const label = { inputProps: { 'aria-label': 'Checkbox demo' } };

function RequestDetails() {
    const { id } = useParams();
    const [data, setData] = useState([]);
    const [customerData, setCustomerData] = useState([]);

    const [availableWorkspace, setAvailableWorkspace] = useState([]);
    const [availableProducts, setAvailableProducts] = useState([]);
    const [selectedWorkspace, setSelectedWorkspace] = useState(null);
    const customer = localStorage.getItem('customer');
    const token = Cookies.get('token');
    const userData = JSON.parse(customer);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [requestDetails, setRequestDetails] = useState([]);


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
            const dataResponse = await response.json();
            setData(dataResponse);

            const customerData = dataResponse.customer;
            setCustomerData(customerData);
            console.log(customerData);


            if (data && data.requestDetails && data.requestDetails.length > 0) {
                const updatedSelectedProducts = {};
                const updatedRequestDetails = [];

                data.requestDetails.forEach(requestDetail => {
                    // Cập nhật trạng thái sản phẩm đã chọn và các trường khác từ mỗi chi tiết yêu cầu
                    requestDetail.products.forEach(product => {
                        updatedSelectedProducts[product.productId] = {
                            quantity: product.quantity,
                            description: product.description || '' // Cập nhật mô tả sản phẩm, nếu không có mô tả thì trả về chuỗi rỗng
                        };
                    });

                    // Cập nhật các trường khác từ chi tiết yêu cầu
                    updatedRequestDetails.push({
                        workspaceName: requestDetail.workspaceName,
                        description: requestDetail.description,
                        length: requestDetail.length,
                        width: requestDetail.width
                    });
                });

                // Cập nhật state selectedProducts và requestDetails
                setSelectedProducts(updatedSelectedProducts);
                setRequestDetails(updatedRequestDetails);
            } else {
                console.log('No request details found');
                toast.error('No request details found');
            }
        } catch (error) {
            console.error('Error fetching request details:', error);
        }
    };



    useEffect(() => {
        // Gọi hàm fetchRequestDetails khi component được mount và id thay đổi
        fetchRequestDetails(id);
    }, [id]);


    const handleProductQuantityChange = (event, productId) => {
        const { name, value } = event.target;
        const quantity = parseFloat(value); // Chuyển đổi giá trị từ chuỗi sang số
        setSelectedProducts(prevSelectedProducts => ({
            ...prevSelectedProducts,
            [productId]: {
                ...prevSelectedProducts[productId],
                quantity: quantity
            }
        }));
    };

    const handleProductSelect = (event, productId) => {
        const isChecked = event.target.checked;
        setSelectedProducts(prevSelectedProducts => ({
            ...prevSelectedProducts,
            [productId]: isChecked
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

    const [length, setLength] = useState('');
    const [width, setWidth] = useState('');
    const [description, setDescription] = useState('');
    // get product by workspacename
    useEffect(() => {
        async function fetchProductsByWorkspace() {
            try {
                if (selectedWorkspace) {
                    const products = await fetchAvailableProducts(selectedWorkspace.workspace_name);
                    setAvailableProducts(products);

                    // Kiểm tra và điền thông tin sản phẩm từ request details vào state selectedProducts
                    products.forEach(product => {
                        const existingProduct = requestDetails.find(detail => detail.products.find(p => p.productId === product.id));
                        if (existingProduct) {
                            console.log(existingProduct);
                            setSelectedProducts(prevSelectedProducts => ({
                                ...prevSelectedProducts,
                                [product.id]: {
                                    ...prevSelectedProducts[product.id],
                                    quantity: existingProduct.products.find(p => p.productId === product.id).quantity,
                                    description: existingProduct.products.find(p => p.productId === product.id).description || ''
                                }
                            }));
                        }
                    });

                }
            } catch (error) {
                // setError({ message: error.message || 'Could not fetch products, please try again later.' });
            }
        }

        fetchProductsByWorkspace();
    }, [selectedWorkspace]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRequestDetails(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const updateFormFields = (workspaceName) => {
        // Tìm các chi tiết yêu cầu tương ứng với workspace được chọn
        const selectedRequestDetails = requestDetails.find(detail => detail.workspaceName === workspaceName);

        // Nếu không tìm thấy chi tiết yêu cầu tương ứng, không cần cập nhật form
        if (!selectedRequestDetails) {
            return;
        }

        // Cập nhật các trường trong form dựa trên các chi tiết yêu cầu
        setLength(selectedRequestDetails.length);
        setWidth(selectedRequestDetails.width);
        setDescription(selectedRequestDetails.description);
    };

    // Gọi hàm updateFormFields mỗi khi có sự thay đổi trong workspace được chọn
    useEffect(() => {
        if (selectedWorkspace) {
            updateFormFields(selectedWorkspace.workspace_name);
        }
    }, [selectedWorkspace]);



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

    console.log(requestDetails);
    console.log(requestDetails.id);
    console.log(requestDetails.price);
    console.log(requestDetails.description);
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
                    <div className='CusInfo'>


                        <label htmlFor="id" className="block text-2xl font-semibold leading-6 text-gray-900 mt-5">Mã báo giá:</label>
                        <div className="mt-2.5 justify-center">
                            <input defaultValue={data ? data.id : ''} type="text" name="id"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                                placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" readOnly />
                        </div>
                        <label htmlFor="phone" className="block text-2xl font-semibold leading-6 text-gray-900 mt-5">
                            Giá dự kiến: (vnd)
                        </label>
                        <div className="mt-2.5">
                            <input type="text" defaultValue={data ? data.price : ''} name="price" id="price" autoComplete="0"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 
                                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                                focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                        </div>
                        <label htmlFor="email" className="block text-2xl font-semibold leading-6 text-gray-900 mt-5">Email</label>
                        <div className="mt-2.5 justify-center">
                            <input defaultValue={customerData ? customerData.email : ''} type="text" name="email" id="last-name" autoComplete="family-name"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                                placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                        </div>



                        <label htmlFor="fullName" className="block text-2xl font-semibold leading-6 text-gray-900 mt-6">
                            Họ và Tên
                        </label>
                        <div className="mt-2.5">
                            <input type="text" name="fullName" id="first-name" autoComplete="given-name"
                                defaultValue={customerData ? customerData.full_name : ''}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset 
                                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                                    sm:text-sm sm:leading-6" />
                        </div>



                        <label htmlFor="phone" className="block text-2xl font-semibold leading-6 text-gray-900 mt-5">
                            Số điện thoại
                        </label>
                        <div className="mt-2.5">
                            <input type="text" defaultValue={customerData ? customerData.phone : ''} name="phone" id="phone" autoComplete="organization"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 
                                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                                focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                        </div>
                        <label htmlFor="ID_Card" className="block text-2xl font-semibold leading-6 text-gray-900 mt-5">
                            Mã Căn cước công dân
                        </label>
                        <div className="mt-2.5">
                            <input type="text" defaultValue={customerData ? customerData.id_card : ''} name="idCard"
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 
                                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                                focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                        </div>
                        <label htmlFor="fullName" className="block text-2xl font-semibold leading-6 text-gray-900 mt-6">
                            Địa chỉ
                        </label>
                        <div className="mt-2.5">
                            <input type="text" name="address"
                                defaultValue={customerData ? customerData.address : ''}
                                className="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset 
                                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                                    sm:text-sm sm:leading-6" />
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
                                    id="length"
                                    label="Chiều dài (m)"
                                    variant="outlined"
                                    name="length"
                                    value={length}
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
                                    value={width}
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
                                value={description}
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
                                            control={<Checkbox checked={selectedProducts[product.id]?.quantity > 0} />}
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

export default RequestDetails;