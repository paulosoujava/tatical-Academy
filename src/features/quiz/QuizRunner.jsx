// Componente de Quiz - Tactical Academy
import React, { useState, useEffect } from 'react';
import { QUIZZES } from '../../core/data/contentData';
import LocalStoreRepository from '../../core/data/LocalStoreRepository';
import TacticalCard from '../../shared/components/TacticalCard';
import { Award, CheckCircle2, AlertTriangle, Play, RotateCcw, ChevronRight } from 'lucide-react';

const QuizRunner = () => {
  const [quizState, setQuizState] = useState('intro'); // intro, active, finished
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedOpt, setSelectedOpt] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [xpGained, setXpGained] = useState(0);
  const [quizDeck, setQuizDeck] = useState([]);

  // Embaralha uma sub-seleção de perguntas para cada rodada
  const startNewQuiz = () => {
    const shuffled = [...QUIZZES].sort(() => 0.5 - Math.random()).slice(0, 4); // 4 perguntas por rodada
    setQuizDeck(shuffled);
    setCurrentIdx(0);
    setSelectedOpt(null);
    setIsSubmitted(false);
    setScore(0);
    setXpGained(0);
    setQuizState('active');
    
    // Atualiza streak no início do treino
    LocalStoreRepository.updateStreak();
  };

  const handleSelectOption = (idx) => {
    if (isSubmitted) return;
    setSelectedOpt(idx);
  };

  const handleSubmitAnswer = () => {
    if (selectedOpt === null || isSubmitted) return;
    
    setIsSubmitted(true);
    const correctIdx = quizDeck[currentIdx].answer;
    
    if (selectedOpt === correctIdx) {
      setScore(prev => prev + 1);
      // Ganha 10 XP por acerto
      setXpGained(prev => prev + 10);
      LocalStoreRepository.addXP(10);
    }
  };

  const handleNextQuestion = () => {
    if (currentIdx + 1 < quizDeck.length) {
      setCurrentIdx(prev => prev + 1);
      setSelectedOpt(null);
      setIsSubmitted(false);
    } else {
      // Registra treino concluído no diário de estudos
      LocalStoreRepository.saveDiaryEntry({
        duration: 0.2, // 12 minutos
        subject: "Treinamento: Quiz Tático",
        notes: `Simulado concluído. Aproveitamento: ${score + (selectedOpt === quizDeck[currentIdx].answer ? 1 : 0)}/${quizDeck.length}. XP obtido: ${xpGained + (selectedOpt === quizDeck[currentIdx].answer ? 10 : 0)}.`
      });
      setQuizState('finished');
    }
  };

  if (quizState === 'intro') {
    return (
      <div className="quiz-intro-container text-center">
        <h1 className="hud-mono">SIMULADOS TÁTICOS</h1>
        <div style={{ display: 'flex', justifyContent: 'center', margin: '24px 0' }}>
          <div className="quiz-target-icon">
            <Award size={48} className="glow-pulse" />
          </div>
        </div>
        <p>
          Teste seus conhecimentos em consciência situacional, fundamentos doutrinários e fatores humanos. Cada acerto garante **+10 XP** para evoluir sua patente de operador.
        </p>
        <div className="hud-panel hud-panel-scan" style={{ padding: '12px', marginBottom: '24px', backgroundColor: 'rgba(0, 0, 0, 0.3)' }}>
          <span className="hud-mono" style={{ fontSize: '0.75rem', color: 'var(--accent-olive-hover)' }}>MODALIDADE: SIMULADO DE 4 QUESTÕES</span>
        </div>
        <button className="btn-tactical btn-tactical-primary w-full" onClick={startNewQuiz}>
          <Play size={18} /> INICIAR AVALIAÇÃO
        </button>
      </div>
    );
  }

  if (quizState === 'finished') {
    const totalQuestions = quizDeck.length;
    const finalScore = score;
    const successRate = Math.round((finalScore / totalQuestions) * 100);

    return (
      <div className="quiz-finished-container text-center">
        <h1 className="hud-mono">DEBRIEFING DE TREINO</h1>
        <div className="results-gauge">
          <div className="gauge-score hud-mono" style={{ color: successRate >= 70 ? 'var(--color-success)' : 'var(--color-alert)' }}>
            {successRate}%
          </div>
          <span className="hud-mono text-secondary" style={{ fontSize: '0.8rem' }}>APROVEITAMENTO GERAL</span>
        </div>

        <div className="xp-summary hud-panel">
          <div className="summary-row">
            <span className="hud-mono">Acertos:</span>
            <span className="hud-mono highlight">{finalScore} / {totalQuestions}</span>
          </div>
          <div className="summary-row" style={{ marginTop: '6px' }}>
            <span className="hud-mono">XP Adquirido:</span>
            <span className="hud-mono highlight-xp">+{xpGained} XP</span>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button className="btn-tactical btn-tactical-primary w-full" onClick={startNewQuiz}>
            <RotateCcw size={16} /> REPETIR SIMULADO
          </button>
          <button className="btn-tactical w-full" onClick={() => setQuizState('intro')}>
            VOLTAR AO INÍCIO
          </button>
        </div>
      </div>
    );
  }

  // View: Active Question
  const currentQuestion = quizDeck[currentIdx];
  const isCorrectAnswer = selectedOpt === currentQuestion.answer;

  return (
    <div className="quiz-active-container">
      {/* Progresso de Questões */}
      <div className="quiz-progress-header hud-mono">
        <span>QUESTÃO {currentIdx + 1} DE {quizDeck.length}</span>
        <span>ACERTOS: {score}</span>
      </div>
      <div className="quiz-progress-bar">
        <div 
          className="progress-fill" 
          style={{ width: `${((currentIdx) / quizDeck.length) * 100}%` }}
        ></div>
      </div>

      {/* Questão */}
      <div className="question-box hud-panel">
        <p className="question-text selectable">{currentQuestion.question}</p>
      </div>

      {/* Opções de Resposta */}
      <div className="options-list">
        {currentQuestion.options.map((opt, oIdx) => {
          const isSelected = selectedOpt === oIdx;
          const isCorrect = currentQuestion.answer === oIdx;
          
          let optionClass = "";
          if (isSelected) optionClass = "selected";
          if (isSubmitted) {
            if (isCorrect) optionClass = "correct";
            else if (isSelected) optionClass = "incorrect";
            else optionClass = "dimmed";
          }

          return (
            <button
              key={oIdx}
              className={`option-btn ${optionClass}`}
              onClick={() => handleSelectOption(oIdx)}
              disabled={isSubmitted}
            >
              <span className="opt-letter hud-mono">
                {String.fromCharCode(65 + oIdx)}
              </span>
              <span className="opt-text selectable">{opt}</span>
            </button>
          );
        })}
      </div>

      {/* Ações Inferiores / Explicações */}
      <div className="quiz-actions-footer">
        {!isSubmitted ? (
          <button
            className="btn-tactical btn-tactical-primary w-full"
            disabled={selectedOpt === null}
            onClick={handleSubmitAnswer}
          >
            CONFIRMAR RESPOSTA
          </button>
        ) : (
          <div className="feedback-section">
            <div className={`feedback-banner ${isCorrectAnswer ? 'correct' : 'incorrect'}`}>
              {isCorrectAnswer ? (
                <>
                  <CheckCircle2 size={18} />
                  <span className="hud-mono">RESPOSTA CORRETA (+10 XP)</span>
                </>
              ) : (
                <>
                  <AlertTriangle size={18} />
                  <span className="hud-mono">RESPOSTA INCORRETA</span>
                </>
              )}
            </div>
            
            <div className="explanation-box hud-panel">
              <span className="hud-mono label">DEBRIEFING / ANÁLISE:</span>
              <p className="selectable explanation-text">{currentQuestion.explanation}</p>
            </div>

            <button className="btn-tactical btn-tactical-primary w-full" onClick={handleNextQuestion}>
              {currentIdx + 1 === quizDeck.length ? 'VER DEBRIEFING GERAL' : 'PRÓXIMA PERGUNTA'} <ChevronRight size={16} />
            </button>
          </div>
        )}
      </div>

      <style>{`
        .quiz-target-icon {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          background-color: var(--accent-olive-dim);
          border: 2px solid var(--accent-olive);
          display: flex;
          align-items: center;
          justify-content: center;
          color: var(--accent-olive-hover);
        }

        .quiz-progress-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.7rem;
          color: var(--text-secondary);
          margin-bottom: 6px;
        }

        .quiz-progress-bar {
          height: 4px;
          background-color: rgba(0, 0, 0, 0.4);
          border-radius: 2px;
          overflow: hidden;
          margin-bottom: 20px;
        }

        .progress-fill {
          height: 100%;
          background-color: var(--accent-olive);
          transition: width 0.3s ease;
        }

        .question-box {
          margin-bottom: 16px;
          padding: 20px;
          background-color: rgba(26, 29, 32, 0.5);
        }

        .question-text {
          font-size: 1.05rem;
          color: var(--text-primary);
          line-height: 1.5;
          margin: 0;
          font-weight: 500;
        }

        .options-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
          margin-bottom: 20px;
        }

        .option-btn {
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          padding: 0 16px;
          min-height: 52px; /* Touch target */
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
          outline: none;
        }

        .option-btn:hover:not(:disabled) {
          border-color: var(--accent-olive);
          background-color: rgba(255, 255, 255, 0.02);
        }

        .opt-letter {
          width: 24px;
          height: 24px;
          border-radius: 4px;
          background-color: rgba(0, 0, 0, 0.3);
          border: 1px solid var(--border-color);
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 0.75rem;
          color: var(--text-secondary);
        }

        .opt-text {
          font-size: 0.9rem;
          flex: 1;
        }

        /* Estados das opções */
        .option-btn.selected {
          border-color: var(--accent-olive);
          background-color: var(--accent-olive-dim);
        }
        .option-btn.selected .opt-letter {
          border-color: var(--accent-olive);
          color: var(--accent-olive-hover);
        }

        .option-btn.correct {
          border-color: var(--color-success);
          background-color: var(--color-success-glow);
        }
        .option-btn.correct .opt-letter {
          border-color: var(--color-success);
          background-color: var(--color-success);
          color: #000;
          font-weight: bold;
        }

        .option-btn.incorrect {
          border-color: var(--color-danger);
          background-color: var(--color-danger-glow);
        }
        .option-btn.incorrect .opt-letter {
          border-color: var(--color-danger);
          background-color: var(--color-danger);
          color: #fff;
          font-weight: bold;
        }

        .option-btn.dimmed {
          opacity: 0.3;
        }

        /* Feedback section */
        .feedback-section {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .feedback-banner {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 10px 16px;
          border-radius: 4px;
          font-weight: bold;
          font-size: 0.8rem;
        }

        .feedback-banner.correct {
          background-color: var(--color-success-glow);
          color: var(--color-success);
          border: 1px solid var(--color-success);
        }

        .feedback-banner.incorrect {
          background-color: var(--color-danger-glow);
          color: var(--color-danger);
          border: 1px solid var(--color-danger);
        }

        .explanation-box {
          margin-bottom: 0;
          padding: 12px;
          background-color: rgba(0,0,0,0.2);
        }
        .explanation-box .label {
          font-size: 0.65rem;
          color: var(--accent-olive-hover);
          margin-bottom: 4px;
          display: block;
        }
        .explanation-text {
          font-size: 0.8rem;
          margin: 0;
          line-height: 1.4;
          text-align: justify;
        }

        /* Results score */
        .results-gauge {
          padding: 24px 0;
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .gauge-score {
          font-size: 3rem;
          font-weight: bold;
          text-shadow: 0 0 10px rgba(0,0,0,0.5);
        }

        .xp-summary {
          padding: 16px;
          margin-bottom: 24px;
          background-color: rgba(0,0,0,0.2);
        }
        .summary-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.85rem;
        }
        .highlight {
          font-weight: bold;
          color: var(--text-primary);
        }
        .highlight-xp {
          font-weight: bold;
          color: var(--color-success);
        }
      `}</style>
    </div>
  );
};

export default QuizRunner;
