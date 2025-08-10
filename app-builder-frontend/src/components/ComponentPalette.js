// src/components/ComponentPalette.js
// Sidebar with draggable UI components (Button, Input, Form, etc.)
import React from 'react';

const components = [
  { type: 'Button', label: 'Button' },
  { type: 'Input', label: 'Input' },
  { type: 'Form', label: 'Form' },
];

export default function ComponentPalette({ onDragStart }) {
  return (
    <aside style={{ width: 200, padding: 16 }}>
      <h3>Components</h3>
      {components.map((c) => (
        <div
          key={c.type}
          draggable
          onDragStart={(e) => onDragStart(e, c)}
          style={{
            margin: '8px 0',
            padding: 8,
            background: 'var(--color-accent-grey)',
            color: 'var(--color-text)',
            border: '1px solid var(--color-accent-purple)',
            borderRadius: 4,
            cursor: 'grab',
            boxShadow: '0 1px 4px var(--color-accent-purple)'
          }}
        >
          {c.label}
        </div>
      ))}
    </aside>
  );
}
