import { useState } from "react";
import "./App.css";
import { storeData } from "./apis.js";
import { Link, Navigate, useNavigate } from "react-router-dom";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false)
  const [role, setRole] = useState("Admin");
  const [popup, setpopup] = useState(false);
  const isAuthenticated = Boolean(localStorage.getItem("isAuthenticated"));

  const navigate = useNavigate();

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission logic
    console.log({name, email, password, role})
   const data =  await storeData({ name, email, password, role });
    if (data.code === 1 ){
      setpopup(true)
      setTimeout(() => {
        setpopup(false)
      }, 5000);
    } else if(data.code===0) {
      navigate("/login");
    } else {
      console.log("something error")
    }
   };
   const changePwdView = () => {
    if (showPassword){
      setShowPassword(false)
    } else {
      setShowPassword(true)
    }
    }

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            {popup && <div className="popup">Admin/User already exists</div>}
            <div className="card-header">
              <h3 className="text-center">Register</h3>
            </div>
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input 
                    type="text"
                    className="form-control"
                    id="name"
                    placeholder="Enter your name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="password">Password</label>
                 <div className="d-flex align-items-center border rounded"> 
                  <input 
                    type={showPassword ? "text":"password"}
                    className="form-control border-0" 
                    id="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  /> {!showPassword ?<i className="fa-solid fa-eye me-2" onClick = {changePwdView}></i>
                 : <i class="fa-solid fa-eye-slash" onClick ={changePwdView}></i>}
                  </div>
                  
                </div>
                <div className="form-group">
                  <label htmlFor="roles">Roles</label>
                  <select
                    className="form-control"
                    id="role"
                    value={role}
                    onChange={handleRoleChange}
                    required
                  >
                    
                    <option value="User">User</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <button type="submit" className="btn btn-primary btn-block">
                  Register
                </button>
                <Link to="/login" style = {{float:"right"}}>Login</Link>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;