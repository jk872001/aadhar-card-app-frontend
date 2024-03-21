import { useEffect, useState } from "react"
import axiosInstance from "../utils/axios";

const Userlist = () => {
    const [userList,setUserList]= useState([])
    const [loading,setLoading]= useState(true)



    useEffect(()=>{
        fetchAllUsers();
    },[])

    const fetchAllUsers=async()=>{
        try {
            const {data} =await axiosInstance.get("users/getAllUsers")
            setUserList(data?.data?.users)
            setLoading(false)
        } catch (error) {
            console.log("Error",error)
        }
            
    }

    if (loading) {
        return (
          <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
          </div>
        );
      }

  return (
    <>
    

<div className="relative overflow-x-auto shadow-md sm:rounded-lg m-1 ">
<table className="w-full text-sm text-left rtl:text-right text-gray-500 :text-gray-400">
    <thead className="text-xs text-gray-700 uppercase bg-gray-50 :bg-gray-700 :text-gray-400">
        <tr>
            <th scope="col" className="px-6 py-3">
                Name
            </th>
            <th scope="col" className="px-6 py-3">
                Shop Name
            </th>
            <th scope="col" className="px-6 py-3">
                Shop Address
            </th>
            <th scope="col" className="px-6 py-3">
                Mobile Number
            </th>
            <th scope="col" className="px-6 py-3">
                Email Id
            </th>
            <th scope="col" className="px-6 py-3">
                Password
            </th>
            <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
            </th>
        </tr>
    </thead>
    <tbody>
    {
        userList?.map((ele)=>{
            return <tr key={ele._id} className="bg-white border-b :bg-gray-800 :border-gray-700 hover:bg-gray-50 :hover:bg-gray-600">
            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white">
               {ele.name}
            </th>
            <td className="px-6 py-4">
            {ele.shopName}
            </td>
            <td className="px-6 py-4">
            {ele.shopAddress}
            </td>
            <td className="px-6 py-4">
            {ele.mobileNumber}
            </td>
            <td className="px-6 py-4">
            {ele.email}
            </td>
            <td className="px-6 py-4">
            {ele.password}
            </td>
            {/*
            <td className="px-6 py-4 text-right">
                <a href="#" className="font-medium text-blue-600 :text-blue-500 hover:underline">Edit</a>
            </td>
            */}
        </tr>
        })
    }
        
       
        
    </tbody>
</table>
</div>

    </>
  )
}

export default Userlist