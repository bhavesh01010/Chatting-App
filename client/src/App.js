import "./App.css";
import Form from "./modules/Form";
import Dashboard from "./modules/Dashboard";
import { Routes, Route, Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("user:token" !== null) || true
  if (!isLoggedIn) {
    console.log("Navigated")
    return <Navigate to={"/user/sign_up"} />;
  } else if (
    isLoggedIn &&
    ["/user/sign_in", "/user/sign_up"].includes(window.location.pathname)
  ) {
    return <Navigate to={"/"} />;
  }
  return children;
};

function App() {
  return (
    <Routes>
      
        <Route path="/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
      
      <Route
        path="/user/sign_in"
        element={
          <Form isSignInPage={true} />
        }
      />
      <Route
        path="/user/sign_up"
        element={
          <Form isSignInPage={false} />
        }
      />
    </Routes>
  );
}

export default App;
