**Built for ET AI Hackathon 2026 – Problem Statement #8**
# PlantBrain

> **An AI-powered Industrial Knowledge Intelligence Platform that transforms fragmented engineering knowledge into a living Operational Brain.**


[![Next.js](https://img.shields.io/badge/Next.js-15-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Knowledge Graph](https://img.shields.io/badge/Knowledge_Graph-D3.js-F9A03C?style=flat-square)](https://d3js.org/)
[![Knowledge Intelligence](https://img.shields.io/badge/Knowledge_Intelligence-Powered-00ADD8?style=flat-square)]()
[![AI](https://img.shields.io/badge/AI-Expert_Copilot-FF6F00?style=flat-square)]()
[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg?style=flat-square)](https://opensource.org/licenses/MIT)
[![Hackathon](https://img.shields.io/badge/ET_AI_Hackathon-Submission-7A52B3?style=flat-square)]()

PlantBrain is an AI-powered Industrial Knowledge Intelligence Platform that demonstrates how engineering documents, asset information, maintenance history, and operational knowledge can be unified into a single interactive Operational Brain.

## Current MVP

This repository showcases the PlantBrain frontend prototype developed for the ET AI Hackathon.

Current implementation includes:

*   Operations Command Center
*   Expert Copilot
*   Knowledge Intelligence
*   Asset Performance
*   Reliability Intelligence
*   Compliance Dashboard
*   Engineering Documents
*   Engineering Expertise
*   Interactive D3 Knowledge Graph

The production architecture described in this repository represents the planned enterprise deployment of PlantBrain.

## Current Scope

PlantBrain currently demonstrates the frontend experience and interaction model for an Industrial Knowledge Intelligence Platform.

The backend AI orchestration, GraphRAG pipeline, enterprise integrations, and production-scale ingestion architecture are part of the proposed production deployment and are not fully implemented in this hackathon prototype.

---

## 🛑 Problem Statement

Modern heavy industry operates in a highly complex, data-rich environment, yet struggles with significant operational blind spots. The core challenges include:

*   **Fragmented Engineering Documents:** Critical operational data is locked in siloed PDFs, P&IDs, OEM manuals, and unstructured maintenance logs.
*   **Tribal Knowledge Loss:** Decades of invaluable engineering expertise retire with senior personnel, leaving junior engineers without crucial contextual guidance.
*   **Maintenance Inefficiency & Long MTTR:** Troubleshooting requires manually cross-referencing multiple disconnected systems (SCADA, CMMS, ERP), drastically increasing Mean Time To Repair (MTTR).
*   **Compliance Vulnerabilities:** Regulatory audits are manual, error-prone, and reactive, leading to severe compliance risks and potential shutdowns.
*   **Lack of Contextual Intelligence:** Traditional data lakes provide raw metrics but fail to deliver actionable, contextual reasoning across the asset lifecycle.

---

## 💡 Solution

PlantBrain solves this by creating a unified **Operational Brain**. 

It breaks down data silos by synthesizing structured and unstructured data into a singular, interactive Knowledge Graph. PlantBrain intelligently combines:

*   Engineering Documents & OEM Manuals
*   Maintenance History & Work Orders
*   Asset Telemetry (IoT/SCADA)
*   Inspection Reports & Compliance Standards
*   Lessons Learned & Root Cause Analyses (RCAs)

PlantBrain demonstrates how GraphRAG-inspired workflows and Knowledge Graphs can be used to provide contextual engineering assistance.

---

## 🚀 Key Innovations

### Expert Copilot
*   **What it does:** An intelligent, natural language interface that provides contextual responses using interconnected engineering knowledge.
*   **Why it matters:** Provides instant, context-aware answers to complex engineering queries, designed to support grounded engineering responses.
*   **Business value:** Drastically reduces search time and accelerates MTTR during critical breakdowns.
*   **Technical innovation:** Utilizes GraphRAG to traverse multi-hop relationships (e.g., Asset -> Component -> Failure History -> OEM Recommendation).

### Knowledge Intelligence
*   **What it does:** A highly interactive visual representation of the plant's operational data fabric.
*   **Why it matters:** Allows reliability engineers to visually explore relationships between physical assets, past incidents, and maintenance procedures.
*   **Business value:** Identifies systemic issues across asset classes that traditional tabular data conceals.
*   **Technical innovation:** Real-time force-directed graph rendering visualized using an interactive D3.js knowledge graph.

### Asset Performance Center
*   **What it does:** An interactive asset monitoring dashboard showcasing telemetry, KPIs, and operational insights.
*   **Why it matters:** Merges live telemetry with historical knowledge.
*   **Business value:** Enables proactive maintenance, significantly improving Overall Equipment Effectiveness (OEE).
*   **Technical innovation:** Designed to integrate live industrial telemetry in production deployments.

### Reliability Intelligence
*   **What it does:** Provides a centralized interface for exploring equipment anomalies, historical incidents, and maintenance insights.
*   **Why it matters:** Helps engineers quickly understand asset condition by combining historical context with operational information.
*   **Business value:** Supports faster troubleshooting and maintenance planning.
*   **Technical innovation:** Demonstrates how GraphRAG and Knowledge Graphs can enhance industrial reliability workflows.

### Governance & Compliance
*   **What it does:** Interactive compliance dashboard demonstrating regulatory workflows.
*   **Why it matters:** Replaces periodic manual audits with continuous compliance validation.
*   **Business value:** Ensures 24/7 audit readiness and mitigates multi-million dollar regulatory fines.
*   **Technical innovation:** Automated gap analysis mapping unstructured regulatory text directly to engineering documentation and compliance records.

---

## 📈 Expected Business Outcomes

PlantBrain delivers measurable, enterprise-scale ROI by targeting the most costly inefficiencies in industrial operations.

*   Faster engineering document search
*   Improved knowledge accessibility
*   Better maintenance planning
*   Enhanced collaboration
*   Improved compliance visibility
*   Reduced onboarding time
*   Preservation of engineering knowledge

---

## 🏗️ Architecture Overview

PlantBrain is built on a resilient, modular architecture designed for the strict security and performance requirements of industrial IT.

1.  **Presentation Layer (Next.js / React):** 
    Provides an ultra-responsive, Glassmorphism-styled unified interface for plant personnel, ensuring high usability in high-stress operational environments.
2.  **AI Reasoning Layer (LLMs / Agents):** 
    Supports engineering question answering and contextual assistance.
3.  **GraphRAG Engine:** 
    Bridges the semantic gap by combining traditional vector similarity search with deterministic graph traversals, designed to improve answer grounding through graph-aware retrieval.
4.  **Knowledge Graph Layer:** 
    The core ontological model mapping the complex relationships between physical assets, conceptual procedures, and historical events.
5.  **Planned semantic retrieval layer:** 
    Stores high-dimensional embeddings of all unstructured text (manuals, logs, standards) for rapid semantic retrieval.
6.  **Document Intelligence Pipeline:** 
    Designed to support OCR, document processing, and engineering knowledge extraction.
7.  **Production Integration Layer (Future):** 
    The ingestion layer connecting to live sensors, SAP PM, and IBM Maximo to stream real-time operational state.

---

## 🔄 System Workflow

The following illustrates the end-to-end data lifecycle within PlantBrain:

`Engineering Documents` ➔ `Structured Knowledge` ➔ `Interactive Knowledge Graph` ➔ `Expert Copilot` ➔ `Engineering Insights`

---

## 💻 Technology Stack

### Current MVP
*   Next.js
*   React
*   TypeScript
*   Tailwind CSS
*   D3.js
*   Lucide
*   Recharts
*   Local Mock Data

### Future Production
*   Neo4j
*   Qdrant
*   LangGraph
*   FastAPI
*   Apache Kafka

---

## 📁 Repository Structure

```text
/
├── app/src/app/                  # Next.js App Router: Global layouts, theme providers, and routing logic
├── app/src/components/           # Modular UI Architecture
│   ├── AssetIntelligence.tsx     # Real-time telemetry & asset health monitoring
│   ├── ChatInterface.tsx         # Expert Copilot conversational UI & GraphRAG interface
│   ├── ComplianceCenter.tsx      # Regulatory tracking & automated gap analysis engine
│   ├── DocumentVault.tsx         # Engineering document management & semantic search
│   ├── FailureAnalysis.tsx       # Root Cause Analysis & Reliability dashboard
│   ├── KnowledgeGraph.tsx        # Interactive D3.js ontology visualization
│   └── MaintenanceHub.tsx        # CMMS integration & Maintenance workflows
├── app/src/data/                 # Knowledge Graph & Telemetry Data simulation layer
└── public/                       # Static assets, branding, and icons
```

---

## ⚙️ Installation & Deployment

### Prerequisites
*   Node.js (v18.0.0 or higher)
*   npm or yarn

### Local Environment Setup

> **Note:** The repository is named `IndustrialIQ`, but the product is `PlantBrain`.

1. **Clone the repository:**
   ```bash
   git clone https://github.com/CWAbhi/IndustrialIQ.git
   cd IndustrialIQ/app
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start the development server:**
   ```bash
   npm run dev
   ```

4. **Access the platform:**
   Navigate to `http://localhost:3000` in your preferred browser.

### Production Build
```bash
npm run build
npm run start
```

---

## 🎬 Recommended Demo Flow

To fully experience the power of PlantBrain, follow this workflow:

1.  **Dashboard Overview:** Start at the *Operations Command Center* to view high-level plant health and active critical alerts.
2.  **Asset Inspection:** Navigate to the *Asset Performance Center*. Identify a degrading asset (e.g., Pump P-101A) and review its live vibration anomalies.
3.  **Knowledge Exploration:** Open *Knowledge Intelligence* to visually trace the relationships between Pump P-101A, its associated P&ID documents, and past failure incidents.
4.  **AI Consultation:** Switch to the *Expert Copilot*. Ask, *"What is the standard procedure for replacing the mechanical seal on Pump P-101A, and what were the lessons learned from the last failure?"*
5.  **Failure Analysis:** Explore Reliability Intelligence to review anomaly trends and maintenance insights.
6.  **Compliance Check:** Explore compliance dashboard to review regulatory information.

---

## 🆚 Why PlantBrain?

*   **Context-aware engineering assistance**
*   **Knowledge Graph navigation**
*   **Interactive operational insights**
*   **Centralized engineering knowledge**

---

## 🗺️ Future Roadmap

**Planned:**
*   Neo4j Knowledge Graph
*   GraphRAG Pipeline
*   Voice Copilot
*   SAP PM
*   IBM Maximo
*   OCR
*   Digital Twin
*   Agentic AI

---

## 🤝 Contributing

We welcome contributions from the industrial engineering and open-source AI communities. 

1. Fork the repository.
2. Create a feature branch (`git checkout -b feature/AmazingInnovation`).
3. Commit your changes (`git commit -m 'Add an Amazing Innovation'`).
4. Push to the branch (`git push origin feature/AmazingInnovation`).
5. Open a Pull Request for architectural review.

Ensure all contributions adhere to standard industrial security and coding compliance guidelines.

---

## 📄 License

Distributed under the MIT License. See `LICENSE` for more information.

---

> **PlantBrain transforms disconnected industrial information into a living Operational Brain—empowering every engineer with the collective intelligence of the enterprise.**
