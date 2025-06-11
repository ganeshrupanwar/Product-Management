// import React from "react";
// import { NavLink, useNavigate } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { logout } from "../store/authSlice";

// export default function Navbar() {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const user = useSelector((s) => s.auth.user);

//   const handleLogout = () => {
//     dispatch(logout());
//     navigate("/login");
//   };

//   return (
//     <nav className="navbar">
//       <div className="logo">CRM Dashboard</div>
      
//       <div className="nav-links">
//         <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>
//           Dashboard
//         </NavLink>
//         <NavLink to="/products" className={({ isActive }) => isActive ? "active" : ""}>
//           Products
//         </NavLink>
//       </div>

//       <div className="profile-section">
//         {user && (
//           <>
//             <img
//               src={user.image}
//               alt={user.firstName}
//               className="avatar"
//             />
//             <span className="username">{user.firstName}</span>
//           </>
//         )}
//         <button className="button logout-btn" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>
//     </nav>
//   );
// }


// src/components/Navbar.jsx
import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../store/authSlice";

export default function Navbar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((s) => s.auth.user);
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logout());
    navigate("/login");
  };

  return (
    <nav className="navbar">
      <div className="logo">CRM Dashboard</div>

      {/* Hamburger icon */}
      <div
        className="menu-icon"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? "✖" : "☰"}
      </div>

      <div className={`nav-links ${menuOpen ? "show" : ""}`}>
        <NavLink
          to="/dashboard"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setMenuOpen(false)}
        >
          Dashboard
        </NavLink>
        <NavLink
          to="/products"
          className={({ isActive }) => (isActive ? "active" : "")}
          onClick={() => setMenuOpen(false)}
        >
          Products
        </NavLink>
      </div>

      <div className="profile-section">
        {user && (
          <>
            <img
              src={user.image}
              alt={user.firstName}
              className="avatar"
            />
            <span className="username">{user.firstName}</span>
          </>
        )}
        <button
          className="button logout-btn"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </nav>
  );
}
