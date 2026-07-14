'use client';

import React, { useState } from 'react';
import {
  ShieldCheck,
  AlertTriangle,
  CheckCircle2,
  Clock,
  XCircle,
  FileText,
  Download,
  Calendar,
  ChevronRight,
} from 'lucide-react';
import { complianceItems } from '@/data/assets';
import Modal from '@/components/Modal';

interface ComplianceCenterProps {
  addToast?: (type: 'success' | 'error' | 'info', title: string, message: string) => void;
}

export default function ComplianceCenter({ addToast }: ComplianceCenterProps) {
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const overallScore = Math.round(complianceItems.reduce((sum, c) => sum + c.score, 0) / complianceItems.length);
  const totalGaps = complianceItems.reduce((sum, c) => sum + c.gaps, 0);
  const overdueItems = complianceItems.filter(c => c.status === 'Overdue');
  const upcomingItems = complianceItems.filter(c => c.status === 'Upcoming');

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Compliant': return <CheckCircle2 size={16} style={{ color: 'var(--status-success)' }} />;
      case 'Gap': return <AlertTriangle size={16} style={{ color: 'var(--status-warning)' }} />;
      case 'Overdue': return <XCircle size={16} style={{ color: 'var(--status-critical)' }} />;
      case 'Upcoming': return <Clock size={16} style={{ color: 'var(--status-info)' }} />;
      default: return null;
    }
  };

  const getScoreColor = (score: number) => {
    if (score >= 95) return 'var(--status-success)';
    if (score >= 85) return 'var(--status-warning)';
    return 'var(--status-critical)';
  };

  return (
    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Compliance Center
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
          Continuous regulatory monitoring · Proactive gap detection · Audit-ready packages
        </p>
      </div>

      {/* Summary KPIs */}
      <div className="kpi-grid" style={{ gridTemplateColumns: 'repeat(4, 1fr)' }}>
        <div className="kpi-card">
          <div className="kpi-label">Overall Compliance</div>
          <div className="kpi-value" style={{ color: getScoreColor(overallScore) }}>{overallScore}%</div>
          <div className="progress-bar" style={{ marginTop: '8px' }}>
            <div className={`progress-bar-fill ${overallScore >= 90 ? 'good' : overallScore >= 80 ? 'warning' : 'critical'}`} style={{ width: `${overallScore}%` }} />
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Active Gaps</div>
          <div className="kpi-value" style={{ color: totalGaps > 0 ? 'var(--status-warning)' : 'var(--status-success)' }}>{totalGaps}</div>
          <div className="kpi-trend neutral">{totalGaps > 0 ? 'Action required' : 'All clear'}</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Overdue Items</div>
          <div className="kpi-value" style={{ color: overdueItems.length > 0 ? 'var(--status-critical)' : 'var(--status-success)' }}>{overdueItems.length}</div>
          <div className={`kpi-trend ${overdueItems.length > 0 ? 'negative' : 'positive'}`}>
            {overdueItems.length > 0 ? 'Immediate attention' : 'No overdue items'}
          </div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Upcoming Deadlines</div>
          <div className="kpi-value" style={{ color: 'var(--accent-primary)' }}>{upcomingItems.length}</div>
          <div className="kpi-trend neutral">Next 90 days</div>
        </div>
      </div>

      {/* Critical Gaps Alert */}
      {(overdueItems.length > 0 || complianceItems.some(c => c.gaps > 0)) && (
        <div className="alert-card critical">
          <div className="alert-header">
            <div className="alert-icon">🔴</div>
            <div className="alert-title">Critical Compliance Gaps Detected</div>
          </div>
          <div className="alert-description" style={{ marginLeft: '36px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', marginTop: '8px' }}>
              {complianceItems.filter(c => c.status === 'Overdue' || c.gaps > 0).map((item) => (
                <div key={item.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '8px 12px',
                  background: 'rgba(0,0,0,0.2)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '12px',
                }}>
                  {getStatusIcon(item.status)}
                  <span style={{ fontWeight: 600, color: 'var(--text-primary)', minWidth: '100px' }}>{item.regulation}</span>
                  <span style={{ flex: 1, color: 'var(--text-secondary)' }}>
                    {item.gaps} gap{item.gaps !== 1 ? 's' : ''} — {item.description}
                  </span>
                  {item.status === 'Overdue' && (
                    <span className="badge badge-critical" style={{ fontSize: '10px' }}>OVERDUE</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Regulation Cards */}
      <div className="compliance-grid">
        {complianceItems.map((item) => (
          <div key={item.id} className="compliance-card" style={{
            borderColor: item.status === 'Overdue' ? 'var(--status-critical-border)' :
                         item.status === 'Gap' ? 'var(--status-warning-border)' : 'var(--border-primary)',
          }}>
            <div className="compliance-card-header">
              <div>
                <div className="compliance-regulation">{item.regulation}</div>
                <div className="compliance-clause">{item.clause}</div>
              </div>
              {getStatusIcon(item.status)}
            </div>

            <div className="compliance-score">
              <div className="compliance-score-value" style={{ color: getScoreColor(item.score) }}>
                {item.score}%
              </div>
              <div style={{ flex: 1 }}>
                <div className="progress-bar">
                  <div
                    className={`progress-bar-fill ${item.score >= 95 ? 'good' : item.score >= 85 ? 'warning' : 'critical'}`}
                    style={{ width: `${item.score}%` }}
                  />
                </div>
              </div>
            </div>

            <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '12px' }}>
              {item.description}
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '11px' }}>
              <div style={{ display: 'flex', gap: '12px' }}>
                <span style={{ color: item.gaps > 0 ? 'var(--status-warning)' : 'var(--text-muted)' }}>
                  {item.gaps} gap{item.gaps !== 1 ? 's' : ''}
                </span>
                <span style={{ color: 'var(--text-muted)' }}>
                  {item.evidence.length} evidence items
                </span>
              </div>
              {item.nextDeadline && (
                <span style={{
                  color: item.status === 'Overdue' ? 'var(--status-critical)' : 'var(--text-tertiary)',
                  fontWeight: item.status === 'Overdue' ? 600 : 400,
                  display: 'flex',
                  alignItems: 'center',
                  gap: '4px',
                }}>
                  <Calendar size={10} />
                  {item.status === 'Overdue' ? 'OVERDUE since ' : 'Due: '}
                  {new Date(item.nextDeadline).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}
                </span>
              )}
            </div>

            {/* Evidence */}
            <div className="compliance-gaps">
              <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>
                Evidence Documents
              </div>
              {item.evidence.map((ev, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '6px 0',
                  fontSize: '12px',
                  color: 'var(--text-secondary)',
                  borderBottom: i < item.evidence.length - 1 ? '1px solid var(--border-primary)' : 'none',
                }}>
                  <FileText size={12} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                  <span style={{ flex: 1 }}>{ev}</span>
                  <CheckCircle2 size={12} style={{ color: 'var(--status-success)' }} />
                </div>
              ))}
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
              <button 
                className="btn btn-secondary" 
                style={{ fontSize: '11px', flex: 1 }}
                onClick={() => {
                  setSelectedItem(item);
                  if (addToast) addToast('info', 'Viewing Details', `Opened compliance details for ${item.regulation}...`);
                }}
              >
                <FileText size={12} /> View Details
              </button>
              <button 
                className="btn btn-primary" 
                style={{ fontSize: '11px', flex: 1 }}
                onClick={() => {
                  if (addToast) addToast('success', 'Export Started', `Packaging audit evidence for ${item.regulation}. Download starting...`);
                  
                  // Simulate an actual file download for the MVP
                  const content = `AUDIT EXPORT: ${item.regulation}\nGenerated on: ${new Date().toISOString()}\n\nStatus: ${item.status}\nScore: ${item.score}%\n\nDocuments Included:\n${item.evidence.map(e => '[ATTACHED] ' + e).join('\n')}\n\n--- END OF REPORT ---`;
                  const blob = new Blob([content], { type: 'text/plain' });
                  const url = URL.createObjectURL(blob);
                  const a = document.createElement('a');
                  a.href = url;
                  a.download = `${item.regulation.replace(/[^a-zA-Z0-9]/g, '_')}_Audit_Package.txt`;
                  document.body.appendChild(a);
                  a.click();
                  document.body.removeChild(a);
                  URL.revokeObjectURL(url);
                }}
              >
                <Download size={12} /> Export Package
              </button>
            </div>
          </div>
        ))}
      </div>

      <Modal 
        isOpen={!!selectedItem} 
        onClose={() => setSelectedItem(null)} 
        title={`Compliance Details: ${selectedItem?.regulation}`}
      >
        {selectedItem && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div style={{ display: 'flex', gap: '16px' }}>
              <div style={{ flex: 1, padding: '12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Status</div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: getScoreColor(selectedItem.score), display: 'flex', alignItems: 'center', gap: '6px' }}>
                  {getStatusIcon(selectedItem.status)} {selectedItem.status}
                </div>
              </div>
              <div style={{ flex: 1, padding: '12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Score</div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: 'var(--text-primary)' }}>{selectedItem.score}%</div>
              </div>
              <div style={{ flex: 1, padding: '12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>Gaps</div>
                <div style={{ fontSize: '15px', fontWeight: 600, color: selectedItem.gaps > 0 ? 'var(--status-warning)' : 'var(--text-primary)' }}>{selectedItem.gaps}</div>
              </div>
            </div>

            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>Clause</div>
              <div style={{ fontSize: '14px', color: 'var(--text-primary)' }}>{selectedItem.clause}</div>
            </div>

            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '4px' }}>Description</div>
              <div style={{ fontSize: '14px', color: 'var(--text-primary)', lineHeight: '1.5' }}>{selectedItem.description}</div>
            </div>

            <div>
              <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '8px' }}>Evidence Documents</div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                {selectedItem.evidence.map((e: string, i: number) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                    <FileText size={14} style={{ color: 'var(--accent-primary)' }} />
                    <span style={{ fontSize: '13px', color: 'var(--text-primary)', flex: 1 }}>{e}</span>
                    <CheckCircle2 size={14} style={{ color: 'var(--status-success)' }} />
                  </div>
                ))}
              </div>
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: '12px' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedItem(null)}>Close</button>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
