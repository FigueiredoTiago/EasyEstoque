/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

const PrivateRoute = ({ children }) => {
  const { data } = useSelector((state) => state.auth);

  if (!data) return <Navigate to="/" />;
  return children;
};

export default PrivateRoute;
