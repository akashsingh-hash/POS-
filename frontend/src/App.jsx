import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Menubar from "./components/Menubar/Menubar";
import Dashboard from './pages/Dashboard/Dashboard';
import ManageCategory from "./pages/ManageCategories/ManageCategory";
import ManageUser from './pages/ManageUsers/ManageUser';
import ManageItem from './pages/ManageItems/ManageItem';
import Explore from './pages/Explore/Explore';
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import { Toaster } from 'react-hot-toast';

const App = () => {
  const token = localStorage.getItem('token');
  const hasToken = token && token !== "null" && token !== "undefined";
  const role = localStorage.getItem('role') || '';
  const isAdmin = role === 'ROLE_ADMIN' || role === 'ADMIN';

  return (
    <>
      <Menubar />
      <Toaster position="top-right" reverseOrder={false} />
      
      <Routes>
        {/* Public Routes */}
        <Route 
          path="/login" 
          element={hasToken ? <Navigate to="/dashboard" replace /> : <Login />} 
        />
        <Route 
          path="/register" 
          element={hasToken ? <Navigate to="/dashboard" replace /> : <Register />} 
        />

        {/* Protected Routes */}
        <Route 
          path="/dashboard" 
          element={hasToken ? <Dashboard /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/explore" 
          element={hasToken ? <Explore /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/category" 
          element={hasToken ? <ManageCategory /> : <Navigate to="/login" replace />} 
        />
        <Route 
          path="/items" 
          element={hasToken ? <ManageItem /> : <Navigate to="/login" replace />} 
        />
        
        {/* Admin Only Route */}
        <Route 
          path="/users" 
          element={hasToken && isAdmin ? <ManageUser /> : <Navigate to={hasToken ? "/dashboard" : "/login"} replace />} 
        />

        {/* Fallback Route */}
        <Route 
          path="*" 
          element={<Navigate to={hasToken ? "/dashboard" : "/login"} replace />} 
        />
      </Routes>
    </>
  );
};

export default App;
