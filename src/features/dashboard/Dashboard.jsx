// Componente Dashboard - Tactical Academy
import React, { useState, useEffect } from 'react';
import LocalStoreRepository from '../../core/data/LocalStoreRepository';
import { MODULES } from '../../core/data/contentData';
import TacticalCard from '../../shared/components/TacticalCard';
import { Award, Flame, Clock, Bookmark, BookOpen, Target, CheckSquare, ChevronRight } from 'lucide-react';

const Dashboard = ({ onNavigate }) => {
  const [profile, setProfile] = useState(LocalStoreRepository.getProfile());
  const [diary, setDiary] = useState(LocalStoreRepository.getDiary());
  const [favorites, setFavorites] = useState(LocalStoreRepository.getFavorites());

  useEffect(() => {
    // Atualiza sequência ao abrir
    const updatedStreak = LocalStoreRepository.updateStreak();
    setProfile(LocalStoreRepository.getProfile());
  }, []);

  const totalXp = profile.xp;
  const currentLevel = profile.level;
  const xpInCurrentLevel = totalXp % 100;
  const xpNeeded = 100;
  const hoursStudied = profile.totalHours;
  const weeklyGoal = 4.0; // 4 horas semanais
  const goalPercent = Math.min(Math.round((hoursStudied / weeklyGoal) * 100), 100);

  // Conta itens salvos
  const totalFavsCount = 
    (favorites.modules?.length || 0) + 
    (favorites.glossary?.length || 0) + 
    (favorites.cases?.length || 0);

  return (
    <div className="dashboard-container">
      <h1 className="hud-mono">CENTRAL DE COMANDO</h1>

      {/* Grid de Estatísticas HUD */}
      <div className="stats-hud-grid">
        <div className="hud-stat-box">
          <div className="stat-icon-wrapper active-green">
            <Award size={20} />
          </div>
          <div className="stat-data">
            <span className="stat-label hud-mono">NÍVEL</span>
            <span className="stat-value hud-mono">{currentLevel}</span>
          </div>
        </div>

        <div className="hud-stat-box">
          <div className="stat-icon-wrapper active-orange">
            <Flame size={20} />
          </div>
          <div className="stat-data">
            <span className="stat-label hud-mono">SEQUÊNCIA</span>
            <span className="stat-value hud-mono">{profile.streak} D</span>
          </div>
        </div>

        <div className="hud-stat-box">
          <div className="stat-icon-wrapper active-blue">
            <Clock size={20} />
          </div>
          <div className="stat-data">
            <span className="stat-label hud-mono">ESTUDADO</span>
            <span className="stat-value hud-mono">{hoursStudied}h</span>
          </div>
        </div>
      </div>

      {/* Barra de Progresso de Nível */}
      <TacticalCard className="level-progress-card">
        <div className="progress-header hud-mono">
          <span>PROGRESSO DO OPERADOR</span>
          <span>{xpInCurrentLevel} / {xpNeeded} XP</span>
        </div>
        <div className="xp-bar-container">
          <div className="xp-bar-fill" style={{ width: `${xpInCurrentLevel}%` }}></div>
        </div>
        <div className="xp-footer-stats hud-mono">
          <span>XP TOTAL: {totalXp}</span>
          <span>PRÓXIMO NÍVEL: {currentLevel + 1}</span>
        </div>
      </TacticalCard>

      {/* Meta Semanal e Status Operacional */}
      <div className="two-column-dashboard">
        <TacticalCard title="Meta Semanal" scanline={true} className="goal-card">
          <div className="gauge-container">
            <div className="circular-gauge">
              <svg viewBox="0 0 36 36" className="circular-chart">
                <path className="circle-bg"
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path className="circle"
                  strokeDasharray={`${goalPercent}, 100`}
                  d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" className="percentage hud-mono">{goalPercent}%</text>
              </svg>
            </div>
            <div className="gauge-labels hud-mono">
              <span className="highlight-text">{hoursStudied} / {weeklyGoal} Horas</span>
              <span className="sub-label">META SEMANAL</span>
            </div>
          </div>
        </TacticalCard>

        {/* Resumo de Ações Rápidas */}
        <div className="quick-actions-panel">
          <button className="quick-act-btn" onClick={() => onNavigate('modules')}>
            <BookOpen size={18} />
            <span className="hud-mono">Módulos de Estudo</span>
            <ChevronRight size={16} />
          </button>
          <button className="quick-act-btn" onClick={() => onNavigate('training')}>
            <Target size={18} />
            <span className="hud-mono">Iniciar Treino</span>
            <ChevronRight size={16} />
          </button>
          <button className="quick-act-btn" onClick={() => onNavigate('operator')}>
            <CheckSquare size={18} />
            <span className="hud-mono">Checklists & Diário</span>
            <ChevronRight size={16} />
          </button>
        </div>
      </div>

      {/* Favoritos Rápidos */}
      <TacticalCard title="Favoritos do Operador" badge={totalFavsCount.toString()} badgeType="info">
        {totalFavsCount === 0 ? (
          <div className="empty-state">
            <Bookmark size={24} style={{ opacity: 0.3, marginBottom: '6px' }} />
            <p style={{ fontSize: '0.8rem', margin: 0 }}>Nenhum conteúdo favoritado. Salve artigos, termos ou casos táticos para acesso rápido.</p>
          </div>
        ) : (
          <div className="favorites-summary">
            {favorites.modules?.length > 0 && (
              <div className="fav-category-list">
                <span className="category-tag hud-mono">MÓDULOS</span>
                <div className="fav-items">
                  {favorites.modules.map(id => {
                    const mod = MODULES.find(m => m.id === id);
                    return mod ? (
                      <button key={id} className="fav-chip hud-mono" onClick={() => onNavigate('modules', { moduleId: id })}>
                        {mod.title}
                      </button>
                    ) : null;
                  })}
                </div>
              </div>
            )}
            
            {(favorites.glossary?.length > 0 || favorites.cases?.length > 0) && (
              <div className="fav-category-list" style={{ marginTop: '8px' }}>
                <span className="category-tag hud-mono">CONCEITOS / CASOS</span>
                <div className="fav-items">
                  {favorites.glossary?.slice(0, 3).map(term => (
                    <button key={term} className="fav-chip hud-mono" onClick={() => onNavigate('resources', { search: term })}>
                      {term}
                    </button>
                  ))}
                  {favorites.cases?.map(id => (
                    <button key={id} className="fav-chip hud-mono" onClick={() => onNavigate('resources', { caseId: id })}>
                      Caso: {id === 'miami_1986' ? 'Miami 1986' : 'Mogadíscio'}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </TacticalCard>

      {/* Histórico do Diário Recente */}
      <TacticalCard title="Atividade Recente (Diário)">
        {diary.length === 0 ? (
          <div className="empty-state">
            <p style={{ fontSize: '0.8rem', margin: 0 }}>Nenhum registro de estudo recente. Comece a ler ou treinar para preencher o diário.</p>
          </div>
        ) : (
          <div className="recent-diary-list">
            {diary.slice(0, 2).map((item) => (
              <div key={item.id} className="recent-diary-item">
                <div className="diary-meta-row hud-mono">
                  <span className="diary-date">{item.date}</span>
                  <span className="diary-duration">{item.duration}h</span>
                </div>
                <div className="diary-title hud-mono">{item.subject}</div>
                {item.notes && <div className="diary-notes">{item.notes}</div>}
              </div>
            ))}
          </div>
        )}
      </TacticalCard>

      <style>{`
        .dashboard-container {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }

        /* Stats HUD */
        .stats-hud-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }

        .hud-stat-box {
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          padding: 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.2);
        }

        .stat-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          border-radius: 4px;
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid transparent;
        }

        .stat-icon-wrapper.active-green {
          color: var(--color-success);
          border-color: rgba(76, 175, 80, 0.3);
          background-color: var(--color-success-glow);
        }

        .stat-icon-wrapper.active-orange {
          color: var(--color-alert);
          border-color: rgba(245, 124, 0, 0.3);
          background-color: var(--color-alert-glow);
        }

        .stat-icon-wrapper.active-blue {
          color: var(--color-info);
          border-color: rgba(2, 136, 209, 0.3);
          background-color: var(--color-info-glow);
        }

        .stat-data {
          display: flex;
          flex-direction: column;
        }

        .stat-label {
          font-size: 0.55rem;
          color: var(--text-secondary);
        }

        .stat-value {
          font-size: 1.1rem;
          font-weight: bold;
          color: var(--text-primary);
        }

        /* Level progress */
        .level-progress-card {
          margin-bottom: 0px;
        }

        .progress-header {
          display: flex;
          justify-content: space-between;
          font-size: 0.75rem;
          color: var(--accent-olive-hover);
          margin-bottom: 8px;
        }

        .xp-bar-container {
          height: 8px;
          background-color: rgba(0, 0, 0, 0.4);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          overflow: hidden;
        }

        .xp-bar-fill {
          height: 100%;
          background-color: var(--accent-olive);
          box-shadow: 0 0 8px var(--accent-olive);
          transition: width 0.4s ease;
        }

        .xp-footer-stats {
          display: flex;
          justify-content: space-between;
          font-size: 0.65rem;
          color: var(--text-secondary);
          margin-top: 6px;
        }

        /* Two columns */
        .two-column-dashboard {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 16px;
        }

        .goal-card {
          margin-bottom: 0px;
        }

        .gauge-container {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 12px;
          padding: 4px 0;
        }

        .circular-gauge {
          width: 80px;
          height: 80px;
        }

        .circular-chart {
          display: block;
          max-width: 100%;
          max-height: 100%;
        }

        .circle-bg {
          fill: none;
          stroke: rgba(0, 0, 0, 0.4);
          stroke-width: 2.8;
        }

        .circle {
          fill: none;
          stroke: var(--accent-olive);
          stroke-width: 2.8;
          stroke-linecap: round;
          transition: stroke-dasharray 0.4s ease;
        }

        .percentage {
          fill: var(--text-primary);
          font-family: var(--font-mono);
          font-size: 0.5rem;
          text-anchor: middle;
          font-weight: bold;
        }

        .gauge-labels {
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .highlight-text {
          font-size: 0.8rem;
          font-weight: bold;
          color: var(--text-primary);
        }

        .sub-label {
          font-size: 0.55rem;
          color: var(--text-secondary);
        }

        .quick-actions-panel {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .quick-act-btn {
          flex: 1;
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          color: var(--text-primary);
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 0 16px;
          cursor: pointer;
          transition: all 0.2s ease;
          text-align: left;
          outline: none;
        }

        .quick-act-btn:hover {
          border-color: var(--accent-olive);
          background-color: rgba(255, 255, 255, 0.02);
        }

        .quick-act-btn span {
          flex: 1;
          font-size: 0.75rem;
          text-transform: uppercase;
        }

        .quick-act-btn svg:last-child {
          color: var(--text-secondary);
          transition: transform 0.2s ease;
        }

        .quick-act-btn:hover svg:last-child {
          transform: translateX(3px);
          color: var(--accent-olive);
        }

        /* Empty states */
        .empty-state {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          padding: 12px 0;
          color: var(--text-secondary);
        }

        /* Favorites summary */
        .favorites-summary {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .fav-category-list {
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .category-tag {
          font-size: 0.6rem;
          color: var(--accent-olive);
          border-bottom: 1px solid rgba(45, 50, 55, 0.3);
          padding-bottom: 2px;
        }

        .fav-items {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .fav-chip {
          background-color: var(--accent-olive-dim);
          border: 1px solid var(--accent-olive);
          color: var(--text-primary);
          font-size: 0.65rem;
          padding: 4px 10px;
          border-radius: 4px;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .fav-chip:hover {
          background-color: var(--accent-olive);
          box-shadow: 0 0 6px var(--accent-olive-glow);
        }

        /* Recent diary list */
        .recent-diary-list {
          display: flex;
          flex-direction: column;
          gap: 10px;
        }

        .recent-diary-item {
          border-bottom: 1px dashed var(--border-color);
          padding-bottom: 8px;
        }

        .recent-diary-item:last-child {
          border-bottom: none;
          padding-bottom: 0;
        }

        .diary-meta-row {
          display: flex;
          justify-content: space-between;
          font-size: 0.7rem;
          color: var(--accent-olive-hover);
        }

        .diary-title {
          font-size: 0.85rem;
          color: var(--text-primary);
          font-weight: 500;
          margin-top: 2px;
        }

        .diary-notes {
          font-size: 0.75rem;
          color: var(--text-secondary);
          margin-top: 4px;
          font-style: italic;
        }

        @media (max-width: 480px) {
          .two-column-dashboard {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
};

export default Dashboard;
