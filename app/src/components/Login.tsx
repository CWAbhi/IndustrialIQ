'use client';

import React, { useState } from 'react';
import { Lock, User, ArrowRight, BrainCircuit } from 'lucide-react';

interface LoginProps {
  onLogin: () => void;
}

export default function Login({ onLogin }: LoginProps) {
  const [username, setUsername] = useState('demo_admin');
  const [password, setPassword] = useState('password123');
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    // Simulate network delay for effect
    setTimeout(() => {
      onLogin();
    }, 1200);
  };

  return (
    <div className="login-container">
      {/* Background Animation */}
      <div className="space-background">
        <div className="stars"></div>
        <div className="stars2"></div>
        <div className="nebula"></div>
        <div className="nebula2"></div>
      </div>

      {/* Left side content - Brand */}
      <div className="login-left">
        <div style={{ textAlign: 'center', zIndex: 10, maxWidth: '480px' }}>
          <div style={{ 
            display: 'inline-flex', 
            alignItems: 'center', 
            justifyContent: 'center',
            width: '80px', 
            height: '80px', 
            background: 'var(--gradient-primary)',
            borderRadius: 'var(--radius-xl)',
            marginBottom: '32px',
            boxShadow: 'var(--shadow-glow-accent)'
          }}>
            <BrainCircuit size={40} color="white" />
          </div>
          <h1 style={{ fontSize: '48px', fontWeight: 800, color: 'white', marginBottom: '16px', letterSpacing: '-1px' }}>
            Plant<span style={{ color: 'var(--accent-primary)' }}>Brain</span>
          </h1>
          <p style={{ fontSize: '18px', color: 'var(--text-secondary)', lineHeight: '1.6' }}>
            The Unified Asset & Operations Brain for modern manufacturing.
          </p>
        </div>
      </div>

      {/* Right side content - Form */}
      <div className="login-right">
        <div className="login-card">
          <div style={{ marginBottom: '32px' }}>
            <h2 style={{ fontSize: '24px', fontWeight: 700, color: 'white', marginBottom: '8px' }}>
              Welcome back
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>
              Sign in to access your command center.
            </p>
          </div>

          <form onSubmit={handleLogin}>
            <div className="login-input-group">
              <label>Username</label>
              <div style={{ position: 'relative' }}>
                <User size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="text" 
                  className="login-input" 
                  style={{ paddingLeft: '44px' }}
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  placeholder="Enter your username"
                  required
                />
              </div>
            </div>

            <div className="login-input-group">
              <label>Password</label>
              <div style={{ position: 'relative' }}>
                <Lock size={16} style={{ position: 'absolute', left: '16px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input 
                  type="password" 
                  className="login-input" 
                  style={{ paddingLeft: '44px' }}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  required
                />
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '8px' }}>
                <a href="#" style={{ fontSize: '12px', color: 'var(--accent-primary)', textDecoration: 'none', fontWeight: 500 }}>
                  Forgot password?
                </a>
              </div>
            </div>

            <button type="submit" className="login-btn" disabled={isLoggingIn}>
              {isLoggingIn ? (
                <div style={{ width: '20px', height: '20px', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
              ) : (
                <>
                  Sign In to Platform <ArrowRight size={16} />
                </>
              )}
            </button>
            <style>{`
              @keyframes spin {
                to { transform: rotate(360deg); }
              }
            `}</style>
          </form>

          <div style={{ marginTop: '32px', textAlign: 'center' }}>
            <p style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
              Demo mode enabled. Click Sign In to proceed.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
