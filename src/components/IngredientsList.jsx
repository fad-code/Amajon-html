export default function IngredientsList({ ingredients }) {
  return (
    <section>
      <h2>Ingredients on hand:</h2>
      <ul>
        {ingredients.map((ing) => (
          <li key={ing}>{ing}</li>
        ))}
      </ul>
    </section>
  );
}