import React, { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch random user data from the API
    axios.get("https://randomuser.me/api/?results=10").then((response) => {
      const userData = response.data.results;
      setUsers(userData);
    });
  }, []);

  return (
    <div>
      <h1>Random User List</h1>
      <ul>
        {users.map((user, index) => (
          <li key={index}>
            <img src={user.picture.medium} alt={`${user.name.first} ${user.name.last}`} />
            <p>Name: {user.name.first} {user.name.last}</p>
            <p>Email: {user.email}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default UserList;
