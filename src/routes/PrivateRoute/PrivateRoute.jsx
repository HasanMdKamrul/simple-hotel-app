import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../contexts/UserContext";

const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  loading && <div>Loading...</div>;

  if (user && user.uid) {
    return children;
  }

  return <Navigate to="/signin" replace state={{ from: location }}></Navigate>;
};

export default PrivateRoute;
