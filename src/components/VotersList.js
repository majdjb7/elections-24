// VotersList.js
import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Statistics from "./Statistics";
import "./styles/VotersList.css";

const VotersList = ({ users: initialUsers, updateUserList }) => {
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);
  const [originalUsers, setOriginalUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [votedOnly, setVotedOnly] = useState(false);
  const [notVotedOnly, setNotVotedOnly] = useState(false);

  useEffect(() => {
    setOriginalUsers(originalUsers);
    setFilteredUsers(filteredUsers);
  }, [initialUsers]);

  const handleSearch = (inputTerm, inputVotedOnly, inputNotVotedOnly) => {
    const newSearchTerm = inputTerm.trim().toLowerCase();
    const newVotedOnly = inputVotedOnly;
    const newNotVotedOnly = inputNotVotedOnly;

    const filtered = originalUsers.filter((user) => {
      const matchesSearchTerm =
        user.first_name.toLowerCase().includes(newSearchTerm) ||
        user.last_name.toLowerCase().includes(newSearchTerm) ||
        (user.id && user.id.includes(newSearchTerm));

      if (newVotedOnly && newNotVotedOnly) {
        return matchesSearchTerm;
      } else if (newVotedOnly) {
        return matchesSearchTerm && user.voted;
      } else if (newNotVotedOnly) {
        return matchesSearchTerm && !user.voted;
      } else {
        return matchesSearchTerm;
      }
    });

    setSearchTerm(newSearchTerm);
    setVotedOnly(newVotedOnly);
    setNotVotedOnly(newNotVotedOnly);

    setFilteredUsers(filtered);
    updateUserList(filtered);
  };

  const handleClearSearch = () => {
    console.log(initialUsers)
    console.log(originalUsers)
    setSearchTerm("");
    setVotedOnly(false);
    setNotVotedOnly(false);
    setFilteredUsers(originalUsers);
    updateUserList(originalUsers);
  };

  return (
    <div>
      <h1>Voters List</h1>
      <SearchBar
        onSearch={handleSearch}
        searchTerm={searchTerm}
        votedOnly={votedOnly}
        notVotedOnly={notVotedOnly}
      />
      <button onClick={handleClearSearch}>Clear Search</button>
      <table>
        <thead>
          <tr>
            <th>ת.ז</th>
            <th>שם פרטי</th>
            <th>שם משפחה</th>
            <th>שם אבא</th>
            <th>רחוב</th>
            <th>מס' בית</th>
            <th>מס' קלפי</th>
            <th>הצביע</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user) => (
            <tr key={user.id}>
              <td>{user.id}</td>
              <td>{user.first_name}</td>
              <td>{user.last_name}</td>
              <td>{user.father_name}</td>
              <td>{user.street}</td>
              <td>{user.house_number}</td>
              <td>{user.ballot}</td>
              <td>{user.voted ? "Yes" : "No"}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <Statistics users={filteredUsers} />
    </div>
  );
};

export default VotersList;
