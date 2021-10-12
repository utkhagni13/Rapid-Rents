import React from "react";
import About from "./about/About";
import Services from "./about/Services";
import "../../../styles/HomePage.scss";

const HomePage = () => {
  return (
    <>
      <div className="my_container">
        <h1>This is homepage</h1>
      </div>
      <div className="my_container">
        <About />
      </div>
      <div className="my_container">
        <Services />
      </div>
    </>
  );
};

export default HomePage;
