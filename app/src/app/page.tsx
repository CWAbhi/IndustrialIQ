'use client';

import React, { useState } from 'react';
import { Search, Bell, Mic, Settings, Moon, Sun, Wifi, CheckCircle2, AlertTriangle, Info, Menu } from 'lucide-react';
import Sidebar from '@/components/Sidebar';
import Dashboard from '@/components/Dashboard';
import ChatInterface from '@/components/ChatInterface';
import AssetIntelligence from '@/components/AssetIntelligence';
import KnowledgeGraph from '@/components/KnowledgeGraph';
import ComplianceCenter from '@/components/ComplianceCenter';
import Login from '@/components/Login';
import MaintenanceHub from '@/components/MaintenanceHub';
import FailureAnalysis from '@/components/FailureAnalysis';
import ExpertNetwork from '@/components/ExpertNetwork';
import DocumentVault from '@/components/DocumentVault';

const pageTitles: Record<string, string> = {
  dashboard: 'Operations Command Center',
  chat: 'Expert Copilot',
  assets: 'Asset Performance Center',
  graph: 'Knowledge Intelligence',
  compliance: 'Governance & Compliance',
  maintenance: 'Maintenance Operations',
  failures: 'Reliability Intelligence',
  experts: 'Engineering Expertise',
  documents: 'Engineering Documents',
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
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [theme, setTheme] = useState('dark');
  const [toasts, setToasts] = useState<{id: string, type: 'success'|'error'|'info', title: string, message: string}[]>([]);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [notifications, setNotifications] = useState([
    { id: 1, title: 'CW Pump Fleet — MTBF Declining', message: 'Cooling Water Pump fleet showing accelerated bearing wear. Action required.', time: '2m ago', read: false },
    { id: 2, title: 'Engineer Retirement — Knowledge at Risk', message: 'Rajesh Sharma retiring in 6 months. Immediate knowledge capture recommended.', time: '12d ago', read: false },
    { id: 3, title: 'Compliance Gap Detected', message: 'Safety inspection overdue for Unit 2 reactor vessels.', time: '15d ago', read: true }
  ]);

  React.useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const addToast = (type: 'success'|'error'|'info', title: string, message: string) => {
    const id = Math.random().toString(36).substr(2, 9);
    setToasts(prev => [...prev, { id, type, title, message }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 4000);
  };

  const handleBellClick = () => {
    setIsNotificationsOpen(!isNotificationsOpen);
  };

  const renderPage = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard addToast={addToast} />;
      case 'chat':
        return <ChatInterface />;
      case 'assets':
        return <AssetIntelligence addToast={addToast} onNavigate={setActiveTab} />;
      case 'graph':
        return <KnowledgeGraph />;
      case 'compliance':
        return <ComplianceCenter addToast={addToast} />;
      case 'maintenance':
        return <MaintenanceHub addToast={addToast} />;
      case 'failures':
        return <FailureAnalysis addToast={addToast} />;
      case 'experts':
        return <ExpertNetwork addToast={addToast} />;
      case 'documents':
        return <DocumentVault addToast={addToast} />;
      default:
        return (
          <div className="page-content" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '16px', height: '100%' }}>
            <div style={{ fontSize: '48px' }}>🚧</div>
            <h2 style={{ fontSize: '20px', fontWeight: 700, color: 'var(--text-primary)' }}>
              {pageTitles[activeTab] || 'Module'}
            </h2>
            <p style={{ fontSize: '14px', color: 'var(--text-tertiary)', textAlign: 'center', maxWidth: '400px' }}>
              This module is part of the PlantBrain platform architecture. 
              Full implementation available in the production release.
            </p>
            <button className="btn btn-primary" onClick={() => setActiveTab('dashboard')}>
              Back to Dashboard
            </button>
          </div>
        );
    }
  };

  if (!isLoggedIn) {
    return <Login onLogin={() => setIsLoggedIn(true)} />;
  }

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
    setIsMobileSidebarOpen(false);
  };

  return (
    <div className="app-layout">
      <Sidebar activeTab={activeTab} onTabChange={handleTabChange} isMobileOpen={isMobileSidebarOpen} />
      
      {isMobileSidebarOpen && (
        <div className="mobile-overlay" onClick={() => setIsMobileSidebarOpen(false)} />
      )}
      
      <div className="main-content">
        {/* Header Bar */}
        <div className="main-header">
          <div className="main-header-left">
            <button 
              className="btn-icon mobile-menu-btn" 
              style={{ marginRight: '12px' }}
              onClick={() => setIsMobileSidebarOpen(true)}
            >
              <Menu size={20} />
            </button>
            <div>
              <div className="main-header-title">{pageTitles[activeTab] || 'PlantBrain'}</div>
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
            <button className="btn-icon" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} title="Toggle Theme">
              {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
            </button>
            <div style={{ position: 'relative' }}>
              <button className="btn-icon" onClick={handleBellClick}>
                <Bell size={16} />
                {notifications.some(n => !n.read) && (
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
                )}
              </button>
              {isNotificationsOpen && (
                <div style={{
                  position: 'absolute',
                  top: 'calc(100% + 8px)',
                  right: 0,
                  width: '320px',
                  background: 'var(--bg-secondary)',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-lg)',
                  boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
                  zIndex: 50,
                  display: 'flex',
                  flexDirection: 'column',
                  overflow: 'hidden'
                }}>
                  <div style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid var(--border-color)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                    <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Notifications</h3>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        onClick={() => setNotifications(notifications.map(n => ({ ...n, read: true })))}
                        style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', fontSize: '11px', cursor: 'pointer', padding: 0 }}
                      >
                        Mark all as read
                      </button>
                      <span style={{ color: 'var(--border-color)' }}>|</span>
                      <button 
                        onClick={() => setNotifications([])}
                        style={{ background: 'none', border: 'none', color: 'var(--text-tertiary)', fontSize: '11px', cursor: 'pointer', padding: 0 }}
                      >
                        Clear all
                      </button>
                    </div>
                  </div>
                  <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                    {notifications.length === 0 ? (
                      <div style={{ padding: '24px', textAlign: 'center', color: 'var(--text-tertiary)', fontSize: '13px' }}>
                        No notifications
                      </div>
                    ) : (
                      notifications.map(notif => (
                        <div key={notif.id} style={{
                          padding: '12px 16px',
                          borderBottom: '1px solid var(--border-color)',
                          background: notif.read ? 'transparent' : 'rgba(59, 130, 246, 0.05)',
                          display: 'flex',
                          flexDirection: 'column',
                          gap: '4px'
                        }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <div style={{ fontSize: '13px', fontWeight: 600, color: notif.read ? 'var(--text-secondary)' : 'var(--text-primary)' }}>
                              {notif.title}
                            </div>
                            <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', whiteSpace: 'nowrap', marginLeft: '8px' }}>
                              {notif.time}
                            </div>
                          </div>
                          <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', lineHeight: 1.4 }}>
                            {notif.message}
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              )}
            </div>
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

      {/* Global Toast Container */}
      <div className="toast-container">
        {toasts.map(toast => (
          <div key={toast.id} className={`toast toast-${toast.type}`}>
            <div className="toast-icon">
              {toast.type === 'success' && <CheckCircle2 size={20} />}
              {toast.type === 'error' && <AlertTriangle size={20} />}
              {toast.type === 'info' && <Info size={20} />}
            </div>
            <div className="toast-content">
              <div className="toast-title">{toast.title}</div>
              <div className="toast-message">{toast.message}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

// End of file

