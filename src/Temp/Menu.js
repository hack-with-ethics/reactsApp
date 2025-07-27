import { Link } from "react-router-dom";

function Menu(){
    return(
        <>
        <div style={{padding:"10px",display:"flex",flexDirection:"row",justifyContent:'center',borderBottom:"1px solid"}}>
            <p>Header part</p>
    <Link to="/post" style={{padding:"10px"}}>Posts</Link><br/>
    <Link to="/postid" style={{padding:"10px"}}>postids</Link><br/>
    <Link to="/users" style={{padding:"10px"}}>users</Link><br/>
    <Link to="/usersid" style={{padding:"10px"}}>userid</Link><br/>
    <Link to="/login" style={{padding:"10px"}}>Login</Link>
    </div>
    </>    )
}

export default Menu;