// Componente Raiz (App) com Gerenciamento de Rotas - Tactical Academy
import React, { useState } from 'react';
import Dashboard from './features/dashboard/Dashboard';
import ModuleViewer from './features/study_modules/ModuleViewer';
import TrainingManager from './features/training/TrainingManager';
import GlobalSearch from './features/search/GlobalSearch';
import OperatorManager from './features/operator/OperatorManager';
import BottomNav from './shared/components/BottomNav';

function App() {
  const [activeTab, setActiveTab] = useState('dashboard'); // dashboard, modules, training, resources, operator
  const [navParams, setNavParams] = useState(null); // Parâmetros para transição entre telas

  // Manipulador de navegação global interna (Deep Linking)
  const handleNavigate = (tabId, params = null) => {
    setNavParams(params);
    setActiveTab(tabId);
  };

  const handleTabChange = (tabId) => {
    setNavParams(null); // Limpa parâmetros ao trocar manualmente pela barra inferior
    setActiveTab(tabId);
  };

  const clearParams = () => {
    setNavParams(null);
  };

  // Renderizador condicional de Telas (Views)
  const renderActiveView = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard onNavigate={handleNavigate} />;
      case 'modules':
        return (
          <ModuleViewer 
            initialModuleId={navParams?.moduleId} 
            onClearParams={clearParams} 
          />
        );
      case 'training':
        return <TrainingManager />;
      case 'resources':
        return (
          <GlobalSearch 
            initialSearch={navParams?.search}
            initialCaseId={navParams?.caseId} 
            onNavigate={handleNavigate}
            onClearParams={clearParams}
          />
        );
      case 'operator':
        return <OperatorManager />;
      default:
        return <Dashboard onNavigate={handleNavigate} />;
    }
  };

  return (
    <>
      <main>
        {renderActiveView()}
      </main>
      <BottomNav activeTab={activeTab} setActiveTab={handleTabChange} />
    </>
  );
}

export default App;
