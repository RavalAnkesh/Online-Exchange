import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import API_URL from "../../constants";
import Header from "../Header/Header";
import Categories from "../Categories";
import { FaHeart } from "react-icons/fa";
import './AddProduct.css';
import Footer from "../Footer";

function LikedProducts() {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [likedProducts, setLikedProducts] = useState([]);
    const [refresh, setRefresh] = useState(false);
    const [cProducts, setCProducts] = useState([]);
    const [search, setSearch] = useState('');
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, []);

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = () => {
        const userId = localStorage.getItem('userId');
        const url = API_URL + '/liked-products';
        axios.post(url, { userId })
            .then((res) => {
                if (res.data.products) {
                    setProducts(res.data.products);
                    setLikedProducts(res.data.likedProducts || []); // Ensure likedProducts is always initialized
                    setLoading(false);
                }
            })
            .catch(() => {
                toast.error('Server Error.');
            });
    };

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
        let filteredProducts = products.filter((item) => {
            if (item.category === value) {
                return item;
            }
        });
        setCProducts(filteredProducts);
    };

    const handleLike = (productId, e) => {
        e.stopPropagation();
        let userId = localStorage.getItem('userId');
        if (!userId) {
            toast.error('Please Login first.');
            return;
        }

        const url = API_URL + '/like-product';
        const data = { userId, productId };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    setRefresh(!refresh);
                    toast.success(res.data.message);
                }
            })
            .catch(() => {
                toast.error('Server Error.');
            });
    };

    const handleDisLike = (productId, e) => {
        e.stopPropagation();
        let userId = localStorage.getItem('userId');
        if (!userId) {
            toast.error('Please Login first.');
            return;
        }

        const url = API_URL + '/dislike-product';
        const data = { userId, productId };
        axios.post(url, data)
            .then((res) => {
                if (res.data.message) {
                    setLikedProducts(prevLikedProducts => {
                        return prevLikedProducts.filter(item => item._id !== productId);
                    });
                    setRefresh(!refresh);
                    toast.info(res.data.message); // Changed to toast.info
                }
            })
            .catch(() => {
                toast.error('Server Error.');
            });
    };

    const handleProduct = (id) => {
        navigate('/product/' + id);
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Header search={search} handleSearch={handleSearch} handleClick={handleClick} />
            <Categories handleCategory={handleCategory} />
            <h5>SEARCH RESULTS</h5>
            <div className="d-flex justify-content-center flex-wrap">
                {cProducts && cProducts.length > 0 &&
                    cProducts.map((item, index) => (
                        <div key={item._id} className="card m-3" onClick={() => handleProduct(item._id)}>
                            <div className="icon-con">
                                {likedProducts.find((likedItem) => likedItem._id === item._id) ?
                                    <FaHeart onClick={(e) => handleDisLike(item._id, e)} className="red-icons" /> :
                                    <FaHeart onClick={(e) => handleLike(item._id, e)} className="icons" />
                                }
                            </div>
                            <img width="250px" height="150px" src={API_URL + '/' + item.pimage} alt={item.pname} />
                            <h3 className="m-2 price-text">Rs. {item.price} /-</h3>
                            <p className="m-2">{item.pname} | {item.category}</p>
                        </div>
                    ))}
            </div>

            <h5>ALL RESULTS</h5>

            <div className="d-flex justify-content-center flex-wrap">
                {products && products.length > 0 &&
                    products.map((item, index) => (
                        <div key={item._id} className="card m-3" onClick={() => handleProduct(item._id)}>
                            <div className="icon-con">
                                
                                    <FaHeart onClick={(e) => handleDisLike(item._id, e)} className="blue-icons text-danger"  />
                                        
                                     
                                
                            </div>
                            <img width="250px" height="150px" src={API_URL + '/' + item.pimage} alt={item.pname} />
                            <h3 className="m-2 price-text">Rs. {item.price} /-</h3>
                            <p className="m-2">{item.pname} | {item.category}</p>
                        </div>
                    ))}
            </div>
            <Footer/>
            <ToastContainer 
            position="top-center"/>
        </div>
    );
}

export default LikedProducts;
