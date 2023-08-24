import React, { useEffect, useRef, useState } from "react";
import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";

export const SearchBar = () => {
  const [result, setResult] = useState([]);
  const [filterData, setFilterData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [searchMessage, setSearchMessage] = useState("");

  const inputRef = useRef();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((data) => {
        setResult(data);
      })
      .catch((error) => {
        console.log(error);
      });

    inputRef.current.focus();
  }, []);

  const onchangeHandler = (e) => {
    const { value } = e.target;
    setSearchText(value);
    const filteredData = result.filter((f_data) =>
      f_data.name.toLowerCase().includes(value.toLowerCase())
    );
    setFilterData(filteredData);

    if (value === "") {
      setSearchMessage("Please enter a name for search.");
    } else if (filteredData.length === 0) {
      setSearchMessage("No name found.");
    } else {
      setSearchMessage("");
    }
  };

  const clickHandle = (name) => {
    setSearchText(name);
    setFilterData([]);
  };

  return (
    <div className="search_bar_container">
      <div className="input_container">
        <FaSearch id="search_icon" />
        <input
          ref={inputRef}
          type="text"
          placeholder="Enter the name for search..."
          value={searchText}
          onChange={onchangeHandler}
        />
      </div>

      {searchMessage && <h1 className="search_message">{searchMessage}</h1>}

      {searchText.length > 0 && (
        <div className="result_list">
          {filterData.map((data) => (
            <div
              className="search_result"
              key={data.id}
              onClick={() => clickHandle(data.name)}
            >
              {data.name}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
