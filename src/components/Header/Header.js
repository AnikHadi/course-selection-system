import React from "react";
import brandImg from "../../images/logo/brand-logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-white">
      <nav className="nav flex-row container py-3">
        <div className="navbar">
          
          <Link className='text-decoration-none text-primary' to="">
            <h1><font color="black">Yunnan University</font></h1>
          </Link>
        </div>
        <ul className="ms-auto">
          <Link className="nav-link active text-end" aria-current="page" to="">
          <font color="black">Home</font>
          </Link>
          <Link className="nav-link text-end" to="">
          <font color="black">About</font>
          </Link>
          <Link className="nav-link" to="/dashboard/admin">
          <font color="black">Dashboard</font>
          </Link>
        </ul>
      </nav>
    </div>
  );
};

export default Header;
