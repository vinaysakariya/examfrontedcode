import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const StudentAuthRoute = (props) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("authTokenstu");

  useEffect(() => {
    if (!token) {
      navigate("/student/login");
    }
  }, [token]);

  return props.children;
};

export default StudentAuthRoute;
