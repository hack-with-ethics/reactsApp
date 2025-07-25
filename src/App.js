import Header from "./components/Header";
import React from "react";
import Login from "./components/Login";
import Home from "./pages/Home";

import UserDash from "./pages/UserDashboad"
import { BrowserRouter,Route,Routes } from "react-router-dom";
import Booking from "./pages/Booking";
function App(){

  return(
    <>
    {/* <Header/> */}
   
   <BrowserRouter>
    <Routes>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Header/>}/>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/user" element={<UserDash/>}></Route>
      <Route path="/booking" element={<Booking/>}></Route>
    </Routes>
   
   </BrowserRouter>
  
  </>
  )
}

export default App;



