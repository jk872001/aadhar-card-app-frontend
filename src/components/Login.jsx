import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { htmlErrorMsg, validateLoginForm } from "../utils/validate";
import { ToastContainer, toast } from "react-toastify";
import { toastConfig } from "../utils/toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
const navigate=useNavigate()
  const handleLogin = async (e) => {
    try {
      e.preventDefault();
      let validationError = validateLoginForm(
        password,
        email
      );
      if (validationError !== true) {
        toast.error(validationError, toastConfig);
        return;
      }
      let loginUserDetails = {
        email,
        password,
      };
      const {data} = await  axios.post(
        "http://localhost:4003/api/v1/users/loginUser",
        loginUserDetails
      );
      let response=data.data;
      if (response) {
        localStorage.setItem("userDetails", JSON.stringify(response?.user));
        localStorage.setItem("token", response?.accessToken);
        // toast(loginPost.data.message, successToast);
        navigate("/home");
      }
      //  else {
      //   toast(loginPost.data.message, errorToast);
      // }
    } catch (error) {
      let errMsg= htmlErrorMsg(error.response.data)
      toast.error(errMsg,toastConfig)
      console.log("error", error);
    }
  };

  return (
    <>
    <ToastContainer/>
    <form onSubmit={handleLogin} className="max-w-sm mx-auto mt-5">
      <div className="mb-5">
        <label
          htmlFor="email"
          className="block mb-2 text-sm font-medium text-gray-900 :text-white">
          Your email
        </label>
        <input
          type="email"
          onChange={(e)=>setEmail(e.target.value)}
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
          
          
        />
      </div>
      <div className="mb-5">
        <label
          htmlFor="password"
          className="block mb-2 text-sm font-medium text-gray-900 :text-white">
          Your password
        </label>
        <input
          type="password"
          onChange={(e)=>setPassword(e.target.value)}
          id="password"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500"
          
        />
      </div>
      
      <button
        type="submit"
        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">
        Submit
      </button>
    </form>
    </>
  );
};

export default Login;
