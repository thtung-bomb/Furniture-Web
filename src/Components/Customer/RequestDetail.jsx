import React, { useState, useEffect } from 'react';
import { Card, CardContent, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';
import { getProductDetail } from '../../util/managerHandle';
import { customerConfirmation, customerRejectProposal } from './http.js';
import { formatNumber } from '../../util/helper.js';
import { ToastContainer, toast } from 'react-toastify';

function RequestDetail({ request }) {

    const [showRequestDetails, setShowRequestDetails] = useState(true);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        if (request?.proposal?.file_path) {
            setShowRequestDetails(false);
        }
    }, [request?.proposal?.file_path]);

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
    console.log("customer: ", customer);
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

    const handleConfirm = async (proposalId) => {
        try {
            if (proposalId) {
                console.log('proposalID: ', proposalId);
                await customerConfirmation(proposalId);
                toast.success('Bạn đã chấp nhận hợp đồng, công trình sẽ sớm thực hiện !');
                handleClose();
                // Nếu không có lỗi, đóng dialog và thực hiện các hành động khác nếu cần
                // Thực hiện các hành động khác sau khi xác nhận thành công
            } else {
                console.error('Proposal ID không hợp lệ.');
            }
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
            <ToastContainer />
            {/* Customer Information */}
            <Typography variant="h2" className="text-center">Request Detail</Typography>
            <Card className="w-full mx-auto" >
                <CardContent>
                    <Typography variant="h4" className="mb-2 text-center">Thông tin khách hàng</Typography>
                    <h1 variant="body2" className="mb-2"><span>Họ và tên:</span>
                        <span className='font-semibold'>{customer.full_name}</span></h1>
                    <h1 variant="body2" className="mb-2"><span>Email:</span>
                        <span className='font-semibold'>{customer.email}</span></h1>
                    <h1 variant="body2" className="mb-2"><span>Số Điện Thoại:</span>
                        <span className='font-semibold'>{customer.phone}</span></h1>
                    <h1 variant="body2" className="mb-2"><span>Địa chỉ:</span>
                        <span className='font-semibold'>{customer.address}</span></h1>
                </CardContent>
            </Card>
            {/* End Customer Information */}

            {/* Start Proposal file PDF */}
            {request.employeeRequestStatus === "MANAGER_APPROVED" && (
                <div>
                    <h1 className='text-center text-4xl font-semibold m-9'>Hợp Đồng</h1>
                    <iframe src={request.proposal.file_path} width={700} height={300} />
                    <div className='mt-10'>
                        <Typography variant="h4" className="mb-4 flex gap-3 text-4xl 
                        font-semibold uppercase">Giá: <h1 className='text-indigo-950'>
                                {formatNumber(request.price)}</h1> VND
                        </Typography>
                    </div>

                    {/* Popup xác nhận có chắc chắn không */}
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
                            <Button onClick={() => handleConfirm(request.proposal.id)}>Đồng ý</Button>
                            <Button onClick={handleClose} autoFocus>Hủy</Button>
                        </DialogActions>
                    </Dialog>
                    {/* Popup xác nhận có chắc chắn không */}
                </div>
            )}
            {/* End Proposal file PDF */}

            {/* Request detail table of all infomation about request: Workspace, length, width, product, description*/}
            {showRequestDetails && (
                <div className='mt-10'>
                    <Typography variant="h4" className="mt-10 mb-10 text-center">Chi Tiết</Typography>
                    <TableContainer component={Card}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>REQUEST ID</TableCell>
                                    <TableCell align="right">Workspace</TableCell>
                                    <TableCell align="right">Length</TableCell>
                                    <TableCell align="right">Width</TableCell>
                                    <TableCell align="justify">Product</TableCell>
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
                                        <Table>
                                            <TableCell>
                                                <Table>
                                                    <TableBody>
                                                        {requested.products.map((product, index) => (
                                                            <TableRow key={index}>
                                                                <TableCell>{product.productId}</TableCell>
                                                                <TableCell>{product.quantity}</TableCell>
                                                            </TableRow>
                                                        ))}
                                                    </TableBody>
                                                </Table>
                                            </TableCell>
                                        </Table>
                                        <TableCell align="right">{requested.description}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                    {/* Request detail table of all infomation about request: Workspace, length, width, product, description*/}
                </div>
            )}

            {/* Xác nhận từ chối hay đồng ý cái hợp đồng này */}
            {request.employeeRequestStatus === "MANAGER_APPROVED" && (
                <div className='flex gap-6 items-center justify-center mt-9'>
                    <button className='bg-cyan-600 text-white rounded-xl px-4 py-3 font-semibold'
                        onClick={handleOpen}>Chấp Nhận</button>
                    <button className='bg-cyan-600 text-white rounded-xl px-4 py-3 font-semibold'
                        onClick={handleReject}>Từ Chối</button>
                </div>
            )}
        </div>
    );
}

export default RequestDetail;
