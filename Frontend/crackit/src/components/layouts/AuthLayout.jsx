import React from 'react'
import img1 from "../../assets/images/image1.jpg";

const AuthLayout = ({ children, compact }) => {
  return (
    <div className="flex">
      {/* Left Side */}
      <div className={`w-screen h-screen md:w-[60vw] px-12 pt-10 pb-12 flex flex-col justify-start text-left`}>
        {/* Heading */}
        <h1 className="text-3xl md:text-4xl font-bold text-purple-700 tracking-wide drop-shadow-sm">
          CRACK<span className="text-purple-900">IT</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-0.5 text-sm md:text-base text-gray-600 font-medium">
          Crack your <span className="text-purple-600 font-semibold">dream job</span> with us!!
        </p>

        {/* Form */}
        <div className={`w-full ${compact ? "mt-1" : "mt-26"}`}>
          {children}
        </div>
      </div>

      {/* Right Side */}
        <div className="hidden md:flex w-[40vw] min-h-screen bg-gradient-to-br  p-8 relative flex-col ">        {/* Decorative shapes */}
        <div className="w-40 h-40 rounded-[40px] bg-purple-700 absolute -top-4 -left-6" />
        <div className="w-40 h-40 rounded-[40px] border-[16px] border-purple-500 absolute top-[11%] right-6" />
        <div className="w-40 h-40 rounded-[40px] bg-purple-400 absolute bottom-10 left-6" />
        <div className="w-40 h-40 rounded-full bg-purple-600 absolute -bottom-12 -right-12" />
        <div className="w-40 h-40 rounded-full bg-purple-800 absolute top-1/3 left-1/3 -translate-x-1/2 -translate-y-1/2" />
        {/* Illustration */}
        <img
          src={img1}
          alt="auth-illustration"
          className="w-60 lg:w-[80%] max-h-[90vh] object-contain absolute bottom-28 left-1/2 -translate-x-1/2 shadow-lg shadow-purple-300/40 rounded-2xl"
        />

      </div>
    </div>
  )
}

export default AuthLayout;
