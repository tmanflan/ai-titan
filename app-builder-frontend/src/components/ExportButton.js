import React, { useState } from 'react';
import { generateCode } from './api';
import { downloadCode } from './download';

export default function ExportButton({ components }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleExport = async () => {
    setLoading(true);
    setError(null);
    try {
      const code = await generateCode(components);
      downloadCode('App.js', code);
    } catch {
      setError('Failed to generate code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: 16 }}>
      <button onClick={handleExport} disabled={loading}>
        {loading ? 'Exporting...' : 'Export Code'}
      </button>
      {error && <div style={{ color: 'var(--color-trim)' }}>{error}</div>}
    </div>
  );
}
