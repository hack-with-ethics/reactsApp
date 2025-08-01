import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../../ProjCss/AdminCss/Search.css"
import { GiArrowFlights } from "react-icons/gi";
function SearchFlights(){
 const [flights, setFlights] = useState([]);
  const [from, setFrom] = useState('');
   const [to, setTo] = useState('');
   const [date, setDate] = useState('');
    const [error, setError] = useState('');
   const navigate = useNavigate();
   const handleSearch = async () => {
   
    if (!from || !to || !date) {
      alert('Please fill all fields');
      return;
    }

    try {
      const response = await axios.post("https://192.168.115.161:7101/search", {
        origin: from,
        destination: to,
        date: date
      }, {
        headers: { 'Content-Type': 'application/json',Authorization:`Bearer ${localStorage.getItem("jwt")}` }
      });
      console.log(response.status)
      setFlights(response.data);
      setError('');
    //   setSeatSelect(false);
    //   setSelectedSeats([]);
    } catch (err) {
      console.log(err)
      if(err.response.status == 401){
       
        navigate("/login")
      }else if(err.response.status == 404){
        // alert("NO FLIGHTS FOUND !")
      }
      setError("Failed to fetch flights.");
      setFlights([]);
    }
  };
    return(<>
         <div id="CONS" style={{marginTop:"155px"}}>
                  <div className="row">
                    <div className="col-6">
                      <p id="lab">From</p>
                      <input
                        type="text"
                        placeholder="From"
                        id="inps"
                        onChange={(e) => setFrom(e.target.value)}
                      />
                    </div>
                    <div className="col-6">
                      <p id="lab">To</p>
                      <input
                        type="text"
                        placeholder="To"
                        id="inps"
                        onChange={(e) => setTo(e.target.value)}
                      />
                    </div>
                    <div className="col-12">
                      <p id="lab">Date</p>
                      <input
                        type="date"
                        onChange={(e) => setDate(e.target.value)}
                      />
                    </div>
                    <div className="col">
                      <button id="search" onClick={handleSearch}>
                        Search Flight <GiArrowFlights />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="container mt-4">
  {flights.length > 0 ? (
    <div className="row">
      {flights.map((flight, index) => (
        <div className="col-md-4 mb-4" key={index}>
          <div className="card h-100 shadow-sm border-success" style={{border:"1px solid"}}>
            <div className="card-body">
              <h5 className="card-title text-success">{flight.airlineName}</h5>
              <h6 className="card-subtitle mb-2 text-muted">{flight.flightName}</h6>
              <p className="card-text">
                <strong>From:</strong> {flight.origin} <br />
                <strong>To:</strong> {flight.destination}
              </p>
              <p className="card-text">
                <strong>Departure:</strong> {flight.departureTime}<br />
                <strong>Arrival:</strong> {flight.arrivalTime}
              </p>
              <p className="card-text text-primary">
                Fare: ₹<strong>{flight.fare}</strong>
              </p>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    error && (
      <div className="alert alert-danger" id="errs">
        No Flights Found
      </div>
    )
  )}
</div>                
    </>);
}


export default SearchFlights;