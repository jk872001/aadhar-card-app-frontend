import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "../utils/localStorage";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import { formatDate } from "../utils/date";
import axiosInstance from "../utils/axios";

const Home = () => {
  const [aadharCardList, setAadharCardList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const userId = getLocalStorage("_id");
  useEffect(() => {
    fetchAadharCardList();
  }, []);

  const handleSearch = (searchTerm) => {
    // Filter the data based on the search term and selected date
    const filteredList = aadharCardList.filter((ele) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();

      return (
        ele.aadharCardHolderName.toLowerCase().includes(lowerCaseSearchTerm) ||
        ele.aadharCardNumber.toLowerCase().includes(lowerCaseSearchTerm) ||
        ele.createdAt.includes(selectedDate)
      );
    });
    setFilteredData(filteredList);
  };

  const fetchAadharCardList = async () => {
    let { data } = await axiosInstance.get(`aadhar/getAllAadharCard/${userId}`);
    let response = data?.data?.aadharCards;
    setAadharCardList(response);
    setLoading(false);
    setFilteredData(response);
  };

  const handleDateFilter =  (e) => {
      const newSelectedDate = e.target.value;
      setSelectedDate(newSelectedDate)
      const filteredList = aadharCardList.filter((ele) => {
        return ele.createdAt.includes(newSelectedDate);
      });
      setFilteredData(filteredList);
   
  };

  const handleClearSearch=()=>{
         setSelectedDate("dd-mm-yyyy")
         setSearchTerm("")
         setFilteredData(aadharCardList)
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
        <div className="flex">
          <SearchBar onSearch={handleSearch} searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
          <div className="relative m-3">
          <input
          className="pl-3 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200 cursor-pointer"
            type="date"
            value={selectedDate}
            onChange={handleDateFilter}
          />
          </div>
          <div className="relative m-3">
          <button onClick={handleClearSearch} type="button" className="pl-3 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none transition duration-200 cursor-pointer text-white bg-blue-700  hover:bg-blue-800 ">Clear Filter</button>
          </div>
         
          
        </div>

        <table className="w-full text-sm text-left rtl:text-right text-gray-500 :text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 :bg-gray-700 :text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Aadhar Card Holder Name
              </th>
              <th scope="col" className="px-6 py-3">
                Aadhar Card Number
              </th>
              <th scope="col" className="px-6 py-3">
                Aadhar card image
              </th>
              <th scope="col" className="px-6 py-3">
                Employee Name
              </th>
              {/* 
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
              */}
            </tr>
          </thead>

          <tbody>
            {filteredData?.map((ele) => {
              return (
                <tr
                  key={ele._id}
                  className="bg-white border-b :bg-gray-800 :border-gray-700 hover:bg-gray-50 :hover:bg-gray-600">
                  <th
                    scope="row"
                    className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap :text-white">
                    {ele.aadharCardHolderName}
                  </th>
                  <td className="px-6 py-4">{ele.aadharCardNumber}</td>
                  <td className="px-6 py-4">
                    <img src={ele.aadharCard} width={100} height={100} />
                  </td>
                  <td className="px-6 py-4">{ele.employeeName}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Home;
