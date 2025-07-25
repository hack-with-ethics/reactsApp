// components/OffcanvasNavbar.jsx
import React from 'react';
import photo from "../components/logo.ico"
import { PiUserLight } from "react-icons/pi";
import "../ProjCss/userDash.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import Booking from './Booking';
const UserDash = () => {
  return (
    <>
    <div className='container'>
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
    
        <a className="navbar-brand" href="#"><img id="LG" src={photo}></img>SKYHOP</a>
        <p className='text-white' id="Names"><PiUserLight style={{width:"50px"}} />Welcome,User</p>
        <button className="navbar-toggler" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasNavbarDark" aria-controls="offcanvasNavbarDark" aria-label="Toggle navigation">
        
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="offcanvas offcanvas-end text-bg-dark" tabIndex="-1" id="offcanvasNavbarDark" aria-labelledby="offcanvasNavbarDarkLabel">
          <div className="offcanvas-header">
            <h5 className="offcanvas-title" id="offcanvasNavbarDarkLabel">Menu</h5>
            <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
          </div>
          <div className="offcanvas-body">
            <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 " id="navs">
              <li className="nav-item">
                <a className="nav-link active text-white" aria-current="page" href="#">Bookings</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">Search Flight</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#">Logout</a>
              </li>
              {/* <li className="nav-item dropdown">
                <a className="nav-link dropdown-toggle text-white" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  Dropdown
                </a>
                <ul className="dropdown-menu dropdown-menu-dark">
                  <li><a className="dropdown-item" href="#">Action</a></li>
                  <li><a className="dropdown-item" href="#">Another action</a></li>
                  <li><hr className="dropdown-divider" /></li>
                  <li><a className="dropdown-item" href="#">Something else here</a></li>
                </ul>
              </li> */}
            </ul>
            
          </div>
        </div>
      </div>
    </nav>
    <div className='container'>
                <Booking></Booking>
    </div>
  </div>
  </>
  );
};

export default UserDash;
