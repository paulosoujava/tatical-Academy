// Componente de Biblioteca - Tactical Academy
import React, { useState } from 'react';
import { BIBLIOGRAPHY } from '../../core/data/contentData';
import TacticalCard from '../../shared/components/TacticalCard';
import { Book, FileText, Podcast, ExternalLink } from 'lucide-react';

const Library = () => {
  const [filterType, setFilterType] = useState('ALL');

  const categories = ['ALL', 'LIVRO RECOMENDADO', 'DOUTRINA PÚBLICA', 'MANUAL TÉCNICO', 'PODCAST/CONTEÚDO PÚBLICO'];

  const filteredBib = BIBLIOGRAPHY.filter(item => {
    return filterType === 'ALL' || item.type.toUpperCase() === filterType;
  });

  const getIcon = (type) => {
    const t = type.toUpperCase();
    if (t.includes('LIVRO')) return <Book size={18} />;
    if (t.includes('DOUTRINA') || t.includes('MANUAL')) return <FileText size={18} />;
    return <Podcast size={18} />;
  };

  return (
    <div className="library-container">
      {/* Filtros de Categoria */}
      <div className="library-filters">
        {categories.map(cat => (
          <button
            key={cat}
            className={`filter-chip hud-mono ${filterType === cat ? 'active' : ''}`}
            onClick={() => setFilterType(cat)}
          >
            {cat === 'ALL' ? 'TODOS' : cat.split('/')[0]}
          </button>
        ))}
      </div>

      {/* Lista de Recursos */}
      <div className="library-list">
        {filteredBib.map((item, index) => (
          <TacticalCard
            key={index}
            title={item.title}
            subtitle={item.author}
            badge={item.type}
            badgeType="olive"
          >
            <div className="library-card-content">
              <div className="lib-icon-area">
                {getIcon(item.type)}
              </div>
              <div className="lib-details">
                <p className="selectable">{item.description}</p>
                <div className="lib-action-footer">
                  <span className="source-label hud-mono">REFERÊNCIA DOUTRINÁRIA</span>
                  <button className="btn-ref-link" onClick={() => alert('Direcionamento para link público de domínio educativo.')}>
                    Acessar Fonte <ExternalLink size={12} />
                  </button>
                </div>
              </div>
            </div>
          </TacticalCard>
        ))}
      </div>

      <style>{`
        .library-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          margin-bottom: 16px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 8px;
        }

        .filter-chip {
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 6px 12px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.65rem;
          font-family: var(--font-mono);
          transition: all 0.2s ease;
        }

        .filter-chip:hover {
          border-color: var(--accent-olive);
          color: var(--text-primary);
        }

        .filter-chip.active {
          background-color: var(--accent-olive-dim);
          border-color: var(--accent-olive);
          color: var(--accent-olive-hover);
          box-shadow: 0 0 6px var(--accent-olive-glow);
        }

        .library-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .library-card-content {
          display: flex;
          gap: 12px;
          align-items: flex-start;
          padding-top: 4px;
        }

        .lib-icon-area {
          color: var(--accent-olive);
          padding-top: 2px;
        }

        .lib-details {
          flex: 1;
        }

        .lib-details p {
          font-size: 0.8rem;
          line-height: 1.4;
          margin-bottom: 10px;
          color: var(--text-secondary);
        }

        .lib-action-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          border-top: 1px solid rgba(45, 50, 55, 0.3);
          padding-top: 6px;
        }

        .source-label {
          font-size: 0.6rem;
          color: var(--text-muted);
        }

        .btn-ref-link {
          background: none;
          border: none;
          color: var(--accent-olive-hover);
          font-family: var(--font-mono);
          font-size: 0.7rem;
          cursor: pointer;
          display: inline-flex;
          align-items: center;
          gap: 4px;
          transition: all 0.2s ease;
        }

        .btn-ref-link:hover {
          color: var(--text-primary);
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
};

export default Library;
