import React, { useState } from "react";
import SearchBar from "./SearchBar";
import "./styles/VotersList.css"; // Import the CSS file


const VotersList = () => {
  // Sample list of users (replace with your data)
  const users =  [
    {
      id: "315427740",
      first_name:"לואי                ",
      last_name:  "ג'בר                ",
      father_name: "מונדר               ",
      street: "עמאוס              ",
      house_number: "1",
      ballot: "10",
      voted: false,
    },
    {
      id: "208488692",
      first_name:"מגד                ",
      last_name:  "ג'בר                ",
      father_name: "חאלד               ",
      street: "עבדאל עזיז              ",
      house_number: "1",
      ballot: "10",
      voted: false,
    },
    // Add more users as needed
  ];

  const [filteredUsers, setFilteredUsers] = useState(users);

  const handleSearch = (searchTerm, votedOnly, notVotedOnly) => {
    // Filter the users based on the search term and checkboxes
    const filtered = users.filter((user) => {
      const matchesSearchTerm =
        user.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        user.IDNumber.includes(searchTerm);

      if (votedOnly && notVotedOnly) {
        // Both checkboxes are checked, return no results
        return matchesSearchTerm;
      } else if (votedOnly) {
        return matchesSearchTerm && user.voted;
      } else if (notVotedOnly) {
        return matchesSearchTerm && !user.voted;
      } else {
        return matchesSearchTerm;
      }
    });

    setFilteredUsers(filtered);
  };

  return (
    <div>
      <h1>Voters List</h1>
      <SearchBar onSearch={handleSearch} />
      <table>
        {/* Render the filteredUsers data in the table */}
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
    </div>
  );
};

export default VotersList;
