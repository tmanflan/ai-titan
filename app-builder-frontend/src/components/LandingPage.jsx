import React from 'react';

export default function LandingPage() {
  return (
    <div className="landing-page">
      <h2>Welcome to AI Titan App Builder</h2>
      <p>Create amazing applications with AI-powered tools!</p>
      <div className="features">
        <div className="feature">
          <h3>🎨 Visual Builder</h3>
          <p>Drag and drop components to build your app</p>
        </div>
        <div className="feature">
          <h3>🤖 AI Generation</h3>
          <p>Generate code from text descriptions</p>
        </div>
        <div className="feature">
          <h3>📱 Image to Code</h3>
          <p>Convert UI mockups to working code</p>
        </div>
      </div>
    </div>
  );
}