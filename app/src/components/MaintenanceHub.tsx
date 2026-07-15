'use client';

import React, { useState, useEffect } from 'react';
import { Settings, Wrench, Calendar, AlertTriangle, CheckCircle2, Clock } from 'lucide-react';
import Modal from '@/components/Modal';
interface MaintenanceHubProps {
  addToast?: (type: 'success' | 'error' | 'info', title: string, message: string) => void;
}

export default function MaintenanceHub({ addToast }: MaintenanceHubProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newWoAsset, setNewWoAsset] = useState('');
  const [newWoType, setNewWoType] = useState('Corrective');

  const initialWorkOrders = [
    { id: 'WO-2026-892', asset: 'Main Feed Pump (P-101A)', type: 'Preventive', status: 'In Progress', priority: 'High', date: 'Today' },
    { id: 'WO-2026-893', asset: 'Boil-off Gas Compressor (C-202)', type: 'Corrective', status: 'Scheduled', priority: 'Medium', date: 'Tomorrow' },
    { id: 'WO-2026-894', asset: 'Primary Heat Exchanger (HE-301)', type: 'Inspection', status: 'Completed', priority: 'Low', date: 'Yesterday' },
    { id: 'WO-2026-895', asset: 'Control Valve (V-404)', type: 'Calibration', status: 'Overdue', priority: 'Critical', date: '3 Days Ago' },
    { id: 'WO-2026-896', asset: 'Cooling Tower Motor (M-505)', type: 'Preventive', status: 'Scheduled', priority: 'Medium', date: 'Next Week' },
  ];
  
  // Generate the remaining to make it 24
  const assets = ['Conveyor Belt System', 'Hydraulic Press', 'HVAC Unit A', 'Boiler Feed Pump', 'Generator Set B'];
  const types = ['Preventive', 'Corrective', 'Inspection', 'Calibration'];
  const statuses = ['In Progress', 'Scheduled', 'Completed', 'Overdue'];
  const priorities = ['Low', 'Medium', 'High', 'Critical'];
  
  for (let i = 6; i <= 24; i++) {
    initialWorkOrders.push({
      id: `WO-2026-${891 + i}`,
      asset: assets[i % assets.length] + ` (${i})`,
      type: types[i % types.length],
      status: statuses[i % statuses.length],
      priority: priorities[i % priorities.length],
      date: `Oct ${10 + (i % 20)}, 2026`
    });
  }

  const [workOrders, setWorkOrders] = useState(initialWorkOrders);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('industrialIQ_workOrders');
    if (saved) {
      try {
        setWorkOrders(JSON.parse(saved));
      } catch (e) {}
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('industrialIQ_workOrders', JSON.stringify(workOrders));
    }
  }, [workOrders, isLoaded]);

  const [visibleCount, setVisibleCount] = useState(5);
  const [selectedWo, setSelectedWo] = useState<any>(null);
  const [editStatus, setEditStatus] = useState('');

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
          Maintenance Operations
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
          Unified maintenance planning and work management
        </p>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-label">Active Work Orders</div>
          <div className="kpi-value gradient">{workOrders.length}</div>
          <div className="kpi-trend neutral">+3 since yesterday</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Schedule Compliance</div>
          <div className="kpi-value" style={{ color: 'var(--status-success)' }}>92%</div>
          <div className="kpi-trend positive">Above target</div>
        </div>
        <div className="kpi-card">
          <div className="kpi-label">Overdue Tasks</div>
          <div className="kpi-value" style={{ color: 'var(--status-critical)' }}>
            {workOrders.filter(w => w.status === 'Overdue').length}
          </div>
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
              {workOrders.slice(0, visibleCount).map((wo, i) => (
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
                      onClick={() => {
                        setSelectedWo(wo);
                        setEditStatus(wo.status);
                      }}
                    >
                      View
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {visibleCount < workOrders.length && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => setVisibleCount(workOrders.length)}
              >
                Load all {workOrders.length} Work Orders
              </button>
            </div>
          )}
        </div>
        
        {/* View Work Order Modal */}
        <Modal 
          isOpen={!!selectedWo} 
          onClose={() => setSelectedWo(null)} 
          title={`Work Order Details: ${selectedWo?.id}`}
          footer={
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedWo(null)}>Close</button>
              <button className="btn btn-primary" onClick={() => {
                const updated = workOrders.map(w => w.id === selectedWo.id ? { ...w, status: editStatus } : w);
                setWorkOrders(updated);
                if (addToast) addToast('success', 'Status Updated', `${selectedWo.id} status changed to ${editStatus}`);
                setSelectedWo(null);
              }}>Save Changes</button>
            </div>
          }
        >
          {selectedWo && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div style={{ display: 'flex', gap: '16px', background: 'var(--bg-tertiary)', padding: '16px', borderRadius: 'var(--radius-md)' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>Asset</div>
                  <div style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{selectedWo.asset}</div>
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '12px', color: 'var(--text-tertiary)', marginBottom: '4px' }}>Priority</div>
                  <div style={{ fontWeight: 600, color: selectedWo.priority === 'Critical' ? 'var(--status-critical)' : 'var(--text-primary)' }}>{selectedWo.priority}</div>
                </div>
              </div>
              
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Update Status</label>
                <select 
                  value={editStatus} 
                  onChange={e => setEditStatus(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-primary)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                >
                  <option value="In Progress">In Progress</option>
                  <option value="Scheduled">Scheduled</option>
                  <option value="Completed">Completed</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>
            </div>
          )}
        </Modal>
      </div>
    </div>
  );
}
