



// eslint-disable-next-line no-unused-vars
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import API_URL from "../../constants";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function DeleteProduct() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        fetchProducts();
    }, [refresh]);

    const fetchProducts = () => {
        const url = API_URL + '/get-products';
        axios.get(url)
            .then((res) => {
                if (res.data.products) {
                    setProducts(res.data.products);
                }
            })
            // eslint-disable-next-line no-unused-vars
            .catch((err) => {
                toast.error('Server Error. Failed to fetch products.');
            });
    };

    const handleDelete = (pid) => {
        if (!localStorage.getItem('userId')) {
            toast.error('Please Login First');
            return;
        }
        const url = API_URL + '/delete-producta';
        axios.post(url, { pid })
            .then((res) => {
                if (res.data.message === 'success.') {
                    toast.success('Product deleted successfully.');
                    setRefresh(!refresh);
                } else {
                    toast.error('Product Succesfully Deleted .');
                }
            })
            .catch(() => {
                toast.error('Plaese Refresh page .');
            });
    };

    return (
        <div>
            <div className="container">
                <div className="row">
                    {products.map((item) => (
                        <div key={item._id} className="col-md-4 mb-4">
                            <div className="card">
                                <img src={`${API_URL}/${item.pimage}`} alt={item.pname} className="card-img-top" />
                                <div className="card-body">
                                    <h5 className="card-title text-danger">{item.pname}</h5>
                                    <p className="card-text text-success">Category: {item.category}</p>
                                    <p className="card-text text-black">Price: {item.price}</p>
                                    <button onClick={() => handleDelete(item._id)} className=" bg-primary">Delete Product </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <ToastContainer 
            position="top-center"/>
        </div>
    );
}

export default DeleteProduct;
