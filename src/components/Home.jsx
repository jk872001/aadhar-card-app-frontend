import { useNavigate } from "react-router-dom";
import { getLocalStorage } from "../utils/localStorage";
import { useEffect, useState } from "react";
import axios from "axios";
import SearchBar from "./SearchBar";
import { formatDate } from "../utils/date";

const Home = () => {
  const [aadharCardList, setAadharCardList] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [selectedDate, setSelectedDate] = useState(null);
  const userId = getLocalStorage("_id");
  useEffect(() => {
    fetchAadharCardList();
  }, []);

  const handleSearch = (searchTerm) => {
    // Filter the data based on the search term and selected date
    const filteredList = aadharCardList.filter((ele) => {
      const lowerCaseSearchTerm = searchTerm.toLowerCase();
      // Convert selectedDate and updatedAt to "dd-mm-yyyy" format
      const formattedSelectedDate = selectedDate ? formatDate(selectedDate) : null;
      // console.log("formattedSelectedDate",formattedSelectedDate)
      const formattedUpdatedAt = formatDate(new Date(ele.updatedAt));
      // console.log(formattedUpdatedAt)
      // Filter by Aadhar card holder name, Aadhar card number, and date
      return (
        ele.aadharCardHolderName.toLowerCase().includes(lowerCaseSearchTerm) ||
        ele.aadharCardNumber.toLowerCase().includes(lowerCaseSearchTerm) ||
        formattedUpdatedAt.includes(formattedSelectedDate)
      );
    });
    setFilteredData(filteredList);
  };

  const fetchAadharCardList = async () => {
    let { data } = await axios.get(
      `https://aadhar-card-app-backend.onrender.com/api/v1/aadhar/getAllAadharCard/${userId}`
    );
    let response = data?.data?.aadharCards;

    setAadharCardList(response);
    setFilteredData(response);
  };

  

  return (
    <>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg m-10">
      <div className="flex">
      <SearchBar onSearch={handleSearch} />
      
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
                <span className="sr-only">Edit</span>
              </th>
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
