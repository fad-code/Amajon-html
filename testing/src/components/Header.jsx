import React from 'react';

export default function Header() {
  return (
    <header className="w-full overflow-hidden">
      <div className="relative" style={{ paddingTop: '25%'}}>
        <img
          src="/images/burgerheading.png"
          alt="OrderKuy"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
        <div className="absolute inset-0 flex items-center justify-center">
        </div>
      </div>
    </header>
  );
}
