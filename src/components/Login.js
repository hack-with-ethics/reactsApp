import React, { useEffect } from 'react';
import UserDash from '../pages/UserDashboad';
import { ImWhatsapp } from "react-icons/im";
import { FaGithub } from "react-icons/fa";
import { FaLock } from "react-icons/fa6";
import { GrYoutube } from "react-icons/gr";
import { PiInstagramLogoFill } from "react-icons/pi";
import { FaUserAlt } from "react-icons/fa";
import { ImFacebook2 } from "react-icons/im";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../ProjCss/Login.css"
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import photo from "../assests/logincor/Beige Classy India Travel Marketing Presentation.png"
import photos2 from "../assests/logincor/White Aesthetic Typography Living in New York Travel Vlog Youtube Thumbnail.png"
import photos3 from "../assests/logincor/Louvre Museum Local Landmark Background.png"
import photos4 from "../assests/logincor/Warm Good Day Facebook Cover Photo.png"
import { useNavigate } from 'react-router-dom';
import logo from "../components/logo.ico"
import { useState } from 'react';
import axios from 'axios';
const Login = () => {
  const navigate = useNavigate();
  const [info, setInfo] = useState({ name: "", password: "" });
  const[role,setRole] = useState("")
  const[userid,setUserid] = useState(0);
  
  const handleLog = async () => {
    try {
      console.log(info.name + " "+ info.password)
      const response = await axios.post("https://192.168.244.161:7101/loginrequest", {
        username: info.name,
        password: info.password
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });      
  
      console.log(response.data);
      const { role, userid } = response.data;
       // ✅ Store in browser localStorage
    localStorage.setItem("userid", userid);
    localStorage.setItem("username", info.name);
    localStorage.setItem("role", role);

    // ✅ Navigate based on role
    if (role === "user") {
      navigate("/user");
    } else if (role === "owner") {
      navigate("/owner");
    } else if (role === "admin") {
      navigate("/admin");
    } else {
      alert("Unknown role: " + role);
    }
    } catch (err) {
      console.error(err);
      alert("Login failed: " + err.response?.data?.message || err.message);
    }
  }
  

  useEffect(() => {
    const storedUserId = localStorage.getItem("userid");
    const storedName = localStorage.getItem("username");
    const storedRole = localStorage.getItem("role");
  
    if (storedUserId && storedName && storedRole) {
      if (storedRole === "user") {
        navigate("/user", { state: { name: storedName, uid: parseInt(storedUserId) } });
      } else if (storedRole === "owner") {
        navigate("/owner", { state: { name: storedName, uid: parseInt(storedUserId) } });
      } else if (storedRole === "admin") {
        navigate("/admin", { state: { name: storedName, uid: parseInt(storedUserId) } });
      } else {
        console.warn("Unknown role in localStorage:", storedRole);
      }
    }
  
    const carouselElement = document.querySelector('#carouselBG');
    if (carouselElement) {
      const bootstrap = require('bootstrap'); // Dynamic import
      new bootstrap.Carousel(carouselElement, {
        interval: 3000,
        ride: 'carousel'
      });
    }
  }, [navigate]);

  return (
    <>
  
    <div style={{ height: '100vh', position: 'relative', overflow: 'hidden' }}>
      {/* Carousel Background */}
      <div style={{width:"100%",border:"1px solid",padding:"20px",borderRadius:"10px"}} className='bg-dark'>
      <div className='row'>
        <div className='col-1'>
        <p><img src={logo} style={{width:"100px"}}></img></p>
        </div>
          <div className='col'>
              <h2 style={{color:"whitesmoke",marginTop:"20px"}}>SKYHOP</h2>
          </div>
          <div className='col d-flex justify-content-end' >
      
            <ul className='list-inline p-4 text-white'>
                <li className='list-inline-item pl-2 pb-0' id="lnks"><a>Home</a></li>
                <li className='list-inline-item pl-2 pb-0' id="lnks"><a>Register</a></li>
            </ul>
          </div>
      </div>

   </div>
      <div
        id="carouselBG"
        className="carousel slide carousel-fade"
      >
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={photo}
              className="d-block w-100"
              alt="Slide 1"
              style={{ height: '100vh', objectFit: 'cover' }}
            />
          </div>
          <div className="carousel-item">
            <img
              src={photos2}
              className="d-block w-100"
              alt="Slide 2"
              style={{ height: '100vh', objectFit: 'cover' }}
            />
          </div>
          <div className="carousel-item">
            <img
              src={photos3}
              className="d-block w-100"
              alt="Slide 3"
              style={{ height: '100vh', objectFit: 'fill' }}
            />
          </div>
          <div className="carousel-item">
            <img
              src={photos4}
              className="d-block w-100"
              alt="Slide 3"
              style={{ height: '100vh', objectFit: 'fill' }}
            />
          </div>
        </div>
      </div>

      {/* Centered Login Form */}
      <div
        className="position-absolute top-50 start-50 translate-middle bg-white shadow"
        style={{  zIndex: 10 }} id="outer_log"
      >
        <h3 className="text-center mb-4" id="logs_head">Login</h3>
        
          <div className="mb-3">
            <label className="form-label">Username </label><FaUserAlt id="usc" />

            <input type="text" id="insps2" className="form-control" onChange={(e) => setInfo(prev => ({ ...prev, name: e.target.value }))} placeholder='Enter the UserName' />
          </div>
          <div className="mb-3">
            <label className="form-label">Password</label><FaLock id="passc" />
            <input type="password" id="insps" className="form-control" onChange={(e) => setInfo(prev => ({ ...prev, password: e.target.value }))} placeholder='Enter the Password' />
          </div>
          <button className="btn btn-primary  w-100" onClick={handleLog} >Login</button>
          <div id="bts_conts">
            <button id="rgs">
              Register
            </button>
            <button id="fgspsLog">Forgot password </button>
          </div>
          {/* <div>
            <h3 style={{textAlign:"center"}}>Follow us on</h3>
            </div> */}
          <div id="icons_cont">
          <FaGithub id="ics" />
          <ImFacebook2 id="ics" />
          <GrYoutube id="ics" />
          <PiInstagramLogoFill id="ics" />
          <ImWhatsapp id="ics"/>
          </div>
          {/* <div className='row'>
              <div className='col'>
          <p><button>Register</button></p>
              </div>
              <div className='col'>
    <p><button>Forget password</button></p>
              </div>
          </div> */}
        
      </div>
    </div>
    </>
  );
};

export default Login;





// import { useNavigate } from 'react-router-dom';
// import { useState } from 'react';
// const Login = () => {
 
//     const navigate = useNavigate();
//     const [data, setData] = useState({
//         userName : '',
//         passCode : ''
//     })
   
//     const handleChange = event => {
//         setData({
//             ...data,[event.target.name] : event.target.value  
//         })
//     }
 
//     const handleSubmit = () => {
//       let user =data.userName;
//       let pwd = data.passCode;
 
//       if (user=="Hexa" && pwd == "Hexa") {
//         // alert("Correct Credentials...");
//         navigate("/");
//       } else {
//         alert("Invalid Credentials...");
//       }
//     }
 
//     return (
//       <div>
//           <form>
//              <label>
//                 User Name : </label>
//                <input type="text" name="userName" onChange={handleChange}
//                         value={data.userName} /> <br/><br/>
//                <label>Password</label>
//                <input type="password" name="passCode" onChange={handleChange}
//                      value={data.passCode} /> <br/><br/>
//               <input type="button" value="Login" onClick={handleSubmit} />
//         </form>
//       </div>
//     )
// }
// export default Login;