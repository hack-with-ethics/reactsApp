import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCallback } from "react";
import axios from "axios";
import "../ProjCss/History.css"
function GetHistory(){
    const [bookings, setBookings] = useState([]);
    const navigate = useNavigate();
      const [popup, setPopup] = useState({ visible: false, message: '', type: '' });
  // Handle token expiry globally for this component
  const fetchBookings = async () => {
    try {
      const response = await axios.get(
        `https://192.168.115.161:7101/api/booking/user-full-history/${localStorage.getItem("username")}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
          }
        }
      );
      setBookings(response.data);
      console.log(response.data); // safer log after set
    } catch (err) {
      console.error(err);
      if (err.response.status === 401) {
        // alert("Session expired. Please login again.");
        navigate("/login");
      } else {
        alert("Failed to fetch booking history.");
      }
    }
  };
  useEffect(() => {
  
  
    fetchBookings();
  }, []);
  
    //     axios.get(`https://192.168.152.161:7101/api/booking/user-full-history/${localStorage.getItem("username")}`,{
    //       headers: { 'Content-Type': 'application/json',Authorization:`Bearer ${localStorage.getItem("jwt")}` }
    //     })
   
    //       .then(res => setBookings(res.data))
    //       .catch(err => console.error(err));
    //       console.log(bookings)
    //   }, []); 
    
      const handleCancelTicket = async (b)=>{
     
        try{
        const request = await axios.post("https://192.168.115.161:7101/api/booking/cancel-booking",{
            bookingId:b.bookingId,
            userId:b.userId,
            refundAmount:b.totalPrice
        },{
          headers: { 'Content-Type': 'application/json',Authorization:`Bearer ${localStorage.getItem("jwt")}` }
        })
        console.log(request.data)
        fetchBookings();
        
        setPopup({ visible: true, message: '✅ Cancelled successfully! Refund Initiated', type: 'success' });
        setTimeout(() => {
            setPopup({ visible: false, message: '', type: '' });
          }, 4000);
      
        
    }catch(err){
        // alert(err)
        console.log(err)
        setPopup({ visible: true, message: '❌ Error in Cancelling ...', type: 'error' });
        setTimeout(() => {
          setPopup({ visible: false, message: '', type: '' });
        }, 4000);
    }
      }
      return (
        <>
             {popup.visible && (
  <div className="center-popup">
    <div className={`popup-card text-center shadow-lg ${popup.type}`}>
      {popup.message}
    </div>
  </div>
)}
        <div className="container py-4" style={{marginTop:"170px"}}>
          <h2 className="text-center mb-4 gradient-heading">Your Bookings</h2>
      
          {bookings.length === 0 ? (
            <div className="alert alert-danger text-center" role="alert">
              No bookings found.
            </div>
          ) : (
            <div className="row g-4">
              {bookings.map((b, index) => (
                <div className="col-md-6 col-lg-4" key={index}>
                  <div className="card booking-card h-100 shadow-lg border-0">
                    <div className="card-header text-white gradient-header rounded-top">
                      <h5 className="mb-0">{b.flightName} ({b.flightNumber})</h5>
                      <small className="fst-italic">{b.airlineName}</small>
                    </div>
                    <div className="card-body">
                      <p className="mb-2"><strong>From:</strong> {b.origin}</p>
                      <p className="mb-2"><strong>To:</strong> {b.destination}</p>
                      <p className="mb-2"><strong>Seat No:</strong> {b.seatNumber}</p>
                      <p className="mb-2"><strong>Price:</strong> ₹{b.totalPrice}</p>
                      <p className="mb-2"><strong>Status:</strong> 
                        <span className={`ms-2 badge ${b.status.toLowerCase() === "confirmed" ? "bg-success" : "bg-secondary"}`}>
                          {b.status}
                        </span>
                      </p>
                    </div>
                    <div className="card-footer d-flex justify-content-between align-items-center bg-white border-top-0">
                      {b.status.toLowerCase() === "confirmed" ? (
                        <button
                          className="btn btn-outline-danger btn-sm"
                          onClick={() => handleCancelTicket(b)}
                        >
                          Cancel
                        </button>
                      ) : (
                        <button className="btn btn-outline-secondary btn-sm" disabled>
                          Cancelled
                        </button>
                      )}
                      {(b.refundStatus ?? "").toLowerCase() === "success" ? (
                        <span className="badge bg-success">Refunded</span>
                      ) : (b.refundStatus ?? "").toLowerCase() === "pending" ? (
                        <span className="badge bg-warning text-dark">Pending</span>
                      ) : (
                        <span className="badge bg-light text-muted">No Refund</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        </>
      );
      

}

export default GetHistory;