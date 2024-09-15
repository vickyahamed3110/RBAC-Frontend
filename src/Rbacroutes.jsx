import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import Login from './Login';
import Register from './Register';
import Homepage from './Homepage';
import User from './user';
import Admin from './admin';

function Rbacroutes() {

  return (
    <>
    <BrowserRouter>
    <Routes>
    <Route path="/login" element={<Login/>}></Route>
    <Route path="/home" element={<Homepage/>}></Route>
    <Route path="/" element={<Register/>}></Route>
    <Route path="/user" element={<User/>}></Route>
    <Route path="/admin" element={<Admin/>}></Route>
    </Routes>
    </BrowserRouter>
    
      </>
  )
}

export default Rbacroutes