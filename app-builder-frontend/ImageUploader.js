import React, { useState } from 'react';
import { imageToCode } from './api';
import { downloadCode } from './download';

export default function ImageUploader() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [generatedCode, setGeneratedCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    
    setLoading(true);
    setError(null);
    setGeneratedCode('');
    
    try {
      const code = await imageToCode(selectedFile);
      setGeneratedCode(code);
    } catch (e) {
      setError('Failed to convert image to code.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = () => {
    if (generatedCode) {
      downloadCode('App.js', generatedCode);
    }
  };

  return (
    <div style={{ width: '100%', maxWidth: 800, margin: '2rem auto', background: 'var(--color-accent-grey)', borderRadius: 16, boxShadow: '0 4px 24px var(--color-accent-purple)', padding: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <h2 style={{ color: 'var(--color-accent-purple)', fontSize: '1.3rem', marginTop: 0 }}>Image to Code</h2>
      <p style={{ color: 'var(--color-text)', marginBottom: 16 }}>Upload a UI mockup or wireframe image to generate code</p>
      
      <input 
        type="file" 
        accept="image/*" 
        onChange={handleFileChange} 
        style={{ marginBottom: 16 }}
      />
      
      {preview && (
        <div style={{ marginBottom: 16, textAlign: 'center' }}>
          <img 
            src={preview} 
            alt="Preview" 
            style={{ maxWidth: '100%', maxHeight: 300, borderRadius: 8 }} 
          />
        </div>
      )}
      
      <button
        onClick={handleUpload}
        disabled={loading || !selectedFile}
        style={{ background: 'var(--color-trim)', color: 'var(--color-text)', border: 'none', borderRadius: 8, padding: '12px 32px', fontWeight: 'bold', fontSize: '1.1rem', boxShadow: '0 2px 8px var(--color-accent-purple)', marginBottom: 24, cursor: loading ? 'not-allowed' : 'pointer', opacity: loading ? 0.7 : 1 }}
      >
        {loading ? 'Processing...' : 'Generate Code'}
      </button>
      
      {error && <div style={{ color: 'var(--color-trim)', marginBottom: 16 }}>{error}</div>}
      
      {generatedCode && (
        <>
          <h3 style={{ color: 'var(--color-accent-purple)', fontSize: '1.2rem' }}>Generated Code</h3>
          <pre style={{ width: '100%', background: '#222', color: '#FFD600', borderRadius: 8, padding: 16, overflowX: 'auto', fontSize: '1rem', marginBottom: 16 }}>{generatedCode}</pre>
          <button
            onClick={handleDownload}
            style={{ background: 'var(--color-trim)', color: 'var(--color-text)', border: 'none', borderRadius: 8, padding: '8px 24px', fontWeight: 'bold', fontSize: '1rem', boxShadow: '0 2px 8px var(--color-accent-purple)', cursor: 'pointer' }}
          >
            Download Code
          </button>
        </>
      )}
    </div>
  );
}