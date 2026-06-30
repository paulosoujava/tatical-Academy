// Componente de Gerenciamento de Checklists - Tactical Academy
import React, { useState } from 'react';
import { CHECKLISTS } from '../../core/data/contentData';
import LocalStoreRepository from '../../core/data/LocalStoreRepository';
import TacticalCard from '../../shared/components/TacticalCard';
import { CheckSquare, Square, ClipboardList, RefreshCw } from 'lucide-react';

const ChecklistManager = () => {
  const [selectedListId, setSelectedListId] = useState(CHECKLISTS[0].id);
  const [lists, setLists] = useState(() => {
    // Carrega checklists salvos ou usa padrão do contentData
    return CHECKLISTS.map(list => {
      const saved = LocalStoreRepository.getChecklist(list.id);
      return saved ? { ...list, items: saved } : list;
    });
  });

  const handleToggleItem = (listId, itemIndex) => {
    const nextLists = lists.map(list => {
      if (list.id === listId) {
        const nextItems = list.items.map((item, idx) => {
          if (idx === itemIndex) {
            return { ...item, checked: !item.checked };
          }
          return item;
        });
        
        // Persiste no LocalStorage
        LocalStoreRepository.saveChecklist(listId, nextItems);
        return { ...list, items: nextItems };
      }
      return list;
    });

    setLists(nextLists);
    
    // XP bônus por atitude de disciplina: +2 XP por tarefa marcada
    const activeList = nextLists.find(l => l.id === listId);
    if (activeList.items[itemIndex].checked) {
      LocalStoreRepository.addXP(2);
      LocalStoreRepository.updateStreak();
    }
  };

  const handleResetChecklist = (listId) => {
    const nextLists = lists.map(list => {
      if (list.id === listId) {
        const resetItems = list.items.map(item => ({ ...item, checked: false }));
        LocalStoreRepository.saveChecklist(listId, resetItems);
        return { ...list, items: resetItems };
      }
      return list;
    });
    setLists(nextLists);
  };

  const currentList = lists.find(l => l.id === selectedListId);
  const totalItems = currentList?.items.length || 0;
  const checkedItems = currentList?.items.filter(i => i.checked).length || 0;
  const percent = totalItems > 0 ? Math.round((checkedItems / totalItems) * 100) : 0;

  return (
    <div className="checklist-container">
      {/* Seletor de Categoria */}
      <div className="checklist-tabs hud-mono">
        {lists.map(list => {
          const listTotal = list.items.length;
          const listChecked = list.items.filter(i => i.checked).length;
          const listPct = Math.round((listChecked / listTotal) * 100);
          
          return (
            <button
              key={list.id}
              className={`chk-tab-btn ${selectedListId === list.id ? 'active' : ''}`}
              onClick={() => setSelectedListId(list.id)}
            >
              <span>{list.title.split(' ')[0]}</span>
              <span className="chk-pct">{listPct}%</span>
            </button>
          );
        })}
      </div>

      {/* Checklist selecionado */}
      {currentList && (
        <TacticalCard
          title={currentList.title}
          badge={`${checkedItems}/${totalItems} CONCLUSÕES`}
          badgeType={percent === 100 ? 'success' : percent > 0 ? 'info' : 'olive'}
          headerAction={
            <button 
              className="chk-reset-btn" 
              onClick={() => handleResetChecklist(currentList.id)}
              title="Resetar checklist"
            >
              <RefreshCw size={14} />
            </button>
          }
        >
          {/* Barra de Progresso do Checklist */}
          <div className="chk-progress-bar-wrapper">
            <div className="chk-progress-bar">
              <div className="chk-fill" style={{ width: `${percent}%` }}></div>
            </div>
            <span className="hud-mono chk-percent-text">{percent}% COMPLETO</span>
          </div>

          {/* Lista de Itens */}
          <div className="chk-items-list">
            {currentList.items.map((item, index) => (
              <div 
                key={index} 
                className={`chk-item-row ${item.checked ? 'checked' : ''}`}
                onClick={() => handleToggleItem(currentList.id, index)}
                role="checkbox"
                aria-checked={item.checked}
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleToggleItem(currentList.id, index);
                  }
                }}
              >
                <div className="chk-box-indicator">
                  {item.checked ? (
                    <CheckSquare size={20} className="active-green" />
                  ) : (
                    <Square size={20} />
                  )}
                </div>
                <span className="chk-item-text selectable">{item.text}</span>
              </div>
            ))}
          </div>
        </TacticalCard>
      )}

      <style>{`
        .checklist-tabs {
          display: grid;
          grid-template-columns: 1fr 1fr 1fr;
          gap: 6px;
          margin-bottom: 16px;
          border-bottom: 1px solid var(--border-color);
          padding-bottom: 8px;
        }

        .chk-tab-btn {
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          padding: 8px 4px;
          border-radius: 4px;
          cursor: pointer;
          font-size: 0.65rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
          transition: all 0.2s ease;
          outline: none;
        }

        .chk-tab-btn:hover {
          border-color: var(--accent-olive);
          color: var(--text-primary);
        }

        .chk-tab-btn.active {
          background-color: var(--accent-olive-dim);
          border-color: var(--accent-olive);
          color: var(--accent-olive-hover);
          box-shadow: 0 0 6px var(--accent-olive-glow);
          font-weight: bold;
        }

        .chk-pct {
          font-size: 0.55rem;
          opacity: 0.8;
        }

        .chk-reset-btn {
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

        .chk-reset-btn:hover {
          color: var(--color-danger);
        }

        /* Progresso */
        .chk-progress-bar-wrapper {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
          border-bottom: 1px solid rgba(45, 50, 55, 0.3);
          padding-bottom: 12px;
        }

        .chk-progress-bar {
          flex: 1;
          height: 6px;
          background-color: rgba(0, 0, 0, 0.4);
          border-radius: 3px;
          overflow: hidden;
        }

        .chk-fill {
          height: 100%;
          background-color: var(--accent-olive);
          box-shadow: 0 0 6px var(--accent-olive);
          transition: width 0.3s ease;
        }

        .chk-percent-text {
          font-size: 0.65rem;
          color: var(--accent-olive-hover);
          min-width: 80px;
          text-align: right;
        }

        /* Lista de itens */
        .chk-items-list {
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .chk-item-row {
          background-color: rgba(0, 0, 0, 0.15);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          padding: 12px;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          min-height: 48px; /* Touch target */
          transition: all 0.2s ease;
        }

        .chk-item-row:hover {
          border-color: var(--accent-olive-dim);
          background-color: rgba(255, 255, 255, 0.01);
        }

        .chk-item-row.checked {
          border-color: rgba(76, 175, 80, 0.2);
          background-color: rgba(76, 175, 80, 0.02);
        }

        .chk-box-indicator {
          display: flex;
          align-items: center;
          color: var(--text-muted);
        }

        .chk-box-indicator .active-green {
          color: var(--color-success);
          filter: drop-shadow(0 0 4px var(--color-success-glow));
        }

        .chk-item-text {
          font-size: 0.85rem;
          color: var(--text-primary);
          flex: 1;
        }

        .chk-item-row.checked .chk-item-text {
          color: var(--text-secondary);
          text-decoration: line-through;
        }
      `}</style>
    </div>
  );
};

export default ChecklistManager;
