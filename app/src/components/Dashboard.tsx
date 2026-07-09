'use client';

import React, { useState } from 'react';
import {
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  Shield,
  Brain,
  Zap,
  Target,
  BarChart3,
  Clock,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Cpu,
  Database,
  GitBranch,
} from 'lucide-react';
import { plantKPIs, alerts as initialAlerts, assets } from '@/data/assets';
interface DashboardProps {
  addToast?: (type: 'success' | 'error' | 'info', title: string, message: string) => void;
}

export default function Dashboard({ addToast }: DashboardProps) {
  const [activeAlerts, setActiveAlerts] = useState(initialAlerts);
  const formatCurrency = (val: number) => {
    if (val >= 10000000) return `₹${(val / 10000000).toFixed(1)} Cr`;
    if (val >= 100000) return `₹${(val / 100000).toFixed(0)} L`;
    return `₹${val.toLocaleString()}`;
  };

  const kpis = [
    {
      label: 'Plant Health Index',
      value: `${plantKPIs.healthIndex}`,
      suffix: '/100',
      trend: `+${plantKPIs.healthTrend} vs last month`,
      trendType: 'positive' as string,
      gradient: true,
    },
    {
      label: 'Equipment Availability',
      value: `${plantKPIs.equipmentAvailability}`,
      suffix: '%',
      trend: 'Above target (92%)',
      trendType: 'positive' as string,
    },
    {
      label: 'Safety Index (TRIR)',
      value: `${plantKPIs.safetyIndex}`,
      suffix: '',
      trend: `${plantKPIs.safetyTrend} improving`,
      trendType: 'positive' as string,
    },
    {
      label: 'Compliance Score',
      value: `${plantKPIs.complianceScore}`,
      suffix: '%',
      trend: '3 gaps remaining',
      trendType: 'neutral' as string,
    },
    {
      label: 'Knowledge Coverage',
      value: `${plantKPIs.knowledgeCoverage}`,
      suffix: '%',
      trend: `+${plantKPIs.knowledgeTrend}% this month`,
      trendType: 'positive' as string,
    },
    {
      label: 'ROI This Quarter',
      value: formatCurrency(plantKPIs.financialImpact.totalQuarter),
      suffix: '',
      trend: `${Math.round(plantKPIs.financialImpact.totalQuarter / plantKPIs.financialImpact.platformCost)}x return`,
      trendType: 'positive' as string,
    },
  ];

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical': return '🔴';
      case 'warning': return '⚠️';
      case 'success': return '✅';
      case 'info': return '💡';
      default: return '📋';
    }
  };

  const formatTime = (ts: string) => {
    const date = new Date(ts);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHrs = Math.floor(diffMs / 3600000);
    if (diffHrs < 1) return 'Just now';
    if (diffHrs < 24) return `${diffHrs}h ago`;
    return `${Math.floor(diffHrs / 24)}d ago`;
  };

  const criticalAssets = assets.filter(a => a.healthScore < 70).sort((a, b) => a.healthScore - b.healthScore);

  return (
    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* KPI Grid */}
      <div className="kpi-grid">
        {kpis.map((kpi, i) => (
          <div key={i} className="kpi-card" style={{ animationDelay: `${i * 50}ms` }}>
            <div className="kpi-label">{kpi.label}</div>
            <div className={`kpi-value ${kpi.gradient ? 'gradient' : ''}`}>
              {kpi.value}
              {kpi.suffix && (
                <span style={{ fontSize: '16px', fontWeight: 500, color: 'var(--text-tertiary)', marginLeft: '2px' }}>
                  {kpi.suffix}
                </span>
              )}
            </div>
            <div className={`kpi-trend ${kpi.trendType}`}>
              {kpi.trendType === 'positive' && <TrendingUp size={12} />}
              {kpi.trendType === 'negative' && <TrendingDown size={12} />}
              {kpi.trend}
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* Left: Proactive Intelligence */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Brain size={16} style={{ color: 'var(--accent-secondary)' }} />
              Proactive Intelligence
            </div>
            <div className="badge badge-info" style={{ fontSize: '10px' }}>
              <Zap size={10} /> Live
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {activeAlerts.map((alert) => (
              <div key={alert.id} className={`alert-card ${alert.type}`}>
                <div className="alert-header">
                  <div className="alert-icon">{getAlertIcon(alert.type)}</div>
                  <div className="alert-title">{alert.title}</div>
                  <div className="alert-meta">{formatTime(alert.timestamp)}</div>
                </div>
                <div className="alert-description">{alert.description}</div>
                {alert.confidence && (
                  <div className="alert-confidence">
                    <div className="alert-confidence-badge">
                      <Target size={10} />
                      {Math.round(alert.confidence * 100)}% confidence
                    </div>
                    <span>Source: {alert.source}</span>
                  </div>
                )}
                <div className="alert-actions">
                  {alert.actions.map((action, i) => (
                    <button 
                      key={i} 
                      className={`btn btn-${action.type === 'primary' ? 'primary' : action.type === 'danger' ? 'danger' : 'secondary'}`}
                      onClick={() => {
                        if (action.label === 'Dismiss') {
                          setActiveAlerts(activeAlerts.filter(a => a.id !== alert.id));
                          if (addToast) addToast('info', 'Alert Dismissed', `Dismissed alert: ${alert.title}`);
                        } else if (action.label.includes('Work Order') || action.label.includes('Inspection') || action.label.includes('Check')) {
                          const priority = window.prompt(`Set priority for Work Order related to ${alert.title} (High, Medium, Low):`, 'High');
                          if (priority) {
                            if (addToast) addToast('success', 'Work Order Created', `Created ${priority} priority work order for ${alert.title}`);
                            setActiveAlerts(activeAlerts.filter(a => a.id !== alert.id));
                          }
                        } else if (action.label.includes('Analysis') || action.label.includes('DNA')) {
                          window.alert(`Analysis Report for ${alert.title}\n\nConfidence: ${alert.confidence ? Math.round(alert.confidence*100) : 90}%\nSource: ${alert.source || 'AI Agent'}\n\nDetailed breakdown of the anomaly indicates immediate attention is required. Review recommended procedures.`);
                          if (addToast) addToast('info', 'Analysis Viewed', `Viewed analysis for ${alert.title}`);
                        } else if (action.label.includes('Expert') || action.label.includes('Knowledge')) {
                          window.alert(`Knowledge Capture for ${alert.title}\n\nInitiating knowledge extraction protocol. Connecting to Expert Network profiles...`);
                          if (addToast) addToast('info', 'Action Triggered', `Triggered ${action.label}`);
                        } else {
                          if (addToast) addToast('info', 'Action Triggered', `Triggered ${action.label} for ${alert.title}`);
                        }
                      }}
                    >
                      {action.label}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Critical Assets */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <AlertTriangle size={16} style={{ color: 'var(--status-warning)' }} />
                Critical Assets
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {criticalAssets.map((asset) => (
                <div key={asset.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 14px',
                  background: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-md)',
                  border: '1px solid var(--border-primary)',
                  cursor: 'pointer',
                  transition: 'all var(--transition-fast)',
                }}>
                  <div className={`criticality-badge ${asset.criticality}`}>{asset.criticality}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      {asset.tag} — {asset.name}
                    </div>
                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                      {asset.unit} · {asset.location}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{
                      fontSize: '18px',
                      fontWeight: 800,
                      color: asset.healthScore < 60 ? 'var(--status-critical)' : 'var(--status-warning)',
                    }}>
                      {asset.healthScore}%
                    </div>
                    <div style={{ fontSize: '10px', color: 'var(--text-muted)' }}>Health</div>
                  </div>
                </div>
              ))}
              {criticalAssets.length === 0 && (
                <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)', fontSize: '13px' }}>
                  No critical assets — all systems healthy
                </div>
              )}
            </div>
          </div>

          {/* Knowledge Brain Stats */}
          <div className="card" style={{
            background: 'linear-gradient(145deg, rgba(139, 92, 246, 0.08) 0%, rgba(59, 130, 246, 0.05) 100%)',
            borderColor: 'rgba(139, 92, 246, 0.2)',
          }}>
            <div className="card-header">
              <div className="card-title">
                <Database size={16} style={{ color: 'var(--accent-secondary)' }} />
                Knowledge Brain
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
              {[
                { label: 'Engineer-Years', value: plantKPIs.knowledgeStats.engineerYears.toLocaleString(), icon: '🧠' },
                { label: 'Failure Patterns', value: plantKPIs.knowledgeStats.failurePatterns.toString(), icon: '🧬' },
                { label: 'Graph Nodes', value: `${(plantKPIs.knowledgeStats.graphNodes / 1000).toFixed(1)}K`, icon: '🕸️' },
                { label: 'Documents', value: `${(plantKPIs.knowledgeStats.documentsIngested / 1000).toFixed(1)}K`, icon: '📄' },
                { label: 'Procedures', value: plantKPIs.knowledgeStats.proceduresLinked.toLocaleString(), icon: '📋' },
                { label: 'Tribal Knowledge', value: plantKPIs.knowledgeStats.tribalKnowledgeEntries.toString(), icon: '💡' },
              ].map((stat, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px',
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: 'var(--radius-md)',
                }}>
                  <span style={{ fontSize: '18px' }}>{stat.icon}</span>
                  <div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>{stat.value}</div>
                    <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px' }}>{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Financial Impact */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <BarChart3 size={16} style={{ color: 'var(--status-success)' }} />
                Quarterly Impact
              </div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {[
                { label: 'Downtime Avoided', value: plantKPIs.financialImpact.downtimeAvoided, color: 'var(--status-success)' },
                { label: 'Cost Reduction', value: plantKPIs.financialImpact.costReduction, color: 'var(--accent-primary)' },
                { label: 'Compliance Saved', value: plantKPIs.financialImpact.complianceSaved, color: 'var(--status-warning)' },
                { label: 'Efficiency Gains', value: plantKPIs.financialImpact.efficiencyGains, color: 'var(--accent-secondary)' },
              ].map((item, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{
                    width: '4px',
                    height: '28px',
                    borderRadius: '2px',
                    background: item.color,
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{item.label}</div>
                    <div style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>{formatCurrency(item.value)}</div>
                  </div>
                </div>
              ))}
              <div style={{
                marginTop: '8px',
                padding: '12px',
                background: 'var(--status-success-bg)',
                border: '1px solid var(--status-success-border)',
                borderRadius: 'var(--radius-md)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}>
                <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--status-success)' }}>Total ROI</span>
                <span style={{ fontSize: '20px', fontWeight: 800, color: 'var(--status-success)' }}>
                  {formatCurrency(plantKPIs.financialImpact.totalQuarter)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
