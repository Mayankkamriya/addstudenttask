import React, { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate, Navigate } from "react-router-dom";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "src/firebase/config"; // Adjust path to your Firebase config
import "./Styles/login.css"

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [user] = useAuthState(auth);

  if (user) {
    return <Navigate to="/dashboard" />;
  }

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>
    </div>
  );
};

export default LoginPage;



// import React, { useState } from "react";
// import { signInWithEmailAndPassword } from "firebase/auth";
// import { useNavigate } from "react-router-dom";
// import { auth } from "../firebase/config";
// import "./Styles/login.css"

// const LoginPage = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const navigate = useNavigate();

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       await signInWithEmailAndPassword(auth, email, password);
//       navigate("/");
//     } catch (error) {
//       alert(error.message);
//     }
//   };

//   return (
//     <div className="login-page">
//       <form onSubmit={handleLogin}>
//         <h1>Login</h1>
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           required
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           required
//         />
//         <button type="submit">Login</button>
//       </form>
//     </div>
//   );
// };

// export default LoginPage;
