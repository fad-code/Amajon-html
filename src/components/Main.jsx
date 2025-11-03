import React, { useState } from 'react';
import OpenAI from 'openai';
import IngredientsList from './IngredientsList.jsx';
import Recipe from './Recipe.jsx';

export default function Main() {
  const [ingredients, setIngredients] = useState(['onion', 'tomato', 'cheese', 'meat']);
  const [recipe, setRecipe] = useState('');
  const [loading, setLoading] = useState(false);

  const addIngredient = (e) => {
    e.preventDefault();
    const newIng = e.target.elements.ingredient.value.trim();
    if (newIng) {
      setIngredients((prev) => [...prev, newIng]);
      e.target.reset();
    }
  };

  const getRecipe = async () => {
    setLoading(true);
    const openai = new OpenAI({ apiKey: import.meta.env.VITE_OPENAI_API_KEY });
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful chef.' },
        { role: 'user', content: 'Give me a recipe using: ' + ingredients.join(', ') }
      ],
    });
    setRecipe(response.choices[0].message.content);
    setLoading(false);
  };

  return (
    <main>
      <form onSubmit={addIngredient}>
        <input name="ingredient" placeholder="e.g. oregano" />
        <button type="submit">+ Add ingredient</button>
      </form>

      {ingredients.length > 0 && <IngredientsList ingredients={ingredients} />}

      <div style={{ marginTop: '1rem' }}>
        <button onClick={getRecipe} disabled={loading}>
          {loading ? 'Loading…' : 'Get a recipe'}
        </button>
      </div>

      {recipe && <Recipe recipe={recipe} />}
    </main>
) }