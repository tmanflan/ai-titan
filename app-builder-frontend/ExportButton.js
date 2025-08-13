import React, { useState } from 'react';
import { downloadCode } from './download';

export default function ExportButton({ code }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleExport = async () => {
    setLoading(true);
    setError(null);
    try {
      downloadCode('App.js', code);
    } catch (e) {
      setError('Failed to export code');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ margin: 16 }}>
      <button 
        onClick={handleExport} 
        disabled={loading}
        style={{ background: 'var(--color-trim)', color: 'var(--color-text)', border: 'none', borderRadius: 8, padding: '8px 24px', fontWeight: 'bold', fontSize: '1rem', boxShadow: '0 2px 8px var(--color-accent-purple)', cursor: loading ? 'not-allowed' : 'pointer' }}
      >
        {loading ? 'Exporting...' : 'Export Code'}
      </button>
      {error && <div style={{ color: 'var(--color-trim)' }}>{error}</div>}
    </div>
  );
}