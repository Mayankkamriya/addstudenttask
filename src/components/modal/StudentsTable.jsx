import { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import AddStudentModal from "./AddStudentModal"; 
import "./styles/studentTable.css";

const StudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(db, "students"));
      const studentList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setStudents(studentList);
    };

    fetchStudents();
  }, []); // Ensure this effect doesn't trigger unnecessary fetches

  const handleAddStudent = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="students-table-container">
      <h2>Student List</h2>
      <button type="button" onClick={handleAddStudent}>Add Student</button>
      <table className="students-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Class</th>
            <th>Section</th>
            <th>Roll Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {students.map((student) => (
            <tr key={student.id}>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.class}</td>
              <td>{student.section}</td>
              <td>{student.rollNumber}</td>
              <td>
                <FaEye title="View" /> <FaEdit title="Edit" /> <FaTrashAlt title="Delete" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && <AddStudentModal onClose={handleCloseModal} />}
    </div>
  );
};

export default StudentsTable;
