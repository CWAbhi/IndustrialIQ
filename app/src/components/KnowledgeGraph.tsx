'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import * as d3 from 'd3';
import { knowledgeGraphNodes, knowledgeGraphEdges, type KnowledgeGraphNode, type KnowledgeGraphEdge } from '@/data/assets';
import { ZoomIn, ZoomOut, Maximize2, RotateCcw } from 'lucide-react';

const nodeColors: Record<string, string> = {
  asset: '#3b82f6',
  failure: '#ef4444',
  rootCause: '#f59e0b',
  procedure: '#10b981',
  person: '#8b5cf6',
  regulation: '#ec4899',
  sparePart: '#06b6d4',
  lesson: '#a855f7',
  incident: '#f97316',
  location: '#6366f1',
  vendor: '#14b8a6',
};

const nodeLabels: Record<string, string> = {
  asset: 'Assets',
  failure: 'Failures',
  rootCause: 'Root Causes',
  procedure: 'Procedures',
  person: 'Engineers',
  regulation: 'Regulations',
  sparePart: 'Spare Parts',
  lesson: 'Lessons',
  vendor: 'Vendors',
  location: 'Locations',
};

const nodeSizes: Record<string, number> = {
  asset: 22,
  failure: 16,
  rootCause: 18,
  procedure: 14,
  person: 16,
  regulation: 14,
  sparePart: 12,
  lesson: 14,
  location: 14,
  vendor: 14,
};

interface GraphNode extends d3.SimulationNodeDatum {
  id: string;
  label: string;
  type: string;
  properties: Record<string, string | number>;
}

interface GraphLink extends d3.SimulationLinkDatum<GraphNode> {
  relationship: string;
  confidence?: number;
}

export default function KnowledgeGraphExplorer() {
  const svgRef = useRef<SVGSVGElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeFilters, setActiveFilters] = useState<Set<string>>(new Set(['asset', 'failure', 'rootCause', 'procedure', 'person', 'lesson']));
  const [hoveredNode, setHoveredNode] = useState<GraphNode | null>(null);
  const [tooltipPos, setTooltipPos] = useState({ x: 0, y: 0 });
  const simulationRef = useRef<d3.Simulation<GraphNode, GraphLink> | null>(null);

  const toggleFilter = (type: string) => {
    setActiveFilters(prev => {
      const next = new Set(prev);
      if (next.has(type)) {
        next.delete(type);
      } else {
        next.add(type);
      }
      return next;
    });
  };

  const renderGraph = useCallback(() => {
    if (!svgRef.current || !containerRef.current) return;

    const container = containerRef.current;
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Filter nodes and edges
    const filteredNodes: GraphNode[] = knowledgeGraphNodes
      .filter(n => activeFilters.has(n.type))
      .map(n => ({ ...n }));

    const nodeIds = new Set(filteredNodes.map(n => n.id));

    const filteredLinks: GraphLink[] = knowledgeGraphEdges
      .filter(e => nodeIds.has(e.source) && nodeIds.has(e.target))
      .map(e => ({ ...e }));

    // Clear previous
    d3.select(svgRef.current).selectAll('*').remove();

    const svg = d3.select(svgRef.current)
      .attr('width', width)
      .attr('height', height);

    // Add defs for glow effect
    const defs = svg.append('defs');
    const filter = defs.append('filter').attr('id', 'glow');
    filter.append('feGaussianBlur').attr('stdDeviation', '3').attr('result', 'coloredBlur');
    const merge = filter.append('feMerge');
    merge.append('feMergeNode').attr('in', 'coloredBlur');
    merge.append('feMergeNode').attr('in', 'SourceGraphic');

    // Arrow marker
    defs.append('marker')
      .attr('id', 'arrowhead')
      .attr('viewBox', '-0 -5 10 10')
      .attr('refX', 25)
      .attr('refY', 0)
      .attr('orient', 'auto')
      .attr('markerWidth', 6)
      .attr('markerHeight', 6)
      .append('path')
      .attr('d', 'M 0,-5 L 10,0 L 0,5')
      .attr('fill', 'rgba(255,255,255,0.15)');

    const g = svg.append('g');

    // Zoom
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.3, 4])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
      });

    svg.call(zoom);

    // Simulation
    const simulation = d3.forceSimulation<GraphNode>(filteredNodes)
      .force('link', d3.forceLink<GraphNode, GraphLink>(filteredLinks).id(d => d.id).distance(120).strength(0.5))
      .force('charge', d3.forceManyBody().strength(-400))
      .force('center', d3.forceCenter(width / 2, height / 2))
      .force('collision', d3.forceCollide().radius(40))
      .force('x', d3.forceX(width / 2).strength(0.05))
      .force('y', d3.forceY(height / 2).strength(0.05));

    simulationRef.current = simulation;

    // Links
    const link = g.append('g')
      .selectAll('line')
      .data(filteredLinks)
      .join('line')
      .attr('stroke', d => d.confidence ? `rgba(139, 92, 246, ${0.2 + d.confidence * 0.3})` : 'rgba(255,255,255,0.08)')
      .attr('stroke-width', d => d.confidence ? 1 + d.confidence * 1.5 : 1)
      .attr('marker-end', 'url(#arrowhead)');

    // Link labels
    const linkLabel = g.append('g')
      .selectAll('text')
      .data(filteredLinks)
      .join('text')
      .text(d => d.relationship.replace(/_/g, ' '))
      .attr('font-size', 8)
      .attr('fill', 'rgba(255,255,255,0.25)')
      .attr('text-anchor', 'middle')
      .attr('font-family', 'JetBrains Mono, monospace')
      .style('pointer-events', 'none');

    // Nodes
    const node = g.append('g')
      .selectAll('g')
      .data(filteredNodes)
      .join('g')
      .style('cursor', 'pointer')
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      .call(d3.drag<any, GraphNode>()
        .on('start', (event: d3.D3DragEvent<SVGGElement, GraphNode, GraphNode>, d: GraphNode) => {
          if (!event.active) simulation.alphaTarget(0.3).restart();
          d.fx = d.x;
          d.fy = d.y;
        })
        .on('drag', (event: d3.D3DragEvent<SVGGElement, GraphNode, GraphNode>, d: GraphNode) => {
          d.fx = event.x;
          d.fy = event.y;
        })
        .on('end', (event: d3.D3DragEvent<SVGGElement, GraphNode, GraphNode>, d: GraphNode) => {
          if (!event.active) simulation.alphaTarget(0);
          d.fx = null;
          d.fy = null;
        })
      );

    // Node circles with glow
    node.append('circle')
      .attr('r', d => nodeSizes[d.type] || 14)
      .attr('fill', d => nodeColors[d.type] || '#666')
      .attr('stroke', d => nodeColors[d.type] || '#666')
      .attr('stroke-width', 2)
      .attr('stroke-opacity', 0.3)
      .attr('fill-opacity', 0.8)
      .attr('filter', 'url(#glow)')
      .on('mouseover', function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', (nodeSizes[d.type] || 14) * 1.3)
          .attr('fill-opacity', 1)
          .attr('stroke-opacity', 0.6);

        // Highlight connected edges
        link
          .attr('stroke', l => {
            const s = l.source as GraphNode;
            const t = l.target as GraphNode;
            return (s.id === d.id || t.id === d.id) ? nodeColors[d.type] : 'rgba(255,255,255,0.05)';
          })
          .attr('stroke-width', l => {
            const s = l.source as GraphNode;
            const t = l.target as GraphNode;
            return (s.id === d.id || t.id === d.id) ? 2.5 : 0.5;
          })
          .attr('stroke-opacity', l => {
            const s = l.source as GraphNode;
            const t = l.target as GraphNode;
            return (s.id === d.id || t.id === d.id) ? 0.8 : 0.3;
          });

        setHoveredNode(d);
        setTooltipPos({ x: event.pageX, y: event.pageY });
      })
      .on('mouseout', function (event, d) {
        d3.select(this)
          .transition()
          .duration(200)
          .attr('r', nodeSizes[d.type] || 14)
          .attr('fill-opacity', 0.8)
          .attr('stroke-opacity', 0.3);

        link
          .attr('stroke', l => (l as GraphLink).confidence ? `rgba(139, 92, 246, ${0.2 + ((l as GraphLink).confidence || 0) * 0.3})` : 'rgba(255,255,255,0.08)')
          .attr('stroke-width', l => (l as GraphLink).confidence ? 1 + ((l as GraphLink).confidence || 0) * 1.5 : 1)
          .attr('stroke-opacity', 1);

        setHoveredNode(null);
      });

    // Node labels
    node.append('text')
      .text(d => d.label.split('\n')[0])
      .attr('dy', d => (nodeSizes[d.type] || 14) + 12)
      .attr('text-anchor', 'middle')
      .attr('font-size', 9)
      .attr('fill', 'rgba(255,255,255,0.6)')
      .attr('font-weight', 500)
      .attr('font-family', 'Inter, sans-serif')
      .style('pointer-events', 'none');

    // Tick
    simulation.on('tick', () => {
      link
        .attr('x1', d => (d.source as GraphNode).x!)
        .attr('y1', d => (d.source as GraphNode).y!)
        .attr('x2', d => (d.target as GraphNode).x!)
        .attr('y2', d => (d.target as GraphNode).y!);

      linkLabel
        .attr('x', d => ((d.source as GraphNode).x! + (d.target as GraphNode).x!) / 2)
        .attr('y', d => ((d.source as GraphNode).y! + (d.target as GraphNode).y!) / 2);

      node.attr('transform', d => `translate(${d.x},${d.y})`);
    });

    // Initial zoom to fit
    setTimeout(() => {
      svg.call(zoom.transform, d3.zoomIdentity.translate(0, 0).scale(0.85));
    }, 500);
  }, [activeFilters]);

  useEffect(() => {
    renderGraph();

    const handleResize = () => renderGraph();
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      if (simulationRef.current) simulationRef.current.stop();
    };
  }, [renderGraph]);

  return (
    <div className="page-content" style={{ height: 'calc(100vh - var(--header-height) - var(--header-height))', padding: '16px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h2 style={{ fontSize: '20px', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '2px' }}>
            🕸️ Knowledge Graph Explorer
          </h2>
          <p style={{ fontSize: '12px', color: 'var(--text-tertiary)' }}>
            {knowledgeGraphNodes.length} nodes · {knowledgeGraphEdges.length} relationships · Interactive exploration
          </p>
        </div>
        <div style={{ display: 'flex', gap: '6px' }}>
          <button className="btn-icon" title="Reset view" onClick={renderGraph}><RotateCcw size={16} /></button>
        </div>
      </div>

      {/* Graph Container */}
      <div ref={containerRef} className="graph-container" style={{ flex: 1 }}>
        {/* Filters */}
        <div className="graph-controls">
          {Object.entries(nodeLabels).map(([type, label]) => (
            <button
              key={type}
              className={`graph-filter ${activeFilters.has(type) ? 'active' : ''}`}
              onClick={() => toggleFilter(type)}
              style={{
                borderColor: activeFilters.has(type) ? nodeColors[type] : undefined,
                color: activeFilters.has(type) ? nodeColors[type] : undefined,
                background: activeFilters.has(type) ? `${nodeColors[type]}18` : undefined,
              }}
            >
              <span style={{
                display: 'inline-block',
                width: '8px',
                height: '8px',
                borderRadius: '50%',
                background: nodeColors[type],
                marginRight: '6px',
              }} />
              {label}
            </button>
          ))}
        </div>

        <svg ref={svgRef} style={{ width: '100%', height: '100%' }} />

        {/* Legend */}
        <div className="graph-legend">
          {Object.entries(nodeLabels)
            .filter(([type]) => activeFilters.has(type))
            .map(([type, label]) => (
              <div key={type} className="graph-legend-item">
                <div className="graph-legend-dot" style={{ background: nodeColors[type] }} />
                {label}
              </div>
            ))}
        </div>

        {/* Tooltip */}
        {hoveredNode && (
          <div className="graph-tooltip" style={{
            left: Math.min(tooltipPos.x - (containerRef.current?.getBoundingClientRect().left || 0) + 15, (containerRef.current?.clientWidth || 400) - 220),
            top: tooltipPos.y - (containerRef.current?.getBoundingClientRect().top || 0) - 10,
          }}>
            <div className="graph-tooltip-title">
              <span style={{
                display: 'inline-block',
                width: '10px',
                height: '10px',
                borderRadius: '50%',
                background: nodeColors[hoveredNode.type],
                marginRight: '8px',
              }} />
              {hoveredNode.label.replace('\n', ' ')}
            </div>
            <div style={{ fontSize: '10px', color: 'var(--text-tertiary)', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '1px' }}>
              {hoveredNode.type}
            </div>
            {Object.entries(hoveredNode.properties).map(([key, value]) => (
              <div key={key} className="graph-tooltip-row">
                <span className="graph-tooltip-label">{key}</span>
                <span className="graph-tooltip-value">{String(value)}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
