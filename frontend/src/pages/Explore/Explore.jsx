import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { createOrder } from '../../service/OrderService';
import toast from 'react-hot-toast';
import './Explore.css';

const Explore = () => {
  const { categories, itemsData } = useContext(AppContext);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState(""); // "" means show all
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [discount, setDiscount] = useState("");
  const [loading, setLoading] = useState(false);

  // Filter items based on selected category
  const filteredItems = activeCategory
    ? itemsData.filter(item => item.categoryId === activeCategory)
    : itemsData;

  // Add item to cart
  const addToCart = (item) => {
    setCart(prevCart => {
      const existing = prevCart.find(cartItem => cartItem.itemId === item.itemId);
      if (existing) {
        return prevCart.map(cartItem =>
          cartItem.itemId === item.itemId
            ? { ...cartItem, quantity: cartItem.quantity + 1 }
            : cartItem
        );
      }
      return [...prevCart, { ...item, quantity: 1 }];
    });
  };

  // Update item quantity in cart
  const updateQuantity = (itemId, amount) => {
    setCart(prevCart =>
      prevCart
        .map(cartItem =>
          cartItem.itemId === itemId
            ? { ...cartItem, quantity: cartItem.quantity + amount }
            : cartItem
        )
        .filter(cartItem => cartItem.quantity > 0)
    );
  };

  // Remove item from cart completely
  const removeFromCart = (itemId) => {
    setCart(prevCart => prevCart.filter(cartItem => cartItem.itemId !== itemId));
  };

  // Calculations
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.18; // 18% GST
  const discountAmt = parseFloat(discount) || 0;
  const total = Math.max(0, subtotal + tax - discountAmt);

  // Checkout submit handler
  const handleCheckout = async (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      toast.error("Cart is empty");
      return;
    }
    if (!customerName) {
      toast.error("Please enter customer name");
      return;
    }

    setLoading(true);
    const orderData = {
      customerName,
      customerPhone,
      discount: discountAmt,
      items: cart.map(item => ({
        itemId: item.itemId,
        quantity: item.quantity
      }))
    };

    try {
      const response = await createOrder(orderData);
      if (response.status === 201) {
        toast.success(`Checkout Complete! Order ID: ${response.data.orderId.substring(0, 8)}...`);
        // Reset states
        setCart([]);
        setCustomerName("");
        setCustomerPhone("");
        setDiscount("");
      } else {
        toast.error("Checkout failed");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Checkout failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="explore-container text-light">
      {/* Left Column: Product Selection Grid */}
      <div className="left-column">
        {/* Categories Horizontal Scroll */}
        <div className="mb-3">
          <h5 className="text-white mb-2 font-semibold">Categories</h5>
          <div className="category-scroll">
            <div 
              className={`category-capsule ${activeCategory === "" ? 'active' : ''}`}
              onClick={() => setActiveCategory("")}
            >
              <span>All Products</span>
            </div>
            {categories.map((cat) => (
              <div 
                key={cat.categoryId}
                className={`category-capsule ${activeCategory === cat.categoryId ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat.categoryId)}
              >
                {cat.imgUrl && <img src={cat.imgUrl} alt={cat.name} className="category-img" />}
                <span>{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        <hr className="border-secondary my-2" />

        {/* Products Grid */}
        <h5 className="text-white mb-3 font-semibold">Products ({filteredItems.length})</h5>
        <div className="items-grid-scroll">
          {filteredItems.length === 0 ? (
            <div className="d-flex align-items-center justify-content-center h-75 text-muted">
              <span>No products available under this category</span>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
              {filteredItems.map((item) => (
                <div className="col" key={item.itemId}>
                  <div className="card glass-card product-card p-0 text-light border-0">
                    <div className="product-image-container">
                      <img 
                        src={item.imgUrl || "https://placehold.co/300x200?text=No+Image"} 
                        alt={item.name} 
                      />
                    </div>
                    <div className="card-body d-flex flex-column p-3">
                      <h6 className="card-title text-white mb-1 fw-bold">{item.name}</h6>
                      <small className="text-muted mb-2 d-block">{item.categoryName || "Uncategorized"}</small>
                      <p className="card-text text-muted small text-truncate mb-3" style={{ maxHeight: '40px' }}>
                        {item.description || "No description provided."}
                      </p>
                      <div className="d-flex align-items-center justify-content-between mt-auto">
                        <span className="text-warning fw-bold font-semibold" style={{ fontSize: '1.1rem' }}>
                          ₹{item.price.toFixed(2)}
                        </span>
                        <button 
                          className="btn btn-glow py-1 px-3"
                          style={{ fontSize: '0.85rem' }}
                          onClick={() => addToCart(item)}
                        >
                          <i className="bi bi-cart-plus me-1"></i> Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Right Column: Checkout Cart */}
      <div className="right-column card glass-card p-3 border-0 text-light">
        <h4 className="text-gradient mb-3">
          <i className="bi bi-receipt me-2"></i>Cart Summary
        </h4>

        {/* Live Cart Items */}
        <div className="cart-items-scroll mb-3 d-flex flex-column gap-2">
          {cart.length === 0 ? (
            <div className="d-flex flex-column align-items-center justify-content-center h-100 text-muted py-5">
              <i className="bi bi-cart-x" style={{ fontSize: '2.5rem' }}></i>
              <span className="mt-2">Cart is empty</span>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.itemId}>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="flex-grow-1 min-width-0">
                    <h6 className="mb-0 text-white fw-semibold text-truncate">{item.name}</h6>
                    <small className="text-warning">₹{item.price.toFixed(2)} each</small>
                  </div>
                  <div className="d-flex align-items-center gap-2 ms-3">
                    <button className="qty-btn" onClick={() => updateQuantity(item.itemId, -1)}>-</button>
                    <span className="fw-semibold text-white px-1" style={{ fontSize: '0.9rem' }}>{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.itemId, 1)}>+</button>
                    
                    <button 
                      className="btn btn-link text-danger p-0 ms-2"
                      onClick={() => removeFromCart(item.itemId)}
                    >
                      <i className="bi bi-trash"></i>
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Customer Details Form */}
        <form onSubmit={handleCheckout} className="checkout-summary">
          <div className="mb-2">
            <label htmlFor="customerName" className="form-label text-white small mb-1">Customer Name *</label>
            <input 
              type="text" 
              id="customerName"
              className="form-control glass-input py-1.5"
              placeholder="e.g. Akash Singh"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="customerPhone" className="form-label text-white small mb-1">Customer Mobile</label>
            <input 
              type="text" 
              id="customerPhone"
              className="form-control glass-input py-1.5"
              placeholder="9876543210"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
            />
          </div>

          {/* Pricing Math Summary */}
          <div className="border-top border-secondary pt-2 small mb-3">
            <div className="d-flex justify-content-between text-muted mb-1">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between text-muted mb-1">
              <span>Tax (GST 18%):</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="d-flex align-items-center justify-content-between text-muted mb-2">
              <span>Discount (₹):</span>
              <input 
                type="number"
                className="glass-input text-end py-0.5 px-2"
                style={{ width: '80px', fontSize: '0.85rem' }}
                placeholder="0"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-between text-white fw-bold border-top border-secondary pt-2" style={{ fontSize: '1.1rem' }}>
              <span>Total:</span>
              <span className="text-warning">₹{total.toFixed(2)}</span>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-glow w-100 py-2 fw-semibold"
            disabled={loading || cart.length === 0}
          >
            {loading ? "Processing..." : "Place Order & Print Receipt"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Explore;
