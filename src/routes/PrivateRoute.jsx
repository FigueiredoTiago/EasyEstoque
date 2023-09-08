/* eslint-disable react/prop-types */
import { Navigate } from "react-router-dom";

const PrivateRoute = ({children}) => {
  const token = true;

  if(token === false) return <Navigate to="/" />;
  return  children;
};

export default PrivateRoute;
