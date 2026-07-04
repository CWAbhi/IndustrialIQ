'use client';

import React, { useState } from 'react';
import { Search, Bell, Mic, Settings, Moon, Wifi } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import ChatInterface from '@/components/ChatInterface';
import AssetIntelligence from '@/components/AssetIntelligence';
import KnowledgeGraph from '@/components/KnowledgeGraph';
import ComplianceCenter from '@/components/ComplianceCenter';

const pageTitles: Record<string, string> = {
  dashboard: 'Command Center',
  chat: 'AI Assistant',
  assets: 'Asset Intelligence',
  graph: 'Knowledge Graph',
  compliance: 'Compliance Center',
  maintenance: 'Maintenance Hub',
  failures: 'Failure Analysis',
  experts: 'Expert Network',
  documents: 'Document Vault',
};

const pageSubtitles: Record<string, string> = {
  dashboard: 'BharatChem Industries · Jamnagar Plant',
  chat: 'Multi-hop reasoning across the Industrial Knowledge Graph',
  assets: 'Real-time health monitoring and predictive insights',
  graph: 'Interactive exploration of the Industrial Knowledge Graph',
  compliance: 'Continuous regulatory monitoring and audit readiness',
  maintenance: 'Unified maintenance planning and work management',
  failures: 'Root cause analysis and Failure DNA matching',
  experts: 'Experience graph and knowledge capture',
  documents: 'Ingested documents and knowledge extraction',
};

export default function Home() {
  const [activeTab, setActiveTab] = useState('dashboard');

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard />;
      case 'chat':
        return <ChatInterface />;
      case 'assets':
        return <AssetIntelligence />;
      case 'graph':
        return <KnowledgeGraph />;
      case 'compliance':
        return <ComplianceCenter />;
      default:
        return (
          <div className="page-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', height: '100%' }}>
            <div style={{ fontSize: '48px' }}>🚧</div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {pageTitles[activeTab] || 'Module'}
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-tertiary)', textAlign: 'center', maxWidth: '400px' }}>
              This module is part of the IndustrialIQ platform architecture. 
              Full implementation available in the production release.
            </p>
            <button className="btn btn-primary" onClick={() => setActiveTab('dashboard')}>
              Back to Dashboard
            </button>
          </div>
        );
    }
  };

  return (
    <div className="app-layout">
      <Sidebar activeTab={activeTab} onTabChange={setActiveTab} />
      
      <div className="main-content">
        {/* Header Bar */}
        <div className="main-header">
          <div className="main-header-left">
            <div>
              <div className="main-header-title">{pageTitles[activeTab] || 'IndustrialIQ'}</div>
              <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '1px' }}>
                {pageSubtitles[activeTab]}
              </div>
            </div>
          </div>
          <div className="main-header-right">
            <div className="search-bar">
              <Search size={14} className="search-bar-icon" />
              <input type="text" placeholder="Search assets, documents, procedures..." />
              <span className="search-shortcut">⌘K</span>
            </div>
            <button className="btn-icon" style={{ position: 'relative' }}>
              <Bell size={16} />
              <span style={{
                position: 'absolute',
                top: '4px',
                right: '4px',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: 'var(--status-critical)',
                border: '2px solid var(--bg-secondary)',
              }} />
            </button>
            <button className="btn-icon">
              <Mic size={16} />
            </button>
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '4px 10px',
              background: 'var(--status-success-bg)',
              border: '1px solid var(--status-success-border)',
              borderRadius: 'var(--radius-full)',
              fontSize: '11px',
              fontWeight: 600,
              color: 'var(--status-success)',
            }}>
              <Wifi size={10} />
              Live
            </div>
          </div>
        </div>

        {/* Page Content */}
        {renderPage()}
      </div>
    </div>
  );
}
