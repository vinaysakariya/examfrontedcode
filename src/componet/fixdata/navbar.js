import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../cssfile/Login.css";
import { ReactComponent as Logo } from "../../svgfile/Logo1.svg";

function Navbar({ setIsLoggedIn }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setIsLoggedIn(false);
    navigate("/Login");
  };

  return (
    <div className="flex  p-4  justify-end border-b-1 border-slate-600">
      <div className="text-xl font-bold ">
        <Logo />
      </div>
    </div>
  );
}

export default Navbar;
