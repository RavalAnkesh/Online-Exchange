import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { IoHome } from "react-icons/io5";
import axios from 'axios';
import { LuLogOut } from "react-icons/lu";

function AHeader(props) {
    const [userDetails, setUserDetails] = useState({});
    const [productCount, setProductCount] = useState(0);
    const navigate = useNavigate();

    useEffect(() => {
        // Fetch user details and product count
        // Example:
        // axios.get('your_api_endpoint')
        //     .then((response) => {
        //         setUserDetails(response.data.userDetails);
        //         setProductCount(response.data.productCount);
        //     })
        //     .catch((error) => {
        //         console.error('Error fetching data:', error);
        //     });
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    }

    return (
        <div className="header">
            <Link className='links' to="/admin/"> <IoHome /> HOME </Link>
            <Link className='links' to="/User">User Details</Link>
            <button onClick={handleLogout} className='bg-black'><LuLogOut /></button>
        </div>
    );
}

export default AHeader;
