// Componente de Gerenciamento de Treinamento - Tactical Academy
import React, { useState } from 'react';
import QuizRunner from '../quiz/QuizRunner';
import FlashcardReview from '../flashcards/FlashcardReview';

const TrainingManager = () => {
  const [activeSubTab, setActiveSubTab] = useState('quiz'); // quiz, flashcards

  return (
    <div className="training-manager-container">
      {/* Sub-navegação do Treino */}
      <div className="training-tabs hud-mono">
        <button 
          className={`train-tab-btn ${activeSubTab === 'quiz' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('quiz')}
        >
          SIMULADOS (QUIZ)
        </button>
        <button 
          className={`train-tab-btn ${activeSubTab === 'flashcards' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('flashcards')}
        >
          FLASHCARDS (LEITNER)
        </button>
      </div>

      {/* Conteúdo dinâmico da sub-aba */}
      <div className="training-tab-content">
        {activeSubTab === 'quiz' && <QuizRunner />}
        {activeSubTab === 'flashcards' && <FlashcardReview />}
      </div>

      <style>{`
        .training-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 6px;
          margin-bottom: 16px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 8px;
        }

        .train-tab-btn {
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

        .train-tab-btn:hover {
          border-color: var(--accent-olive);
          color: var(--text-primary);
        }

        .train-tab-btn.active {
          background-color: var(--accent-olive-dim);
          border-color: var(--accent-olive);
          color: var(--accent-olive-hover);
          box-shadow: 0 0 6px var(--accent-olive-glow);
          font-weight: bold;
        }

        .training-tab-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
      `}</style>
    </div>
  );
};

export default TrainingManager;
