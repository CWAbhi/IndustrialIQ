// ============================================================
// IndustrialIQ — Demo Data Layer
// Simulates a petrochemical plant: "BharatChem Industries"
// ============================================================

export interface Asset {
  id: string;
  tag: string;
  name: string;
  type: string;
  subType: string;
  manufacturer: string;
  model: string;
  installationDate: string;
  criticality: 'A' | 'B' | 'C';
  status: 'Running' | 'Standby' | 'Under Maintenance' | 'Shutdown';
  location: string;
  unit: string;
  area: string;
  healthScore: number;
  mtbfHours: number;
  lastPmDate: string;
  nextPmDue: string;
  specifications: Record<string, string>;
  sensors: SensorReading[];
  linkedDocuments: string[];
  linkedProcedures: string[];
}

export interface SensorReading {
  name: string;
  value: number;
  unit: string;
  status: 'normal' | 'warning' | 'critical';
  trend: 'stable' | 'increasing' | 'decreasing';
  threshold: { warning: number; critical: number };
}

export interface FailureRecord {
  id: string;
  assetId: string;
  date: string;
  description: string;
  severity: 'Minor' | 'Major' | 'Critical';
  failureMode: string;
  rootCause: string;
  rootCauseCategory: string;
  contributingFactors: string[];
  downtimeHours: number;
  costInr: number;
  resolution: string;
  resolvedBy: string;
  detectionMethod: string;
  failureDnaId: string;
  lessonsLearned: string;
}

export interface MaintenanceEvent {
  id: string;
  assetId: string;
  type: 'PM' | 'CM' | 'Overhaul' | 'Modification' | 'Inspection';
  date: string;
  description: string;
  duration: number;
  performedBy: string;
  procedure: string;
  findings: string;
  partsUsed: string[];
  status: 'Completed' | 'In Progress' | 'Planned' | 'Overdue';
}

export interface Procedure {
  id: string;
  title: string;
  type: 'SOP' | 'Work Instruction' | 'Checklist' | 'Emergency';
  applicableAssets: string[];
  revision: string;
  lastUpdated: string;
  author: string;
  steps: number;
  safetyRequirements: string[];
  estimatedDuration: string;
}

export interface Engineer {
  id: string;
  name: string;
  role: string;
  experience: number;
  expertise: string[];
  assetsExpertise: string[];
  diagnoses: number;
  lessonsContributed: number;
  status: 'Active' | 'Retiring Soon' | 'Retired';
  retirementDate?: string;
  avatar: string;
}

export interface FailureDNA {
  id: string;
  name: string;
  equipmentClass: string;
  operatingContext: string;
  precursorSymptoms: { symptom: string; timeline: string; severity: string }[];
  rootCauseChain: { level: string; cause: string }[];
  failureMode: string;
  consequence: string;
  resolutionGenome: { type: string; action: string }[];
  occurrences: number;
  matchConfidence: number;
  predictedFailureWindow: string;
}

export interface ComplianceItem {
  id: string;
  regulation: string;
  clause: string;
  description: string;
  status: 'Compliant' | 'Gap' | 'Overdue' | 'Upcoming';
  score: number;
  gaps: number;
  nextDeadline: string;
  evidence: string[];
  affectedAssets: string[];
}

export interface KnowledgeGraphNode {
  id: string;
  label: string;
  type: 'asset' | 'failure' | 'rootCause' | 'procedure' | 'person' | 'regulation' | 'sparePart' | 'lesson' | 'incident' | 'location' | 'vendor';
  properties: Record<string, string | number>;
}

export interface KnowledgeGraphEdge {
  source: string;
  target: string;
  relationship: string;
  confidence?: number;
  properties?: Record<string, string | number>;
}

export interface Alert {
  id: string;
  type: 'critical' | 'warning' | 'info' | 'success';
  title: string;
  description: string;
  timestamp: string;
  assetId?: string;
  actionRequired: boolean;
  actions: { label: string; type: 'primary' | 'secondary' | 'danger' }[];
  source: string;
  confidence?: number;
}

// ============================================================
// ENGINEERS
// ============================================================
export const engineers: Engineer[] = [
  {
    id: 'eng-001',
    name: 'Rajesh Sharma',
    role: 'Senior Reliability Engineer',
    experience: 25,
    expertise: ['Rotating Equipment', 'Vibration Analysis', 'Root Cause Analysis', 'Pump Systems'],
    assetsExpertise: ['P-101A', 'P-101B', 'C-201', 'C-301'],
    diagnoses: 47,
    lessonsContributed: 23,
    status: 'Retiring Soon',
    retirementDate: '2027-01-15',
    avatar: '👨‍🔧',
  },
  {
    id: 'eng-002',
    name: 'Priya Patel',
    role: 'Mechanical Engineer',
    experience: 5,
    expertise: ['Pump Maintenance', 'Alignment', 'Bearing Analysis'],
    assetsExpertise: ['P-101A', 'P-101B', 'P-301A'],
    diagnoses: 12,
    lessonsContributed: 5,
    status: 'Active',
    avatar: '👩‍🔧',
  },
  {
    id: 'eng-003',
    name: 'Amit Verma',
    role: 'Instrumentation Engineer',
    experience: 15,
    expertise: ['Process Control', 'DCS', 'Safety Systems', 'Calibration'],
    assetsExpertise: ['FT-101', 'PT-201', 'TT-301', 'SIS-001'],
    diagnoses: 34,
    lessonsContributed: 18,
    status: 'Active',
    avatar: '👨‍💻',
  },
  {
    id: 'eng-004',
    name: 'Sunita Reddy',
    role: 'Safety Officer',
    experience: 20,
    expertise: ['Process Safety', 'HAZOP', 'Incident Investigation', 'Permit to Work'],
    assetsExpertise: ['PSV-101', 'PSV-201', 'ESD-001'],
    diagnoses: 28,
    lessonsContributed: 31,
    status: 'Active',
    avatar: '👩‍⚕️',
  },
  {
    id: 'eng-005',
    name: 'Vikram Singh',
    role: 'Electrical Engineer',
    experience: 18,
    expertise: ['Motors', 'VFDs', 'Power Distribution', 'Protection Systems'],
    assetsExpertise: ['M-101A', 'M-101B', 'VFD-301', 'TR-001'],
    diagnoses: 22,
    lessonsContributed: 14,
    status: 'Active',
    avatar: '⚡',
  },
];

// ============================================================
// ASSETS
// ============================================================
export const assets: Asset[] = [
  {
    id: 'P-101A',
    tag: 'P-101A',
    name: 'Feed Pump A',
    type: 'Pump',
    subType: 'Centrifugal Pump',
    manufacturer: 'KSB',
    model: 'Etanorm 65-200',
    installationDate: '2018-03-15',
    criticality: 'A',
    status: 'Running',
    location: 'Ground Floor, East Side',
    unit: 'Unit-2',
    area: 'Area B',
    healthScore: 72,
    mtbfHours: 14200,
    lastPmDate: '2026-05-15',
    nextPmDue: '2026-08-15',
    specifications: {
      'Design Pressure': '16.0 bar',
      'Design Temperature': '150°C',
      'Flow Rate': '120 m³/hr',
      'Head': '45 m',
      'Speed': '2960 RPM',
      'Power': '45 kW',
      'Impeller Diameter': '200 mm',
      'Seal Type': 'John Crane Type 2800',
      'Bearing DE': 'SKF 6316-2Z',
      'Bearing NDE': 'SKF 6312-2Z',
    },
    sensors: [
      { name: 'Vibration (DE)', value: 4.2, unit: 'mm/s', status: 'warning', trend: 'increasing', threshold: { warning: 4.0, critical: 7.0 } },
      { name: 'Vibration (NDE)', value: 2.1, unit: 'mm/s', status: 'normal', trend: 'stable', threshold: { warning: 4.0, critical: 7.0 } },
      { name: 'Bearing Temp (DE)', value: 82, unit: '°C', status: 'warning', trend: 'increasing', threshold: { warning: 80, critical: 95 } },
      { name: 'Bearing Temp (NDE)', value: 64, unit: '°C', status: 'normal', trend: 'stable', threshold: { warning: 80, critical: 95 } },
      { name: 'Discharge Pressure', value: 14.2, unit: 'bar', status: 'normal', trend: 'stable', threshold: { warning: 15.5, critical: 16.0 } },
      { name: 'Motor Current', value: 72, unit: 'A', status: 'normal', trend: 'stable', threshold: { warning: 85, critical: 92 } },
    ],
    linkedDocuments: ['OEM Manual: KSB Etanorm 65-200 (Rev 3.2)', 'P&ID: Unit 2 Feed System (DWG-U2-PID-003)', 'Datasheet: P-101A/B'],
    linkedProcedures: ['SOP-MECH-042', 'SOP-MECH-015', 'SOP-MECH-089'],
  },
  {
    id: 'P-101B',
    tag: 'P-101B',
    name: 'Feed Pump B (Standby)',
    type: 'Pump',
    subType: 'Centrifugal Pump',
    manufacturer: 'KSB',
    model: 'Etanorm 65-200',
    installationDate: '2018-03-15',
    criticality: 'A',
    status: 'Standby',
    location: 'Ground Floor, East Side',
    unit: 'Unit-2',
    area: 'Area B',
    healthScore: 91,
    mtbfHours: 16800,
    lastPmDate: '2026-04-20',
    nextPmDue: '2026-07-20',
    specifications: {
      'Design Pressure': '16.0 bar',
      'Design Temperature': '150°C',
      'Flow Rate': '120 m³/hr',
      'Head': '45 m',
      'Speed': '2960 RPM',
      'Power': '45 kW',
    },
    sensors: [
      { name: 'Vibration (DE)', value: 1.8, unit: 'mm/s', status: 'normal', trend: 'stable', threshold: { warning: 4.0, critical: 7.0 } },
      { name: 'Bearing Temp (DE)', value: 42, unit: '°C', status: 'normal', trend: 'stable', threshold: { warning: 80, critical: 95 } },
    ],
    linkedDocuments: ['OEM Manual: KSB Etanorm 65-200 (Rev 3.2)'],
    linkedProcedures: ['SOP-MECH-042'],
  },
  {
    id: 'C-201',
    tag: 'C-201',
    name: 'Process Gas Compressor',
    type: 'Compressor',
    subType: 'Centrifugal Compressor',
    manufacturer: 'Atlas Copco',
    model: 'GT-Series 2800',
    installationDate: '2015-08-20',
    criticality: 'A',
    status: 'Running',
    location: 'Compressor House',
    unit: 'Unit-3',
    area: 'Area C',
    healthScore: 85,
    mtbfHours: 22400,
    lastPmDate: '2026-06-01',
    nextPmDue: '2026-09-01',
    specifications: {
      'Suction Pressure': '2.5 bar',
      'Discharge Pressure': '12.0 bar',
      'Flow Rate': '8500 Nm³/hr',
      'Power': '1200 kW',
      'Speed': '11,000 RPM',
      'Lube Oil': 'Mobil DTE 832',
    },
    sensors: [
      { name: 'Vibration (DE)', value: 2.8, unit: 'mm/s', status: 'normal', trend: 'stable', threshold: { warning: 5.0, critical: 8.0 } },
      { name: 'Axial Displacement', value: 0.15, unit: 'mm', status: 'normal', trend: 'stable', threshold: { warning: 0.3, critical: 0.5 } },
      { name: 'Discharge Temp', value: 142, unit: '°C', status: 'normal', trend: 'stable', threshold: { warning: 155, critical: 165 } },
      { name: 'Lube Oil Pressure', value: 3.2, unit: 'bar', status: 'normal', trend: 'stable', threshold: { warning: 2.0, critical: 1.5 } },
    ],
    linkedDocuments: ['OEM Manual: Atlas Copco GT-2800', 'P&ID: Unit 3 Gas Compression'],
    linkedProcedures: ['SOP-MECH-067', 'SOP-MECH-068'],
  },
  {
    id: 'E-204',
    tag: 'E-204',
    name: 'Product Cooler',
    type: 'Heat Exchanger',
    subType: 'Shell & Tube',
    manufacturer: 'Tema India',
    model: 'BEM 600-2400',
    installationDate: '2016-11-10',
    criticality: 'B',
    status: 'Running',
    location: 'Pipe Rack Level',
    unit: 'Unit-2',
    area: 'Area B',
    healthScore: 68,
    mtbfHours: 18200,
    lastPmDate: '2026-03-10',
    nextPmDue: '2026-09-10',
    specifications: {
      'Duty': '2.4 MW',
      'Shell Side': 'Cooling Water',
      'Tube Side': 'Process Fluid',
      'Design Pressure (Shell)': '6.0 bar',
      'Design Pressure (Tube)': '25.0 bar',
      'Surface Area': '120 m²',
    },
    sensors: [
      { name: 'Outlet Temperature', value: 52, unit: '°C', status: 'warning', trend: 'increasing', threshold: { warning: 50, critical: 60 } },
      { name: 'Pressure Drop', value: 0.8, unit: 'bar', status: 'warning', trend: 'increasing', threshold: { warning: 0.7, critical: 1.2 } },
    ],
    linkedDocuments: ['OEM Manual: Tema BEM 600', 'P&ID: Unit 2 Cooling System'],
    linkedProcedures: ['SOP-MECH-051', 'SOP-MECH-052'],
  },
  {
    id: 'V-105',
    tag: 'V-105',
    name: 'Feed Surge Drum',
    type: 'Vessel',
    subType: 'Pressure Vessel',
    manufacturer: 'L&T',
    model: 'Custom',
    installationDate: '2014-05-22',
    criticality: 'A',
    status: 'Running',
    location: 'Unit-2 Process Area',
    unit: 'Unit-2',
    area: 'Area A',
    healthScore: 88,
    mtbfHours: 0,
    lastPmDate: '2025-12-15',
    nextPmDue: '2026-06-15',
    specifications: {
      'Design Pressure': '18.0 bar',
      'Design Temperature': '200°C',
      'Material': 'SA 516 Gr 70',
      'Capacity': '15 m³',
      'Corrosion Allowance': '3 mm',
    },
    sensors: [
      { name: 'Level', value: 62, unit: '%', status: 'normal', trend: 'stable', threshold: { warning: 80, critical: 90 } },
      { name: 'Pressure', value: 12.5, unit: 'bar', status: 'normal', trend: 'stable', threshold: { warning: 16, critical: 17.5 } },
    ],
    linkedDocuments: ['Design Drawing: V-105 GA', 'IBR Certificate', 'PESO Registration'],
    linkedProcedures: ['SOP-INSP-012'],
  },
  {
    id: 'CWP-301A',
    tag: 'CWP-301A',
    name: 'Cooling Water Pump A',
    type: 'Pump',
    subType: 'Centrifugal Pump',
    manufacturer: 'Kirloskar',
    model: 'DB 150/26',
    installationDate: '2017-02-18',
    criticality: 'A',
    status: 'Running',
    location: 'CW Pump House',
    unit: 'Utilities',
    area: 'Area U',
    healthScore: 58,
    mtbfHours: 11800,
    lastPmDate: '2026-04-05',
    nextPmDue: '2026-07-05',
    specifications: {
      'Flow Rate': '800 m³/hr',
      'Head': '26 m',
      'Power': '90 kW',
      'Speed': '1480 RPM',
    },
    sensors: [
      { name: 'Vibration (DE)', value: 5.1, unit: 'mm/s', status: 'critical', trend: 'increasing', threshold: { warning: 4.0, critical: 7.0 } },
      { name: 'Bearing Temp (DE)', value: 78, unit: '°C', status: 'normal', trend: 'increasing', threshold: { warning: 80, critical: 95 } },
      { name: 'Flow Rate', value: 720, unit: 'm³/hr', status: 'warning', trend: 'decreasing', threshold: { warning: 750, critical: 650 } },
    ],
    linkedDocuments: ['OEM Manual: Kirloskar DB Series'],
    linkedProcedures: ['SOP-MECH-042', 'SOP-MECH-073'],
  },
  {
    id: 'CWP-301B',
    tag: 'CWP-301B',
    name: 'Cooling Water Pump B',
    type: 'Pump',
    subType: 'Centrifugal Pump',
    manufacturer: 'Kirloskar',
    model: 'DB 150/26',
    installationDate: '2017-02-18',
    criticality: 'A',
    status: 'Running',
    location: 'CW Pump House',
    unit: 'Utilities',
    area: 'Area U',
    healthScore: 62,
    mtbfHours: 12100,
    lastPmDate: '2026-04-20',
    nextPmDue: '2026-07-20',
    specifications: {
      'Flow Rate': '800 m³/hr',
      'Head': '26 m',
      'Power': '90 kW',
    },
    sensors: [
      { name: 'Vibration (DE)', value: 4.6, unit: 'mm/s', status: 'warning', trend: 'increasing', threshold: { warning: 4.0, critical: 7.0 } },
      { name: 'Bearing Temp (DE)', value: 75, unit: '°C', status: 'normal', trend: 'increasing', threshold: { warning: 80, critical: 95 } },
    ],
    linkedDocuments: ['OEM Manual: Kirloskar DB Series'],
    linkedProcedures: ['SOP-MECH-042'],
  },
  {
    id: 'PSV-201',
    tag: 'PSV-201',
    name: 'Reactor Relief Valve',
    type: 'Valve',
    subType: 'Pressure Safety Valve',
    manufacturer: 'Consolidated',
    model: '1900 Series',
    installationDate: '2015-06-10',
    criticality: 'A',
    status: 'Running',
    location: 'Reactor Top Platform',
    unit: 'Unit-3',
    area: 'Area C',
    healthScore: 95,
    mtbfHours: 0,
    lastPmDate: '2026-01-15',
    nextPmDue: '2027-01-15',
    specifications: {
      'Set Pressure': '22.0 bar',
      'Full Bore': '4" x 6" (J orifice)',
      'Material': 'SS 316',
      'Relieving Capacity': '12,000 kg/hr',
    },
    sensors: [],
    linkedDocuments: ['Calibration Certificate', 'IBR Form-II'],
    linkedProcedures: ['SOP-INSP-005'],
  },
];

// ============================================================
// FAILURE RECORDS
// ============================================================
export const failures: FailureRecord[] = [
  {
    id: 'F-2026-0892',
    assetId: 'P-101A',
    date: '2026-03-23',
    description: 'Drive-end bearing inner race spalling — catastrophic bearing failure',
    severity: 'Major',
    failureMode: 'Bearing Failure',
    rootCause: 'Shaft misalignment (0.12mm axial offset) due to foundation differential settling',
    rootCauseCategory: 'Mechanical — Alignment',
    contributingFactors: ['Foundation settling during monsoon', 'PM (laser alignment) deferred twice', 'Rigid baseplate design'],
    downtimeHours: 72,
    costInr: 2300000,
    resolution: 'DE bearing replaced (SKF 6316-2Z), laser alignment performed, foundation inspected',
    resolvedBy: 'Priya Patel',
    detectionMethod: 'Vibration monitoring',
    failureDnaId: 'FDN-2024-TS-0847',
    lessonsLearned: 'Foundation settling during monsoon causes misalignment in pumps with rigid base plates. Recommend flexible coupling + quarterly alignment checks for critical pumps.',
  },
  {
    id: 'F-2025-0456',
    assetId: 'P-101A',
    date: '2025-07-12',
    description: 'Mechanical seal failure — process fluid leak detected',
    severity: 'Major',
    failureMode: 'Seal Failure',
    rootCause: 'Shaft deflection caused by coupling misalignment post-monsoon',
    rootCauseCategory: 'Mechanical — Alignment',
    contributingFactors: ['Same alignment issue as 2026', 'Seal operating beyond design deflection limit'],
    downtimeHours: 48,
    costInr: 1800000,
    resolution: 'Seal replaced (John Crane Type 2800), alignment corrected',
    resolvedBy: 'Rajesh Sharma',
    detectionMethod: 'Operator observation — leak',
    failureDnaId: 'FDN-2024-TS-0847',
    lessonsLearned: 'Seal failures on P-101A correlate with alignment issues. Consider upgrading to cartridge seal with greater misalignment tolerance.',
  },
  {
    id: 'F-2024-0789',
    assetId: 'P-101A',
    date: '2024-09-05',
    description: 'NDE bearing failure — elevated temperature and vibration',
    severity: 'Minor',
    failureMode: 'Bearing Failure',
    rootCause: 'Shaft misalignment — same root cause as previous failures',
    rootCauseCategory: 'Mechanical — Alignment',
    contributingFactors: ['Monsoon season', 'Foundation issue not permanently resolved'],
    downtimeHours: 24,
    costInr: 450000,
    resolution: 'Bearing replaced, alignment corrected',
    resolvedBy: 'Priya Patel',
    detectionMethod: 'Condition monitoring',
    failureDnaId: 'FDN-2024-TS-0847',
    lessonsLearned: 'Third alignment-related failure confirms systemic foundation issue. Permanent fix required.',
  },
  {
    id: 'F-2023-0234',
    assetId: 'P-101A',
    date: '2023-04-18',
    description: 'Impeller erosion — performance degradation',
    severity: 'Minor',
    failureMode: 'Performance Degradation',
    rootCause: 'Erosion from suspended solids in feed stream',
    rootCauseCategory: 'Process — Contamination',
    contributingFactors: ['Upstream strainer bypass during cleaning', 'Feed quality variation'],
    downtimeHours: 16,
    costInr: 350000,
    resolution: 'Impeller trimmed and rebalanced',
    resolvedBy: 'Rajesh Sharma',
    detectionMethod: 'Performance monitoring — reduced flow at same head',
    failureDnaId: 'FDN-2023-ERODE-01',
    lessonsLearned: 'Never bypass strainer during operation. Install differential pressure alarm on strainer.',
  },
  {
    id: 'F-2022-0567',
    assetId: 'P-101A',
    date: '2022-11-28',
    description: 'Coupling failure — spider element deterioration',
    severity: 'Minor',
    failureMode: 'Coupling Failure',
    rootCause: 'Coupling spider aged beyond replacement interval',
    rootCauseCategory: 'Mechanical — Wear',
    contributingFactors: ['No scheduled spider replacement in PM plan'],
    downtimeHours: 8,
    costInr: 120000,
    resolution: 'Coupling spider replaced',
    resolvedBy: 'Priya Patel',
    detectionMethod: 'Routine inspection during PM',
    failureDnaId: 'FDN-COUPLING-01',
    lessonsLearned: 'Add coupling spider inspection/replacement to annual PM checklist.',
  },
  {
    id: 'F-2026-0445',
    assetId: 'CWP-301A',
    date: '2026-06-15',
    description: 'Bearing temperature alarm — accelerated bearing wear detected',
    severity: 'Major',
    failureMode: 'Bearing Wear',
    rootCause: 'Erosion-corrosion from elevated chloride levels in cooling water',
    rootCauseCategory: 'Process — Water Chemistry',
    contributingFactors: ['CW chloride levels 680 ppm (normal: 450 ppm)', 'Construction activity upstream of CT intake', 'No water treatment adjustment'],
    downtimeHours: 36,
    costInr: 1500000,
    resolution: 'Bearing replaced, water chemistry investigation initiated',
    resolvedBy: 'Rajesh Sharma',
    detectionMethod: 'Online vibration monitoring',
    failureDnaId: 'FDN-EROSION-CW-01',
    lessonsLearned: 'Cooling water chemistry degradation from construction runoff. Establish chemical dosing protocol and upstream monitoring.',
  },
  {
    id: 'F-2026-0501',
    assetId: 'CWP-301B',
    date: '2026-06-28',
    description: 'Elevated vibration — bearing defect frequency detected',
    severity: 'Major',
    failureMode: 'Bearing Wear',
    rootCause: 'Same erosion-corrosion mechanism as CWP-301A',
    rootCauseCategory: 'Process — Water Chemistry',
    contributingFactors: ['Common cooling water circuit', 'Same chloride exposure'],
    downtimeHours: 0,
    costInr: 0,
    resolution: 'Bearing replacement scheduled — monitoring increased to daily',
    resolvedBy: 'Priya Patel',
    detectionMethod: 'Pattern matching from CWP-301A failure',
    failureDnaId: 'FDN-EROSION-CW-01',
    lessonsLearned: 'Fleet-level pattern detection prevented unplanned failure on CWP-301B.',
  },
  {
    id: 'F-2025-0189',
    assetId: 'E-204',
    date: '2025-11-20',
    description: 'Severe tube fouling — heat transfer coefficient dropped 35%',
    severity: 'Major',
    failureMode: 'Fouling',
    rootCause: 'Cooling water quality deterioration combined with inadequate chemical treatment',
    rootCauseCategory: 'Process — Fouling',
    contributingFactors: ['CW Circuit #2 quality issues', 'Chemical dosing pump failure'],
    downtimeHours: 48,
    costInr: 800000,
    resolution: 'Hydrojet cleaning performed, chemical dosing restored',
    resolvedBy: 'Amit Verma',
    detectionMethod: 'Performance monitoring — outlet temperature trending high',
    failureDnaId: 'FDN-FOUL-HX-01',
    lessonsLearned: 'E-204 fouling linked to CW Circuit #2. Same circuit affecting CW pumps.',
  },
];

// ============================================================
// MAINTENANCE EVENTS
// ============================================================
export const maintenanceEvents: MaintenanceEvent[] = [
  { id: 'WO-2026-4892', assetId: 'P-101A', type: 'CM', date: '2026-03-23', description: 'Emergency bearing replacement — DE bearing seized', duration: 72, performedBy: 'Priya Patel', procedure: 'SOP-MECH-042', findings: 'Inner race spalling, cage damage. Misalignment measured at 0.12mm axial.', partsUsed: ['SKF 6316-2Z (DE Bearing)', 'Coupling Spider'], status: 'Completed' },
  { id: 'WO-2026-5123', assetId: 'P-101A', type: 'PM', date: '2026-05-15', description: 'Quarterly preventive maintenance — vibration check + lube', duration: 4, performedBy: 'Priya Patel', procedure: 'SOP-MECH-015', findings: 'Vibration levels normal post-repair. Alignment within tolerance.', partsUsed: ['Lube oil — Mobil SHC 630'], status: 'Completed' },
  { id: 'WO-2026-5567', assetId: 'C-201', type: 'PM', date: '2026-06-01', description: 'Semi-annual PM — vibration survey, oil analysis, performance check', duration: 8, performedBy: 'Rajesh Sharma', procedure: 'SOP-MECH-067', findings: 'All parameters within limits. Oil analysis shows normal wear metals.', partsUsed: [], status: 'Completed' },
  { id: 'WO-2026-5890', assetId: 'CWP-301A', type: 'CM', date: '2026-06-15', description: 'Emergency bearing replacement due to erosion-corrosion damage', duration: 36, performedBy: 'Rajesh Sharma', procedure: 'SOP-MECH-042', findings: 'Bearing inner race pitting. Signs of erosion-corrosion. Water chemistry to be investigated.', partsUsed: ['SKF 6316-C3 (DE Bearing)', 'Mechanical Seal'], status: 'Completed' },
  { id: 'WO-2026-6001', assetId: 'CWP-301B', type: 'CM', date: '2026-07-10', description: 'Planned bearing replacement based on fleet pattern detection', duration: 24, performedBy: 'Priya Patel', procedure: 'SOP-MECH-042', findings: 'Pending — scheduled proactive replacement', partsUsed: ['SKF 6316-C3 (DE Bearing)'], status: 'Planned' },
  { id: 'WO-2026-5200', assetId: 'E-204', type: 'PM', date: '2026-03-10', description: 'Annual cleaning and inspection', duration: 48, performedBy: 'Amit Verma', procedure: 'SOP-MECH-051', findings: 'Moderate fouling on shell side. Cleaned with hydrojet. No tube thinning detected.', partsUsed: ['Gasket set — HX E-204'], status: 'Completed' },
  { id: 'WO-2026-6100', assetId: 'V-105', type: 'Inspection', date: '2026-06-15', description: 'PESO statutory inspection — internal + external', duration: 16, performedBy: 'External Inspector', procedure: 'SOP-INSP-012', findings: 'Inspection overdue. Pending scheduling.', partsUsed: [], status: 'Overdue' },
  { id: 'WO-2026-6200', assetId: 'P-101A', type: 'PM', date: '2026-08-15', description: 'Quarterly PM — vibration, alignment check, lube analysis', duration: 4, performedBy: 'Priya Patel', procedure: 'SOP-MECH-015', findings: '', partsUsed: [], status: 'Planned' },
];

// ============================================================
// FAILURE DNA LIBRARY
// ============================================================
export const failureDNAs: FailureDNA[] = [
  {
    id: 'FDN-2024-TS-0847',
    name: 'Foundation-Induced Misalignment on Rigid Baseplate Pumps',
    equipmentClass: 'Centrifugal Pump (API 610, BB1)',
    operatingContext: 'High-temperature service, ground-level installation, monsoon-affected region',
    precursorSymptoms: [
      { symptom: 'Vibration amplitude gradual increase (1x and 2x)', timeline: '14-21 days before failure', severity: 'Early Warning' },
      { symptom: 'Bearing temperature increase (+8-15°C above baseline)', timeline: '7-14 days before failure', severity: 'Warning' },
      { symptom: 'Seal oil consumption increase (+10-20%)', timeline: '10-20 days before failure', severity: 'Early Warning' },
      { symptom: 'Audible noise change during operation', timeline: '1-3 days before failure', severity: 'Critical' },
    ],
    rootCauseChain: [
      { level: 'Primary', cause: 'Shaft misalignment (0.05-0.15mm axial offset)' },
      { level: 'Contributing', cause: 'Foundation differential settling during monsoon season' },
      { level: 'Enabling', cause: 'Rigid baseplate design susceptible to ground movement' },
      { level: 'Systemic', cause: 'PM interval insufficient for monsoon period (annual vs. quarterly)' },
    ],
    failureMode: 'Bearing inner race spalling → mechanical seal failure → process fluid leak',
    consequence: 'Unplanned shutdown (24-72 hours), ₹4.5-23 Lakhs repair cost',
    resolutionGenome: [
      { type: 'Immediate', action: 'Replace bearing + mechanical seal' },
      { type: 'Corrective', action: 'Laser alignment + foundation inspection' },
      { type: 'Preventive', action: 'Quarterly alignment checks during Jun-Nov' },
      { type: 'Design', action: 'Install flexible coupling (Rexnord Omega E40)' },
      { type: 'Permanent', action: 'Foundation re-grouting with epoxy resin' },
    ],
    occurrences: 23,
    matchConfidence: 0.87,
    predictedFailureWindow: '14-21 days from first precursor symptom',
  },
  {
    id: 'FDN-EROSION-CW-01',
    name: 'Erosion-Corrosion Accelerated Bearing Wear in CW Pumps',
    equipmentClass: 'Cooling Water Pump (Horizontal Centrifugal)',
    operatingContext: 'Open circuit cooling water, coastal/construction environment',
    precursorSymptoms: [
      { symptom: 'MTBF decline across pump fleet (>15% in 6 months)', timeline: '60-90 days before first failure', severity: 'Early Warning' },
      { symptom: 'Water chemistry — chloride increase (>500 ppm)', timeline: '30-60 days before failure', severity: 'Warning' },
      { symptom: 'Vibration increase on multiple pumps simultaneously', timeline: '14-30 days before failure', severity: 'Warning' },
      { symptom: 'Pump performance degradation (flow/head decline)', timeline: '7-21 days before failure', severity: 'Critical' },
    ],
    rootCauseChain: [
      { level: 'Primary', cause: 'Erosion-corrosion of bearing surfaces and wear rings' },
      { level: 'Contributing', cause: 'Elevated chloride levels in cooling water' },
      { level: 'Enabling', cause: 'Construction debris in makeup water source' },
      { level: 'Systemic', cause: 'No automatic CW chemistry monitoring with alarms' },
    ],
    failureMode: 'Accelerated bearing wear → increased clearances → vibration → seizure',
    consequence: 'Fleet-level failure risk, ₹15-54 Lakhs per pump failure',
    resolutionGenome: [
      { type: 'Immediate', action: 'Replace affected bearings and wear rings' },
      { type: 'Corrective', action: 'Investigate and address water chemistry root cause' },
      { type: 'Preventive', action: 'Install online chloride analyzer on CW circuit' },
      { type: 'Design', action: 'Upgrade to corrosion-resistant bearings (ceramic hybrid)' },
    ],
    occurrences: 8,
    matchConfidence: 0.94,
    predictedFailureWindow: '30-90 days from chemistry deviation',
  },
  {
    id: 'FDN-FOUL-HX-01',
    name: 'CW Circuit Fouling Cascade in Heat Exchangers',
    equipmentClass: 'Shell & Tube Heat Exchanger',
    operatingContext: 'Cooling water service, shared CW circuit',
    precursorSymptoms: [
      { symptom: 'Outlet temperature gradual increase', timeline: '30-60 days before intervention needed', severity: 'Warning' },
      { symptom: 'Pressure drop increase across exchanger', timeline: '20-40 days', severity: 'Warning' },
      { symptom: 'U-value decline >20%', timeline: '14-30 days', severity: 'Critical' },
    ],
    rootCauseChain: [
      { level: 'Primary', cause: 'Biological and particulate fouling on shell side' },
      { level: 'Contributing', cause: 'Inadequate biocide dosing' },
      { level: 'Enabling', cause: 'CW quality deterioration from same source as pump issues' },
    ],
    failureMode: 'Progressive fouling → reduced heat transfer → process temperature deviation',
    consequence: 'Product quality deviation, potential emergency cleaning shutdown',
    resolutionGenome: [
      { type: 'Immediate', action: 'Hydrojet cleaning' },
      { type: 'Corrective', action: 'Optimize biocide dosing program' },
      { type: 'Preventive', action: 'Monthly U-value monitoring with automatic alerts' },
    ],
    occurrences: 15,
    matchConfidence: 0.89,
    predictedFailureWindow: '30-60 days from first symptom',
  },
];

// ============================================================
// COMPLIANCE DATA
// ============================================================
export const complianceItems: ComplianceItem[] = [
  {
    id: 'comp-001',
    regulation: 'OISD-154',
    clause: 'Fire Protection Facilities',
    description: 'Fire protection systems inspection and maintenance',
    status: 'Compliant',
    score: 94,
    gaps: 2,
    nextDeadline: '2027-01-15',
    evidence: ['Fire water pump weekly test log', 'Fire detection system AMC records', 'Mock drill records'],
    affectedAssets: ['FWP-001', 'FWP-002', 'FD-SYSTEM'],
  },
  {
    id: 'comp-002',
    regulation: 'PESO',
    clause: 'Pressure Vessel Periodic Inspection',
    description: 'Statutory inspection of pressure vessels as per Indian Boiler Regulations',
    status: 'Overdue',
    score: 85,
    gaps: 3,
    nextDeadline: '2026-06-15',
    evidence: ['V-105 last inspection certificate', 'V-202 hydro test report'],
    affectedAssets: ['V-105', 'V-202', 'V-301'],
  },
  {
    id: 'comp-003',
    regulation: 'PNGRB',
    clause: 'Pipeline Integrity Management',
    description: 'Pipeline integrity assessment and management system',
    status: 'Gap',
    score: 88,
    gaps: 1,
    nextDeadline: '2026-12-30',
    evidence: ['Pipeline inspection records', 'Cathodic protection monitoring logs'],
    affectedAssets: ['PL-001', 'PL-002'],
  },
  {
    id: 'comp-004',
    regulation: 'Factory Act',
    clause: 'License Renewal',
    description: 'Factory operating license periodic renewal',
    status: 'Upcoming',
    score: 100,
    gaps: 0,
    nextDeadline: '2026-08-18',
    evidence: ['Current license', 'Safety audit report', 'Pollution control certificate'],
    affectedAssets: [],
  },
  {
    id: 'comp-005',
    regulation: 'IS-2062',
    clause: 'Structural Steel Standards',
    description: 'Compliance with Indian Standard for structural steel',
    status: 'Compliant',
    score: 100,
    gaps: 0,
    nextDeadline: '',
    evidence: ['Material test certificates', 'Structural integrity reports'],
    affectedAssets: [],
  },
  {
    id: 'comp-006',
    regulation: 'Environmental Clearance',
    clause: 'Emission Monitoring',
    description: 'Continuous emission monitoring and reporting',
    status: 'Compliant',
    score: 92,
    gaps: 1,
    nextDeadline: '2026-11-30',
    evidence: ['CEMS reports', 'Stack monitoring records', 'SPCB consent'],
    affectedAssets: ['STACK-001', 'STACK-002'],
  },
  {
    id: 'comp-007',
    regulation: 'OISD-GDN-206',
    clause: 'Safety Audit',
    description: 'Periodic safety audit as per OISD guidelines',
    status: 'Compliant',
    score: 96,
    gaps: 0,
    nextDeadline: '2027-03-15',
    evidence: ['Last audit report', 'Action plan closure report'],
    affectedAssets: [],
  },
];

// ============================================================
// PROACTIVE ALERTS
// ============================================================
export const alerts: Alert[] = [
  {
    id: 'alert-001',
    type: 'critical',
    title: 'CW Pump Fleet — MTBF Declining',
    description: 'Cooling Water Pump fleet (CWP-301 A/B/C/D) showing accelerated bearing wear. MTBF declined from 14,200 hrs to 11,800 hrs over 24 months. 94% Failure DNA match to "Erosion-Corrosion Accelerated Wear" pattern. Root cause: CW chloride levels elevated (680 ppm vs. 450 ppm baseline).',
    timestamp: '2026-07-04T08:30:00',
    assetId: 'CWP-301A',
    actionRequired: true,
    actions: [
      { label: 'View Analysis', type: 'primary' },
      { label: 'Create Work Order', type: 'secondary' },
      { label: 'Dismiss', type: 'danger' },
    ],
    source: 'Predictive Maintenance Agent',
    confidence: 0.94,
  },
  {
    id: 'alert-002',
    type: 'warning',
    title: 'Engineer Retirement — Knowledge at Risk',
    description: 'Rajesh Sharma (Senior Reliability Engineer, 25 years exp.) retiring in 6 months. 47 unique diagnoses, 23 lessons learned entries. 34% of rotating equipment tribal knowledge is attributed to him. Immediate knowledge capture recommended.',
    timestamp: '2026-07-04T07:00:00',
    actionRequired: true,
    actions: [
      { label: 'Start Knowledge Capture', type: 'primary' },
      { label: 'View Expert Profile', type: 'secondary' },
    ],
    source: 'Expert Memory Agent',
  },
  {
    id: 'alert-003',
    type: 'warning',
    title: 'PESO Inspection Overdue — V-105',
    description: 'Vessel V-105 (Feed Surge Drum) PESO periodic inspection is 19 days overdue. Regulatory non-compliance risk. Previous inspection: 2025-12-15. Due date: 2026-06-15.',
    timestamp: '2026-07-04T06:00:00',
    assetId: 'V-105',
    actionRequired: true,
    actions: [
      { label: 'Schedule Inspection', type: 'primary' },
      { label: 'View Compliance Status', type: 'secondary' },
    ],
    source: 'Compliance Agent',
  },
  {
    id: 'alert-004',
    type: 'warning',
    title: 'P-101A Vibration Trending High',
    description: 'Pump P-101A drive-end vibration at 4.2 mm/s (warning threshold: 4.0). Trend: increasing over last 14 days. Failure DNA match: 87% to "Foundation-Induced Misalignment" pattern. Predicted failure window: 14-21 days.',
    timestamp: '2026-07-04T09:15:00',
    assetId: 'P-101A',
    actionRequired: true,
    actions: [
      { label: 'View Failure DNA', type: 'primary' },
      { label: 'Schedule Alignment Check', type: 'secondary' },
    ],
    source: 'Predictive Maintenance Agent',
    confidence: 0.87,
  },
  {
    id: 'alert-005',
    type: 'success',
    title: 'Predictive Maintenance Saved ₹16L This Week',
    description: 'Proactive bearing replacement on CWP-301A (WO-2026-5890) prevented unplanned failure. Estimated savings: ₹16 Lakhs (avoided production loss + emergency repair premium).',
    timestamp: '2026-07-03T16:00:00',
    assetId: 'CWP-301A',
    actionRequired: false,
    actions: [
      { label: 'View Details', type: 'secondary' },
    ],
    source: 'Recommendation Agent',
  },
  {
    id: 'alert-006',
    type: 'info',
    title: 'Knowledge Gap Identified',
    description: 'No documented procedure exists for emergency response to Compressor C-201 surge event. 2 near-miss surge events recorded in last 3 years. Automatic SOP generation available.',
    timestamp: '2026-07-04T10:00:00',
    assetId: 'C-201',
    actionRequired: false,
    actions: [
      { label: 'Generate SOP Draft', type: 'primary' },
      { label: 'View Incidents', type: 'secondary' },
    ],
    source: 'Lessons Learned Agent',
  },
];

// ============================================================
// KNOWLEDGE GRAPH DATA
// ============================================================
export const knowledgeGraphNodes: KnowledgeGraphNode[] = [
  // Assets
  { id: 'P-101A', label: 'P-101A\nFeed Pump A', type: 'asset', properties: { criticality: 'A', health: 72, status: 'Running' } },
  { id: 'P-101B', label: 'P-101B\nFeed Pump B', type: 'asset', properties: { criticality: 'A', health: 91, status: 'Standby' } },
  { id: 'C-201', label: 'C-201\nGas Compressor', type: 'asset', properties: { criticality: 'A', health: 85, status: 'Running' } },
  { id: 'E-204', label: 'E-204\nProduct Cooler', type: 'asset', properties: { criticality: 'B', health: 68, status: 'Running' } },
  { id: 'CWP-301A', label: 'CWP-301A\nCW Pump A', type: 'asset', properties: { criticality: 'A', health: 58, status: 'Running' } },
  { id: 'CWP-301B', label: 'CWP-301B\nCW Pump B', type: 'asset', properties: { criticality: 'A', health: 62, status: 'Running' } },
  { id: 'V-105', label: 'V-105\nSurge Drum', type: 'asset', properties: { criticality: 'A', health: 88, status: 'Running' } },

  // Failures
  { id: 'F-2026-0892', label: 'F-2026-0892\nBearing Failure', type: 'failure', properties: { severity: 'Major', cost: 2300000 } },
  { id: 'F-2025-0456', label: 'F-2025-0456\nSeal Failure', type: 'failure', properties: { severity: 'Major', cost: 1800000 } },
  { id: 'F-2024-0789', label: 'F-2024-0789\nBearing Failure', type: 'failure', properties: { severity: 'Minor', cost: 450000 } },
  { id: 'F-2026-0445', label: 'F-2026-0445\nBearing Wear', type: 'failure', properties: { severity: 'Major', cost: 1500000 } },
  { id: 'F-2025-0189', label: 'F-2025-0189\nTube Fouling', type: 'failure', properties: { severity: 'Major', cost: 800000 } },

  // Root Causes
  { id: 'RC-MISALIGN', label: 'Shaft\nMisalignment', type: 'rootCause', properties: { category: 'Mechanical', occurrences: 23 } },
  { id: 'RC-FOUNDATION', label: 'Foundation\nSettling', type: 'rootCause', properties: { category: 'Structural', occurrences: 12 } },
  { id: 'RC-EROSION-CORR', label: 'Erosion-\nCorrosion', type: 'rootCause', properties: { category: 'Chemical', occurrences: 8 } },
  { id: 'RC-CW-QUALITY', label: 'CW Quality\nDegradation', type: 'rootCause', properties: { category: 'Process', occurrences: 15 } },
  { id: 'RC-FOULING', label: 'Fouling', type: 'rootCause', properties: { category: 'Process', occurrences: 15 } },

  // Procedures
  { id: 'SOP-MECH-042', label: 'SOP-MECH-042\nBearing Replacement', type: 'procedure', properties: { revision: '3.1', steps: 24 } },
  { id: 'SOP-MECH-015', label: 'SOP-MECH-015\nPump PM Checklist', type: 'procedure', properties: { revision: '2.0', steps: 18 } },
  { id: 'SOP-MECH-051', label: 'SOP-MECH-051\nHX Cleaning', type: 'procedure', properties: { revision: '1.5', steps: 32 } },

  // Engineers
  { id: 'eng-001', label: 'Rajesh Sharma\n25 yrs exp', type: 'person', properties: { role: 'Sr. Reliability Eng.', diagnoses: 47 } },
  { id: 'eng-002', label: 'Priya Patel\n5 yrs exp', type: 'person', properties: { role: 'Mech. Engineer', diagnoses: 12 } },
  { id: 'eng-003', label: 'Amit Verma\n15 yrs exp', type: 'person', properties: { role: 'Instrument Eng.', diagnoses: 34 } },

  // Lessons Learned
  { id: 'LL-001', label: 'Foundation settling\ncauses misalignment', type: 'lesson', properties: { validated: 'Yes', applicability: 'All ground-level pumps' } },
  { id: 'LL-002', label: 'CW chemistry affects\npump fleet MTBF', type: 'lesson', properties: { validated: 'Yes', applicability: 'All CW-served equipment' } },
  { id: 'LL-003', label: 'Never bypass\nstrainer during op', type: 'lesson', properties: { validated: 'Yes', applicability: 'All strainer-protected pumps' } },

  // Spare Parts
  { id: 'SP-BRG-6316', label: 'SKF 6316-2Z\nDE Bearing', type: 'sparePart', properties: { stock: 2, location: 'Bin A-47' } },
  { id: 'SP-SEAL-2800', label: 'JC Type 2800\nMech. Seal', type: 'sparePart', properties: { stock: 1, location: 'Bin B-12' } },

  // Vendors
  { id: 'VEN-KSB', label: 'KSB Pumps', type: 'vendor', properties: { type: 'OEM' } },
  { id: 'VEN-KIRLOSKAR', label: 'Kirloskar\nBrothers', type: 'vendor', properties: { type: 'OEM' } },

  // Location
  { id: 'LOC-UNIT2', label: 'Unit-2\nProcess Area', type: 'location', properties: {} },
  { id: 'LOC-UTIL', label: 'Utilities\nCW Pump House', type: 'location', properties: {} },

  // Regulation
  { id: 'REG-PESO', label: 'PESO\nPressure Vessels', type: 'regulation', properties: { status: 'Overdue' } },
  { id: 'REG-OISD', label: 'OISD-154\nFire Protection', type: 'regulation', properties: { status: 'Compliant' } },
];

export const knowledgeGraphEdges: KnowledgeGraphEdge[] = [
  // Asset → Failure
  { source: 'P-101A', target: 'F-2026-0892', relationship: 'HAD_FAILURE' },
  { source: 'P-101A', target: 'F-2025-0456', relationship: 'HAD_FAILURE' },
  { source: 'P-101A', target: 'F-2024-0789', relationship: 'HAD_FAILURE' },
  { source: 'CWP-301A', target: 'F-2026-0445', relationship: 'HAD_FAILURE' },
  { source: 'E-204', target: 'F-2025-0189', relationship: 'HAD_FAILURE' },

  // Failure → Root Cause
  { source: 'F-2026-0892', target: 'RC-MISALIGN', relationship: 'CAUSED_BY', confidence: 0.87 },
  { source: 'F-2025-0456', target: 'RC-MISALIGN', relationship: 'CAUSED_BY', confidence: 0.82 },
  { source: 'F-2024-0789', target: 'RC-MISALIGN', relationship: 'CAUSED_BY', confidence: 0.91 },
  { source: 'RC-MISALIGN', target: 'RC-FOUNDATION', relationship: 'CAUSED_BY', confidence: 0.85 },
  { source: 'F-2026-0445', target: 'RC-EROSION-CORR', relationship: 'CAUSED_BY', confidence: 0.94 },
  { source: 'RC-EROSION-CORR', target: 'RC-CW-QUALITY', relationship: 'CAUSED_BY', confidence: 0.88 },
  { source: 'F-2025-0189', target: 'RC-FOULING', relationship: 'CAUSED_BY', confidence: 0.89 },
  { source: 'RC-FOULING', target: 'RC-CW-QUALITY', relationship: 'LINKED_TO', confidence: 0.78 },

  // Asset → Procedure
  { source: 'P-101A', target: 'SOP-MECH-042', relationship: 'MAINTAINED_BY' },
  { source: 'P-101A', target: 'SOP-MECH-015', relationship: 'MAINTAINED_BY' },
  { source: 'CWP-301A', target: 'SOP-MECH-042', relationship: 'MAINTAINED_BY' },
  { source: 'E-204', target: 'SOP-MECH-051', relationship: 'MAINTAINED_BY' },

  // Person → Failure (diagnosed)
  { source: 'eng-001', target: 'F-2025-0456', relationship: 'DIAGNOSED' },
  { source: 'eng-001', target: 'F-2026-0445', relationship: 'DIAGNOSED' },
  { source: 'eng-002', target: 'F-2026-0892', relationship: 'DIAGNOSED' },
  { source: 'eng-002', target: 'F-2024-0789', relationship: 'DIAGNOSED' },
  { source: 'eng-003', target: 'F-2025-0189', relationship: 'DIAGNOSED' },

  // Person → Asset (expertise)
  { source: 'eng-001', target: 'P-101A', relationship: 'EXPERT_ON' },
  { source: 'eng-001', target: 'C-201', relationship: 'EXPERT_ON' },
  { source: 'eng-002', target: 'P-101A', relationship: 'EXPERT_ON' },
  { source: 'eng-002', target: 'CWP-301A', relationship: 'EXPERT_ON' },

  // Person → Person (mentorship)
  { source: 'eng-001', target: 'eng-002', relationship: 'MENTORED' },

  // Lessons Learned
  { source: 'F-2026-0892', target: 'LL-001', relationship: 'GENERATED' },
  { source: 'F-2025-0456', target: 'LL-001', relationship: 'GENERATED' },
  { source: 'F-2026-0445', target: 'LL-002', relationship: 'GENERATED' },

  // Spare Parts
  { source: 'P-101A', target: 'SP-BRG-6316', relationship: 'USES_PART' },
  { source: 'P-101A', target: 'SP-SEAL-2800', relationship: 'USES_PART' },

  // Vendor
  { source: 'P-101A', target: 'VEN-KSB', relationship: 'SUPPLIED_BY' },
  { source: 'P-101B', target: 'VEN-KSB', relationship: 'SUPPLIED_BY' },
  { source: 'CWP-301A', target: 'VEN-KIRLOSKAR', relationship: 'SUPPLIED_BY' },
  { source: 'CWP-301B', target: 'VEN-KIRLOSKAR', relationship: 'SUPPLIED_BY' },

  // Location
  { source: 'P-101A', target: 'LOC-UNIT2', relationship: 'LOCATED_IN' },
  { source: 'P-101B', target: 'LOC-UNIT2', relationship: 'LOCATED_IN' },
  { source: 'E-204', target: 'LOC-UNIT2', relationship: 'LOCATED_IN' },
  { source: 'CWP-301A', target: 'LOC-UTIL', relationship: 'LOCATED_IN' },
  { source: 'CWP-301B', target: 'LOC-UTIL', relationship: 'LOCATED_IN' },

  // Regulation
  { source: 'REG-PESO', target: 'V-105', relationship: 'GOVERNS' },
  { source: 'REG-OISD', target: 'CWP-301A', relationship: 'GOVERNS' },

  // Cross-asset connections (CW circuit)
  { source: 'CWP-301A', target: 'E-204', relationship: 'SUPPLIES_CW_TO' },
  { source: 'CWP-301B', target: 'E-204', relationship: 'SUPPLIES_CW_TO' },
  { source: 'P-101A', target: 'P-101B', relationship: 'STANDBY_FOR' },
];

// ============================================================
// CHAT DEMO RESPONSES
// ============================================================
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: string;
  sources?: { title: string; type: string; confidence: number }[];
  failureDnaMatch?: string;
  confidence?: number;
  graphHops?: number;
  actions?: { label: string; type: string }[];
}

export const demoChatResponses: Record<string, ChatMessage> = {
  'why does pump p-101a keep failing': {
    id: 'resp-001',
    role: 'assistant',
    content: `Based on analysis of **5 failure records**, maintenance history, and OEM documentation across **4 data sources**, I've identified a clear pattern:

## Primary Pattern: Alignment-Related Failures (60%)

**3 of 5 failures** are linked to shaft misalignment, and all 3 occurred during **monsoon season (June–September)**.

| Date | Failure | Root Cause | Downtime | Cost |
|------|---------|------------|----------|------|
| Mar 2026 | Bearing seizure | Misalignment (0.12mm) | 72 hrs | ₹23L |
| Jul 2025 | Seal failure | Shaft deflection | 48 hrs | ₹18L |
| Sep 2024 | Bearing failure | Misalignment | 24 hrs | ₹4.5L |
| Apr 2023 | Impeller erosion | Feed contamination | 16 hrs | ₹3.5L |
| Nov 2022 | Coupling failure | Spider wear | 8 hrs | ₹1.2L |

### 🧬 Root Cause Chain (Multi-hop Analysis)
\`\`\`
Bearing/Seal Failure ← Shaft Misalignment (0.05–0.15mm)
  ← Foundation Differential Settling
    ← Soil Moisture Change During Monsoon
      ← Rigid Baseplate on Ground-Level Pad
\`\`\`

### 🧬 Failure DNA Match: FDN-2024-TS-0847 (87% match)
Pattern: *"Foundation-Induced Misalignment on Rigid Baseplate Pumps"* — observed in **23 similar installations** across the fleet.

> 💡 **Key Insight:** Sister pump P-101B (elevated platform, different foundation design) has **zero alignment failures** — confirming the foundation as root cause.

### Recommended Actions
1. **Immediate:** Schedule quarterly laser alignment checks during Jun-Nov *(₹15,000/check)*
2. **Short-term:** Install flexible coupling — Rexnord Omega E40 *(₹2.5L, compatible per OEM)*
3. **Permanent:** Foundation re-grouting with epoxy resin *(₹8L, eliminates root cause)*

**Estimated annual savings:** ₹25–50 Lakhs (prevent 1-2 failures/year)

### 👤 Expert Knowledge
> *"P-101A has a known issue with the DE bearing housing — the tolerance is on the loose side. Use Loctite 641 on reassembly. Don't over-tighten the bearing lock nut — torque to 180 Nm, not the manual spec of 220 Nm."*
> — **Rajesh Sharma**, documented during WO-3654 (2022-11)`,
    timestamp: new Date().toISOString(),
    sources: [
      { title: 'Failure Report F-2026-0892', type: 'Incident Report', confidence: 0.95 },
      { title: 'Failure Report F-2025-0456', type: 'Incident Report', confidence: 0.95 },
      { title: 'OEM Manual KSB Etanorm Rev 3.2 (p.47)', type: 'OEM Manual', confidence: 0.92 },
      { title: 'Engineer Notes — Rajesh Sharma (2022-11)', type: 'Expert Knowledge', confidence: 0.88 },
      { title: 'Maintenance Record WO-2026-4892', type: 'CMMS Record', confidence: 0.97 },
    ],
    failureDnaMatch: 'FDN-2024-TS-0847',
    confidence: 0.87,
    graphHops: 4,
    actions: [
      { label: 'View Failure DNA', type: 'primary' },
      { label: 'Create Work Order', type: 'secondary' },
      { label: 'View Knowledge Graph', type: 'secondary' },
    ],
  },
  'what maintenance is overdue': {
    id: 'resp-002',
    role: 'assistant',
    content: `## Overdue Maintenance Items

| Priority | Asset | Type | Description | Due Date | Overdue By |
|----------|-------|------|-------------|----------|------------|
| 🔴 **Critical** | V-105 | Inspection | PESO statutory inspection | Jun 15 | **19 days** |
| 🟡 **High** | CWP-301B | CM | Bearing replacement (fleet pattern) | Jul 10 | Scheduled |
| 🟡 **High** | P-101A | PM | Quarterly alignment check | Aug 15 | Upcoming |
| 🟢 **Normal** | E-204 | PM | Annual cleaning inspection | Sep 10 | 68 days |

### ⚠️ Regulatory Risk
**V-105 PESO inspection** is the highest priority — 19 days overdue. Non-compliance penalty risk: **₹25-50 Lakhs**. Recommend immediate scheduling.

### 🧬 Proactive Item
**CWP-301B bearing replacement** was added proactively based on fleet-level Failure DNA pattern matching. CWP-301A already failed with same pattern — replacing CWP-301B bearing before failure will save an estimated **₹16 Lakhs**.`,
    timestamp: new Date().toISOString(),
    sources: [
      { title: 'CMMS Maintenance Schedule', type: 'CMMS', confidence: 0.98 },
      { title: 'PESO Regulation — IBR Clause 378', type: 'Regulation', confidence: 0.95 },
      { title: 'Failure DNA Match FDN-EROSION-CW-01', type: 'Predictive', confidence: 0.94 },
    ],
    confidence: 0.95,
    graphHops: 2,
  },
};

// ============================================================
// PLANT KPIs
// ============================================================
export const plantKPIs = {
  healthIndex: 87,
  healthTrend: 3,
  equipmentAvailability: 94.2,
  safetyIndex: 0.42,
  safetyTrend: -0.08,
  complianceScore: 91,
  knowledgeCoverage: 78,
  knowledgeTrend: 5,
  activeAlerts: { critical: 1, warning: 3, info: 2, total: 6 },
  financialImpact: {
    downtimeAvoided: 47000000,
    costReduction: 12000000,
    complianceSaved: 6500000,
    efficiencyGains: 8900000,
    totalQuarter: 74400000,
    platformCost: 4500000,
  },
  knowledgeStats: {
    engineerYears: 3200,
    failurePatterns: 847,
    proceduresLinked: 1234,
    tribalKnowledgeEntries: 56,
    documentsIngested: 12847,
    graphNodes: 52340,
    graphRelationships: 156720,
  },
};
