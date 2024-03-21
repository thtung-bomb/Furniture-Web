import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Login.css';

function Login() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const response = await axios.post('http://localhost:8080/api/v1/user/generateToken', {
                username: username,
                password: password
            });

            const token = response.data.token;

            // Lưu token vào cookie với tên là 'token' và thời gian sống là 1 ngày
            Cookies.set('token', token, { expires: 1 });
            // Điều hướng tới trang chính hoặc trang sau khi đăng nhập thành công
            // history.push('/home');
            toast.success('Login Susscessfully')
            getUserProfileAndRedirect();
            // navigate("/customer");
        } catch (error) {
            toast.error('Login unsuccessful. Please check your username and password again.');
        }
    };

    const getUserProfileAndRedirect = async () => {
        await getUserProfile(); // Đợi cho localStorage được cập nhật
        const user = JSON.parse(localStorage.getItem('customer'));
        console.log("user info: ", user);
        const roles = user.roles;

        // Tạo một biến để lưu trữ vai trò cao nhất
        let highestRole = "";

        // Lặp qua mảng roles để tìm vai trò cao nhất
        roles.forEach(element => {
            if (element.includes("ROLE_ADMIN")) {
                highestRole = "ROLE_ADMIN";
            } else if (element === "ROLE_MANAGER" && highestRole !== "ROLE_ADMIN") {
                highestRole = "ROLE_MANAGER";
            } else if (element === "ROLE_STAFF" && highestRole !== "ROLE_ADMIN" && highestRole !== "ROLE_MANAGER") {
                highestRole = "ROLE_STAFF";
            } else if (element === "ROLE_CUSTOMER" && highestRole !== "ROLE_ADMIN" && highestRole !== "ROLE_MANAGER" && highestRole !== "ROLE_STAFF") {
                highestRole = "ROLE_CUSTOMER";
            }
        });

        // Dựa vào vai trò cao nhất, chuyển hướng người dùng đến trang tương ứng
        switch (highestRole) {
            case "ROLE_ADMIN":
                navigate("/admin");
                break;
            case "ROLE_MANAGER":
                navigate("/manager");
                break;
            case "ROLE_STAFF":
                navigate("/staff");
                break;
            case "ROLE_CUSTOMER":
                navigate("/customer");
                break;
        }
    }

    const getUserProfile = async () => {
        try {
            const token = Cookies.get('token')
            const response = await axios.get('http://localhost:8080/api/v1/user/auth/userProfile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            localStorage.setItem('customer', JSON.stringify(response.data));
            // console.log(localStorage.getItem('customer'));
        } catch (error) {
            // toast.info('Infor was load');
        }
    }

    return (
        <div className='h-[540px] flex items-center justify-center formLogin'>
            <div className='bg-sky-950 p-6 rounded-md shadow-md w-80'>
                <h2 className='text-white text-5xl font-semibold mb-6'>Login</h2>
                <div className='mb-4'>
                    <label className='text-white block mb-1'>Email:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} className='w-full px-3 py-2 rounded-md bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-300' />
                </div>
                <div className='mb-4'>
                    <label className='text-white block mb-1'>Password</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='w-full px-3 py-2 rounded-md bg-white text-gray-800 focus:outline-none focus:ring focus:ring-blue-300' />
                </div>
                <button className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors' onClick={handleLogin}>Login</button>
            </div>
            {/* {error && <ToastContainer />} */}
            <ToastContainer position='bottom-center' />


        </div>
    );

}

export default Login;
