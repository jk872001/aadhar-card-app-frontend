import { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { htmlErrorMsg, validateRegisterForm } from "../utils/validate";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastConfig } from "../utils/toast";
import axiosInstance from "../utils/axios";

const Register = () => {
  let name = useRef(null);
  const shopName = useRef(null);
  let shopAddress = useRef(null);
  let email = useRef(null);
  let password = useRef(null);
  let mobileNumber = useRef(null);
  let {userId}=useParams()

  useEffect(()=>{
    if(userId){
      getUserById(userId)
    }
  },[userId])

  const getUserById=async()=>{
     try {
       const {data}=await axiosInstance.get(`users/getUserById/${userId}`)
       let response=data?.data;
       name.current.value=response.name
       shopName.current.value=response.shopName
       shopAddress.current.value=response.shopAddress
       email.current.value=response.email
       password.current.value=response.password
       mobileNumber.current.value=response.mobileNumber

     } catch (error) {
      console.log(error)
     }
  }

  
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let nameVal = name.current.value;
      let shopNameVal = shopName.current.value;
      let shopAddressVal = shopAddress.current.value;
      let emailVal = email.current.value;
      let passwordVal = password.current.value;
      let mobileNumberVal = mobileNumber.current.value;
      let userDetails = {
        name: nameVal,
        shopName: shopNameVal,
        shopAddress: shopAddressVal,
        email: emailVal,
        password: passwordVal,
        mobileNumber: mobileNumberVal,
      };

      let validationError = validateRegisterForm(
        mobileNumberVal,
        passwordVal,
        emailVal,
        nameVal,
        shopNameVal,
        shopAddressVal
      );
      if (validationError !== true) {
        toast.error(validationError, toastConfig);
        return;
      }

      if(userId){
        const response = await axiosInstance.put(
          `users/userUpdate/${userId}`,
          userDetails
        );
        if (response) {
          toast.success(response.message, toastConfig);
          navigate("/userlist");
        }else{
          toast.error("Something went wrong", toastConfig);
        }
      }else{
        const response = await axiosInstance.post(
          "users/registerUser",
          userDetails
        );
        if (response) {
          toast.success(response.message, toastConfig);
          navigate("/userlist");
        }
      }
      
    } catch (error) {
      const errorHtml = htmlErrorMsg(error.response.data);
      toast.error(errorHtml, toastConfig);
      console.log(error);
    }
  };
  return (
    <>
      <ToastContainer />
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto m-5">
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 :text-white">
            Your name
          </label>
          <input
            ref={name}
            type="text"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500 :shadow-sm-light"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 :text-white">
            Shop name
          </label>
          <input
            ref={shopName}
            type="text"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500 :shadow-sm-light"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 :text-white">
            Shop Address
          </label>
          <input
            ref={shopAddress}
            type="text"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500 :shadow-sm-light"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 :text-white">
            Your Mobile Number
          </label>
          <input
            ref={mobileNumber}
            type="text"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500 :shadow-sm-light"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="email"
            className="block mb-2 text-sm font-medium text-gray-900 :text-white">
            Email Id
          </label>
          <input
            ref={email}
            type="email"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500 :shadow-sm-light"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="password"
            className="block mb-2 text-sm font-medium text-gray-900 :text-white">
            Your password
          </label>
          <input
            ref={password}
            type="password"
            id="password"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500 :shadow-sm-light"
            required
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">
          {userId ? "Update User" : "Register new account"}
          
        </button>
      </form>
    </>
  );
};

export default Register;
