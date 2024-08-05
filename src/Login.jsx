import React, { useState } from 'react';
import { json, Link, useNavigate } from 'react-router-dom';
import { loginData } from './apis';
import "./App.css";

const Login = () => {
  const navigate = useNavigate();
  const[loginpopup, setloginpopup] = useState(false);
  const [showPassword, setShowPassword] = useState(false)
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
  const changePwdView = () => {
    if (showPassword){
      setShowPassword(false)
    } else {
      setShowPassword(true)
    }
    }
    
 // Handle form submission, e.g., send data to API
  

  return (
      
      <div className="d-flex flex-column align-items-center mt-5" >
      <form onSubmit={handleSubmit} style={{width:"60vw"}}>
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
          <div className="d-flex align-items-center border rounded">
          <input
            type={showPassword ? "text":"password"}
            className="form-control border-0"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />{!showPassword ?<i className="fa-solid fa-eye me-2" onClick = {changePwdView}></i>
          : <i class="fa-solid fa-eye-slash" onClick ={changePwdView}></i>}
        </div>
          </div>
          
        <button type="submit" className="btn btn-primary">Login</button>
        <Link to="/" style = {{float:"right"}}>Register</Link>
      </form>
      </div>
  );
};

export default Login;
