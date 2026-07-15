'use client';

import React, { useState, useRef, useEffect } from 'react';
import { FileText, Search, Download, Folder, File, ExternalLink, X, ZoomIn, ZoomOut, Printer, ChevronDown } from 'lucide-react';
import Modal from '@/components/Modal';

interface DocumentVaultProps {
  addToast?: (type: 'success' | 'error' | 'info', title: string, message: string) => void;
}

const documents = [
    { 
      name: 'Main Feed Pump OEM Manual.pdf', type: 'PDF', size: '4.2 MB', date: 'Oct 12, 2025', category: 'Manuals',
      content: (
        <div>
          <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '24px', borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>CENTRIFUGAL PUMP - OPERATING MANUAL</h1>
          <h2>1. Specifications</h2>
          <ul>
            <li><strong>Flow Rate:</strong> 150 m3/h</li>
            <li><strong>Head:</strong> 45 m</li>
            <li><strong>Motor Power:</strong> 75 kW</li>
          </ul>
          <h2>2. Maintenance Schedule</h2>
          <ul>
            <li><strong>Daily:</strong> Check bearing temperature and vibration.</li>
            <li><strong>Monthly:</strong> Inspect mechanical seals for leakage.</li>
            <li><strong>Annually:</strong> Overhaul and replace wear rings.</li>
          </ul>
          <div style={{ marginTop: '30px', padding: '15px', background: '#ffebee', color: '#c62828', borderLeft: '4px solid #c62828' }}>
            <strong>WARNING:</strong> Do not operate below minimum continuous stable flow (MCSF).
          </div>
        </div>
      )
    },
    { 
      name: 'Q3 Maintenance Audit.docx', type: 'Word', size: '1.1 MB', date: 'Sep 28, 2025', category: 'Reports',
      content: (
        <div style={{ fontFamily: 'serif' }}>
          <h1 style={{ fontSize: '28px', color: '#1a365d', marginBottom: '10px' }}>Q3 MAINTENANCE AUDIT REPORT</h1>
          <p><strong>Date:</strong> Sep 28, 2025<br/><strong>Auditor:</strong> Dr. Sarah Chen</p>
          <hr style={{ margin: '20px 0' }}/>
          <h3>Findings</h3>
          <p>Compliance across rotating equipment stands at <strong>94%</strong>. Critical gap identified in Feed Surge Drum inspection schedule. Vibration on Main Feed Pump is trending upwards. Recommended immediate alignment check.</p>
          <h3>Action Items</h3>
          <ol>
            <li>Schedule Surge Drum inspection immediately.</li>
            <li>Create work order for Main Feed Pump.</li>
          </ol>
        </div>
      )
    },
    { 
      name: 'Safety Procedures v2.pdf', type: 'PDF', size: '2.8 MB', date: 'Aug 15, 2025', category: 'Compliance',
      content: (
        <div>
          <h1 style={{ fontSize: '24px', color: '#2e7d32' }}>PLANT SAFETY PROCEDURES (v2)</h1>
          <h2 style={{ marginTop: '20px' }}>Section 4: Confined Space Entry</h2>
          <ul>
            <li>All personnel must obtain a valid permit before entering any vessel.</li>
            <li>Atmosphere testing must be conducted prior to entry and continuously monitored.</li>
            <li>A standby person must be stationed at the entrance at all times.</li>
          </ul>
          <h2 style={{ marginTop: '20px' }}>Section 5: Lockout/Tagout (LOTO)</h2>
          <p>Energy sources must be isolated and locked out before maintenance operations begin.</p>
        </div>
      )
    },
    { 
      name: 'Compressor Wiring Diagram.dwg', type: 'CAD', size: '15.6 MB', date: 'Jul 04, 2025', category: 'Schematics',
      content: (
        <div style={{ background: '#002b36', color: '#839496', padding: '20px', fontFamily: 'monospace' }}>
          <h2 style={{ color: '#b58900' }}>[CAD Viewer Simulation]</h2>
          <p style={{ color: '#2aa198' }}>COMPRESSOR WIRING DIAGRAM</p>
          <ul style={{ listStyleType: 'none', paddingLeft: 0 }}>
            <li>- Main Power Feed: 415V, 3-Phase</li>
            <li>- Control Circuit: 110V AC</li>
            <li>- PLC I/O Terminals:</li>
            <li style={{ paddingLeft: '20px', color: '#cb4b16' }}>DI01: Start Pushbutton</li>
            <li style={{ paddingLeft: '20px', color: '#cb4b16' }}>DI02: Stop Pushbutton</li>
            <li style={{ paddingLeft: '20px', color: '#268bd2' }}>AI01: Discharge Temperature</li>
            <li style={{ paddingLeft: '20px', color: '#268bd2' }}>AI02: Lube Oil Pressure</li>
          </ul>
          <p style={{ marginTop: '30px', fontStyle: 'italic', color: '#93a1a1' }}>*Drawing approved by Marcus Johnson*</p>
        </div>
      )
    },
    { 
      name: 'Incident Report #402.pdf', type: 'PDF', size: '0.8 MB', date: 'Jun 22, 2025', category: 'Incidents',
      content: (
        <div>
          <h1 style={{ color: '#d32f2f' }}>INCIDENT REPORT #402</h1>
          <table style={{ width: '100%', marginBottom: '20px', borderCollapse: 'collapse' }}>
            <tbody>
              <tr><td style={{ padding: '8px', border: '1px solid #ddd' }}><strong>Date of Incident:</strong></td><td style={{ padding: '8px', border: '1px solid #ddd' }}>Jun 21, 2025</td></tr>
              <tr><td style={{ padding: '8px', border: '1px solid #ddd' }}><strong>Location:</strong></td><td style={{ padding: '8px', border: '1px solid #ddd' }}>Unit 2 Pipe Rack</td></tr>
            </tbody>
          </table>
          <h3>Description</h3>
          <p>Minor seal leak detected on Heat Exchanger during startup sequence. No personnel exposure. Leak was contained within 15 minutes.</p>
          <h3>Root Cause</h3>
          <p>Thermal shock due to rapid heating rate exceeding OEM recommendations.</p>
          <h3>Preventive Action</h3>
          <p>Update startup procedure to restrict heating rate to 50°C/hr.</p>
        </div>
      )
    },
    { 
      name: 'Control Valve Calibration Log.xlsx', type: 'Excel', size: '0.5 MB', date: 'Jun 10, 2025', category: 'Reports',
      content: (
        <div style={{ fontFamily: 'sans-serif' }}>
          <h1 style={{ fontSize: '20px', color: '#107c41', marginBottom: '15px' }}>CALIBRATION LOG - VALVES</h1>
          <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
            <thead>
              <tr style={{ background: '#107c41', color: 'white' }}>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Tag ID</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Location</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Set Point</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Deviation</th>
                <th style={{ padding: '8px', border: '1px solid #ddd' }}>Status</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={{ padding: '8px', border: '1px solid #ddd' }}>V-401</td><td style={{ padding: '8px', border: '1px solid #ddd' }}>Boiler Feed</td><td style={{ padding: '8px', border: '1px solid #ddd' }}>45%</td><td style={{ padding: '8px', border: '1px solid #ddd', color: 'green' }}>0.5%</td><td style={{ padding: '8px', border: '1px solid #ddd' }}>Pass</td></tr>
              <tr><td style={{ padding: '8px', border: '1px solid #ddd' }}>V-404</td><td style={{ padding: '8px', border: '1px solid #ddd' }}>Cooling Water</td><td style={{ padding: '8px', border: '1px solid #ddd' }}>60%</td><td style={{ padding: '8px', border: '1px solid #ddd', color: 'red' }}>3.2%</td><td style={{ padding: '8px', border: '1px solid #ddd' }}>Fail</td></tr>
              <tr><td style={{ padding: '8px', border: '1px solid #ddd' }}>V-405</td><td style={{ padding: '8px', border: '1px solid #ddd' }}>Main Steam</td><td style={{ padding: '8px', border: '1px solid #ddd' }}>100%</td><td style={{ padding: '8px', border: '1px solid #ddd', color: 'green' }}>0.1%</td><td style={{ padding: '8px', border: '1px solid #ddd' }}>Pass</td></tr>
            </tbody>
          </table>
        </div>
      )
    },
    { 
      name: 'Hazardous Materials Handling.pdf', type: 'PDF', size: '3.1 MB', date: 'May 14, 2025', category: 'Compliance',
      content: (
        <div>
          <h1 style={{ fontSize: '24px', color: '#c62828' }}>HAZMAT HANDLING GUIDELINES</h1>
          <hr style={{ margin: '15px 0', borderColor: '#c62828' }}/>
          <h2>Personal Protective Equipment (PPE)</h2>
          <p>The following PPE is mandatory when handling corrosive substances:</p>
          <ul>
            <li>Chemical splash goggles</li>
            <li>Face shield</li>
            <li>Neoprene or Nitrile gloves</li>
            <li>Acid-resistant apron</li>
          </ul>
          <h2>Spill Response</h2>
          <p>In the event of a chemical spill exceeding 5 gallons, immediately evacuate the area and notify the Emergency Response Team at Ext. 5555.</p>
        </div>
      )
    },
    { 
      name: 'Turbine Vibration Analysis.pdf', type: 'PDF', size: '6.4 MB', date: 'May 02, 2025', category: 'Reports',
      content: (
        <div style={{ padding: '20px', fontFamily: 'serif' }}>
          <h1 style={{ fontSize: '22px', borderBottom: '1px solid #ccc', paddingBottom: '10px' }}>VIBRATION ANALYSIS REPORT - T101</h1>
          <p><strong>Executive Summary:</strong> Routine spectral analysis reveals a 1X running speed vibration peak on the outboard bearing, indicating potential mass unbalance.</p>
          <div style={{ background: '#f5f5f5', padding: '15px', border: '1px solid #ddd', margin: '20px 0' }}>
            <h3 style={{ marginTop: 0 }}>Spectral Data Summary</h3>
            <ul>
              <li><strong>1X Amplitude:</strong> 4.5 mm/s RMS (Warning Limit: 4.0 mm/s)</li>
              <li><strong>2X Amplitude:</strong> 1.2 mm/s RMS (Normal)</li>
              <li><strong>High Frequency:</strong> No significant bearing defect frequencies detected.</li>
            </ul>
          </div>
          <p><strong>Recommendation:</strong> Schedule field balancing during the next planned outage.</p>
        </div>
      )
    },
    { 
      name: 'Heat Exchanger P&ID.dwg', type: 'CAD', size: '12.2 MB', date: 'Apr 28, 2025', category: 'Schematics',
      content: (
        <div style={{ background: '#1e1e1e', color: '#d4d4d4', padding: '30px', fontFamily: 'monospace' }}>
          <h2 style={{ color: '#569cd6' }}>PIPING & INSTRUMENTATION DIAGRAM</h2>
          <p style={{ color: '#ce9178' }}>System: Heat Recovery Unit E-301</p>
          <div style={{ border: '1px solid #4d4d4d', padding: '20px', marginTop: '20px' }}>
            <p><strong>INLET:</strong> 6" CS Pipe, Sch 40 -&gt; TI-301 -&gt; FI-301 -&gt; E-301 (Tube Side)</p>
            <p><strong>OUTLET:</strong> E-301 -&gt; TI-302 -&gt; PI-302 -&gt; 6" CS Pipe</p>
            <p style={{ color: '#d16969' }}>Note: Relief valve PSV-301 set at 150 PSIG.</p>
          </div>
        </div>
      )
    },
    { 
      name: 'Annual Environmental Audit.pdf', type: 'PDF', size: '5.5 MB', date: 'Mar 15, 2025', category: 'Compliance',
      content: (
        <div style={{ fontFamily: 'sans-serif' }}>
          <h1 style={{ fontSize: '26px', color: '#2e7d32' }}>ENVIRONMENTAL AUDIT 2024</h1>
          <p><strong>Prepared by:</strong> EcoSafe Consulting Group</p>
          <h2>Emissions Data</h2>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '10px' }}>
            <tbody>
              <tr><td style={{ padding: '8px', border: '1px solid #ddd' }}>SOx Emissions</td><td style={{ padding: '8px', border: '1px solid #ddd' }}>42 ppm (Limit: 50 ppm)</td></tr>
              <tr><td style={{ padding: '8px', border: '1px solid #ddd' }}>NOx Emissions</td><td style={{ padding: '8px', border: '1px solid #ddd' }}>18 ppm (Limit: 25 ppm)</td></tr>
              <tr><td style={{ padding: '8px', border: '1px solid #ddd' }}>Particulate Matter</td><td style={{ padding: '8px', border: '1px solid #ddd' }}>12 mg/Nm3 (Limit: 20 mg/Nm3)</td></tr>
            </tbody>
          </table>
          <h2>Conclusion</h2>
          <p>The facility remains fully compliant with all state and federal environmental regulations.</p>
        </div>
      )
    },
    { 
      name: 'Boiler Operation Manual.pdf', type: 'PDF', size: '8.1 MB', date: 'Feb 10, 2025', category: 'Manuals',
      content: (
        <div>
          <h1 style={{ fontSize: '24px', borderBottom: '3px solid #333' }}>INDUSTRIAL BOILER B-500</h1>
          <h2>Startup Procedure</h2>
          <ol>
            <li>Verify all drain valves are closed.</li>
            <li>Open feedwater inlet valve slowly to fill drum to normal operating level.</li>
            <li>Start forced draft fan and purge furnace for 5 minutes.</li>
            <li>Ignite pilot burner.</li>
            <li>Gradually increase firing rate to match load demand.</li>
          </ol>
          <div style={{ padding: '15px', background: '#e3f2fd', borderLeft: '4px solid #1976d2', marginTop: '20px' }}>
            <strong>Note:</strong> Always monitor drum level closely during startup to avoid low-water trip.
          </div>
        </div>
      )
    },
    { 
      name: 'Lubrication Schedule.xlsx', type: 'Excel', size: '0.3 MB', date: 'Jan 22, 2025', category: 'Manuals',
      content: (
        <div style={{ fontFamily: 'sans-serif' }}>
          <h1 style={{ fontSize: '20px', color: '#107c41' }}>PLANT LUBRICATION SCHEDULE</h1>
          <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: '15px' }}>
            <thead>
              <tr style={{ background: '#f3f2f1' }}>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Asset</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Lube Type</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Frequency</th>
                <th style={{ padding: '10px', border: '1px solid #ddd', textAlign: 'left' }}>Last Done</th>
              </tr>
            </thead>
            <tbody>
              <tr><td style={{ padding: '10px', border: '1px solid #ddd' }}>Pump P-101A</td><td style={{ padding: '10px', border: '1px solid #ddd' }}>ISO VG 68</td><td style={{ padding: '10px', border: '1px solid #ddd' }}>Quarterly</td><td style={{ padding: '10px', border: '1px solid #ddd' }}>Oct 15, 2025</td></tr>
              <tr><td style={{ padding: '10px', border: '1px solid #ddd' }}>Compressor C-202</td><td style={{ padding: '10px', border: '1px solid #ddd' }}>Synthetic PAO 46</td><td style={{ padding: '10px', border: '1px solid #ddd' }}>Semi-Annual</td><td style={{ padding: '10px', border: '1px solid #ddd' }}>Jul 01, 2025</td></tr>
              <tr><td style={{ padding: '10px', border: '1px solid #ddd' }}>Conveyor Motor M-30</td><td style={{ padding: '10px', border: '1px solid #ddd' }}>Lithium Grease EP2</td><td style={{ padding: '10px', border: '1px solid #ddd' }}>Monthly</td><td style={{ padding: '10px', border: '1px solid #ddd' }}>Sep 05, 2025</td></tr>
            </tbody>
          </table>
        </div>
      )
    },
    { 
      name: 'Contractor Safety Briefing.pdf', type: 'PDF', size: '1.4 MB', date: 'Jan 05, 2025', category: 'Compliance',
      content: (
        <div>
          <h1 style={{ fontSize: '26px', color: '#ff8f00' }}>CONTRACTOR SITE SAFETY</h1>
          <p>Welcome to the PlantBrain facility. All contractors must adhere to the following rules:</p>
          <ul style={{ lineHeight: '1.8' }}>
            <li><strong>Sign-In:</strong> Must sign in at the main security gate upon arrival.</li>
            <li><strong>Speed Limit:</strong> Maximum speed limit on site is 15 mph.</li>
            <li><strong>Smoking:</strong> Smoking is strictly prohibited except in designated areas.</li>
            <li><strong>Permits:</strong> Hot work and confined space entry require valid permits issued by plant operations.</li>
          </ul>
          <p style={{ marginTop: '30px', fontWeight: 'bold' }}>Violation of these rules will result in immediate removal from the site.</p>
        </div>
      )
    },
    { 
      name: 'Cooling Tower Structural Check.docx', type: 'Word', size: '2.1 MB', date: 'Dec 12, 2024', category: 'Reports',
      content: (
        <div style={{ fontFamily: 'serif' }}>
          <h1 style={{ fontSize: '24px' }}>STRUCTURAL INTEGRITY REPORT</h1>
          <h2>Asset: Cooling Tower CT-100</h2>
          <p><strong>Inspector:</strong> Apex Structural Engineering</p>
          <hr/>
          <h3>Visual Inspection Results</h3>
          <p>The concrete basin shows minor surface spalling, but no exposed rebar. The fiberglass fan deck is structurally sound with no signs of delamination.</p>
          <h3>Non-Destructive Testing (NDT)</h3>
          <p>Ultrasonic thickness measurements of the steel support columns indicate an average corrosion rate of 0.05 mm/year, well within the acceptable design allowance.</p>
          <p><strong>Status:</strong> Fit for continued service.</p>
        </div>
      )
    },
    { 
      name: 'Plant Layout Master.dwg', type: 'CAD', size: '24.8 MB', date: 'Nov 01, 2024', category: 'Schematics',
      content: (
        <div style={{ background: '#0a0a0a', color: '#fff', padding: '20px', fontFamily: 'monospace' }}>
          <h2 style={{ color: '#00bcd4' }}>PLANT MASTER LAYOUT (Rev C)</h2>
          <div style={{ border: '1px dashed #444', padding: '30px', marginTop: '20px', textAlign: 'center' }}>
            <p style={{ color: '#888' }}>[Complex Vector Geometry Rendering...]</p>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '40px', color: '#4caf50' }}>
              <span>Zone A: Process Units</span>
              <span>Zone B: Storage Tank Farm</span>
              <span>Zone C: Utilities & Power</span>
            </div>
          </div>
        </div>
      )
    }
  ];

  // Dynamically generate the rest of the files to match the exact folder counts requested
  // Manuals: 142, Compliance: 87, Schematics: 215
  const currentManualsCount = documents.filter(d => d.category === 'Manuals').length;
  for (let i = 0; i < 142 - currentManualsCount; i++) {
    documents.push({
      name: `Asset_Manual_AutoGen_${i + 1}.pdf`, type: 'PDF', size: `${((i % 5) + 1.1).toFixed(1)} MB`, date: 'Auto-generated', category: 'Manuals',
      content: <div style={{ padding: '20px' }}><h1>Standard Equipment Manual</h1><p>This is an auto-generated placeholder document for asset maintenance and operations.</p></div>
    });
  }

  const currentComplianceCount = documents.filter(d => d.category === 'Compliance').length;
  for (let i = 0; i < 87 - currentComplianceCount; i++) {
    documents.push({
      name: `Compliance_Record_${i + 1}.pdf`, type: 'PDF', size: `${((i % 3) + 0.5).toFixed(1)} MB`, date: 'Auto-generated', category: 'Compliance',
      content: <div style={{ padding: '20px' }}><h1>Compliance Certificate</h1><p>This document verifies adherence to standard industry regulations.</p></div>
    });
  }

  const currentSchematicsCount = documents.filter(d => d.category === 'Schematics').length;
  for (let i = 0; i < 215 - currentSchematicsCount; i++) {
    documents.push({
      name: `P_ID_Diagram_${i + 1}.dwg`, type: 'CAD', size: `${((i % 20) + 5.1).toFixed(1)} MB`, date: 'Auto-generated', category: 'Schematics',
      content: <div style={{ padding: '20px', background: '#002b36', color: '#2aa198' }}><h2>[CAD DATA]</h2><p>Auto-generated schematic drawing data...</p></div>
    });
  }

export default function DocumentVault({ addToast }: DocumentVaultProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedDoc, setSelectedDoc] = useState<any>(null);
  const [zoom, setZoom] = useState(1);
  const [visibleCount, setVisibleCount] = useState(7);
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [docs, setDocs] = useState<any[]>(documents);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('industrialIQ_docs');
    if (saved) {
      try {
        setDocs(JSON.parse(saved));
      } catch (e) {}
    }
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem('industrialIQ_docs', JSON.stringify(docs));
    }
  }, [docs, isLoaded]);

  const [isUploadModalOpen, setIsUploadModalOpen] = useState(false);
  const [uploadCategory, setUploadCategory] = useState('Manuals');
  const [uploadFile, setUploadFile] = useState<File | null>(null);

  const handleCategoryClick = (category: string) => {
    if (activeCategory === category) {
      setActiveCategory(null);
      setVisibleCount(7);
    } else {
      setActiveCategory(category);
      setVisibleCount(1000); // Show all files in category
    }
  };

  return (
    <div className="page-content" style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
      <div>
        <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '4px' }}>
          Engineering Documents
        </h2>
        <p style={{ fontSize: '13px', color: 'var(--text-tertiary)' }}>
          Secure, searchable repository for all industrial documentation
        </p>
      </div>

      <div className="card">
        <div className="flex flex-col-mobile gap-4 mb-6" style={{ display: 'flex', gap: '16px', marginBottom: '24px' }}>
          <div className="search-bar" style={{ flex: 1, display: 'flex', alignItems: 'center', background: 'var(--bg-tertiary)', padding: '8px 12px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-primary)' }}>
            <Search size={16} style={{ color: 'var(--text-muted)', marginRight: '8px' }} />
            <input type="text" placeholder="Search manuals, schematics, reports..." style={{ background: 'transparent', border: 'none', outline: 'none', color: 'var(--text-primary)', width: '100%' }} />
          </div>
          <button 
            className="btn btn-primary"
            onClick={() => setIsUploadModalOpen(true)}
          >
            Upload Document
          </button>
          
          <Modal 
            isOpen={isUploadModalOpen} 
            onClose={() => {
              setIsUploadModalOpen(false);
              setUploadFile(null);
            }} 
            title="Upload Document"
            footer={
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                <button className="btn btn-secondary" onClick={() => {
                  setIsUploadModalOpen(false);
                  setUploadFile(null);
                }}>Cancel</button>
                <button 
                  className="btn btn-primary" 
                  disabled={!uploadFile}
                  onClick={() => {
                    if (uploadFile) {
                      const newDoc = {
                        name: uploadFile.name,
                        type: uploadFile.name.split('.').pop()?.toUpperCase() || 'UNKNOWN',
                        size: (uploadFile.size / (1024 * 1024)).toFixed(1) + ' MB',
                        date: new Date().toLocaleDateString('en-IN', { month: 'short', day: 'numeric', year: 'numeric' }),
                        category: uploadCategory,
                        content: <div style={{ padding: '20px' }}><h2>{uploadFile.name}</h2><p>Document successfully uploaded and parsed.</p></div>
                      };
                      setDocs([newDoc, ...docs]);
                      if (addToast) addToast('success', 'Upload Complete', `Successfully uploaded ${uploadFile.name} to ${uploadCategory}`);
                      setIsUploadModalOpen(false);
                      setUploadFile(null);
                    }
                  }}
                >
                  Upload
                </button>
              </div>
            }
          >
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Select File</label>
                <input 
                  type="file" 
                  onChange={(e) => {
                    if (e.target.files && e.target.files.length > 0) {
                      setUploadFile(e.target.files[0]);
                    }
                  }}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-primary)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                />
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', fontSize: '14px', fontWeight: 500 }}>Category</label>
                <select 
                  value={uploadCategory} 
                  onChange={e => setUploadCategory(e.target.value)}
                  style={{ width: '100%', padding: '10px', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-primary)', background: 'var(--bg-tertiary)', color: 'var(--text-primary)' }}
                >
                  <option value="Manuals">Manuals</option>
                  <option value="Compliance">Compliance</option>
                  <option value="Schematics">Schematics</option>
                </select>
              </div>
            </div>
          </Modal>
        </div>

        <div className="grid-3" style={{ marginBottom: '24px', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
          <div 
            onClick={() => handleCategoryClick('Manuals')}
            style={{ padding: '16px', background: activeCategory === 'Manuals' ? 'var(--bg-secondary)' : 'var(--bg-tertiary)', border: activeCategory === 'Manuals' ? '1px solid var(--accent-primary)' : '1px solid transparent', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', transition: 'all 0.2s ease' }}
          >
            <Folder size={24} color="var(--accent-primary)" />
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px' }}>OEM Manuals</div>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{docs.filter(d => d.category === 'Manuals').length} files</div>
            </div>
          </div>
          <div 
            onClick={() => handleCategoryClick('Compliance')}
            style={{ padding: '16px', background: activeCategory === 'Compliance' ? 'var(--bg-secondary)' : 'var(--bg-tertiary)', border: activeCategory === 'Compliance' ? '1px solid var(--status-warning)' : '1px solid transparent', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', transition: 'all 0.2s ease' }}
          >
            <Folder size={24} color="var(--status-warning)" />
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px' }}>Compliance</div>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{docs.filter(d => d.category === 'Compliance').length} files</div>
            </div>
          </div>
          <div 
            onClick={() => handleCategoryClick('Schematics')}
            style={{ padding: '16px', background: activeCategory === 'Schematics' ? 'var(--bg-secondary)' : 'var(--bg-tertiary)', border: activeCategory === 'Schematics' ? '1px solid var(--accent-secondary)' : '1px solid transparent', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', transition: 'all 0.2s ease' }}
          >
            <Folder size={24} color="var(--accent-secondary)" />
            <div>
              <div style={{ fontWeight: 600, fontSize: '14px' }}>Schematics</div>
              <div style={{ fontSize: '11px', color: 'var(--text-tertiary)' }}>{docs.filter(d => d.category === 'Schematics').length} files</div>
            </div>
          </div>
        </div>

        <div style={{ overflowX: 'auto' }}>
          <table className="data-table" style={{ width: '100%', textAlign: 'left', borderCollapse: 'collapse' }}>
            <thead>
              <tr style={{ borderBottom: '1px solid var(--border-primary)', color: 'var(--text-muted)' }}>
                <th style={{ padding: '12px' }}>Name</th>
                <th style={{ padding: '12px' }}>Category</th>
                <th style={{ padding: '12px' }}>Size</th>
                <th style={{ padding: '12px' }}>Date Modified</th>
                <th style={{ padding: '12px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {(activeCategory ? docs.filter(d => d.category === activeCategory) : docs).slice(0, visibleCount).map((doc, i) => (
                <tr key={i} style={{ borderBottom: '1px solid var(--border-primary)' }}>
                  <td style={{ padding: '12px', display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 500 }}>
                    <File size={16} color="var(--text-muted)" /> {doc.name}
                  </td>
                  <td style={{ padding: '12px' }}>
                    <span style={{ padding: '2px 8px', background: 'var(--bg-tertiary)', borderRadius: '4px', fontSize: '11px' }}>
                      {doc.category}
                    </span>
                  </td>
                  <td style={{ padding: '12px', color: 'var(--text-tertiary)' }}>{doc.size}</td>
                  <td style={{ padding: '12px', color: 'var(--text-tertiary)' }}>{doc.date}</td>
                  <td style={{ padding: '12px' }}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button 
                        className="btn-icon" 
                        style={{ width: '28px', height: '28px' }}
                        onClick={() => {
                          setSelectedDoc(doc);
                          setZoom(1);
                          if (addToast) addToast('info', 'Opening Document', `Opening ${doc.name}...`);
                        }}
                        title="View Document"
                      >
                        <ExternalLink size={14} />
                      </button>
                      <button 
                        className="btn-icon" 
                        style={{ width: '28px', height: '28px' }}
                        onClick={() => addToast && addToast('success', 'Download Started', `Downloading ${doc.name}...`)}
                        title="Download Document"
                      >
                        <Download size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          
          {visibleCount < (activeCategory ? docs.filter(d => d.category === activeCategory) : docs).length && (
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
              <button 
                className="btn btn-secondary" 
                style={{ display: 'flex', alignItems: 'center', gap: '8px' }}
                onClick={() => setVisibleCount((activeCategory ? docs.filter(d => d.category === activeCategory) : docs).length)}
              >
                <ChevronDown size={16} /> Load More Documents
              </button>
            </div>
          )}
        </div>
      </div>
      
      {/* Document Viewer Modal */}
      <Modal isOpen={!!selectedDoc} onClose={() => setSelectedDoc(null)} title={selectedDoc?.name || 'Document Viewer'}>
        {selectedDoc && (
          <div style={{ display: 'flex', flexDirection: 'column', height: '70vh' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', background: 'var(--bg-tertiary)', borderBottom: '1px solid var(--border-primary)', borderRadius: 'var(--radius-md) var(--radius-md) 0 0' }}>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn-icon" onClick={() => setZoom(z => Math.max(0.5, z - 0.2))}><ZoomOut size={16} /></button>
                <span style={{ fontSize: '13px', alignSelf: 'center', minWidth: '40px', textAlign: 'center' }}>{Math.round(zoom * 100)}%</span>
                <button className="btn-icon" onClick={() => setZoom(z => Math.min(2, z + 0.2))}><ZoomIn size={16} /></button>
              </div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <button className="btn-icon"><Printer size={16} /></button>
                <button className="btn-icon" onClick={() => addToast && addToast('success', 'Download Started', `Downloading ${selectedDoc.name}...`)}><Download size={16} /></button>
              </div>
            </div>
            
            <div style={{
              flex: 1,
              overflow: 'auto',
              background: '#525659',
              padding: '24px',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'flex-start'
            }}>
              <div style={{
                background: selectedDoc.type === 'CAD' ? '#002b36' : 'white',
                color: 'black',
                width: '100%',
                maxWidth: '800px',
                minHeight: '842px', // A4 approximate
                padding: '40px',
                boxShadow: '0 4px 12px rgba(0,0,0,0.5)',
                transform: `scale(${zoom})`,
                transformOrigin: 'top center',
                transition: 'transform 0.2s ease',
              }}>
                {selectedDoc.content}
              </div>
            </div>
          </div>
        )}
      </Modal>
    </div>
  );
}
