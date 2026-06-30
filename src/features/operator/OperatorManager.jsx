// Componente de Gerenciamento do Operador - Tactical Academy
import React, { useState } from 'react';
import OperatorProfile from '../profile/OperatorProfile';
import ChecklistManager from '../checklist/ChecklistManager';
import StudyDiary from '../diary/StudyDiary';
import LocalStoreRepository from '../../core/data/LocalStoreRepository';

const OperatorManager = () => {
  const [activeSubTab, setActiveSubTab] = useState('profile'); // profile, checklist, diary
  const [profile, setProfile] = useState(LocalStoreRepository.getProfile());

  const handleUpdateProfile = () => {
    setProfile(LocalStoreRepository.getProfile());
  };

  return (
    <div className="operator-manager-container">
      {/* Sub-navegação do Operador */}
      <div className="operator-tabs hud-mono">
        <button 
          className={`op-tab-btn ${activeSubTab === 'profile' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('profile')}
        >
          PERFIL
        </button>
        <button 
          className={`op-tab-btn ${activeSubTab === 'checklist' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('checklist')}
        >
          CHECKLISTS
        </button>
        <button 
          className={`op-tab-btn ${activeSubTab === 'diary' ? 'active' : ''}`}
          onClick={() => setActiveSubTab('diary')}
        >
          DIÁRIO
        </button>
      </div>

      {/* Conteúdo dinâmico da sub-aba */}
      <div className="operator-tab-content">
        {activeSubTab === 'profile' && <OperatorProfile profile={profile} />}
        {activeSubTab === 'checklist' && <ChecklistManager />}
        {activeSubTab === 'diary' && <StudyDiary onUpdateProfile={handleUpdateProfile} />}
      </div>

      <style>{`
        .operator-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 6px;
          margin-bottom: 16px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 8px;
        }

        .op-tab-btn {
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

        .op-tab-btn:hover {
          border-color: var(--accent-olive);
          color: var(--text-primary);
        }

        .op-tab-btn.active {
          background-color: var(--accent-olive-dim);
          border-color: var(--accent-olive);
          color: var(--accent-olive-hover);
          box-shadow: 0 0 6px var(--accent-olive-glow);
          font-weight: bold;
        }

        .operator-tab-content {
          display: flex;
          flex-direction: column;
          gap: 16px;
        }
      `}</style>
    </div>
  );
};

export default OperatorManager;
