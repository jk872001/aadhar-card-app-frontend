import { getLocalStorage } from "../utils/localStorage";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import axiosInstance from "../utils/axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toastConfig } from "../utils/toast";

const Home = () => {
  const [aadharCardList, setAadharCardList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

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

  const handleDateFilter = (e) => {
    const newSelectedDate = e.target.value;
    setSelectedDate(newSelectedDate);
    const filteredList = aadharCardList.filter((ele) => {
      return ele.createdAt.includes(newSelectedDate);
    });
    setFilteredData(filteredList);
  };

  const handleClearSearch = () => {
    setSelectedDate("dd-mm-yyyy");
    setSearchTerm("");
    setFilteredData(aadharCardList);
  };

  const handleDelete = async (aadharId) => {
    try {
      const { data } = await axiosInstance.post("aadhar/deleteAadhar", {
        aadharId,
      });
      console.log(data);
      if (data.statusCode == 200) {
        toast.success(data.message, toastConfig);
        fetchAadharCardList();
      } else {
        toast.error("Something went wrong...", toastConfig);
      }
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-gray-900"></div>
      </div>
    );
  }

  return (
    <>
      <ToastContainer />
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-1 ">
      <div className="flex flex-col md:flex-row items-center justify-center md:justify-start">
      {/* SearchBar component */}
      <SearchBar
        onSearch={handleSearch}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
    
      {/* Date Input Field */}
      <div className="relative m-3">
        <input
          className="pl-3 pr-4 py-2 md:py-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200 cursor-pointer text-sm md:text-base"
          type="date"
          value={selectedDate}
          onChange={handleDateFilter}
        />
      </div>
    
      {/* Clear Filter Button */}
      <div className="relative m-3">
        <button
          onClick={handleClearSearch}
          type="button"
          className="pl-3 pr-4 py-2 md:py-3 rounded-md border border-gray-300 focus:outline-none transition duration-200 cursor-pointer text-white bg-blue-700 hover:bg-blue-800 text-sm md:text-base"
        >
          Clear Filter
        </button>
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
              <th scope="col" className="px-6 py-3">
                Action
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
                  <button
                    onClick={() => handleDelete(ele._id)}
                    className="px-6 py-4 text-red-600">
                    Delete
                  </button>
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
