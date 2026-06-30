import React from 'react';
import { motion } from 'framer-motion';
import { Terminal, Shield, Award, Sparkles, Cloud, BarChart3, Layers, ShoppingBag } from 'lucide-react';

const Features = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };

  const featuresList = [
    {
      icon: <Terminal size={26} />,
      title: "POS Checkout Terminal",
      description: "A lightning-fast billing terminal. Easily browse items by categories, manage cart quantities, calculate GST (18%) and apply custom discounts dynamically."
    },
    {
      icon: <Shield size={26} />,
      title: "Role-Based Security Guards",
      description: "Secured with Spring Security & JWT tokens. The cashier role restricts view to transaction billing, while admins enjoy full control over resources."
    },
    {
      icon: <BarChart3 size={26} />,
      title: "Real-Time Sales Insight",
      description: "An intuitive management dashboard that tallies total revenue, active orders, product volume metrics, and lists all order invoices."
    },
    {
      icon: <Cloud size={26} />,
      title: "Cloud CDN Synchronization",
      description: "Direct image uploads to Cloudinary CDN for product and category thumbnails, avoiding physical local server storage limits."
    },
    {
      icon: <Layers size={26} />,
      title: "Decoupled Scalability",
      description: "Separated frontend single-page application and backend REST API gateway, making the architecture highly modular and performant."
    },
    {
      icon: <ShoppingBag size={26} />,
      title: "Inventory & Category CRUD",
      description: "Comprehensive product inventory lists and category management panels integrated with image uploads and category listings."
    }
  ];

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
        <motion.div variants={itemVariants} className="mb-5 text-center">
          <span className="badge-custom badge-admin mb-2 inline-block px-3 py-1 font-bold text-xs uppercase tracking-wider" style={{ background: '#7342E2', color: 'white', borderRadius: '50px' }}>
            Core Capabilities
          </span>
          <h2 className="text-[#192837] font-bold" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.8rem, 4vw, 2.5rem)' }}>
            System Platform Features
          </h2>
          <p className="text-slate-500 font-medium max-w-xl mx-auto mt-2 text-center">
            Apex POS delivers retail inventory operations and cashier terminal checkouts under a unified responsive theme.
          </p>
        </motion.div>

        <hr className="border-slate-500/10 my-4" />

        {/* Features Grid */}
        <motion.div variants={itemVariants} className="row g-4 mt-2">
          {featuresList.map((feat, index) => (
            <div key={index} className="col-12 col-md-6">
              <div className="p-4 rounded-3xl bg-[#ffffff]/60 border border-slate-500/10 shadow-sm flex gap-4 h-full">
                <div className="p-3 rounded-2xl flex items-center justify-center shrink-0" style={{ background: 'rgba(115, 66, 226, 0.08)', color: '#7342E2', width: '52px', height: '52px' }}>
                  {feat.icon}
                </div>
                <div className="flex flex-col justify-start">
                  <h5 className="font-bold text-[#192837] mb-1.5" style={{ fontSize: '1.05rem' }}>{feat.title}</h5>
                  <p className="text-slate-500 small font-semibold mb-0 leading-relaxed">
                    {feat.description}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Features;
