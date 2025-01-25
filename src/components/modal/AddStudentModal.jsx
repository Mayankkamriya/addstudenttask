import React, { useState } from "react";
import { db } from "../../firebase/config"; 
import { collection, addDoc } from "firebase/firestore";
import "./styles/addStudent.css"; 

const AddStudentModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    name: "",
    class: "",
    section: "",
    rollNumber: "",
    email: "",
    phone: "",
    address: "",
    dob: "",
    guardianName: "",
    guardianPhone: "",
    admissionDate: "",
    gender: "", 
  });

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await addDoc(collection(db, "students"), formData);

      alert("Student added successfully!");
      onClose(); 
    } catch (error) {
      console.error("Error adding student:", error);
      alert("Error adding student. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Add Student</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="class">Class:</label>
            <input
              type="text"
              id="class"
              name="class"
              placeholder="Class"
              value={formData.class}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="section">Section:</label>
            <input
              type="text"
              id="section"
              name="section"
              placeholder="Section"
              value={formData.section}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="rollNumber">Roll Number:</label>
            <input
              type="text"
              id="rollNumber"
              name="rollNumber"
              placeholder="Roll Number"
              value={formData.rollNumber}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="phone">Phone:</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              placeholder="Phone Number"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="address">Address:</label>
            <textarea
              id="address"
              name="address"
              placeholder="Address"
              value={formData.address}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dob">Date of Birth:</label>
            <input
              type="date"
              id="dob"
              name="dob"
              value={formData.dob}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="guardianName">Guardian's Name:</label>
            <input
              type="text"
              id="guardianName"
              name="guardianName"
              placeholder="Guardian's Name"
              value={formData.guardianName}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="guardianPhone">Guardian's Phone:</label>
            <input
              type="tel"
              id="guardianPhone"
              name="guardianPhone"
              placeholder="Guardian's Phone"
              value={formData.guardianPhone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="admissionDate">Admission Date:</label>
            <input
              type="date"
              id="admissionDate"
              name="admissionDate"
              value={formData.admissionDate}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Select Gender
              </option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </button>
          <button onClick={onClose} disabled={loading}>
          Close
        </button>
        </form>
      </div>
    </div>
  );
};

export default AddStudentModal;
