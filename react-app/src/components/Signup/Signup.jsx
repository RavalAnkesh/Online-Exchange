import React, { useState } from 'react';
import { Link, useNavigate } from "react-router-dom";
import Header from "../Header/Header";
import axios from "axios";
import API_URL from '../../constants';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './Signup.css';
import Footer from "../Footer";

function Signup() {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [mobile, setMobile] = useState('');

  const handleApi = () => {
    // Basic input validation
    if (!username || !password || !email || !mobile) {
      toast.error('Please fill in all fields.');
      return;
    }

    // More specific input validations
    if (password.length < 6) {
      toast.error('Password must be at least 6 characters long.');
      return;
    }

    // Username validation
    const usernameRegex = /^[a-zA-Z\s]*$/;
    if (!usernameRegex.test(username)) {
      toast.error('Username should contain only characters.');
      return;
    }

    // Email validation
      const emailRegex = /^[a-zA-Z][a-zA-Z0-9._-]*@gmail.com$/; // Updated regex
  if (!emailRegex.test(email)) {
    toast.error('Please enter a valid Gmail address.');
    return;
  }

    // Mobile validation
    const mobileRegex = /^[6-9]\d{9}$/; // Updated regex
    if (!mobileRegex.test(mobile)) {
      toast.error('Please enter a valid 10-digit mobile number .');
      return;
    }

    // Server-side validation
    const url = API_URL + '/signup';
    const data = { username, password, mobile, email };

    axios.post(url, data)
      .then((res) => {
        if (res.data.message) {
          toast.success(res.data.message);
          navigate('/login');
        }
      })
      .catch((err) => {
        toast.error('Error signing up. Please try again.');
      });
  };

  const handleMobileChange = (e) => {
    const inputValue = e.target.value;
    // Limit the input to maximum 10 characters
    if (inputValue.length <= 10) {
      setMobile(inputValue);
    }
  };

  return (
    <center>
      <div className="flex justify-center new-container items-center h-screen">
        <Header />
        <div className="p-3 m-3 flex justify-center new-container items-center h-screen">
          <form>
            <div className="mb-3">
              <label htmlFor="username" className="block mb-1">FULL NAME</label>
              <input
                id="username"
                className="form-control"
                type="text"
                placeholder='Enter Your Full Name'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="mobile" className="block mb-1">MOBILE</label>
              <input
                id="mobile"
                className="form-control"
                type="text"
                placeholder='Enter Your 10 Digit Phone Number'
                value={mobile}
                onChange={handleMobileChange}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="email" className="block mb-1">EMAIL</label>
              <input
                id="email"
                className="form-control"
                type="text"
                placeholder='Enter Your Email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-3">
              <label htmlFor="password" className="block mb-1">PASSWORD</label>
              <input
                id="password"
                className="form-control"
                type="password"
                placeholder='Enter Your Password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}           />
            </div>
            <button type="button" className="btn mt-1 btn-primary" onClick={handleApi}>SIGNUP</button>
            <Link className="btn  btn-danger" to="/login">LOGIN</Link>
          </form>

        </div>
        <Footer/>
      </div>

      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

    </center>

  );
}

export default Signup;
