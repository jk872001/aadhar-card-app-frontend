import { Navigate } from "react-router";
function PrivateRoute({ children, ...rest }) {
// const navigate=useNavigate()
  // Check if token is available in localStorage
  const token = localStorage.getItem('token');
  // If token is not available, redirect to login route
  if (!token) {
    return <Navigate to="/"  replace={true} />
    // navigate("/")
  }

  // If token is available, render the specified children
  return children;
}

export default PrivateRoute;