import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield, Award, BookOpen, Key, Users } from 'lucide-react';

const About = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <div className="container-fluid p-4 text-[#192837] relative flex flex-col items-center justify-center" style={{ minHeight: 'calc(100vh - 4.5rem)' }}>
      {/* Background Video */}
      <div className="bg-video-container">
        <video autoPlay muted loop playsInline>
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260518_003132_8b7edcb6-c64d-4a52-a9ca-879942e122ad.mp4" type="video/mp4" />
        </video>
        <div className="bg-video-overlay" style={{ backgroundColor: 'rgba(242, 242, 238, 0.78)' }}></div>
      </div>

      <motion.div 
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="card glass-card col-12 col-lg-9 p-4 p-md-5 border-0 text-start shadow-xl"
        style={{ borderRadius: '24px' }}
      >
        {/* Title */}
        <motion.div variants={itemVariants} className="mb-4 text-center">
          <span className="badge-custom badge-admin mb-2 inline-block px-3 py-1 font-bold text-xs uppercase tracking-wider" style={{ background: '#7342E2', color: 'white', borderRadius: '50px' }}>
            System Walkthrough
          </span>
          <h2 className="text-[#192837] font-bold" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
            How to Use Apex POS
          </h2>
          <p className="text-slate-500 font-medium max-w-xl mx-auto mt-2">
            Follow this guide to explore role-based permissions, cashier billing operations, and multi-tenant scaling.
          </p>
        </motion.div>

        <hr className="border-slate-500/10 my-4" />

        {/* GUIDED DEMO SANDBOX */}
        <motion.div variants={itemVariants} className="mb-5 bg-[#ffffff]/60 p-4 md:p-5 rounded-3xl border border-slate-500/10 shadow-sm">
          <h4 className="text-[#7342E2] font-bold mb-3 flex items-center gap-2" style={{ fontSize: '1.2rem' }}>
            <Key size={20} /> 🔑 Interactive Testing Accounts
          </h4>
          <p className="text-slate-600 font-semibold small mb-4 leading-relaxed">
            The platform supports secure role-based dashboard filtering. Copy the credentials below to log in and test both employee scopes:
          </p>

          <div className="row g-4 mb-4">
            {/* Admin Credentials */}
            <div className="col-12 col-md-6">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col gap-2">
                <span className="badge-custom badge-admin self-start text-xs font-bold px-2.5 py-0.5" style={{ borderRadius: '50px' }}>Administrator Role</span>
                <div className="mt-2 text-xs font-semibold text-slate-500 flex flex-col gap-1">
                  <div><strong className="text-[#192837]">Login Email:</strong> <code className="text-[#7342E2] bg-slate-100 px-1 py-0.5 rounded">singh0810.akash@gmail.com</code></div>
                  <div><strong className="text-[#192837]">Password:</strong> <code className="text-[#7342E2] bg-slate-100 px-1 py-0.5 rounded">password</code></div>
                </div>
                <div className="text-slate-500 small font-medium mt-2 leading-normal">
                  🔓 **Access Rights:** Full Inventory Catalog CRUD, Category settings, Cloudinary image upload forms, and registering/deleting cashier accounts.
                </div>
              </div>
            </div>

            {/* Cashier Credentials */}
            <div className="col-12 col-md-6">
              <div className="p-4 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col gap-2">
                <span className="badge-custom badge-user self-start text-xs font-bold px-2.5 py-0.5" style={{ borderRadius: '50px' }}>Cashier (USER) Role</span>
                <div className="mt-2 text-xs font-semibold text-slate-500 flex flex-col gap-1">
                  <div><strong className="text-[#192837]">Login Email:</strong> <code className="text-[#7342E2] bg-slate-100 px-1 py-0.5 rounded">ayush@gmail.com</code></div>
                  <div><strong className="text-[#192837]">Password:</strong> <code className="text-[#7342E2] bg-slate-100 px-1 py-0.5 rounded">password123</code></div>
                </div>
                <div className="text-slate-500 small font-medium mt-2 leading-normal">
                  🔒 **Access Rights:** Checkout billing terminal registers, discount & tax calculations, and receipt log logs. All catalog creation & deletion actions are automatically hidden.
                </div>
              </div>
            </div>
          </div>

          <h5 className="font-bold text-[#192837] mb-2" style={{ fontSize: '0.95rem' }}>🚶‍♂️ Recommended Testing Sequence:</h5>
          <ol className="text-slate-600 font-semibold small leading-relaxed flex flex-col gap-1.5 pl-4">
            <li>Log in as the **Administrator** to check existing categories and verify that you can register new products with active images.</li>
            <li>Log out and sign in as the **Cashier** to access the POS Checkout terminal and process a billing transaction.</li>
            <li>Select items, insert custom client info, apply a checkout discount, checkout, and review the solid opaque thermal receipt overlay.</li>
          </ol>
        </motion.div>

        {/* Multi-Tenant Readiness */}
        <motion.div variants={itemVariants} className="mb-4">
          <h4 className="text-[#192837] font-bold mb-3 flex items-center gap-2" style={{ fontSize: '1.25rem' }}>
            <Users className="text-[#7342E2]" size={20} /> Multi-Tenant System Architecture
          </h4>
          <p className="text-slate-500 font-semibold leading-relaxed mb-3" style={{ fontSize: '0.9rem' }}>
            Apex POS is structured with a decoupled modular client-server pattern. While this sandbox environment is configured in <strong>Single-Store Mode</strong> (where all registered users share the same store inventory database), the schema is fully designed for multi-tenant scalability:
          </p>
          <div className="p-4 rounded-2xl bg-[#7342E2]/5 border border-[#7342E2]/10 flex flex-col gap-2">
            <h6 className="font-bold text-[#7342E2] mb-1">How it scales for multiple store owners (Multi-Store):</h6>
            <p className="text-slate-500 small font-semibold mb-0 leading-relaxed">
              When scaling to multi-tenancy, a <code>store_id</code> context is assigned to each registered store owner. The backend REST APIs filter all catalog queries, transaction records, and cashier user lists by this token. This ensures Owner A's registers are completely isolated from Owner B's catalog, while running on the same distributed cloud database.
            </p>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default About;
