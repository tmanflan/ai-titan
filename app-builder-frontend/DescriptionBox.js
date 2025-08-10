import React, { useState } from 'react';

export default function DescriptionBox({ onDescriptionChange }) {
  const [description, setDescription] = useState('');

  return (
    <div style={{ margin: 16, width: '100%' }}>
      <label htmlFor="description-box"><b>App Description (up to 25,000 characters):</b></label>
      <textarea
        id="description-box"
        value={description}
        onChange={e => {
          if (e.target.value.length <= 25000) {
            setDescription(e.target.value);
            onDescriptionChange && onDescriptionChange(e.target.value);
          }
        }}
        maxLength={25000}
        rows={8}
        style={{ width: '100%', fontSize: 16, marginTop: 8 }}
        placeholder="Describe your app in detail..."
      />
      <div style={{ textAlign: 'right', fontSize: 12, color: '#888' }}>
        {description.length} / 25000
      </div>
    </div>
  );
}
