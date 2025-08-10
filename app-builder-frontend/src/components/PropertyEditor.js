// src/components/PropertyEditor.js
// Panel to edit properties of selected components
import React from 'react';

export default function PropertyEditor({ selectedComponent, onChange }) {
  if (!selectedComponent) return <aside style={{ width: 200, padding: 16 }}>Select a component</aside>;

  return (
    <aside style={{ width: 200, padding: 16, borderLeft: '2px solid var(--color-trim)' }}>
      <h3>Edit Properties</h3>
      <label>
        Type:
        <input value={selectedComponent.type} disabled style={{ marginLeft: 8 }} />
      </label>
      <br />
      <label>
        Label:
        <input
          value={selectedComponent.label || ''}
          onChange={e => onChange({ ...selectedComponent, label: e.target.value })}
          style={{ marginLeft: 8 }}
        />
      </label>
    </aside>
  );
}
