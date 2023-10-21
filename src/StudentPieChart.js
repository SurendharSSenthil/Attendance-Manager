import React from 'react';
import {Pie} from 'react-chartjs-2';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);


const StudentChart = ({ student, closePieChart }) => {
  const presentHours = student.attendance.filter((hour) => hour).length;
  const absentHours = student.attendance.length - presentHours;

  const chartData = {
    labels: ['Present', 'Absent'],
    datasets: [
      {
        data: [presentHours, absentHours],
        backgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  const chartOptions = {
    title: {
      display: true,
      text: `${student.name}'s Attendance`,
      fontSize: 16,
    },
    legend: {
      display: true,
      position: 'right',
    },
  };
  

  return (
    <div className='Piecontainer-1'>
    <div className='PieContainer'>
      <div>
      <h2>Attendance Summary for {student.name}</h2>
      <p>No of Hours present : {presentHours}</p>
      <p>No of Hours absent  : {absentHours}</p>
      </div>
      <Pie data={chartData} options={chartOptions} id='Pie'/>
      <button onClick={closePieChart}>Close</button>
    </div>
    </div>
  );
};

export default StudentChart;
