import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from './CartSlice';
import './ProductList.css';

const plantsArray = [
  {
    category: 'Air Purifying Plants',
    plants: [
      { name: 'Snake Plant', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/f/fb/Snake_plant_Sansevieria_trifasciata.jpg/800px-Snake_plant_Sansevieria_trifasciata.jpg', description: 'Produces oxygen at night, improving air quality.', cost: '$15' },
      { name: 'Spider Plant', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b1/Chlorophytum_comosum_0zz.jpg/800px-Chlorophytum_comosum_0zz.jpg', description: 'Filters formaldehyde and xylene from the air.', cost: '$12' },
      { name: 'Peace Lily', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/bd/Spathiphyllum_cochlearispathum_RTBG.jpg/800px-Spathiphyllum_cochlearispathum_RTBG.jpg', description: 'Removes mold spores and purifies the air.', cost: '$18' },
    ],
  },
  {
    category: 'Aromatic Fragrant Plants',
    plants: [
      { name: 'Lavender', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/90/Bloeiende_lavendel.jpg/800px-Bloeiende_lavendel.jpg', description: 'Calming scent that promotes relaxation.', cost: '$20' },
      { name: 'Jasmine', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Jasminum_officinale-June_2008.jpg/800px-Jasminum_officinale-June_2008.jpg', description: 'Sweet fragrance that lifts your mood.', cost: '$18' },
      { name: 'Rosemary', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b9/Rosemary_bush.jpg/800px-Rosemary_bush.jpg', description: 'Invigorating scent known to boost memory.', cost: '$15' },
    ],
  },
  {
    category: 'Medicinal Plants',
    plants: [
      { name: 'Aloe Vera', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/4b/Aloe_vera_flower_inset.png/800px-Aloe_vera_flower_inset.png', description: 'Soothes burns and moisturises skin.', cost: '$14' },
      { name: 'Mint', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/9/9f/Mint-leaves-2007.jpg/800px-Mint-leaves-2007.jpg', description: 'Aids digestion and freshens breath.', cost: '$10' },
      { name: 'Chamomile', image: 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/40/Chamomile%40original_size.jpg/800px-Chamomile%40original_size.jpg', description: 'Calming herb used to reduce anxiety.', cost: '$12' },
    ],
  },
];

function ProductList({ onCartClick }) {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const [addedToCart, setAddedToCart] = useState({});

  const totalCartItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
    setAddedToCart((prev) => ({ ...prev, [plant.name]: true }));
  };

  return (
    <div>
      <nav className="navbar">
        <div className="navbar-brand">
          <span className="navbar-title">Paradise Nursery</span>
          <span className="navbar-tagline">Where Green Meets Serenity</span>
        </div>
        <div className="navbar-links">
          <span className="navbar-link">Plants</span>
          <span className="navbar-cart" onClick={onCartClick}>
            🛒 {totalCartItems}
          </span>
        </div>
      </nav>

      <div className="product-list-container">
        {plantsArray.map((group) => (
          <div key={group.category}>
            <h2 className="category-title">{group.category}</h2>
            <div className="product-grid">
              {group.plants.map((plant) => (
                <div key={plant.name} className="plant-card">
                  <img src={plant.image} alt={plant.name} className="plant-image" />
                  <h3 className="plant-name">{plant.name}</h3>
                  <p className="plant-description">{plant.description}</p>
                  <p className="plant-cost">{plant.cost}</p>
                  <button
                    className={`add-to-cart-btn ${addedToCart[plant.name] ? 'disabled' : ''}`}
                    onClick={() => handleAddToCart(plant)}
                    disabled={!!addedToCart[plant.name]}
                  >
                    {addedToCart[plant.name] ? 'Added to Cart' : 'Add to Cart'}
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProductList;
