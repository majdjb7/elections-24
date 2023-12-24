// Statistics.js
import React, { useEffect, useRef } from 'react';
import Chart from 'chart.js/auto';

const Statistics = ({ users }) => {
  const familyNamesChartRef = useRef(null);
  const ballotNumberChartRef = useRef(null);
  const generalChartRef = useRef(null);

  useEffect(() => {
    // Chart data for family names grouping
    const familyNamesData = getUsersChartData(users, 'last_name');

    // Chart data for ballot number grouping
    const ballotNumberData = getUsersChartData(users, 'ballot');

    // Chart data for general voting statistics
    const generalData = {
      labels: ['Voted', 'Not Voted'],
      datasets: [
        {
          data: [
            users.filter((user) => user.voted).length,
            users.filter((user) => !user.voted).length,
          ],
          backgroundColor: ['#36A2EB', '#FFCE56'],
        },
      ],
    };

    createChart(familyNamesChartRef, 'bar', familyNamesData);
    createChart(ballotNumberChartRef, 'bar', ballotNumberData);
    createChart(generalChartRef, 'doughnut', generalData);
  }, [users]);

  const createChart = (chartRef, type, data) => {
    const ctx = chartRef.current.getContext('2d');

    // Destroy previous chart instance if it exists
    let chartInstance = chartRef.current.chartInstance;
    if (chartInstance) {
      chartInstance.destroy();
    }

    // Create a new chart instance
    chartInstance = new Chart(ctx, {
      type: type,
      data: data,
    });

    // Save the chart instance in the ref for cleanup
    chartRef.current.chartInstance = chartInstance;
  };

  const getUsersChartData = (users, groupingKey) => {
    const groupedData = {};
    users.forEach((user) => {
      const group = user[groupingKey];
      if (!groupedData[group]) {
        groupedData[group] = { voted: 0, notVoted: 0 };
      }

      if (user.voted) {
        groupedData[group].voted++;
      } else {
        groupedData[group].notVoted++;
      }
    });

    const labels = Object.keys(groupedData);
    const datasets = [
      {
        label: 'Voted',
        data: labels.map((label) => groupedData[label].voted),
        backgroundColor: '#36A2EB',
      },
      {
        label: 'Not Voted',
        data: labels.map((label) => groupedData[label].notVoted),
        backgroundColor: '#FFCE56',
      },
    ];

    return {
      labels: labels,
      datasets: datasets,
    };
  };

  return (
    <div style={{ maxWidth: '300px', margin: 'auto' }}>

      <h2>General Voting Statistics</h2>
      <canvas ref={generalChartRef} />

      <h2>Statistics - Family Names Grouping</h2>
      <canvas ref={familyNamesChartRef} />

      <h2>Statistics - Ballot Number Grouping</h2>
      <canvas ref={ballotNumberChartRef} />


    </div>
  );
};

export default Statistics;
