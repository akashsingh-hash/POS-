import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { fetchOrders } from '../../service/OrderService';
import toast from 'react-hot-toast';
import { DollarSign, ShoppingBag, Folder, Tag, RefreshCw, Eye, X, Receipt } from 'lucide-react';

const MetricSkeletonCard = () => (
  <div className="card glass-card p-4 border-0 text-start">
    <div className="d-flex align-items-center justify-content-between mb-2">
      <div className="skeleton" style={{ width: '80px', height: '14px' }}></div>
      <div className="skeleton rounded-full" style={{ width: '42px', height: '42px' }}></div>
    </div>
    <div className="skeleton mb-2" style={{ width: '130px', height: '28px' }}></div>
    <div className="skeleton" style={{ width: '90px', height: '12px' }}></div>
  </div>
);

const TableSkeletonRow = () => (
  <tr className="border-slate-500/10">
    <td><div className="skeleton" style={{ width: '70px', height: '14px' }}></div></td>
    <td><div className="skeleton" style={{ width: '120px', height: '14px' }}></div></td>
    <td><div className="skeleton" style={{ width: '90px', height: '14px' }}></div></td>
    <td><div className="skeleton" style={{ width: '130px', height: '14px' }}></div></td>
    <td className="text-center"><div className="skeleton mx-auto" style={{ width: '30px', height: '14px' }}></div></td>
    <td className="text-end"><div className="skeleton ms-auto" style={{ width: '80px', height: '14px' }}></div></td>
    <td className="text-center"><div className="skeleton rounded-full mx-auto" style={{ width: '75px', height: '26px' }}></div></td>
  </tr>
);

const Dashboard = () => {
  const { categories, itemsData, loading: contextLoading } = useContext(AppContext);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null); // For receipt popup details

  const loadOrders = async () => {
    setLoading(true);
    try {
      const response = await fetchOrders();
      setOrders(response.data || []);
    } catch (error) {
      console.error("Failed to load orders:", error);
      toast.error("Failed to load transactions history");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  // Compute analytics
  const totalRevenue = orders.reduce((sum, order) => sum + order.total, 0);
  const totalSalesCount = orders.length;
  const categoriesCount = categories.length;
  const productsCount = itemsData.length;

  const isDataLoading = loading || contextLoading;

  return (
    <div className="container-fluid p-4 text-[#192837] relative" style={{ minHeight: 'calc(100vh - 4.5rem)' }}>
      {/* Background Video */}
      <div className="bg-video-container">
        <video autoPlay muted loop playsInline>
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260518_003132_8b7edcb6-c64d-4a52-a9ca-879942e122ad.mp4" type="video/mp4" />
        </video>
        <div className="bg-video-overlay" style={{ backgroundColor: 'rgba(242, 242, 238, 0.75)' }}></div>
      </div>

      {/* Page Title */}
      <div className="mb-4 text-start">
        <h2 className="text-[#192837] font-bold" style={{ fontFamily: 'var(--font-heading)', fontSize: 'clamp(1.5rem, 4vw, 2.25rem)' }}>
          Executive Dashboard
        </h2>
        <p className="text-[#5a6e7f] small font-medium">Real-time point of sale analytics and transactions</p>
      </div>

      {/* Analytics Cards Row */}
      <div className="row g-3 mb-4 text-start">
        {/* Total Revenue */}
        <div className="col-12 col-sm-6 col-lg-3">
          {isDataLoading ? (
            <MetricSkeletonCard />
          ) : (
            <div className="card glass-card p-4 border-0">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-[#5a6e7f] text-xs font-bold tracking-wider uppercase" style={{ fontFamily: 'var(--font-body)' }}>Total Revenue</span>
                <div className="p-2.5 rounded-full flex items-center justify-center text-white" style={{ background: '#7342E2', width: '42px', height: '42px' }}>
                  <DollarSign size={20} />
                </div>
              </div>
              <h3 className="text-[#192837] fw-bold mb-1" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', fontFamily: 'var(--font-heading)' }}>₹{totalRevenue.toFixed(2)}</h3>
              <span className="text-success small font-semibold flex items-center gap-1">
                <span className="inline-block w-2 h-2 rounded-full bg-emerald-500 animate-ping"></span>
                Live Sales
              </span>
            </div>
          )}
        </div>

        {/* Total Orders */}
        <div className="col-12 col-sm-6 col-lg-3">
          {isDataLoading ? (
            <MetricSkeletonCard />
          ) : (
            <div className="card glass-card p-4 border-0">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-[#5a6e7f] text-xs font-bold tracking-wider uppercase">Sales Count</span>
                <div className="p-2.5 rounded-full flex items-center justify-center text-white" style={{ background: '#7342E2', width: '42px', height: '42px' }}>
                  <ShoppingBag size={20} />
                </div>
              </div>
              <h3 className="text-[#192837] fw-bold mb-1" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', fontFamily: 'var(--font-heading)' }}>{totalSalesCount}</h3>
              <span className="text-[#7342E2] small font-semibold">Completed checkouts</span>
            </div>
          )}
        </div>

        {/* Categories Count */}
        <div className="col-12 col-sm-6 col-lg-3">
          {isDataLoading ? (
            <MetricSkeletonCard />
          ) : (
            <div className="card glass-card p-4 border-0">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-[#5a6e7f] text-xs font-bold tracking-wider uppercase">Active Categories</span>
                <div className="p-2.5 rounded-full flex items-center justify-center text-white" style={{ background: '#7342E2', width: '42px', height: '42px' }}>
                  <Folder size={20} />
                </div>
              </div>
              <h3 className="text-[#192837] fw-bold mb-1" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', fontFamily: 'var(--font-heading)' }}>{categoriesCount}</h3>
              <span className="text-[#7342E2] small font-semibold">Product Groups</span>
            </div>
          )}
        </div>

        {/* Products Count */}
        <div className="col-12 col-sm-6 col-lg-3">
          {isDataLoading ? (
            <MetricSkeletonCard />
          ) : (
            <div className="card glass-card p-4 border-0">
              <div className="d-flex align-items-center justify-content-between mb-2">
                <span className="text-[#5a6e7f] text-xs font-bold tracking-wider uppercase">Active Products</span>
                <div className="p-2.5 rounded-full flex items-center justify-center text-white" style={{ background: '#7342E2', width: '42px', height: '42px' }}>
                  <Tag size={20} />
                </div>
              </div>
              <h3 className="text-[#192837] fw-bold mb-1" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.1rem)', fontFamily: 'var(--font-heading)' }}>{productsCount}</h3>
              <span className="text-[#7342E2] small font-semibold">Items in Stock</span>
            </div>
          )}
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="card glass-card p-4 border-0 mb-4 text-start">
        <div className="d-flex align-items-center justify-content-between mb-4">
          <h4 className="text-[#192837] mb-0 font-bold" style={{ fontSize: '1.25rem' }}>Recent Transactions</h4>
          <button 
            className="btn btn-glow flex items-center gap-2" 
            onClick={loadOrders}
            disabled={loading}
            style={{ borderRadius: '50px', fontSize: '0.85rem', padding: '8px 16px' }}
          >
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} /> Refresh History
          </button>
        </div>

        <div className="table-responsive">
          <table className="table align-middle mb-0" style={{ background: 'transparent' }}>
            <thead>
              <tr className="border-slate-500/10 text-[#5a6e7f]" style={{ fontSize: '0.85rem' }}>
                <th scope="col">Order ID</th>
                <th scope="col">Customer Name</th>
                <th scope="col">Mobile</th>
                <th scope="col">Date & Time</th>
                <th scope="col" className="text-center">Items Qty</th>
                <th scope="col" className="text-end">Total Amount</th>
                <th scope="col" className="text-center">Action</th>
              </tr>
            </thead>
            <tbody>
              {isDataLoading ? (
                <>
                  <TableSkeletonRow />
                  <TableSkeletonRow />
                  <TableSkeletonRow />
                  <TableSkeletonRow />
                  <TableSkeletonRow />
                </>
              ) : orders.length === 0 ? (
                <tr>
                  <td colSpan="7" className="text-center py-5 text-slate-500">
                    <ShoppingBag size={48} className="mb-2 text-[#7342E2] opacity-40 mx-auto" />
                    <p className="mb-0 font-medium">No checkout transactions found. Place orders in POS Terminal!</p>
                  </td>
                </tr>
              ) : (
                orders.slice().reverse().map((order) => {
                  const date = new Date(order.createdAt).toLocaleString();
                  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
                  
                  return (
                    <tr key={order.orderId} className="border-slate-500/10 hover:bg-[#7342E2]/5 transition-colors duration-200">
                      <td className="font-mono text-[#7342E2] font-semibold">#{order.orderId.substring(0, 8)}</td>
                      <td className="fw-semibold text-[#192837]">{order.customerName}</td>
                      <td className="text-[#5a6e7f]">{order.customerPhone || 'N/A'}</td>
                      <td className="text-[#5a6e7f]">{date}</td>
                      <td className="text-center text-[#192837]">{totalItems}</td>
                      <td className="text-end fw-bold text-[#7342E2]">₹{order.total.toFixed(2)}</td>
                      <td className="text-center">
                        <button 
                          className="btn btn-outline-warning btn-sm flex items-center gap-1.5 mx-auto"
                          style={{ borderRadius: '50px', fontSize: '0.75rem', padding: '6px 12px' }}
                          onClick={() => setSelectedOrder(order)}
                        >
                          <Eye size={12} /> Details
                        </button>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Receipt Details Modal Overlay */}
      {selectedOrder && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(25, 40, 55, 0.45)', backdropFilter: 'blur(6px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1050 }}>
          <div 
            className="col-11 col-md-6 col-lg-4 text-[#192837] p-4 shadow-2xl relative max-h-[90vh] overflow-y-auto"
            style={{ backgroundColor: '#ffffff', color: '#192837', borderRadius: '24px', zIndex: 1060, border: 'none' }}
          >
            
            {/* Close modal button top right */}
            <button 
              onClick={() => setSelectedOrder(null)} 
              className="absolute top-4 right-4 bg-transparent border-0 cursor-pointer text-[#192837] hover:text-[#7342E2] transition-colors"
            >
              <X size={20} />
            </button>

            <div className="card-body p-0 text-start">
              <div className="text-center border-bottom border-dashed border-slate-300 pb-3 mb-4">
                <Receipt className="mx-auto text-[#7342E2] mb-1" size={32} />
                <h5 className="text-[#192837] font-bold mb-1" style={{ fontFamily: 'var(--font-heading)' }}>Apex POS System</h5>
                <small className="text-[#5a6e7f] font-semibold tracking-wider">TAX INVOICE / RECEIPT</small>
                <div className="font-mono text-[#7342E2] font-semibold mt-2" style={{ fontSize: '0.85rem' }}>Order #{selectedOrder.orderId}</div>
              </div>

              {/* Invoice Metadata */}
              <div className="row g-2 mb-4 small text-[#5a6e7f] font-medium">
                <div className="col-6"><strong>Customer:</strong> {selectedOrder.customerName}</div>
                <div className="col-6 text-end"><strong>Phone:</strong> {selectedOrder.customerPhone || 'N/A'}</div>
                <div className="col-12 mt-1"><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</div>
              </div>

              {/* Items List */}
              <div className="border-bottom border-dashed border-slate-300 pb-3 mb-4">
                <div className="row g-2 font-bold border-bottom border-dashed border-slate-300 pb-2 mb-2 small text-[#192837]">
                  <div className="col-6">Item Name</div>
                  <div className="col-2 text-center">Qty</div>
                  <div className="col-4 text-end">Total</div>
                </div>
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="row g-2 small text-[#5a6e7f] py-1">
                    <div className="col-6 text-[#192837] text-truncate font-medium">{item.name}</div>
                    <div className="col-2 text-center">{item.quantity}</div>
                    <div className="col-4 text-end font-semibold">₹{(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              {/* Totals Summary */}
              <div className="small border-bottom border-dashed border-slate-300 pb-3 mb-4">
                <div className="d-flex justify-content-between text-[#5a6e7f] mb-1.5 font-medium">
                  <span>Subtotal:</span>
                  <span className="font-semibold">₹{selectedOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between text-[#5a6e7f] mb-1.5 font-medium">
                  <span>Tax (GST 18%):</span>
                  <span className="font-semibold">₹{selectedOrder.tax.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between text-[#5a6e7f] mb-2 font-medium">
                  <span>Discount:</span>
                  <span className="font-semibold text-danger">-₹{selectedOrder.discount.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between text-[#192837] font-bold border-top border-dashed border-slate-300 pt-2.5" style={{ fontSize: '1.05rem' }}>
                  <span>Grand Total:</span>
                  <span className="text-[#7342E2]">₹{selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Modal Control */}
              <button 
                className="btn btn-glow w-full py-2.5 text-white font-semibold"
                onClick={() => setSelectedOrder(null)}
                style={{ borderRadius: '50px' }}
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
