// // Statistics.js
// import React, { useState } from "react";
// import { Pie } from "react-chartjs-2";

// const Statistics = () => {
//   const [key1, setKey1] = useState(0);
//   const [key2, setKey2] = useState(0);

//   // Mock data for voters
//   const votersData = {
//     families: ["Family A", "Family B", "Family C", "Family D"],
//     voted: [25, 30, 20, 15], // Number of voters who have voted in each family
//     notVoted: [15, 20, 10, 25], // Number of voters who have not voted in each family
//   };

//   const dataVoted = {
//     labels: votersData.families,
//     datasets: [
//       {
//         data: votersData.voted,
//         backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
//         hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
//       },
//     ],
//   };

//   const dataNotVoted = {
//     labels: votersData.families,
//     datasets: [
//       {
//         data: votersData.notVoted,
//         backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
//         hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0"],
//       },
//     ],
//   };

//   const resetCharts = () => {
//     setKey1((prevKey) => prevKey + 1);
//     setKey2((prevKey) => prevKey + 1);
//   };

//   return (
//     <div>
//       <h2>Statistics</h2>
//       <div>
//         <h3>Voters Who Have Voted</h3>
//         <Pie key={key1} data={dataVoted} />
//       </div>
//       <div>
//         <h3>Voters Who Have Not Voted</h3>
//         <Pie key={key2} data={dataNotVoted} />
//       </div>
//       <button onClick={resetCharts}>Reset Charts</button>
//     </div>
//   );
// };

// export default Statistics;
