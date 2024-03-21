import { Autocomplete, ButtonBase, Table, TableBody, TableCell, TableHead, TableRow, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react'
import { fetchAvailableProducts, fetchAvailableWorkspace } from './http';

function CreateRequest() {

    const [availableWorkspace, setAvailableWorkspace] = useState([]);
    const [availableProducts, setAvailableProducts] = useState([]);
    const [selectedWorkspace, setSelectedWorkspace] = useState(null);
    const [selectedProducts, setSelectedProducts] = useState(null);
    const customer = localStorage.getItem('customer');
    const userData = JSON.parse(customer);
    const [requestDetails, setRequestDetails] = useState([]);
    const [newRows, setNewRows] = useState([]); // State để lưu trữ danh sách các hàng mới

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

    // Hàm xử lý khi form được gửi
    const handleFormSubmit = (event) => {
        event.preventDefault();

        // Lấy các giá trị từ các trường form đã được cập nhật
        const workspaceName = selectedWorkspace ? selectedWorkspace.workspace_name : '';
        const lengthh = event.target.elements.lengthh.value;
        const width = event.target.elements.width.value;
        const quantity = event.target.elements.quantity.value;
        const description = event.target.elements.description.value;

        // Kiểm tra xem các trường cần thiết đã được điền hay chưa
        if (!workspaceName || !lengthh || !width || !quantity || !description) {
            console.log('Vui lòng điền đầy đủ thông tin.');
            return;
        }

        // Chuyển đổi giá trị lengthh, width, và quantity từ chuỗi sang số
        const parsedLength = parseFloat(lengthh);
        const parsedWidth = parseFloat(width);
        const parsedQuantity = parseInt(quantity);

        // Lấy thông tin về sản phẩm đã chọn
        const selectedProductInfo = newRows.map((_, index) => {
            const productId = event.target.elements[`productName-${index}`].value;
            const productQuantity = event.target.elements[`quantity-${index}`].value;
            const productDescription = event.target.elements[`description-${index}`].value;
            return {
                productId: productId,
                productQuantity: productQuantity,
                description: productDescription
            };
        });

        // Tạo một đối tượng mới đại diện cho chi tiết yêu cầu
        const newRequestDetail = {
            workspaceName: workspaceName,
            description: description,
            lengthh: parsedLength,
            width: parsedWidth,
            quantity: parsedQuantity,
            products: selectedProductInfo
        };

        // Thêm chi tiết yêu cầu mới vào mảng requestDetails
        setRequestDetails([...requestDetails, newRequestDetail]);

        console.log(requestDetails);

        // Reset form
        event.target.reset();
        setSelectedProducts(null);
        setNewRows([]); // Reset mảng chứa các hàng mới
    };

    // Thêm hàng mới
    const handleAddRowClick = () => {
        setNewRows([...newRows, {}]);
    };

    return (
        <div>

            {/* Customer Info */}
            <div className='flex flex-col gap-4'>
                <section>
                    <label htmlFor="email" className="block text-xl font-semibold leading-6 text-gray-900 mt-5">Email</label>
                    <div className="flex mt-2.5">
                        <input defaultValue={customer ? userData.email : ''} type="text" name="email" id="last-name" autoComplete="family-name"
                            className="block w-4/12 rounded-md border-0 py-3 text-xl text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 
                                placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 !important"
                            readOnly />
                    </div>
                </section>
                <section>
                    <label htmlFor="fullName" className="block text-xl font-semibold leading-6 text-gray-900 mt-6">
                        Họ và Tên
                    </label>
                    <div className="mt-2.5">
                        <input type="text" name="fullName" id="first-name" autoComplete="given-name"
                            defaultValue={userData ? userData.fullName : ''}
                            className="block w-4/12 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset 
                                    ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 
                                    sm:text-sm sm:leading-6" readOnly />
                    </div>
                </section>
                <section>
                    <label htmlFor="phone" className="block text-2xl font-semibold leading-6 text-gray-900 mt-5">
                        Số điện thoại
                    </label>
                    <div className="mt-2.5">
                        <input type="text" defaultValue={customer ? userData.phone : ''} name="phone" id="phone" autoComplete="organization"
                            className="block w-4/12 rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 
                                ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset 
                                focus:ring-indigo-600 sm:text-sm sm:leading-6" readOnly />
                    </div>
                </section>
                {/* End Customer Info */}
                <form className='mt-20 w-3/4' onSubmit={handleFormSubmit}>

                    <div className='flex flex-row'>
                        <Autocomplete
                            disablePortal
                            id="workspace-combo-box-demo"
                            options={availableWorkspace}
                            getOptionLabel={(option) => option.workspace_name}
                            onChange={(event, newValue) => setSelectedWorkspace(newValue)}
                            renderInput={(params) => <TextField {...params} key={availableWorkspace.id} name="workspaceName"
                                label="Room" variant="outlined" sx={{ width: 300 }} />}
                            fullWidth
                        />
                        {/* get lengthh */}
                        <TextField
                            id="lengthh"
                            type="number"
                            label="Chiều dài"
                            name='lengthh'
                            variant="outlined"
                            inputProps={{ min: 1 }}
                        />
                        {/*  end get lengthh */}

                        {/* get width */}
                        <TextField
                            id="width"
                            type="number"
                            label="Chiều Rộng"
                            name='width'
                            variant="outlined"
                            inputProps={{ min: 1 }}
                        />
                        {/* End get width */}
                    </div>

                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell>Sản Phẩm</TableCell>
                                <TableCell>Số lượng</TableCell>
                                <TableCell>Ghi Chú</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            <TableRow>
                                <TableCell>

                                    {/* Chọn sản phấm */}
                                    <Autocomplete
                                        disablePortal
                                        id="combo-box-demo"
                                        options={availableProducts}
                                        getOptionLabel={(option) => option.name}
                                        getoptionselected={(option, value) => option.id === value.id} // Specify how to compare the selected option with the options in the list
                                        onChange={(event, newValue) => setSelectedProducts(newValue)}
                                        renderInput={(params) => <TextField {...params} name="productName" label="Product" variant="outlined" />}
                                    />
                                </TableCell>

                                <TableCell>
                                    {/* Chọn số lượng */}
                                    <TextField
                                        label="Số lượng"
                                        type="number"
                                        variant="outlined"
                                        name='quantity'
                                        sx={{ width: 300 }}
                                        inputProps={{ min: 0 }}
                                    />
                                </TableCell>

                                <TableCell>
                                    {/* Ghi chú */}
                                    <TextField
                                        type="text"
                                        name='description'
                                        variant="outlined"
                                    />
                                </TableCell>
                            </TableRow>
                            {newRows.map((_, index) => (
                                <TableRow key={`new-${index}`}>
                                    <TableCell>
                                        {/* Chọn sản phẩm */}
                                        <Autocomplete
                                            disablePortal
                                            id={`new-product-combo-box-${index}`}
                                            options={availableProducts}
                                            getOptionLabel={(option) => option.name}
                                            getoptionselected={(option, value) => option.id === value.id} // Specify how to compare the selected option with the options in the list
                                            onChange={(event, newValue) => setSelectedProducts(newValue)}
                                            renderInput={(params) => <TextField {...params} name={`productName-${index}`} label="Product" variant="outlined" />}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {/* Chọn số lượng */}
                                        <TextField
                                            label="Số lượng"
                                            type="number"
                                            variant="outlined"
                                            name={`quantity-${index}`}
                                            sx={{ width: 300 }}
                                            inputProps={{ min: 0 }}
                                        />
                                    </TableCell>
                                    <TableCell>
                                        {/* Ghi chú */}
                                        <TextField
                                            type="text"
                                            name={`description-${index}`}
                                            variant="outlined"
                                        />
                                    </TableCell>
                                </TableRow>
                            ))}
                            <TableRow className='bg-sky-600 text-white text-center hover:cursor-pointer'>
                                <TableCell colSpan={3}>
                                    <div className='w-full' onClick={handleAddRowClick}>
                                        <span className="text-4xl text-white">&#43;</span>
                                    </div>
                                </TableCell>
                            </TableRow>
                        </TableBody>
                    </Table>
                    <button className='px-10 py-5' type='submit'>Submit Form</button>
                </form>
            </div>
        </div>
    )
}

export default CreateRequest