// App.js
import React, { useState } from "react";
import Greet from "./components/Greet";
import VotersList from "./components/VotersList";
import Statistics from './components/Statistics';

function App() {
  const [activeTab, setActiveTab] = useState("App-content");
  const [users, setUsers] = useState([
    {
      id: "315427740",
      first_name:"לואי                ",
      last_name:  "ג'בר                ",
      father_name: "מונדר               ",
      street: "עמאוס              ",
      house_number: "1",
      ballot: "10",
      voted: true,
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
    {
      id: "123456789",
      first_name:"מחמד                ",
      last_name:  "אבראהים               ",
      father_name: "מחמד               ",
      street: "עבדאל עזיז              ",
      house_number: "1",
      ballot: "7",
      voted: true,
    }
    // Add more users as needed
  ]);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  };

  const updateUserList = (updatedUsers) => {
    setUsers(updatedUsers);
  };

  return (
    <div className="App">
      <header className="App-header">
        <img src="/path/to/voting-logo.png" alt="Voting Logo" className="logo" />
        <h1 className="App-title">Voting App</h1>
      </header>
      <nav className="App-nav">
        <button
          className={`nav-item ${activeTab === "App-content" ? "active" : ""}`}
          onClick={() => handleTabChange("App-content")}
        >
          App Content
        </button>
        <button
          className={`nav-item ${activeTab === "Statistics" ? "active" : ""}`}
          onClick={() => handleTabChange("Statistics")}
        >
          Statistics
        </button>
      </nav>
      <main className="App-content">
        {activeTab === "App-content" && (
          <>
            <Greet />
            <VotersList users={users} updateUserList={updateUserList} />
          </>
        )}
        {activeTab === "Statistics" && (
          <Statistics users={users} />
        )}
      </main>
    </div>
  );
}

export default App;
