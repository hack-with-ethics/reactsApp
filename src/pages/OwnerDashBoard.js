import { RiRefund2Fill } from "react-icons/ri";
import { IoIosSearch } from "react-icons/io";
import { FaBookmark } from "react-icons/fa6";
import ListFLights from "./OwnerPages/LIstFlight";
import { useEffect } from "react";
import SearchFlights from "./AdminPages/SearchFlights";
import Getbookings from "./AdminPages/Getbookings";
import photo from "../components/logo.ico"
import Refund from "./AdminPages/Refund";
import Booking from "./Booking";
import { FaUsersCog } from "react-icons/fa";
import { useState } from "react";
import AddFlight from "./AdminPages/AddFlight";
import AddOwner from "./AdminPages/AddOwner";
import { PiUserLight } from "react-icons/pi";
import { useNavigate } from "react-router-dom";
import { LuLogOut } from "react-icons/lu";
import { RiFlightTakeoffLine } from "react-icons/ri";
import { MdOutlineFlight } from "react-icons/md";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import axios from "axios";
import { RiAdminFill } from "react-icons/ri";
function OwerDashBoard(){

    const [activePage, setActivePage] = useState("getbookings");
        const navigate = useNavigate();
        useEffect(() => {
          const token = localStorage.getItem("jwt");
          const validateToken = async () => {
            try {
              const response = await axios.get(`https://192.168.115.161:7101/validateToken/${token}`, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem("jwt")}`,
                  "Content-Type": "application/json"
                }
              });
              console.log(response.data)
      
              // Check if role is admin
              if (response.data.claims[2].value === "user" || response.data.claims[2].value === "admin"  ) {
              
                navigate("/");
              }
            } catch (error) {
              console.error("Token validation failed:", error);
              localStorage.removeItem("username");
              localStorage.removeItem("userid");
              localStorage.removeItem("role");
              // localStorage.removeItem("jwt")
        
              navigate("/login");
        
            }
          };
      
          validateToken();
        }, [navigate]);
        const handleLogout = () => {
            localStorage.removeItem("username");
            localStorage.removeItem("userid");
            localStorage.removeItem("role");
            localStorage.removeItem("jwt")
            navigate("/"); // Redirect to login page
          };
        return(<>
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
                    <h5 className="offcanvas-title" id="offcanvasNavbarDarkLabel">OWNER  <RiAdminFill /></h5>
                    <button type="button" className="btn-close btn-close-white" data-bs-dismiss="offcanvas" aria-label="Close"></button>
                  </div>
                  <div className="offcanvas-body">
                    <ul className="navbar-nav justify-content-end flex-grow-1 pe-3 " id="navs">
                      <li className="nav-item">
                        <a className="nav-link active text-white" aria-current="page" href="#" onClick={(e) => {
              e.preventDefault(); // prevents page reload
              setActivePage("getbookings");
            }}>Get Bookings <FaBookmark /></a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link text-white" href="#"  onClick={(e) => {
              e.preventDefault();
              setActivePage("searchFlight");
            }}>Search Flight <IoIosSearch /></a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link text-white" href="#"  onClick={(e) => {
              e.preventDefault();
              setActivePage("addFlight");
            }}>Manage Flights <RiFlightTakeoffLine /></a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link text-white" href="#"  onClick={(e) => {
              e.preventDefault();
              setActivePage("Refund");
            }}>Refund Requests  <RiRefund2Fill /></a>
                      </li>
                      <li className="nav-item">
                        <a className="nav-link text-white" href="#"  onClick={(e) => {
              e.preventDefault();
              setActivePage("ListFlights");
            }}>List FLights  <RiRefund2Fill /></a>
                      </li>
                      {/* <li className="nav-item">
                        <a className="nav-link text-white" href="#"  onClick={(e) => {
              e.preventDefault();
              setActivePage("addOwner");
            }}>Manage User <FaUsersCog /></a>
                      </li> */}
                      <li className="nav-item">
                        <a className="nav-link   text-danger " href="#"   onClick={(e) => {
              e.preventDefault();
              handleLogout();
            }}>Logout <LuLogOut /></a>
                      </li>
                    </ul>
                    
                  </div>
                </div>
              </div>
            </nav>
            
            <div className='container'>
                  {activePage == "getbookings" && <Getbookings/>}
                  {activePage == "Refund" && <Refund/>}
                  {activePage == "searchFlight" && <SearchFlights/>}
                  {/* {activePage == "addOwner" && <AddOwner/>} */}
                    {activePage == "addFlight" && <AddFlight/> }
                    {activePage == "ListFlights" &&  <ListFLights/> }
             </div>
            </div>
    
        </>)
}

export default OwerDashBoard;

