import React, { useEffect, useState } from "react";
import axios from "axios";
const CountryList = () => {
  const [countries, setCountries] = useState([]);
  const [load, setLoad] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("useeffect");
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((res) => {
        setCountries(res.data);
        setLoad(true);
      })
      .catch((err) => {
        setError(err.message);
        setLoad(true);
      });
  }, []);

  const kk = [<li>sahil</li>,<li>sahil</li>,<li>sahil</li>]
  if (load) {
    return (
      <ul>
        {error ? (
          <li key="1">{error}</li>
        ) : (
          countries.map((country, index) => <li key={index}>{country.name}</li>)
        )}
      </ul>
    );
  } else {
    // return <div>Loading...</div>;
    return (
      <div>
        <ul>
            {kk}
        </ul>
      </div>
    );
  }
};
export default CountryList;
