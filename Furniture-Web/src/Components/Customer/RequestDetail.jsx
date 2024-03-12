import React, { useEffect } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function RequestDetail({ request }) {

    console.log(request);
    const requestDetail = request.requestDetails;
    const customer = request.customer;
    console.log(customer);
    console.log(requestDetail);

    const workspaceName = request.workspaceName;

    useEffect(async function getNameProduct(workspaceName) {
        try {
            const products = await fetchAvailableProducts(workspaceName);
            setAvailableProducts(products);
        } catch (error) {
            setError({ message: error.message || 'Could not fetch products, please try again later.' });
        }
    }, [])

    if (selectedWorkspace) {
        fetchProducts(selectedWorkspace.workspace_name);
    }

    return (
        <div>
            <h2>Request Detail</h2>
            <h1>Customer: </h1>
            <p>Email: {request.customer.email}</p>
            <p>Phone: {request.customer.phone}</p>
            <p>Full Name: {request.customer.full_name}</p>
            <p>ID: {request.id}</p>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>REQUEST ID</TableCell>
                            <TableCell align="right">Workspace</TableCell>
                            <TableCell align="right">Product</TableCell>
                            <TableCell align="right">Quantity</TableCell>
                            <TableCell align="right">Description</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {requestDetail.map((requested) => (
                            <TableRow
                                key={requested.id}
                                sx={{ '&:last-child td, &:last-child th': { border: 1 } }}
                            >
                                <TableCell component="th" scope="row">
                                    {requested.id}
                                </TableCell>
                                <TableCell align="right">{requested.workspaceName}</TableCell>
                                <TableCell align="right">{requested.product}</TableCell>
                                <TableCell align="right">{requested.quantity}</TableCell>
                                <TableCell align="right">{requested.description}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <span className='text-6xl font-semibold uppercase' >total: {request.price}</span>
        </div>
    );
}

export default RequestDetail;
