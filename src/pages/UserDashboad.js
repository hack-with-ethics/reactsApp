// components/OffcanvasNavbar.jsx
import { useEffect, useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import photo from "../components/logo.ico"
import { PiUserLight } from "react-icons/pi";
import "../ProjCss/userDash.css"
import GetHistory from "./History";
import 'bootstrap/dist/css/bootstrap.min.css';
import Booking from './Booking';
import axios from "axios";
import { LuLogOut } from "react-icons/lu";

const UserDash = () => {
  const [activePage, setActivePage] = useState("booking");
  const navigate = useNavigate();
   const [showSessionPopup, setShowSessionPopup] = useState(false);
  const handleLogout = () => {
    localStorage.removeItem("username");
    localStorage.removeItem("userid");
    localStorage.removeItem("role");
    localStorage.removeItem("jwt")
    navigate("/"); // Redirect to login page
  };
   useEffect(()=>{
    const validateAndNavigate = async () => {
      const storedUserId = localStorage.getItem("userid");
      const storedName = localStorage.getItem("username");
      const storedRole = localStorage.getItem("role");
      const token = localStorage.getItem("jwt");
      console.log("Token :" + token)
      if (token !== null) {
        console.log("Request FROM LOGIN");
        try {
          const response = await axios.get(`https://192.168.115.161:7101/validateToken/${token}`);
          console.log('Token validation response:', response.data);
          
          // Proceed with navigation only if token is valid
          // if (storedUserId && storedName && storedRole) {
          //   if (storedRole === "user") {
          //     navigate("/user");
          //   } else if (storedRole === "owner") {
          //     navigate("/owner");
          //   } else if (storedRole === "admin") {
          //     navigate("/admin");
          //   } else {
          //     console.warn("Unknown role in localStorage:", storedRole);
          //   }
          // }
  
        } catch (err) {
          if (err.response && err.response.status === 401) {
            console.log("Invalid Token UserDashboard")
            localStorage.removeItem("username");
            localStorage.removeItem("userid");
            localStorage.removeItem("role");
            localStorage.removeItem("jwt")
      
            navigate("/login");
      // Auto close and redirect after 3 seconds
          } else {
            navigate("/login");
          }
        }
      
      }
      else{
        navigate("/login")
      }
    }
      validateAndNavigate();
      // const role = localStorage.getItem("role")
      // if(role == "user"){

      // }else if(role == "owner"){
      //   navigate("/owner")
      // }else if(role == "admin"){
      //   navigate("/admin")
      // }else{
      //   navigate("/login")
      // }
   },[navigate])
  
  return (
    <>
    
    <div className='container'>
    <nav className="navbar navbar-dark bg-dark fixed-top">
      <div className="container-fluid">
    
        <a className="navbar-brand" href="#"><img id="LG" src={photo}></img>SKYHOP</a>
        <p className='text-white' id="Names"><PiUserLight style={{width:"50px"}} />Welcome,{localStorage.getItem("username")}</p>
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
                <a className="nav-link active text-white" aria-current="page" href="#" onClick={(e) => {
      e.preventDefault(); // prevents page reload
      setActivePage("history");
    }}>Bookings</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-white" href="#"  onClick={(e) => {
      e.preventDefault();
      setActivePage("booking");
    }}>Search Flight</a>
              </li>
              <li className="nav-item">
                <a className="nav-link text-danger" href="#"   onClick={(e) => {
      e.preventDefault();
      handleLogout();
    }}>Logout <LuLogOut /></a>
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
                {/* <Booking></Booking> */}
                {activePage === "booking" && <  Booking />}
                {activePage === "history" && <GetHistory />}   
    </div>
  </div>
  {showSessionPopup && (
  <div className="popup-overlay">
    <div className="popup-content">
      <h4>Session Expired</h4>
      <p>Login required!</p>
    </div>
  </div>
)}
 
  </>
  );
};

export default UserDash;
