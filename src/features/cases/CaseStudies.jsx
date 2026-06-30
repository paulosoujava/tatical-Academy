// Componente de Estudos de Caso - Tactical Academy
import React, { useState, useEffect } from 'react';
import { CASES } from '../../core/data/contentData';
import LocalStoreRepository from '../../core/data/LocalStoreRepository';
import TacticalCard from '../../shared/components/TacticalCard';
import Timeline from '../../shared/components/Timeline';
import { Bookmark, BookmarkCheck, ChevronLeft, Calendar, ShieldAlert } from 'lucide-react';

const CaseStudies = ({ initialCaseId, onClearParams }) => {
  const [selectedCase, setSelectedCase] = useState(null);
  const [favorites, setFavorites] = useState(LocalStoreRepository.getFavorites());

  useEffect(() => {
    if (initialCaseId) {
      const found = CASES.find(c => c.id === initialCaseId);
      if (found) setSelectedCase(found);
    }
  }, [initialCaseId]);

  const handleSelectCase = (c) => {
    setSelectedCase(c);
  };

  const handleBack = () => {
    setSelectedCase(null);
    if (onClearParams) onClearParams();
  };

  const handleToggleFav = (caseId) => {
    LocalStoreRepository.toggleFavorite('cases', caseId);
    setFavorites(LocalStoreRepository.getFavorites());
  };

  const isCaseFav = (caseId) => {
    return favorites.cases?.includes(caseId);
  };

  // Mock timeline de eventos para Miami e Mogadíscio (Educativo)
  const getCaseTimeline = (caseId) => {
    if (caseId === 'miami_1986') {
      return [
        { date: "09:30 AM", title: "Contato Visual Inicial", description: "Agentes do FBI identificam o veículo suspeito em Miami.", active: true },
        { date: "09:40 AM", title: "Intercepção & Colisão", description: "Oito agentes bloqueiam o veículo através de manobra de batida automobilística lateral.", active: false },
        { date: "09:42 AM", title: "Início do Engajamento", description: "Troca intensa de disparos sob restrições de cobertura física imediata.", active: false },
        { date: "09:45 AM", title: "Fim da Ocorrência", description: "Ameaças neutralizadas. Dois agentes federais falecidos e cinco feridos gravemente.", active: false }
      ];
    }
    return [
      { date: "03:40 PM", title: "Início do Assalto", description: "Forças aerotransportadas e comboio terrestre convergem para capturar assessores de Aidid.", active: true },
      { date: "04:20 PM", title: "Primeira Queda", description: "Helicóptero Super 61 é abatido por RPG. Tropas terrestres convergem para resgate.", active: false },
      { date: "04:40 PM", title: "Segunda Queda", description: "Helicóptero Super 64 é abatido. Perímetro secundário montado sob fogo cruzado.", active: false },
      { date: "06:30 AM (D+1)", title: "Evacuação das Forças", description: "Comboio blindado da ONU retira forças remanescentes rumo ao estádio seguro.", active: false }
    ];
  };

  if (selectedCase) {
    return (
      <div className="case-detail-container">
        <div className="module-header-nav">
          <button className="back-btn hud-mono" onClick={handleBack}>
            <ChevronLeft size={16} /> VOLTAR
          </button>
          
          <button 
            className="fav-toggle-btn" 
            onClick={() => handleToggleFav(selectedCase.id)}
            aria-label="Favoritar caso"
          >
            {isCaseFav(selectedCase.id) ? (
              <BookmarkCheck size={20} className="active-green-text" />
            ) : (
              <Bookmark size={20} />
            )}
          </button>
        </div>

        <div className="module-title-section">
          <span className="badge-tactical badge-tactical-danger">ANÁLISE DE OCORRÊNCIA</span>
          <h2 className="hud-mono select-title">{selectedCase.title}</h2>
          <div className="case-meta hud-mono">
            <span><Calendar size={12} /> {selectedCase.date}</span>
            <span>📍 {selectedCase.location}</span>
          </div>
        </div>

        {/* Resumo executivo */}
        <TacticalCard title="Resumo Analítico">
          <p className="selectable" style={{ fontSize: '0.85rem', margin: 0 }}>{selectedCase.summary}</p>
        </TacticalCard>

        {/* Timeline do evento */}
        <h3 className="hud-mono section-label">CRONOLOGIA DOS FATOS</h3>
        <Timeline items={getCaseTimeline(selectedCase.id)} />

        {/* Análises doutrinárias */}
        <h3 className="hud-mono section-label">ANÁLISE COGNITIVA E ERGONOMIA</h3>
        
        <div className="analysis-grid">
          <TacticalCard title="Fatores Humanos & Estresse">
            <p className="selectable" style={{ fontSize: '0.8rem', margin: 0 }}>{selectedCase.human_factors}</p>
          </TacticalCard>

          <TacticalCard title="Tomada de Decisão & Doutrina">
            <p className="selectable" style={{ fontSize: '0.8rem', margin: 0 }}>{selectedCase.decision_making}</p>
          </TacticalCard>

          <TacticalCard title="Lições Aprendidas (Debriefing)" badge="Ação Corretiva" badgeType="alert">
            <p className="selectable" style={{ fontSize: '0.8rem', margin: 0, whiteSpace: 'pre-line' }}>{selectedCase.lessons}</p>
          </TacticalCard>
        </div>

        <style>{`
          .case-meta {
            display: flex;
            gap: 16px;
            font-size: 0.75rem;
            color: var(--text-secondary);
            margin: 4px 0 16px 0;
          }
          .case-meta span {
            display: flex;
            align-items: center;
            gap: 4px;
          }
          .analysis-grid {
            display: flex;
            flex-direction: column;
            gap: 12px;
            margin-top: 10px;
          }
        `}</style>
      </div>
    );
  }

  return (
    <div className="cases-list-container">
      <h1 className="hud-mono">ESTUDOS DE CASO</h1>
      <p style={{ marginBottom: '16px', fontSize: '0.9rem' }}>
        Análises táticas e debriefings históricos de incidentes civis e militares. Foco em erros cognitivos, problemas de comunicação e lições aprendidas.
      </p>

      <div className="cases-grid">
        {CASES.map((c) => (
          <TacticalCard
            key={c.id}
            title={c.title}
            subtitle={c.date}
            badge="Análise Doutrinária"
            badgeType="danger"
            onClick={() => handleSelectCase(c)}
          >
            <p style={{ fontSize: '0.8rem', marginBottom: '8px' }}>{c.summary}</p>
            <div className="case-card-footer hud-mono">
              <span>LOCAL: {c.location}</span>
              {isCaseFav(c.id) && <BookmarkCheck size={14} className="active-green-text" />}
            </div>
          </TacticalCard>
        ))}
      </div>

      <style>{`
        .cases-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
        .case-card-footer {
          display: flex;
          justify-content: space-between;
          font-size: 0.65rem;
          color: var(--accent-olive-hover);
          border-top: 1px solid rgba(45, 50, 55, 0.3);
          padding-top: 6px;
        }
      `}</style>
    </div>
  );
};

export default CaseStudies;
