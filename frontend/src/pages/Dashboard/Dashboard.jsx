import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { fetchOrders } from '../../service/OrderService';
import toast from 'react-hot-toast';

const Dashboard = () => {
  const { categories, itemsData } = useContext(AppContext);
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

  return (
    <div className="container-fluid p-4 text-light" style={{ minHeight: 'calc(100vh - 4.5rem)' }}>
      {/* Page Title */}
      <div className="mb-4">
        <h2 className="text-gradient">Executive Dashboard</h2>
        <p className="text-muted">Real-time point of sale analytics and transactions</p>
      </div>

      {/* Analytics Cards Row */}
      <div className="row g-3 mb-4">
        {/* Total Revenue */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card glass-card p-3 text-start border-0">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted small fw-semibold uppercase">Total Revenue</span>
              <div className="p-2 bg-success bg-opacity-20 rounded-circle text-success" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="bi bi-currency-rupee" style={{ fontSize: '1.2rem' }}></i>
              </div>
            </div>
            <h3 className="text-white fw-bold mb-0">₹{totalRevenue.toFixed(2)}</h3>
            <span className="text-success small mt-1"><i className="bi bi-arrow-up-right me-1"></i>Live Sales</span>
          </div>
        </div>

        {/* Total Orders */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card glass-card p-3 text-start border-0">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted small fw-semibold uppercase">Sales Count</span>
              <div className="p-2 bg-primary bg-opacity-20 rounded-circle text-primary" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="bi bi-cart-check" style={{ fontSize: '1.2rem' }}></i>
              </div>
            </div>
            <h3 className="text-white fw-bold mb-0">{totalSalesCount}</h3>
            <span className="text-primary small mt-1"><i className="bi bi-receipt me-1"></i>Completed checkouts</span>
          </div>
        </div>

        {/* Categories Count */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card glass-card p-3 text-start border-0">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted small fw-semibold uppercase">Active Categories</span>
              <div className="p-2 bg-warning bg-opacity-20 rounded-circle text-warning" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="bi bi-grid" style={{ fontSize: '1.2rem' }}></i>
              </div>
            </div>
            <h3 className="text-white fw-bold mb-0">{categoriesCount}</h3>
            <span className="text-warning small mt-1"><i className="bi bi-folder me-1"></i>Product Groups</span>
          </div>
        </div>

        {/* Products Count */}
        <div className="col-12 col-sm-6 col-lg-3">
          <div className="card glass-card p-3 text-start border-0">
            <div className="d-flex align-items-center justify-content-between mb-2">
              <span className="text-muted small fw-semibold uppercase">Active Products</span>
              <div className="p-2 bg-info bg-opacity-20 rounded-circle text-info" style={{ width: '40px', height: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <i className="bi bi-box-seam" style={{ fontSize: '1.2rem' }}></i>
              </div>
            </div>
            <h3 className="text-white fw-bold mb-0">{productsCount}</h3>
            <span className="text-info small mt-1"><i className="bi bi-tag me-1"></i>Items In Stock</span>
          </div>
        </div>
      </div>

      {/* Recent Transactions Table */}
      <div className="card glass-card p-4 border-0 mb-4">
        <div className="d-flex align-items-center justify-content-between mb-3">
          <h4 className="text-white mb-0 fw-semibold">Recent Transactions</h4>
          <button className="btn btn-glow btn-sm" onClick={loadOrders}>
            <i className="bi bi-arrow-clockwise me-1"></i> Refresh History
          </button>
        </div>

        {loading ? (
          <div className="text-center py-5 text-muted">
            <div className="spinner-border spinner-border-sm text-warning me-2" role="status"></div>
            <span>Fetching sales records...</span>
          </div>
        ) : orders.length === 0 ? (
          <div className="text-center py-5 text-muted">
            <i className="bi bi-inbox" style={{ fontSize: '2.5rem' }}></i>
            <p className="mt-2 mb-0">No checkout transactions found. Go to the POS Terminal to place an order!</p>
          </div>
        ) : (
          <div className="table-responsive">
            <table className="table table-dark table-hover align-middle mb-0" style={{ background: 'transparent' }}>
              <thead>
                <tr className="border-secondary text-muted" style={{ fontSize: '0.85rem' }}>
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
                {orders.slice().reverse().map((order) => {
                  const date = new Date(order.createdAt).toLocaleString();
                  const totalItems = order.items.reduce((sum, item) => sum + item.quantity, 0);
                  
                  return (
                    <tr key={order.orderId} className="border-secondary">
                      <td className="fw-mono text-warning">#{order.orderId.substring(0, 8)}</td>
                      <td className="fw-semibold text-white">{order.customerName}</td>
                      <td>{order.customerPhone || 'N/A'}</td>
                      <td className="text-muted">{date}</td>
                      <td className="text-center">{totalItems}</td>
                      <td className="text-end fw-bold text-success">₹{order.total.toFixed(2)}</td>
                      <td className="text-center">
                        <button 
                          className="btn btn-outline-warning btn-sm"
                          style={{ borderRadius: '6px' }}
                          onClick={() => setSelectedOrder(order)}
                        >
                          <i className="bi bi-eye"></i> Details
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Receipt Details Modal Overlay */}
      {selectedOrder && (
        <div className="modal-backdrop show" style={{ background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyItems: 'center', justifyContent: 'center' }}>
          <div className="card glass-card col-11 col-md-6 col-lg-4 text-light p-3 border-0 shadow-lg">
            <div className="card-body">
              <div className="text-center border-bottom border-secondary pb-3 mb-3">
                <h5 className="text-gradient fw-bold mb-1">Apex POS System</h5>
                <small className="text-muted">TAX INVOICE / RECEIPT</small>
                <div className="fw-mono text-warning mt-2" style={{ fontSize: '0.85rem' }}>Order #{selectedOrder.orderId}</div>
              </div>

              {/* Invoice Metadata */}
              <div className="row g-2 mb-3 small text-muted">
                <div className="col-6"><strong>Customer:</strong> {selectedOrder.customerName}</div>
                <div className="col-6 text-end"><strong>Phone:</strong> {selectedOrder.customerPhone || 'N/A'}</div>
                <div className="col-12"><strong>Date:</strong> {new Date(selectedOrder.createdAt).toLocaleString()}</div>
              </div>

              {/* Items List */}
              <div className="border-bottom border-secondary pb-2 mb-3">
                <div className="row g-2 fw-semibold border-bottom border-secondary pb-1 mb-1 small text-white">
                  <div className="col-6">Item Name</div>
                  <div className="col-2 text-center">Qty</div>
                  <div className="col-4 text-end">Total</div>
                </div>
                {selectedOrder.items.map((item, idx) => (
                  <div key={idx} className="row g-2 small text-muted py-0.5">
                    <div className="col-6 text-white text-truncate">{item.name}</div>
                    <div className="col-2 text-center">{item.quantity}</div>
                    <div className="col-4 text-end">₹{(item.price * item.quantity).toFixed(2)}</div>
                  </div>
                ))}
              </div>

              {/* Totals Summary */}
              <div className="small border-bottom border-secondary pb-2 mb-3">
                <div className="d-flex justify-content-between text-muted mb-1">
                  <span>Subtotal:</span>
                  <span>₹{selectedOrder.subtotal.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between text-muted mb-1">
                  <span>Tax (GST 18%):</span>
                  <span>₹{selectedOrder.tax.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between text-muted mb-1">
                  <span>Discount:</span>
                  <span>-₹{selectedOrder.discount.toFixed(2)}</span>
                </div>
                <div className="d-flex justify-content-between text-white fw-bold pt-1" style={{ fontSize: '1rem' }}>
                  <span>Grand Total:</span>
                  <span className="text-warning">₹{selectedOrder.total.toFixed(2)}</span>
                </div>
              </div>

              {/* Modal Control */}
              <button 
                className="btn btn-glow w-100 py-2"
                onClick={() => setSelectedOrder(null)}
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
