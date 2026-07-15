'use client';

import React, { useState, useEffect } from 'react';
import { Users, Mail, MessageSquare, Star, Send } from 'lucide-react';
import Modal from '@/components/Modal';
interface ExpertNetworkProps {
  addToast?: (type: 'success' | 'error' | 'info', title: string, message: string) => void;
}

export default function ExpertNetwork({ addToast }: ExpertNetworkProps) {
  const initialExperts = [
    { name: 'Dr. Sarah Chen', role: 'Chief Reliability Engineer', expertise: ['Centrifugal Pumps', 'Vibration Analysis'], rating: 4.9 },
    { name: 'Marcus Johnson', role: 'Senior Maintenance Tech', expertise: ['HVAC Systems', 'Electrical Diagnostics'], rating: 4.7 },
    { name: 'Priya Sharma', role: 'Process Safety Expert', expertise: ['Compliance', 'Hazard Analysis'], rating: 4.8 },
    { name: 'David Kim', role: 'Control Systems Engineer', expertise: ['PLC Programming', 'SCADA'], rating: 4.9 },
  ];
  const [experts, setExperts] = useState(initialExperts);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('industrialIQ_experts');
    if (saved) {
      try {
        setExperts(JSON.parse(saved));
      } catch (e) {}
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('industrialIQ_experts', JSON.stringify(experts));
    }
  }, [experts, isLoaded]);

  const [selectedExpert, setSelectedExpert] = useState<any>(null);
  const [messageText, setMessageText] = useState('');
  
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newExpertName, setNewExpertName] = useState('');
  const [newExpertRole, setNewExpertRole] = useState('');
  const [newExpertSkills, setNewExpertSkills] = useState('');
  const [newExpertRating, setNewExpertRating] = useState('5.0');

  return (
    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
            Engineering Expertise
          </h2>
          <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
            Experience graph and subject matter expert collaboration
          </p>
        </div>
        <button 
          className="btn btn-primary"
          onClick={() => setIsCreateModalOpen(true)}
        >
          + Create Expert
        </button>
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
                    setSelectedExpert(expert);
                    setMessageText('');
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

      {/* Message Modal */}
      <Modal 
        isOpen={!!selectedExpert} 
        onClose={() => setSelectedExpert(null)} 
        title={`Message ${selectedExpert?.name}`}
      >
        {selectedExpert && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
            <p style={{ fontSize: '13px', color: 'var(--text-secondary)' }}>
              Send a secure direct message to <strong>{selectedExpert.name}</strong> ({selectedExpert.role}). They usually reply within 2-4 hours.
            </p>
            
            <textarea 
              value={messageText}
              onChange={(e) => setMessageText(e.target.value)}
              placeholder="Type your message here..."
              style={{ 
                width: '100%', 
                minHeight: '120px', 
                background: 'var(--bg-tertiary)', 
                border: '1px solid var(--border-primary)', 
                borderRadius: 'var(--radius-md)', 
                padding: '12px',
                color: 'var(--text-primary)',
                fontFamily: 'inherit',
                fontSize: '13px',
                outline: 'none',
                resize: 'vertical'
              }}
            />
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '8px' }}>
              <button 
                className="btn btn-secondary" 
                onClick={() => setSelectedExpert(null)}
              >
                Cancel
              </button>
              <button 
                className="btn btn-primary"
                disabled={!messageText.trim()}
                style={{ opacity: !messageText.trim() ? 0.5 : 1, display: 'flex', alignItems: 'center', gap: '6px' }}
                onClick={() => {
                  if (addToast) addToast('success', 'Message Sent', `Your message to ${selectedExpert.name} has been securely delivered.`);
                  setSelectedExpert(null);
                  setMessageText('');
                }}
              >
                <Send size={14} /> Send Message
              </button>
            </div>
          </div>
        )}
      </Modal>
      
      {/* Create Expert Modal */}
      <Modal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        title="Create New Expert"
        footer={
          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
            <button className="btn btn-secondary" onClick={() => setIsCreateModalOpen(false)}>Cancel</button>
            <button 
              className="btn btn-primary" 
              disabled={!newExpertName || !newExpertRole || !newExpertSkills}
              onClick={() => {
                const newExpert = {
                  name: newExpertName,
                  role: newExpertRole,
                  expertise: newExpertSkills.split(',').map(s => s.trim()).filter(s => s),
                  rating: parseFloat(newExpertRating) || 5.0
                };
                setExperts([...experts, newExpert]);
                if (addToast) addToast('success', 'Expert Created', `${newExpertName} added to the network.`);
                setIsCreateModalOpen(false);
                setNewExpertName('');
                setNewExpertRole('');
                setNewExpertSkills('');
                setNewExpertRating('5.0');
              }}
            >
              Create Expert
            </button>
          </div>
        }
      >
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Full Name</label>
            <input 
              type="text" 
              value={newExpertName} 
              onChange={e => setNewExpertName(e.target.value)} 
              placeholder="e.g. John Doe"
              style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-primary)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Role</label>
            <input 
              type="text" 
              value={newExpertRole} 
              onChange={e => setNewExpertRole(e.target.value)} 
              placeholder="e.g. Senior Mechanical Engineer"
              style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-primary)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Expertise (comma separated)</label>
            <input 
              type="text" 
              value={newExpertSkills} 
              onChange={e => setNewExpertSkills(e.target.value)} 
              placeholder="e.g. Hydraulics, PLC, Welding"
              style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-primary)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Rating (1-5)</label>
            <input 
              type="number" 
              min="1" max="5" step="0.1"
              value={newExpertRating} 
              onChange={e => setNewExpertRating(e.target.value)} 
              style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-primary)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
            />
          </div>
        </div>
      </Modal>
    </div>
  );
}
