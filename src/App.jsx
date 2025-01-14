import React, { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import CreateArticle from "./pages/CreateArticle";
import ArticleDetail from "./pages/ArticleDetail";

function App() {
  const navigate = useNavigate();

  function PrivateRoute({ children }) {
    const token = localStorage.getItem("token");

    useEffect(() => {
      if (!token) {
        navigate("/login", { replace: true });
      }
    }, [token, navigate]);

    if (!token) {
      return null;
    }

    return children; 
  }

  return (
    <div className="min-h-screen bg-gray-100"> 
      <Routes>
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Navbar>
                <Home />
              </Navbar>
            </PrivateRoute>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/create-article"
          element={
            <PrivateRoute>
              <Navbar>
                <CreateArticle />
              </Navbar>
            </PrivateRoute>
          }
        />
        <Route
          path="/article/:id"
          element={
            <PrivateRoute>
              <Navbar>
                <ArticleDetail />
              </Navbar>
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;