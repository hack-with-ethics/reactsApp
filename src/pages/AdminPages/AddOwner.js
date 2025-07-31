import React, { useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import "../../ProjCss/AdminCss/AddOwner.css"
import { FaUsersCog } from "react-icons/fa";
import { HiLogin } from "react-icons/hi";
const existingUsers = ['john123', 'alice', 'admin'];

const AddOwner = () => {
  const [form, setForm] = useState({
    firstname: '',
    lastname: '',
    email: '',
    username: '',
    password: '',
    role: 'user',
    gender: '',
    phone: '',
    address: ''
  });

  const [errors, setErrors] = useState({});
  const [popup, setPopup] = useState({ visible: false, message: '', type: '' });


  const validate = () => {
    const errs = {};
    if (!form.email.includes('@')) errs.email = 'Email must contain @';
    if (existingUsers.includes(form.username.toLowerCase())) errs.username = 'Username already exists';

    if (
      form.password.length < 8 ||
      !/[a-z]/.test(form.password) ||
      !/[A-Z]/.test(form.password) ||
      !/[!@#$%^&*]/.test(form.password)
    ) {
      errs.password = 'Password must be 8+ chars, include uppercase, lowercase, and symbol';
    }

    if (!/^\d{10}$/.test(form.phone)) errs.phone = 'Phone must be exactly 10 digits';
    return errs;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };



  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    alert("SEND REQUEST")
    if (Object.keys(validationErrors).length === 0) {
        console.log(form)
        try {
          const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1') //form);
      
          if (res.status === 200) {
            setPopup({ visible: true, message: '✅ User added successfully!', type: 'success' });
            setForm({
              firstname: '',
              lastname: '',
              email: '',
              username: '',
              password: '',
              role: 'user',
              gender: '',
              phone: '',
              address: ''
            });
      
            setTimeout(() => {
              setPopup({ visible: false, message: '', type: '' });
            }, 4000);
          }
        } catch (err) {
          setPopup({ visible: true, message: '❌ Error in registering user', type: 'error' });
          setTimeout(() => {
            setPopup({ visible: false, message: '', type: '' });
          }, 4000);
        }
      }
      
  };

  return (
    <div className="container" style={{marginTop:"155px"}}>
 {popup.visible && (
  <div className="center-popup">
    <div className={`popup-card text-center shadow-lg ${popup.type}`}>
      {popup.message}
    </div>
  </div>
)}


      <form onSubmit={handleSubmit} className="form-card shadow-lg p-4 rounded-4">
        <h3 className="text-center mb-4 form-title">Add Users <FaUsersCog />
        </h3>

        {/* <div className="row mb-3">
          <div className="col">
            <input type="text" className="form-control stylish-input" name="firstname" placeholder="First Name" value={form.firstname} onChange={handleChange} required />
          </div>
          <div className="col">
            <input type="text" className="form-control stylish-input" name="lastname" placeholder="Last Name" value={form.lastname} onChange={handleChange} required />
          </div>
        </div> */}

        <div className="mb-3">
          <input type="email" className={`form-control stylish-input ${errors.email && 'is-invalid'}`} name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
          {errors.email && <div className="text-danger small">{errors.email}</div>}
        </div>

        <div className="row mb-3">
          <div className="col">
            <input type="text" className={`form-control stylish-input ${errors.username && 'is-invalid'}`} name="username" placeholder="Username" value={form.username} onChange={handleChange} required />
            {errors.username && <div className="text-danger small">{errors.username}</div>}
          </div>
          <div className="col">
            <input type="password" className={`form-control stylish-input ${errors.password && 'is-invalid'}`} name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
            {errors.password && <div className="text-danger small">{errors.password}</div>}
          </div>
        </div>

        <div className="row mb-3">
          <div className="col">
            <select className="form-select stylish-input" name="role" value={form.role} onChange={handleChange}>
              <option value="user">User</option>
              <option value="owner">Owner</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div className="col">
            <select className="form-select stylish-input" name="gender" value={form.gender} onChange={handleChange}>
              <option value="">Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>

        <div className="mb-3">
          <input type="tel" className={`form-control stylish-input ${errors.phone && 'is-invalid'}`} name="phone" placeholder="Phone" value={form.phone} onChange={handleChange} />
          {errors.phone && <div className="text-danger small">{errors.phone}</div>}
        </div>

        <div className="mb-3">
          <textarea rows="2" className="form-control stylish-input small-textarea" name="address" placeholder="Address" value={form.address} onChange={handleChange}></textarea>
        </div>

        <div className="d-grid">
          <button type="submit" className="btn stylish-button">Register  <HiLogin /></button>
        </div>
      </form>
    </div>
  );
};

export default AddOwner;
