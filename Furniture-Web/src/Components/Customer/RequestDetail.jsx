import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { fetchAvailableProducts } from './http';
function RequestDetail({ request }) {

    console.log(request);
    const requestDetail = request.requestDetails;
    const customer = request.customer;

    return (
        <div>
            <h2>Request Detail</h2>
            <h1>Customer: </h1>
            <p>Email: {customer.email}</p>
            <p>Phone: {customer.phone}</p>
            <p>Full Name: {customer.full_name}</p>
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
                                <TableCell align="right">{requested.product}</TableCell> {/* Lấy ra được ID product */}
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
