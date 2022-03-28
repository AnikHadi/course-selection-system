import React from "react";
import Header from "../../components/Header/Header";
import LoginForm from "../../components/LoginForm/LoginForm";
import "./Home.css";

const Home = () => {
  return (
    <div className="home-container">
      <Header />
      <LoginForm />
    </div>
  );
};

export default Home;
