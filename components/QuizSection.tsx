import React, { useState } from 'react';
import { QuizQuestion } from '../types';
import { CheckCircle2, XCircle, RefreshCw, Trophy, Info, ArrowRight, HelpCircle } from 'lucide-react';

interface QuizSectionProps {
  questions: QuizQuestion[];
  moduleTitle: string;
}

const QuizSection: React.FC<QuizSectionProps> = ({ questions, moduleTitle }) => {
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  if (!questions || questions.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-16 text-center bg-slate-50 rounded-3xl border-2 border-dashed border-slate-200">
        <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mb-6">
          <HelpCircle className="w-8 h-8 text-slate-400" />
        </div>
        <h3 className="text-xl font-bold text-slate-700 mb-2">Sin Cuestionario</h3>
        <p className="text-slate-500 max-w-sm mx-auto">Esta sección no tiene preguntas de práctica disponibles por el momento.</p>
      </div>
    );
  }

  const currentQuestion = questions[currentQIndex];
  const isCorrect = selectedOption === currentQuestion.correctIndex;
  const progress = ((currentQIndex + (isSubmitted ? 1 : 0)) / questions.length) * 100;

  const handleSubmit = () => {
    setIsSubmitted(true);
    if (selectedOption === currentQuestion.correctIndex) {
      setScore(s => s + 1);
    }
  };

  const handleNext = () => {
    if (currentQIndex < questions.length - 1) {
      setCurrentQIndex(prev => prev + 1);
      setSelectedOption(null);
      setIsSubmitted(false);
    } else {
      setShowResult(true);
    }
  };

  const handleRestart = () => {
    setCurrentQIndex(0);
    setSelectedOption(null);
    setIsSubmitted(false);
    setScore(0);
    setShowResult(false);
  };

  if (showResult) {
    return (
      <div className="bg-white rounded-3xl shadow-xl p-8 md:p-12 text-center max-w-lg mx-auto mt-8 animate-fade-in border border-slate-100">
        <div className="relative inline-block mb-8">
          <div className="absolute inset-0 bg-science-200 rounded-full animate-ping opacity-20"></div>
          <div className="w-24 h-24 bg-gradient-to-tr from-science-100 to-science-50 rounded-full flex items-center justify-center relative z-10">
            <Trophy className="w-12 h-12 text-science-600" />
          </div>
        </div>
        
        <h2 className="text-3xl font-bold text-slate-800 mb-2">¡Evaluación Completada!</h2>
        <p className="text-slate-500 mb-8">Has terminado el quiz de <span className="font-semibold text-science-600">{moduleTitle}</span></p>
        
        <div className="bg-slate-50 rounded-2xl p-8 mb-8 border border-slate-100">
          <span className="block text-xs text-slate-400 uppercase tracking-widest font-bold mb-2">Tu Resultado Final</span>
          <div className="flex items-center justify-center gap-2">
            <span className="text-5xl font-black text-slate-900">{score}</span>
            <span className="text-2xl text-slate-300 font-bold">/</span>
            <span className="text-2xl text-slate-400 font-bold">{questions.length}</span>
          </div>
        </div>

        <button
          onClick={handleRestart}
          className="w-full flex items-center justify-center gap-2 bg-slate-900 hover:bg-slate-800 text-white font-bold py-4 px-8 rounded-xl transition-all hover:shadow-lg transform hover:-translate-y-0.5"
        >
          <RefreshCw className="w-5 h-5" />
          Intentar de nuevo
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Header */}
      <div className="mb-8">
        <div className="flex justify-between items-end mb-3">
          <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
            Pregunta {currentQIndex + 1} de {questions.length}
          </span>
          <span className="text-xs font-bold text-science-600 bg-science-50 px-2 py-1 rounded-md">
            {Math.round(progress)}% Completado
          </span>
        </div>
        <div className="h-2.5 w-full bg-slate-100 rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-science-400 to-science-600 transition-all duration-500 ease-out shadow-[0_0_10px_rgba(14,165,233,0.3)]"
            style={{ width: `${((currentQIndex + (isSubmitted ? 1 : 0)) / questions.length) * 100}%` }}
          />
        </div>
      </div>

      <div className="bg-white rounded-3xl shadow-lg shadow-slate-200/50 border border-white ring-1 ring-slate-100 overflow-hidden">
        <div className="p-8 md:p-10">
          <h3 className="text-2xl font-bold text-slate-800 mb-8 leading-snug">
            {currentQuestion.question}
          </h3>

          <div className="space-y-4">
            {currentQuestion.options.map((option, idx) => {
              let optionClass = "border-slate-200 hover:border-science-400 hover:bg-science-50/50";
              let icon = null;
              
              if (isSubmitted) {
                if (idx === currentQuestion.correctIndex) {
                  optionClass = "border-green-500 bg-green-50 text-green-800 ring-1 ring-green-500";
                  icon = <CheckCircle2 className="w-6 h-6 text-green-600" />;
                } else if (idx === selectedOption) {
                  optionClass = "border-red-300 bg-red-50 text-red-800 ring-1 ring-red-300";
                  icon = <XCircle className="w-6 h-6 text-red-500" />;
                } else {
                  optionClass = "border-slate-100 opacity-40 bg-slate-50";
                }
              } else if (selectedOption === idx) {
                optionClass = "border-science-500 bg-science-50 ring-2 ring-science-500 shadow-md";
              }

              return (
                <button
                  key={idx}
                  onClick={() => !isSubmitted && setSelectedOption(idx)}
                  disabled={isSubmitted}
                  className={`
                    w-full text-left p-5 rounded-2xl border-2 transition-all duration-200 flex justify-between items-center group
                    ${optionClass}
                  `}
                >
                  <span className="font-medium text-lg">{option}</span>
                  {icon}
                  {!isSubmitted && selectedOption === idx && <div className="w-4 h-4 rounded-full bg-science-500" />}
                  {!isSubmitted && selectedOption !== idx && <div className="w-4 h-4 rounded-full border-2 border-slate-300 group-hover:border-science-400" />}
                </button>
              );
            })}
          </div>
        </div>

        {isSubmitted && (
          <div className="bg-slate-50 p-8 border-t border-slate-100 animate-slide-up">
            <div className="flex gap-4 mb-6">
              <div className={`mt-1 p-2 rounded-full h-fit ${isCorrect ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-500'}`}>
                {isCorrect ? <CheckCircle2 className="w-6 h-6" /> : <Info className="w-6 h-6" />}
              </div>
              <div>
                <h4 className={`text-lg font-bold ${isCorrect ? 'text-green-800' : 'text-red-800'}`}>
                  {isCorrect ? '¡Respuesta Correcta!' : 'Respuesta Incorrecta'}
                </h4>
                <p className="text-slate-600 mt-2 leading-relaxed">{currentQuestion.explanation}</p>
              </div>
            </div>
            <div className="flex justify-end">
              <button
                onClick={handleNext}
                className="flex items-center gap-2 bg-slate-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-slate-800 transition-all hover:shadow-lg"
              >
                {currentQIndex === questions.length - 1 ? 'Ver Resultados' : 'Siguiente'}
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {!isSubmitted && (
          <div className="p-6 bg-slate-50/50 border-t border-slate-100 flex justify-end">
            <button
              onClick={handleSubmit}
              disabled={selectedOption === null}
              className={`
                px-10 py-3.5 rounded-xl font-bold text-sm tracking-wide transition-all transform
                ${selectedOption !== null 
                  ? 'bg-gradient-to-r from-science-600 to-science-500 text-white hover:shadow-lg hover:shadow-science-500/30 hover:-translate-y-0.5' 
                  : 'bg-slate-200 text-slate-400 cursor-not-allowed'}
              `}
            >
              COMPROBAR RESPUESTA
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default QuizSection;