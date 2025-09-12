import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function ProtectedRoutes(props) {
    const { Component } = props;
    const navigate = useNavigate();

    useEffect(() => {
        const role = localStorage.getItem('Role');
        const token = localStorage.getItem('token');

        if (token) {
            if (role == 'USER') {
                navigate('/pagenotfound');
            }
        } else {
            navigate('/pagenotfound');
        }
    }, [navigate]);

    return (
        <>
        
            <Component />
        </>
    );
}

export default ProtectedRoutes;

