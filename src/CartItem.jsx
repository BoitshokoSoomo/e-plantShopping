import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

function CartItem({ onContinueShopping }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const totalCost = cartItems.reduce((sum, item) => {
    const price = parseFloat(item.cost.replace('$', ''));
    return sum + price * item.quantity;
  }, 0);

  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
    if (item.quantity > 1) {
      dispatch(updateQuantity({ name: item.name, quantity: item.quantity - 1 }));
    } else {
      dispatch(removeItem(item.name));
    }
  };

  const handleRemove = (item) => {
    dispatch(removeItem(item.name));
  };

  const handleCheckout = () => {
    alert('Coming Soon');
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="navbar-title">Paradise Nursery</span>
          <span className="navbar-tagline">Where Green Meets Serenity</span>
        </div>
        <div className="navbar-links">
          <span className="navbar-link" onClick={onContinueShopping}>Plants</span>
          <span className="navbar-cart">🛒 {totalItems}</span>
        </div>
      </nav>

      <div className="cart-container">
        <h2 className="cart-total-heading">Total Cart Amount: ${totalCost.toFixed(2)}</h2>
        <p className="cart-total-items">Total Plants in Cart: {totalItems}</p>

        {cartItems.length === 0 ? (
          <p className="empty-cart">Your cart is empty.</p>
        ) : (
          cartItems.map((item) => {
            const price = parseFloat(item.cost.replace('$', ''));
            const subtotal = price * item.quantity;
            return (
              <div key={item.name} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-item-image" />
                <div className="cart-item-details">
                  <h3>{item.name}</h3>
                  <p>Unit Price: {item.cost}</p>
                  <p>Total: ${subtotal.toFixed(2)}</p>
                  <div className="quantity-controls">
                    <button onClick={() => handleDecrement(item)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleIncrement(item)}>+</button>
                  </div>
                  <button className="delete-btn" onClick={() => handleRemove(item)}>Delete</button>
                </div>
              </div>
            );
          })
        )}

        <div className="cart-actions">
          <button className="continue-btn" onClick={onContinueShopping}>Continue Shopping</button>
          <button className="checkout-btn" onClick={handleCheckout}>Checkout</button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
