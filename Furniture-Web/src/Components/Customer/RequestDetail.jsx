import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { getProductDetail } from '../../util/managerHandle';
import { customerConfirmation, customerRejectProposal } from './http.js';

function RequestDetail({ request, closePopup }) {

    const [open, setOpen] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleOpen = () => {
        setOpen(true);
    }

    console.log(request);

    const [productDetails, setProductDetails] = useState({}); // State to store product details
    const proposal = request.proposal;
    console.log("proposal:  ", proposal);

    const requestDetail = request.requestDetails;
    const customer = request.customer;
    console.log("Request Detail", requestDetail);

    useEffect(() => {
        const fetchProductDetails = async () => {
            const details = {};
            for (const requested of requestDetail) {
                try {
                    const productDetail = await getProductDetail(requested.product);
                    details[requested.product] = productDetail;
                } catch (error) {
                    console.error(`Error fetching product details for product ID ${requested.product}:`, error);
                    // Handle the error as needed 
                    details[requested.product] = { name: 'Error', price: 'Error' };
                }
            }
            setProductDetails(details);
        };

        fetchProductDetails();
    }, [requestDetail]);

    const getProductName = (productId) => {
        // Get product name from productDetails
        const product = productDetails[productId];
        return product ? product.name : 'Loading...';
    };

    const getProductPrice = (productId) => {
        // Get product price from productDetails
        const product = productDetails[productId];
        return product ? product.price : 'Loading...';
    };

    const handleConfirm = async (proposalId) => {
        try {
            await customerConfirmation(proposalId);
            handleClose();
            // Nếu không có lỗi, đóng dialog và thực hiện các hành động khác nếu cần
            // Thực hiện các hành động khác sau khi xác nhận thành công
        } catch (error) {
            console.error('Error confirming proposal:', error);
            // Xử lý lỗi nếu cần
        }
    }

    const handleReject = async (proposalId) => {
        try {
            await customerRejectProposal(proposalId);
            handleClose();
            // Nếu không có lỗi, đóng dialog và thực hiện các hành động khác nếu cần
            // Thực hiện các hành động khác sau khi xác nhận thành công
        } catch (error) {
            console.error('Error confirming proposal:', error);
            // Xử lý lỗi nếu cần
        }
    }

    return (
        <div className="p-6">
            <Card className="w-full mx-auto">
                <CardContent>
                    <Typography variant="h5" className="mb-4">Request Detail</Typography>
                    <Typography variant="body2 h5" className="mb-2">Customer</Typography>
                    <Typography variant="body2" className="mb-2">Email: {customer.email}</Typography>
                    <Typography variant="body2" className="mb-2">Phone: {customer.phone}</Typography>
                </CardContent>
            </Card>
            <Typography variant="h6" className="mt-6 mb-4">Request Details</Typography>
            <TableContainer component={Card}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>REQUEST ID</TableCell>
                            <TableCell align="right">Workspace</TableCell>
                            <TableCell align="right">Length</TableCell>
                            <TableCell align="right">Width</TableCell>
                            <TableCell align="right">Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {requestDetail.map((requested) => (
                            <TableRow key={requested.id}>
                                <TableCell>{requested.id}</TableCell>
                                <TableCell align="right">{requested.workspaceName}</TableCell>
                                <TableCell align="right">{requested.length}</TableCell>
                                <TableCell align="right">{requested.width}</TableCell>
                                <TableCell align="right">{requested.description}</TableCell>
                                {/* Hiển thị danh sách các sản phẩm */}
                                <ul className='flex flex-col'>
                                    {requested.products.map((product, index) => (
                                        <li key={index}>
                                            Product: {product.productId},
                                            Quantity: {product.quantity}
                                        </li>
                                    ))}
                                </ul>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>

            {request.employeeRequestStatus === "MANAGER_APPROVED" && (
                <div>
                    <iframe src={request.proposal.file_path} width={700} height={300} />
                    <Typography variant="h6" className="mt-6 mb-4 text-2xl font-semibold uppercase">Giá:</Typography>
                    <Typography variant="h3" className="text-black font-semibold">{request.price}</Typography>
                    <div className='flex gap-6 items-center justify-center'>
                        <button className='bg-cyan-600 text-white rounded-xl px-4 py-3 font-semibold' onClick={handleOpen}>Chấp Nhận</button>
                        <button className='bg-cyan-600 text-white rounded-xl px-4 py-3 font-semibold' onClick={handleReject}>Từ Chối</button>
                    </div>
                    <Dialog
                        open={open}
                        onClose={handleClose}
                        aria-labelledby="alert-dialog-title"
                        aria-describedby="alert-dialog-description"
                    >
                        <DialogTitle id="alert-dialog-title" fontSize={20}>
                            {"Xác nhận báo giá"}
                        </DialogTitle>
                        <DialogContent>
                            <DialogContentText id="alert-dialog-description">
                                <h1 className='text-2xl'>Bạn chấp nhận bản báo giá này</h1>
                            </DialogContentText>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={handleConfirm}>Đồng ý</Button>
                            <Button onClick={handleClose} autoFocus>Hủy</Button>
                        </DialogActions>
                    </Dialog>
                </div>
            )}
        </div>
    );
}

export default RequestDetail;
