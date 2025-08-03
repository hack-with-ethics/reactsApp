import "../../ProjCss/AdminCss/AdminBook.css"
import { MdOutlineAirplaneTicket } from "react-icons/md";
import { IoTicketSharp } from "react-icons/io5";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ReactTyped } from "react-typed";
function Getbookings(){
       const [popup, setPopup] = useState({ visible: false, message: '', type: '' });

    const handleCancelTicket = async (b)=>{
        console.log(b)
          
        try{
        const request = await axios.post("https://192.168.115.161:7101/api/booking/cancel-booking",{
            bookingId:b.bookingId,
            userId:b.userId,
            refundAmount:b.totalPrice
        },{
          headers: { 'Content-Type': 'application/json',Authorization:`Bearer ${localStorage.getItem("jwt")}` }
        })
        
        
        console.log(request)
        if(request.status === 200){
        setBookings(prev => prev.filter(cards => cards.bookingId !== b.bookingId));
        setPopup({ visible: true, message: '✅ Ticket Cancelled successfully!', type: 'success' });
        setTimeout(() => {
            setPopup({ visible: false, message: '', type: '' });
          }, 4000);
        }


    }catch(err){
        // alert(err)
        setPopup({ visible: true, message: '❌ Error in registering user', type: 'error' });
        setTimeout(() => {
          setPopup({ visible: false, message: '', type: '' });
        }, 4000);
        console.log(err)
    } }
     const [bookings, setBookings] = useState([]);
     const [username , setUsername] = useState("");
     const navigate = useNavigate();
    const fetchBookings = async () => {
        console.log(username)
        try {
          const response = await axios.get(
            `https://192.168.115.161:7101/api/booking/user-full-history/${username}`,
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
    return(<>
        <div id="admin_booking_outerCont" className="container">
        {popup.visible && (
  <div className="center-popup">
    <div className={`popup-card text-center shadow-lg ${popup.type}`}>
      {popup.message}
    </div>
  </div>
)}
            <div className="row" id="admin_booking_userCont">
              {/* Main Heading */}
                    {/* <h1 style={{ textAlign: "center" }}>
                      Search{" "}
                      <span style={{ color: "rgb(255, 123, 0)" }}>
                        Flight{" "}
                        <ReactTyped
                          className="typer"
                          strings={[
                            " Fly Smart. Search Easy.",
                            "Flights in a Flash",
                            "Take Off Starts Here",
                            "Truly unforgettable.",
                          ]}
                          typeSpeed={120}
                          backSpeed={100}
                          loop
                        />
                      </span>
                    </h1> */}
                <div className="col-4">
                    <input id="admin_inps" type="text" placeholder="Enter the Username " onChange={(e) => setUsername(e.target.value)}></input>
                </div>
                <div className="col ms-6">
                    <button id="admin_btns" onClick={fetchBookings} >Get Bookings <IoTicketSharp /></button>
                </div>
            </div>
        </div>
        <div className="container mt-4">
  {bookings.filter(b => b.status.toLowerCase() === "confirmed").length === 0 ? (
    <div className="alert alert-danger text-center" role="alert">
      No confirmed bookings found.
    </div>
  ) : (
    <div className="row">
      {bookings
        .filter(b => b.status.toLowerCase() === "confirmed")
        .map((b, index) => (
          <div className="col-md-4 mb-4" key={b.bookingId || index}>
            <div className="card h-100  shadow-lg  border-0">
              <div className="card-body">
                <h5 className="card-title">
                  {b.flightName} ({b.flightNumber})
                </h5>
                <h6 className="card-subtitle mb-2 text-muted">{b.airlineName}</h6>
                <p className="card-text">
                  <strong>From:</strong> {b.origin}<br />
                  <strong>To:</strong> {b.destination}<br />
                  <strong>Price:</strong> ₹{b.totalPrice}<br />
                  <strong>Seat Number:</strong> {b.seatNumber}
                </p>
              </div>
              <div className="card-footer bg-transparent border-top-0">
                <button
                  className="btn btn-warning w-80"
                  onClick={() => handleCancelTicket(b)}
                >
                  Cancel Booking
                </button>
              </div>
            </div>
          </div>
        ))}
    </div>
  )}
</div>


    </>)
}

export default Getbookings;