'use client';

import React from 'react';
import { Activity, AlertTriangle, TrendingUp, Search } from 'lucide-react';
interface FailureAnalysisProps {
  addToast?: (type: 'success' | 'error' | 'info', title: string, message: string) => void;
}

export default function FailureAnalysis({ addToast }: FailureAnalysisProps) {
  const anomalies = [
    { asset: 'Pump P-101A', type: 'Vibration Spike', probability: '94%', impact: 'High', status: 'Investigating' },
    { asset: 'Compressor C-202', type: 'Temperature Rise', probability: '82%', impact: 'Medium', status: 'Matched DNA' },
    { asset: 'Valve V-404', type: 'Flow Fluctuation', probability: '65%', impact: 'Low', status: 'Monitoring' },
  ];

  return (
    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Failure Analysis
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
          Root cause analysis and Failure DNA matching
        </p>
      </div>

      <div className="grid-2">
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Activity size={16} className="text-muted" />
              Live Anomaly Detection
            </div>
            <div className="badge badge-warning">3 Active</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
            {anomalies.map((anomaly, i) => (
              <div key={i} style={{ 
                display: 'flex', alignItems: 'center', justifyContent: 'space-between', 
                padding: '12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)',
                borderLeft: `3px solid ${anomaly.impact === 'High' ? 'var(--status-critical)' : anomaly.impact === 'Medium' ? 'var(--status-warning)' : 'var(--status-info)'}`
              }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>{anomaly.asset}</div>
                  <div style={{ fontSize: '11px', color: 'var(--text-secondary)' }}>{anomaly.type}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, color: 'var(--accent-primary)', fontSize: '14px' }}>{anomaly.probability} Match</div>
                  <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', textTransform: 'uppercase' }}>{anomaly.status}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <TrendingUp size={16} className="text-muted" />
              Top Failure Modes
            </div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '16px' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px' }}>
                <span>Bearing Wear</span>
                <span style={{ fontWeight: 600 }}>38%</span>
              </div>
              <div style={{ height: '6px', background: 'var(--bg-tertiary)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '38%', background: 'var(--status-critical)' }}></div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px' }}>
                <span>Seal Leakage</span>
                <span style={{ fontWeight: 600 }}>24%</span>
              </div>
              <div style={{ height: '6px', background: 'var(--bg-tertiary)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '24%', background: 'var(--status-warning)' }}></div>
              </div>
            </div>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px', fontSize: '12px' }}>
                <span>Electrical Fault</span>
                <span style={{ fontWeight: 600 }}>18%</span>
              </div>
              <div style={{ height: '6px', background: 'var(--bg-tertiary)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '18%', background: 'var(--accent-primary)' }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
