import React from 'react'

import{
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
}from 'react-router-dom';
import Login from './pages/Auth/Login';
import Signup from './pages/Auth/Signup';
import Home from './pages/Dashboard/Home';
import Advise from './pages/Dashboard/Advise';
import Share from './pages/Dashboard/Share';
import Practice from './pages/Dashboard/Practice';
import UserProvider from './context/UserContext';
import Profile from './pages/Dashboard/Profile';
import {Toaster} from "react-hot-toast";
import Community from './pages/Dashboard/Community';

const App = () => {
  return (
    <UserProvider>
    <div>
      <Router>
        <Routes> 
          <Route path="/" element={<Root/>}/>
          <Route path="/login" exact element={<Login/>}/>
          <Route path="/signup" exact element={<Signup/>}/>
          <Route path="/dashboard" element={<Home/>}/>
          <Route path="/advice" element={<Advise/>}/>
          <Route path="/experiences" element={<Share/>}/>
          <Route path="/practice" element={<Practice/>}/>
          <Route path="/profile" element={<Profile/>}/>
          <Route path="/community" element={<Community/>}/>
        </Routes>
      </Router>
    </div>
    <Toaster
      toastOptions={{
        className:"",
        style:{
          fontSize:'13px'
        },
      }}
      />
    </UserProvider>
  )
}

export default App

const Root=()=>{
    const isAuthenticated= !!localStorage.getItem("token");
    return isAuthenticated?(
      <Navigate to='/dashboard'/>
    ):(
      <Navigate to='/login'/>
    );
}; 