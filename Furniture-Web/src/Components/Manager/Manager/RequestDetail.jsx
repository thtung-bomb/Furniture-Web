import React, { useEffect } from 'react';
import { Popper, Fade, Box } from '@mui/material';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { confirmProposal } from '../../../util/managerHandle.js';

function RequestDetail({ project, close }) {
    console.log(project);
    const customer = project.customer;
    const requestDetail = project.requestDetails;
    const proposal = project.proposal;

    const handleConfirm = async (proposalId) => {
        try {
            console.log(proposalId);
            await confirmProposal(proposalId);
            // console.log(response);
            // Optionally, you can perform further actions based on the response
        } catch (error) {
            console.log(error);
            // Handle error if needed
        }
        // console.log("Clicked");
    };

    return (
        <>
            <button onClick={close} className='px-5 py-3 bg-cyan-700 text-white'>CLose</button>
            <h1>Customer</h1>
            <p>{customer.full_name}</p>
            <p>{customer.email}</p>
            <p>{customer.phone}</p>
            <h1>Project</h1>
            <h1>Project Id: <span>{project.id}</span></h1>
            <h1>Status: {project.employeeRequestStatus}</h1>
            <Table aria-label="collapsible table">
                <TableHead>
                    <TableRow>
                        <TableCell>Project ID</TableCell>
                        <TableCell>Status</TableCell>
                        <TableCell>Price</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {requestDetail.map((item) => (
                        <TableRow key={item.id}>
                            <TableCell>{item.product}</TableCell>
                            <TableCell>{item.quantity}</TableCell>
                            <TableCell>{item.workspaceName}</TableCell>
                            <TableCell>{item.description}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <h1>{proposal.id}</h1>
            <h1>Total: {project.price}</h1>
            <button onClick={() => handleConfirm(proposal.id)} className='px-5 py-3 bg-cyan-700 text-white'><span>Confirm Proposal</span></button>
        </>
    );
}

export default RequestDetail;
