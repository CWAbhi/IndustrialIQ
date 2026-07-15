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
  BrainCircuit,
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  isMobileOpen?: boolean;
}

const navItems = [
  { id: 'dashboard', label: 'Operations Command Center', icon: LayoutDashboard },
  { id: 'chat', label: 'Expert Copilot', icon: MessageSquare, badge: 'AI' },
  { id: 'assets', label: 'Asset Performance Center', icon: Box },
  { id: 'graph', label: 'Knowledge Intelligence', icon: Network },
  { id: 'compliance', label: 'Governance & Compliance', icon: ShieldCheck, badgeCount: 3, badgeType: 'warning' as const },
];

const secondaryItems = [
  { id: 'maintenance', label: 'Maintenance Operations', icon: Wrench },
  { id: 'failures', label: 'Reliability Intelligence', icon: Activity },
  { id: 'experts', label: 'Engineering Expertise', icon: Users },
  { id: 'documents', label: 'Engineering Documents', icon: FileText },
];

export default function Sidebar({ activeTab, onTabChange, isMobileOpen }: SidebarProps) {
  return (
    <div className={`sidebar ${isMobileOpen ? 'mobile-open' : ''}`}>
      {/* Logo */}
      <div className="sidebar-logo">
        <div className="sidebar-logo-icon"><BrainCircuit size={22} color="white" /></div>
        <div className="sidebar-logo-text">
          <h1>PlantBrain</h1>
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
