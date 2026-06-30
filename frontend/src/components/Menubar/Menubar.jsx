import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import toast from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, ShieldAlert } from 'lucide-react';

const LogoSvg = ({ fill = "#192837" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" overflow="visible" viewBox="0 0 256 256">
    <path fill={fill} d="M128 0c70.69 0 128 57.31 128 128s-57.31 128-128 128S0 198.69 0 128 57.31 0 128 0Zm0 22c-58.54 0-106 47.46-106 106 0 58.54 47.46 106 106 106 58.54 0 106-47.46 106-106 0-58.54-47.46-106-106-106Z" opacity=".1"/>
    <path fill={fill} d="M128 32c53.02 0 96 42.98 96 96s-42.98 96-96 96-96-42.98-96-96 42.98-96 96-96Zm0 20c-41.98 0-76 34.02-76 76s34.02 76 76 76 76-34.02 76-76-34.02-76-76-76Z" opacity=".2"/>
    <path fill={fill} d="M128 64c35.35 0 64 28.65 64 64s-28.65 64-64 64-64-28.65-64-64 28.65-64 64-64Zm0 20c-24.3 0-44 19.7-44 44s19.7 44 44 44 44-19.7 44-44-19.7-44-44-44Z" opacity=".3"/>
    <path fill={fill} d="M106.67 96h42.66C155.22 96 160 100.78 160 106.67v42.66c0 5.89-4.78 10.67-10.67 10.67h-42.66C100.78 160 96 155.22 96 149.33v-42.66C96 100.78 100.78 96 106.67 96Z"/>
  </svg>
);

const Menubar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);

  const token = localStorage.getItem('token');
  const hasToken = token && token !== "null" && token !== "undefined";
  const userEmail = localStorage.getItem('email');
  const role = localStorage.getItem('role') || '';
  const isAdmin = role === 'ROLE_ADMIN' || role === 'ADMIN';

  const handleLogout = () => {
    localStorage.clear();
    toast.success("Logged out successfully");
    setIsOpen(false);
    navigate('/login');
    window.location.reload();
  };

  const publicLinks = [
    { name: 'Features', path: '/features' },
    { name: 'How to Use', path: '/about' }
  ];

  const privateLinks = [
    { name: 'Dashboard', path: '/dashboard' },
    { name: 'POS Terminal', path: '/explore' },
    { name: 'Manage Items', path: '/items' },
    { name: 'Manage Categories', path: '/category' },
    ...(isAdmin ? [{ name: 'Manage Users', path: '/users' }] : []),
    { name: 'Features', path: '/features' },
    { name: 'How to Use', path: '/about' }
  ];

  const currentLinks = hasToken ? privateLinks : publicLinks;

  return (
    <nav className="relative w-full z-30" style={{ color: 'var(--color-text)' }}>
      {/* Container */}
      <div className="max-w-[1280px] mx-auto px-5 sm:px-8 py-4 sm:py-5 flex items-center justify-between">
        
        {/* Left: Logo */}
        <Link className="flex items-center gap-2 text-decoration-none" to={hasToken ? "/dashboard" : "/login"}>
          <LogoSvg fill="#192837" />
          <span className="text-[#192837] font-bold text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
            Apex POS
          </span>
        </Link>

        {/* Center: Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-6">
          {currentLinks.map((link, idx) => {
            if (link.path === 'support_modal') {
              return (
                <button 
                  key={idx}
                  onClick={() => setSupportOpen(true)}
                  className="text-sm font-medium bg-transparent border-0 p-0 transition-opacity duration-200 hover:opacity-70 opacity-80"
                  style={{ cursor: 'pointer', color: '#192837' }}
                >
                  {link.name}
                </button>
              );
            }
            return (
              <Link 
                key={idx} 
                to={link.path} 
                className="text-sm text-decoration-none transition-all duration-200 hover:opacity-70"
                style={{ 
                  color: location.pathname === link.path ? '#7342E2' : '#192837',
                  borderBottom: location.pathname === link.path ? '2px solid #7342E2' : 'none',
                  paddingBottom: '4px',
                  fontWeight: location.pathname === link.path ? '700' : '500',
                  opacity: location.pathname === link.path ? 1 : 0.8
                }}
              >
                {link.name}
              </Link>
            );
          })}
        </div>

        {/* Right: Desktop CTA or User Info */}
        <div className="hidden md:flex items-center gap-4">
          {hasToken ? (
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-end text-end">
                <span className="font-semibold text-xs text-[#192837]">{userEmail}</span>
                <span className={`badge-custom ${isAdmin ? 'badge-admin' : 'badge-user'}`} style={{ fontSize: '0.65rem' }}>
                  {isAdmin ? 'Admin' : 'Cashier'}
                </span>
              </div>
              <button 
                onClick={handleLogout}
                className="btn btn-glow-danger py-1.5 px-4 text-xs font-semibold flex items-center gap-1.5"
                style={{ borderRadius: '50px' }}
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button 
                onClick={() => navigate('/login')}
                className="px-5 py-2.5 font-medium text-sm text-[#192837] hover:opacity-90"
                style={{ background: '#F2F2EE', borderRadius: '50px', border: 'none', cursor: 'pointer' }}
              >
                Sign In
              </button>
              <button 
                onClick={() => navigate('/register')}
                className="px-5 py-2.5 text-sm font-semibold text-white transition-all hover:opacity-90 flex items-center justify-center"
                style={{ background: '#7342E2', borderRadius: '50px', border: 'none', cursor: 'pointer', boxShadow: '0 4px 15px rgba(115, 66, 226, 0.25)' }}
              >
                Start For Free
              </button>
            </div>
          )}
        </div>

        {/* Mobile Menu Icon */}
        <button 
          onClick={() => setIsOpen(true)}
          className="md:hidden text-[#192837] bg-transparent border-0 cursor-pointer p-1"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Drawer backdrop overlay */}
      <AnimatePresence>
        {isOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
              className="fixed inset-0 bg-[#192837]/30 backdrop-blur-sm z-20"
            />

            {/* Mobile Nav Drawer */}
            <motion.div 
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ ease: [0.22, 1, 0.36, 1], duration: 0.45 }}
              className="fixed right-0 top-0 h-[100dvh] z-30 flex flex-col p-6 text-left"
              style={{ 
                width: 'min(88vw, 360px)', 
                background: '#CFC8C5', 
                boxShadow: '-12px 0 48px rgba(25,40,55,0.18)' 
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <LogoSvg fill="#192837" />
                  <span className="text-[#192837] font-bold text-lg" style={{ fontFamily: 'var(--font-heading)' }}>
                    Apex POS
                  </span>
                </div>
                <button 
                  onClick={() => setIsOpen(false)} 
                  className="text-[#192837] bg-transparent border-0 cursor-pointer"
                >
                  <X size={24} />
                </button>
              </div>

              <div className="w-full h-[1px] bg-slate-500/20 mb-6" />

              {/* Links - Staggered */}
              <div className="flex flex-col gap-4 mb-auto">
                {currentLinks.map((link, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.18 + idx * 0.07, duration: 0.4 }}
                  >
                    {link.path === 'support_modal' ? (
                      <button 
                        onClick={() => { setSupportOpen(true); setIsOpen(false); }}
                        className="text-lg font-semibold bg-transparent border-0 p-0 text-decoration-none"
                        style={{ cursor: 'pointer', color: '#192837' }}
                      >
                        {link.name}
                      </button>
                    ) : (
                      <Link 
                        to={link.path}
                        onClick={() => setIsOpen(false)}
                        className="text-lg font-semibold text-decoration-none transition-all"
                        style={{ 
                          color: location.pathname === link.path ? '#7342E2' : '#192837'
                        }}
                      >
                        {link.name}
                      </Link>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* CTA Buttons in Drawer */}
              <div className="w-full mt-6">
                {hasToken ? (
                  <div className="flex flex-col gap-3">
                    <div className="flex items-center justify-between border-t border-slate-500/10 pt-4">
                      <span className="font-semibold text-xs text-[#192837] text-truncate">{userEmail}</span>
                      <span className={`badge-custom ${isAdmin ? 'badge-admin' : 'badge-user'}`}>
                        {isAdmin ? 'Admin' : 'Cashier'}
                      </span>
                    </div>
                    <button 
                      onClick={handleLogout}
                      className="w-full btn btn-danger py-3 flex items-center justify-center gap-2"
                      style={{ borderRadius: '50px' }}
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="flex flex-col gap-3">
                    <button 
                      onClick={() => { navigate('/login'); setIsOpen(false); }}
                      className="w-full py-3 font-medium text-[#192837]"
                      style={{ background: '#F2F2EE', borderRadius: '50px', border: 'none', cursor: 'pointer' }}
                    >
                      Sign In
                    </button>
                    <button 
                      onClick={() => { navigate('/register'); setIsOpen(false); }}
                      className="w-full py-3 font-medium text-white"
                      style={{ background: '#7342E2', borderRadius: '50px', border: 'none', cursor: 'pointer' }}
                    >
                      Start For Free
                    </button>
                  </div>
                )}
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Support Info Modal Overlay */}
      {supportOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(25, 40, 55, 0.45)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1050 }}>
          <div 
            className="col-11 col-md-5 col-lg-3.5 text-[#192837] p-5 shadow-2xl relative"
            style={{ backgroundColor: '#ffffff', color: '#192837', borderRadius: '24px', zIndex: 1060, padding: '40px', maxWidth: '440px', border: 'none' }}
          >
            {/* Close modal button top right */}
            <button 
              onClick={() => setSupportOpen(false)} 
              className="absolute top-4 right-4 bg-transparent border-0 cursor-pointer text-[#192837] hover:text-[#7342E2] transition-colors"
            >
              <X size={20} />
            </button>

            <div className="text-center">
              <div className="p-3 rounded-full flex items-center justify-center text-white mx-auto mb-4" style={{ background: '#7342E2', width: '56px', height: '56px' }}>
                <ShieldAlert size={28} />
              </div>
              <h4 className="text-[#192837] font-bold mb-2" style={{ fontFamily: 'var(--font-heading)', fontSize: '1.25rem' }}>System Support</h4>
              <p className="text-slate-500 font-medium small mb-4">Apex POS System Administration Contacts</p>
              
              <div className="w-full h-[1px] bg-slate-200 mb-4" />

              <div className="text-start flex flex-col gap-3 mb-4">
                <div>
                  <small className="text-slate-400 font-bold uppercase tracking-wider block" style={{ fontSize: '0.65rem' }}>System Owner</small>
                  <span className="font-bold text-[#192837]" style={{ fontSize: '0.95rem' }}>Akash Singh</span>
                </div>
                <div>
                  <small className="text-slate-400 font-bold uppercase tracking-wider block" style={{ fontSize: '0.65rem' }}>Support Email</small>
                  <span className="font-semibold text-[#7342E2]" style={{ fontSize: '0.9rem' }}>singh0810.akash@gmail.com</span>
                </div>
                <div>
                  <small className="text-slate-400 font-bold uppercase tracking-wider block" style={{ fontSize: '0.65rem' }}>Helpdesk</small>
                  <span className="text-slate-500 font-semibold small block leading-relaxed" style={{ fontSize: '0.75rem' }}>
                    Contact the system owner for account registrations, catalog inventory issues, or platform customization assistance.
                  </span>
                </div>
              </div>

              <button 
                className="w-full py-2.5 text-white font-semibold mt-2"
                onClick={() => setSupportOpen(false)}
                style={{ borderRadius: '50px', background: '#7342E2', border: 'none', cursor: 'pointer' }}
              >
                Close Support
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Menubar;