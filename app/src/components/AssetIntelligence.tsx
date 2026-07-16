'use client';

import React, { useState } from 'react';
import {
  ArrowLeft,
  AlertTriangle,
  CheckCircle2,
  Clock,
  FileText,
  Wrench,
  TrendingUp,
  TrendingDown,
  Minus,
  ChevronRight,
  ExternalLink,
  Dna,
  Users,
  BookOpen,
  Package,
  Activity,
  ShieldAlert,
  Calendar,
  Settings,
  FileSearch,
  Link2,
  Lightbulb,
  BarChart3,
  Network
} from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
import { assets, failures, maintenanceEvents, failureDNAs, engineers } from '@/data/assets';

interface AssetIntelligenceProps {
  addToast?: (type: 'success' | 'error' | 'info', title: string, message: string) => void;
  onNavigate?: (tab: string) => void;
}

function HealthRing({ score, size = 80 }: { score: number; size?: number }) {
  const radius = (size - 12) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  const color = score >= 80 ? 'var(--status-success)' : score >= 60 ? 'var(--status-warning)' : 'var(--status-critical)';

  return (
    <div className="health-ring" style={{ width: size, height: size }}>
      <svg width={size} height={size}>
        <circle className="health-ring-bg" cx={size / 2} cy={size / 2} r={radius} />
        <circle
          className="health-ring-fill"
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={color}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
        />
      </svg>
      <div className="health-ring-value" style={{ color }}>{score}</div>
    </div>
  );
}

function AssetList({ onSelect }: { onSelect: (id: string) => void }) {
  return (
    <div className="page-content">
      <div style={{ marginBottom: '20px' }}>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Asset Performance Center
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
          {assets.length} assets monitored · Real-time health scoring · Predictive insights
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '16px' }}>
        {assets.map((asset) => (
          <div
            key={asset.id}
            className="card"
            style={{ cursor: 'pointer', transition: 'all var(--transition-base)' }}
            onClick={() => onSelect(asset.id)}
          >
            <div style={{ display: 'flex', gap: '16px' }}>
              <HealthRing score={asset.healthScore} size={64} />
              <div style={{ flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span className={`criticality-badge ${asset.criticality}`}>{asset.criticality}</span>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>{asset.name}</span>
                  <span style={{ fontSize: '14px', color: 'var(--text-tertiary)' }}>({asset.tag})</span>
                  <span className={`badge ${asset.status === 'Running' ? 'badge-success' : asset.status === 'Standby' ? 'badge-info' : asset.status === 'Under Maintenance' ? 'badge-warning' : 'badge-neutral'}`}>
                    {asset.status}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                  {asset.manufacturer} {asset.model} · {asset.unit}
                </div>
              </div>
              <ChevronRight size={16} style={{ color: 'var(--text-muted)', alignSelf: 'center' }} />
            </div>

            {/* Sensor warnings */}
            {asset.sensors.some(s => s.status !== 'normal') && (
              <div style={{ marginTop: '12px', display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
                {asset.sensors.filter(s => s.status !== 'normal').map((sensor, i) => (
                  <span key={i} className={`badge ${sensor.status === 'critical' ? 'badge-critical' : 'badge-warning'}`}>
                    <AlertTriangle size={10} />
                    {sensor.name}: {sensor.value} {sensor.unit}
                  </span>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function AssetDetail({ assetId, onBack, addToast, onNavigate }: { assetId: string; onBack: () => void } & AssetIntelligenceProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const asset = assets.find(a => a.id === assetId)!;
  const assetFailures = failures.filter(f => f.assetId === assetId);
  const assetMaintenance = maintenanceEvents.filter(m => m.assetId === assetId);
  const matchedDNA = failureDNAs.find(d => assetFailures.some(f => f.failureDnaId === d.id));
  const assetExperts = engineers.filter(e => e.assetsExpertise.includes(assetId));

  const tabs = ['overview', 'failures', 'maintenance', 'knowledge', 'dna'];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'increasing': return <TrendingUp size={12} />;
      case 'decreasing': return <TrendingDown size={12} />;
      default: return <Minus size={12} />;
    }
  };

  const riskScore = Math.max(0, 100 - asset.healthScore + 15);
  const isHighRisk = riskScore > 60;
  
  const primarySensor = asset.sensors[0];
  const secondarySensor = asset.sensors[1] || asset.sensors[0];
  
  const mockTimeSeriesData = Array.from({ length: 24 }).map((_, i) => {
    const time = new Date();
    time.setHours(time.getHours() - (23 - i));
    const val1 = primarySensor.value * (1 + (Math.sin(i * 0.5) * 0.15) + (Math.random() * 0.05));
    const val2 = secondarySensor.value * (1 + (Math.cos(i * 0.5) * 0.1) + (Math.random() * 0.05));
    
    return {
      time: time.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      [primarySensor.name]: Number(val1.toFixed(2)),
      [secondarySensor.name]: Number(val2.toFixed(2))
    };
  });

  return (
    <div className="page-content">
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <button className="btn btn-ghost" onClick={onBack} style={{ marginBottom: '12px', gap: '6px' }}>
          <ArrowLeft size={16} /> Back to Assets
        </button>
        <div className="asset-header">
          <div className="asset-icon-large">
            {asset.type === 'Pump' ? '⚙️' : asset.type === 'Compressor' ? '🔄' : asset.type === 'Heat Exchanger' ? '🔥' : asset.type === 'Vessel' ? '🛢️' : '⚡'}
          </div>
          <div className="asset-header-info">
            <h2>{asset.name} <span style={{ color: 'var(--text-tertiary)', fontSize: '0.8em', fontWeight: 400 }}>({asset.tag})</span></h2>
            <div className="asset-header-meta">
              <span className={`criticality-badge ${asset.criticality}`}>{asset.criticality}</span>
              <span className={`badge ${asset.status === 'Running' ? 'badge-success' : 'badge-info'}`}>{asset.status}</span>
              <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                {asset.manufacturer} {asset.model} · {asset.unit} · {asset.location}
              </span>
            </div>
          </div>
          <div style={{ marginLeft: 'auto' }}>
            <HealthRing score={asset.healthScore} size={80} />
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="asset-tabs">
        {tabs.map(tab => (
          <button key={tab} className={`asset-tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
            {tab === 'overview' && 'Overview'}
            {tab === 'failures' && `Failures (${assetFailures.length})`}
            {tab === 'maintenance' && `Maintenance (${assetMaintenance.length})`}
            {tab === 'knowledge' && 'Knowledge'}
            {tab === 'dna' && '🧬 Failure DNA'}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          {/* 1. Asset Health & KPI Summary */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: '12px' }}>
            <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '6px' }}><Activity size={14} /> Availability</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--status-success)' }}>98.4%</div>
            </div>
            <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '6px' }}><Clock size={14} /> Remaining Useful Life</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: 'var(--text-primary)' }}>3.2 Yrs</div>
            </div>
            <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '6px' }}><ShieldAlert size={14} /> Risk Score</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: isHighRisk ? 'var(--status-critical)' : 'var(--status-warning)' }}>{riskScore}/100</div>
            </div>
            <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '6px' }}><AlertTriangle size={14} /> Criticality</div>
              <div style={{ fontSize: '24px', fontWeight: 700, color: asset.criticality === 'A' ? 'var(--status-critical)' : 'var(--text-primary)' }}>{asset.criticality}</div>
            </div>
            <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '6px' }}><Calendar size={14} /> Last Maintenance</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginTop: 'auto' }}>12 Oct 2025</div>
            </div>
            <div className="card" style={{ padding: '16px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', display: 'flex', alignItems: 'center', gap: '6px' }}><FileSearch size={14} /> Next Inspection</div>
              <div style={{ fontSize: '18px', fontWeight: 700, color: 'var(--text-primary)', marginTop: 'auto' }}>05 Nov 2026</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '20px' }}>
            
            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* 4. Interactive Sensor Trend Charts */}
              <div className="card" style={{ height: '400px', display: 'flex', flexDirection: 'column' }}>
                <div className="card-header" style={{ marginBottom: '16px' }}>
                  <div className="card-title"><BarChart3 size={16} /> Live Sensor Telemetry & Trends</div>
                  <div style={{ display: 'flex', gap: '12px' }}>
                    {asset.sensors.map((s, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px' }}>
                        <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: i === 0 ? 'var(--accent-primary)' : '#10b981' }}></span>
                        {s.name} ({s.value} {s.unit})
                      </div>
                    ))}
                  </div>
                </div>
                <div style={{ flex: 1, width: '100%', minHeight: 0 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={mockTimeSeriesData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                      <CartesianGrid strokeDasharray="3 3" stroke="var(--border-color)" vertical={false} />
                      <XAxis dataKey="time" stroke="var(--text-tertiary)" fontSize={11} tickMargin={8} />
                      <YAxis yAxisId="left" stroke="var(--text-tertiary)" fontSize={11} />
                      <YAxis yAxisId="right" orientation="right" stroke="var(--text-tertiary)" fontSize={11} />
                      <Tooltip 
                        contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderColor: 'var(--border-color)', borderRadius: '8px', color: 'var(--text-primary)', fontSize: '12px' }}
                        itemStyle={{ color: 'var(--text-secondary)' }}
                      />
                      <ReferenceLine y={primarySensor.threshold.warning} yAxisId="left" stroke="var(--status-warning)" strokeDasharray="3 3" />
                      <ReferenceLine y={primarySensor.threshold.critical} yAxisId="left" stroke="var(--status-critical)" strokeDasharray="3 3" />
                      <Line yAxisId="left" type="monotone" dataKey={primarySensor.name} stroke="var(--accent-primary)" strokeWidth={2} dot={false} activeDot={{ r: 4 }} />
                      <Line yAxisId="right" type="monotone" dataKey={secondarySensor.name} stroke="#10b981" strokeWidth={2} dot={false} />
                    </LineChart>
                  </ResponsiveContainer>
                </div>
              </div>

              {/* Specifications (Moved here from old layout) */}
              <div className="card">
                <div className="card-header">
                  <div className="card-title"><Settings size={14} /> Specifications</div>
                </div>
                <div className="spec-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
                  {Object.entries(asset.specifications).map(([key, value], i) => (
                    <div key={i} className="spec-item">
                      <div className="spec-item-label">{key}</div>
                      <div className="spec-item-value">{value}</div>
                    </div>
                  ))}
                  <div className="spec-item">
                    <div className="spec-item-label">Installed</div>
                    <div className="spec-item-value">{asset.installationDate}</div>
                  </div>
                  <div className="spec-item">
                    <div className="spec-item-label">MTBF</div>
                    <div className="spec-item-value">{asset.mtbfHours.toLocaleString()} hrs</div>
                  </div>
                </div>
              </div>

              {/* Maintenance History Timeline Summary */}
              <div className="card">
                <div className="card-header">
                  <div className="card-title"><Wrench size={14} /> Recent Work Orders & Inspections</div>
                  <button className="btn btn-ghost" style={{ fontSize: '11px', padding: '4px 8px' }} onClick={() => setActiveTab('maintenance')}>View All</button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {assetMaintenance.slice(0, 3).map((event) => (
                    <div key={event.id} style={{
                      display: 'flex',
                      gap: '16px',
                      padding: '12px',
                      background: 'var(--bg-tertiary)',
                      borderRadius: 'var(--radius-md)',
                      borderLeft: `3px solid ${event.type === 'CM' ? 'var(--status-critical)' : event.type === 'PM' ? 'var(--status-success)' : 'var(--status-warning)'}`
                    }}>
                      <div style={{ minWidth: '80px' }}>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--text-primary)' }}>{event.id}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{new Date(event.date).toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' })}</div>
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{event.description}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-muted)', marginTop: '4px' }}>Performed by {event.performedBy} · {event.duration}h</div>
                      </div>
                      <div>
                        <span className={`badge ${event.status === 'Completed' ? 'badge-success' : 'badge-warning'}`}>{event.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              {/* 2. AI Engineering Insights */}
              <div className="card" style={{ background: 'linear-gradient(180deg, rgba(59, 130, 246, 0.05) 0%, transparent 100%)', borderColor: 'rgba(59, 130, 246, 0.2)' }}>
                <div className="card-header">
                  <div className="card-title" style={{ color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <Lightbulb size={16} /> AI Engineering Insights
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Likely Issue</div>
                    <div style={{ fontSize: '14px', fontWeight: 600, color: 'var(--text-primary)', display: 'flex', justifyContent: 'space-between' }}>
                      Accelerated Bearing Wear
                      <span className="badge badge-success" style={{ fontSize: '11px' }}>94% Confidence</span>
                    </div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Supporting Evidence</div>
                    <ul style={{ margin: 0, paddingLeft: '16px', fontSize: '13px', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                      <li>Vibration spectrum shows 1x RPM peak increasing over 72h.</li>
                      <li>Temperature trending up +4°C since last PM.</li>
                      <li>Matches Failure DNA signature `FD-882`.</li>
                    </ul>
                  </div>
                  <div style={{ padding: '12px', background: 'rgba(59, 130, 246, 0.1)', borderRadius: 'var(--radius-md)' }}>
                    <div style={{ fontSize: '11px', color: 'var(--accent-primary)', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>Recommended Action</div>
                    <div style={{ fontSize: '13px', color: 'var(--text-primary)' }}>
                      Schedule bearing inspection and potential replacement within next 48 hours to prevent functional failure. Review <strong>SOP-MECH-042</strong>.
                    </div>
                  </div>
                </div>
              </div>

              {/* 3. Asset Risk Assessment */}
              <div className="card">
                <div className="card-header">
                  <div className="card-title"><Activity size={14} /> Risk Assessment</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>Probability of Failure</span>
                    <span className="badge badge-critical">High (78%)</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>Business Impact</span>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>₹2.4L / hr</span>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>Production Impact</span>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>Unit 2 Bottleneck</span>
                  </div>
                  <div style={{ height: '1px', background: 'var(--border-color)', margin: '4px 0' }}></div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-secondary)' }}>Overall Criticality Rating</span>
                    <span style={{ fontSize: '14px', fontWeight: 700, color: 'var(--status-critical)' }}>A - Extreme</span>
                  </div>
                </div>
              </div>

              {/* 5. Asset Relationship Panel */}
              <div className="card">
                <div className="card-header">
                  <div className="card-title"><Link2 size={14} /> Relationships & Topology</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)', textTransform: 'uppercase', marginBottom: '6px' }}>Connected Equipment</div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <ArrowLeft size={12} /> Upstream: Suction Valve (V-301)
                      </div>
                      <div style={{ fontSize: '13px', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <ChevronRight size={12} /> Downstream: Heat Exchanger (HE-204)
                      </div>
                    </div>
                  </div>
                  <button className="btn btn-secondary" style={{ width: '100%', display: 'flex', justifyContent: 'center', gap: '8px' }} onClick={() => onNavigate?.('graph')}>
                    <Network size={14} /> Open in Knowledge Graph
                  </button>
                </div>
              </div>

              {/* 6. Categorized Engineering Documents */}
              <div className="card">
                <div className="card-header">
                  <div className="card-title"><FileText size={14} /> Engineering Documents</div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { type: 'OEM Manual', name: `${asset.manufacturer} ${asset.model} Operation Manual` },
                    { type: 'SOP', name: 'Bearing Replacement Procedure' },
                    { type: 'P&ID', name: 'Unit 2 Cooling Water Loop' },
                    { type: 'Report', name: 'Last Vibration Analysis (Oct 2025)' },
                  ].map((doc, i) => (
                    <div key={i} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '10px',
                      padding: '10px 12px',
                      background: 'var(--bg-tertiary)',
                      borderRadius: 'var(--radius-md)',
                      cursor: 'pointer',
                      transition: 'background var(--transition-fast)'
                    }} onClick={() => {
                      addToast?.('info', 'Opening Document', `Loading ${doc.name}...`);
                      onNavigate?.('documents');
                    }}>
                      <FileText size={14} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <div style={{ fontSize: '13px', color: 'var(--text-secondary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{doc.name}</div>
                        <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{doc.type}</div>
                      </div>
                      <ExternalLink size={12} style={{ color: 'var(--text-muted)' }} />
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      )}

      {activeTab === 'failures' && (
        <div>
          <div className="card">
            <div className="card-header">
              <div className="card-title">Failure History</div>
              <span style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
                {assetFailures.length} failures · Total cost: ₹{(assetFailures.reduce((sum, f) => sum + f.costInr, 0) / 100000).toFixed(1)}L
              </span>
            </div>

            {/* Failure Timeline */}
            <div className="timeline" style={{ marginTop: '8px' }}>
              {assetFailures.map((failure) => (
                <div key={failure.id} className="timeline-item">
                  <div className={`timeline-dot failure`} />
                  <div className="timeline-date">{new Date(failure.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</div>
                  <div className="timeline-title">
                    {failure.description}
                    <span className={`badge ${failure.severity === 'Critical' ? 'badge-critical' : failure.severity === 'Major' ? 'badge-warning' : 'badge-info'}`} style={{ marginLeft: '8px', fontSize: '10px' }}>
                      {failure.severity}
                    </span>
                  </div>
                  <div className="timeline-description">
                    <strong>Root Cause:</strong> {failure.rootCause}
                    <br />
                    <strong>Resolution:</strong> {failure.resolution}
                    <br />
                    <strong>Resolved by:</strong> {failure.resolvedBy} · Downtime: {failure.downtimeHours}h · Cost: ₹{(failure.costInr / 100000).toFixed(1)}L
                  </div>
                  {failure.lessonsLearned && (
                    <div style={{
                      marginTop: '8px',
                      padding: '10px 14px',
                      background: 'rgba(139, 92, 246, 0.08)',
                      border: '1px solid rgba(139, 92, 246, 0.2)',
                      borderRadius: 'var(--radius-md)',
                      fontSize: '12px',
                      color: 'var(--text-secondary)',
                    }}>
                      💡 <strong>Lesson Learned:</strong> {failure.lessonsLearned}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'maintenance' && (
        <div className="card">
          <div className="card-header">
            <div className="card-title"><Wrench size={14} /> Maintenance History</div>
          </div>
          <table className="data-table">
            <thead>
              <tr>
                <th>WO Number</th>
                <th>Type</th>
                <th>Date</th>
                <th>Description</th>
                <th>Duration</th>
                <th>Performed By</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {assetMaintenance.map((event) => (
                <tr key={event.id}>
                  <td style={{ fontFamily: 'JetBrains Mono, monospace', fontSize: '12px', color: 'var(--accent-primary)' }}>{event.id}</td>
                  <td>
                    <span className={`badge ${event.type === 'CM' ? 'badge-critical' : event.type === 'PM' ? 'badge-success' : event.type === 'Inspection' ? 'badge-warning' : 'badge-info'}`}>
                      {event.type}
                    </span>
                  </td>
                  <td>{new Date(event.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</td>
                  <td style={{ maxWidth: '300px' }}>{event.description}</td>
                  <td>{event.duration}h</td>
                  <td>{event.performedBy}</td>
                  <td>
                    <span className={`badge ${event.status === 'Completed' ? 'badge-success' : event.status === 'Planned' ? 'badge-info' : event.status === 'Overdue' ? 'badge-critical' : 'badge-warning'}`}>
                      {event.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {activeTab === 'knowledge' && (
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          <div className="card">
            <div className="card-header">
              <div className="card-title"><BookOpen size={14} /> Linked Procedures</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {asset.linkedProcedures.map((proc, i) => (
                <div key={i} style={{
                  padding: '12px',
                  background: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  cursor: 'pointer',
                }}>
                  <BookOpen size={14} style={{ color: 'var(--accent-primary)' }} />
                  <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{proc}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div className="card-header">
              <div className="card-title"><Package size={14} /> Spare Parts</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {[
                { name: 'SKF 6316-2Z (DE Bearing)', stock: 2, location: 'Central Store, Bin A-47' },
                { name: 'SKF 6312-2Z (NDE Bearing)', stock: 1, location: 'Central Store, Bin A-47' },
                { name: 'John Crane Type 2800 (Mech. Seal)', stock: 1, location: 'Central Store, Bin B-12' },
                { name: 'Bearing Housing Gasket', stock: 0, location: 'Out of Stock ⚠️' },
              ].map((part, i) => (
                <div key={i} style={{
                  padding: '12px',
                  background: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-md)',
                  border: part.stock === 0 ? '1px solid var(--status-critical-border)' : '1px solid var(--border-primary)',
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                    <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--text-primary)' }}>{part.name}</span>
                    <span className={`badge ${part.stock > 0 ? 'badge-success' : 'badge-critical'}`}>
                      Stock: {part.stock}
                    </span>
                  </div>
                  <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{part.location}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'dna' && matchedDNA && (
        <div className="dna-container">
          <div className="dna-header">
            <div className="dna-icon">🧬</div>
            <div>
              <div className="dna-title">{matchedDNA.name}</div>
              <div className="dna-subtitle">
                {matchedDNA.id} · {matchedDNA.equipmentClass} · {matchedDNA.occurrences} occurrences across fleet
              </div>
            </div>
          </div>

          {/* Match Confidence */}
          <div className="dna-match-bar">
            <div className="dna-match-label">DNA Match Confidence</div>
            <div className="dna-match-track">
              <div className="dna-match-fill" style={{ width: `${matchedDNA.matchConfidence * 100}%` }} />
            </div>
            <div className="dna-match-value">{Math.round(matchedDNA.matchConfidence * 100)}%</div>
          </div>

          {/* Precursor Symptoms */}
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: '24px 0 12px' }}>
            Precursor Symptoms
          </h3>
          <div className="dna-strand">
            {matchedDNA.precursorSymptoms.map((symptom, i) => (
              <div key={i} className={`dna-segment ${symptom.severity === 'Critical' ? 'primary' : symptom.severity === 'Warning' ? 'contributing' : 'enabling'}`}>
                <div className="dna-segment-level">{symptom.timeline}</div>
                <div className="dna-segment-text">{symptom.symptom}</div>
                <span className={`badge ${symptom.severity === 'Critical' ? 'badge-critical' : symptom.severity === 'Warning' ? 'badge-warning' : 'badge-info'}`} style={{ marginLeft: 'auto', fontSize: '10px' }}>
                  {symptom.severity}
                </span>
              </div>
            ))}
          </div>

          {/* Root Cause Chain */}
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: '24px 0 12px' }}>
            Root Cause Chain
          </h3>
          <div className="dna-strand">
            {matchedDNA.rootCauseChain.map((rc, i) => (
              <div key={i} className={`dna-segment ${rc.level.toLowerCase()}`}>
                <div className="dna-segment-level">{rc.level}</div>
                <div className="dna-segment-text">{rc.cause}</div>
              </div>
            ))}
          </div>

          {/* Resolution Genome */}
          <h3 style={{ fontSize: '14px', fontWeight: 700, color: 'var(--text-primary)', margin: '24px 0 12px' }}>
            Resolution Genome
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            {matchedDNA.resolutionGenome.map((res, i) => (
              <div key={i} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                padding: '10px 16px',
                background: 'var(--status-success-bg)',
                border: '1px solid var(--status-success-border)',
                borderRadius: 'var(--radius-md)',
              }}>
                <span style={{ fontSize: '10px', fontWeight: 700, color: 'var(--status-success)', textTransform: 'uppercase', minWidth: '80px' }}>
                  {res.type}
                </span>
                <span style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>{res.action}</span>
              </div>
            ))}
          </div>

          {/* Predicted Failure Window */}
          <div style={{
            marginTop: '20px',
            padding: '16px',
            background: 'rgba(245, 158, 11, 0.08)',
            border: '1px solid rgba(245, 158, 11, 0.2)',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '12px',
          }}>
            <Clock size={18} style={{ color: 'var(--status-warning)' }} />
            <div>
              <div style={{ fontSize: '12px', fontWeight: 600, color: 'var(--status-warning)' }}>Predicted Failure Window</div>
              <div style={{ fontSize: '14px', color: 'var(--text-primary)', fontWeight: 600 }}>{matchedDNA.predictedFailureWindow}</div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'dna' && !matchedDNA && (
        <div className="card" style={{ textAlign: 'center', padding: '60px 20px' }}>
          <div style={{ fontSize: '48px', marginBottom: '16px' }}>🧬</div>
          <h3 style={{ fontSize: '16px', fontWeight: 600, color: 'var(--text-primary)', marginBottom: '8px' }}>
            No Failure DNA Match
          </h3>
          <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
            This asset doesn&apos;t have a matching Failure DNA sequence in the library yet.
          </p>
        </div>
      )}
    </div>
  );
}

export default function AssetIntelligence({ addToast, onNavigate }: AssetIntelligenceProps) {
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  if (selectedAsset) {
    return <AssetDetail assetId={selectedAsset} onBack={() => setSelectedAsset(null)} addToast={addToast} onNavigate={onNavigate} />;
  }

  return <AssetList onSelect={setSelectedAsset} />;
}
