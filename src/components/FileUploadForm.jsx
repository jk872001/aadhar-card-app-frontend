import axios from "axios";
import { useState } from "react";
import { getLocalStorage } from "../utils/localStorage";
import { useNavigate } from "react-router-dom";
import { htmlErrorMsg, validateAadharForm } from "../utils/validate";
import { ToastContainer, toast } from "react-toastify";
import { toastConfig } from "../utils/toast";
useNavigate
const FileUploadForm = () => {
  const [employeeName, setEmployeeName] = useState(getLocalStorage("name"));
  const [aadharCardHolderName, setAadharCardHolderName] = useState("");
  const [aadharCardNumber, setAadharCardNumber] = useState("");
  const [aadharFile, setAadharFile] = useState("");

  const navigate=useNavigate()
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      let validateForm=validateAadharForm(employeeName,aadharCardHolderName,aadharCardNumber,aadharFile)
      if(validateForm !== true){
        toast.error(validateForm,toastConfig)
        return;
      }
      let uploadedBy = getLocalStorage("_id");
      const formData = new FormData();
      formData.append("employeeName", employeeName);
      formData.append("aadharCardHolderName", aadharCardHolderName);
      formData.append("aadharCardNumber", aadharCardNumber);
      formData.append("aadharCard", aadharFile);
      formData.append("uploadedBy", uploadedBy);

      let {data} = await axios.post(
        "http://localhost:4003/api/v1/aadhar/uploadAadharCard",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      let response = data?.data
      if(response){
        navigate("/home")
      }
    } catch (error) {
        let errMsg= htmlErrorMsg(error.response.data)
        toast.error(errMsg,toastConfig)
        console.log("Error", error);
    }
  };
  return (
    <>
    <ToastContainer/>
      <form onSubmit={handleSubmit} className="max-w-sm mx-auto m-10">
        <div className="mb-5">
          <label
            htmlFor="employeeName"
            className="block mb-2 text-sm font-medium text-gray-900 :text-white">
            Employee Name
          </label>
          <input
            //   onChange={(e)=>setEmployeeName(e.target.value)}
            defaultValue={getLocalStorage("name")}
            type="text"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500 :shadow-sm-light"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="employeeName"
            className="block mb-2 text-sm font-medium text-gray-900 :text-white">
            Aadhar card holder name
          </label>
          <input
            onChange={(e) => setAadharCardHolderName(e.target.value)}
            type="text"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500 :shadow-sm-light"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="employeeName"
            className="block mb-2 text-sm font-medium text-gray-900 :text-white">
            Aadhar card number
          </label>
          <input
            onChange={(e) => setAadharCardNumber(e.target.value)}
            type="text"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500 :shadow-sm-light"
          />
        </div>
        <div className="mb-5">
          <label
            htmlFor="employeeName"
            className="block mb-2 text-sm font-medium text-gray-900 :text-white">
            Upload Aadhar card File
          </label>
          <input
            onChange={(e) => setAadharFile(e.target.files[0])}
            type="file"
            name="aadharCard"
            className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 :bg-gray-700 :border-gray-600 :placeholder-gray-400 :text-white :focus:ring-blue-500 :focus:border-blue-500 :shadow-sm-light"
          />
        </div>

        <button
          type="submit"
          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center :bg-blue-600 :hover:bg-blue-700 :focus:ring-blue-800">
          Upload Aadhar card
        </button>
      </form>
    </>
  );
};

export default FileUploadForm;
