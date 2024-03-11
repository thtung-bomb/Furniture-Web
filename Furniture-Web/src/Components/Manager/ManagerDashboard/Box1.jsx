// import React from 'react';

// // Dữ liệu cứng về doanh số của từng nhân viên
// const employeeSalesData = [
//     { id: 1, name: 'John Doe', sales: 15000 },
//     { id: 2, name: 'Jane Smith', sales: 20000 },
//     { id: 3, name: 'Alice Johnson', sales: 18000 },
//     // Thêm dữ liệu cho các nhân viên khác nếu cần
// ];

// function Box1() {
//     return (
//         <div className="home box bg-white h-full w-full rounded-lg shadow-md p-4">
//             <h2 className="text-4xl font-bold my-8">Employee Sales Data</h2>
//             <div className="flex flex-col">
//                 {employeeSalesData.map((employee, index) => (
//                     <div key={employee.id} className={`flex justify-between items-center border-b border-gray-300 py-2 ${index !== employeeSalesData.length - 1 ? 'mb-4' : ''}`}>
//                         <span className="text-2xl text-gray-900">{employee.name}</span> {/* Tên nhân viên to hơn với text-lg và màu text-gray-900 */}
//                         <span className="text-xl text-green-500">${employee.sales}</span> {/* Doanh số to hơn với text-lg và màu text-green-500 */}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default Box1;


import React, { useEffect, useState } from 'react';

function Box1() {
    const [employeeSalesData, setEmployeeSalesData] = useState([]);

    useEffect(() => {
        const fetchEmployeeSalesData = async () => {
            try {
                const response = await fetch('http://localhost:8080/api/v1/dashboard/staffRequests');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setEmployeeSalesData(data);
            } catch (error) {
                console.error('Error fetching employee sales data:', error);
            }
        };

        fetchEmployeeSalesData();
    }, []);

    return (
        <div className="home box bg-white h-full w-full rounded-lg shadow-md p-4">
            <h2 className="text-4xl font-bold my-8">Employee Sales Data</h2>
            <div className="flex flex-col">
                {employeeSalesData.map((employee, index) => (
                    <div key={index} className={`flex justify-between items-center border-b border-gray-300 py-2 ${index !== employeeSalesData.length - 1 ? 'mb-4' : ''}`}>
                        <span className="text-2xl text-gray-900">{employee[0]}</span> {/* Tên nhân viên to hơn với text-lg và màu text-gray-900 */}
                        <span className="text-xl text-green-500">${employee[1]}</span> {/* Doanh số to hơn với text-lg và màu text-green-500 */}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Box1;
