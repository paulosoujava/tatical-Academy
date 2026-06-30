// Componente TacticalCard (Painel HUD) - Tactical Academy
import React from 'react';

const TacticalCard = ({ 
  title, 
  subtitle, 
  badge, 
  badgeType = 'olive', // olive, alert, danger, success, info
  scanline = false, 
  onClick, 
  children,
  headerAction, // Atalho do lado direito
  className = ""
}) => {
  const isClickable = !!onClick;
  
  return (
    <div 
      className={`hud-panel ${scanline ? 'hud-panel-scan' : ''} ${isClickable ? 'clickable-panel' : ''} ${className}`}
      onClick={onClick}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      onKeyDown={isClickable ? (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onClick();
        }
      } : undefined}
    >
      {(title || badge || headerAction) && (
        <div className="card-header">
          <div className="header-text-group">
            {title && <h3 className="card-title hud-mono">{title}</h3>}
            {subtitle && <span className="card-subtitle hud-mono">{subtitle}</span>}
          </div>
          <div className="header-actions">
            {badge && (
              <span className={`badge-tactical badge-tactical-${badgeType}`}>
                {badge}
              </span>
            )}
            {headerAction}
          </div>
        </div>
      )}
      
      <div className="card-body">
        {children}
      </div>

      <style>{`
        .card-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 12px;
          border-bottom: 1px solid rgba(45, 50, 55, 0.5);
          padding-bottom: 8px;
        }

        .header-text-group {
          display: flex;
          flex-direction: column;
          gap: 2px;
          flex: 1;
        }

        .card-title {
          font-size: 0.95rem;
          color: var(--text-primary);
          text-transform: uppercase;
          letter-spacing: 0.02em;
        }

        .card-subtitle {
          font-size: 0.7rem;
          color: var(--text-secondary);
          text-transform: uppercase;
        }

        .header-actions {
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .card-body {
          font-size: 0.9rem;
          color: var(--text-secondary);
          line-height: 1.5;
        }

        .clickable-panel {
          cursor: pointer;
          transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
        }

        .clickable-panel:hover {
          border-color: var(--accent-olive);
          box-shadow: 0 0 12px var(--accent-olive-glow);
          transform: translateY(-2px);
          background-color: #202428;
        }

        .clickable-panel:active {
          transform: translateY(0);
          background-color: var(--accent-olive-dim);
        }
      `}</style>
    </div>
  );
};

export default TacticalCard;
