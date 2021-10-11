import { useState } from "react";

export const useForm = (initialState = {}) => {
  const [myFormData, setMyFormData] = useState(initialState);

  const resetData = () => {
    setMyFormData(initialState);
  };


  const handleInputChange = ({target}) => {
    setMyFormData({
      ...myFormData,
      [target.name]: target.value,
    });
  };



  return [myFormData, handleInputChange, resetData];
};
