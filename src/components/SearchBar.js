// SearchBar.js
import React, { useState } from "react";

const SearchBar = ({ onSearch, searchTerm, votedOnly, notVotedOnly, selectedBallot }) => {
  const handleInputChange = (e) => {
    onSearch(e.target.value, votedOnly, notVotedOnly, selectedBallot);
  };

  const handleCheckboxChange = (e) => {
    const checkboxName = e.target.name;
    const checkboxValue = e.target.checked;

    if (checkboxName === "voted") {
      onSearch(searchTerm, checkboxValue, notVotedOnly, selectedBallot);
    } else if (checkboxName === "notVoted") {
      onSearch(searchTerm, votedOnly, checkboxValue, selectedBallot);
    }
  };

  const handleDropdownChange = (e) => {
    const selectedBallot = e.target.value;
    onSearch(searchTerm, votedOnly, notVotedOnly, selectedBallot);
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
      <label>
        Ballot Number:
        <select
          value={selectedBallot}
          onChange={handleDropdownChange}
        >
          <option value="">All</option>
          <option value="1">1</option>
          <option value="2">2</option>
          <option value="3">3</option>
          <option value="4">4</option>
          <option value="5">5</option>
          <option value="6">6</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
          <option value="10">10</option>
          {/* Add more ballot numbers as needed */}
        </select>
      </label>
    </div>
  );
};

export default SearchBar;
