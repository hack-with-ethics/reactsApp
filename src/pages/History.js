import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import "../ProjCss/History.css"
function GetHistory(){
    const [bookings, setBookings] = useState([]);
    useEffect(() => {
        axios.get(`https://192.168.244.161:7101/api/booking/user-full-history/${localStorage.getItem("username")}`)
   
          .then(res => setBookings(res.data))
          .catch(err => console.error(err));
          console.log(bookings)
      }, []); 
    
      const handleCancelTicket = async (b)=>{
        console.log(b)
            alert(b)
        try{
        const request = await axios.post("https://192.168.244.161:7101/api/booking/cancel-booking",{
            bookingId:b.bookingId,
            userId:b.userId,
            refundAmount:b.totalPrice
        })
        console.log(request.data)
        alert(request.data)
    }catch(err){
        alert(err)
    }
      }
  return(<>
  <div id="OUTER">
       <h1 id="books_conts">
         Bookings
        </h1>
    <div className="container">
    {bookings.length === 0 ? (
            <div className="alert alert-danger text-center" role="alert">
              No bookings found.
            </div>
          ) : (
            
            bookings.map((b, index) => (
              <div className="row" key={index}>
                <div className="row" id="cont_books_can">
                  <h5 className="col">
                    {b.flightName} ({b.flightNumber}) - {b.airlineName}
                  </h5>
                  <p className="col">
                    <strong>From:</strong> {b.origin} &nbsp;&nbsp;
                    <strong>To:</strong> {b.destination} <br />
                    <strong>Price:</strong> ₹{b.totalPrice}
                  </p>
                <div className="col">
                  {b.status.toLowerCase() === "confirmed" ? (
                    <button className="btn btn-warning" onClick={() => handleCancelTicket(b)}>
                      Cancel Booking
                    </button>
                  ) : (
                    <button className="btn btn-danger" >
                      Cancelled
                    </button>
                  )}
                  </div>
                </div>
              </div>
            ))
          )}
    </div>
    </div>
  </>)

}

export default GetHistory;