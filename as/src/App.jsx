import React, { useState } from 'react';
import IngredientsList from './components/IngredientsList';
import Recipe from './components/Recipe';

export default function App() {
  const [ingredients, setIngredients] = useState(['chicken', 'salt', 'pepper']);
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);

  async function getRecipe() {
    setLoading(true);
    try {
      const res = await fetch('/api/recipe', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ingredients }),
      });
      const body = await res.json();
      setRecipe(body.recipe);
    } catch (err) {
      console.error(err);
      setRecipe('Failed to load recipe.');
    } finally {
      setLoading(false);
    }
  }

  function addIngredient(e) {
    e.preventDefault();
    const ing = e.target.ingredient.value.trim();
    if (ing) {
      setIngredients(old => [...old, ing]);
      e.target.reset();
    }
  }

  return (
    <div>
      <h1>Chefku</h1>
      <form onSubmit={addIngredient}>
        <input name="ingredient" placeholder="e.g. oregano" />
        <button type="submit">+ Add ingredient</button>
      </form>

      <IngredientsList ingredients={ingredients} />

      <button onClick={getRecipe} disabled={loading}>
        {loading ? 'Loading...' : 'Get Recipe'}
      </button>

      {recipe && <Recipe text={recipe} />}
    </div>
  );
}
