// Componente do Diário de Estudos - Tactical Academy
import React, { useState } from 'react';
import LocalStoreRepository from '../../core/data/LocalStoreRepository';
import TacticalCard from '../../shared/components/TacticalCard';
import { Plus, Trash2, Calendar, BookOpen, Clock } from 'lucide-react';

const StudyDiary = ({ onUpdateProfile }) => {
  const [diary, setDiary] = useState(() => LocalStoreRepository.getDiary());
  const [subject, setSubject] = useState('Fundamentos de Tiro');
  const [duration, setDuration] = useState('0.5');
  const [notes, setNotes] = useState('');

  const subjects = [
    'Fundamentos de Tiro',
    'OODA Loop',
    'Ciclo das Cores',
    'Consciência Situacional',
    'Psicologia de Alto Estresse',
    'Fatores Humanos',
    'Doutrina CQB',
    'CQB Veicular',
    'Guerra Cognitiva',
    'História Militar',
    'Simulado (Quiz)',
    'Revisão (Flashcards)'
  ];

  const durations = [
    { value: '0.2', label: '12 Minutos (0.2h)' },
    { value: '0.5', label: '30 Minutos (0.5h)' },
    { value: '1.0', label: '1 Hora (1.0h)' },
    { value: '1.5', label: '1.5 Horas (1.5h)' },
    { value: '2.0', label: '2 Horas (2.0h)' },
    { value: '3.0', label: '3 Horas (3.0h)' }
  ];

  const handleSaveEntry = (e) => {
    e.preventDefault();
    if (!subject || !duration) return;

    const entry = {
      subject,
      duration: parseFloat(duration),
      notes: notes.trim()
    };

    const newEntry = LocalStoreRepository.saveDiaryEntry(entry);
    setDiary(LocalStoreRepository.getDiary());
    
    // Conceder XP bônus por logar estudo: +15 XP
    LocalStoreRepository.addXP(15);
    LocalStoreRepository.updateStreak();
    
    // Limpa campos
    setNotes('');
    
    if (onUpdateProfile) {
      onUpdateProfile();
    }
    
    alert('Log de estudos registrado com sucesso! (+15 XP)');
  };

  const handleDeleteEntry = (id) => {
    if (confirm('Deseja excluir este registro do diário?')) {
      LocalStoreRepository.deleteDiaryEntry(id);
      setDiary(LocalStoreRepository.getDiary());
      if (onUpdateProfile) onUpdateProfile();
    }
  };

  return (
    <div className="study-diary-container">
      {/* Formulário de Registro */}
      <TacticalCard title="REGISTRAR ATIVIDADE DE ESTUDO" scanline={true}>
        <form onSubmit={handleSaveEntry} className="diary-form">
          <div className="form-group">
            <label className="form-label">TEMA ESTUDADO</label>
            <select 
              className="form-input diary-select"
              value={subject} 
              onChange={(e) => setSubject(e.target.value)}
            >
              {subjects.map(sub => (
                <option key={sub} value={sub}>{sub}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">DURAÇÃO DO TREINO</label>
            <select 
              className="form-input diary-select"
              value={duration} 
              onChange={(e) => setDuration(e.target.value)}
            >
              {durations.map(dur => (
                <option key={dur.value} value={dur.value}>{dur.label}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">ANOTAÇÕES / PRINCIPAIS APRENDIZADOS</label>
            <textarea 
              className="form-textarea" 
              placeholder="Descreva insights obtidos, conceitos fixados ou erros comuns que analisou..."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            ></textarea>
          </div>

          <button type="submit" className="btn-tactical btn-tactical-primary w-full">
            <Plus size={16} /> REGISTRAR SESSÃO (+15 XP)
          </button>
        </form>
      </TacticalCard>

      {/* Histórico do Diário */}
      <h3 className="hud-mono section-label">REGISTROS PERSISTIDOS</h3>
      
      <div className="diary-logs-list">
        {diary.length === 0 ? (
          <div className="empty-logs text-center hud-mono">
            NENHUM REGISTRO DE ESTUDO ENCONTRADO
          </div>
        ) : (
          diary.map((item) => (
            <div key={item.id} className="diary-log-card hud-panel">
              <div className="diary-log-header">
                <div className="diary-log-title-area">
                  <span className="diary-log-title hud-mono">{item.subject}</span>
                  <div className="diary-log-meta-icons hud-mono">
                    <span><Calendar size={12} /> {item.date}</span>
                    <span><Clock size={12} /> {item.duration}h</span>
                  </div>
                </div>
                <button 
                  className="delete-log-btn" 
                  onClick={() => handleDeleteEntry(item.id)}
                  aria-label="Deletar registro"
                >
                  <Trash2 size={16} />
                </button>
              </div>
              
              {item.notes && (
                <div className="diary-log-body">
                  <p className="selectable">{item.notes}</p>
                </div>
              )}
            </div>
          ))
        )}
      </div>

      <style>{`
        .diary-form {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }

        .diary-select {
          background-color: #1A1D20 !important;
          color: var(--text-primary);
          border: 1px solid var(--border-color);
          appearance: none;
          background-image: url("data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24' fill='none' stroke='%238E959E' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 12px center;
          background-size: 16px;
          padding-right: 40px !important;
        }

        .diary-select option {
          background-color: var(--bg-color);
          color: var(--text-primary);
        }

        .diary-logs-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .diary-log-card {
          margin-bottom: 0px;
          background-color: var(--card-bg);
          padding: 12px 16px;
        }

        .diary-log-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          border-bottom: 1px solid rgba(45, 50, 55, 0.3);
          padding-bottom: 8px;
          margin-bottom: 8px;
        }

        .diary-log-title-area {
          display: flex;
          flex-direction: column;
          gap: 2px;
        }

        .diary-log-title {
          font-size: 0.85rem;
          color: var(--text-primary);
          font-weight: 500;
        }

        .diary-log-meta-icons {
          display: flex;
          gap: 12px;
          font-size: 0.65rem;
          color: var(--accent-olive-hover);
        }

        .diary-log-meta-icons span {
          display: flex;
          align-items: center;
          gap: 4px;
        }

        .delete-log-btn {
          background: none;
          border: none;
          color: var(--text-muted);
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: color 0.2s ease;
        }

        .delete-log-btn:hover {
          color: var(--color-danger);
        }

        .diary-log-body {
          font-size: 0.8rem;
          color: var(--text-secondary);
          line-height: 1.4;
          text-align: justify;
        }

        .empty-logs {
          padding: 32px;
          color: var(--text-muted);
          font-size: 0.85rem;
        }
      `}</style>
    </div>
  );
};

export default StudyDiary;
