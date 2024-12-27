import React, { useEffect, useState } from "react";
import "./Nav.css";
import { useNavigate } from "react-router-dom";

function Nav() {
  const [show, handleShow] = useState(false);
  const navigate = useNavigate();

  const transitionNavBar = () => {
    if (window.scrollY > 100) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavBar);
    // Clean up
    return () => window.removeEventListener("scroll", transitionNavBar);
  }, []);

  return (
    <div className={`nav ${show && "nav__black"}`}>
      <div className="nav__contents">
        <img
          onClick={() => navigate("/")}
          className="nav__logo"
          src="https://i.ibb.co/N7rQGy8/netflix-logo.png"
          alt=""
        />
        <img
          onClick={() => navigate("/profile")}
          className="nav__avatar"
          src="https://i.ibb.co/1XGxdsc/netflix-avatar.webp"
          alt=""
        />
      </div>
    </div>
  );
}

export default Nav;
