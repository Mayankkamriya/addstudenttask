import React, { useState } from "react";
import PropTypes from "prop-types";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/config";
import "./styles/editStudent.css";

const EditStudentModal = ({ student, onClose }) => {
  const [formData, setFormData] = useState({ ...student });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const studentRef = doc(db, "students", student.id);
      await updateDoc(studentRef, formData);
      alert("Student details updated successfully!");
      onClose();
    } catch (error) {
      console.error("Error updating student:", error);
      alert("Error updating student. Please try again.");
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="class">Class:
              <input
                type="text"
                name="class"
                value={formData.class}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="section">Section:
              <input
                type="text"
                name="section"
                value={formData.section}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="rollNumber">Roll Number:
              <input
                type="text"
                name="rollNumber"
                value={formData.rollNumber}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email:
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="phone">Phone:
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="address">Address:
              <textarea
                name="address"
                value={formData.address}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="dob">Date of Birth:
              <input
                type="date"
                name="dob"
                value={formData.dob}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="guardianName">Guardian&#39;s Name:
              <input
                type="text"
                name="guardianName"
                value={formData.guardianName}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="guardianPhone">Guardian&#39;s Phone:
              <input
                type="tel"
                name="guardianPhone"
                value={formData.guardianPhone}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="admissionDate">Admission Date:
              <input
                type="date"
                name="admissionDate"
                value={formData.admissionDate}
                onChange={handleChange}
                required
              />
            </label>
          </div>
          <div className="form-group">
            <label htmlFor="gender">Gender:
              <select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                required
              >
                <option value="" disabled>Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </label>
          </div>
          <button type="submit">Update</button>
          <button type="button" onClick={onClose}>Close</button>
        </form>
      </div>
    </div>
  );
};

EditStudentModal.propTypes = {
  // student: PropTypes.object.isRequired, // The student object containing current details
  
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
    gender: PropTypes.string.isRequired,
  }).isRequired,
  
  onClose: PropTypes.func.isRequired, // Function to close the modal
};

export default EditStudentModal;
