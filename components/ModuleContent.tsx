import React, { useState } from 'react';
import { Module, SectionContent, ChemicalExample } from '../types';
import { ChemicalText } from './ChemicalText';
import { ChemicalStructure } from './ChemicalStructure';
import { FlaskConical, BookOpen, Layers, Info } from 'lucide-react';

interface ModuleContentProps {
  module: Module;
}

const ModuleContent: React.FC<ModuleContentProps> = ({ module }) => {
  const [activeTab, setActiveTab] = useState<'theory' | 'examples'>('theory');

  return (
    <div className="max-w-5xl mx-auto space-y-6 md:space-y-10 animate-fade-in pb-12 w-full">
      {/* Header */}
      <header className="space-y-3 md:space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-science-100 text-science-700 text-[10px] md:text-xs font-bold uppercase tracking-wider">
          <Layers className="w-3 h-3 md:w-3.5 md:h-3.5" />
          Módulo de Estudio
        </div>
        <h2 className="text-3xl md:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight break-words">
          {module.title}
        </h2>
        <p className="text-base md:text-xl text-slate-500 max-w-3xl leading-relaxed font-light">
          {module.description}
        </p>
      </header>

      {/* Tabs - Full width on mobile */}
      <div className="flex p-1 bg-slate-100 rounded-xl w-full md:w-fit">
        <button
          onClick={() => setActiveTab('theory')}
          className={`
            flex-1 md:flex-none flex justify-center items-center gap-2 px-4 md:px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 touch-manipulation
            ${activeTab === 'theory' 
              ? 'bg-white text-science-700 shadow-sm ring-1 ring-black/5' 
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}
          `}
        >
          <BookOpen className="w-4 h-4" />
          Teoría
        </button>
        <button
          onClick={() => setActiveTab('examples')}
          className={`
            flex-1 md:flex-none flex justify-center items-center gap-2 px-4 md:px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-200 touch-manipulation
            ${activeTab === 'examples' 
              ? 'bg-white text-science-700 shadow-sm ring-1 ring-black/5' 
              : 'text-slate-500 hover:text-slate-700 hover:bg-slate-200/50'}
          `}
        >
          <FlaskConical className="w-4 h-4" />
          Ejemplos <span className="hidden sm:inline">({module.examples.length})</span>
        </button>
      </div>

      <div className="min-h-[400px]">
        {activeTab === 'theory' ? (
          <div className="space-y-8 md:space-y-10 animate-slide-up">
            {module.sections.map((section, idx) => (
              <SectionRenderer key={idx} section={section} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 animate-slide-up">
            {module.examples.length > 0 ? (
              module.examples.map((ex, idx) => (
                <ExampleCard key={idx} example={ex} />
              ))
            ) : (
              <div className="col-span-1 md:col-span-2 flex flex-col items-center justify-center py-20 bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200 text-center px-4">
                <FlaskConical className="w-12 h-12 text-slate-300 mb-4" />
                <p className="text-lg font-medium text-slate-600">No hay ejemplos visuales.</p>
                <p className="text-slate-400">Explora la teoría para comprender mejor.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

const SectionRenderer: React.FC<{ section: SectionContent }> = ({ section }) => {
  switch (section.type) {
    case 'text':
      return (
        <div className="prose prose-slate prose-lg max-w-none text-slate-600 prose-headings:font-bold prose-headings:text-slate-800 prose-headings:mb-3 prose-p:leading-relaxed text-sm md:text-base">
          {section.title && (
            <h3 className="flex items-center gap-3 text-xl md:text-2xl font-bold border-b border-slate-100 pb-2">
              {section.title}
            </h3>
          )}
          <p>{section.content as string}</p>
        </div>
      );
    case 'list':
      return (
        <div className="bg-gradient-to-br from-white to-science-50/50 rounded-2xl p-5 md:p-8 border border-science-100 shadow-sm">
          {section.title && (
            <div className="flex items-center gap-3 mb-4 md:mb-6 text-science-700">
              <div className="p-1.5 md:p-2 bg-science-100 rounded-lg">
                <Info className="w-4 h-4 md:w-5 md:h-5" />
              </div>
              <h3 className="text-base md:text-lg font-bold leading-tight">{section.title}</h3>
            </div>
          )}
          <ul className="space-y-3 md:space-y-4">
            {(section.content as string[]).map((item, i) => (
              <li key={i} className="flex gap-3 md:gap-4 text-slate-700 items-start group text-sm md:text-base">
                <span className="flex items-center justify-center w-5 h-5 md:w-6 md:h-6 rounded-full bg-science-200 text-science-700 text-[10px] md:text-xs font-bold mt-0.5 flex-shrink-0 group-hover:bg-science-500 group-hover:text-white transition-colors">
                  {i + 1}
                </span>
                <span className="leading-relaxed">{item}</span>
              </li>
            ))}
          </ul>
        </div>
      );
    case 'table':
      const rows = section.content as { [key: string]: string }[];
      return (
        <div className="rounded-2xl border border-slate-200 overflow-hidden shadow-sm bg-white">
          {section.title && (
            <div className="bg-slate-50 px-4 py-3 md:px-6 md:py-4 border-b border-slate-200">
              <h4 className="font-bold text-slate-700 text-sm md:text-base">{section.title}</h4>
            </div>
          )}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-slate-200">
              <thead className="bg-slate-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap"># C</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Prefijo</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-100/50 whitespace-nowrap"># C</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider bg-slate-100/50 whitespace-nowrap">Prefijo</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap"># C</th>
                  <th className="px-4 py-3 text-left text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">Prefijo</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-slate-100">
                {rows.map((row, i) => (
                  <tr key={i} className="hover:bg-science-50/50 transition-colors">
                    <td className="px-4 py-2 text-xs md:text-sm text-slate-500 font-mono font-medium">{row.c}</td>
                    <td className="px-4 py-2 text-xs md:text-sm text-science-600 font-bold">{row.pre}</td>
                    <td className="px-4 py-2 text-xs md:text-sm text-slate-500 font-mono font-medium bg-slate-50/50">{row.c2}</td>
                    <td className="px-4 py-2 text-xs md:text-sm text-science-600 font-bold bg-slate-50/50">{row.pre2}</td>
                    <td className="px-4 py-2 text-xs md:text-sm text-slate-500 font-mono font-medium">{row.c3}</td>
                    <td className="px-4 py-2 text-xs md:text-sm text-science-600 font-bold">{row.pre3}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      );
    default:
      return null;
  }
};

const ExampleCard: React.FC<{ example: ChemicalExample }> = ({ example }) => {
  return (
    <div className="group relative bg-white rounded-2xl border border-slate-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden flex flex-col">
      <div className="absolute top-0 left-0 w-1.5 h-full bg-gradient-to-b from-science-400 to-science-600"></div>
      
      <div className="p-5 md:p-6 flex-1 flex flex-col">
        <div className="flex justify-between items-start mb-4">
          <h4 className="text-lg font-bold text-slate-800 group-hover:text-science-600 transition-colors leading-tight">{example.name}</h4>
          <div className="p-1.5 md:p-2 bg-slate-50 rounded-lg group-hover:bg-science-50 transition-colors shrink-0 ml-2">
            <FlaskConical className="w-4 h-4 md:w-5 md:h-5 text-slate-400 group-hover:text-science-500 transition-colors" />
          </div>
        </div>

        <div className="space-y-4 flex-1">
          <div className="bg-slate-50 rounded-xl p-3 md:p-4 border border-slate-100 group-hover:border-science-100 transition-colors">
            <div className="flex items-center justify-between mb-3">
              <span className="text-[10px] font-bold uppercase text-slate-400 tracking-wider">Fórmula</span>
              <ChemicalText text={example.formula} className="text-sm font-mono font-bold text-science-700 bg-white px-2 py-0.5 rounded shadow-sm border border-slate-100" />
            </div>
            
            <div className="pt-2 border-t border-slate-200/50 mt-2">
               {example.smiles ? (
                 <ChemicalStructure smiles={example.smiles} />
               ) : (
                 <div className="text-center py-4 bg-white rounded-lg border border-slate-100 overflow-x-auto">
                    <ChemicalText text={example.structure || ''} className="text-base md:text-lg font-bold text-slate-700 tracking-wide" />
                 </div>
               )}
            </div>
          </div>
          
          <p className="text-sm text-slate-600 leading-relaxed pl-1">
            {example.description}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ModuleContent;