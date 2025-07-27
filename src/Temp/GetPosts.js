import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";

function GetPost(){
    const [users,setUserData] = useState([])
    useEffect(() => {
        const fetchData = async () => {
          const response = await
            axios.get("https://jsonplaceholder.typicode.com/posts");
            setUserData(response.data)
        }
        fetchData();
      },[])
     
    return(
        <div>
      
        <table border="3" align="center" style={{padding:"20px"}}>
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
          )}
        </table>
        </div>
      )
     
    }

export default GetPost;
