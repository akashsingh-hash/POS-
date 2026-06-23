import React from "react";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { assets } from "../../assets/assets";
import toast from 'react-hot-toast';

const Menubar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('token');
  const hasToken = token && token !== "null" && token !== "undefined";
  const userEmail = localStorage.getItem('email');
  const role = localStorage.getItem('role') || '';

  const isAdmin = role === 'ROLE_ADMIN' || role === 'ADMIN';

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    navigate('/login');
    window.location.reload();
  };

  if (!hasToken) {
    return null; // Don't show navbar if not logged in
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3 py-2 shadow-sm" style={{ borderBottom: '1px solid var(--glass-border)' }}>
      <div className="container-fluid">
        <Link className="navbar-brand d-flex align-items-center" to="/dashboard">
          <img
            src={assets.logo || "https://placehold.co/40x40?text=POS"}
            alt="Logo"
            height="36"
            className="me-2"
          />
          <span className="text-white fw-bold">Apex POS</span><span style={{ color: 'var(--accent-coral)', fontSize: '1.6rem', lineHeight: '1' }}>.</span>
        </Link>

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/dashboard' ? 'active' : ''}`} to="/dashboard">
                Dashboard
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/explore' ? 'active' : ''}`} to="/explore">
                POS Terminal
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/items' ? 'active' : ''}`} to="/items">
                Manage Items
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname === '/category' ? 'active' : ''}`} to="/category">
                Manage Categories
              </Link>
            </li>
            {isAdmin && (
              <li className="nav-item">
                <Link className={`nav-link ${location.pathname === '/users' ? 'active' : ''}`} to="/users">
                  Manage Users
                </Link>
              </li>
            )}
          </ul>

          <div className="d-flex align-items-center gap-3">
            <div className="d-flex flex-column align-items-end text-light">
              <span className="fw-semibold text-white" style={{ fontSize: '0.85rem' }}>{userEmail}</span>
              <span className={`badge badge-custom ${isAdmin ? 'badge-admin' : 'badge-user'}`} style={{ fontSize: '0.7rem' }}>
                {isAdmin ? 'Admin' : 'Cashier'}
              </span>
            </div>
            
            <button className="btn btn-glow-danger py-1.5 px-3" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right me-1"></i> Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menubar;