import React, { useState } from 'react';
import { addUser } from '../../../service/UserService';
import toast from 'react-hot-toast';

const UserForm = ({ setUsers }) => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "USER" // Default to standard USER role
  });

  const onChangeHandler = (e) => {
    const { name, value } = e.target;
    setData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.password || !data.role) {
      toast.error("Please fill in all fields");
      return;
    }

    setLoading(true);
    try {
      const response = await addUser({
        name: data.name,
        email: data.email,
        password: data.password,
        role: data.role // Send ROLE_USER / ROLE_ADMIN format based on selection
      });
      
      if (response.status === 201) {
        setUsers(prev => [...prev, response.data]);
        toast.success("User registered successfully!");
        setData({ name: "", email: "", password: "", role: "USER" });
      } else {
        toast.error("Failed to register user");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Registration failed. Email might already exist.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-2 mt-2">
      <div className="row">
        <div className="card glass-card col-md-12 p-3">
          <div className="card-body">
            <h4 className="mb-4 text-gradient">Register New User</h4>
            
            <form onSubmit={onSubmitHandler}>
              {/* Full Name */}
              <div className="mb-3">
                <label htmlFor="name" className="form-label text-[#192837] font-semibold">Full Name</label>
                <input 
                  type="text" 
                  name="name" 
                  id="name" 
                  className="form-control glass-input" 
                  placeholder="John Doe" 
                  value={data.name}
                  onChange={onChangeHandler}
                  required
                />
              </div>

              {/* Email Address */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-[#192837] font-semibold">Email Address</label>
                <input 
                  type="email" 
                  name="email" 
                  id="email" 
                  className="form-control glass-input" 
                  placeholder="john.doe@company.com" 
                  value={data.email}
                  onChange={onChangeHandler}
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label text-[#192837] font-semibold">Password</label>
                <input 
                  type="password" 
                  name="password" 
                  id="password" 
                  className="form-control glass-input" 
                  placeholder="••••••••••••" 
                  value={data.password}
                  onChange={onChangeHandler}
                  required
                />
              </div>

              {/* User Role */}
              <div className="mb-4">
                <label htmlFor="role" className="form-label text-[#192837] font-semibold">Access Role</label>
                <select 
                  name="role" 
                  id="role" 
                  className="form-control glass-input"
                  value={data.role}
                  onChange={onChangeHandler}
                  required
                >
                  <option value="USER">Cashier (USER)</option>
                  <option value="ADMIN">Administrator (ADMIN)</option>
                </select>
              </div>

              <button type="submit" className="btn btn-glow w-100 py-2.5" disabled={loading}>
                {loading ? "Registering..." : "Create User Account"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
