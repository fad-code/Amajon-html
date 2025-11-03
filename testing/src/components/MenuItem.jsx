import React from 'react';

export default function MenuItem({ item, onAdd }) {
  return (
    <div className="
      flex flex-col justify-between h-full
      bg-white rounded-xl shadow-sm hover:shadow-md
      transition-transform hover:-translate-y-1 p-3
    ">
      <div className="flex items-center space-x-3">
        <img
          src={item.image}
          alt={item.name}
          className="w-10 h-10 object-contain"
        />
        <div>
          <h2 className="text-base font-semibold text-gray-800">
            {item.name}
          </h2>
          <p className="text-xs text-gray-500">
            {item.desc}
          </p>
        </div>
      </div>
      <div className="mt-3 flex items-center justify-between">
        <span className="text-sm font-bold text-gray-900">
          ${item.price}
        </span>
        <button
          onClick={() => onAdd(item.name, item.price)}
          className="
            p-2 border border-gray-300 rounded-full
            hover:bg-green-500 hover:text-white
            transition
          "
        >
          +
        </button>
      </div>
    </div>
  );
}
