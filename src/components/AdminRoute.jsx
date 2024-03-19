import { Navigate } from "react-router";
import { getLocalStorage } from "../utils/localStorage";
function AdminRoute({ children, ...rest }) {
  const token = localStorage.getItem("token");
  const role = getLocalStorage("role");
  console.log(role);
  // If token is not available, redirect to login route
  if (!token) {
    return <Navigate to="/" replace={true} />;
  }
  if (role !== "admin") {
    return <Navigate to="/" replace={true} />;
  }

  // If token is available, render the specified children
  return children;
}

export default AdminRoute;
