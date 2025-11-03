import React from 'react';

export default function Success() {
  return (
    <div className="mt-6 bg-green-50 text-green-700 text-center p-6 rounded-lg font-bold">
      <p>Thanks! Your order is on its way!</p>
      <button
        onClick={() => window.location.reload()}
        className="mt-4 inline-block px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
      >
        Order Again
      </button>
    </div>
  );
}