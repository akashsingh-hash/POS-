import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Zap, ShoppingCart, TrendingUp, Mail, Lock, User } from 'lucide-react';
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

  // Animation variants
  const fadeUp = (delay) => ({
    hidden: { opacity: 0, y: 28 },
    visible: { 
      opacity: 1, 
      y: 0, 
      transition: { 
        delay, 
        duration: 0.6, 
        ease: [0.22, 1, 0.36, 1] 
      } 
    }
  });

  return (
    <div className="relative w-full min-h-screen flex flex-col justify-between overflow-x-hidden" style={{ color: 'var(--color-text)' }}>
      {/* Background Video */}
      <div className="bg-video-container">
        <video autoPlay muted loop playsInline>
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260518_003132_8b7edcb6-c64d-4a52-a9ca-879942e122ad.mp4" type="video/mp4" />
        </video>
        <div className="bg-video-overlay" style={{ backgroundColor: 'rgba(242, 242, 238, 0.45)' }}></div>
      </div>

      {/* Main Container */}
      <div className="w-full max-w-[1280px] mx-auto px-6 sm:px-12 flex-grow flex flex-col md:flex-row items-center justify-between gap-12" style={{ paddingTop: 'clamp(40px, 8vw, 72px)', paddingBottom: '40px' }}>
        
        {/* Left Side: Hero Section */}
        <div className="w-full md:max-w-[560px] flex flex-col items-start text-start">
          
          {/* Heading */}
          <motion.h1 
            initial="hidden"
            animate="visible"
            variants={fadeUp(0)}
            className="text-[#192837] mb-6 font-bold"
            style={{ 
              fontFamily: 'var(--font-heading)',
              fontSize: 'clamp(1.85rem, 4.5vw, 2.85rem)', 
              lineHeight: '1.05', 
              letterSpacing: '-0.01em' 
            }}
          >
            <Zap className="inline-block mr-2 text-[#7342E2]" size={28} style={{ verticalAlign: 'middle', position: 'relative', top: '-2px' }} />
            Smart Point of Sale
            <ShoppingCart className="inline-block mx-2 text-[#7342E2]" size={28} style={{ verticalAlign: 'middle', position: 'relative', top: '-2px' }} />
            & Business Inventory
            <TrendingUp className="inline-block ml-2 text-[#7342E2]" size={28} style={{ verticalAlign: 'middle', position: 'relative', top: '-2px' }} />
          </motion.h1>

          {/* Subtext */}
          <motion.p 
            initial="hidden"
            animate="visible"
            variants={fadeUp(0.15)}
            className="text-[#192837] mb-8 font-normal"
            style={{ 
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.95rem, 2.5vw, 1.1rem)', 
              lineHeight: '1.65',
              opacity: 0.85
            }}
          >
            Streamline retail checkout transactions, coordinate active product groups, and unlock real-time business intelligence in one premium fluid platform.
          </motion.p>
        </div>

        {/* Right Side: Glass Register Card */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          className="w-full md:max-w-[460px]"
        >
          <div 
            className="card glass-card shadow-2xl" 
            style={{ 
              border: '1px solid var(--glass-border)',
              padding: '40px 48px',
              borderRadius: '24px'
            }}
          >
            <div className="text-center mb-6">
              <h3 className="text-gradient mb-2 font-bold" style={{ fontSize: '1.9rem', fontFamily: 'var(--font-heading)' }}>Create Account</h3>
              <p className="text-[#5a6e7f] small font-semibold">Register to join the POS network</p>
            </div>

            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              {/* Full Name */}
              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="name" className="font-bold text-sm text-[#192837]">Full Name</label>
                <div className="relative flex items-center">
                  <User className="absolute left-3.5 text-slate-500" size={18} style={{ zIndex: 5 }} />
                  <input 
                    type="text" 
                    id="name"
                    className="w-full glass-input glass-input-icon pl-11 pr-4 py-3 text-sm font-semibold"
                    style={{ borderRadius: '12px' }}
                    placeholder="John Doe" 
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Email Address */}
              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="email" className="font-bold text-sm text-[#192837]">Email Address</label>
                <div className="relative flex items-center">
                  <Mail className="absolute left-3.5 text-slate-500" size={18} style={{ zIndex: 5 }} />
                  <input 
                    type="email" 
                    id="email"
                    className="w-full glass-input glass-input-icon pl-11 pr-4 py-3 text-sm font-semibold"
                    style={{ borderRadius: '12px' }}
                    placeholder="name@company.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* Password */}
              <div className="flex flex-col gap-1.5 text-left">
                <label htmlFor="password" className="font-bold text-sm text-[#192837]">Password</label>
                <div className="relative flex items-center">
                  <Lock className="absolute left-3.5 text-slate-500" size={18} style={{ zIndex: 5 }} />
                  <input 
                    type="password" 
                    id="password"
                    className="w-full glass-input glass-input-icon pl-11 pr-4 py-3 text-sm font-semibold"
                    style={{ borderRadius: '12px' }}
                    placeholder="••••••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
              </div>



              {/* Submit Button */}
              <button 
                type="submit" 
                className="w-full text-[#ffffff] font-bold text-sm transition-all flex items-center justify-center hover:opacity-90 active:scale-[0.98]" 
                disabled={loading}
                style={{ 
                  height: '48px',
                  background: '#7342E2',
                  borderRadius: '50px',
                  border: 'none',
                  cursor: 'pointer',
                  boxShadow: '0 4px 15px rgba(115, 66, 226, 0.25)'
                }}
              >
                {loading ? "Creating Account..." : "Sign Up"}
              </button>

              <div className="text-center small text-muted mt-2 font-medium">
                Already have an account? <Link to="/login" className="text-[#7342E2] font-semibold hover:underline">Sign In</Link>
              </div>
            </form>
          </div>
        </motion.div>

      </div>
    </div>
  );
};

export default Register;
