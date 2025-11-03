import React from 'react';
import data from '../data.js';
import MenuItem from './MenuItem.jsx';

export default function Menu({ onAdd }) {
  return (
    <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
      {data.map(item => (
        <MenuItem key={item.name} item={item} onAdd={onAdd} />
      ))}
    </main>
  );
}
