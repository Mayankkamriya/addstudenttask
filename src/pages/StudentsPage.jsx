import { useState } from "react";
import StudentsTable from "../components/modal/StudentsTable";
import AddStudentModal from "../components/modal/AddStudentModal";

const StudentsPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="students-page">
      <div className="main-content">
        <StudentsTable />
      </div>
      {isModalOpen && (
        <>
          <div className="modal-overlay" onClick={closeModal}></div>
          <AddStudentModal onClose={closeModal} />
        </>
      )}
    </div>
  );
};

export default StudentsPage;
