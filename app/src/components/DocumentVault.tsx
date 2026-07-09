'use client';

import React, { useRef, useState } from 'react';
import { FileText, Search, Download, Folder, File, ExternalLink, X } from 'lucide-react';
interface DocumentVaultProps {
  addToast?: (type: 'success' | 'error' | 'info', title: string, message: string) => void;
}

export default function DocumentVault({ addToast }: DocumentVaultProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const documents = [
    { 
      name: 'P-101A OEM Manual.pdf', type: 'PDF', size: '4.2 MB', date: 'Oct 12, 2025', category: 'Manuals',
      content: "CENTRIFUGAL PUMP P-101A - OPERATING MANUAL\n\n1. Specifications:\n- Flow Rate: 150 m3/h\n- Head: 45 m\n- Motor Power: 75 kW\n\n2. Maintenance Schedule:\n- Daily: Check bearing temperature and vibration.\n- Monthly: Inspect mechanical seals for leakage.\n- Annually: Overhaul and replace wear rings.\n\nWarning: Do not operate below minimum continuous stable flow (MCSF)." 
    },
    { 
      name: 'Q3 Maintenance Audit.docx', type: 'Word', size: '1.1 MB', date: 'Sep 28, 2025', category: 'Reports',
      content: "Q3 MAINTENANCE AUDIT REPORT\n\nDate: Sep 28, 2025\nAuditor: Dr. Sarah Chen\n\nFindings:\n- Compliance across rotating equipment stands at 94%.\n- Critical gap identified in Feed Surge Drum (V-105) inspection schedule.\n- Vibration on Pump P-101A is trending upwards. Recommended immediate alignment check.\n\nAction Items:\n1. Schedule V-105 inspection.\n2. Create work order for P-101A."
    },
    { 
      name: 'Safety Procedures v2.pdf', type: 'PDF', size: '2.8 MB', date: 'Aug 15, 2025', category: 'Compliance',
      content: "PLANT SAFETY PROCEDURES (v2)\n\nSection 4: Confined Space Entry\n1. All personnel must obtain a valid permit before entering any vessel.\n2. Atmosphere testing must be conducted prior to entry and continuously monitored.\n3. A standby person must be stationed at the entrance at all times.\n\nSection 5: Lockout/Tagout (LOTO)\n- Energy sources must be isolated and locked out before maintenance."
    },
    { 
      name: 'C-202 Wiring Diagram.dwg', type: 'CAD', size: '15.6 MB', date: 'Jul 04, 2025', category: 'Schematics',
      content: "[CAD Viewer Simulation]\n\nCOMPRESSOR C-202 WIRING DIAGRAM\n- Main Power Feed: 415V, 3-Phase\n- Control Circuit: 110V AC\n- PLC I/O Terminals:\n  - DI01: Start Pushbutton\n  - DI02: Stop Pushbutton\n  - AI01: Discharge Temperature\n  - AI02: Lube Oil Pressure\n\n*Drawing approved by Marcus Johnson*"
    },
    { 
      name: 'Incident Report #402.pdf', type: 'PDF', size: '0.8 MB', date: 'Jun 22, 2025', category: 'Incidents',
      content: "INCIDENT REPORT #402\n\nDate of Incident: Jun 21, 2025\nLocation: Unit 2 Pipe Rack\n\nDescription:\nMinor seal leak detected on Heat Exchanger E-204 during startup sequence. No personnel exposure. Leak was contained within 15 minutes.\n\nRoot Cause:\nThermal shock due to rapid heating rate exceeding OEM recommendations.\n\nPreventive Action:\nUpdate startup procedure to restrict heating rate to 50°C/hr."
    },
  ];

  return (
    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Document Vault
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
          Secure, searchable repository for all industrial documentation
        </p>
      </div>

      <div className="card">
        <div className="flex flex-col-mobile gap-4 mb-6">
          <div className="search-bar" style={{ flex: 1 }}>
            <Search size={16} className="search-bar-icon" />
            <input type="text" placeholder="Search manuals, schematics, reports..." />
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => fileInputRef.current?.click()}
          >
            Upload Document
          </button>
          <input 
            type="file" 
            ref={fileInputRef} 
            style={{ display: 'none' }} 
            onChange={(e) => {
              if (e.target.files && e.target.files.length > 0) {
                if (addToast) addToast('success', 'Upload Complete', `Successfully uploaded ${e.target.files[0].name}`);
                // Reset the input so the same file can be uploaded again if needed
                e.target.value = '';
              }
            }}
          />
        </div>

        <div className="grid-3" style={{ marginBottom: '24px' }}>
          <div style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Folder size={24} color="var(--accent-primary)" />
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px' }}>OEM Manuals</div>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>142 files</div>
            </div>
          </div>
          <div style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Folder size={24} color="var(--status-warning)" />
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px' }}>Compliance</div>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>87 files</div>
            </div>
          </div>
          <div style={{ padding: '16px', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '12px' }}>
            <Folder size={24} color="var(--accent-secondary)" />
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px' }}>Schematics</div>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>215 files</div>
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Category</th>
                <th>Size</th>
                <th>Date Modified</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {documents.map((doc, i) => (
                <tr key={i}>
                  <td style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500 }}>
                    <File size={16} color="var(--text-muted)" /> {doc.name}
                  </td>
                  <td>
                    <span style={{ padding: '2px 8px', background: 'rgba(255,255,255,0.05)', borderRadius: '4px', fontSize: '11px' }}>
                      {doc.category}
                    </span>
                  </td>
                  <td>{doc.size}</td>
                  <td>{doc.date}</td>
                  <td>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        className="btn-icon" 
                        style={{ width: '28px', height: '28px' }}
                        onClick={() => {
                          setSelectedDoc(doc);
                          if (addToast) addToast('info', 'Opening Document', `Opening ${doc.name}...`);
                        }}
                      >
                        <ExternalLink size={14} />
                      </button>
                      <button 
                        className="btn-icon" 
                        style={{ width: '28px', height: '28px' }}
                        onClick={() => addToast && addToast('success', 'Download Started', `Downloading ${doc.name}...`)}
                      >
                        <Download size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      {/* Document Viewer Modal */}
      {selectedDoc && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: '24px'
        }}>
          <div className="card" style={{
            width: '100%',
            maxWidth: '800px',
            maxHeight: '90vh',
            display: 'flex',
            flexDirection: 'column',
            background: 'var(--bg-secondary)',
            boxShadow: 'var(--shadow-lg)'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid var(--border-primary)', paddingBottom: '16px', marginBottom: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <FileText size={20} style={{ color: 'var(--accent-primary)' }} />
                <h3 style={{ fontSize: '16px', fontWeight: 700, color: 'var(--text-primary)' }}>{selectedDoc.name}</h3>
                <span className="badge" style={{ background: 'rgba(255,255,255,0.1)', color: 'var(--text-secondary)' }}>{selectedDoc.type}</span>
              </div>
              <button className="btn-icon" onClick={() => setSelectedDoc(null)}>
                <X size={16} />
              </button>
            </div>
            
            <div style={{
              flex: 1,
              overflowY: 'auto',
              background: 'var(--bg-primary)',
              borderRadius: 'var(--radius-md)',
              padding: '24px',
              border: '1px solid var(--border-primary)',
              color: 'var(--text-primary)',
              fontFamily: 'monospace',
              fontSize: '13px',
              lineHeight: '1.6',
              whiteSpace: 'pre-wrap'
            }}>
              {selectedDoc.content}
            </div>
            
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '16px' }}>
              <button className="btn btn-secondary" onClick={() => setSelectedDoc(null)}>Close</button>
              <button 
                className="btn btn-primary"
                onClick={() => {
                  if (addToast) addToast('success', 'Download Started', `Downloading ${selectedDoc.name}...`);
                  setSelectedDoc(null);
                }}
              >
                <Download size={14} /> Download File
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
