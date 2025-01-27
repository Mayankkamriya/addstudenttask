import { useState, useEffect } from "react";
import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import AddStudentModal from "./AddStudentModal"; 
import ViewStudentModal from "./ViewStudentModal"; 
import EditStudentModal from "./EditStudentModal"; 
import "./styles/studentTable.css";

const StudentsTable = () => {
  const [students, setStudents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState(null);

  useEffect(() => {
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(db, "students"));
      const studentList = querySnapshot.docs.map((studentDoc) => ({
        id: studentDoc.id,
        ...studentDoc.data(),
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
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(db, "students"));
      const studentList = querySnapshot.docs.map((studentDoc) => ({
        id: studentDoc.id,
        ...studentDoc.data(),
      }));
      setStudents(studentList);
    };
    fetchStudents()
  };

  const handleViewStudent = (student) => {
    console.log('handleViewStudent...');
    setShowViewModal(true);
    setSelectedStudent(student);
  };

  const handleCloseViewModal = () => {
    setShowViewModal(false);
    setSelectedStudent(null);
  };

  const handleEditStudent = (student) => {
    setSelectedStudent(student);
    setShowEditModal(true);
    
    
  };

  const handleCloseEditModal = () => {
    setShowEditModal(false);
    setSelectedStudent(null);
    const fetchStudents = async () => {
      const querySnapshot = await getDocs(collection(db, "students"));
      const studentList = querySnapshot.docs.map((studentDoc) => ({
        id: studentDoc.id,
        ...studentDoc.data(),
      }));
      setStudents(studentList);
    };
    fetchStudents()
  };

  const handleDeleteStudent = async (id) => {
    try {
      // Get the document reference using the doc function
      const studentDoc = doc(db, "students", id);
      await deleteDoc(studentDoc);
      setStudents(students.filter((student) => student.id !== id));

    } catch (error) {
      console.error("Error deleting student: ", error);
    }
  };
  // const handleDeleteStudent = async (id) => {
  //   try {
  //     await deleteDoc(doc(db, "students", id));
  //     setStudents(students.filter((student) => student.id !== id));
  //   } catch (error) {
  //     console.error("Error deleting student: ", error);
  //   }
  // };

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
                <button style={{ backgroundColor: '#F9FAFB', color: 'white' }} type="button" onClick={() => handleViewStudent(student)}>
                  <FaEye title="View" />
                </button>
                <button style={{ backgroundColor: '#F9FAFB', color: 'white' }} type="button" onClick={() => handleEditStudent(student)}>
                  <FaEdit title="Edit" />
                </button>
                <button style={{ backgroundColor: '#F9FAFB', color: 'white' }} type="button" onClick={() => handleDeleteStudent(student.id)}>
                  <FaTrashAlt title="Delete" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {showModal && <AddStudentModal onClose={handleCloseModal} />}
      {showViewModal && <ViewStudentModal student={selectedStudent} onClose={handleCloseViewModal} />}
      {showEditModal && <EditStudentModal student={selectedStudent} onClose={handleCloseEditModal} />}
    </div>
  );
};

export default StudentsTable;



// origin 
// import { useState, useEffect } from "react";
// import { FaEye, FaEdit, FaTrashAlt } from "react-icons/fa";
// import { collection, getDocs } from "firebase/firestore";
// import { db } from "../../firebase/config";
// import AddStudentModal from "./AddStudentModal"; 
// import "./styles/studentTable.css";

// const StudentsTable = () => {
//   const [students, setStudents] = useState([]);
//   const [showModal, setShowModal] = useState(false);

//   useEffect(() => {
//     const fetchStudents = async () => {
//       const querySnapshot = await getDocs(collection(db, "students"));
//       const studentList = querySnapshot.docs.map((doc) => ({
//         id: doc.id,
//         ...doc.data(),
//       }));
//       setStudents(studentList);
//     };

//     fetchStudents();
//   }, []); // Ensure this effect doesn't trigger unnecessary fetches

//   const handleAddStudent = () => {
//     setShowModal(true);
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <div className="students-table-container">
//       <h2>Student List</h2>
//       <button type="button" onClick={handleAddStudent}>Add Student</button>
//       <table className="students-table">
//         <thead>
//           <tr>
//             <th>ID</th>
//             <th>Name</th>
//             <th>Class</th>
//             <th>Section</th>
//             <th>Roll Number</th>
//             <th>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {students.map((student) => (
//             <tr key={student.id}>
//               <td>{student.id}</td>
//               <td>{student.name}</td>
//               <td>{student.class}</td>
//               <td>{student.section}</td>
//               <td>{student.rollNumber}</td>
//               <td>
//                 <FaEye title="View" /> <FaEdit title="Edit" /> <FaTrashAlt title="Delete" />
//               </td>
//             </tr>
//           ))}
//         </tbody>
//       </table>

//       {showModal && <AddStudentModal onClose={handleCloseModal} />}
//     </div>
//   );
// };

// export default StudentsTable;
