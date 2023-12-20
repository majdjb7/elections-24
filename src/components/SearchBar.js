import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [votedOnly, setVotedOnly] = useState(false); // State for the "Voted" checkbox
  const [notVotedOnly, setNotVotedOnly] = useState(false); // State for the "Not Voted" checkbox

  const handleSearch = () => {
    // Call the onSearch callback with the search term, votedOnly, and notVotedOnly values
    onSearch(searchTerm, votedOnly, notVotedOnly);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Name or ID"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
      <label>
        Voted:
        <input
          type="checkbox"
          checked={votedOnly}
          onChange={() => setVotedOnly(!votedOnly)}
        />
      </label>
      <label>
        Not Voted:
        <input
          type="checkbox"
          checked={notVotedOnly}
          onChange={() => setNotVotedOnly(!notVotedOnly)}
        />
      </label>
      <button onClick={handleSearch}>Search</button>
    </div>
  );
};

export default SearchBar;
