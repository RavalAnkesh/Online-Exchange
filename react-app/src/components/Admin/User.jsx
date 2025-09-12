import React, { useState, useEffect } from "react";
import AHeader from "./AHeader";
import axios from "axios";
import API_URL from "../../constants";

function User() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const response = await axios.get(`${API_URL}/api/users`);
            setUsers(response.data);
        } catch (error) {
            console.error('Error fetching users:', error);
            setError('Error fetching users. Please try again later.');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return <div className="container mt-5">Loading...</div>; // Display a loading indicator while data is being fetched
    }

    if (error) {
        return <div className="container mt-5">Error: {error}</div>; // Display an error message if fetching data fails
    }

    const userCount = users.length; // Count of users

    return (
        <>
            <AHeader />
            <div className="container mt-5 bg-secondary text-white p-4">
                <h2>Total Users: {userCount}</h2>
                <table className="table table-bordered">
                    <thead className="table-dark">
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">Email</th>
                            <th scope="col">Mobile</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map((user, index) => (
                            <tr key={user._id}>
                                <td>{index + 1}</td>
                                <td>{user.username}</td>
                                <td>{user.email}</td>
                                <td>{user.mobile}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default User;
