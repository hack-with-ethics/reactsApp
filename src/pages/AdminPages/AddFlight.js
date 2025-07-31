import "../../ProjCss/AdminCss/AddFlights.css"
import { RiFlightTakeoffLine } from "react-icons/ri";
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import { MdFlight } from "react-icons/md";
const origins = ['Chennai', 'Coimbatore', 'Kerala', 'Delhi'];
const bagOptions = ['7', '10', '15', '20']; // in KG
const ownerIds = ['1001', '1002', '1003']; // Replace with real owner ID list

const AddFlight = () => {
  const [form, setForm] = useState({
    flightNumber: '',
    flightName: '',
    airlineName: '',
    origin: '',
    destination: '',
    baggageCheckIn: '',
    baggageCabin: '',
    totalSeats: 30,
    departureDate: '',
    departureTime: '',
    arrivalTime: '',
    economySeats: 15,
    premiumSeats: 15,
    fare: '',
    ownerId: ''
  });

  const [popup, setPopup] = useState({ show: false, success: true, message: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const validate = () => {
    for (let key in form) {
      if (!form[key] && form[key] !== 0) return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      setPopup({ show: true, success: false, message: 'Please fill in all fields correctly.' });
      setTimeout(() => {
        setPopup({ show: false, message: '', success: true });
      }, 4000);
    }

    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/todos/1')//form);
      if (response.status === 200) {
        setPopup({ show: true, success: true, message: 'Flight added successfully!' });
        setForm({
          flightNumber: '', flightName: '', airlineName: '',
          origin: '', destination: '', baggageCheckIn: '',
          baggageCabin: '', totalSeats: 30, departureDate: '',
          departureTime: '', arrivalTime: '', economySeats: 15,
          premiumSeats: 15, fare: '', ownerId: ''
        });
        setTimeout(() => {
            setPopup({ show: false, message: '', success: true });
          }, 4000);
      }
    } catch (err) {
      setPopup({ show: true, success: false, message: 'Failed adding flight.' });
      setTimeout(() => {
        setPopup({ show: false, message: '', success: true });
      }, 4000);
    }
  };

  return (
    <div className="container" style={{marginTop:"155px"}}>
      <form onSubmit={handleSubmit} className="form-card shadow-lg p-4 rounded-4">
        <h4 className="text-center mb-4 form-title">Add Flight<span>    </span>  <RiFlightTakeoffLine /> </h4>

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
            <input type="date" className="form-control stylish-input" name="departureDate" placeholder="depatureDate" value={form.departureDate} onChange={handleChange} />
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
          <button type="submit" className="btn stylish-button">Add Flight   <MdFlight /></button>
        </div>
      </form>

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