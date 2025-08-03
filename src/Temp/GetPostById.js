import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function GetPostId(){
    const [users,setUserData] = useState({})
    const [Userid ,setUid] = useState(0)

    const show = () => {
        let uid = parseInt(Userid);
        axios.get("https://jsonplaceholder.typicode.com/posts/1"+uid).then(
              (response) => {
                alert(response.data)
                console.log(response.data)
                  setUserData(response.data)
              }  
            )
      }
     
    return(
        <div>
      
        {/* <table border="3" align="center" style={{padding:"20px"}}>
          <tr>
            <th>Id</th>
            <th>title</th>
            <th>body</th>
            <th>userid</th>
 
          </tr>
          {users.map((item) =>
            <tr>
              <td>{item.id}</td>
              <td>{item.title}</td>
              <td>{item.body}</td>
              <td>{item.userid}</td>
 
            </tr>

          )} */}
        {/* </table> */}
        <div style={{textAlign:"center",marginTop:"20px"}}>        <input type="number" onChange={e => setUid(e.target.value)}></input>
        <button onClick={show}> click</button><br/>
        </div>
        <div style={{textAlign:"center",marginTop:"60px"}}>
         Id : {users.id} <br/>
        title : {users.title} <br/>
        body : {users.body} <br/>
        userid  : {users.userId} <br/>
        </div>
        </div>

      )
     
    }

export default GetPostId;
