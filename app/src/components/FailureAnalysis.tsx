'use client';

import React, { useState } from 'react';
import { 
  Activity, AlertTriangle, TrendingUp, Search, Clock, Users, Wrench, 
  FileText, ShieldAlert, Cpu, Lightbulb, CheckCircle2, ArrowRight,
  Plus, Calendar
} from 'lucide-react';

interface FailureAnalysisProps {
  addToast?: (type: 'success' | 'error' | 'info', title: string, message: string) => void;
}

export default function FailureAnalysis({ addToast }: FailureAnalysisProps) {
  const anomalies = [
    { 
      id: 'ANM-902',
      asset: 'Main Feed Pump (P-101A)', 
      type: 'Vibration Spike (1x RPM)', 
      probability: '94%', 
      impact: 'High', 
      status: 'Investigating',
      severity: 'Critical',
      rul: 'Est. 48 Hours',
      assignedTo: 'Vikram Patel',
      maintenanceStatus: 'Pending Review',
      action: 'Inspect DE Bearing',
      time: '2 hours ago'
    },
    { 
      id: 'ANM-903',
      asset: 'BOG Compressor (C-202)', 
      type: 'Discharge Temp Rise', 
      probability: '82%', 
      impact: 'Medium', 
      status: 'Matched DNA',
      severity: 'Warning',
      rul: 'Est. 12 Days',
      assignedTo: 'Sarah Connor',
      maintenanceStatus: 'WO Planned',
      action: 'Check Cooling Water Flow',
      time: '1 day ago'
    },
    { 
      id: 'ANM-904',
      asset: 'Control Valve (V-404)', 
      type: 'Flow Fluctuation', 
      probability: '65%', 
      impact: 'Low', 
      status: 'Monitoring',
      severity: 'Info',
      rul: 'Est. 3 Months',
      assignedTo: 'Unassigned',
      maintenanceStatus: 'No Action Required',
      action: 'Continue Monitoring',
      time: '3 days ago'
    },
  ];

  const timelineEvents = [
    { date: 'Oct 12, 08:00 AM', title: 'Baseline Established', desc: 'Vibration at 1.2 mm/s. Within normal operating limits.', type: 'info' },
    { date: 'Oct 15, 14:30 PM', title: 'Warning Threshold Reached', desc: 'Vibration increased to 4.5 mm/s. PlantBrain anomaly detected.', type: 'warning' },
    { date: 'Oct 16, 09:15 AM', title: 'Failure DNA Matched', desc: 'Signature matches FD-882 (Bearing Wear). Confidence: 94%.', type: 'critical' },
    { date: 'Today, 10:00 AM', title: 'Critical Threshold Breach', desc: 'Vibration at 7.8 mm/s. RUL downgraded to 48 hours.', type: 'critical' },
  ];

  const similarIncidents = [
    { date: 'Mar 2024', asset: 'Pump P-101B', resolution: 'Replaced DE Bearing and balanced impeller.', downtime: '12h', cost: '₹1.2L' },
    { date: 'Nov 2023', asset: 'Pump P-102A', resolution: 'Replaced complete bearing housing assembly.', downtime: '18h', cost: '₹2.8L' },
  ];

  const workOrder = {
    priority: 'Urgent',
    downtime: '6 Hours',
    parts: ['SKF 6316-2Z (DE Bearing) - In Stock', 'Bearing Housing Gasket - In Stock'],
    cost: '₹1,45,000',
    team: 'Mechanical (Team Alpha)'
  };

  const [selectedId, setSelectedId] = useState(anomalies[0].id);

  const selectedAnomaly = anomalies.find(a => a.id === selectedId)!;

  const handleGenerateWO = () => {
    if (addToast) {
      addToast('success', 'Work Order Generated', `WO-2026-8942 created for ${selectedAnomaly.asset} and synced to ERP.`);
    }
  };

  return (
    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '24px', height: '100%' }}>
      
      {/* Header */}
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Reliability Intelligence Workspace
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
          Failure progression tracking, root cause analysis, and APM decision support.
        </p>
      </div>

      {/* Master-Detail Layout */}
      <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px', flex: 1, minHeight: 0 }}>
        
        {/* Left Column: Anomaly Inbox */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div className="card" style={{ flex: 1, display: 'flex', flexDirection: 'column', overflow: 'hidden' }}>
            <div className="card-header" style={{ paddingBottom: '12px', borderBottom: '1px solid var(--border-color)' }}>
              <div className="card-title"><Activity size={16} className="text-muted" /> Active Anomalies</div>
              <div className="badge badge-warning">3</div>
            </div>
            <div style={{ padding: '12px', display: 'flex', gap: '8px' }}>
              <div className="search-bar" style={{ flex: 1 }}>
                <Search size={14} className="search-bar-icon" />
                <input type="text" placeholder="Search anomalies..." style={{ width: '100%' }} />
              </div>
            </div>
            
            <div style={{ flex: 1, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '2px', padding: '0 8px 8px 8px' }}>
              {anomalies.map((anomaly) => (
                <div 
                  key={anomaly.id} 
                  onClick={() => setSelectedId(anomaly.id)}
                  style={{ 
                    display: 'flex', flexDirection: 'column', gap: '8px',
                    padding: '12px', borderRadius: 'var(--radius-md)', cursor: 'pointer',
                    background: selectedId === anomaly.id ? 'var(--bg-tertiary)' : 'transparent',
                    borderTop: selectedId === anomaly.id ? '1px solid var(--border-color)' : '1px solid transparent',
                    borderRight: selectedId === anomaly.id ? '1px solid var(--border-color)' : '1px solid transparent',
                    borderBottom: selectedId === anomaly.id ? '1px solid var(--border-color)' : '1px solid transparent',
                    borderLeft: `3px solid ${anomaly.impact === 'High' ? 'var(--status-critical)' : anomaly.impact === 'Medium' ? 'var(--status-warning)' : 'var(--status-info)'}`,
                    transition: 'all 0.2s ease'
                  }}
                  className="hover-bg-tertiary"
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                    <div style={{ fontWeight: 600, fontSize: '13px', color: 'var(--text-primary)' }}>{anomaly.asset}</div>
                    <span className={`badge ${anomaly.severity === 'Critical' ? 'badge-critical' : anomaly.severity === 'Warning' ? 'badge-warning' : 'badge-info'}`} style={{ fontSize: '10px' }}>
                      {anomaly.severity}
                    </span>
                  </div>
                  <div style={{ fontSize: '12px', color: 'var(--text-secondary)' }}>{anomaly.type}</div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '4px' }}>
                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '4px' }}>
                      <Clock size={10} /> {anomaly.rul}
                    </div>
                    <div style={{ fontSize: '11px', fontWeight: 600, color: 'var(--accent-primary)' }}>
                      {anomaly.probability} Match
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column: Deep-Dive Workspace */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', overflowY: 'auto', paddingRight: '8px' }}>
          
          {/* Header of Workspace */}
          <div className="card" style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <span className={`badge ${selectedAnomaly.severity === 'Critical' ? 'badge-critical' : selectedAnomaly.severity === 'Warning' ? 'badge-warning' : 'badge-info'}`}>
                  {selectedAnomaly.id}
                </span>
                <h3 style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', margin: 0 }}>
                  {selectedAnomaly.asset} — {selectedAnomaly.type}
                </h3>
              </div>
              <div style={{ display: 'flex', gap: '16px', fontSize: '12px', color: 'var(--text-tertiary)' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Users size={14} /> Assigned: {selectedAnomaly.assignedTo}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Wrench size={14} /> Status: {selectedAnomaly.maintenanceStatus}</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={14} /> Detected: {selectedAnomaly.time}</span>
              </div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>Remaining Useful Life (RUL)</div>
              <div style={{ fontSize: '24px', fontWeight: 800, color: selectedAnomaly.severity === 'Critical' ? 'var(--status-critical)' : selectedAnomaly.severity === 'Warning' ? 'var(--status-warning)' : 'var(--status-info)' }}>
                {selectedAnomaly.rul}
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1.5fr', gap: '20px' }}>
            
            {/* Left Panel Group */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* AI Engineering Recommendation */}
              <div className="card" style={{ background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.05) 0%, transparent 100%)', borderColor: 'rgba(59, 130, 246, 0.2)' }}>
                <div className="card-header">
                  <div className="card-title" style={{ color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Lightbulb size={16} /> AI Engineering Diagnosis
                  </div>
                  <span className="badge badge-success">Confidence: {selectedAnomaly.probability}</span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Likely Root Cause</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)' }}>
                      Advanced Drive-End (DE) Bearing Wear leading to shaft misalignment.
                    </div>
                  </div>
                  
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Supporting Evidence</div>
                    <ul style={{ margin: 0, paddingLeft: '20px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.6 }}>
                      <li>Vibration spectrum exhibits dominant 1x RPM peak indicating unbalance/misalignment.</li>
                      <li>Bearing housing temperature increased by 8°C over the last 48 hours.</li>
                      <li>Historical Failure DNA matches pattern FD-882 exactly.</li>
                    </ul>
                  </div>

                  <div style={{ padding: '16px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: 'var(--radius-md)', border: '1px solid rgba(59, 130, 246, 0.2)' }}>
                    <div style={{ fontSize: '11px', color: 'var(--accent-primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '8px' }}>Recommended Action</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-primary)', lineHeight: 1.5 }}>
                      <strong>Immediate:</strong> Reduce load by 20% to extend RUL.<br/>
                      <strong>Planned:</strong> Schedule maintenance for bearing replacement within next 48 hours to prevent catastrophic functional failure.
                    </div>
                  </div>
                  
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '6px' }}>Relevant Engineering Documents</div>
                    <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                      <span className="badge badge-neutral" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}><FileText size={10} /> SOP-MECH-042 (Bearing Replacement)</span>
                      <span className="badge badge-neutral" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}><FileText size={10} /> P&ID-U2-CW-01</span>
                      <span className="badge badge-neutral" style={{ display: 'flex', gap: '4px', alignItems: 'center' }}><FileText size={10} /> OEM Manual - Flowserve Pump</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Historical Similar Incidents */}
              <div className="card">
                <div className="card-header">
                  <div className="card-title"><Activity size={14} /> Historical Similar Incidents</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {similarIncidents.map((inc, i) => (
                    <div key={i} style={{ 
                      padding: '12px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)',
                      borderLeft: '2px solid var(--border-color)'
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                        <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{inc.asset}</span>
                        <span style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{inc.date}</span>
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--text-secondary)', marginBottom: '8px' }}>
                        <strong>Resolution:</strong> {inc.resolution}
                      </div>
                      <div style={{ display: 'flex', gap: '16px', fontSize: '11px', color: 'var(--text-tertiary)' }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><Clock size={12} /> Downtime: {inc.downtime}</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}><TrendingUp size={12} /> Cost: {inc.cost}</span>
                      </div>
                    </div>
                  ))}
                  <button className="btn btn-ghost" style={{ fontSize: '12px', width: '100%' }}>View All Related Incidents</button>
                </div>
              </div>

            </div>

            {/* Right Panel Group */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* Failure Progression Timeline */}
              <div className="card">
                <div className="card-header">
                  <div className="card-title"><Calendar size={14} /> Failure Progression Timeline</div>
                </div>
                <div className="timeline" style={{ marginTop: '12px' }}>
                  {timelineEvents.map((evt, i) => (
                    <div key={i} className="timeline-item">
                      <div className={`timeline-dot ${evt.type === 'critical' ? 'failure' : ''}`} style={{ 
                        background: evt.type === 'critical' ? 'var(--status-critical)' : evt.type === 'warning' ? 'var(--status-warning)' : 'var(--status-info)'
                      }} />
                      <div className="timeline-date">{evt.date}</div>
                      <div className="timeline-title" style={{ color: 'var(--text-primary)' }}>{evt.title}</div>
                      <div className="timeline-description">{evt.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommended Work Order */}
              <div className="card" style={{ border: '1px solid var(--accent-primary)' }}>
                <div className="card-header" style={{ borderBottom: '1px solid var(--border-color)', paddingBottom: '12px', marginBottom: '12px' }}>
                  <div className="card-title" style={{ color: 'var(--text-primary)' }}><Wrench size={14} /> Recommended Work Order</div>
                  <span className="badge badge-critical">Urgent</span>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '2px' }}>Est. Downtime</div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{workOrder.downtime}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '2px' }}>Est. Cost</div>
                      <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{workOrder.cost}</div>
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>Maintenance Team</div>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Users size={14} className="text-muted"/> {workOrder.team}
                    </div>
                  </div>

                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>Required Parts</div>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '12px', color: 'var(--text-secondary)' }}>
                      {workOrder.parts.map((p, i) => <li key={i}>{p}</li>)}
                    </ul>
                  </div>

                  <button className="btn btn-primary" style={{ width: '100%', marginTop: '8px', display: 'flex', justifyContent: 'center', gap: '8px' }} onClick={handleGenerateWO}>
                    <Plus size={16} /> Generate Work Order
                  </button>
                </div>
              </div>

            </div>

          </div>
        </div>

      </div>
    </div>
  );
}
