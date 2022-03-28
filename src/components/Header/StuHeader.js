import React, { useContext } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import icon from "../../images/logo/brand-logo.png";
import { ProfileContext } from "../../App";
document.title = "Student Dashboard";

const StuHeader = () => {
  const [signedInUser, setSignedInUser] = useContext(ProfileContext);

  return (
    <div className="bg-secondary py-3 shadow-lg mb-5">
      <nav className="navbar navbar-expand-lg navbar-light container-fluid">
        <Link to="/" className="navbar-brand">
          <h1>Yunnan University</h1>
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNavAltMarkup"
          aria-controls="navbarNavAltMarkup"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon text-white"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                to="/dashboard/student/selectCourse"
                className="nav-link font-weight-bold text-dark nav-item-custom"
              >
                Select Course
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/dashboard/student/schedule"
                className="nav-link font-weight-bold text-dark nav-item-custom"
              >
                Schedule
              </Link>
            </li>
            <li className="nav-item">
              <Link
                to="/dashboard/student/result"
                className="nav-link font-weight-bold text-dark nav-item-custom"
              >
                Score
              </Link>
            </li>
          </ul>
          <ul className="navbar-nav">
            <li
              className="mx-3 rounded btn-info text-dark p-2">
              user: {signedInUser.username}
            </li>
            <li className="nav-item">

              <Link
                to="/"
                onClick={() => setSignedInUser({})}
                className="nav-link btn btn-success px-3 text-white"
                style={{ fontWeight: "500" }}
              >
                Logout
              </Link>
            </li>
          </ul>
        </div>
      </nav>
    </div>
  );
};

export default StuHeader;
