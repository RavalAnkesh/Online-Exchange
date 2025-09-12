import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import Categories from "../Categories";
import { FaHeart } from "react-icons/fa";
import API_URL from "../../constants";
import "./AddProduct.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function MyProducts() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [cProducts, setCProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [refresh, setRefresh] = useState(false);

    useEffect(() => {
        const url = API_URL + '/my-products';
        let data = { userId: localStorage.getItem('userId') }
        axios.post(url, data)
            .then((res) => {
                if (res.data.products) {
                    setProducts(res.data.products);
                }
            })
            .catch(() => {
                toast.error('Server Error.');
            });
    }, [refresh]);

    const handleSearch = (value) => {
        setSearch(value);
    };

    const handleClick = () => {
        let filteredProducts = products.filter((item) => {
            if (item.pname.toLowerCase().includes(search.toLowerCase()) ||
                item.pdesc.toLowerCase().includes(search.toLowerCase()) ||
                item.category.toLowerCase().includes(search.toLowerCase())) {
                return item;
            }
        });
        setCProducts(filteredProducts);
    };

    const handleCategory = (value) => {
        let filteredProducts = products.filter((item, index) => {
            if (item.category === value) {
                return item;
            }
        });
        setCProducts(filteredProducts);
    };

    const handleLike = (productId) => {
        let userId = localStorage.getItem('userId');
        const url = API_URL + '/like-product';
        const data = { userId, productId };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    toast.success('Liked.');
                }
            })
            .catch(() => {
                toast.error('Server Error.');
            });
    };

    const handleDelete = (pid) => {
        if (!localStorage.getItem('userId')) {
            toast.error('Please Login First');
            return;
        }
        const url = API_URL + '/delete-product';
        const data = {
            pid,
            userId: localStorage.getItem('userId')
        };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    toast.success('Delete Success.');
                    setRefresh(!refresh);
                }
            })
            .catch(() => {
                toast.error('Server Error.');
            });
    };

    return (
        <div>
            <Header search={search} handlesearch={handleSearch} handleClick={handleClick} />
            <Categories handleCategory={handleCategory} />

            <h5>ALL RESULTS</h5>

            <table className="table ">
                <thead> 
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {products && products.length > 0 &&
                        products.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td><img src={API_URL + '/' + item.pimage} alt={item.pname} className="small-img" style={{ width: '200px', height: '200px' }} /></td>
                                <td>{item.pname}</td>
                                <td>{item.category}</td>
                                <td>RS/- {item.price}</td>
                                <td>
                                    <Link to={`/edit-product/${item._id}`} className="btn btn-info">Edit</Link>
                                    <br/>
                                    <button onClick={() => handleDelete(item._id)} className="btn btn-danger ml-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <h5>FOUND RESULTS</h5>

            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Image</th>
                        <th>Name</th>
                        <th>Category</th>
                        <th>Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {cProducts && cProducts.length > 0 &&
                        cProducts.map((item, index) => (
                            <tr key={item._id}>
                                <td>{index + 1}</td>
                                <td><img src={API_URL + '/' + item.pimage} alt={item.pname} className="small-img" style={{ width: '20px', height: '200px' }} /></td>
                                <td>{item.pname}</td>
                                <td>{item.category}</td>
                                <td>RS/- {item.price}</td>
                                <td>
                                    <Link to={`/edit-product/${item._id}`} className="btn btn-info">Edit</Link>
                                    <br/>
                                    <button onClick={() => handleDelete(item._id)} className="btn btn-danger ml-2">Delete</button>
                                </td>
                            </tr>
                        ))}
                </tbody>
            </table>

            <ToastContainer position="bottom-left" />
        </div>
    );
}

export default MyProducts;
