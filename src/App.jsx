import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Navbar from './components/Navbar';
import Login from './pages/Login';
import Register from './pages/Register';
import Home from './pages/Home';
import CreateArticle from './pages/CreateArticle';
import ArticleDetail from './pages/ArticleDetail';

function PrivateRoute({ children }) {
  const isAuthenticated = localStorage.getItem('authToken');
  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
      <div className="min-h-screen bg-gray-100">
        <Routes>
          <Route path="/" element={<Navbar><Home /></Navbar>} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/create-article" element={<Navbar><CreateArticle /></Navbar>} />
          <Route path="/article/:id" element={<Navbar><ArticleDetail /></Navbar>} />
        </Routes>
      </div>
  );
}

export default App;