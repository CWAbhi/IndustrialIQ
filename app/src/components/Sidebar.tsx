'use client';

import React from 'react';
import {
  LayoutDashboard,
  MessageSquare,
  Box,
  Network,
  ShieldCheck,
  Wrench,
  Search,
  Bell,
  Mic,
  Activity,
  Users,
  FileText,
  ChevronRight,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isMobileOpen?: boolean;
}

const navItems = [
  { id: 'dashboard', label: 'Command Center', icon: LayoutDashboard },
  { id: 'chat', label: 'AI Assistant', icon: MessageSquare, badge: 'AI' },
  { id: 'assets', label: 'Asset Intelligence', icon: Box },
  { id: 'graph', label: 'Knowledge Graph', icon: Network },
  { id: 'compliance', label: 'Compliance Center', icon: ShieldCheck, badgeCount: 3, badgeType: 'warning' as const },
];

const secondaryItems = [
  { id: 'maintenance', label: 'Maintenance Hub', icon: Wrench },
  { id: 'failures', label: 'Failure Analysis', icon: Activity },
  { id: 'experts', label: 'Expert Network', icon: Users },
  { id: 'documents', label: 'Document Vault', icon: FileText },
];

export default function Sidebar({ activeTab, onTabChange, isMobileOpen }: SidebarProps) {
  return (
    <div className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon">IQ</div>
        <div className="sidebar-logo-text">
          <h1>IndustrialIQ</h1>
          <span>Knowledge OS</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="sidebar-nav">
        <div className="sidebar-section-label">Core Modules</div>
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => onTabChange(item.id)}
          >
            <item.icon className="sidebar-item-icon" size={18} />
            <span>{item.label}</span>
            {item.badge && (
              <span className="sidebar-badge" style={{
                background: 'linear-gradient(135deg, #3b82f6, #8b5cf6)',
                fontSize: '9px',
                padding: '2px 6px',
              }}>
                {item.badge}
              </span>
            )}
            {item.badgeCount && (
              <span className={`sidebar-badge ${item.badgeType || ''}`}>
                {item.badgeCount}
              </span>
            )}
          </div>
        ))}

        <div className="sidebar-section-label" style={{ marginTop: '8px' }}>Operations</div>
        {secondaryItems.map((item) => (
          <div
            key={item.id}
            className={`sidebar-item ${activeTab === item.id ? 'active' : ''}`}
            onClick={() => onTabChange(item.id)}
          >
            <item.icon className="sidebar-item-icon" size={18} />
            <span>{item.label}</span>
          </div>
        ))}
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div className="sidebar-user">
          <div className="sidebar-user-avatar">VP</div>
          <div className="sidebar-user-info">
            <div className="sidebar-user-name">Vikram Patel</div>
            <div className="sidebar-user-role">Plant Head · BharatChem</div>
          </div>
        </div>
      </div>
    </div>
  );
}
