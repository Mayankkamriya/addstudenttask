import { useNavigate } from "react-router-dom";
import { getAuth } from "firebase/auth";
import "./Styles/logout.css"; 

const Logout = () => {
  const auth = getAuth(); 
  const navigate = useNavigate(); 

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        console.log("User logged out successfully");
        navigate("/login"); 
      })
      .catch((error) => {
        console.error("Error logging out:", error);
      });
  };

  return (
    <div className="logout-container">
      <div className="logout-card">
        <h1 className="logout-title">Logout</h1>
        <p className="logout-text">Are you sure you want to log out?</p>
        <div className="button-group">
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
          <button onClick={() => navigate(-1)} className="cancel-button">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Logout;
