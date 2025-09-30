import React, { useState } from 'react';
import { useContext } from "react"; 
import AuthLayout from '../../components/layouts/AuthLayout';
import Input from '../../components/Inputs/Input';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector';
import { validateEmail } from '../../utils/helper';
import {Link ,useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from '../../utils/apiPaths';
import {UserContext}from "../../context/UserContext"
import uploadImage from '../../utils/uploadImage';

const Signup = () => {
  const [profilePic, setProfilePic] = useState(null);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const {updateUser}=useContext(UserContext); 

  const handleSignup = async (e) => {
    e.preventDefault();
    let profileImageUrl="";
    if(!fullName){
      setError("PLease enter your name");
      return;
    }
    if(!validateEmail(email)){
      setError("Please enter email");
      return ;
    }
    if(!password){
      setError("Please enter a password");
      return;
    }
    if(password.length<8){
      setError("Password must be at least 8 characters long 8");
      return;
    }
    setError("");
    //signup api call
    try{

      if(profilePic){
        const imgUploadRes=await uploadImage(profilePic);
        profileImageUrl=imgUploadRes.imageUrl || "";
      }
      const response=await axiosInstance.post(API_PATHS.AUTH.REGISTER,{
        fullName,
        email,
        password,
        profileImageUrl
      });

      const {token,user}=response.data;

      if(token){
        localStorage.setItem("token",token);
        updateUser(user);
        navigate("/dashboard");
      }
    }
    catch(error){
      if(error.response && error.response.data.message){
        setError(error.response.data.message);
      }
      else{
        setError("Something went wrong. Please try later");
      } 
    }
   
  };

  return (
    <AuthLayout compact={true}>
      <div className="lg:w-[100%] h-screen mt-5 md:mt-0 flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Create an Account</h3>
        <p className='text-xs text-slate-700 mt-[5px] mb-6'>
          Join CrackIt by entering your details below
        </p>
        <form onSubmit={handleSignup}>
          <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
          <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <Input 
              value={fullName}
              onChange={({ target }) => setFullName(target.value)}
              label="Full Name"
              placeholder="John"
              type="text" 
            />
            <Input
              value={email}
              onChange={({ target }) => setEmail(target.value)}
              label="Email Address"
              placeholder="abc@example.com"
              type="text"
            />
            <div className='col-span-2'>
              <Input
                value={password}
                onChange={({ target }) => setPassword(target.value)}
                label="Password"
                placeholder="min 8 characters"
                type="password"
              />
            </div>
          </div>
          {error && <p className="text-red-500 text-xs pb-2.5">{error}</p>}
                    <button type="submit" className="btn-primary hover:cursor-pointer">
                      SIGNUP
                    </button>
                    <p className="text-[13px] text-slate-800 mt-3">
                      Already have an account?{" "}
                      <Link className="font-medium text-primary underline" to="/login">
                        login
                      </Link>
                    </p>
        </form>
      </div>
    </AuthLayout>
  )
}

export default Signup;
