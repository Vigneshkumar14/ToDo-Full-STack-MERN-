import React from "react";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import { useRoutes, Navigate } from "react-router-dom";

function App() {
  let routes = useRoutes([
    { path: "/", element: <Navigate to="/login" /> },
    { path: "/signup", element: <Signup /> },
    { path: "/login", element: <Login /> },
    { path: "/dashboard", element: <Dashboard /> },
    { path: "*", element: <Dashboard /> },
  ]);

  return routes;
}

export default App;
