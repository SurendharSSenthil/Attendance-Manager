import React, { useState,useEffect } from "react";
import Confirmation from './Confirmation.js';
import './App.css';

function App() {
  const defaultData = [
    {
      Id: 1, name: "Surendhar S", regno: '71772217149', attendance: Array(248).fill(true)
    },
    {
      Id: 2, name: "Srinivass S", regno: '71772217147', attendance: Array(248).fill(true)
    },
    {
      Id: 3, name: "Sakthi D", regno: '71772217139', attendance: Array(248).fill(true)
    }
  ];

  const initialData = JSON.parse(localStorage.getItem("studentData")) || defaultData;

  const [studentData, setStudentData] = useState(initialData);
  const [newStudentName, setNewStudentName] = useState("");
  const [newStudentRegNo, setNewStudentRegNo] = useState("");
  const [showConfirmation,setShowConfirmation] = useState(false);
  const [studentToAdd,setStudentToAdd] = useState(null);

  useEffect(() => {
    const studentDataArrayJSON = JSON.stringify(studentData);
    localStorage.setItem("studentData", studentDataArrayJSON);
    console.log(studentData);
  }, [studentData]);
  
  const sortedArray = (data) => {
    const s_data = [...data].sort((a, b) => {
      return a.name.localeCompare(b.name);
    });
    return s_data;
  };
  
  const handleCheckboxChange = (studentIndex, attendanceIndex) => {
  setStudentData((prevStudentData) => {
    const updatedStudentData = [...prevStudentData];
    const updatedStudent = { ...updatedStudentData[studentIndex] };
    const updatedAttendance = [...updatedStudent.attendance];
    updatedAttendance[attendanceIndex] = !updatedAttendance[attendanceIndex];
    updatedStudent.attendance = updatedAttendance;
    updatedStudentData[studentIndex] = updatedStudent;

    return updatedStudentData;
  });
};

  

  const handleAddStudent = (e) => {
    e.preventDefault();
    if (newStudentName && newStudentRegNo) {
      const newStudent = {
        Id: studentData.length + 1,
        name: newStudentName,
        regno: newStudentRegNo,
        attendance: Array(248).fill(true) 
      };
      setStudentToAdd(newStudent);
      setShowConfirmation(true);

    }
  };

  const handleConfirmSubmission = () => {
    if(studentToAdd){
      setStudentData((prevStudentData) => { 
        const sortingList = [...prevStudentData, studentToAdd];
      const sortedList = sortedArray(sortingList);
        return sortedList;
    })
    }
    setNewStudentName("");
    setNewStudentRegNo("");
    setShowConfirmation(false);
    setStudentToAdd(null);
  }

  const handleCancelSubmission = () => {
    setStudentToAdd(null);
    setShowConfirmation(false);
    setNewStudentName("");
    setNewStudentRegNo("");
  }

  const handleDelete = (Id) => {
    const deletedStudentList = studentData.filter(student => student.Id !== Id);
    setStudentData(deletedStudentList);
    
  }
  return (
    <div>
      <h1>Student Attendance List</h1>
      <nav>
        <form onSubmit={handleAddStudent}>
          <label>Name</label>
          <input type="text" value={newStudentName} onChange={(e) => setNewStudentName(e.target.value)}/>
          <label>Reg No</label>
          <input type="text" value={newStudentRegNo} onChange={(e) => setNewStudentRegNo(e.target.value)}/>
          <p>No of Students:{studentData.length}</p>
          <button type="submit">Add Student</button>
        </form>
        {showConfirmation && (
        <Confirmation
          student={studentToAdd}
          onConfirm={handleConfirmSubmission}
          onCancel={handleCancelSubmission}
        />
      )}
      </nav>
      <table>
        <thead>
          <tr>
            <th rowSpan={2}>Student name</th>
            <th rowSpan={2}>Reg No</th>
            {Array.from({ length: 31 }).map((_, dayIndex) => (
              <React.Fragment key={dayIndex}>
                {[...Array(8)].map((_, hourIndex) => (
                  <th key={hourIndex}>Day {dayIndex + 1} Hour {hourIndex + 1}</th>
                ))}
              </React.Fragment>
            ))}
            <th>No of Hours</th>
            <th>No of Hours Present</th>
            <th>Attendance Percentage</th>
            <th rowSpan={2}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {studentData.map((student, studentIndex) => {
            const hoursPresent = student.attendance.filter(hr => hr).length;
            const percent = ((hoursPresent/248)*100).toFixed(2);
            return (
              <tr key={student.Id}>
                <td>{student.name}</td>
                <td>{student.regno}</td>
                {student.attendance.map((isPresent, attendanceIndex) => (
                  <td key={attendanceIndex}>
                    <input
                      type="checkbox"
                      checked={isPresent}
                      onChange={() => handleCheckboxChange(studentIndex, attendanceIndex)}
                    />
                  </td>
                ))}
                <td>248</td>
                <td>{hoursPresent}</td>
                <td>{percent}</td>
                <td>
                  <button key={studentIndex} onClick={() => handleDelete(student.Id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
