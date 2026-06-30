import React, { useContext, useState } from 'react';
import { AppContext } from '../../context/AppContext';
import { createOrder } from '../../service/OrderService';
import toast from 'react-hot-toast';
import { ShoppingCart, Plus, Minus, Trash, FileText } from 'lucide-react';
import './Explore.css';

const CategorySkeleton = () => (
  <div className="category-capsule skeleton" style={{ width: '120px', height: '46px', border: 'none' }}></div>
);

const ProductSkeleton = () => (
  <div className="col">
    <div className="card glass-card product-card p-0 border-0 text-[#192837] text-start">
      <div className="product-image-container skeleton" style={{ height: '140px', width: '100%', border: 'none' }}></div>
      <div className="card-body d-flex flex-column p-4 gap-2">
        <div className="skeleton" style={{ width: '70%', height: '18px' }}></div>
        <div className="skeleton" style={{ width: '40%', height: '12px' }}></div>
        <div className="skeleton mb-2" style={{ width: '100%', height: '34px' }}></div>
        <div className="d-flex align-items-center justify-content-between mt-auto">
          <div className="skeleton" style={{ width: '60px', height: '22px' }}></div>
          <div className="skeleton" style={{ width: '70px', height: '28px', borderRadius: '50px' }}></div>
        </div>
      </div>
    </div>
  </div>
);

const Explore = () => {
  const { categories, itemsData, loading } = useContext(AppContext);
  const [cart, setCart] = useState([]);
  const [activeCategory, setActiveCategory] = useState(""); // "" means show all
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [discount, setDiscount] = useState("");
  const [checkoutLoading, setCheckoutLoading] = useState(false);

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

    setCheckoutLoading(true);
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
      setCheckoutLoading(false);
    }
  };

  return (
    <div className="explore-container text-[#192837] relative">
      {/* Background Video */}
      <div className="bg-video-container">
        <video autoPlay muted loop playsInline>
          <source src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260518_003132_8b7edcb6-c64d-4a52-a9ca-879942e122ad.mp4" type="video/mp4" />
        </video>
        <div className="bg-video-overlay" style={{ backgroundColor: 'rgba(242, 242, 238, 0.78)' }}></div>
      </div>

      {/* Left Column: Product Selection Grid */}
      <div className="left-column text-start">
        {/* Categories Horizontal Scroll */}
        <div className="mb-4">
          <h5 className="text-[#192837] mb-3 font-bold" style={{ fontSize: '1.1rem' }}>Categories</h5>
          <div className="category-scroll">
            {loading ? (
              <>
                <CategorySkeleton />
                <CategorySkeleton />
                <CategorySkeleton />
                <CategorySkeleton />
              </>
            ) : (
              <>
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
              </>
            )}
          </div>
        </div>

        <hr className="border-slate-500/10 my-2" />

        {/* Products Grid */}
        <h5 className="text-[#192837] mb-3 font-bold" style={{ fontSize: '1.1rem' }}>Products ({filteredItems.length})</h5>
        <div className="items-grid-scroll">
          {loading ? (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
              <ProductSkeleton />
            </div>
          ) : filteredItems.length === 0 ? (
            <div className="d-flex align-items-center justify-content-center h-[200px] text-slate-500 font-medium">
              <span>No products available under this category</span>
            </div>
          ) : (
            <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
              {filteredItems.map((item) => (
                <div className="col" key={item.itemId}>
                  <div className="card glass-card product-card p-0 text-[#192837] border-0">
                    <div className="product-image-container">
                      <img 
                        src={item.imgUrl || "https://placehold.co/300x200?text=No+Image"} 
                        alt={item.name} 
                      />
                    </div>
                    <div className="card-body d-flex flex-column p-4">
                      <h6 className="card-title text-[#192837] mb-1 font-bold" style={{ fontSize: '0.95rem' }}>{item.name}</h6>
                      <small className="text-slate-500 font-semibold mb-2.5 d-block" style={{ fontSize: '0.75rem' }}>{item.categoryName || "Uncategorized"}</small>
                      <p className="card-text text-slate-500 small text-truncate mb-4" style={{ maxHeight: '38px', fontSize: '0.8rem' }}>
                        {item.description || "No description provided."}
                      </p>
                      <div className="d-flex align-items-center justify-content-between mt-auto">
                        <span className="text-[#7342E2] font-bold" style={{ fontSize: '1.15rem' }}>
                          ₹{item.price.toFixed(2)}
                        </span>
                        <button 
                          className="btn btn-glow py-1.5 px-3.5 text-xs flex items-center gap-1"
                          onClick={() => addToCart(item)}
                        >
                          <Plus size={12} /> Add
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
      <div className="right-column card glass-card p-4 border-0 text-[#192837] text-start">
        <h4 className="text-gradient mb-4 font-bold flex items-center gap-2" style={{ fontSize: '1.25rem' }}>
          <ShoppingCart size={20} className="text-[#7342E2]" /> Cart Summary
        </h4>

        {/* Live Cart Items */}
        <div className="cart-items-scroll mb-4 d-flex flex-column gap-2.5">
          {cart.length === 0 ? (
            <div className="d-flex flex-column align-items-center justify-content-center h-full text-slate-500 py-5">
              <ShoppingCart size={40} className="text-[#7342E2] opacity-40 mb-2" />
              <span className="font-medium text-sm">Cart is empty</span>
            </div>
          ) : (
            cart.map((item) => (
              <div className="cart-item" key={item.itemId}>
                <div className="d-flex align-items-center justify-content-between">
                  <div className="flex-grow-1 min-width-0">
                    <h6 className="mb-0 text-[#192837] font-semibold text-truncate" style={{ fontSize: '0.85rem' }}>{item.name}</h6>
                    <small className="text-[#7342E2] font-bold" style={{ fontSize: '0.75rem' }}>₹{item.price.toFixed(2)} each</small>
                  </div>
                  <div className="d-flex align-items-center gap-2 ms-3">
                    <button className="qty-btn" onClick={() => updateQuantity(item.itemId, -1)}>
                      <Minus size={10} />
                    </button>
                    <span className="font-bold text-[#192837] px-1" style={{ fontSize: '0.8rem' }}>{item.quantity}</span>
                    <button className="qty-btn" onClick={() => updateQuantity(item.itemId, 1)}>
                      <Plus size={10} />
                    </button>
                    
                    <button 
                      className="btn btn-link text-danger p-0 ms-2"
                      onClick={() => removeFromCart(item.itemId)}
                    >
                      <Trash size={14} />
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
            <label htmlFor="customerName" className="form-label text-[#192837] font-semibold small mb-1">Customer Name *</label>
            <input 
              type="text" 
              id="customerName"
              className="form-control glass-input py-2 text-xs"
              placeholder="e.g. Akash Singh"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="customerPhone" className="form-label text-[#192837] font-semibold small mb-1">Customer Mobile</label>
            <input 
              type="text" 
              id="customerPhone"
              className="form-control glass-input py-2 text-xs"
              placeholder="9876543210"
              value={customerPhone}
              onChange={(e) => setCustomerPhone(e.target.value)}
            />
          </div>

          {/* Pricing Math Summary */}
          <div className="border-top border-slate-500/10 pt-3 small mb-4">
            <div className="d-flex justify-content-between text-slate-500 font-semibold mb-1.5">
              <span>Subtotal:</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="d-flex justify-content-between text-slate-500 font-semibold mb-1.5">
              <span>Tax (GST 18%):</span>
              <span>₹{tax.toFixed(2)}</span>
            </div>
            <div className="d-flex align-items-center justify-content-between text-slate-500 font-semibold mb-2.5">
              <span>Discount (₹):</span>
              <input 
                type="number"
                className="glass-input text-end py-1 px-2 text-xs font-bold"
                style={{ width: '70px' }}
                placeholder="0"
                value={discount}
                onChange={(e) => setDiscount(e.target.value)}
              />
            </div>
            <div className="d-flex justify-content-between text-[#192837] font-bold border-top border-slate-500/10 pt-2.5" style={{ fontSize: '1.1rem' }}>
              <span>Total:</span>
              <span className="text-[#7342E2]">₹{total.toFixed(2)}</span>
            </div>
          </div>

          <button 
            type="submit" 
            className="btn btn-glow w-full py-2.5 font-semibold text-xs flex items-center justify-center gap-1.5 text-white"
            disabled={checkoutLoading || cart.length === 0}
            style={{ borderRadius: '50px' }}
          >
            {checkoutLoading ? "Processing..." : (
              <>
                <FileText size={14} /> Place Order & Print Receipt
              </>
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Explore;
