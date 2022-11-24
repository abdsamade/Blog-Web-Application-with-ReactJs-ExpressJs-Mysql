import React from 'react'
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import Logo from '../img/logo.png';
function Navbar() {

    const {currentuser,logout} = useContext(AuthContext);
  return (
    <div className="navbar">
        <div className="container">
            <div className="logo">
                <Link to="/">
                <img src={Logo} alt="" />
                </Link>
            </div>
            <div className="links">
                <Link className='link' to="/?cat=art">
                    <h6>ART</h6>
                </Link>
                <Link className='link' to="/?cat=art">
                    <h6>Science</h6>
                </Link>
                <Link className='link' to="/?cat=art">
                    <h6>Design</h6>
                </Link>
                <Link className='link' to="/?cat=art">
                    <h6>Technologie</h6>
                </Link>
                <span onClick={logout}>{currentuser?.username}</span>
                {currentuser ? <span>Logout</span> : <Link className='link' to='/login'>Login</Link>}
                <span className="write">
                    <Link className='link' to="/write">Write</Link>
                </span>
            </div>
        </div>
    </div>
    )
}

export default Navbar