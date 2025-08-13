import React, { useState } from 'react';
import ComponentPalette from './ComponentPalette.jsx';
import Canvas from './Canvas.jsx';
import PropertyEditor from './PropertyEditor.jsx';
import ExportButton from './ExportButton.jsx';
import DescriptionBox from './DescriptionBox.jsx';
import EarlyWarriorSpecials from './EarlyWarriorSpecials.jsx';

export default function TitanForge() {
  const [components, setComponents] = useState([]);
  const [selectedIdx, setSelectedIdx] = useState(null);
  const [description, setDescription] = useState('');

  const handleDragStart = (e, component) => {
    e.dataTransfer.setData('component', JSON.stringify(component));
  };

  const handleDrop = (component) => {
    setComponents([...components, { ...component }]);
  };

  const handleSelect = (idx) => setSelectedIdx(idx);

  const handlePropertyChange = (updated) => {
    setComponents(
      components.map((c, i) => (i === selectedIdx ? updated : c))
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh', background: 'var(--color-bg)' }}>
      <EarlyWarriorSpecials />
      <DescriptionBox onDescriptionChange={setDescription} />
      <div style={{ display: 'flex', flex: 1 }}>
        <ComponentPalette onDragStart={handleDragStart} />
        <Canvas components={components} onDrop={handleDrop} onSelect={handleSelect} selectedIdx={selectedIdx} />
        <PropertyEditor
          selectedComponent={components[selectedIdx]}
          onChange={handlePropertyChange}
        />
        <ExportButton components={components} />
      </div>
    </div>
  );
}
