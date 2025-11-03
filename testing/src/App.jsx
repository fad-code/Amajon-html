import React, { useState } from 'react';
import Header from './components/Header.jsx';
import Menu from './components/Menu.jsx';
import Checkout from './components/Checkout.jsx';
import Success from './components/Success.jsx';

export default function App() {
  const [cart, setCart] = useState({});
  const [orderComplete, setOrderComplete] = useState(false);

  const handleAdd = (name, price) => {
    setCart(prev => {
      const updated = { ...prev };
      if (updated[name]) {
        updated[name].quantity += 1;
      } else {
        updated[name] = { price, quantity: 1 };
      }
      return updated;
    });
  };

  const handleRemove = name => {
    setCart(prev => {
      const updated = { ...prev };
      delete updated[name];
      return updated;
    });
  };

  const handleComplete = () => {
    setCart({});
    setOrderComplete(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Full-width header */}
      <Header />

      {/* Main content area with responsive gutters */}
      <main className="flex-1 px-2 py-6 pb-32 md:px-6 lg:px-12">
        <Menu onAdd={handleAdd} />

        {Object.keys(cart).length > 0 && !orderComplete && (
          <div className="mt-6">
            <Checkout
              cart={cart}
              onRemove={handleRemove}
              onComplete={handleComplete}
            />
          </div>
        )}

        {orderComplete && (
          <div className="mt-6">
            <Success />
          </div>
        )}
      </main>
    </div>
  );
}
