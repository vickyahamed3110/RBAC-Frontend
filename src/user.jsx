import React, { useEffect, useState } from 'react';
import { deleteUserData, getUserData, assignRole, changeForm} from './apis';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

const User= () => {
  const [user, setUser] = useState([])
  const [render, setRender] = useState(0)
  const [role, setRole] = useState("")
  const navigate = useNavigate()
  const token = localStorage.getItem("role")
  const details = jwtDecode(token)
  const deleteUser = async (email) => {
    console.log(email)
    await deleteUserData(email)
    setRender(render + 1)
  }
  const getUser= async () =>{
    const data = await getUserData()
    setUser(data)
  }
  const handleRoleChange = async(event, email) => {
  setRole(event.target.value);
  console.log({role:event.target.value})
   console.log(email)
   await assignRole({email, role:event.target.value})
   setRender(render + 1)
  };
  // const assignRoleFn = async(email) =>{
  //   await assignRole({email, role})
  // }
  const handleShow = async (useremail) => {
    await changeForm({useremail})
    setRender(render + 1)
  }
  useEffect(() =>{
    getUser()
  },[render]) 
  return (
      <div className="container mt-4" style ={{display:"flex", flexDirection:'column', alignItems:"center"}}>
      <div className='d-flex justify-content-between' style={{width:"100vw", paddingLeft:"5rem", paddingRight:"5rem"}} >
      <h2>User List</h2>
      <h1 className='text-primary'>RBAC SOLUTIONS</h1>
      <button className ="btn btn-primary"onClick={() =>navigate("/home")}style={{height:"40px"}}>Home</button>
      </div>
      
      <table className="table table-striped" style={{maxWidth:"600px"}}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Role</th>
            <th>Working Period</th>
          </tr>
        </thead>
        <tbody>
          {user.map((user, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{user.name}</td>
             {user.isForm ?  <div className="form-group">
             <select
               className="form-control"
               id="role"
               value={role}
               onChange={(event) =>handleRoleChange(event, user.email)}
               required
             >
               <option value="FrontEnd Developer">FrontEnd Developer</option>
               <option value="BackEnd Developer">BackEnd Developer</option>
               <option value="Database Engineer">Database Engineer</option>
               <option value="Devops Engineer">Devops Engineer</option>
               <option value="DataScience Engineer">DataScience Engineer</option>
             </select>
           </div>:<td>{user.jobrole}</td>} 
              <td>{user.date}Yrs</td>
              
              <td>
              {details.role != user.role && <button onClick={() =>deleteUser(user.email)}className='btn btn-danger' style={{height:"80%"}}><i className="fa-solid fa-trash-can"></i></button>}
              </td>
              <td>
               {details.role != user.role && <button className='btn btn-success' onClick={()=>handleShow(user.email)} style={{height:"80%", width:"5.5rem"}}><i className="fa-solid fa-user-pen"></i> Role</button>}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default User;
