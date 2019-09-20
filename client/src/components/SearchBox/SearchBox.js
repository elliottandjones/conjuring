import React from "react";
import "./SearchBox.css";

const SearchBox = ({ searchfield, searchChange }) => {
  return (
    <div className="search-box">
      
      <input
        id="search"
        className="inp-hvr mt2 mr2 derk"
        type="search"
        placeholder="search by name"
        onChange={searchChange}
        autoComplete="off"
      />
      <label htmlFor="search" className="sr-only">
        search for monsters by name
      </label>
    </div>
  );
};

export default SearchBox;
