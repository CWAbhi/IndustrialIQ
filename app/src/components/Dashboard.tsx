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
import Modal from '@/components/Modal';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell, LineChart, Line, CartesianGrid, PieChart, Pie } from 'recharts';

interface DashboardProps {
  addToast?: (type: 'success' | 'error' | 'info', title: string, message: string) => void;
}

export default function Dashboard({ addToast }: DashboardProps) {
  const [activeAlerts, setActiveAlerts] = useState(initialAlerts);
  const [selectedKpi, setSelectedKpi] = useState<any>(null);
  const [modalContent, setModalContent] = useState<{title: string, body: React.ReactNode} | null>(null);

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
      data: [{name: 'Jan', val: 82}, {name: 'Feb', val: 85}, {name: 'Mar', val: 88}, {name: 'Apr', val: plantKPIs.healthIndex}]
    },
    {
      label: 'Equipment Availability',
      value: `${plantKPIs.equipmentAvailability}`,
      suffix: '%',
      trend: 'Above target (92%)',
      trendType: 'positive' as string,
      data: [{name: 'Jan', val: 91}, {name: 'Feb', val: 93}, {name: 'Mar', val: 94}, {name: 'Apr', val: plantKPIs.equipmentAvailability}]
    },
    {
      label: 'Safety Index (TRIR)',
      value: `${plantKPIs.safetyIndex}`,
      suffix: '',
      trend: `${plantKPIs.safetyTrend} improving`,
      trendType: 'positive' as string,
      data: [{name: 'Jan', val: 1.2}, {name: 'Feb', val: 1.1}, {name: 'Mar', val: 0.9}, {name: 'Apr', val: plantKPIs.safetyIndex}]
    },
    {
      label: 'Compliance Score',
      value: `${plantKPIs.complianceScore}`,
      suffix: '%',
      trend: '3 gaps remaining',
      trendType: 'neutral' as string,
      data: [{name: 'Jan', val: 88}, {name: 'Feb', val: 88}, {name: 'Mar', val: 92}, {name: 'Apr', val: plantKPIs.complianceScore}]
    },
    {
      label: 'Knowledge Coverage',
      value: `${plantKPIs.knowledgeCoverage}`,
      suffix: '%',
      trend: `+${plantKPIs.knowledgeTrend}% this month`,
      trendType: 'positive' as string,
      data: [{name: 'Jan', val: 40}, {name: 'Feb', val: 55}, {name: 'Mar', val: 68}, {name: 'Apr', val: plantKPIs.knowledgeCoverage}]
    },
    {
      label: 'ROI This Quarter',
      value: formatCurrency(plantKPIs.financialImpact.totalQuarter),
      suffix: '',
      trend: `${Math.round(plantKPIs.financialImpact.totalQuarter / plantKPIs.financialImpact.platformCost)}x return`,
      trendType: 'positive' as string,
      data: [{name: 'Jan', val: 1200000}, {name: 'Feb', val: 1800000}, {name: 'Mar', val: 2500000}, {name: 'Apr', val: plantKPIs.financialImpact.totalQuarter}]
    },
  ];

  const impactData = [
    { name: 'Downtime', value: plantKPIs.financialImpact.downtimeAvoided, fill: '#10b981' },
    { name: 'Cost', value: plantKPIs.financialImpact.costReduction, fill: '#3b82f6' },
    { name: 'Compliance', value: plantKPIs.financialImpact.complianceSaved, fill: '#f59e0b' },
    { name: 'Efficiency', value: plantKPIs.financialImpact.efficiencyGains, fill: '#8b5cf6' },
  ];

  const pieData = [
    { name: 'Healthy', value: 65, fill: '#10b981' },
    { name: 'Warning', value: 25, fill: '#f59e0b' },
    { name: 'Critical', value: 10, fill: '#ef4444' },
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
          <div 
            key={i} 
            className="kpi-card hover-effect" 
            style={{ animationDelay: `${i * 50}ms`, cursor: 'pointer' }}
            onClick={() => setSelectedKpi(kpi)}
          >
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
                          setModalContent({
                            title: `Create Work Order for ${alert.title}`,
                            body: (
                              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                                <p>Select priority level to dispatch the work order.</p>
                                <div style={{ display: 'flex', gap: '10px' }}>
                                  <button className="btn btn-danger" onClick={() => {
                                    if (addToast) addToast('success', 'Work Order Created', `Created High priority work order.`);
                                    setActiveAlerts(activeAlerts.filter(a => a.id !== alert.id));
                                    setModalContent(null);
                                  }}>High Priority</button>
                                  <button className="btn btn-secondary" onClick={() => {
                                    if (addToast) addToast('success', 'Work Order Created', `Created Medium priority work order.`);
                                    setActiveAlerts(activeAlerts.filter(a => a.id !== alert.id));
                                    setModalContent(null);
                                  }}>Medium</button>
                                  <button className="btn btn-secondary" onClick={() => {
                                    if (addToast) addToast('success', 'Work Order Created', `Created Low priority work order.`);
                                    setActiveAlerts(activeAlerts.filter(a => a.id !== alert.id));
                                    setModalContent(null);
                                  }}>Low</button>
                                </div>
                              </div>
                            )
                          });
                        } else if (action.label.includes('Analysis') || action.label.includes('DNA')) {
                          setModalContent({
                            title: `Analysis Report: ${alert.title}`,
                            body: (
                              <div>
                                <p><strong>Confidence:</strong> {alert.confidence ? Math.round(alert.confidence*100) : 90}%</p>
                                <p><strong>Source:</strong> {alert.source || 'AI Agent'}</p>
                                <hr style={{ margin: '16px 0', borderColor: 'var(--border-primary)' }}/>
                                <p>Detailed breakdown of the anomaly indicates immediate attention is required. Review recommended procedures in the Asset Intelligence module.</p>
                              </div>
                            )
                          });
                        } else if (action.label.includes('Expert') || action.label.includes('Knowledge')) {
                          setModalContent({
                            title: `Knowledge Capture for ${alert.title}`,
                            body: <p>Initiating knowledge extraction protocol. Connecting to Expert Network profiles...</p>
                          });
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
                      {asset.name} <span style={{ color: 'var(--text-tertiary)', fontWeight: 400 }}>({asset.tag})</span>
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

          {/* Financial Impact (Chart) */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <BarChart3 size={16} style={{ color: 'var(--status-success)' }} />
                Quarterly Impact
              </div>
            </div>
            <div style={{ height: '220px', marginTop: '16px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={impactData} margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
                  <XAxis dataKey="name" tick={{ fontSize: 12, fill: 'var(--text-tertiary)' }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    cursor={{ fill: 'rgba(255,255,255,0.05)' }} 
                    contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)', borderRadius: '8px' }} 
                    formatter={(value: any) => formatCurrency(Number(value))} 
                  />
                  <Bar dataKey="value" radius={[4, 4, 0, 0]}>
                    {
                      impactData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.fill} />
                      ))
                    }
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
            <div style={{
              marginTop: '16px',
              padding: '12px',
              background: 'var(--status-success-bg)',
              border: '1px solid var(--status-success-border)',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--status-success)' }}>Total ROI</span>
              <span style={{ fontSize: '22px', fontWeight: 800, color: 'var(--status-success)' }}>
                {formatCurrency(plantKPIs.financialImpact.totalQuarter)}
              </span>
            </div>
          </div>

          {/* Asset Health Distribution (Pie Chart) */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">
                <Target size={16} style={{ color: 'var(--accent-primary)' }} />
                Asset Health Distribution
              </div>
            </div>
            <div style={{ height: '220px', marginTop: '16px', display: 'flex', alignItems: 'center' }}>
              <ResponsiveContainer width="50%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {pieData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)', borderRadius: '8px' }}
                    itemStyle={{ color: 'var(--text-primary)' }}
                  />
                </PieChart>
              </ResponsiveContainer>
              <div style={{ width: '50%', paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {pieData.map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: item.fill }}></div>
                      <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{item.name}</span>
                    </div>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal isOpen={!!selectedKpi} onClose={() => setSelectedKpi(null)} title={`${selectedKpi?.label} Trend`}>
        {selectedKpi && (
          <div style={{ padding: '10px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
              <div>
                <div style={{ fontSize: '32px', fontWeight: 800 }}>{selectedKpi.value}{selectedKpi.suffix}</div>
                <div style={{ color: 'var(--status-success)', fontWeight: 500 }}>{selectedKpi.trend}</div>
              </div>
            </div>
            <div style={{ height: '250px' }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={selectedKpi.data} margin={{ top: 5, right: 20, bottom: 5, left: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="var(--border-primary)" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: 'var(--text-tertiary)' }} axisLine={false} tickLine={false} />
                  <YAxis tick={{ fill: 'var(--text-tertiary)' }} axisLine={false} tickLine={false} />
                  <Tooltip 
                    contentStyle={{ background: 'var(--bg-card)', border: '1px solid var(--border-primary)' }}
                  />
                  <Line type="monotone" dataKey="val" stroke="var(--accent-primary)" strokeWidth={3} dot={{ r: 4, fill: 'var(--accent-primary)' }} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
      </Modal>

      <Modal isOpen={!!modalContent} onClose={() => setModalContent(null)} title={modalContent?.title || ''}>
        {modalContent?.body}
      </Modal>
    </div>
  );
}
