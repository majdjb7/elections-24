// App.js
import React, { useState } from "react";
import Greet from "./components/Greet";
import VotersList from "./components/VotersList";
import UserList from './components/UsersList';
import Statistics from './components/Statistics'; // Import the Statistics component

function App() {
  const [activeTab, setActiveTab] = useState("App-content");

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
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
            <VotersList />
            <UserList />
          </>
        )}
        {activeTab === "Statistics" && <Statistics />}
      </main>
    </div>
  );
}

export default App;
