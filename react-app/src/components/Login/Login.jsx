
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
import Footer from "../Footer";
import API_URL from '../../constants';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function Login() {
    const navigate = useNavigate();

    const [identifier, setIdentifier] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleApi = () => {
        setLoading(true);

        // Basic input validation
        if (!identifier || !password) {
            toast.error('Please enter both email and password.');
            setLoading(false);
            return;
        }

        const url = API_URL + '/login';
        const data = { identifier, password };
        axios.post(url, data)
            .then((res) => {
                console.log(res);
                const { message, token, role } = res.data;
                if (message && token && role) {
                    localStorage.setItem('token', token);
                    localStorage.setItem('userId', res.data.userId);
                    localStorage.setItem('userName', res.data.username);
                    localStorage.setItem('Role', role);
                    
                    if (role === 'USER') {
                        navigate("/");
                    } else if (role === 'ADMIN') {
                        navigate("/admin");
                    } else {
                        toast.error('Unknown role');
                    }
                } else {
                    toast.error('Invalid credentials or role not provided');
                }
            })
            .catch((err) => {
                console.error('Server error:', err);
                toast.error('Enter Correct Email or Password Please.....');
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <center>
            <div className="flex justify-center new-container items-center h-screen">
                <div>
                    <Header />
                    <div className="p-3 m-3">
                        <div className="mt-4">
                            <label htmlFor="identifier" className="block text-sm mb-1">EMAIL</label>
                            <input
                                id="identifier"
                                className="form-control"
                                type="text"
                                placeholder='Enter Your Email Address'
                                value={identifier}
                                onChange={(e) => setIdentifier(e.target.value)}
                            />
                        </div>
                        <div className="mt-4">
                            <label htmlFor="password" className="block text-sm mb-1">PASSWORD</label>
                            <input
                                id="password"
                                className="form-control"
                                type="password"
                                placeholder='Enter Your Password'
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button className="btn mt-4 btn-primary" onClick={handleApi} disabled={loading}>
                            {loading ? 'Logging in...' : 'LOGIN'}
                        </button>
                        <Link className="btn btn-danger mt-2" to="/signup">SIGNUP</Link>
                    </div>
                    <ToastContainer position="top-center" />
                </div>
                <Footer />
            </div>
        </center>
    );
}

export default Login;
