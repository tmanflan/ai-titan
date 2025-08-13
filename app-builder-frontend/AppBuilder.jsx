import React, { useState } from 'react';
import ExportButton from './src/components/ExportButton';
import ImageUploader from './src/components/ImageUploader';

export default function TitanForge() {
  const [description, setDescription] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('text'); // 'text' or 'image'

  const handleGenerate = async () => {
    setLoading(true);
    setError(null);
    setGeneratedCode('');
    try {
      // Call backend API to generate code from description
      const res = await fetch('http://localhost:4000/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ description }),
      });
      const data = await res.json();
      setGeneratedCode(data.code);
    } catch (e) {
      setError('Failed to generate code.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--color-bg)', color: 'var(--color-text)', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-start', padding: 0 }}>
      <header style={{ width: '100%', padding: '2rem 0 1rem 0', background: 'var(--color-trim)', textAlign: 'center', boxShadow: '0 2px 8px var(--color-accent-purple)' }}>
        <h1 style={{ color: 'var(--color-text)', fontSize: '2.5rem', margin: 0, letterSpacing: 2 }}>TitanForge</h1>
        <p style={{ color: 'var(--color-accent-purple)', fontWeight: 'bold', fontSize: '1.2rem', margin: 0 }}>Describe your app and generate code instantly</p>
      </header>
      
      <div style={{ width: '100%', maxWidth: 800, margin: '1rem auto', display: 'flex', justifyContent: 'center' }}>
        <button 
          onClick={() => setActiveTab('text')} 
          style={{ 
            background: activeTab === 'text' ? 'var(--color-trim)' : 'var(--color-accent-grey)', 
            color: 'var(--color-text)', 
            border: 'none', 
            borderRadius: '8px 0 0 8px', 
            padding: '8px 24px', 
            fontWeight: 'bold', 
            fontSize: '1rem', 
            cursor: 'pointer' 
          }}
        >
          Text to Code
        </button>
        <button 
          onClick={() => setActiveTab('image')} 
          style={{ 
            background: activeTab === 'image' ? 'var(--color-trim)' : 'var(--color-accent-grey)', 
            color: 'var(--color-text)', 
            border: 'none', 
            borderRadius: '0 8px 8px 0', 
            padding: '8px 24px', 
            fontWeight: 'bold', 
            fontSize: '1rem', 
            cursor: 'pointer' 
          }}
        >
          Image to Code
        </button>
      </div>
      
      {activeTab === 'text' ? (
        <main style={{ width: '100%', maxWidth: 800, margin: '1rem auto', background: 'var(--color-accent-grey)', borderRadius: 16, boxShadow: '0 4px 24px var(--color-accent-purple)', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <label htmlFor="description" style={{ fontWeight: 'bold', color: 'var(--color-text)', fontSize: '1.1rem', marginBottom: 8 }}>Describe your app:</label>
          <textarea
            id="description"
            value={description}
            onChange={e => setDescription(e.target.value)}
            rows={8}
            style={{ width: '100%', borderRadius: 8, border: '2px solid var(--color-trim)', background: 'var(--color-bg)', color: 'var(--color-text)', fontSize: '1.1rem', padding: 16, marginBottom: 16, resize: 'vertical' }}
            placeholder="e.g. A to-do list app with dark mode, authentication, and notifications."
          />
          <button
            onClick={handleGenerate}
            disabled={loading || !description.trim()}
            style={{ background: 'var(--color-trim)', color: 'var(--color-text)', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 2px 8px var(--color-accent-purple)', marginBottom: 24, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
          >
            {loading ? 'Generating...' : 'Generate Code'}
          </button>
          {error && <div style={{ color: 'var(--color-trim)', marginBottom: 16 }}>{error}</div>}
          {generatedCode && (
            <>
              <h2 style={{ color: 'var(--color-accent-purple)', fontSize: '1.3rem', marginTop: 0 }}>Generated Code</h2>
              <pre style={{ width: '100%', background: '#222', color: '#FFD600', borderRadius: 8, padding: 16, overflowX: 'auto', fontSize: '1rem', marginBottom: 16 }}>{generatedCode}</pre>
              <ExportButton code={generatedCode} />
            </>
          )}
        </main>
      ) : (
        <ImageUploader />
      )}
    </div>
  );
}
