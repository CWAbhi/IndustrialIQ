# IndustrialIQ — Unified Asset & Operations Brain

![IndustrialIQ Banner](https://via.placeholder.com/1200x400/0a0e1a/3b82f6?text=IndustrialIQ+Knowledge+OS)

IndustrialIQ is a comprehensive enterprise platform that serves as the operating system for industrial knowledge. By forming an intelligent, interconnected Knowledge Graph, it understands every asset, procedure, incident, and maintenance record across your plant, enabling proactive operations and preventing critical downtime.

## Key Features

- **Knowledge Graph Explorer:** Deep visual exploration of assets, failures, root causes, procedures, and experts. Discover hidden relationships and patterns across your plant.
- **Proactive Intelligence:** Live anomaly detection and predictive alerts based on real-time sensor data and historical failure patterns.
- **Failure DNA Matching:** Matches real-time symptoms against a vast library of historical failure sequences to predict and prevent critical breakdowns.
- **AI Assistant:** Multi-hop reasoning across the Industrial Knowledge Graph with full provenance tracking. Get answers backed by maintenance records, OEM documentation, and expert knowledge.
- **Asset Intelligence:** Comprehensive view of asset health, sensor telemetry, maintenance history, and linked knowledge.
- **Compliance Center:** Continuous regulatory monitoring, gap detection, and automated audit package generation.

## Technology Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Custom CSS Design System (Dark Mode, Glassmorphism)
- **Icons:** Lucide React
- **Visualizations:** D3.js (Force-directed Knowledge Graph)

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/CWAbhi/IndustrialIQ.git
   ```

2. Navigate to the app directory:
   ```bash
   cd IndustrialIQ/app
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the application.

## Project Structure

- `/app/src/app`: Next.js pages, layouts, and global styles.
- `/app/src/components`: React components (Dashboard, ChatInterface, AssetIntelligence, KnowledgeGraph, ComplianceCenter, Sidebar).
- `/app/src/data`: Data layer representing the Knowledge Graph and asset telemetry.

## License

Copyright © 2026 IndustrialIQ. All rights reserved.
