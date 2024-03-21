import React, { useState, useEffect, useContext } from 'react';
import TextField from '@mui/material/TextField';
import { fetchAvailableWorkspace, fetchAvailableProducts } from './http';
import Cookies from 'js-cookie';
import axios from 'axios';
import SendIcon from '@mui/icons-material/Send';
import { Toaster } from 'react-hot-toast';
import { ToastContainer, toast } from 'react-toastify';
import {
    Autocomplete, Box, Button, Checkbox,
    FormControlLabel, Modal, Paper,
    Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Typography
} from '@mui/material';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '80%',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

function Project() {

    const [availableWorkspace, setAvailableWorkspace] = useState([]);
    const [availableProducts, setAvailableProducts] = useState([]);
    const [selectedWorkspace, setSelectedWorkspace] = useState(null);
    const customer = localStorage.getItem('customer');
    const token = Cookies.get('token');
    const userData = JSON.parse(customer);
    const [selectedProducts, setSelectedProducts] = useState([]); // State lưu các sản phẩm được chọn
    // Thêm state để theo dõi trạng thái của form
    const [formResetFlag, setFormResetFlag] = useState(false);

    const [requestDetails, setRequestDetails] = useState([]);
    const [productNames, setProductNames] = useState({});

    // Close and Open modal display Request
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
            toast.error("Hãy điền đầy đủ dữ liệu vào các ô");
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

        // Thông báo thành công
        toast.success("Đã lưu vào yêu cầu báo giá.");

        // Reset form
        resetFormAndQuantity();
    };

    // Function to reset form and quantity of products
    const resetFormAndQuantity = () => {
        setFormResetFlag(true);
        setSelectedProducts({});
    };


    // Đặt formResetFlag lại thành false sau khi form được render lại thành công
    useEffect(() => {
        if (formResetFlag) {
            setFormResetFlag(false);
        }
        console.log("Request Detail sau khi bam luu", requestDetails);
    }, [formResetFlag]);

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
            toast.error("Không thể gửi yêu cầu trống");
            return;
        }

        console.log('Request Details sent successfully');
        toast.success('Yêu cầu được gửi thành công, chúng tôi sẽ xử lý nhanh nhất có thể !')
        // Reset requestDetails sau khi gửi thành công
        setRequestDetails([]);
    };

    // Simulated function to fetch product name based on product ID
    const fetchProductName = async (productId) => {
        try {
            // Gửi yêu cầu GET đến endpoint với productId
            const response = await axios.get(`http://localhost:8080/api/v1/product/${productId}`);

            // Trích xuất tên sản phẩm từ phản hồi
            const productName = response.data.name;

            // Trả về tên sản phẩm
            return productName;
        } catch (error) {
            console.error("Error fetching product name:", error);
            // Trả về null hoặc một giá trị mặc định khác nếu có lỗi xảy ra
            return null;
        }
    };


    useEffect(() => {
        const fetchProductNames = async () => {
            const names = {};
            for (const detail of requestDetails) {
                for (const product of detail.products) {
                    if (!productNames[product.productId]) {
                        const name = await fetchProductName(product.productId);
                        names[product.productId] = name;
                    }
                }
            }
            setProductNames(names);
        };
        fetchProductNames();
    }, [requestDetails]);



    return (

        <div className='flex flex-col gap-6 border-[2px] absolute'>

            {/* Show message when success or fail to send request */}
            <ToastContainer position='top-right' />
            {/* Show message when success or fail to send request */}

            <div>
                <div onClick={handleOpen} className='bg-cyan-600 px-4 py-4 w-52 rounded-full 
                font-semibold cursor-pointer text-centerhover:bg-cyan-950 text-white mr-20 mt-5 
                ml-auto transition-transform'>
                    Yêu cầu đã tạo
                </div>
            </div>

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
                    <form key={formResetFlag ? 'reset' : 'normal'} className="mt-16 max-w-xl sm:mt-20 
                    flex flex-row gap-5" onSubmit={handleFormSubmit}>
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
                            <div className='text-center'>
                                <button type="submit" className="block w-[50%] mx-auto rounded-md bg-indigo-600 px-3.5 py-2.5 
                                text-center text-2xl font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline 
                                focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 bottom-0">
                                    Lưu
                                </button>
                            </div>
                            {/* End Product form */}
                        </div>
                    </form>
                    {/* <button type="submit" className='px-4 py-2 border-[2px] bg-cyan-700 hover:bg-cyan-900 text-white'>Add Product</button> */}
                    {/* End Add workspace and Product */}
                </div>

                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <Typography id="modal-modal-title" variant="h6" component="h2">
                            <h1 className='text-4xl font-semibold text-cyan-800'>Yêu cầu báo giá</h1>
                        </Typography>
                        <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                            {requestDetails.length > 0 ? (<TableContainer component={Paper}>
                                <Table sx={{ minWidth: 800 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>Workspace</TableCell>
                                            <TableCell align="right">Width</TableCell>
                                            <TableCell align="right">Length</TableCell>
                                            <TableCell align="right">Product</TableCell>
                                            <TableCell align="right">Quantity</TableCell>
                                            <TableCell align="right">Description</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {requestDetails.map((detail, index) => (
                                            <TableRow key={index}>
                                                <TableCell component="th" scope="row">{detail.workspaceName}</TableCell>
                                                <TableCell align="right">{detail.width}</TableCell>
                                                <TableCell align="right">{detail.length}</TableCell>
                                                <TableCell align="right">
                                                    <Table>
                                                        <TableBody>
                                                            {detail.products.map((product, idx) => (
                                                                <TableRow key={idx}>
                                                                    {/* Call fetchProductName to get the product name */}
                                                                    <TableCell align='right'>
                                                                        {product.productId}
                                                                    </TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableCell>
                                                <TableCell align="right">
                                                    <Table>
                                                        <TableBody>
                                                            {detail.products.map((product, idx) => (
                                                                <TableRow key={idx}>
                                                                    <TableCell align='right'>{product.quantity}</TableCell>
                                                                </TableRow>
                                                            ))}
                                                        </TableBody>
                                                    </Table>
                                                </TableCell>
                                                <TableCell align="right">
                                                    {detail.description}
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>) : <h1 className='text-2xl font-semibold text-red-700'>
                                Bạn chưa tạo bất cứ yêu cầu nào !
                            </h1>}
                        </Typography>
                    </Box>
                </Modal>
                <div className="mt-10">
                    <Button variant="contained" size='large' onClick={handleSubmitRequest} endIcon={<SendIcon />}>
                        <h1 className='text-xl font-semibold'>Gửi Báo Giá </h1>
                    </Button>
                </div>
            </div>
        </div>

    );
}

export default Project;
