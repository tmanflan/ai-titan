// src/components/Canvas.js
// Drop zone where users can arrange components
import React from 'react';

export default function Canvas({ components, onDrop, onSelect, selectedIdx }) {
  const handleDrop = (e) => {
    e.preventDefault();
    const data = e.dataTransfer.getData('component');
    if (data) {
      onDrop(JSON.parse(data));
    }
  };

  return (
    <main
      style={{ flex: 1, minHeight: 400, margin: 16, padding: 16 }}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      {components.length === 0 && <div style={{ color: 'var(--color-accent-grey)' }}>Drag components here</div>}
      {components.map((c, i) => (
        <div
          key={i}
          className={selectedIdx === i ? 'selected' : ''}
          style={{
            margin: 8,
            padding: 8,
            border: `1px solid ${selectedIdx === i ? 'var(--color-accent-purple)' : 'var(--color-accent-grey)'}`,
            background: 'var(--color-bg)',
            color: 'var(--color-text)',
            borderRadius: 4,
            cursor: 'pointer',
            boxShadow: selectedIdx === i ? '0 2px 8px var(--color-accent-purple)' : 'none'
          }}
          onClick={() => onSelect(i)}
        >
          {c.type}
        </div>
      ))}
    </main>
  );
}
