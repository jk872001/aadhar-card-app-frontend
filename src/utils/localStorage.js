export const getLocalStorage=(parameter)=>{
    const data = JSON.parse(localStorage.getItem("userDetails"))[parameter]
    return data ;
  }
  