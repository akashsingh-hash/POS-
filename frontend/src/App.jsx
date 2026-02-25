import React from "react";
import Menubar from "./components/Menubar/Menubar";
import Dashboard from './pages/Dashboard/Dashboard'
import { Route,Routes, useLocation } from "react-router-dom";
import ManageCategory from "./pages/ManageCategories/ManageCategory";
import ManageUser from './pages/ManageUsers/ManageUser';
import ManageItem from  './pages/ManageItems/ManageItem'
import Explore from './pages/Explore/Explore'
import { Toaster } from 'react-hot-toast';
import Login from "./pages/Login/Login";

const App = () => {
  const location = useLocation();
  return (
    <>
      {location.pathname !== "/login" && <Menubar></Menubar>}
      <Toaster/>
      <Routes>
        <Route path = "/" element = {<Dashboard/>}/>
        <Route path = "/dashboard" element = {<Dashboard/>}/>
        <Route path = "/category" element = {<ManageCategory/>}/>
        <Route path = "/users" element = {<ManageUser/>}/>
        <Route path = "/items" element = {<ManageItem/>}/>
        <Route path = "/explore" element = {<Explore/>}/>
        <Route path="/login" element = {<Login/>}/>
      </Routes>
    </>
  );
};

export default App;
