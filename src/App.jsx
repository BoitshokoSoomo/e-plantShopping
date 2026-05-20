import React, { useState } from 'react';
import ProductList from './ProductList';
import AboutUs from './AboutUs';
import CartItem from './CartItem';
import './App.css';

function App() {
  const [showProductList, setShowProductList] = useState(false);
  const [showCart, setShowCart] = useState(false);

  const handleGetStarted = () => {
    setShowProductList(true);
    setShowCart(false);
  };

  const handleContinueShopping = () => {
    setShowProductList(true);
    setShowCart(false);
  };

  const handleCartClick = () => {
    setShowCart(true);
    setShowProductList(false);
  };

  if (showCart) {
    return <CartItem onContinueShopping={handleContinueShopping} />;
  }

  if (showProductList) {
    return <ProductList onCartClick={handleCartClick} />;
  }

  return (
    <div className="landing-page">
      <div className="landing-left">
        <h1>Welcome To</h1>
        <h1>Paradise Nursery</h1>
        <p>Where Green Meets Serenity</p>
        <button className="get-started-btn" onClick={handleGetStarted}>
          Get Started
        </button>
      </div>
      <div className="landing-right">
        <p>
          At Paradise Nursery, we are passionate about bringing nature closer to you.
          Our mission is to provide a wide range of high-quality plants that not only
          enhance the beauty of your surroundings but also contribute to a healthier
          and more sustainable lifestyle. From air-purifying plants to aromatic fragrant
          ones, we have something for every plant enthusiast.
        </p>
        <p>
          Our team of experts is dedicated to ensuring that each plant meets our strict
          standards of quality and care. Whether you are a seasoned gardener or just
          starting your green journey, we are here to support you every step of the way.
        </p>
        <p>
          Join us in our mission to create a greener, healthier world. Visit Paradise
          Nursery today and experience the beauty of nature right at your doorstep.
        </p>
      </div>
    </div>
  );
}

export default App;
