import React, { useEffect, useState } from 'react';
import { Pagination } from '@mui/material';
import { Link } from 'react-router-dom';
import { getRequestByCustomer } from './http';
import Cookies from 'js-cookie';
import RequestDetail from './RequestDetail';

function MainContent() {

    const [requests, setRequests] = useState([]);
    const [selectedRequest, setSelectedRequest] = useState(null); // Lưu trữ request được chọn


    const token = Cookies.get('token');

    useEffect(() => {
        const fetchRequests = async () => {
            try {
                const response = await getRequestByCustomer(1, 6, token);
                // Kiểm tra response trước khi truy cập thuộc tính data
                setRequests(response);
                console.log(requests);
            } catch (error) {
                console.error('Error fetching requests:', error);
            }
        };

        fetchRequests(); // Gọi hàm fetchRequests
    }, []);

    const handleRequestClick = (request) => {
        setSelectedRequest(request); // Lưu trữ request được chọn vào state
        // history.push(`/request/${request.id}`); // Chuyển đến route RequestDetails và truyền ID của request
    };

    return (
        <div className='flex flex-col gap-5'>
            <ul className='mt-10'>
                {requests.map(request => (
                    <li key={request.id} className='border-[2px] px-10 py-6 border-cyan-800 
                    hover:cursor-pointer hover:bg-slate-200' onClick={() => handleRequestClick(request)}>
                        <p>{request.id}</p>
                        <p className='text-rose-700'>{request.customerRequestStatus}</p>
                    </li>
                ))}
            </ul>
            <div className="h-[700px]">
                <div className="p-20 border-gray-800">
                    <div className="grid grid-cols-2 gap-4 mb-4 rounded-full">
                        <Link to='manager'>
                            <div className="flex items-center justify-center bg-gray-200 h-28 dark:bg-gray-800 cursor-pointer rounded-2xl hover:bg-gray-300">
                                <p className="text-2xl text-gray-400 dark:text-gray-500">
                                    <svg className="w-3.5 h-3.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 18">
                                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 1v16M1 9h16" />
                                    </svg>
                                </p>
                            </div>
                        </Link>
                    </div>
                </div>
            </div>

            {selectedRequest && <RequestDetail request={selectedRequest} />} {/* Sử dụng RequestDetail và truyền đối tượng request */}

            <Pagination count={10} color="secondary" size="large" className='text-8xl' />

        </div >
    )
}

export default MainContent