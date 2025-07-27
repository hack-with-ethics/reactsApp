import Header from "./components/Header";
import React from "react";
import Login from "./components/Login";
import Home from "./pages/Home";
import Menu from "./Temp/Menu";
import UserDash from "./pages/UserDashboad"
import { BrowserRouter,Link,Route,Routes } from "react-router-dom";
import Booking from "./pages/Booking";
import GetDatas from "./Temp/Getdata";
import GetPost from "./Temp/GetPosts";
import GetPostId from "./Temp/GetPostById";
import UserSearch from "./Temp/UserSearch";
import LoginTemp from "./LoginTemp";
function App(){

  return(
    <>
    {/* <Header/> */}
  
   <BrowserRouter>

    <Routes>
{/*    
      <Route path="/" element={<GetDatas/>}></Route>
      <Route path="/users" element={<GetDatas/>}></Route>
      <Route path="/post" element={<GetPost/>}></Route>
      <Route path="/postid" element={<GetPostId/>}/>
      <Route path="/usersid" element={<UserSearch/>}></Route>
      <Route path="/login" element={<LoginTemp/>}></Route> */}
       <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Header/>}/>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/user" element={<UserDash/>}></Route>
      <Route path="/booking" element={<Booking/>}></Route>
           <Route path="/user" element={<UserDash/>}></Route>
 
    </Routes>
   
   </BrowserRouter>
  
  </>
  )
}

export default App;













 {/* <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Header/>}/>
      <Route path="/" element={<Home/>}></Route>
      <Route path="/user" element={<UserDash/>}></Route>
      <Route path="/booking" element={<Booking/>}></Route> */}
           {/* <Route path="/user" element={<UserDash/>}></Route> */}