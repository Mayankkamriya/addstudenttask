import React from "react";
import PropTypes from "prop-types";
import "./styles/viewStudent.css";

const ViewStudentModal = ({ student, onClose }) => {
  /* eslint-disable arrow-body-style */
  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Student Details</h2>
        <div className="student-details">
          <p><strong>Name: </strong>{student.name}</p>
          <p><strong>Class: </strong>{student.class}</p>
          <p><strong>Section: </strong>{student.section}</p>
          <p><strong>Roll Number: </strong>{student.rollNumber}</p>
          <p><strong>Email: </strong>{student.email}</p>
          <p><strong>Phone: </strong>{student.phone}</p>
          <p><strong>Address: </strong>{student.address}</p>
          <p><strong>Date of Birth: </strong>{student.dob}</p>
          <p><strong>Guardian&#39;s Name: </strong>{student.guardianName}</p>
          <p><strong>Guardian&#39;s Phone: </strong>{student.guardianPhone}</p>
          <p><strong>Admission Date: </strong>{student.admissionDate}</p>
          <p><strong>Gender: </strong>{student.gender}</p>
        </div>
        <button type="button" onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

ViewStudentModal.propTypes = {

    student: PropTypes.shape({
        id: PropTypes.string.isRequired,    
        name: PropTypes.string.isRequired, 
        class: PropTypes.string.isRequired, 
        section: PropTypes.string.isRequired, 
        rollNumber: PropTypes.string.isRequired,
        email: PropTypes.string.isRequired,
        phone: PropTypes.string.isRequired,
        address: PropTypes.string.isRequired,
        dob: PropTypes.string.isRequired,
        guardianName: PropTypes.string.isRequired,
        guardianPhone: PropTypes.string.isRequired,
        admissionDate: PropTypes.string.isRequired,
        gender: PropTypes.string.isRequired
      }).isRequired, 


//   student: PropTypes.object.isRequired,  // Validate that student is an object
  onClose: PropTypes.func.isRequired,    // Validate that onClose is a required function
};

export default ViewStudentModal;
