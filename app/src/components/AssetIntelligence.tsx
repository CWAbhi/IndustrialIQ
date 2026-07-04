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
} from 'lucide-react';
import { assets, failures, maintenanceEvents, failureDNAs, engineers } from '@/data/assets';

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
          Asset Intelligence
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
                  <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--text-primary)' }}>{asset.tag}</span>
                  <span className={`badge ${asset.status === 'Running' ? 'badge-success' : asset.status === 'Standby' ? 'badge-info' : asset.status === 'Under Maintenance' ? 'badge-warning' : 'badge-neutral'}`}>
                    {asset.status}
                  </span>
                </div>
                <div style={{ fontSize: '13px', color: 'var(--text-secondary)', marginBottom: '2px' }}>{asset.name}</div>
                <div style={{ fontSize: '11px', color: 'var(--text-muted)' }}>
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

function AssetDetail({ assetId, onBack }: { assetId: string; onBack: () => void }) {
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
            <h2>{asset.tag} — {asset.name}</h2>
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
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
          {/* Sensors */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Live Sensor Data</div>
            </div>
            <div className="sensor-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
              {asset.sensors.map((sensor, i) => (
                <div key={i} className={`sensor-card ${sensor.status}`}>
                  <div className="sensor-name">{sensor.name}</div>
                  <div className="sensor-value-row">
                    <span className={`sensor-value ${sensor.status}`}>{sensor.value}</span>
                    <span className="sensor-unit">{sensor.unit}</span>
                  </div>
                  <div className={`sensor-trend ${sensor.trend}`}>
                    {getTrendIcon(sensor.trend)}
                    {sensor.trend}
                  </div>
                  <div className="progress-bar" style={{ marginTop: '8px' }}>
                    <div
                      className={`progress-bar-fill ${sensor.status === 'critical' ? 'critical' : sensor.status === 'warning' ? 'warning' : 'good'}`}
                      style={{ width: `${Math.min(100, (sensor.value / sensor.threshold.critical) * 100)}%` }}
                    />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '4px', fontSize: '10px', color: 'var(--text-muted)' }}>
                    <span>0</span>
                    <span>⚠️ {sensor.threshold.warning}</span>
                    <span>🔴 {sensor.threshold.critical}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Specifications */}
          <div className="card">
            <div className="card-header">
              <div className="card-title">Specifications</div>
            </div>
            <div className="spec-grid" style={{ gridTemplateColumns: '1fr 1fr' }}>
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

          {/* Linked Documents */}
          <div className="card">
            <div className="card-header">
              <div className="card-title"><FileText size={14} /> Linked Documents</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {asset.linkedDocuments.map((doc, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '10px',
                  padding: '10px 12px',
                  background: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-md)',
                  cursor: 'pointer',
                  transition: 'background var(--transition-fast)',
                  fontSize: '13px',
                  color: 'var(--text-secondary)',
                }}>
                  <FileText size={14} style={{ color: 'var(--accent-primary)', flexShrink: 0 }} />
                  <span style={{ flex: 1 }}>{doc}</span>
                  <ExternalLink size={12} style={{ color: 'var(--text-muted)' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Expert Knowledge */}
          <div className="card">
            <div className="card-header">
              <div className="card-title"><Users size={14} /> Expert Knowledge</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {assetExperts.map((eng) => (
                <div key={eng.id} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '10px 12px',
                  background: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-md)',
                  border: eng.status === 'Retiring Soon' ? '1px solid var(--status-warning-border)' : '1px solid var(--border-primary)',
                }}>
                  <span style={{ fontSize: '24px' }}>{eng.avatar}</span>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '13px', fontWeight: 600, color: 'var(--text-primary)' }}>{eng.name}</div>
                    <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>
                      {eng.role} · {eng.experience} yrs · {eng.diagnoses} diagnoses
                    </div>
                  </div>
                  {eng.status === 'Retiring Soon' && (
                    <span className="badge badge-warning" style={{ fontSize: '10px' }}>
                      ⚠️ Retiring
                    </span>
                  )}
                </div>
              ))}
              {assetExperts.length === 0 && (
                <div style={{ textAlign: 'center', padding: '20px', color: 'var(--text-muted)', fontSize: '13px' }}>
                  No experts mapped to this asset
                </div>
              )}
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

export default function AssetIntelligence() {
  const [selectedAsset, setSelectedAsset] = useState<string | null>(null);

  if (selectedAsset) {
    return <AssetDetail assetId={selectedAsset} onBack={() => setSelectedAsset(null)} />;
  }

  return <AssetList onSelect={setSelectedAsset} />;
}
