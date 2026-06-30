// Diagramas Visuais Interativos - Tactical Academy
import React, { useState } from 'react';
import { Eye, Compass, Lightbulb, Zap, Shield, HelpCircle, Activity } from 'lucide-react';

// 1. OODA Loop Map (Fluxograma Interativo)
export const OodaLoopMap = () => {
  const [activeStep, setActiveStep] = useState('observe');

  const steps = {
    observe: {
      title: "Observar (Observe)",
      icon: Eye,
      color: "var(--color-info)",
      desc: "Coleta ativa de dados do ambiente. Varredura por anomalias, saídas e movimentações. Insumos brutos livres de julgamento prévio."
    },
    orient: {
      title: "Orientar (Orient)",
      icon: Compass,
      color: "var(--accent-olive)",
      desc: "A fase mais crítica. Filtragem da realidade observada com base em experiências, cultura, genética, análise lógica e novos dados."
    },
    decide: {
      title: "Decidir (Decide)",
      icon: Lightbulb,
      color: "var(--color-alert)",
      desc: "Escolha do curso de ação ideal. Formulação imediata de um plano ou recuperação de respostas motoras treinadas na memória operacional."
    },
    act: {
      title: "Agir (Act)",
      icon: Zap,
      color: "var(--color-danger)",
      desc: "Execução física imediata do plano. A ação modifica o ambiente, gerando novos inputs que devem ser re-observados reiniciando o ciclo."
    }
  };

  const current = steps[activeStep];

  return (
    <div className="diagram-card">
      <div className="hud-header hud-mono">
        <Activity size={16} className="glow-pulse" />
        <span>OODA LOOP - FLUXO DE DECISÃO</span>
      </div>

      <div className="ooda-flow">
        {Object.entries(steps).map(([key, value]) => {
          const StepIcon = value.icon;
          const isActive = activeStep === key;
          return (
            <button
              key={key}
              className={`ooda-node ${isActive ? 'active' : ''}`}
              style={{ '--node-color': value.color }}
              onClick={() => setActiveStep(key)}
            >
              <StepIcon size={20} />
              <span className="node-title hud-mono">{key.toUpperCase()}</span>
            </button>
          );
        })}
      </div>

      <div className="ooda-description hud-panel">
        <h4 className="hud-mono" style={{ color: current.color }}>{current.title}</h4>
        <p className="selectable" style={{ fontSize: '0.85rem', marginTop: '6px' }}>{current.desc}</p>
      </div>

      <style>{`
        .diagram-card {
          width: 100%;
          background-color: var(--card-bg);
          border: 1px solid var(--border-color);
          border-radius: 4px;
          padding: 16px;
          margin: 12px 0;
        }
        .hud-header {
          display: flex;
          align-items: center;
          gap: 8px;
          font-size: 0.8rem;
          color: var(--accent-olive);
          margin-bottom: 16px;
          border-bottom: 1px dashed var(--border-color);
          padding-bottom: 6px;
        }
        .ooda-flow {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 8px;
          margin-bottom: 16px;
        }
        .ooda-node {
          background-color: rgba(0, 0, 0, 0.4);
          border: 1px solid var(--border-color);
          color: var(--text-secondary);
          border-radius: 4px;
          padding: 12px 4px;
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 6px;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .ooda-node:hover {
          border-color: var(--node-color);
          background-color: rgba(0, 0, 0, 0.6);
        }
        .ooda-node.active {
          color: var(--text-primary);
          border-color: var(--node-color);
          background-color: var(--node-color);
          box-shadow: 0 0 10px rgba(0,0,0,0.5);
        }
        .node-title {
          font-size: 0.65rem;
          font-weight: bold;
        }
        .ooda-description {
          margin-bottom: 0;
          padding: 12px;
          background-color: rgba(0, 0, 0, 0.2);
        }
        @media (max-width: 480px) {
          .ooda-flow {
            grid-template-columns: repeat(2, 1fr);
            gap: 12px;
          }
        }
      `}</style>
    </div>
  );
};

// 2. Cooper's Color Wheel (Ciclo das Cores)
export const CoopersColorWheel = () => {
  const [activeColor, setActiveColor] = useState('yellow');

  const states = {
    white: {
      name: "Branco",
      color: "#FFFFFF",
      bgColor: "rgba(255, 255, 255, 0.05)",
      textColor: "#FFFFFF",
      bpm: "< 60 BPM",
      state: "Desatento / Vulnerável",
      desc: "Foco totalmente interno. Ignora saídas e pessoas. Em caso de ataque, a reação será choque absoluto ou negação."
    },
    yellow: {
      name: "Amarelo",
      color: "#FDD835",
      bgColor: "rgba(253, 216, 53, 0.08)",
      textColor: "#FDD835",
      bpm: "60-80 BPM",
      state: "Atenção Relaxada",
      desc: "Percepção global normal. Escaneamento pacífico e consciente. Ideal para vida cotidiana: ciente de saídas, rotas e indivíduos."
    },
    orange: {
      name: "Laranja",
      color: "#F57C00",
      bgColor: "rgba(245, 124, 0, 0.08)",
      textColor: "#F57C00",
      bpm: "80-115 BPM",
      state: "Alerta Focado",
      desc: "Identificou uma anomalia suspeita. Foco visual/mental fixado na ameaça potencial. Formulação de planos mentais 'E Se...?'."
    },
    red: {
      name: "Vermelho",
      color: "#D32F2F",
      bgColor: "rgba(211, 47, 47, 0.08)",
      textColor: "#D32F2F",
      bpm: "115-145 BPM",
      state: "Combate / Ação",
      desc: "Ameaça confirmada. Gatilho de decisão acionado. Reação física executada sob ótima coordenação motora e visual."
    },
    black: {
      name: "Preto",
      color: "#212121",
      bgColor: "rgba(0, 0, 0, 0.6)",
      textColor: "#E0E0E0",
      bpm: "> 175 BPM",
      state: "Paralisia Cognitiva",
      desc: "Sobrecarga adrenal. Pânico, colapso da motricidade fina, congelamento (Freeze) ou recuo irracional por falta de preparo tático."
    }
  };

  const current = states[activeColor];

  return (
    <div className="diagram-card">
      <div className="hud-header hud-mono">
        <Shield size={16} />
        <span>CÓDIGO DE CORES DE COOPER - PRONTIDÃO</span>
      </div>

      <div className="color-stack">
        {Object.entries(states).map(([key, value]) => {
          const isActive = activeColor === key;
          return (
            <button
              key={key}
              className={`color-bar ${isActive ? 'active' : ''}`}
              style={{ 
                '--bar-color': value.color,
                '--bar-bg': value.bgColor,
                borderLeft: `6px solid ${value.color}`
              }}
              onClick={() => setActiveColor(key)}
            >
              <span className="bar-name hud-mono" style={{ color: value.textColor }}>
                ESTADO {value.name.toUpperCase()}
              </span>
              <span className="bar-bpm hud-mono">{value.bpm}</span>
            </button>
          );
        })}
      </div>

      <div className="color-description hud-panel">
        <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--border-color)', paddingBottom: '4px', marginBottom: '8px' }}>
          <h4 className="hud-mono" style={{ color: current.textColor }}>{current.state}</h4>
          <span className="hud-mono" style={{ color: 'var(--text-secondary)' }}>{current.bpm}</span>
        </div>
        <p className="selectable" style={{ fontSize: '0.85rem' }}>{current.desc}</p>
      </div>

      <style>{`
        .color-stack {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 16px;
        }
        .color-bar {
          background-color: var(--bar-bg);
          border: 1px solid var(--border-color);
          border-left-width: 6px !important;
          color: var(--text-primary);
          padding: 12px 16px;
          display: flex;
          justify-content: space-between;
          align-items: center;
          cursor: pointer;
          border-radius: 4px;
          transition: all 0.2s ease;
        }
        .color-bar:hover {
          filter: brightness(1.2);
          background-color: rgba(255, 255, 255, 0.02);
        }
        .color-bar.active {
          box-shadow: 0 0 12px rgba(255, 255, 255, 0.05);
          background-color: rgba(255, 255, 255, 0.03);
          border-color: var(--bar-color);
        }
        .bar-name {
          font-size: 0.8rem;
          font-weight: bold;
        }
        .bar-bpm {
          font-size: 0.75rem;
          color: var(--text-secondary);
        }
        .color-description {
          margin-bottom: 0;
          padding: 12px;
          background-color: rgba(0, 0, 0, 0.2);
        }
      `}</style>
    </div>
  );
};

// 3. Simulator de Imagem de Mira (Sight Picture Simulator - Acessível e Educativo)
export const SightPictureSimulator = () => {
  const [alignmentError, setAlignmentError] = useState('perfect');

  const errors = {
    perfect: {
      name: "Alinhamento Perfeito",
      desc: "Topo da massa de mira alinhado exatamente com o topo da alça, com folga de luz simétrica nas laterais. Ponto de impacto idêntico ao ponto de visada.",
      bulletX: 150,
      bulletY: 100,
      massaY: 105,
      massaX: 150
    },
    high: {
      name: "Massa de Mira Alta",
      desc: "A massa dianteira está projetada acima do topo da alça. O disparo atingirá o alvo ACIMA da área desejada.",
      bulletX: 150,
      bulletY: 55,
      massaY: 85,
      massaX: 150
    },
    low: {
      name: "Massa de Mira Baixa",
      desc: "A massa dianteira está abaixo do nível da alça. O disparo atingirá o alvo ABAIXO da área de impacto desejada.",
      bulletX: 150,
      bulletY: 145,
      massaY: 125,
      massaX: 150
    },
    left: {
      name: "Massa de Mira à Esquerda",
      desc: "A massa de mira está muito próxima ao canto esquerdo da alça. O projétil desviará para a ESQUERDA.",
      bulletX: 105,
      bulletY: 100,
      massaY: 105,
      massaX: 135
    },
    right: {
      name: "Massa de Mira à Direita",
      desc: "A massa de mira está encostada no canto direito da alça. O projétil desviará para a DIREITA.",
      bulletX: 195,
      bulletY: 100,
      massaY: 105,
      massaX: 165
    }
  };

  const current = errors[alignmentError];

  return (
    <div className="diagram-card">
      <div className="hud-header hud-mono">
        <HelpCircle size={16} />
        <span>SIMULADOR DE ALINHAMENTO DE MIRA</span>
      </div>

      <div className="simulator-canvas">
        {/* SVG Drawing of target + sights */}
        <svg width="300" height="200" className="svg-diagram" style={{ backgroundColor: '#0A0C0E', border: '1px solid var(--border-color)', borderRadius: '4px' }}>
          {/* Target (Bullseye) */}
          <circle cx="150" cy="100" r="45" fill="none" stroke="#2C3527" stroke-width="2" />
          <circle cx="150" cy="100" r="30" fill="none" stroke="#2C3527" stroke-width="2" />
          <circle cx="150" cy="100" r="15" fill="#1C201A" />
          
          {/* Simulated Bullet Impact (Crimson dot) */}
          <circle cx={current.bulletX} cy={current.bulletY} r="6" fill="var(--color-danger)" opacity="0.8" className="glow-pulse" />
          <line x1={current.bulletX - 12} y1={current.bulletY} x2={current.bulletX + 12} y2={current.bulletY} stroke="var(--color-danger)" stroke-width="1.5" opacity="0.8" />
          <line x1={current.bulletX} y1={current.bulletY - 12} x2={current.bulletX} y2={current.bulletY + 12} stroke="var(--color-danger)" stroke-width="1.5" opacity="0.8" />

          {/* Rear Sight (Alça - static structure foreground) */}
          {/* Left Block */}
          <path d="M 40 180 L 110 180 L 110 110 L 40 110 Z" fill="#202428" stroke="#3A3F45" stroke-width="1" />
          {/* Right Block */}
          <path d="M 190 180 L 260 180 L 260 110 L 190 110 Z" fill="#202428" stroke="#3A3F45" stroke-width="1" />
          {/* Bottom Connector */}
          <rect x="110" y="150" width="80" height="30" fill="#202428" />

          {/* Front Sight (Massa - moving based on error) */}
          <rect x={current.massaX - 10} y={current.massaY} width="20" height="45" fill="#5B7053" stroke="#829C79" stroke-width="1.5" />
          {/* Fiber Optic Dot (Typical tactical front sight) */}
          <circle cx={current.massaX} cy={current.massaY + 10} r="3" fill="#4CAF50" />
        </svg>
      </div>

      <div className="sim-controls">
        {Object.keys(errors).map((key) => (
          <button
            key={key}
            className={`btn-tactical sim-btn ${alignmentError === key ? 'active' : ''}`}
            onClick={() => setAlignmentError(key)}
          >
            {key === 'perfect' ? 'PERFEITO' : key.toUpperCase()}
          </button>
        ))}
      </div>

      <div className="sim-description hud-panel">
        <h4 className="hud-mono" style={{ color: alignmentError === 'perfect' ? 'var(--color-success)' : 'var(--color-alert)' }}>
          {current.name}
        </h4>
        <p className="selectable" style={{ fontSize: '0.85rem', marginTop: '6px' }}>{current.desc}</p>
      </div>

      <style>{`
        .simulator-canvas {
          display: flex;
          justify-content: center;
          margin-bottom: 12px;
        }
        .sim-controls {
          display: grid;
          grid-template-columns: repeat(5, 1fr);
          gap: 4px;
          margin-bottom: 12px;
        }
        .sim-btn {
          height: 38px !important;
          min-width: unset !important;
          font-size: 0.6rem !important;
          padding: 0 2px !important;
        }
        .sim-btn.active {
          border-color: var(--accent-olive);
          background-color: var(--accent-olive-dim);
          color: var(--accent-olive-hover);
        }
        .sim-description {
          margin-bottom: 0;
          padding: 12px;
          background-color: rgba(0, 0, 0, 0.2);
        }
        @media (max-width: 480px) {
          .sim-controls {
            grid-template-columns: repeat(3, 1fr);
            gap: 6px;
          }
        }
      `}</style>
    </div>
  );
};

// 4. Stress Response Map (Fisiologia e Frequência Cardíaca)
export const StressResponseMap = () => {
  const [activeThreshold, setActiveThreshold] = useState('optimal');

  const levels = {
    normal: {
      title: "60-115 BPM: Estado Normal",
      skills: "Coordenação motora fina normal. Percepção sensorial integral. Pensamento lógico operando com velocidade máxima.",
      symptoms: "Fisiologia estável. Nenhuma distorção induzida por estresse agudo."
    },
    optimal: {
      title: "115-145 BPM: Ótimo de Sobrevivência",
      skills: "Desempenho físico máximo. Coordenação motora complexa operando perfeitamente (desenhar, correr, empunhar).",
      symptoms: "Aumento das pupilas, elevação da atenção. Ponto ideal de eficácia em combate."
    },
    degraded: {
      title: "145-175 BPM: Deterioração Cognitiva",
      skills: "Perda progressiva da coordenação motora fina (manipular peças pequenas, travas finas). Perda de destreza.",
      symptoms: "Início da Visão em Túnel e Exclusão Auditiva. Respiração torna-se rápida e superficial."
    },
    critical: {
      title: "> 175 BPM: Estado Preto (Colapso)",
      skills: "Total perda de raciocínio abstrato. Pensamento puramente ancestral/subconsciente (luta, fuga, paralisia total).",
      symptoms: "Visão em túnel completa. Paralisia por medo (Freeze). Perda de controle de esfíncteres e tremores involuntários."
    }
  };

  const current = levels[activeThreshold];

  return (
    <div className="diagram-card">
      <div className="hud-header hud-mono">
        <Activity size={16} />
        <span>RESPOSTA AO ESTRESSE POR BPM</span>
      </div>

      <div className="bpm-zones">
        {Object.entries(levels).map(([key, value]) => {
          const isActive = activeThreshold === key;
          let zoneColor = 'var(--text-secondary)';
          if (key === 'normal') zoneColor = 'var(--color-info)';
          if (key === 'optimal') zoneColor = 'var(--color-success)';
          if (key === 'degraded') zoneColor = 'var(--color-alert)';
          if (key === 'critical') zoneColor = 'var(--color-danger)';
          
          return (
            <button
              key={key}
              className={`bpm-zone-btn ${isActive ? 'active' : ''}`}
              style={{ '--zone-color': zoneColor }}
              onClick={() => setActiveThreshold(key)}
            >
              <span className="zone-indicator"></span>
              <span className="zone-title hud-mono">{value.title.split(':')[0]}</span>
            </button>
          );
        })}
      </div>

      <div className="bpm-description hud-panel">
        <h4 className="hud-mono" style={{ 
          color: activeThreshold === 'normal' ? 'var(--color-info)' :
                 activeThreshold === 'optimal' ? 'var(--color-success)' :
                 activeThreshold === 'degraded' ? 'var(--color-alert)' : 'var(--color-danger)'
        }}>{current.title}</h4>
        
        <div style={{ marginTop: '8px' }}>
          <div className="hud-mono label">HABILIDADES MOTORAS:</div>
          <p className="selectable text-desc">{current.skills}</p>
        </div>
        
        <div>
          <div className="hud-mono label">SINTOMAS FISIOLÓGICOS:</div>
          <p className="selectable text-desc">{current.symptoms}</p>
        </div>
      </div>

      <style>{`
        .bpm-zones {
          display: flex;
          flex-direction: column;
          gap: 6px;
          margin-bottom: 16px;
        }
        .bpm-zone-btn {
          background-color: rgba(0, 0, 0, 0.4);
          border: 1px solid var(--border-color);
          color: var(--text-primary);
          padding: 10px 16px;
          display: flex;
          align-items: center;
          gap: 12px;
          cursor: pointer;
          border-radius: 4px;
          text-align: left;
          transition: all 0.2s ease;
        }
        .bpm-zone-btn:hover {
          background-color: rgba(255, 255, 255, 0.02);
          border-color: var(--zone-color);
        }
        .bpm-zone-btn.active {
          border-color: var(--zone-color);
          background-color: rgba(0,0,0,0.6);
        }
        .zone-indicator {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background-color: var(--zone-color);
          box-shadow: 0 0 6px var(--zone-color);
        }
        .zone-title {
          font-size: 0.8rem;
          font-weight: bold;
        }
        .bpm-description {
          margin-bottom: 0;
          padding: 12px;
          background-color: rgba(0, 0, 0, 0.2);
        }
        .label {
          font-size: 0.7rem;
          color: var(--accent-olive);
          margin-bottom: 2px;
        }
        .text-desc {
          font-size: 0.85rem;
          margin-bottom: 8px;
        }
      `}</style>
    </div>
  );
};
