import React from 'react';

export default function IngredientsList({ ingredients }) {
  return (
    <section>
      <h2>Ingredients on hand:</h2>
      <ul>
        {ingredients.map((ing, i) => (
          <li key={i}>{ing}</li>
        ))}
      </ul>
    </section>
  );
}
