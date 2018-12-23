import React from 'react';

const SearchBox = ({ searchfield, searchChange }) => {
  return (
    <div className="search-box">
      <label htmlFor="search" className="sr-only">search creatures</label>
      <input
        id="search"
        className="mt1 surch too-hot derk"
        type="search"
        placeholder="search by name"
        onChange={searchChange}
      />
    </div>
  );
}

export default SearchBox;
