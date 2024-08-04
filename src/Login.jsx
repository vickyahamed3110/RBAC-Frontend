import React, { useState } from 'react';
import { json, Link, useNavigate } from 'react-router-dom';
import { loginData } from './apis';
import "./App.css";

const Login = () => {
  const navigate = useNavigate();
  const[loginpopup, setloginpopup] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit =async (e) => {
    e.preventDefault();
    const data = await loginData(formData);
    if (data.code ===0){
      setloginpopup(true);
      setTimeout(() => {
        setloginpopup(false);
      },5000);
    } else {
      navigate("/home");
      localStorage.setItem("role", data.role)
    }
  }
    
 // Handle form submission, e.g., send data to API
  

  return (
    <div className="container mt-5">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          {loginpopup && <div className="loginpopup">Password incorrect</div>}
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input
            type="password"
            className="form-control"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
        </div>
        <button type="submit" className="btn btn-primary">Login</button>
        <Link to="/" style = {{float:"right"}}>Register</Link>
      </form>
    </div>
  );
};

export default Login;
