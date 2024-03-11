import React, { useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
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
            navigate("/customer");
        } catch (error) {
            setError('Đăng nhập không thành công. Vui lòng kiểm tra lại tên đăng nhập và mật khẩu.');
        }
    };

    const getUserProfile = async () => {
        try {
            const token = Cookies.get('token')
            const response = await axios.get('http://localhost:8080/api/v1/user/auth/userProfile', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            });
            const customer = localStorage.setItem('customer', JSON.stringify(response.data));
            console.log(customer);
        } catch (error) {
            setError('');
        }
    }

    useEffect(() => {
        getUserProfile();
    }, []);

    return (
        <div>
            <h2>Login</h2>
            <div>
                <label>Email:</label>
                <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
            </div>
            <div>
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <button onClick={handleLogin}>Login</button>
            {error && <div>{error}</div>}
        </div>
    );
}

export default Login;
