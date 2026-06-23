import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { addUser } from '../../service/UserService';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('USER');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!name || !email || !password || !role) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await addUser({ name, email, password, role });
      if (response.status === 201) {
        toast.success("Registration successful! Please login.");
        navigate('/login');
      } else {
        toast.error("Registration failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Registration failed. Email might already be in use.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center" style={{ minHeight: 'calc(100vh - 6rem)' }}>
      <div className="card glass-card p-4 col-11 col-md-5 col-lg-4 text-light">
        <div className="card-body">
          <div className="text-center mb-4">
            <h2 className="text-gradient">Create Account</h2>
            <p className="text-muted">Register to join the POS network</p>
          </div>
          
          <form onSubmit={handleRegister}>
            {/* Full Name */}
            <div className="mb-3">
              <label htmlFor="name" className="form-label text-white">Full Name</label>
              <div className="input-group">
                <span className="input-group-text bg-transparent border-end-0 text-muted" style={{ border: '1px solid var(--glass-border)', borderRadius: '10px 0 0 10px' }}>
                  <i className="bi bi-person"></i>
                </span>
                <input 
                  type="text" 
                  id="name"
                  className="form-control glass-input border-start-0" 
                  style={{ borderRadius: '0 10px 10px 0' }}
                  placeholder="John Doe" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Email Address */}
            <div className="mb-3">
              <label htmlFor="email" className="form-label text-white">Email Address</label>
              <div className="input-group">
                <span className="input-group-text bg-transparent border-end-0 text-muted" style={{ border: '1px solid var(--glass-border)', borderRadius: '10px 0 0 10px' }}>
                  <i className="bi bi-envelope"></i>
                </span>
                <input 
                  type="email" 
                  id="email"
                  className="form-control glass-input border-start-0" 
                  style={{ borderRadius: '0 10px 10px 0' }}
                  placeholder="name@company.com" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div className="mb-3">
              <label htmlFor="password" className="form-label text-white">Password</label>
              <div className="input-group">
                <span className="input-group-text bg-transparent border-end-0 text-muted" style={{ border: '1px solid var(--glass-border)', borderRadius: '10px 0 0 10px' }}>
                  <i className="bi bi-lock"></i>
                </span>
                <input 
                  type="password" 
                  id="password"
                  className="form-control glass-input border-start-0" 
                  style={{ borderRadius: '0 10px 10px 0' }}
                  placeholder="••••••••••••" 
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
            </div>

            {/* Role Dropdown */}
            <div className="mb-4">
              <label htmlFor="role" className="form-label text-white">Access Role</label>
              <select 
                id="role"
                className="form-control glass-input"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="USER">Cashier (USER)</option>
                <option value="ADMIN">Administrator (ADMIN)</option>
              </select>
            </div>

            <button type="submit" className="btn btn-glow w-100 py-2.5 mb-3" disabled={loading}>
              {loading ? "Creating Account..." : "Sign Up"}
            </button>

            <div className="text-center small text-muted">
              Already have an account? <Link to="/login" className="text-warning text-decoration-none fw-semibold">Sign In</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
