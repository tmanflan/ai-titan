import React from 'react';
import './LandingPage.css';
import titanLogo from '../assets/titanforge-logo.png';
// TitanForge logo SVG (replace with your actual logo if available)

const slogan = "Warriors Forge The Future";
const navLinks = [
  { label: 'Features', href: '#features' },
  { label: 'Pricing', href: '#pricing' },
  { label: 'Docs', href: '#docs' },
];

const LandingPage = () => (
  <div className="landing-container">
    <nav className="tf-navbar">
      <div className="tf-navbar-left">
        <TitanForgeLogo />
        <span className="tf-brand">TitanForge</span>
      </div>
      <div className="tf-navbar-center">
        {navLinks.map((link) => (
          <a key={link.label} href={link.href} className="tf-nav-link">
            {link.label}
          </a>
        ))}
      </div>
      <div className="tf-navbar-right">
        <button className="tf-login-btn">Log in</button>
        <button className="tf-getstarted-btn">Get started</button>
      </div>
    </nav>
    <header className="landing-header">
      <img src={titanLogo} alt="TitanForge Logo" className="landing-logo" />
      <h1 className="landing-title">TitanForge</h1>
      <p className="landing-slogan">{slogan}</p>
    </header>
    <main className="landing-main">
      <section className="landing-cta">
        <h2>Build Apps from Imagination</h2>
        <p>Describe your vision or upload a sketch—TitanForge turns it into a working app, instantly.</p>
        <a href="/app" className="landing-get-started">Get Started</a>
      </section>
      <section className="landing-features">
        <div className="feature-card">
          <h3>AI-Powered Code Generation</h3>
          <p>Leverage DeepSeek and img2code for rapid, accurate app creation.</p>
        </div>
        <div className="feature-card">
          <h3>Image-to-Code Magic</h3>
          <p>Upload screenshots or wireframes—TitanForge brings them to life.</p>
        </div>
        <div className="feature-card">
          <h3>Early Warrior Specials</h3>
          <p>Unlock exclusive pricing for our first adopters!</p>
        </div>
      </section>
      <div className="tf-chatbox">
        <input
          className="tf-chat-input"
          placeholder="Ask TitanForge to create a prototype..."
          disabled
        />
        <div className="tf-chatbox-actions">
          <button className="tf-chat-action-btn">＋ Attach</button>
          <button className="tf-chat-action-btn">🌐 Public</button>
          <span className="tf-chat-model">GPT-5</span>
          <button className="tf-chat-send-btn">↑</button>
        </div>
      </div>
    </main>
    <footer className="landing-footer">
      <span>© 2025 TitanForge. All rights reserved.</span>
    </footer>
  </div>
);

export default LandingPage;
