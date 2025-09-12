import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from "../Header/Header";
import Footer from "../Footer";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import categories from "../CategoriesList";
import API_URL from "../../constants";
import "./AddProduct.css";

function AddProduct() {
    const navigate = useNavigate();
    const [pname, setPname] = useState('');
    const [pdesc, setPdesc] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [pimage, setPimage] = useState('');
    const [pimage2, setPimage2] = useState('');
    const [errors, setErrors] = useState({});

    useEffect(() => {
        if (!localStorage.getItem("token")) {
            navigate("/login");
        }
    }, []);

    const handleApi = () => {
        const errors = validateForm();
        if (Object.keys(errors).length === 0) {
            // Form is valid, proceed with API call
            navigator.geolocation.getCurrentPosition((position) => {
                const formData = new FormData();
                formData.append('plat', position.coords.latitude)
                formData.append('plong', position.coords.longitude)
                formData.append('pname', pname)
                formData.append('pdesc', pdesc)
                formData.append('price', price)
                formData.append('category', category)
                formData.append('pimage', pimage)
                formData.append('pimage2', pimage2)
                formData.append('userId', localStorage.getItem('userId'))

                const url = API_URL + '/add-product';
                axios.post(url, formData)
                    .then((res) => {
                        if (res.data.message) {
                            toast.success(res.data.message);
                            navigate('/')
                        }
                    })
                    .catch((err) => {
                        toast.error('Server error');
                    })
            })
        } else {
            // Display validation errors using Toastify
            Object.values(errors).forEach(error => toast.error(error));
        }
    }

    const validateForm = () => {
        let errors = {};

        if (!pname.trim()) {
            errors.pname = "Product name is required";
        } else if (!/^[a-zA-Z\s]*$/.test(pname)) {
            errors.pname = "Product name should contain only letters and spaces";
        }

        if (!pdesc.trim()) {
            errors.pdesc = "Product description is required";
        } else if (!/^[a-zA-Z\s]*$/.test(pdesc)) {
            errors.pdesc = "Product description should contain only letters and spaces";
        }

        if (!price.trim()) {
            errors.price = "Product price is required";
        } else if (isNaN(price) || +price <= 0) {
            errors.price = "Enter a valid positive number for price";
        }

        if (!category.trim()) {
            errors.category = "Product category is required";
        }

        if (!pimage) {
            errors.pimage = "Product image is required";
        }

        if (!pimage2) {
            errors.pimage2 = "Second product image is required";
        }

        return errors;
    };

    return (
        <div className="new-container">
            <Header />
            <center>
                <div className="p-3">
                    <h2 className="h2"> ADD PRODUCT HERE : </h2>
                    <label> Product Name </label>
                    <input className="form-control" type="text" value={pname}
                        onChange={(e) => { setPname(e.target.value) }} placeholder='Enter Product Name'/>
                    {errors.pname && <span className="error">{errors.pname}</span>}
                    <label> Product Description </label>
                    <input className="form-control" type="text" value={pdesc}
                        onChange={(e) => { setPdesc(e.target.value) }} placeholder='Enter Product Description'/>
                    {errors.pdesc && <span className="error">{errors.pdesc}</span>}
                    <label> Product Price</label>
                    <input className="form-control" type="text" value={price}
                        onChange={(e) => { setPrice(e.target.value) }} placeholder='Enter Product Price'/>
                    {errors.price && <span className="error">{errors.price}</span>}
                    <label> Product Category </label>
                    <select className="form-control"  value={category}
                        onChange={(e) => { setCategory(e.target.value) }} >
                        <option value="" disabled>Select Product Type.....</option>
                        {
                            categories && categories.length > 0 &&
                            categories.map((item, index) => {
                                return (
                                    <option key={'option' + index}> {item} </option>
                                )
                            })
                        }
                    </select>
                    {errors.category && <span className="error">{errors.category}</span>}
                    <label> Product Image </label>
                    <input className="form-control" type="file"
                        files={pimage}
                        onChange={(e) => {
                            setPimage(e.target.files[0])
                        }} />
                    {errors.pimage && <span className="error">{errors.pimage}</span>}
                    <label> Product Second Image </label>
                    <input className="form-control" type="file"
                        onChange={(e) => {
                            setPimage2(e.target.files[0])
                        }} />
                    {errors.pimage2 && <span className="error">{errors.pimage2}</span>}
                    <button onClick={handleApi} className="btn btn-primary mt-3"> SUBMIT </button>
                    <ToastContainer 
                    position="bottom-left"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover/>
                </div>
            </center>
            <Footer/>
        </div>
    );
}

export default AddProduct;
