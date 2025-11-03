import React from 'react';

export default function Checkout({ cart, onRemove, onComplete }) {
  const total = Object.values(cart).reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <section
      className="
        sticky bottom-0 left-0 right-0 z-10 
        bg-white p-4 border-t border-gray-300 shadow-lg
        lg:static lg:mx-auto lg:mt-6 lg:max-w-md lg:rounded-xl lg:shadow-xl
      "
    >
      <h3 className="text-xl font-semibold text-center mb-4">Your order</h3>

      <div className="space-y-2 max-h-64 overflow-auto">
        {Object.entries(cart).map(([name, item]) => (
          <div key={name} className="flex justify-between items-center">
            <span>
              {item.quantity > 1 ? `${item.quantity}× ${name}` : name}
            </span>
            <div className="flex items-center space-x-4">
              <span className="font-medium">${item.price * item.quantity}</span>
              <button
                onClick={() => onRemove(name)}
                className="text-sm text-gray-500 hover:text-gray-700"
              >
                remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-between text-lg font-semibold mt-4">
        <span>Total price:</span>
        <span>${total}</span>
      </div>

      <button
        onClick={onComplete}
        className="
          mt-4 w-full py-3 
          bg-green-500 hover:bg-green-600 
          text-white font-bold 
          rounded-lg shadow 
          transition
        "
      >
        Complete order
      </button>
    </section>
  );
}
