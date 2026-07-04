'use client';

import React, { useState, useRef, useEffect } from 'react';
import {
  Send,
  Mic,
  Paperclip,
  Camera,
  ThumbsUp,
  ThumbsDown,
  Edit3,
  Target,
  GitBranch,
  FileText,
  ExternalLink,
  Sparkles,
  Dna,
  Network,
} from 'lucide-react';
import { demoChatResponses, type ChatMessage } from '@/data/assets';

const suggestedQueries = [
  "Why does Pump P-101A keep failing?",
  "What maintenance is overdue?",
  "Show compliance gaps for PESO",
  "What is the Failure DNA for CW pump fleet?",
  "Who has expertise on compressor C-201?",
  "Generate RCA for last bearing failure",
];

export default function ChatInterface() {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async (text?: string) => {
    const query = text || input.trim();
    if (!query) return;

    // Add user message
    const userMsg: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: query,
      timestamp: new Date().toISOString(),
    };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }

    // Simulate AI response delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Find matching response
    const key = query.toLowerCase().replace(/[?]/g, '').trim();
    const response = demoChatResponses[key] || {
      id: `resp-${Date.now()}`,
      role: 'assistant' as const,
      content: `I've analyzed the knowledge graph and relevant documents for your query: **"${query}"**\n\n## Analysis Results\n\nBased on traversal of **${Math.floor(Math.random() * 5 + 3)} knowledge sources** across the industrial knowledge graph:\n\n1. **Cross-referenced** ${Math.floor(Math.random() * 8 + 4)} documents, maintenance records, and failure reports\n2. **Identified** ${Math.floor(Math.random() * 3 + 1)} relevant patterns from the Failure DNA library\n3. **Traced** ${Math.floor(Math.random() * 4 + 2)}-hop causal chains through the knowledge graph\n\n> 💡 This query leveraged GraphRAG with multi-hop reasoning across the Industrial Knowledge Graph. The response is grounded in ${Math.floor(Math.random() * 5 + 3)} verified sources with full provenance tracking.\n\n### Recommended Next Steps\n- Review the detailed analysis in the Knowledge Graph Explorer\n- Create a work order if maintenance action is needed\n- Schedule a review with the relevant subject matter expert`,
      timestamp: new Date().toISOString(),
      sources: [
        { title: 'Knowledge Graph Traversal', type: 'GraphRAG', confidence: 0.91 },
        { title: 'Maintenance Records', type: 'CMMS', confidence: 0.94 },
        { title: 'OEM Documentation', type: 'Manual', confidence: 0.88 },
      ],
      confidence: 0.89,
      graphHops: Math.floor(Math.random() * 4 + 2),
    };

    setIsTyping(false);
    setMessages(prev => [...prev, response as ChatMessage]);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleTextareaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    // Auto-resize
    e.target.style.height = 'auto';
    e.target.style.height = Math.min(e.target.scrollHeight, 120) + 'px';
  };

  const renderMarkdown = (text: string) => {
    // Simple markdown rendering
    let html = text
      // Headers
      .replace(/^### (.*$)/gm, '<h3>$1</h3>')
      .replace(/^## (.*$)/gm, '<h2>$1</h2>')
      // Bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Italic
      .replace(/\*(.*?)\*/g, '<em>$1</em>')
      // Code blocks
      .replace(/```([\s\S]*?)```/g, '<pre>$1</pre>')
      // Inline code
      .replace(/`(.*?)`/g, '<code>$1</code>')
      // Blockquotes
      .replace(/^> (.*$)/gm, '<blockquote>$1</blockquote>')
      // Tables (simplified)
      .replace(/\|(.+)\|/g, (match) => {
        const cells = match.split('|').filter(c => c.trim());
        if (cells.every(c => c.trim().match(/^[-:]+$/))) return '';
        const isHeader = cells.some(c => c.trim().startsWith('---'));
        if (isHeader) return '';
        const tag = 'td';
        return '<tr>' + cells.map(c => `<${tag}>${c.trim()}</${tag}>`).join('') + '</tr>';
      })
      // Lists
      .replace(/^- (.*$)/gm, '<li>$1</li>')
      .replace(/^\d+\. (.*$)/gm, '<li>$1</li>')
      // Line breaks
      .replace(/\n\n/g, '</p><p>')
      .replace(/\n/g, '<br/>');

    // Wrap consecutive <li> in <ul>
    html = html.replace(/(<li>[\s\S]*?<\/li>(?:\s*<li>[\s\S]*?<\/li>)*)/g, '<ul>$1</ul>');
    // Wrap consecutive <tr> in <table>
    html = html.replace(/(<tr>[\s\S]*?<\/tr>(?:\s*<tr>[\s\S]*?<\/tr>)*)/g, '<table><tbody>$1</tbody></table>');
    // Wrap consecutive <blockquote> 
    html = html.replace(/<\/blockquote><br\/><blockquote>/g, '<br/>');

    return `<p>${html}</p>`;
  };

  return (
    <div className="chat-container">
      {/* Messages Area */}
      <div className="chat-messages">
        {messages.length === 0 && (
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flex: 1,
            gap: '24px',
            paddingTop: '60px',
          }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: 'var(--radius-xl)',
              background: 'var(--gradient-primary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '32px',
              boxShadow: 'var(--shadow-glow-accent)',
            }}>
              🧠
            </div>
            <div style={{ textAlign: 'center' }}>
              <h2 style={{
                fontSize: '22px',
                fontWeight: 800,
                color: 'var(--text-primary)',
                marginBottom: '8px',
                letterSpacing: '-0.5px',
              }}>
                IndustrialIQ Assistant
              </h2>
              <p style={{ fontSize: '14px', color: 'var(--text-tertiary)', maxWidth: '480px', lineHeight: '1.6' }}>
                Ask anything about your plant — assets, failures, maintenance, compliance, or engineering knowledge. 
                I reason across the entire Knowledge Graph with full source attribution.
              </p>
            </div>
            <div className="chat-suggested">
              {suggestedQueries.map((query, i) => (
                <div
                  key={i}
                  className="chat-suggested-item"
                  onClick={() => handleSend(query)}
                >
                  <Sparkles size={12} style={{ marginRight: '4px', opacity: 0.5 }} />
                  {query}
                </div>
              ))}
            </div>
          </div>
        )}

        {messages.map((msg) => (
          <div key={msg.id} className={`chat-message ${msg.role}`}>
            <div className={`chat-avatar ${msg.role === 'assistant' ? 'ai' : 'human'}`}>
              {msg.role === 'assistant' ? 'IQ' : '👤'}
            </div>
            <div>
              <div className={`chat-bubble`}>
                {msg.role === 'user' ? (
                  msg.content
                ) : (
                  <div dangerouslySetInnerHTML={{ __html: renderMarkdown(msg.content) }} />
                )}
              </div>

              {/* Sources */}
              {msg.sources && msg.sources.length > 0 && (
                <div className="chat-sources" style={{ marginTop: '12px' }}>
                  <div className="chat-sources-title">
                    <FileText size={10} style={{ display: 'inline', marginRight: '4px' }} />
                    Sources ({msg.sources.length})
                  </div>
                  {msg.sources.map((source, i) => (
                    <div key={i} className="chat-source-item">
                      <div className="chat-source-dot" />
                      <span style={{ flex: 1 }}>{source.title}</span>
                      <span className="badge badge-neutral" style={{ fontSize: '10px' }}>{source.type}</span>
                      <span style={{ fontSize: '10px', color: 'var(--text-muted)' }}>
                        {Math.round(source.confidence * 100)}%
                      </span>
                    </div>
                  ))}
                </div>
              )}

              {/* Meta */}
              {msg.role === 'assistant' && (msg.confidence || msg.graphHops) && (
                <div className="chat-meta">
                  {msg.confidence && (
                    <div className="chat-meta-item">
                      <Target size={12} />
                      Confidence: {Math.round(msg.confidence * 100)}%
                    </div>
                  )}
                  {msg.graphHops && (
                    <div className="chat-meta-item">
                      <GitBranch size={12} />
                      {msg.graphHops}-hop reasoning
                    </div>
                  )}
                  {msg.failureDnaMatch && (
                    <div className="chat-meta-item" style={{ color: '#a78bfa' }}>
                      <Dna size={12} />
                      DNA Match: {msg.failureDnaMatch}
                    </div>
                  )}
                </div>
              )}

              {/* Actions & Feedback */}
              {msg.role === 'assistant' && (
                <div className="chat-actions">
                  {msg.actions?.map((action, i) => (
                    <button key={i} className={`btn btn-${action.type === 'primary' ? 'primary' : 'secondary'}`} style={{ fontSize: '11px' }}>
                      {action.label}
                    </button>
                  ))}
                  <div className="chat-feedback">
                    <button className="btn-ghost" style={{ padding: '4px 8px' }}><ThumbsUp size={14} /></button>
                    <button className="btn-ghost" style={{ padding: '4px 8px' }}><ThumbsDown size={14} /></button>
                    <button className="btn-ghost" style={{ padding: '4px 8px' }}><Edit3 size={14} /></button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Typing Indicator */}
        {isTyping && (
          <div className="chat-message assistant">
            <div className="chat-avatar ai">IQ</div>
            <div className="chat-bubble" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              padding: '14px 20px',
            }}>
              <div style={{ display: 'flex', gap: '4px' }}>
                <div className="animate-pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)', animationDelay: '0ms' }} />
                <div className="animate-pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)', animationDelay: '200ms' }} />
                <div className="animate-pulse" style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--accent-primary)', animationDelay: '400ms' }} />
              </div>
              <span style={{ fontSize: '12px', color: 'var(--text-muted)' }}>
                Reasoning across Knowledge Graph...
              </span>
            </div>
          </div>
        )}

        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="chat-input-area">
        {messages.length === 0 ? null : (
          <div className="chat-suggested" style={{ marginBottom: '8px' }}>
            {suggestedQueries.slice(0, 3).map((query, i) => (
              <div
                key={i}
                className="chat-suggested-item"
                onClick={() => handleSend(query)}
                style={{ fontSize: '11px', padding: '6px 12px' }}
              >
                {query}
              </div>
            ))}
          </div>
        )}
        <div className="chat-input-wrapper">
          <div className="chat-input-buttons">
            <button className="btn-ghost" style={{ padding: '4px' }}><Mic size={18} /></button>
            <button className="btn-ghost" style={{ padding: '4px' }}><Paperclip size={18} /></button>
            <button className="btn-ghost" style={{ padding: '4px' }}><Camera size={18} /></button>
          </div>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={handleTextareaChange}
            onKeyDown={handleKeyDown}
            placeholder="Ask IndustrialIQ anything about your plant..."
            rows={1}
          />
          <button
            className="btn-primary"
            onClick={() => handleSend()}
            disabled={!input.trim()}
            style={{
              width: '36px',
              height: '36px',
              padding: '0',
              borderRadius: 'var(--radius-md)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              opacity: input.trim() ? 1 : 0.4,
            }}
          >
            <Send size={16} />
          </button>
        </div>
      </div>
    </div>
  );
}
