// Componente de Navegação Inferior (BottomNav) - Tactical Academy
import React from 'react';
import { LayoutDashboard, BookOpen, Target, Search, User } from 'lucide-react';

const BottomNav = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: 'dashboard', label: 'Início', icon: LayoutDashboard },
    { id: 'modules', label: 'Estudo', icon: BookOpen },
    { id: 'training', label: 'Treino', icon: Target },
    { id: 'resources', label: 'Busca', icon: Search },
    { id: 'operator', label: 'Operador', icon: User }
  ];

  return (
    <nav className="bottom-nav">
      {tabs.map((tab) => {
        const IconComponent = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            className={`nav-item ${isActive ? 'active' : ''}`}
            onClick={() => setActiveTab(tab.id)}
            aria-label={tab.label}
          >
            <div className="icon-wrapper">
              <IconComponent size={24} />
            </div>
            <span className="nav-label">{tab.label}</span>
          </button>
        );
      })}
      
      <style>{`
        .bottom-nav {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: calc(var(--nav-height) + var(--safe-area-bottom));
          background-color: #16191C;
          border-top: 1px solid var(--border-color);
          display: flex;
          justify-content: space-around;
          align-items: center;
          padding-bottom: var(--safe-area-bottom);
          z-index: 100;
          box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.4);
        }

        .nav-item {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          background: none;
          border: none;
          color: var(--text-secondary);
          width: 64px;
          height: 56px; /* Touch target ideal */
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
          outline: none;
          position: relative;
        }

        .icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 36px;
          height: 36px;
          border-radius: 18px;
          transition: all 0.2s ease;
        }

        .nav-label {
          font-size: 0.65rem;
          font-family: var(--font-mono);
          text-transform: uppercase;
          margin-top: 2px;
          letter-spacing: 0.05em;
          transition: all 0.2s ease;
        }

        /* Active HUD indicator */
        .nav-item.active {
          color: var(--text-primary);
        }

        .nav-item.active .icon-wrapper {
          background-color: var(--accent-olive-dim);
          color: var(--accent-olive-hover);
          box-shadow: 0 0 10px var(--accent-olive-glow);
          border: 1px solid var(--accent-olive);
        }

        .nav-item.active .nav-label {
          color: var(--accent-olive-hover);
          font-weight: bold;
        }

        /* Indicator Line on top of active item */
        .nav-item::after {
          content: '';
          position: absolute;
          top: 0;
          left: 15%;
          width: 70%;
          height: 2px;
          background-color: var(--accent-olive);
          transform: scaleX(0);
          transition: transform 0.2s ease;
        }

        .nav-item.active::after {
          transform: scaleX(1);
          box-shadow: 0 0 8px var(--accent-olive);
        }
      `}</style>
    </nav>
  );
};

export default BottomNav;
