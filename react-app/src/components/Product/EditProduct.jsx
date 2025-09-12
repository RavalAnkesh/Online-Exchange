import { useEffect, useState } from "react";
import Header from "../Header/Header";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import categories from "../CategoriesList";
import API_URL from "../../constants";
import "bootstrap/dist/css/bootstrap.min.css";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function EditProduct() {
    const p = useParams();
    const navigate = useNavigate();
    const [pname, setPname] = useState('');
    const [pdesc, setPdesc] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const [pimage, setPimage] = useState('');
    const [pimage2, setPimage2] = useState('');
    const [poldimage, setPoldimage] = useState('');
    const [poldimage2, setPoldimage2] = useState('');

    useEffect(() => {
        if (!localStorage.getItem('token')) {
            navigate('/login');
        }
    }, [navigate]);

    useEffect(() => {
        const url = API_URL + '/get-product/' + p.productId;
        axios.get(url)
            .then((res) => {
                if (res.data.product) {
                    const product = res.data.product;
                    setPname(product.pname);
                    setPdesc(product.pdesc);
                    setPrice(product.price);
                    setCategory(product.category);
                    setPoldimage(product.pimage);
                    setPoldimage2(product.pimage2);
                }
            })
            .catch(() => {
                toast.error('Server error.');
            });
    }, [p.productId]);

    const handleApi = () => {
        const formData = new FormData();
        formData.append('pid', p.productId);
        formData.append('pname', pname);
        formData.append('pdesc', pdesc);
        formData.append('price', price);
        formData.append('category', category);
        formData.append('pimage', pimage);
        formData.append('pimage2', pimage2);
        formData.append('userId', localStorage.getItem('userId'));

        const url = API_URL + '/edit-product';
        axios.post(url, formData)
            .then((res) => {
                if (res.data.message) {
                    toast.success(res.data.message);
                    navigate('/my-products');
                }
            })
            .catch(() => {
                toast.error('Server error.');
            });
    };

    return (
        <div>
            <Header />
            <div className="container mx-auto p-3">
                <h2 className="text-2xl font-bold mb-4">EDIT PRODUCT HERE:</h2>
                <div className="mb-3">
                    <label className="form-label">Product Name</label>
                    <input
                        className="form-control"
                        type="text"
                        value={pname}
                        onChange={(e) => setPname(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Product Description</label>
                    <input
                        className="form-control"
                        type="text"
                        value={pdesc}
                        onChange={(e) => setPdesc(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Product Price</label>
                    <input
                        className="form-control"
                        type="text"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label">Product Category</label>
                    <select
                        className="form-select"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                    >
                        <option>Bikes</option>
                        <option>Mobiles</option>
                        <option>Clothes</option>
                        {categories &&
                            categories.map((item, index) => (
                                <option key={'option' + index}>{item}</option>
                            ))}
                    </select>
                </div>
                <div className="mb-3">
                    <label className="form-label">Product Image</label>
                    <input
                        className="form-control"
                        type="file"
                        onChange={(e) => setPimage(e.target.files[0])}
                    />
                    <img src={API_URL + '/' + poldimage} width={100} height={50} alt="Product" className="mt-2" />
                </div>
                <div className="mb-3">
                    <label className="form-label">Product Second Image</label>
                    <input
                        className="form-control"
                        type="file"
                        onChange={(e) => setPimage2(e.target.files[0])}
                    />
                    <img src={API_URL + '/' + poldimage2} width={100} height={50} alt="Product Second Image" className="mt-2" />
                </div>
                <button onClick={handleApi} className="btn btn-primary">SUBMIT</button>
            </div>
            <ToastContainer position="bottom-left" />
        </div>
    );
}

export default EditProduct;
