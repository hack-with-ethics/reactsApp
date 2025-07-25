import 'bootstrap/dist/css/bootstrap.min.css';
import "../ProjCss/search.css"
import React, { useState } from "react";
function Booking(){
    const [from, setFrom] = useState('');
    const [to, setTo] = useState('');
    const [date, setDate] = useState('');
    const [flights, setFlights] = useState([]);
    const [error, setError] = useState('');
  
    const handleSearch = async () => {
      if (!from || !to || !date) {
        alert('Please fill all fields');
        return;
      }
  
      const url = `https://192.168.244.161:7101/search?origin=${encodeURIComponent(from)}&destination=${encodeURIComponent(to)}&date=${encodeURIComponent(date)}`;
  
      try {
        const response = await fetch(url);
        console.log(response)
        if (!response.ok) {
          const errorMsg = await response.text();
          setError(errorMsg || 'No flights found');
          setFlights([]);
          return;
        }
  
        const data = await response.json();
        alert(data)
        setFlights(data);
        setError('');
      } catch (err) {
        setError('Failed to fetch flights');
        alert(err)
        setFlights([]);
      }
    };
    
    return(<>
        <div id="OUTER">
            <h1 style={{textAlign:"center"}}>Search <span style={{color:"rgb(255, 123, 0)"}}>Flight</span></h1>
        <div id="CONS">

            <div className='row'>
                <div className='col-6'>
                        <p id="lab">From</p>
                        <input type='text' placeholder='From' onChange={e => setFrom(e.target.value)}></input>
                </div>
                <div className='col-6'>
                        <p id="lab">To</p>
                        <input type='text' placeholder='To' onChange={e => setTo(e.target.value)}></input>
                </div>
                <div className='col-12'>
                    <p id="lab">Date</p>
                    <input type="date" onChange={e => setDate(e.target.value)}></input>
                </div>
                <div className='col'>
                        <button id="search" onClick={handleSearch}>Search Flight</button>
                </div>
            </div>
        </div>
        </div>
  
    </>);

}

export default Booking;