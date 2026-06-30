// Componente de Glossário - Tactical Academy
import React, { useState } from 'react';
import { GLOSSARY } from '../../core/data/contentData';
import LocalStoreRepository from '../../core/data/LocalStoreRepository';
import { Search, Bookmark, BookmarkCheck } from 'lucide-react';
import TacticalCard from '../../shared/components/TacticalCard';

const Glossary = ({ initialSearchQuery = "" }) => {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);
  const [selectedLetter, setSelectedLetter] = useState('');
  const [favorites, setFavorites] = useState(LocalStoreRepository.getFavorites());

  const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

  const handleToggleFav = (term) => {
    LocalStoreRepository.toggleFavorite('glossary', term);
    setFavorites(LocalStoreRepository.getFavorites());
  };

  const isTermFav = (term) => {
    return favorites.glossary?.includes(term);
  };

  // Filtra termos com base na pesquisa e/ou letra selecionada
  const filteredGlossary = GLOSSARY.filter(item => {
    const matchesSearch = 
      item.term.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.definition.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesLetter = 
      selectedLetter === '' || 
      item.term.toUpperCase().startsWith(selectedLetter);

    return matchesSearch && matchesLetter;
  });

  return (
    <div className="glossary-container">
      {/* Campo de Pesquisa */}
      <div className="form-group" style={{ marginBottom: '12px' }}>
        <div className="search-input-wrapper">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            className="form-input search-input"
            placeholder="Pesquisar termo ou conceito..."
            value={searchQuery}
            onChange={(e) => {
              setSearchQuery(e.target.value);
              setSelectedLetter(''); // Reseta a letra ao digitar
            }}
          />
        </div>
      </div>

      {/* Seletor de Alfabeto A-Z */}
      <div className="alphabet-bar">
        <button 
          className={`letter-btn ${selectedLetter === '' ? 'active' : ''}`}
          onClick={() => {
            setSelectedLetter('');
            setSearchQuery('');
          }}
        >
          ALL
        </button>
        {alphabet.map(letter => {
          // Verifica se existem termos com essa letra
          const hasTerms = GLOSSARY.some(item => item.term.toUpperCase().startsWith(letter));
          return (
            <button
              key={letter}
              disabled={!hasTerms}
              className={`letter-btn ${selectedLetter === letter ? 'active' : ''} ${!hasTerms ? 'disabled' : ''}`}
              onClick={() => {
                setSelectedLetter(letter);
                setSearchQuery('');
              }}
            >
              {letter}
            </button>
          );
        })}
      </div>

      {/* Resultados do Glossário */}
      <div className="glossary-results">
        {filteredGlossary.length === 0 ? (
          <div className="empty-results hud-mono text-center">
            NENHUM TERMO ENCONTRADO
          </div>
        ) : (
          filteredGlossary.map((item) => (
            <TacticalCard 
              key={item.term} 
              title={item.term}
              headerAction={
                <button 
                  className="fav-term-btn" 
                  onClick={() => handleToggleFav(item.term)}
                  aria-label={`Favoritar termo ${item.term}`}
                >
                  {isTermFav(item.term) ? (
                    <BookmarkCheck size={16} className="active-green-text" />
                  ) : (
                    <Bookmark size={16} />
                  )}
                </button>
              }
            >
              <p className="definition-text selectable">{item.definition}</p>
            </TacticalCard>
          ))
        )}
      </div>

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
        }

        .alphabet-bar {
          display: flex;
          overflow-x: auto;
          gap: 6px;
          padding-bottom: 8px;
          margin-bottom: 16px;
          border-bottom: 1px solid var(--border-color);
        }

        /* Oculta scrollbar padrão da barra de alfabeto */
        .alphabet-bar::-webkit-scrollbar {
          height: 3px;
        }
        .alphabet-bar::-webkit-scrollbar-thumb {
          background: var(--accent-olive-dim);
        }

        .letter-btn {
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 6px 10px;
          border-radius: 4px;
          cursor: pointer;
          font-family: var(--font-mono);
          font-size: 0.7rem;
          min-width: 32px;
          transition: all 0.2s ease;
        }

        .letter-btn:hover:not(:disabled) {
          border-color: var(--accent-olive);
          color: var(--text-primary);
        }

        .letter-btn.active {
          background-color: var(--accent-olive);
          border-color: var(--accent-olive);
          color: var(--text-primary);
          box-shadow: 0 0 6px var(--accent-olive-glow);
        }

        .letter-btn.disabled {
          opacity: 0.2;
          cursor: not-allowed;
        }

        .glossary-results {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .fav-term-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          transition: color 0.2s ease;
        }

        .fav-term-btn:hover {
          color: var(--accent-olive-hover);
        }

        .active-green-text {
          color: var(--color-success) !important;
        }

        .definition-text {
          font-size: 0.85rem;
          margin-bottom: 0;
          color: var(--text-secondary);
          text-align: justify;
        }

        .empty-results {
          padding: 32px;
          color: var(--text-muted);
          font-size: 0.85rem;
        }
      `}</style>
    </div>
  );
};

export default Glossary;
