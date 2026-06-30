// Componente de Módulos de Estudo - Tactical Academy
import React, { useState, useEffect } from 'react';
import { MODULES } from '../../core/data/contentData';
import LocalStoreRepository from '../../core/data/LocalStoreRepository';
import Accordion from '../../shared/components/Accordion';
import TacticalCard from '../../shared/components/TacticalCard';
import { 
  OodaLoopMap, 
  CoopersColorWheel, 
  SightPictureSimulator, 
  StressResponseMap 
} from '../../shared/components/VisualDiagrams';
import { Bookmark, BookmarkCheck, ChevronLeft, BookOpen, Clock, Activity, Check } from 'lucide-react';

const ModuleViewer = ({ initialModuleId, onClearParams }) => {
  const [selectedModule, setSelectedModule] = useState(null);
  const [favorites, setFavorites] = useState(LocalStoreRepository.getFavorites());
  const [completedTopics, setCompletedTopics] = useState(
    JSON.parse(localStorage.getItem('tactical_completed_topics') || '{}')
  );

  useEffect(() => {
    if (initialModuleId) {
      const found = MODULES.find(m => m.id === initialModuleId);
      if (found) {
        setSelectedModule(found);
      }
    }
  }, [initialModuleId]);

  const handleSelectModule = (mod) => {
    setSelectedModule(mod);
    // Log study activity initiation
    LocalStoreRepository.updateStreak();
  };

  const handleBack = () => {
    setSelectedModule(null);
    if (onClearParams) onClearParams();
  };

  const handleToggleFav = (moduleId) => {
    LocalStoreRepository.toggleFavorite('modules', moduleId);
    setFavorites(LocalStoreRepository.getFavorites());
  };

  const toggleTopicCompleted = (topicId) => {
    const next = { ...completedTopics, [topicId]: !completedTopics[topicId] };
    setCompletedTopics(next);
    localStorage.setItem('tactical_completed_topics', JSON.stringify(next));

    // Recompensar com 5 XP ao concluir um tópico pela primeira vez
    if (!completedTopics[topicId]) {
      LocalStoreRepository.addXP(5);
      // Log do diário simplificado
      LocalStoreRepository.saveDiaryEntry({
        duration: 0.1,
        subject: `Estudo: ${selectedModule?.title}`,
        notes: `Tópico concluído.`
      });
    }
  };

  const isModuleFav = (moduleId) => {
    return favorites.modules?.includes(moduleId);
  };

  // Renderiza diagramas específicos para cada módulo se houver correspondência
  const renderModuleDiagram = (moduleId) => {
    switch (moduleId) {
      case 'shoot_fundamentals':
        return <SightPictureSimulator />;
      case 'ooda_loop':
        return <OodaLoopMap />;
      case 'color_cycle':
        return <CoopersColorWheel />;
      case 'stress_psychology':
        return <StressResponseMap />;
      default:
        return null;
    }
  };

  // View: Detalhe do Módulo
  if (selectedModule) {
    return (
      <div className="module-detail-container">
        <div className="module-header-nav">
          <button className="back-btn hud-mono" onClick={handleBack}>
            <ChevronLeft size={16} /> VOLTAR
          </button>
          
          <button 
            className="fav-toggle-btn" 
            onClick={() => handleToggleFav(selectedModule.id)}
            aria-label="Favoritar módulo"
          >
            {isModuleFav(selectedModule.id) ? (
              <BookmarkCheck size={20} className="active-green-text" />
            ) : (
              <Bookmark size={20} />
            )}
          </button>
        </div>

        <div className="module-title-section">
          <span className="badge-tactical badge-tactical-olive">{selectedModule.category}</span>
          <h2 className="hud-mono select-title">{selectedModule.title}</h2>
          <p className="module-desc-text">{selectedModule.description}</p>
        </div>

        {/* Diagramas Táticos Inline se existirem */}
        {renderModuleDiagram(selectedModule.id)}

        {/* Lista de Tópicos (Accordions) */}
        <div className="topics-list-section">
          <h3 className="hud-mono section-label">CONTEÚDO DOUTRINÁRIO</h3>
          {selectedModule.topics.map((topic) => {
            const isDone = completedTopics[topic.id];
            return (
              <Accordion 
                key={topic.id} 
                title={
                  <div className="accordion-title-wrapper">
                    <span>{topic.title}</span>
                    {isDone && <Check size={14} className="active-green-text stroke-bold" />}
                  </div>
                }
              >
                <div className="topic-reading-area selectable">
                  <p className="topic-content">{topic.content}</p>
                  <div className="topic-actions">
                    <button 
                      className={`btn-tactical btn-topic-check ${isDone ? 'btn-tactical-primary' : ''}`}
                      onClick={() => toggleTopicCompleted(topic.id)}
                    >
                      {isDone ? 'CONCLUÍDO' : 'MARCAR CONCLUÍDO (+5 XP)'}
                    </button>
                  </div>
                </div>
              </Accordion>
            );
          })}
        </div>

        <style>{`
          .module-header-nav {
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin-bottom: 12px;
          }

          .back-btn {
            background: none;
            border: 1px solid var(--border-color);
            color: var(--text-primary);
            display: inline-flex;
            align-items: center;
            gap: 4px;
            padding: 6px 12px;
            border-radius: 4px;
            cursor: pointer;
            font-size: 0.75rem;
            transition: all 0.2s ease;
          }

          .back-btn:hover {
            border-color: var(--accent-olive);
            background-color: var(--accent-olive-dim);
          }

          .fav-toggle-btn {
            background: none;
            border: 1px solid var(--border-color);
            color: var(--text-secondary);
            width: 32px;
            height: 32px;
            border-radius: 4px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.2s ease;
          }

          .fav-toggle-btn:hover {
            border-color: var(--accent-olive);
            color: var(--accent-olive-hover);
          }

          .active-green-text {
            color: var(--color-success) !important;
            filter: drop-shadow(0 0 4px var(--color-success-glow));
          }

          .select-title {
            margin: 8px 0 4px 0 !important;
            font-size: 1.5rem !important;
            border-bottom: none !important;
            padding-bottom: 0 !important;
          }
          .select-title::before { display: none; }

          .module-desc-text {
            font-size: 0.85rem;
            color: var(--text-secondary);
            margin-bottom: 16px;
            line-height: 1.4;
          }

          .section-label {
            font-size: 0.8rem;
            color: var(--text-muted);
            margin-bottom: 10px;
            border-bottom: 1px solid rgba(45, 50, 55, 0.4);
            padding-bottom: 4px;
          }

          .accordion-title-wrapper {
            display: flex;
            align-items: center;
            gap: 8px;
            width: 100%;
          }

          .stroke-bold {
            stroke-width: 3px;
          }

          .topic-reading-area {
            padding: 8px 0;
          }

          .topic-content {
            font-size: 0.9rem;
            color: var(--text-primary);
            line-height: 1.6;
            margin-bottom: 16px;
            text-align: justify;
          }

          .topic-actions {
            display: flex;
            justify-content: flex-end;
          }

          .btn-topic-check {
            height: 40px !important;
            font-size: 0.75rem !important;
          }
        `}</style>
      </div>
    );
  }

  // View: Lista de Módulos
  return (
    <div className="modules-list-container">
      <h1 className="hud-mono">MÓDULOS DE ESTUDO</h1>
      <p style={{ marginBottom: '16px', fontSize: '0.9rem' }}>
        Aprofunde seus conhecimentos teóricos em fundamentos, consciência situacional, psicologia do estresse e doutrinas operacionais conceituais.
      </p>

      <div className="modules-grid">
        {MODULES.map((mod) => {
          // Conta tópicos concluídos neste módulo
          const moduleTopicIds = mod.topics.map(t => t.id);
          const completedCount = moduleTopicIds.filter(id => completedTopics[id]).length;
          const totalCount = moduleTopicIds.length;
          const pct = Math.round((completedCount / totalCount) * 100);

          return (
            <TacticalCard
              key={mod.id}
              title={mod.title}
              subtitle={mod.category}
              badge={totalCount > 0 ? `${pct}%` : null}
              badgeType={pct === 100 ? 'success' : pct > 0 ? 'info' : 'olive'}
              onClick={() => handleSelectModule(mod)}
            >
              <div className="mod-card-body">
                <p className="mod-desc-clamp">{mod.description}</p>
                <div className="mod-card-footer hud-mono">
                  <span>{totalCount} TÓPICOS</span>
                  {isModuleFav(mod.id) && <BookmarkCheck size={14} className="active-green-text" />}
                </div>
              </div>
            </TacticalCard>
          );
        })}
      </div>

      <style>{`
        .modules-grid {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .mod-card-body {
          display: flex;
          flex-direction: column;
          height: 100%;
        }

        .mod-desc-clamp {
          font-size: 0.8rem;
          margin-bottom: 12px;
          display: -webkit-box;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
          overflow: hidden;
        }

        .mod-card-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
          font-size: 0.65rem;
          color: var(--accent-olive-hover);
          margin-top: auto;
          border-top: 1px solid rgba(45, 50, 55, 0.3);
          padding-top: 6px;
        }
      `}</style>
    </div>
  );
};

export default ModuleViewer;
