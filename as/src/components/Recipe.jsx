import React from 'react';

export default function Recipe({ text }) {
  return (
    <section>
      <h2>Your AI-Generated Recipe</h2>
      <pre style={{ whiteSpace: 'pre-wrap' }}>{text}</pre>
    </section>
  );
}
