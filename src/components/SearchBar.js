// SearchBar.js
import React, { useState } from "react";

const SearchBar = ({ onSearch, searchTerm, votedOnly, notVotedOnly }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value, votedOnly, notVotedOnly);
  };

  const handleCheckboxChange = (e) => {
    const checkboxName = e.target.name;
    const checkboxValue = e.target.checked;
    console.log(checkboxValue)

    if (checkboxName === "voted") {
      onSearch(searchTerm, checkboxValue, notVotedOnly);
    } else if (checkboxName === "notVoted") {
      onSearch(searchTerm, votedOnly, checkboxValue);
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchTerm}
        onChange={handleInputChange}
      />
      <label>
        Voted Only:
        <input
          type="checkbox"
          name="voted"
          checked={votedOnly}
          onChange={handleCheckboxChange}
        />
      </label>
      <label>
        Not Voted Only:
        <input
          type="checkbox"
          name="notVoted"
          checked={notVotedOnly}
          onChange={handleCheckboxChange}
        />
      </label>
    </div>
  );
};

export default SearchBar;
