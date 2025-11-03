export default function Recipe({ recipe }) {
  return (
    <section style={{ whiteSpace: 'pre-wrap', marginTop: '1rem' }}>
      <h2>Recipe</h2>
      <p>{recipe}</p>
    </section>
  );
}