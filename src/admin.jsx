import React, { useEffect, useState } from 'react';
import { getUserData, getLoggedUserData } from './apis';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const Admin= () => {
  const [admin, setAdmin] = useState([])
  const [email, setEmail] = useState(false)
  const[role, setRole] = useState('')
  const navigate = useNavigate()
  const token = localStorage.getItem("role")
  const details = jwtDecode(token)
  const getAdmin= async () =>{
    const data = await getUserData()
    const filterItems = data.filter((admin)=>admin.role =='Admin')
    setAdmin(filterItems)
  } 
  useEffect(() =>{
    getAdmin()
  },[]) 
  const detailsUser = async() => {
    const data = await getLoggedUserData(details.email)
    setEmail(data.isAccepted)
    setRole(data.role)
   }
   useEffect(() => {
     detailsUser()
   },[])
  if(role !="Admin"){
    return <h1>You are not authorized</h1>
     }
  return (
    <div className="container mt-4" style ={{display:"flex", flexDirection:'column', alignItems:"center"}}>
        <div className="d-flex justify-content-between" style={{width:"100vw", paddingLeft:"5rem", paddingRight:"5rem"}}>
        <h2>Admin List</h2>
        <h1 className='text-primary'><img src= "https://cdn-icons-png.flaticon.com/128/2103/2103665.png"
       style={{height:"40px"}}/> RBAC SOLUTIONS</h1>
        <button className ="btn btn-primary"onClick={() =>navigate("/home")} style={{height:"40px"}}>Home</button>
        <button className ="btn btn-primary"onClick={() =>navigate("/request")} style={{height:"40px"}}>Request</button>
        </div>
      <table className="table table-striped" style={{maxWidth:"600px" , textAlign:"center"}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Working Period</th>
          </tr>
        </thead>
        <tbody>
          {admin.map((admin, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{admin.name}</td>
              <td>{admin.role}</td>
              <td>{admin.date}Yrs</td>
              
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Admin;
