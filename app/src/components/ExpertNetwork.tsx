'use client';

import React from 'react';
import { Users, Mail, MessageSquare, Star } from 'lucide-react';
interface ExpertNetworkProps {
  addToast?: (type: 'success' | 'error' | 'info', title: string, message: string) => void;
}

export default function ExpertNetwork({ addToast }: ExpertNetworkProps) {
  const experts = [
    { name: 'Dr. Sarah Chen', role: 'Chief Reliability Engineer', expertise: ['Centrifugal Pumps', 'Vibration Analysis'], rating: 4.9 },
    { name: 'Marcus Johnson', role: 'Senior Maintenance Tech', expertise: ['HVAC Systems', 'Electrical Diagnostics'], rating: 4.7 },
    { name: 'Priya Sharma', role: 'Process Safety Expert', expertise: ['Compliance', 'Hazard Analysis'], rating: 4.8 },
    { name: 'David Kim', role: 'Control Systems Engineer', expertise: ['PLC Programming', 'SCADA'], rating: 4.9 },
  ];

  return (
    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Expert Network
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
          Experience graph and subject matter expert collaboration
        </p>
      </div>

      <div className="grid-2">
        {experts.map((expert, i) => (
          <div key={i} className="card" style={{ display: 'flex', gap: '16px', alignItems: 'flex-start' }}>
            <div style={{
              width: '48px', height: '48px', borderRadius: '50%', background: 'var(--gradient-primary)',
              display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', fontWeight: 600, fontSize: '18px'
            }}>
              {expert.name.charAt(0)}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '15px', color: 'var(--text-primary)' }}>{expert.name}</div>
                  <div style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>{expert.role}</div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#f59e0b', fontWeight: 600 }}>
                  <Star size={12} fill="#f59e0b" /> {expert.rating}
                </div>
              </div>
              
              <div style={{ display: 'flex', gap: '6px', flexWrap: 'wrap', marginTop: '12px' }}>
                {expert.expertise.map((tag, j) => (
                  <span key={j} style={{
                    padding: '2px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px',
                    fontSize: '11px', color: 'var(--text-secondary)', border: '1px solid var(--border-primary)'
                  }}>
                    {tag}
                  </span>
                ))}
              </div>
              
              <div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
                <button 
                  className="btn btn-secondary" 
                  style={{ flex: 1 }}
                  onClick={() => {
                    const msg = window.prompt(`Type your message to ${expert.name}:`);
                    if (msg) {
                      if (addToast) addToast('success', 'Message Sent', `Your message to ${expert.name} has been delivered.`);
                    }
                  }}
                >
                  <MessageSquare size={14} /> Message
                </button>
                <button 
                  className="btn btn-secondary" 
                  style={{ flex: 1 }}
                  onClick={() => {
                    const email = `${expert.name.toLowerCase().replace(/[^a-z0-9]/g, '.')}@industrialiq.demo`;
                    window.location.href = `mailto:${email}?subject=Consultation%20Request`;
                  }}
                >
                  <Mail size={14} /> Email
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
