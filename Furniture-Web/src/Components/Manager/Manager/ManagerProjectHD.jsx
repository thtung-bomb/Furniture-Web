import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import { Pagination } from '@mui/material';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getRequestOfCustomer, unlockRequest } from '../../../util/managerHandle';
import RequestDetail from './RequestDetail';


function ManagerProjectHD() {

    const [projects, setProjects] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // Thêm state để lưu trữ số trang hiện tại
    const [selectedProject, setSelectedProjects] = useState(null); // Thêm state


    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getRequestOfCustomer(currentPage, 6, 'PROPOSAL_AWAITING_APPROVAL');
                setProjects(response); // Lưu kết quả từ API vào state
                console.log(response);
            } catch (error) {
                console.log(error);
            }
        }

        fetchData();
    }, [currentPage]);

    const handlePageChange = (event, page) => {
        setCurrentPage(page); // Cập nhật state currentPage khi chuyển trang
    };



    console.log("Projectssss", projects);

    const handleRowClick = (project) => {
        setSelectedProjects(project);
    }

    const handleClose = async (requestId) => {
        try {
            await unlockRequest(requestId); // Wait for the unlockRequest function to finish
            setSelectedProjects(null); // Close the popup after unlocking
        } catch (error) {
            console.log(error);
        }
    }

    // const unlockRequestDetail = async (requestId) => {
    //     try {
    //         unlockRequest(requestId)
    //     } catch (error) {
    //         console.log(error);
    //     }
    // }

    return (
        <div className='flex flex-col w-5/6'>
            <TableContainer component={Paper}>
                <Table aria-label="collapsible table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Project ID</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Price</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {projects.map((project) => (
                            <TableRow key={project.id} onClick={() => handleRowClick(project)}>
                                <TableCell>{project.id}</TableCell>
                                <TableCell>{project.employeeRequestStatus}</TableCell>
                                <TableCell>{project.price}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <Pagination count={10} onChange={handlePageChange} color='secondary' />
            {selectedProject && (
                <RequestDetail project={selectedProject} close={() => handleClose(selectedProject.id)} />
            )}
        </div>
    );
}

export default ManagerProjectHD