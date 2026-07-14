'use client';

import React, { useState } from 'react';
import { Settings, Wrench, Calendar, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import Modal from '@/components/Modal';
interface MaintenanceHubProps {
  addToast?: (type: 'success' | 'error' | 'info', title: string, message: string) => void;
}

export default function MaintenanceHub({ addToast }: MaintenanceHubProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWoAsset, setNewWoAsset] = useState('');
  const [newWoType, setNewWoType] = useState('Corrective');

  const [workOrders, setWorkOrders] = useState([
    { id: 'WO-2026-892', asset: 'Main Feed Pump (P-101A)', type: 'Preventive', status: 'In Progress', priority: 'High', date: 'Today' },
    { id: 'WO-2026-893', asset: 'Boil-off Gas Compressor (C-202)', type: 'Corrective', status: 'Scheduled', priority: 'Medium', date: 'Tomorrow' },
    { id: 'WO-2026-894', asset: 'Primary Heat Exchanger (HE-301)', type: 'Inspection', status: 'Completed', priority: 'Low', date: 'Yesterday' },
    { id: 'WO-2026-895', asset: 'Control Valve (V-404)', type: 'Calibration', status: 'Overdue', priority: 'Critical', date: '3 Days Ago' },
    { id: 'WO-2026-896', asset: 'Cooling Tower Motor (M-505)', type: 'Preventive', status: 'Scheduled', priority: 'Medium', date: 'Next Week' },
  ]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed': return 'var(--status-success)';
      case 'In Progress': return 'var(--accent-primary)';
      case 'Scheduled': return 'var(--status-warning)';
      case 'Overdue': return 'var(--status-critical)';
      default: return 'var(--text-secondary)';
    }
  };

  return (
    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Maintenance Hub
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
          Unified maintenance planning and work management
        </p>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Active Work Orders</div>
          <div className="kpi-value gradient">24</div>
          <div className="kpi-trend neutral">+3 since yesterday</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Schedule Compliance</div>
          <div className="kpi-value" style={{ color: 'var(--status-success)' }}>92%</div>
          <div className="kpi-trend positive">Above target</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Overdue Tasks</div>
          <div className="kpi-value" style={{ color: 'var(--status-critical)' }}>3</div>
          <div className="kpi-trend negative">Requires attention</div>
        </div>
      </div>

      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Wrench size={16} className="text-muted" />
            Recent Work Orders
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => setIsModalOpen(true)}
          >
            Create Work Order
          </button>
        </div>
        
        <Modal 
          isOpen={isModalOpen} 
          onClose={() => setIsModalOpen(false)} 
          title="Create New Work Order"
          footer={
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button className="btn btn-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
              <button className="btn btn-primary" onClick={() => {
                if (newWoAsset) {
                  const newWo = {
                    id: `WO-2026-${Math.floor(Math.random() * 900) + 100}`,
                    asset: newWoAsset,
                    type: newWoType,
                    status: 'Scheduled',
                    priority: 'Medium',
                    date: 'Today'
                  };
                  setWorkOrders([newWo, ...workOrders]);
                  if (addToast) addToast('success', 'Work Order Created', `Work order ${newWo.id} created for ${newWoAsset}`);
                  setIsModalOpen(false);
                  setNewWoAsset('');
                  setNewWoType('Corrective');
                }
              }}>Create Order</button>
            </div>
          }
        >
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Asset Name</label>
              <input 
                type="text" 
                value={newWoAsset} 
                onChange={e => setNewWoAsset(e.target.value)} 
                placeholder="e.g. Main Feed Pump (P-101A)"
                style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-primary)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
              />
            </div>
            <div>
              <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Work Order Type</label>
              <select 
                value={newWoType} 
                onChange={e => setNewWoType(e.target.value)}
                style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-primary)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
              >
                <option>Corrective</option>
                <option>Preventive</option>
                <option>Inspection</option>
                <option>Calibration</option>
              </select>
            </div>
          </div>
        </Modal>
        
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Asset</th>
                <th>Type</th>
                <th>Priority</th>
                <th>Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {workOrders.map((wo, i) => (
                <tr key={i}>
                  <td style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{wo.id}</td>
                  <td>{wo.asset}</td>
                  <td>{wo.type}</td>
                  <td>
                    <span className={`badge ${wo.priority === 'Critical' ? 'badge-critical' : wo.priority === 'High' ? 'badge-warning' : ''}`} style={{
                      padding: '2px 8px', borderRadius: '12px', fontSize: '11px',
                      background: wo.priority === 'Critical' ? 'rgba(239, 68, 68, 0.1)' : wo.priority === 'High' ? 'rgba(245, 158, 11, 0.1)' : 'rgba(255, 255, 255, 0.05)',
                      color: wo.priority === 'Critical' ? '#ef4444' : wo.priority === 'High' ? '#f59e0b' : 'var(--text-secondary)'
                    }}>
                      {wo.priority}
                    </span>
                  </td>
                  <td>{wo.date}</td>
                  <td style={{ color: getStatusColor(wo.status), fontWeight: 500 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: getStatusColor(wo.status) }}></span>
                      {wo.status}
                    </div>
                  </td>
                  <td>
                    <button 
                      className="btn-ghost"
                      onClick={() => addToast && addToast('info', 'View Details', `Viewing details for ${wo.id}`)}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
