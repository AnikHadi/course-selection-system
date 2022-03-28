import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ProfileContext } from "../App";
import StuHeader from "../components/Header/StuHeader";

const StuDash = () => {
  const [signedInUser] = useContext(ProfileContext);
  return (
    <div className="Student-dashboard">
      <StuHeader />
      <div className="student-dash-banner mt-5 row d-flex justify-content-center">
        <div className="card col-md-4 px-0">
          <div className="card-header text-center">Login Info</div>
          <div className="card-body py-5">
            <h3 className="text-dark text-center font-weight-bold">
              You logged in as {signedInUser.name.toUpperCase()} (
              {signedInUser.role.toUpperCase()})
            </h3>
          </div>
          <div className="card-footer">
            <Link to="/" className="btn btn-success px-5 d-block mx-auto">
              Go Back
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StuDash;
