// Orchestrator de Recursos e Busca Global - Tactical Academy
import React, { useState, useEffect } from 'react';
import Glossary from '../glossary/Glossary';
import Library from '../library/Library';
import CaseStudies from '../cases/CaseStudies';
import { MODULES, GLOSSARY, CASES, BIBLIOGRAPHY } from '../../core/data/contentData';
import TacticalCard from '../../shared/components/TacticalCard';
import { Search, Book, FileText, HelpCircle, Award, Compass, ChevronRight } from 'lucide-react';

const GlobalSearch = ({ initialSearch, initialCaseId, onNavigate }) => {
  const [subTab, setSubTab] = useState('glossary'); // glossary, library, cases
  const [searchQuery, setSearchQuery] = useState(initialSearch || '');
  const [searchResults, setSearchResults] = useState({ modules: [], glossary: [], cases: [], library: [] });

  // Se receber um id de caso inicial, muda o sub-tab para 'cases' para que apareça o caso detalhado
  useEffect(() => {
    if (initialCaseId) {
      setSubTab('cases');
    }
  }, [initialCaseId]);

  // Se receber uma pesquisa inicial (ex: vinda do Dashboard)
  useEffect(() => {
    if (initialSearch) {
      setSearchQuery(initialSearch);
      performSearch(initialSearch);
    }
  }, [initialSearch]);

  const performSearch = (query) => {
    if (!query || query.trim() === '') {
      setSearchResults({ modules: [], glossary: [], cases: [], library: [] });
      return;
    }

    const cleanQuery = query.toLowerCase();

    // 1. Pesquisa em Módulos (procura em títulos e conteúdos de tópicos)
    const matchedModules = [];
    MODULES.forEach(mod => {
      mod.topics.forEach(topic => {
        if (topic.title.toLowerCase().includes(cleanQuery) || topic.content.toLowerCase().includes(cleanQuery)) {
          matchedModules.push({
            moduleId: mod.id,
            moduleTitle: mod.title,
            topicId: topic.id,
            topicTitle: topic.title,
            snippet: topic.content.substring(0, 100) + '...'
          });
        }
      });
    });

    // 2. Pesquisa no Glossário
    const matchedGlossary = GLOSSARY.filter(item => 
      item.term.toLowerCase().includes(cleanQuery) || 
      item.definition.toLowerCase().includes(cleanQuery)
    );

    // 3. Pesquisa em Estudos de Caso
    const matchedCases = CASES.filter(c => 
      c.title.toLowerCase().includes(cleanQuery) || 
      c.summary.toLowerCase().includes(cleanQuery) ||
      c.context.toLowerCase().includes(cleanQuery)
    );

    // 4. Pesquisa na Biblioteca
    const matchedLib = BIBLIOGRAPHY.filter(item => 
      item.title.toLowerCase().includes(cleanQuery) || 
      item.description.toLowerCase().includes(cleanQuery) ||
      item.author.toLowerCase().includes(cleanQuery)
    );

    setSearchResults({
      modules: matchedModules,
      glossary: matchedGlossary,
      cases: matchedCases,
      library: matchedLib
    });
  };

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchQuery(val);
    performSearch(val);
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults({ modules: [], glossary: [], cases: [], library: [] });
  };

  const hasResults = 
    searchResults.modules.length > 0 || 
    searchResults.glossary.length > 0 || 
    searchResults.cases.length > 0 || 
    searchResults.library.length > 0;

  return (
    <div className="resources-search-orchestrator">
      <h1 className="hud-mono">CENTRAL DE BUSCA</h1>
      
      {/* Input de Pesquisa Global */}
      <div className="form-group" style={{ marginBottom: '16px' }}>
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="form-input search-input"
            placeholder="Pesquisa global em artigos, termos, casos..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
          {searchQuery && (
            <button className="clear-search-btn hud-mono" onClick={clearSearch}>X</button>
          )}
        </div>
      </div>

      {/* Condição: Se houver busca digitada, exibe os resultados da pesquisa global */}
      {searchQuery.trim() !== '' ? (
        <div className="global-search-results">
          <div className="results-header hud-mono">
            RESULTADOS DA BUSCA: "{searchQuery.toUpperCase()}"
          </div>
          
          {!hasResults ? (
            <div className="empty-results hud-mono text-center">
              NENHUM CONTEÚDO ENCONTRADO
            </div>
          ) : (
            <div className="results-list">
              {/* Resultados dos Módulos/Artigos */}
              {searchResults.modules.length > 0 && (
                <div className="result-category">
                  <span className="category-title hud-mono">TÓPICOS E ARTIGOS</span>
                  {searchResults.modules.map((m, idx) => (
                    <div 
                      key={idx} 
                      className="result-item"
                      onClick={() => onNavigate('modules', { moduleId: m.moduleId })}
                    >
                      <div className="res-icon"><Book size={16} /></div>
                      <div className="res-details">
                        <div className="res-title hud-mono">{m.topicTitle}</div>
                        <div className="res-subtitle hud-mono">MÓDULO: {m.moduleTitle}</div>
                        <div className="res-snippet">{m.snippet}</div>
                      </div>
                      <ChevronRight size={16} className="arrow-right" />
                    </div>
                  ))}
                </div>
              )}

              {/* Resultados do Glossário */}
              {searchResults.glossary.length > 0 && (
                <div className="result-category">
                  <span className="category-title hud-mono">GLOSSÁRIO TÁTICO</span>
                  {searchResults.glossary.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="result-item"
                      onClick={() => {
                        clearSearch();
                        setSubTab('glossary');
                      }}
                    >
                      <div className="res-icon"><HelpCircle size={16} /></div>
                      <div className="res-details">
                        <div className="res-title hud-mono">{item.term}</div>
                        <div className="res-snippet">{item.definition}</div>
                      </div>
                      <ChevronRight size={16} className="arrow-right" />
                    </div>
                  ))}
                </div>
              )}

              {/* Resultados dos Estudos de Caso */}
              {searchResults.cases.length > 0 && (
                <div className="result-category">
                  <span className="category-title hud-mono">ESTUDOS DE CASO</span>
                  {searchResults.cases.map((c, idx) => (
                    <div 
                      key={idx} 
                      className="result-item"
                      onClick={() => onNavigate('resources', { caseId: c.id })}
                    >
                      <div className="res-icon"><Compass size={16} /></div>
                      <div className="res-details">
                        <div className="res-title hud-mono">{c.title}</div>
                        <div className="res-snippet">{c.summary}</div>
                      </div>
                      <ChevronRight size={16} className="arrow-right" />
                    </div>
                  ))}
                </div>
              )}

              {/* Resultados da Biblioteca */}
              {searchResults.library.length > 0 && (
                <div className="result-category">
                  <span className="category-title hud-mono">BIBLIOTECA & MANUAIS</span>
                  {searchResults.library.map((item, idx) => (
                    <div 
                      key={idx} 
                      className="result-item"
                      onClick={() => {
                        clearSearch();
                        setSubTab('library');
                      }}
                    >
                      <div className="res-icon"><FileText size={16} /></div>
                      <div className="res-details">
                        <div className="res-title hud-mono">{item.title}</div>
                        <div className="res-subtitle hud-mono">AUTOR: {item.author}</div>
                        <div className="res-snippet">{item.description}</div>
                      </div>
                      <ChevronRight size={16} className="arrow-right" />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>
      ) : (
        /* Se NÃO houver busca digitada, exibe os sub-tabs normais */
        <div className="sub-tab-interface">
          {/* Sub Navigation Bar */}
          <div className="resources-tabs hud-mono">
            <button 
              className={`res-tab-btn ${subTab === 'glossary' ? 'active' : ''}`}
              onClick={() => setSubTab('glossary')}
            >
              GLOSSÁRIO
            </button>
            <button 
              className={`res-tab-btn ${subTab === 'cases' ? 'active' : ''}`}
              onClick={() => setSubTab('cases')}
            >
              CASOS HISTÓRICOS
            </button>
            <button 
              className={`res-tab-btn ${subTab === 'library' ? 'active' : ''}`}
              onClick={() => setSubTab('library')}
            >
              BIBLIOTECA
            </button>
          </div>

          <div className="sub-tab-content">
            {subTab === 'glossary' && <Glossary initialSearchQuery={searchQuery} />}
            {subTab === 'cases' && (
              <CaseStudies 
                initialCaseId={initialCaseId} 
                onClearParams={onClearParams}
              />
            )}
            {subTab === 'library' && <Library />}
          </div>
        </div>
      )}

      <style>{`
        .search-input-wrapper {
          position: relative;
          width: 100%;
        }

        .search-icon {
          position: absolute;
          left: 16px;
          top: 50%;
          transform: translateY(-50%);
          color: var(--text-secondary);
          pointer-events: none;
        }

        .search-input {
          padding-left: 48px !important;
          padding-right: 48px !important;
        }

        .clear-search-btn {
          position: absolute;
          right: 16px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          color: var(--color-danger);
          font-family: var(--font-mono);
          font-weight: bold;
          cursor: pointer;
          font-size: 1rem;
          padding: 4px;
        }

        /* Sub tabs */
        .resources-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 6px;
          margin-bottom: 16px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 8px;
        }

        .res-tab-btn {
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 8px 4px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.65rem;
          text-align: center;
          transition: all 0.2s ease;
          outline: none;
        }

        .res-tab-btn:hover {
          border-color: var(--accent-olive);
          color: var(--text-primary);
        }

        .res-tab-btn.active {
          background-color: var(--accent-olive-dim);
          border-color: var(--accent-olive);
          color: var(--accent-olive-hover);
          box-shadow: 0 0 6px var(--accent-olive-glow);
          font-weight: bold;
        }

        /* Search results layout */
        .results-header {
          font-size: 0.75rem;
          color: var(--accent-olive-hover);
          margin-bottom: 12px;
          border-bottom: 1px dashed var(--border-color);
          padding-bottom: 4px;
        }

        .results-list {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        .result-category {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .category-title {
          font-size: 0.6rem;
          color: var(--accent-olive);
          border-bottom: 1px solid rgba(45, 50, 55, 0.3);
          padding-bottom: 2px;
        }

        .result-item {
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          padding: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .result-item:hover {
          border-color: var(--accent-olive);
          background-color: rgba(255, 255, 255, 0.02);
        }

        .res-icon {
          color: var(--accent-olive);
          display: flex;
          align-items: center;
        }

        .res-details {
          flex: 1;
        }

        .res-title {
          font-size: 0.85rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .res-subtitle {
          font-size: 0.65rem;
          color: var(--accent-olive-hover);
          margin-top: 1px;
        }

        .res-snippet {
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-top: 4px;
        }

        .arrow-right {
          color: var(--text-muted);
          transition: transform 0.2s ease;
        }

        .result-item:hover .arrow-right {
          transform: translateX(3px);
          color: var(--accent-olive-hover);
        }
      `}</style>
    </div>
  );
};

export default GlobalSearch;
