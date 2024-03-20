import { Link, useNavigate } from "react-router-dom"
import { getLocalStorage } from "../utils/localStorage";
import { useState } from "react";


const Header = () => {
const navigate=useNavigate()
const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleMenuToggle = () => {
    setIsMenuOpen(!isMenuOpen);
  };
let role = getLocalStorage("role");

    const handleLogout=()=>{
        localStorage.clear()
        navigate("/")
      }


  return (
    

    <nav className="bg-white border-gray-200 md:border-gray-200 lg:border-gray-200 xl:border-gray-200 2xl:border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link to="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap :text-white">Aadhar app</span>
        </Link>
        <div className="flex md:order-2 space-x-5 md:space-x-3 rtl:space-x-reverse">
          {
            role === "admin" &&
            <div className="hidden md:flex">
              <Link to="/register" type="button" className="text-white m-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">Create User</Link>
              <Link to="/userlist" type="button" className="text-white m-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">User List</Link>
            </div>
          }
          <Link to="/uploadFile" type="button" className="text-white m-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800 hidden md:block">Upload Aadhar</Link>
          <button onClick={handleLogout} type="button" className="text-white bg-blue-700 m-3 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800 hidden md:block">Logout</button>
          <button onClick={handleMenuToggle} type="button" className="inline-flex md:hidden m-3 items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 :text-gray-400 :hover:bg-gray-700 :focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded={isMenuOpen}>
            <span className="sr-only">Open main menu</span>
            <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
            </svg>
          </button>
        </div>
      </div>
      {/* Sidebar */}
      {isMenuOpen && (
        <div className="md:hidden absolute inset-y-0 left-0 z-10 bg-white w-64 h-full shadow-md">
          {/* Sidebar content */}
          <div className="p-4">
            <Link to="/home" className="block text-gray-800 py-2">Home</Link>
            <Link to="/register" className="block text-gray-800 py-2">Create User</Link>
            <Link to="/userlist" className="block text-gray-800 py-2">User List</Link>
            <Link to="/uploadFile" className="block text-gray-800 py-2">Upload Aadhar</Link>
            <button onClick={handleLogout} type="button" className="block text-gray-800 py-2">Logout</button>
          </div>
        </div>
      )}
    </nav>
  

  )
}

export default Header