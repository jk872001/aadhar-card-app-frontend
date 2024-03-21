/* eslint-disable react/prop-types */
// SearchBar.js

import { DebounceInput } from 'react-debounce-input';
import { AiOutlineSearch } from 'react-icons/ai';

const SearchBar = ({ onSearch,searchTerm,setSearchTerm }) => {

  const handleChange = (event) => {
    const value = event.target.value;
    setSearchTerm(value)
    onSearch(value);
  };

  return (
    <div className="relative m-3">
      <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
        <AiOutlineSearch className="h-5 w-5 text-gray-400" />
      </div>
      <DebounceInput
        type="text"
        placeholder="Search Aadhar Card "
        className="pl-10 pr-4 py-3 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring focus:ring-blue-200 transition duration-200"
        debounceTimeout={300} // Adjust debounce timeout as needed
        value={searchTerm}
        onChange={handleChange}
      />
    </div>
  );
};

export default SearchBar;
