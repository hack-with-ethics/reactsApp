
// import 'bootstrap/dist/css/bootstrap.min.css';
// import "../ProjCss/search.css";
// import React, { useState } from "react";
// import { ReactTyped } from "react-typed";
// import axios from 'axios';

// function Booking() {
//   const [from, setFrom] = useState('');
//   const [to, setTo] = useState('');
//   const [date, setDate] = useState('');
//   const [flights, setFlights] = useState([]);
//   const [error, setError] = useState('');
//   const [seatSelect, setSeatSelect] = useState(false);
//   const [selectedSeats, setSelectedSeats] = useState([]);

//   const handleSearch = async () => {
//     if (!from || !to || !date) {
//       alert('Please fill all fields');
//       return;
//     }

//     try {
//       const response = await axios.post("https://192.168.152.161:7101/search", {
//         origin: from,
//         destination: to,
//         date: date
//       }, {
//         headers: { 'Content-Type': 'application/json' }
//       });

//       setFlights(response.data);
//       setError('');
//       setSeatSelect(false); // Reset to flight view
//     } catch (err) {
//       setError("Failed to fetch flights.");
//       setFlights([]);
//     }
//   };

//   const handleBookClick = async (Id) => {
//     try {
//       alert(Id)
//       const response = await axios.post(`https://192.168.152.161:7101/getSeats`,null, {
//         params: {
//           scheduleId: parseInt(Id)
//         }
//       });
//       console.log(response.data)
//       setFlights(response.data); // Replace flights with seat list
//       setSeatSelect(true);
//     } catch (err) {
//       alert(err)
//       alert("Failed to fetch seats");
//     }
//   };

//   const toggleSeat = (seatNumber) => {
//     setSelectedSeats(prev =>
//       prev.includes(seatNumber)
//         ? prev.filter(seat => seat !== seatNumber)
//         : [...prev, seatNumber]
//     );
//   };

//   return (
//     <>
//       <div id="OUTER">
//         <h1 style={{ textAlign: "center" }}>
//           Search <span style={{ color: "rgb(255, 123, 0)" }}>
//             Flight <ReactTyped className='typer'
//               strings={[" Fly Smart. Search Easy.", "Flights in a Flash", "Take Off Starts Here", "Truly unforgettable."]}
//               typeSpeed={120}
//               backSpeed={100}
//               loop
//             />
//           </span>
//         </h1>

//         {!seatSelect && (
//           <div id="CONS">
//             <div className='row'>
//               <div className='col-6'>
//                 <p id="lab">From</p>
//                 <input type='text' placeholder='From' id="inps" onChange={e => setFrom(e.target.value)} />
//               </div>
//               <div className='col-6'>
//                 <p id="lab">To</p>
//                 <input type='text' placeholder='To' id="inps" onChange={e => setTo(e.target.value)} />
//               </div>
//               <div className='col-12'>
//                 <p id="lab">Date</p>
//                 <input type="date" onChange={e => setDate(e.target.value)} />
//               </div>
//               <div className='col'>
//                 <button id="search" onClick={handleSearch}>Search Flight</button>
//               </div>
//             </div>
//           </div>
//         )}

//         <div className='row'>
//           {flights.length > 0 ? (
//             seatSelect ? (
//               <>
//                 <h4 className='mt-3'>Select Your Seats</h4>
//                 {flights.map((seat, index) => (
//                   <div className='col-3 mb-2' key={index}>
//                     <div className='border p-2 rounded'>
//                       <input
//                         type='checkbox'
//                         checked={selectedSeats.includes(seat.seatNumber)}
//                         onChange={() => toggleSeat(seat.seatNumber)}
//                       />
//                       <span className='ms-2'>{seat.seatNumber} - {seat.seatClass}</span>
//                     </div>
//                   </div>
//                 ))}
//                 <div className="mt-3">
//                   <button className="btn btn-primary" onClick={() => alert(`Selected: ${selectedSeats.join(", ")}`)}>
//                     Confirm Booking
//                   </button>
//                 </div>
//               </>
//             ) : (
//               flights.map((flight, index) => (
//                 <div className='row mb-3 border' key={index} id="cons-tick">
//                   <div className='col'>
//                     <p><strong>{flight.airlineName}</strong></p>
//                     <p><strong>{flight.flightName}</strong></p>
//                   </div>
//                   <div className='col'>
//                     <p><strong>From:</strong> {flight.origin} <strong>To:</strong> {flight.destination}</p>
//                     <p><strong>Departure:</strong> {flight.departureTime} <br /> <strong>Arrival:</strong> {flight.arrivalTime}</p>
//                   </div>
//                   <div className='col'>
//                     <p>Fare: <strong> ₹{flight.fare}</strong></p>
//                     <button id="book" className="btn btn-success" onClick={() => handleBookClick(flight.scheduleId)}>Book</button>
//                   </div>
//                 </div>
//               ))
//             )
//           ) : (
//             error && <div className="alert alert-danger" id='errs'>No Flights Found</div>
//           )}
//         </div>
//       </div>
//     </>
//   );
// }

// export default Booking;
import { GiArrowFlights } from "react-icons/gi";
import 'bootstrap/dist/css/bootstrap.min.css';
import "../ProjCss/search.css";
import React, { useState } from "react";
import { ReactTyped } from "react-typed";
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Booking() {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [date, setDate] = useState('');
  const [flights, setFlights] = useState([]);
  const [error, setError] = useState('');
  const [seatSelect, setSeatSelect] = useState(false);
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [scheduleId, setScheduleId] = useState(null); // to remember which schedule seats belong to
  const [showSummary, setShowSummary] = useState(false);
  const navigate = useNavigate();
  const [showPaymentSuccess, setShowPaymentSuccess] = useState(false);
  const [showPaymentFail, setShowPaymentFail] = useState(false);
  const [paymentError, setPaymentError] = useState("");
  const [bookingSummary, setBookingSummary] = useState(null);
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
      setSeatSelect(false);
      setSelectedSeats([]);
    } catch (err) {
      console.log(err)
      if(err.response.status == 401){
       
        navigate("/login")
      }else if(err.response.status == 404){
        alert("NO FLIGHTS FOUND !")
      }
      setError("Failed to fetch flights.");
      setFlights([]);
    }
  };

  const handleBookClick = async (id) => {
    try {
      const response = await axios.post(
        "https://192.168.115.161:7101/getSeats",
        {
          scheduleid: parseInt(id)  // must match `dto.scheduleid` in C#
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
          }
        }
      );
    
      setFlights(response.data); // list of seats
      setSeatSelect(true);
      setSelectedSeats([]);
      setScheduleId(id);
    
    } catch (err) {
      console.error(err);
      if (err.response?.status === 401) {
        navigate("/login");
      } else if (err.response?.status === 404) {
        alert("No available seats for this schedule.");
      }
    }
    // console.log(id)
    // try {
    //   const response = await axios.post(`https://192.168.152.161:7101/getSeats`, {
      
     
    //   },{
    //     headers: { 'Content-Type': 'application/json',Authorization:`Bearer ${localStorage.getItem("jwt")}` }
    //   });

    //   setFlights(response.data); // now seats
    //   setSeatSelect(true);
    //   setSelectedSeats([]);
    //   setScheduleId(id);
    // } catch (err) {
      
    //   console.error(err);
    //   if(err.response.status === 401){
    //     navigate("/login")
    //   }
    // }
  };

  const toggleSeat = (seat) => {
    setSelectedSeats(prev => {
      const exists = prev.find(s => s.seatId === seat.seatid);
      return exists
        ? prev.filter(s => s.seatId !== seat.seatid)
        : [...prev, {
            seatId: seat.seatid,
            seatNumber: seat.seatNumber,
            seatClass: seat.seatClass,
            scheduleId: seat.scheduleId
          }];
    });
  };
  const handlePay= async ()=>{
    console.log(bookingSummary)
      try{

        const Response = await axios.post("https://192.168.248.161:7101/api/Booking/book-seat",bookingSummary,{
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("jwt")}`
          }
        });
        console.log("Booking DOne")
        console.log(Response)
        alert(Response.data)
        setShowPaymentSuccess(true); 
      }catch(err){
        if (err.response?.status === 401) {
          navigate("/login");
        } else {
          console.error(err);
          setPaymentError(err.response?.data || "Something went wrong!");
          setShowPaymentFail(true); // Show failure popup
        }
      }
  }
  const confirmBooking = async () => {
    const bookingData = {
      userId: localStorage.getItem("userid"), // Replace with actual user ID
      paymentMethod: "UPI", // or any other method
      seats: selectedSeats.map(seat => ({
        scheduleId: seat.scheduleId,
        seatId: seat.seatId,
        seatNumber: seat.seatNumber,
        seatClass: seat.seatClass // "ECONOMY" or "PREMIUM"
      }))
    };
    console.log("Booking Preview:", bookingData);
    
  setBookingSummary(bookingData);
  setShowSummary(true)// ✅ control with flag
  setFlights([]); // ✅ safe now
  
    try {
      console.log(bookingData)
      // setFlights([])
    
      // const response = await axios.post("https:/192.168.244.161:7101/api/booking/book-seat", bookingData);
      // console.log("Booking success:", response.data);
      // alert("Booking successful!");
    } catch (error) {
      // console.error("Booking failed:", error.response?.data || error.message);
      // alert("Booking failed!");
    }
  };

 
    return (
  <>
    <div id="OUTER">
      {/* Main Heading */}
      <h1 style={{ textAlign: "center" }}>
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
      </h1>

      {/* Show Search Form only if not selecting seat and not showing summary */}
      {!seatSelect && !showSummary && (
        <div id="CONS">
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
      )}

      {/* Show Seat Selection */}
      {seatSelect && !showSummary && (
        <>
          <h4 className="mb-3 mt-4">Select Your Seats</h4>
          <div className="row mt-2">
            {flights.map((seat, index) => (
              <div className="col-3 mb-2" key={index}>
                <div className="border p-2 rounded">
                  <input
                    type="checkbox"
                    checked={selectedSeats.some(
                      (s) => s.seatId === seat.seatid
                    )}
                    onChange={() => toggleSeat(seat)}
                  />
                  <span className="ms-2">
                    {seat.seatNumber} - {seat.seatClass}
                  </span>
                </div>
              </div>
            ))}
          </div>
          <button className="btn btn-primary mt-3" onClick={confirmBooking}>
            Confirm Booking
          </button>
        </>
      )}

      {/* Show Booking Summary */}
      {showSummary && bookingSummary && (
        <div id="summary" className="mt-4 border p-3 rounded bg-light">
          <h4>Booking Summary</h4>
          <p><strong>User ID:</strong> {bookingSummary.userId}</p>
          <p><strong>Payment Method:</strong> {bookingSummary.paymentMethod}</p>

          <table className="table mt-3">
            <thead>
              <tr>
              
                <th>Seat Number</th>
                <th>Seat Class</th>
              </tr>
            </thead>
            <tbody>
              {bookingSummary.seats.map((seat, index) => (
                <tr key={index}>
                
                  <td>{seat.seatNumber}</td>
                  <td>{seat.seatClass}</td>
                </tr>
              ))}
            </tbody>
          </table>

          <button className="btn btn-success mt-2" onClick={handlePay}>
            Pay
          </button>
          {/* ✅ Payment Success Modal */}
      {showPaymentSuccess && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-success text-white">
                <h5 className="modal-title">Payment Successful</h5>
              </div>
              <div className="modal-body">
                <p>Your booking was successful!</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-success" onClick={() => navigate("/login")}>
                  Go to Bookings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ❌ Payment Failure Modal */}
      {showPaymentFail && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header bg-danger text-white">
                <h5 className="modal-title">Payment Failed</h5>
              </div>
              <div className="modal-body">
                <p>{paymentError}</p>
              </div>
              <div className="modal-footer">
                <button className="btn btn-danger" onClick={() => setShowPaymentFail(false)}>
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
        </div>
      )}

      {/* Show Flight Results */}
      {!seatSelect && !showSummary && (
        <div className="row mt-4">
          {flights.length > 0 ? (
            flights.map((flight, index) => (
              <div className="row mb-3" key={index} id="cons-tick">
                <div className="col">
                  <p><strong>{flight.airlineName}</strong></p>
                  <p><strong>{flight.flightName}</strong></p>
                </div>
                <div className="col">
                  <p><strong>From:</strong> {flight.origin} <strong>To:</strong> {flight.destination}</p>
                  <p><strong>Departure:</strong> {flight.departureTime} <br /> <strong>Arrival:</strong> {flight.arrivalTime}</p>
                </div>
                <div className="col">
                  <p>Fare: <strong>₹{flight.fare}</strong></p>
                  <button
                    id="book"
                    className="btn btn-success"
                    onClick={() => handleBookClick(flight.scheduleId)}
                  >
                    Book
                  </button>
                </div>
              </div>
            ))
          ) : (
            error && (
              <div className="alert alert-danger" id="errs">
                No Flights Found
              </div>
            )
          )}
        </div>
      )}
    </div>
  </>


    )
}

export default Booking;
