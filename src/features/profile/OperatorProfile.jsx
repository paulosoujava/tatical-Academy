// Componente de Perfil do Operador - Tactical Academy
import React from 'react';
import LocalStoreRepository from '../../core/data/LocalStoreRepository';
import TacticalCard from '../../shared/components/TacticalCard';
import { Award, Target, Flame, Clock, Calendar, CheckSquare } from 'lucide-react';

const OperatorProfile = ({ profile = LocalStoreRepository.getProfile() }) => {
  // Converte nível para patente
  const getRank = (level) => {
    if (level < 2) return "RECRUTA";
    if (level < 5) return "SOLDADO";
    if (level < 8) return "CABO";
    if (level < 15) return "SARGENTO";
    if (level < 25) return "TENENTE";
    if (level < 50) return "CAPITÃO";
    return "MAJ. DOUTRINÁRIO";
  };

  // Ícones customizados para badges
  const getBadgeDetails = (badgeName) => {
    const defaultDetails = { desc: "Medalha de Honra", icon: Award, color: "var(--accent-olive)" };
    
    if (badgeName === "Recruta") {
      return { desc: "1 Hora de Estudo Concluída", icon: Clock, color: "var(--color-info)" };
    }
    if (badgeName === "Operador") {
      return { desc: "5 Horas de Estudo Concluídas", icon: Clock, color: "var(--accent-olive-hover)" };
    }
    if (badgeName === "Veterano") {
      return { desc: "20 Horas de Estudo Concluídas", icon: Award, color: "var(--color-success)" };
    }
    if (badgeName === "Foco Consistente") {
      return { desc: "3 Dias de Sequência de Estudo", icon: Flame, color: "var(--color-alert)" };
    }
    if (badgeName === "Sentinela") {
      return { desc: "7 Dias de Sequência de Estudo", icon: Flame, color: "var(--color-danger)" };
    }
    if (badgeName.startsWith("Nível")) {
      return { desc: "Evolução de Patente Teórica", icon: Target, color: "var(--accent-olive)" };
    }
    
    return defaultDetails;
  };

  const xpInCurrentLevel = profile.xp % 100;
  const xpNeeded = 100;

  return (
    <div className="operator-profile-container">
      {/* HUD Header da Ficha do Operador */}
      <TacticalCard scanline={true} className="profile-banner-card">
        <div className="operator-ficha">
          <div className="profile-avatar-hud">
            <span className="hud-mono label-avatar">ID</span>
            <span className="hud-mono val-avatar">OP-{profile.level + 10}</span>
          </div>
          <div className="profile-details-hud">
            <span className="badge-tactical badge-tactical-danger hud-mono">FICHA MILITAR</span>
            <h2 className="hud-mono op-title">{getRank(profile.level)}</h2>
            <div className="op-meta hud-mono">LEVEL {profile.level} • XP {profile.xp}</div>
          </div>
        </div>
      </TacticalCard>

      {/* Estatísticas Gerais */}
      <h3 className="hud-mono section-label">INDICADORES DE PRONTIDÃO</h3>
      <div className="stats-matrix">
        <div className="stat-matrix-item hud-panel">
          <Clock size={16} className="item-icon info" />
          <div className="matrix-data">
            <span className="hud-mono label">HORAS ACUMULADAS</span>
            <span className="hud-mono val">{profile.totalHours}h</span>
          </div>
        </div>

        <div className="stat-matrix-item hud-panel">
          <Flame size={16} className="item-icon alert" />
          <div className="matrix-data">
            <span className="hud-mono label">SEQUÊNCIA DIÁRIA</span>
            <span className="hud-mono val">{profile.streak} DIAS</span>
          </div>
        </div>

        <div className="stat-matrix-item hud-panel">
          <Calendar size={16} className="item-icon success" />
          <div className="matrix-data">
            <span className="hud-mono label">ÚLTIMO TREINO</span>
            <span className="hud-mono val">{profile.lastActivityDate || "N/A"}</span>
          </div>
        </div>

        <div className="stat-matrix-item hud-panel">
          <Target size={16} className="item-icon olive" />
          <div className="matrix-data">
            <span className="hud-mono label">XP DA CONTA</span>
            <span className="hud-mono val">{profile.xp} XP</span>
          </div>
        </div>
      </div>

      {/* Progresso de Barra do Nível */}
      <TacticalCard title="PROGRESSO DO NÍVEL DO OPERADOR">
        <div className="progress-header hud-mono" style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', marginBottom: '8px' }}>
          <span>XP ACUMULADO</span>
          <span>{xpInCurrentLevel}% ({xpInCurrentLevel} / {xpNeeded} XP)</span>
        </div>
        <div className="xp-bar-container" style={{ height: '10px', backgroundColor: 'rgba(0,0,0,0.4)', borderRadius: '4px', overflow: 'hidden' }}>
          <div className="xp-bar-fill" style={{ height: '100%', width: `${xpInCurrentLevel}%`, backgroundColor: 'var(--accent-olive)', boxShadow: '0 0 10px var(--accent-olive)' }}></div>
        </div>
      </TacticalCard>

      {/* Badges / Conquistas */}
      <h3 className="hud-mono section-label">INSÍGNIAS E DECORAÇÕES UNIFICADAS</h3>
      
      <div className="badges-list-grid">
        {profile.badges.length === 0 ? (
          <div className="empty-badges text-center hud-mono">
            NENHUMA CONQUISTA OBTIDA AINDA
          </div>
        ) : (
          profile.badges.map((badgeName) => {
            const b = getBadgeDetails(badgeName);
            const BadgeIcon = b.icon;
            
            return (
              <div 
                key={badgeName} 
                className="badge-item-box hud-panel"
                style={{ borderColor: b.color }}
              >
                <div className="badge-icon-area" style={{ color: b.color }}>
                  <BadgeIcon size={24} />
                </div>
                <div className="badge-text-area">
                  <div className="badge-title hud-mono">{badgeName.toUpperCase()}</div>
                  <div className="badge-desc">{b.desc}</div>
                </div>
              </div>
            );
          })
        )}
      </div>

      <style>{`
        .profile-banner-card {
          margin-bottom: 0px;
        }

        .operator-ficha {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .profile-avatar-hud {
          width: 60px;
          height: 60px;
          background-color: var(--accent-olive-dim);
          border: 2px solid var(--accent-olive);
          border-radius: 4px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          position: relative;
        }

        .label-avatar {
          font-size: 0.5rem;
          color: var(--text-secondary);
        }

        .val-avatar {
          font-size: 0.85rem;
          font-weight: bold;
          color: var(--accent-olive-hover);
        }

        .profile-details-hud {
          flex: 1;
        }

        .op-title {
          margin: 4px 0 0px 0 !important;
          font-size: 1.3rem !important;
          border-bottom: none !important;
          padding-bottom: 0 !important;
        }
        .op-title::before { display: none; }

        .op-meta {
          font-size: 0.7rem;
          color: var(--text-secondary);
        }

        /* Stats Matrix */
        .stats-matrix {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 16px;
        }

        .stat-matrix-item {
          margin-bottom: 0px;
          padding: 10px 12px;
          display: flex;
          align-items: center;
          gap: 10px;
          background-color: rgba(26, 29, 32, 0.4);
        }

        .item-icon {
          display: flex;
          align-items: center;
        }

        .item-icon.info { color: var(--color-info); }
        .item-icon.alert { color: var(--color-alert); }
        .item-icon.success { color: var(--color-success); }
        .item-icon.olive { color: var(--accent-olive); }

        .matrix-data {
          display: flex;
          flex-direction: column;
        }

        .matrix-data .label {
          font-size: 0.5rem;
          color: var(--text-secondary);
        }

        .matrix-data .val {
          font-size: 0.85rem;
          font-weight: bold;
          color: var(--text-primary);
        }

        /* Badges grid */
        .badges-list-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
        }

        .badge-item-box {
          margin-bottom: 0px;
          padding: 12px;
          display: flex;
          gap: 10px;
          align-items: center;
          background-color: rgba(26, 29, 32, 0.4);
          border-left-width: 4px !important;
        }

        .badge-icon-area {
          display: flex;
          align-items: center;
        }

        .badge-text-area {
          display: flex;
          flex-direction: column;
        }

        .badge-title {
          font-size: 0.7rem;
          font-weight: bold;
          color: var(--text-primary);
        }

        .badge-desc {
          font-size: 0.6rem;
          color: var(--text-secondary);
        }

        .empty-badges {
          grid-column: 1 / span 2;
          padding: 24px;
          color: var(--text-muted);
          font-size: 0.8rem;
        }

        @media (max-width: 480px) {
          .badges-list-grid {
            grid-template-columns: 1fr;
          }
          .empty-badges {
            grid-column: 1;
          }
        }
      `}</style>
    </div>
  );
};

export default OperatorProfile;
