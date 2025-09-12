/* eslint-disable no-unused-vars */
import React from 'react';
import DeleteProduct from "./DeleteProduct";
import AHeader from "./AHeader";
import User from "./User";
import ProtectedRoutes from './ProtectedRoutes'; // Adjust the path accordingly

function Admin() {
    return (
        <>
      
            <AHeader />
            <DeleteProduct />
      
        </>
    );
}

export default Admin;


