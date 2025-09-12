// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";
// import Header from "../Header/Header";
// import API_URL from "../../constants";
// import "./ProductDetail.css"; // Import your CSS file
// import "bootstrap/dist/css/bootstrap.min.css";

// function ProductDetail() {
//     const [product, setProduct] = useState();
//     const [user, setUser] = useState();
//     const [imageIndex, setImageIndex] = useState(0);
//     const [loading, setLoading] = useState(false);
//     const [error, setError] = useState(null);
//     const [isLoggedIn, setIsLoggedIn] = useState(false);

//     const params = useParams();

//     useEffect(() => {
//         setLoading(true);
//         setError(null);

//         const url = API_URL + '/get-product/' + params.productId;
//         axios.get(url)
//             .then((res) => {
//                 if (res.data.product) {
//                     setProduct(res.data.product);
//                     localStorage.setItem('productId', res.data.product._id);
//                 }
//             })
//             .catch((err) => {
//                 setError('Server Error');
//             })
//             .finally(() => {
//                 setLoading(false);
//             });

//         // Check if user is logged in
//         const userId = localStorage.getItem('userId');
//         setIsLoggedIn(!!userId);
//     }, [params.productId]);

//     const handleContact = (addedBy) => {
//         const url = API_URL + '/get-user/' + addedBy;
//         axios.get(url)
//             .then((res) => {
//                 if (res.data.user) {
//                     setUser(res.data.user);
//                 }
//             })
//             .catch((err) => {
//                 setError('Server Error');
//             });
//     };

//     const handleImageChange = (index) => {
//         setImageIndex(index);
//     };

//     return (
//         <>
//             <Header />
//             <div className="product-detail-container">
//                 {loading && <p>Loading...</p>}
//                 {error && <p>{error}</p>}
//                 {product && (
//                     <div className="product-details">
//                         <div className="image-slider">
//                             {product.pimage2 && (
//                                 <div className="slider-thumbnails">
//                                     {[product.pimage, product.pimage2].map((image, index) => (
//                                         <div
//                                             key={index}
//                                             className={`thumbnail ${index === imageIndex ? 'active' : ''}`}
//                                             onClick={() => handleImageChange(index)}
//                                         >
//                                             <img src={API_URL + '/' + image} alt={`Thumbnail ${index}`} />
//                                         </div>
//                                     ))}
//                                 </div>
//                             )}
//                             <img
//                                 className="main-image"
//                                 src={API_URL + '/' + (imageIndex === 0 ? product.pimage : product.pimage2)}
//                                 alt="Product"
//                             />
//                         </div>
//                         <div className="product-info">
//                             <h3 className="text-3xl font-bold underline">Product Details</h3>
//                             <div className="table-responsive">
//                                 <table className="table">
//                                     <tbody>
//                                         <tr>
//                                             <td><strong>Name:</strong></td>
//                                             <td>{product.pname}</td>
//                                         </tr>
//                                         <tr>
//                                             <td><strong>Category:</strong></td>
//                                             <td>{product.category}</td>
//                                         </tr>
//                                         <tr>
//                                             <td><strong>Description:</strong></td>
//                                             <td>
//                                                 {product.pdesc.split("\n").map((line, index) => (
//                                                     <p key={index}>{line}</p>
//                                                 ))}
//                                             </td>
//                                         </tr>
//                                         <tr>
//                                             <td><strong>Price:</strong></td>
//                                             <td>Rs. {product.price} /-</td>
//                                         </tr>
//                                     </tbody>
//                                 </table>
//                             </div>

//                             {isLoggedIn && product.addedBy && (
//                                 <button onClick={() => handleContact(product.addedBy)} className='bg-danger margin-top=10px'>
//                                     SHOW CONTACT DETAILS
//                                 </button>
//                             )}
//                             {user && (
//                                 <table className="table">
//                                     <tbody>
//                                         <tr>
//                                             <td><strong>Added By:</strong></td>
//                                             <td>{user.username}</td>
//                                         </tr>
//                                         <tr>
//                                             <td><strong>Mobile:</strong></td>
//                                             <td>{user.mobile}</td>
//                                         </tr>
//                                         <tr>
//                                             <td><strong>Email:</strong></td>
//                                             <td>{user.email}</td>
//                                         </tr>
//                                     </tbody>
//                                 </table>
//                             )}
//                         </div>  
//                     </div>
//                 )}
//             </div>
//         </>
//     );
// }

// export default ProductDetail;


import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "../Header/Header";
import API_URL from "../../constants";
import "./ProductDetail.css"; // Import your CSS file
import "bootstrap/dist/css/bootstrap.min.css";

function ProductDetail() {
    const [product, setProduct] = useState();
    const [user, setUser] = useState();
    const [imageIndex, setImageIndex] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const params = useParams();

    useEffect(() => {
        setLoading(true);
        setError(null);

        const url = API_URL + '/get-product/' + params.productId;
        axios.get(url)
            .then((res) => {
                if (res.data.product) {
                    setProduct(res.data.product);
                    localStorage.setItem('productId', res.data.product._id);
                }
            })
            .catch((err) => {
                setError('Server Error');
            })
            .finally(() => {
                setLoading(false);
            });

        // Check if user is logged in
        const userId = localStorage.getItem('userId');
        setIsLoggedIn(!!userId);
    }, [params.productId]);

    const handleContact = (addedBy) => {
        const url = API_URL + '/get-user/' + addedBy;
        axios.get(url)
            .then((res) => {
                if (res.data.user) {
                    setUser(res.data.user);
                }
            })
            .catch((err) => {
                setError('Server Error');
            });
    };

    const handleImageChange = (index) => {
        setImageIndex(index);
    };

    return (
        <>
            <Header />
            <div className="product-detail-container">
                {loading && <p>Loading...</p>}
                {error && <p>{error}</p>}
                {product && (
                    <div className="product-details">
                        <div className="image-slider">
                            {product.pimage2 && (
                                <div className="slider-thumbnails">
                                    {[product.pimage, product.pimage2].map((image, index) => (
                                        <div
                                            key={index}
                                            className={`thumbnail ${index === imageIndex ? 'active' : ''}`}
                                            onClick={() => handleImageChange(index)}
                                        >
                                            <img
                                                className="product-image"
                                                src={API_URL + '/' + image}
                                                alt={`Thumbnail ${index}`}
                                            />
                                        </div>
                                    ))}
                                </div>
                            )}
                            <img
                                className="main-image"
                                src={API_URL + '/' + (imageIndex === 0 ? product.pimage : product.pimage2)}
                                alt="Product"
                            />
                        </div>
                        <div className="product-info">
                            <h3 className="text-3xl font-bold underline">Product Details</h3>
                            <div className="table-responsive">
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td><strong>Name:</strong></td>
                                            <td>{product.pname}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Category:</strong></td>
                                            <td>{product.category}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Description:</strong></td>
                                            <td>
                                                {product.pdesc.split("\n").map((line, index) => (
                                                    <p key={index}>{line}</p>
                                                ))}
                                            </td>
                                        </tr>
                                        <tr>
                                            <td><strong>Price:</strong></td>
                                            <td>Rs. {product.price} /-</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            {isLoggedIn && product.addedBy && (
                                <button onClick={() => handleContact(product.addedBy)} className='bg-danger margin-top=10px'>
                                    SHOW CONTACT DETAILS
                                </button>
                            )}
                            {user && (
                                <table className="table">
                                    <tbody>
                                        <tr>
                                            <td><strong>Added By:</strong></td>
                                            <td>{user.username}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Mobile:</strong></td>
                                            <td>{user.mobile}</td>
                                        </tr>
                                        <tr>
                                            <td><strong>Email:</strong></td>
                                            <td>{user.email}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            )}
                        </div>  
                    </div>
                )}
            </div>
        </>
    );
}

export default ProductDetail;
