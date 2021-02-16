import { useState, useEffect } from "react";
import axios from "axios";

let token = null;

const setToken = (newToken) => {
  token = `bearer ${newToken}`;
};

const useField = (type) => {
  const [value, setValue] = useState("");

  const onChange = (event) => {
    setValue(event.target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    reset,
    input: {
      value,
      onChange,
      type,
    },
  };
};

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([]);

  let [flag, setFlag] = useState(true);
  useEffect(() => {
    axios
      .get(baseUrl)
      .then((response) => response.data)
      .then((data) => setResources(data));
    setFlag(true);
  }, [baseUrl, flag]);

  //   const fetchAndSaveArtificially = () => {
  //     axios.get(baseUrl).then((response) => response.data).then((data) => setResources(data))
  //   }

  const create = (newObject) => {
    const config = {
      headers: { Authorization: token },
    };
    const response = axios.post(baseUrl, newObject, config);
    return response.data;
  };

  const service = {
    create,
    setResources,
    setToken,
    setFlag,
  };

  return [resources, service];
};
export { useField, useResource };
