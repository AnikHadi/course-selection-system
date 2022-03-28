import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProfileContext } from "../../App";
document.title = "Admin Dashboard";

const AdminHeader = () => {
  const [signedInUser, setSignedInUser] = useContext(ProfileContext);

  return (
    <div className="bg-secondary py-3 shadow-lg mb-5">
      <nav className="navbar navbar-expand-lg navbar-light container">
        <Link to="/" className="navbar-brand">
          <font size="40">Yunnan University</font>
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
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
          <ul className="navbar-nav ms-auto">
            <li className="nav-item">
              <Link
                to="/dashboard/admin/createCourse"
                className="nav-link font-weight-bold text-dark nav-item-custom"
              >
                Create Course
              </Link>
              <Link
                to="/dashboard/admin/showCourse"
                className="nav-link font-weight-bold text-dark nav-item-custom"
              >
                Show Course
              </Link>
              <Link
                to="/dashboard/admin/createTeacher"
                className="nav-link font-weight-bold text-dark nav-item-custom"
              >
                Create Teacher
              </Link>
            </li>
            <li className="nav-item border-right">
              <Link
                to="/dashboard/admin/showTeacher"
                className="nav-link font-weight-bold text-dark nav-item-custom"
              >
                Show Teacher
              </Link>
              <Link
                to="/dashboard/admin/createStudent"
                className="nav-link font-weight-bold text-dark nav-item-custom"
              >
                Create Student
              </Link>
              <Link
                to="/dashboard/admin/showStudent"
                className="nav-link font-weight-bold text-dark nav-item-custom"
              >
                Show Student
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
                className="nav-link btn btn-success px-1 text-white"
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

export default AdminHeader;
