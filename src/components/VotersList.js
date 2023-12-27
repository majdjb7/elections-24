// VotersList.js
import React, { useState, useEffect } from "react";
import SearchBar from "./SearchBar";
import Statistics from "./Statistics";
import axios from "axios";
import "./styles/VotersList.css";

const VotersList = ({ users: initialUsers, updateUserList }) => {
  const [filteredUsers, setFilteredUsers] = useState(initialUsers);
  const [originalUsers, setOriginalUsers] = useState(initialUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [votedOnly, setVotedOnly] = useState(false);
  const [notVotedOnly, setNotVotedOnly] = useState(false);

  // Use an object to store individual dropdown values for each user
  const [dropdownValues, setDropdownValues] = useState({});

  useEffect(() => {
    setOriginalUsers(originalUsers);
    setFilteredUsers(filteredUsers);

    // Initialize dropdown values based on initialUsers
    const initialDropdownValues = {};
    initialUsers.forEach((user) => {
      initialDropdownValues[user.first_name] = user.voted; //TODO: user.id not user.first_name
    });
    setDropdownValues(initialDropdownValues);
  }, [initialUsers]);

  const handleSearch = (inputTerm, inputVotedOnly, inputNotVotedOnly, selectedBallot) => {
    const newSearchTerm = inputTerm.trim().toLowerCase();
    const newVotedOnly = inputVotedOnly;
    const newNotVotedOnly = inputNotVotedOnly;

    const filtered = originalUsers.filter((user) => {
      const matchesSearchTerm =
        user.first_name.toLowerCase().includes(newSearchTerm) ||
        user.last_name.toLowerCase().includes(newSearchTerm) ||
        (user.id && user.id.includes(newSearchTerm));
      const matchesBallotNumber = selectedBallot ? user.ballot === selectedBallot : true;

      if (newVotedOnly && newNotVotedOnly) {
        return matchesSearchTerm && matchesBallotNumber;
      } else if (newVotedOnly) {
        return matchesSearchTerm && user.voted && matchesBallotNumber;
      } else if (newNotVotedOnly) {
        return matchesSearchTerm && !user.voted && matchesBallotNumber;
      } else {
        return matchesSearchTerm && matchesBallotNumber;
      }
    });

    setSearchTerm(newSearchTerm);
    setVotedOnly(newVotedOnly);
    setNotVotedOnly(newNotVotedOnly);
    setFilteredUsers(filtered);
    updateUserList(filtered);
  };

  const handleClearSearch = () => {
    setSearchTerm("");
    setVotedOnly(false);
    setNotVotedOnly(false);
    setFilteredUsers(originalUsers);
    updateUserList(originalUsers);
  };

  const handleDropdownChange = (userId, userFirstName, voted) => { //TODO: userID here too
    // Update the dropdown state for the specific user
    setDropdownValues((prevValues) => ({
      ...prevValues,
      [userFirstName]: voted, //TODO: userID here too
    }));
  };

  const handleSubmit = async (userId, userBallotNumber, userFirstName) => {
    // Make a POST request to update the "voted" status
    try {
      const response = await axios.post("https://elections-bice.vercel.app/v1/elections/data", {
        first_name: userFirstName, //TODO: dont want it
        identity_number: userId==null? "208488692" : userId, // Replace with the actual identity_number
        ballot_number: userBallotNumber, // Replace with the actual ballot_number
        voted: dropdownValues[userFirstName], // TODO: again, by id, nit firstname
      });

      // Handle the response as needed
      console.log("POST request successful", response.data);
    } catch (error) {
      // Handle errors
      console.error("Error making POST request", error);
    }
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
              <td>{user.voted ? <>&#x2713;</> : <>&times;</>}</td>
              <td>
                <select
                  value={dropdownValues[user.first_name]} // TODO: user.id
                  onChange={(e) => handleDropdownChange(user.id, user.first_name, e.target.value === 'true')}
                >
                  <option value={true}>Yes</option>
                  <option value={false}>No</option>
                </select>
                <button onClick={() => handleSubmit(user.id, user.ballot, user.first_name)}>Submit</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <Statistics users={filteredUsers} />
    </div>
  );
};

export default VotersList;
