// import "../../ProjCss/AdminCss/AddFlights.css"
// import { RiFlightTakeoffLine } from "react-icons/ri";
// // import React, { useState } from 'react';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import axios from 'axios';
// import { MdFlight } from "react-icons/md";
// import { useEffect } from "react";
// // Replace with real owner ID list
// import { useState } from "react";
// const AddFlight = () => {
//   const origins = ['Chennai', 'Coimbatore', 'Kerala', 'Delhi'];
//   const bagOptions = ['7', '10', '15', '20']; // in KG
//   const [ownerIds,setOwnerIds] = useState([]); 
//   const [form, setForm] = useState({
//     flightNumber: '',
//     flightName: '',
//     airlineName: '',
//     origin: '',
//     destination: '',
//     baggageCheckIn: '',
//     baggageCabin: '',
//     totalSeats: 30,
//     departureDate: '',
//     departureTime: '',
//     arrivalTime: '',
//     economySeats: 15,
//     premiumSeats: 15,
//     fare: '',
//     ownerId: ''
//   });

//   const [popup, setPopup] = useState({ show: false, success: true, message: '' });
//  useEffect(() => {
    
//       axios.get('https://192.168.115.161:7101/getowners',{
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("jwt")}`
//         }
//       }) // Replace with your GET /users
//         .then(res => {
//           console.log(res.data)
//           const usernames = res.data.map(u => u.userId);
//           setOwnerIds(usernames);
//           console.log("owners Mapped !")
//         })
//         .catch(err => console.error("Error loading users", err));
    
//   }, []);
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setForm((prev) => ({ ...prev, [name]: value }));
//   };

//   const validate = () => {
//     for (let key in form) {
//       if (!form[key] && form[key] !== 0) return false;
//     }
//     return true;
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (!validate()) {
//       setPopup({ show: true, success: false, message: 'Please fill in all fields correctly.' });
//       setTimeout(() => {
//         setPopup({ show: false, message: '', success: true });
//       }, 4000);
//     }

//     try {
//       console.log(form)
//       const response = await axios.post('https://192.168.115.161:7101/add-flight-with-schedule',form,{
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${localStorage.getItem("jwt")}`
//         }
//       })//form);
//       console.log(response.data)
//       if (response.status === 200) {
//         setPopup({ show: true, success: true, message: 'Flight added successfully!' });
//         setForm({
//           flightNumber: '', flightName: '', airlineName: '',
//           origin: '', destination: '', baggageCheckIn: '',
//           baggageCabin: '', totalSeats: 30, departureDate: '',
//           departureTime: '', arrivalTime: '', economySeats: 15,
//           premiumSeats: 15, fare: '', ownerId: ''
//         });
//         setTimeout(() => {
//             setPopup({ show: false, message: '', success: true });
//           }, 4000);
//       }
//     } catch (err) {
//       setPopup({ show: true, success: false, message: 'Failed adding flight.' });
//       setTimeout(() => {
//         setPopup({ show: false, message: '', success: true });
//       }, 4000);
//     }
//   };

//   return (
//     <div className="container" style={{marginTop:"155px"}}>
//       <form onSubmit={handleSubmit} className="form-card shadow-lg p-4 rounded-4">
//         <h4 className="text-center mb-4 form-title">Add Flight<span>    </span>  <RiFlightTakeoffLine /> </h4>

//         <div className="row mb-3">
//           <div className="col">
//             <input type="text" className="form-control stylish-input" name="flightNumber" placeholder="Flight Number" value={form.flightNumber} onChange={handleChange} />
//           </div>
//           <div className="col">
//             <input type="text" className="form-control stylish-input" name="flightName" placeholder="Flight Name" value={form.flightName} onChange={handleChange} />
//           </div>
//         </div>

//         <div className="mb-3">
//           <input type="text" className="form-control stylish-input" name="airlineName" placeholder="Airline Name" value={form.airlineName} onChange={handleChange} />
//         </div>

//         <div className="row mb-3">
//           <div className="col">
//             <select className="form-select stylish-input" name="origin" value={form.origin} onChange={handleChange}>
//               <option value="">Select Origin</option>
//               {origins.map(city => <option key={city}>{city}</option>)}
//             </select>
//           </div>
//           <div className="col">
//             <select className="form-select stylish-input" name="destination" value={form.destination} onChange={handleChange}>
//               <option value="">Select Destination</option>
//               {origins.map(city => <option key={city}>{city}</option>)}
//             </select>
//           </div>
//         </div>

//         <div className="row mb-3">
//           <div className="col">
//             <select className="form-select stylish-input" name="baggageCheckIn" value={form.baggageCheckIn} onChange={handleChange}>
//               <option value="">Check-in Baggage (kg)</option>
//               {bagOptions.map(kg => <option key={kg}>{kg}</option>)}
//             </select>
//           </div>
//           <div className="col">
//             <select className="form-select stylish-input" name="baggageCabin" value={form.baggageCabin} onChange={handleChange}>
//               <option value="">Cabin Baggage (kg)</option>
//               {bagOptions.map(kg => <option key={kg}>{kg}</option>)}
//             </select>
//           </div>
//         </div>

//         <div className="row mb-3">
//           <div className="col">
//           <p>Departure Date</p>
//             <input type="date" className="form-control stylish-input" name="departureDate" placeholder="depatureDate" value={form.departureDate} onChange={handleChange} />
//           </div>
//           <div className="col">
//             <p>Departure Time</p>
//             <input type="time" className="form-control stylish-input" name="departureTime" value={form.departureTime} onChange={handleChange} />
//           </div>
//           <div className="col">
//           <p>Arrival Time</p>
//             <input type="time" className="form-control stylish-input" name="arrivalTime" value={form.arrivalTime} onChange={handleChange} />
//           </div>
//         </div>

//         <div className="row mb-3">
//           <div className="col">
//             <input type="number" className="form-control stylish-input" name="fare" placeholder="Fare (₹)" value={form.fare} onChange={handleChange} />
//           </div>
//           <div className="col">
//             <select className="form-select stylish-input" name="ownerId" value={form.ownerId} onChange={handleChange}>
//               <option value="">Select Owner ID</option>
//               {ownerIds.map(id => <option key={id}>{id}</option>)}
//             </select>
//           </div>
//         </div>

//         <div className="d-grid">
//           <button type="submit" className="btn stylish-button">Add Flight   <MdFlight /></button>
//         </div>
//       </form>

//       {popup.show && (
//         <div className="center-popup">
//           <div className={`popup-card text-center shadow-lg ${popup.success ? 'success' : 'error'}`}>
//             {popup.message}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };



// export default AddFlight;
import React, { useEffect, useState } from 'react';
import "../../ProjCss/AdminCss/AddFlights.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { MdFlight, MdDelete } from "react-icons/md";
import { RiFlightTakeoffLine } from "react-icons/ri";

const AddFlight = () => {
  const origins = ['Chennai', 'Coimbatore', 'Kerala', 'Delhi'];
  const bagOptions = ['7', '10', '15', '20'];
  const [ownerIds, setOwnerIds] = useState([]);
  const [activeTab, setActiveTab] = useState('add'); // 'add' or 'remove'
  const [updateForm, setUpdateForm] = useState({
    flightId: '',
    origin: '',
    destination: '',
    departureDate: '',
    departureTime: '',
  });
  const handleUpdateChange = (e) => {
    const { name, value } = e.target;
    setUpdateForm(prev => ({ ...prev, [name]: value }));
  };
const handleUpdateFlight = async () => {
  if (!updateForm.flightId || !updateForm.origin || !updateForm.destination || !updateForm.departureDate || !updateForm.departureTime) {
    setPopup({ show: true, success: false, message: 'All fields required for update.' });
    hidePopup();
    return;
  }

  const payload = {
    flightId: updateForm.flightId,
    origin: updateForm.origin,
    destination: updateForm.destination,
    departureDate: updateForm.departureDate,
    departureTime: updateForm.departureTime
  };

  try {
    const res = await axios.post('https://192.168.115.161:7101/updateflight', payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    });

    if (res.status === 200) {
      setPopup({ show: true, success: true, message: 'Flight updated successfully!' });
      setUpdateForm({ flightId: '', origin: '', destination: '', departureDate: '', departureTime: '' });
    }
  } catch (err) {
    setPopup({ show: true, success: false, message: 'Failed to update flight.' });
  }
  hidePopup();
};
    
  const [form, setForm] = useState({
    flightNumber: '',
    flightName: '',
    airlineName: '',
    origin: '',
    destination: '',
    baggageCheckInkg: 0,
    baggageCabinkg: 0,
    totalSeats: 30,
    departureDate: '',
    departureTime: '',
    arrivalTime: '',
    economySeats: 15,
    premiumSeats: 15,
    fare: '',
    ownerId: ''
  });

  const [flightIds, setFlightIds] = useState([]);
  const [selectedFlightId, setSelectedFlightId] = useState('');
  const [popup, setPopup] = useState({ show: false, success: true, message: '' });

  useEffect(() => {
    // Load owners
    axios.get('https://192.168.115.161:7101/getowners', {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    }).then(res => {
      const usernames = res.data.map(u => u.userId);
      setOwnerIds(usernames);
    }).catch(err => console.error("Error loading owners", err));

    // Load flights for deletion
    axios.get('https://192.168.115.161:7101/getflights', {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`
      }
    }).then(res => {
      const ids = res.data.map(f => f.flightId);
      setFlightIds(ids);
    }).catch(err => console.error("Error loading flights", err));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: (name === "baggageCheckIn" || name === "baggageCabin") ? parseInt(value) : value}));
  };

  const validate = () => {
    for (let key in form) {
      if (!form[key] && form[key] !== 0) return false;
    }
    return true;
  };

  const handleAddFlight = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setPopup({ show: true, success: false, message: 'Please fill in all fields correctly.' });
      hidePopup();
      return;
    }

    try {
      const response = await axios.post('https://192.168.115.161:7101/add-flight-with-schedule', form, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
      });

      if (response.status === 200) {
        setPopup({ show: true, success: true, message: 'Flight added successfully!' });
        setForm({
          flightNumber: '', flightName: '', airlineName: '',
          origin: '', destination: '', baggageCheckIn: 0,
          baggageCabin: 0, totalSeats: 30, departureDate: '',
          departureTime: '', arrivalTime: '', economySeats: 15,
          premiumSeats: 15, fare: '', ownerId: ''
        });
      }
    } catch (err) {
      setPopup({ show: true, success: false, message: 'Failed adding flight.' });
    }
    hidePopup();
  };

  const handleRemoveFlight = async () => {
    if (!selectedFlightId) {
      setPopup({ show: true, success: false, message: 'Please select a flight to remove.' });
      hidePopup();
      return;
    }

    try {
      const response = await axios.delete(`https://192.168.115.161:7101/removeflight/${selectedFlightId}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`
        }
      });
      console.log(response.data)
      if (response.status === 200) {
        setPopup({ show: true, success: true, message: 'Flight removed successfully!' });
        setFlightIds(flightIds.filter(id => id !== selectedFlightId));
        setSelectedFlightId('');
        
      }
    } catch (err) {
      setPopup({ show: true, success: false, message: 'Failed to remove flight.' });
    }
    hidePopup();
  };

  const hidePopup = () => {
    setTimeout(() => {
      setPopup({ show: false, message: '', success: true });
    }, 3000);
  };

  return (
    <div className="container" style={{ marginTop: "130px" }}>
      {/* Toggle Buttons */}
      <div className="text-center mb-4">
        <button
          className={`btn mx-2 ${activeTab === 'add' ? 'btn-primary' : 'btn-outline-primary'}`}
          onClick={() => setActiveTab('add')}
        >
          Add Flight
        </button>
        <button
          className={`btn mx-2 ${activeTab === 'remove' ? 'btn-danger' : 'btn-outline-danger'}`}
          onClick={() => setActiveTab('remove')}
        >
          Remove Flight
        </button>
        <button
      className={`btn mx-2 ${activeTab === 'update' ? 'btn-warning' : 'btn-outline-warning'}`}
      onClick={() => setActiveTab('update')}
    >
      Update Flight
    </button>
      </div>

      {/* Add Flight Form */}
      {activeTab === 'add' && (
        <form onSubmit={handleAddFlight} className="form-card shadow-lg p-4 rounded-4">
          <h4 className="text-center mb-4 form-title">Add Flight <RiFlightTakeoffLine /></h4>

          <div className="row mb-3">
            <div className="col">
              <input type="text" className="form-control stylish-input" name="flightNumber" placeholder="Flight Number" value={form.flightNumber} onChange={handleChange} />
            </div>
            <div className="col">
              <input type="text" className="form-control stylish-input" name="flightName" placeholder="Flight Name" value={form.flightName} onChange={handleChange} />
            </div>
          </div>

          <div className="mb-3">
            <input type="text" className="form-control stylish-input" name="airlineName" placeholder="Airline Name" value={form.airlineName} onChange={handleChange} />
          </div>

          <div className="row mb-3">
            <div className="col">
              <select className="form-select stylish-input" name="origin" value={form.origin} onChange={handleChange}>
                <option value="">Select Origin</option>
                {origins.map(city => <option key={city}>{city}</option>)}
              </select>
            </div>
            <div className="col">
              <select className="form-select stylish-input" name="destination" value={form.destination} onChange={handleChange}>
                <option value="">Select Destination</option>
                {origins.map(city => <option key={city}>{city}</option>)}
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <select className="form-select stylish-input" name="baggageCheckIn" value={form.baggageCheckIn} onChange={handleChange}>
                <option value="">Check-in Baggage (kg)</option>
                {bagOptions.map(kg => <option key={kg}>{kg}</option>)}
              </select>
            </div>
            <div className="col">
              <select className="form-select stylish-input" name="baggageCabin" value={form.baggageCabin} onChange={handleChange}>
                <option value="">Cabin Baggage (kg)</option>
                {bagOptions.map(kg => <option key={kg}>{kg}</option>)}
              </select>
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <p>Departure Date</p>
              <input type="date" className="form-control stylish-input" name="departureDate" value={form.departureDate} onChange={handleChange} />
            </div>
            <div className="col">
              <p>Departure Time</p>
              <input type="time" className="form-control stylish-input" name="departureTime" value={form.departureTime} onChange={handleChange} />
            </div>
            <div className="col">
              <p>Arrival Time</p>
              <input type="time" className="form-control stylish-input" name="arrivalTime" value={form.arrivalTime} onChange={handleChange} />
            </div>
          </div>

          <div className="row mb-3">
            <div className="col">
              <input type="number" className="form-control stylish-input" name="fare" placeholder="Fare (₹)" value={form.fare} onChange={handleChange} />
            </div>
            <div className="col">
              <select className="form-select stylish-input" name="ownerId" value={form.ownerId} onChange={handleChange}>
                <option value="">Select Owner ID</option>
                {ownerIds.map(id => <option key={id}>{id}</option>)}
              </select>
            </div>
          </div>

          <div className="d-grid">
            <button type="submit" className="btn stylish-button">Add Flight <MdFlight /></button>
          </div>
        </form>
      )}

      {/* Remove Flight */}
      {activeTab === 'remove' && (
        <form className="container" id="_remove_flg">
          <h4 className="text-center mb-4 form-title">Remove Flight <MdDelete /></h4>
          <div className="mb-3">
            <select
              className="form-select stylish-input"
              value={selectedFlightId}
              onChange={(e) => setSelectedFlightId(e.target.value)}
            >
              <option value="">Select Flight ID</option>
              {flightIds.map(id => (
                <option key={id} value={id}>{id}</option>
              ))}
            </select>
          </div>
          <div className="d-grid">
            <button
              type="button"
              className="btn btn-danger stylish-button"
              onClick={handleRemoveFlight}
            >
              Remove Flight <MdDelete />
            </button>
          </div>
        </form>
      )}
      {activeTab === 'update' && (
  <form className="form-card shadow-lg p-4 rounded-4">
    <h4 className="text-center mb-4 form-title">Update Flight <MdFlight /></h4>

    <div className="mb-3">
      <select
        className="form-select stylish-input"
        name="flightId"
        value={updateForm.flightId}
        onChange={handleUpdateChange}
      >
        <option value="">Select Flight ID</option>
        {flightIds.map(id => (
          <option key={id} value={id}>{id}</option>
        ))}
      </select>
    </div>

    <div className="row mb-3">
      <div className="col">
        <select
          className="form-select stylish-input"
          name="origin"
          value={updateForm.origin}
          onChange={handleUpdateChange}
        >
          <option value="">Select New Origin</option>
          {origins.map(city => <option key={city}>{city}</option>)}
        </select>
      </div>
      <div className="col">
        <select
          className="form-select stylish-input"
          name="destination"
          value={updateForm.destination}
          onChange={handleUpdateChange}
        >
          <option value="">Select New Destination</option>
          {origins.map(city => <option key={city}>{city}</option>)}
        </select>
      </div>
    </div>

    <div className="row mb-3">
      <div className="col">
        <p>New Departure Date</p>
        <input
          type="date"
          className="form-control stylish-input"
          name="departureDate"
          value={updateForm.departureDate}
          onChange={handleUpdateChange}
        />
      </div>
      <div className="col">
        <p>New Departure Time</p>
        <input
          type="time"
          className="form-control stylish-input"
          name="departureTime"
          value={updateForm.departureTime}
          onChange={handleUpdateChange}
        />
      </div>
    </div>

    <div className="d-grid">
      <button
        type="button"
        className="btn btn-warning stylish-button"
        onClick={handleUpdateFlight}
      >
        Update Flight <MdFlight />
      </button>
    </div>
  </form>
)}


      {/* Popup */}
      {popup.show && (
        <div className="center-popup">
          <div className={`popup-card text-center shadow-lg ${popup.success ? 'success' : 'error'}`}>
            {popup.message}
          </div>
        </div>
      )}
    </div>
  );
};

export default AddFlight;
