/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
/* eslint-disable react/jsx-key */
import { Link, useNavigate } from 'react-router-dom';
import './Header.css'
import { FaSearch } from "react-icons/fa";
import { useState } from 'react';
import { IoHome } from "react-icons/io5";
import { TfiMenuAlt } from "react-icons/tfi";



function Header(props) {

    const [loc, setLoc] = useState(null)
    const [showOver, setshowOver] = useState(false)

    const navigate = useNavigate()

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('userId');
        navigate('/login');
    }

    const handleSearch = (e) => {
        const searchValue = e.target.value;
        props.handleSearch(searchValue);
    }


    let locations  = [
        {
            "latitude": 21.5092,
            "longitude": 71.8571,
            "placeName": "Bhavnagar"
        },
        {
            "latitude": 21.092159,
            "longitude": 71.770462,
            "placeName": "Mahuva"
        },
          {
            "latitude": 21.5346,
            "longitude": 71.8275,
            "placeName": "Palitana"
        },
          {
            "latitude": 21.3514,
            "longitude": 72.0327,
            "placeName": "Talaja"
        },
          {
            "latitude": 21.7197,
            "longitude": 71.9597,
            "placeName": "Sihor"
        },
          {
            "latitude": 21.6870,
            "longitude": 72.2748,
            "placeName": "Ghogha"
        },
          {
            "latitude": 21.3670,
            "longitude": 71.6660,
            "placeName": "Jesar"
        },
         {
            "latitude": 21.5397,
            "longitude": 71.5776,
            "placeName": "Gariyadhar"
        },


    ]

    return (
        <div className='header-container d-flex justify-content-between'>

            <div className="header">

                <Link className='links' to="/"> <IoHome /> HOME  </Link>
               
                <select  className="map" value={loc}onChange={(e) => {
                    localStorage.setItem('userLoc', e.target.value)
                    setLoc(e.target.value)

                }} >                {
                        locations.map((item, index) => {
                            return (

                                <option value={`${item.latitude},${item.longitude}`} >
                                    {item.placeName} 
                                </option>

                            )

                        })
                    }  
                </select>


                <input className='search'
                    type='text'
                    placeholder='Search Products.....'
                    value={props.search}
                    onChange={handleSearch}
                />
                <button className='search-btn' onClick={props.handleClick}><FaSearch /></button> <div
                    onClick={() => {
                        setshowOver(!showOver)
                    }}
                    style={{
                        display: 'inline-block',
                        alignItems: 'center',
                        background: '#002f34',
                        width: '50px',
                        height: '50px',
                        color: 'white',
                        fontSize: '30px',
                        borderRadius: '100%',
                        cursor:'pointer',
                        marginLeft:'340px'
                    }} >  <TfiMenuAlt /> </div>
                 <div>

               </div>
{showOver && <div className="nav-container  p-4 absolute top-16 right-8">
    <div>
        {!!localStorage.getItem('token') &&
            <Link to="/add-product">
                <button className='showover text-black py-1  rounded'>ADD PRODUCT</button>
            </Link>}
    </div>
    <div>
        {!!localStorage.getItem('token') &&
            <Link to="/liked-products">
                <button className=' showover text-black  py-1  rounded '>FAVOURITES</button>
            </Link>}
    </div>
    <div>
        {!!localStorage.getItem('token') &&
            <Link to="/my-products">
                <button className='showover text-black  py-1  rounded '>MY ADS</button>
            </Link>}
    </div>
    <div>
        {!!localStorage.getItem('token') &&
            <Link to="/my-profile">
                <button className='showover text-black py-1  rounded '>MY PROFILE</button>
            </Link>}
    </div>
    <div>
        {!localStorage.getItem('token') ?
            <Link to="/login"> <button className='log '>LOGIN </button></Link>:
            <button className='showover text-black py-1  rounded' onClick={handleLogout}>LOGOUT</button>}
    </div>
</div>}

            </div>

           
        </div>
    )
}


export default Header;
