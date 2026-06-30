// Componente de Flashcards - Tactical Academy
import React, { useState, useEffect } from 'react';
import { FLASHCARDS } from '../../core/data/contentData';
import LocalStoreRepository from '../../core/data/LocalStoreRepository';
import TacticalCard from '../../shared/components/TacticalCard';
import { RotateCw, HelpCircle, Layers, Award, Sparkles } from 'lucide-react';

const FlashcardReview = () => {
  const [currentCardIdx, setCurrentCardIdx] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);
  const [deck, setDeck] = useState([]);
  const [sessionCount, setSessionCount] = useState(0);
  const [stats, setStats] = useState({ box1: 0, box2: 0, box3: 0, box4: 0, box5: 0 });

  useEffect(() => {
    loadDeck();
  }, []);

  const loadDeck = () => {
    // Carrega caixas Leitner para cada card
    const mapped = FLASHCARDS.map(card => {
      const box = LocalStoreRepository.getFlashcardBox(card.id);
      return { ...card, box };
    });

    // Filtra cards que precisam de revisão (prioridade caixas menores, ex: box 1 e 2 sempre, 3 e 4 ocasional).
    // Para simplificar no cliente PWA, embaralhamos todos e ordenamos pelas caixas (menor caixa primeiro = mais urgente)
    const sorted = [...mapped].sort((a, b) => a.box - b.box);
    setDeck(sorted);
    setCurrentCardIdx(0);
    setIsFlipped(false);
    
    // Atualiza estatísticas de distribuição de caixas
    const counts = { box1: 0, box2: 0, box3: 0, box4: 0, box5: 0 };
    mapped.forEach(c => {
      counts[`box${c.box}`] = (counts[`box${c.box}`] || 0) + 1;
    });
    setStats(counts);
  };

  const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  const handleGrade = (difficulty) => {
    const card = deck[currentCardIdx];
    
    // Salva progresso na caixa Leitner
    const newBox = LocalStoreRepository.updateFlashcardBox(card.id, difficulty);
    
    // XP recompensado por exercitar memória ativa: +5 XP por card revisado
    LocalStoreRepository.addXP(5);
    LocalStoreRepository.updateStreak();
    
    setSessionCount(prev => prev + 1);

    // Avança para o próximo card ou recarrega deck ao terminar
    if (currentCardIdx + 1 < deck.length) {
      setCurrentCardIdx(prev => prev + 1);
      setIsFlipped(false);
    } else {
      // Final do deck
      // Log do diário
      LocalStoreRepository.saveDiaryEntry({
        duration: 0.15, // 9 minutos
        subject: "Treinamento: Flashcards Ativos",
        notes: `Revisão de cartões espaçados concluída. Sessão: ${deck.length} cartões.`
      });
      loadDeck(); // Reinicia e reordena com as novas caixas
    }
  };

  if (deck.length === 0) {
    return (
      <div className="empty-deck text-center">
        <p>Carregando baralho...</p>
      </div>
    );
  }

  const currentCard = deck[currentCardIdx];

  return (
    <div className="flashcards-review-container">
      <h1 className="hud-mono">REVISÃO ESPAÇADA</h1>
      <p style={{ marginBottom: '16px', fontSize: '0.85rem' }}>
        Técnica de **Active Recall** para fixação conceitual de longo prazo. Force a memória antes de virar o cartão.
      </p>

      {/* Distribuidor de Caixas Leitner (HUD) */}
      <div className="leitner-stats hud-panel">
        <span className="hud-mono stats-label"><Layers size={12} /> DISTRIBUIÇÃO DAS CAIXAS</span>
        <div className="boxes-grid">
          {[1, 2, 3, 4, 5].map(b => (
            <div key={b} className="box-indicator">
              <span className="box-num hud-mono">C{b}</span>
              <span className="box-count hud-mono">{stats[`box${b}`] || 0}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Card Flotante */}
      <div className="flashcard-wrapper">
        <div className={`flashcard-3d ${isFlipped ? 'flipped' : ''}`} onClick={handleFlip}>
          {/* Lado da Frente (Pergunta) */}
          <div className="card-face card-front">
            <div className="card-hud-bar hud-mono">
              <span>CARD {currentCardIdx + 1} / {deck.length}</span>
              <span>CAIXA {currentCard.box}</span>
            </div>
            <div className="card-text-content">
              <HelpCircle size={32} className="card-q-icon" />
              <p className="card-questionselectable">{currentCard.question}</p>
            </div>
            <div className="card-flip-prompt hud-mono">
              <RotateCw size={14} /> TOCAR PARA REVELAR
            </div>
          </div>

          {/* Lado de Trás (Resposta) */}
          <div className="card-face card-back">
            <div className="card-hud-bar hud-mono">
              <span>DEBRIEFING DO CARTÃO</span>
              <span>RESPOSTA</span>
            </div>
            <div className="card-text-content">
              <p className="card-answer selectable">{currentCard.answer}</p>
            </div>
            <div className="card-flip-prompt hud-mono">
              TOCAR PARA VER PERGUNTA NOVAMENTE
            </div>
          </div>
        </div>
      </div>

      {/* Grade de Autoavaliação (Somente se revelado) */}
      <div className="review-action-area">
        {!isFlipped ? (
          <button className="btn-tactical btn-tactical-primary w-full" onClick={handleFlip}>
            REVELAR RESPOSTA
          </button>
        ) : (
          <div className="self-grading-grid">
            <button 
              className="btn-tactical btn-tactical-danger" 
              onClick={() => handleGrade('hard')}
            >
              DIFÍCIL (BOX 1)
            </button>
            <button 
              className="btn-tactical btn-tactical-alert" 
              onClick={() => handleGrade('medium')}
            >
              MÉDIO
            </button>
            <button 
              className="btn-tactical btn-tactical-primary" 
              onClick={() => handleGrade('easy')}
            >
              FÁCIL (+1 BOX)
            </button>
          </div>
        )}
      </div>

      <div className="session-progress hud-mono text-center" style={{ marginTop: '16px', fontSize: '0.7rem', color: 'var(--text-muted)' }}>
        REVISADOS NESTA SESSÃO: {sessionCount} CARTÕES (+{sessionCount * 5} XP)
      </div>

      <style>{`
        /* Leitner box stats */
        .leitner-stats {
          padding: 10px 12px;
          margin-bottom: 16px;
          background-color: rgba(0, 0, 0, 0.2);
        }

        .stats-label {
          font-size: 0.6rem;
          color: var(--accent-olive-hover);
          display: flex;
          align-items: center;
          gap: 4px;
          margin-bottom: 6px;
        }

        .boxes-grid {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 6px;
        }

        .box-indicator {
          background-color: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          padding: 4px;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .box-num {
          font-size: 0.55rem;
          color: var(--text-secondary);
        }

        .box-count {
          font-size: 0.85rem;
          font-weight: bold;
          color: var(--accent-olive-hover);
        }

        /* 3D Flip Card */
        .flashcard-wrapper {
          perspective: 1000px;
          width: 100%;
          height: 240px;
          margin-bottom: 20px;
          cursor: pointer;
        }

        .flashcard-3d {
          position: relative;
          width: 100%;
          height: 100%;
          transition: transform 0.5s;
          transform-style: preserve-3d;
        }

        .flashcard-3d.flipped {
          transform: rotateY(180deg);
        }

        .card-face {
          position: absolute;
          width: 100%;
          height: 100%;
          backface-visibility: hidden;
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          padding: 16px;
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
        }

        /* Corner brackets specifically for card faces */
        .card-face::before, .card-face::after {
          content: '';
          position: absolute;
          width: 8px;
          height: 8px;
          border: 1.5px solid var(--accent-olive);
          opacity: 0.5;
        }
        .card-face::before { top: 6px; left: 6px; border-right: none; border-bottom: none; }
        .card-face::after { bottom: 6px; right: 6px; border-left: none; border-top: none; }

        .card-back {
          transform: rotateY(180deg);
          border-color: var(--accent-olive);
        }

        .card-hud-bar {
          display: flex;
          justify-content: space-between;
          font-size: 0.65rem;
          color: var(--accent-olive-hover);
          border-bottom: 1px dashed var(--border-color);
          padding-bottom: 6px;
        }

        .card-text-content {
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          padding: 10px 0;
        }

        .card-q-icon {
          color: var(--accent-olive);
          margin-bottom: 10px;
          opacity: 0.6;
        }

        .card-question {
          font-size: 1rem;
          color: var(--text-primary);
          line-height: 1.4;
          font-weight: 500;
        }

        .card-answer {
          font-size: 0.85rem;
          color: var(--text-secondary);
          line-height: 1.5;
          text-align: justify;
        }

        .card-flip-prompt {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          font-size: 0.6rem;
          color: var(--text-muted);
          border-top: 1px solid rgba(45, 50, 55, 0.3);
          padding-top: 6px;
        }

        /* Actions */
        .self-grading-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 8px;
        }

        .self-grading-grid .btn-tactical {
          height: 48px !important;
          font-size: 0.7rem !important;
          padding: 0 4px !important;
        }
      `}</style>
    </div>
  );
};

export default FlashcardReview;
