import React from 'react';
import { MANUAL_MODULES } from '../constants';
import { FlaskConical, Atom, Hash, ChevronRight } from 'lucide-react';

interface SidebarProps {
  currentModuleId: string;
  onSelectModule: (id: string) => void;
  isOpen: boolean;
  onCloseMobile: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ currentModuleId, onSelectModule, isOpen, onCloseMobile }) => {
  return (
    <div className={`
      fixed inset-y-0 left-0 z-50 w-[80%] max-w-[300px] md:w-72 bg-slate-900 text-slate-100 transform transition-transform duration-300 ease-out shadow-2xl
      flex flex-col h-full
      ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      md:relative md:translate-x-0
    `}>
      {/* Header */}
      <div className="p-5 md:p-6 border-b border-slate-800 flex items-center gap-4 bg-slate-900/50 backdrop-blur-sm shrink-0">
        <div className="bg-gradient-to-br from-science-400 to-science-600 p-2 rounded-xl shadow-lg shadow-science-900/20 ring-1 ring-white/10 shrink-0">
          <FlaskConical className="w-6 h-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">
            Química<span className="text-science-400">Pro</span>
          </h1>
          <p className="text-xs text-slate-400 font-medium">Guía IUPAC</p>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto py-4 px-3 md:py-6 md:px-4 custom-scrollbar min-h-0">
        <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-4 px-2">Módulos</p>
        <ul className="space-y-1 pb-4">
          {MANUAL_MODULES.map((module) => {
            const isActive = currentModuleId === module.id;
            let Icon = Atom;
            if (module.id === 'intro') Icon = Hash;

            return (
              <li key={module.id}>
                <button
                  onClick={() => {
                    onSelectModule(module.id);
                    onCloseMobile();
                  }}
                  className={`
                    group w-full flex items-center justify-between px-4 py-3.5 md:py-3 rounded-xl text-sm font-medium transition-all duration-200
                    ${isActive 
                      ? 'bg-gradient-to-r from-science-600 to-science-500 text-white shadow-lg shadow-science-900/40 translate-x-1' 
                      : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 active:bg-slate-800'}
                  `}
                >
                  <div className="flex items-center gap-3.5 overflow-hidden">
                    <div className={`p-1 rounded-md transition-colors shrink-0 ${isActive ? 'bg-white/20' : 'bg-slate-800 group-hover:bg-slate-700'}`}>
                      <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-300'}`} />
                    </div>
                    <span className="truncate tracking-wide">{module.shortTitle}</span>
                  </div>
                  {isActive && <ChevronRight className="w-4 h-4 opacity-75 shrink-0" />}
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer */}
      <div className="p-4 md:p-6 border-t border-slate-800 bg-slate-900/50 shrink-0">
        <div className="bg-slate-800/50 rounded-lg p-3 text-center border border-slate-700/50">
           <p className="text-xs text-slate-500 font-medium mb-1">Realizado por</p>
           <p className="text-sm text-science-400 font-bold tracking-wide">Roberto Macías</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;