import { Link, useNavigate } from "react-router-dom"
import { getLocalStorage } from "../utils/localStorage";


const Header = () => {
const navigate=useNavigate()
let role = getLocalStorage("role");

    const handleLogout=()=>{
        localStorage.clear()
        navigate("/")
      }


  return (
    

<nav className="bg-white border-gray-200 :bg-gray-900">
<div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
<Link to="/home" className="flex items-center space-x-3 rtl:space-x-reverse">
    <img src="https://flowbite.com/docs/images/logo.svg" className="h-8" alt="Flowbite Logo" />
    <span className="self-center text-2xl font-semibold whitespace-nowrap :text-white">Aadhar app</span>
</Link>
<div className="flex md:order-2 space-x-5 md:space-x-3 rtl:space-x-reverse">
 {
    role === "admin" && <div>
    <Link to="/register" type="button"  className="text-white m-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800 ">Create User</Link>
    <Link to="/userlist" type="button" className="text-white m-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">User List</Link>
    </div>
 }
    
    <Link to="/uploadFile" type="button" className="text-white  m-3 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">Upload Aadhar</Link>
    <button onClick={handleLogout} type="button" className="text-white bg-blue-700  m-3 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">Logout</button>


    <button data-collapse-toggle="navbar-cta" type="button" className="inline-flex  m-3 items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 :text-gray-400 :hover:bg-gray-700 :focus:ring-gray-600" aria-controls="navbar-cta" aria-expanded="false">
      <span className="sr-only">Open main menu</span>
      <svg className="w-5 h-5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 17 14">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M1 1h15M1 7h15M1 13h15"/>
      </svg>
  </button>
</div>

</div>
</nav>

  )
}

export default Header