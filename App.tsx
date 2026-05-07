import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import ModuleContent from './components/ModuleContent';
import { MANUAL_MODULES } from './constants';
import { Menu } from 'lucide-react';

function App() {
  const [currentModuleId, setCurrentModuleId] = useState(MANUAL_MODULES[0].id);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const currentModule = MANUAL_MODULES.find(m => m.id === currentModuleId) || MANUAL_MODULES[0];

  return (
    <div className="flex h-screen bg-slate-50 text-slate-900 overflow-hidden font-sans selection:bg-science-200">
      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/80 z-40 md:hidden backdrop-blur-sm transition-opacity"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <Sidebar 
        currentModuleId={currentModuleId}
        onSelectModule={(id) => {
          setCurrentModuleId(id);
        }}
        isOpen={isSidebarOpen}
        onCloseMobile={() => setIsSidebarOpen(false)}
      />

      {/* Main Content */}
      <div className="flex-1 flex flex-col h-full relative bg-white w-full">
        {/* Navbar */}
        <header className="h-16 md:h-20 border-b border-slate-100 flex items-center justify-between px-4 md:px-6 bg-white/90 backdrop-blur-md z-30 shrink-0 sticky top-0">
          <div className="flex items-center gap-3 w-full">
            <button 
              onClick={() => setIsSidebarOpen(true)}
              className="p-2 -ml-2 text-slate-600 active:bg-slate-100 rounded-lg md:hidden transition-colors"
              aria-label="Abrir menú"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Mobile Title */}
            <div className="flex items-center gap-2 md:hidden flex-1 min-w-0">
              <img src="/logo-cem.png" alt="Logo" className="h-14 w-auto shrink-0 object-contain" />
              <h2 className="font-bold text-lg text-slate-800 truncate">
                {currentModule.shortTitle}
              </h2>
            </div>

            {/* Desktop Breadcrumb/Title */}
            <div className="hidden md:flex items-center text-sm font-medium text-slate-400 w-full justify-between">
               <div className="flex items-center gap-3">
                 <img src="/logo-cem.png" alt="Logo" className="h-14 w-auto object-contain" />
                 <span className="uppercase tracking-wider text-xs font-bold">QuímicaPro</span>
                 <span className="mx-1">/</span>
                 <span className="text-slate-800">{currentModule.shortTitle}</span>
               </div>
               <span className="text-xs text-slate-400 font-normal bg-slate-100 px-2 py-1 rounded-full">Modo Estudio IUPAC</span>
            </div>
          </div>
        </header>

        {/* Scrollable Area */}
        <main className="flex-1 overflow-y-auto overflow-x-hidden bg-slate-50/50 relative scroll-smooth">
          <div className="p-3 md:p-8 lg:p-12 pb-24 max-w-7xl mx-auto w-full">
            <ModuleContent module={currentModule} />
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;