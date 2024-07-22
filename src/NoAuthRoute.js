import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NoAuthRoute = (props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    if (token) {
      navigate("/admin/Home");
    }
  }, [token]);

  return props.children;
};

export default NoAuthRoute;
