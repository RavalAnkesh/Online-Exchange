import { Link, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import Header from "./Header/Header";
import Footer from "./Footer";
import axios from "axios";
import API_URL from "../constants";
import { FiLogOut } from "react-icons/fi";

function MyProfile() {
    const [user, setUser] = useState({});
    const navigate = useNavigate(); 

    useEffect(() => {
        fetchUserProfile();
    }, []);

    const fetchUserProfile = () => {
        let url = API_URL + '/my-profile/' + localStorage.getItem('userId');
        axios.get(url)
            .then((res) => {
                console.log(res.data);
                if (res.data.user) {
                    setUser(res.data.user);
                }
            })
            .catch((err) => {
                alert('Server Error');
            });
    };

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    }

    return (
        <div>
            <center>
                <Header />
                <div className="m-3 p-3 text-info ">
                    <h3 className="text-center text-info mt-2 text-2xl font-bold">Welcome, {user.username}!</h3>
                    <h4 className="text-center text-warning mb-4">Here are your profile details:</h4>
                    <table className="table-auto border border-collapse border-gray-800 mx-auto mt-4">
                        <thead>
                            <tr className="bg-secondary">
                                <th className="border border-gray-800 px-4 py-2">USERNAME</th>
                                <th className="border border-gray-800 px-4 py-2">EMAIL ID</th>
                                <th className="border border-gray-800 px-4 py-2">MOBILE</th>
                                <th className="border border-gray-800 px-4 py-2">LOGOUT</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr className="bg-gray ">
                                <td className="border border-gray-800 px-4 py-2">{user.username}</td>
                                <td className="border border-gray-800 px-4 py-2">{user.email}</td>
                                <td className="border border-gray-800 px-4 py-2">{user.mobile}</td>
                                <td className="border border-gray-800 px-4 py-2">
                                    <button onClick={handleLogout} className=" text-white font-bold py-2 px-4 rounded bg-primary"><FiLogOut /></button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
                <Footer/>
            </center>
        </div>
    );
}

export default MyProfile;
