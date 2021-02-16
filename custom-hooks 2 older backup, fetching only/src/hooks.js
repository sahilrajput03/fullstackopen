import react, { useState, useEffect } from "react";
import axios from "axios";
const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  return {
    type,
    value,
    onChange,
  };
};

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);
  let request;

  const getAll = () => {
    const request = axios.get(baseUrl);
    return request.then((response) => response.data);
  };

  const setAll = (set) => {
    setResources(set);
  };

  //   const create = (resource) => {
  // ...
  //   };

  const service = {
    // create,
    getAll,
    setAll,
  };

  return [resources, service];
};
export { useField, useResource };
