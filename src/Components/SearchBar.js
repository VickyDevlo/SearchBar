import React, { useState } from "react";
import "./SearchBar.css";
import { FaSearch } from "react-icons/fa";

export const SearchBar = ({ result, setResult }) => {
  const [input, setInput] = useState("");

  const fetchData = (value) => {
    fetch("https://jsonplaceholder.typicode.com/users")
      .then((res) => res.json())
      .then((json) => {
        const results = json.filter((user) => {
          return (
            value &&
            user &&
            user.name &&
            user.name.toLowerCase().includes(value)
          );
        });
        setResult(results);
      });
  };
  const handlerChange = (e) => {
    const { value } = e.target;
    setInput(value);
    fetchData(value);
  };
  return (
    <div className="serach_bar_container">
      <div className="input_container">
        <FaSearch id="serach_icon" />
        <input
          type="text"
          placeholder="Type to serach..."
          value={input}
          onChange={handlerChange}
        />
      </div>

      {/* search_Result_List */}
      <div className="result_list">
        {result.map((data, i) => {
          return (
            <div key={i} className="search_result">
              {data.name}
            </div>
          );
        })}
      </div>
    </div>
  );
};
