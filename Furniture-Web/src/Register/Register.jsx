import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function Register({ onClick }) {

    const [enterdValue, setEnterdValue] = useState({
        email: '',
        phone: '',
        full_name: '',
    })


    // register customer
    function handleSubmit(event) {
        event.preventDefault();
        console.log(enterdValue);
        // response 
        // const requestData = JSON.stringify(enterdValue);

        // Dùng axios.post('URL', value);
        axios.post('http://localhost:8080/api/v1/user/registerCustomer', enterdValue, {
            headers: {
                'Content-Type': 'application/json'
            }
        })
            .then(response => {
                console.log(response.data); // In ra dữ liệu từ backend
                // Xử lý logic khi đăng ký thành công
            })
            .catch(error => {
                console.error('Error registering customer:', error);
                // Xử lý logic khi xảy ra lỗi
            });
    }

    function handleInputChange(identifer, value) {
        setEnterdValue(prevValues => ({
            ...prevValues,
            [identifer]: value
        }))
    }

    return (
        <div className="login-card">
            <button className="close" id='close' onClick={onClick}>close</button>
            <form className="login-form" action="" onSubmit={handleSubmit}>
                <label htmlFor="username">Username</label>
                <input
                    type="email"
                    id="username"
                    name='email'
                    onChange={(event) => handleInputChange('email', event.target.value)}
                />

                <label htmlFor="telephone">Telephone contact</label>
                <input
                    type="text"
                    id="telephone"
                    name='phone'
                    onChange={(event) => handleInputChange('phone', event.target.value)}
                />

                <label htmlFor="fullName">Full Name</label>
                <input
                    type="text"
                    id="fullName"
                    name='full_name'
                    onChange={(event) => handleInputChange('full_name', event.target.value)}
                />

                <button className="regis-button" id="registerButton">Register For Quote</button>
            </form>
        </div>
    )
}

export default Register