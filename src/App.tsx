import { useEffect, useMemo, useState } from 'react';

type ModuleType =
  | 'vsepr'
  | 'lewis'
  | 'enlace'
  | 'nomenclatura'
  | 'estequiometria'
  | 'concentracion';

type BaseQuestion = { id: string; prompt: string };

type VseprQ = BaseQuestion & {
  regions: number;
  lonePairs: number;
  answer: string;
};

type LewisQ = BaseQuestion & {
  formula: string;
  answerLinks: number;
  answerLonePairs: number;
};

type EnlaceQ = BaseQuestion & {
  deltaEN: number;
  answer: string;
};

type NomenQ = BaseQuestion & {
  formula: string;
  accepted: string[];
};

type EsteqQ = BaseQuestion & {
  reaction: string;
  knownMoles: number;
  knownSubstance: string;
  askedSubstance: string;
  ratioKnown: number;
  ratioAsked: number;
  answer: number;
};

type ConcQ = BaseQuestion & {
  moles: number;
  liters: number;
  answer: number;
};

type QuestionMap = {
  vsepr: VseprQ;
  lewis: LewisQ;
  enlace: EnlaceQ;
  nomenclatura: NomenQ;
  estequiometria: EsteqQ;
  concentracion: ConcQ;
};

type GameModule<T extends ModuleType> = {
  moduleType: T;
  question: QuestionMap[T];
  solved: boolean;
  attempts: number;
  userInput: Record<string, string>;
};

const moduleLabels: Record<ModuleType, string> = {
  vsepr: 'Geometría molecular (VSEPR)',
  lewis: 'Estructura de Lewis',
  enlace: 'Tipo de enlace',
  nomenclatura: 'Nomenclatura inorgánica',
  estequiometria: 'Estequiometría',
  concentracion: 'Concentración de soluciones'
};

const vseprBank: VseprQ[] = [
  [2, 0, 'Lineal'], [3, 0, 'Trigonal plana'], [4, 0, 'Tetraédrica'], [4, 1, 'Trigonal piramidal'], [4, 2, 'Angular'],
  [5, 0, 'Bipiramidal trigonal'], [5, 1, 'Balancín'], [5, 2, 'En T'], [5, 3, 'Lineal'], [6, 0, 'Octaédrica'],
  [6, 1, 'Pirámide cuadrada'], [6, 2, 'Cuadrada planar'], [3, 1, 'Angular'], [2, 1, 'Lineal'], [4, 3, 'Lineal'],
  [3, 2, 'Lineal'], [6, 3, 'En T'], [6, 4, 'Lineal'], [5, 4, 'Lineal'], [2, 0, 'Lineal']
].map((entry, i) => ({
  id: `vsepr-${i + 1}`,
  regions: entry[0],
  lonePairs: entry[1],
  answer: entry[2],
  prompt: `Átomo central con ${entry[0]} regiones electrónicas y ${entry[1]} par(es) libre(s).`
}));

const lewisBank: LewisQ[] = [
  ['CO2', 2, 0], ['NH3', 3, 1], ['H2O', 2, 2], ['SO2', 2, 1], ['BF3', 3, 0],
  ['CH4', 4, 0], ['PCl3', 3, 1], ['SO3', 3, 0], ['HCN', 2, 0], ['NO2-', 2, 1],
  ['CO3^2-', 3, 0], ['NH4+', 4, 0], ['ClO2-', 2, 2], ['O3', 2, 1], ['XeF2', 2, 3],
  ['XeF4', 4, 2], ['BeCl2', 2, 0], ['AlCl3', 3, 0], ['H2S', 2, 2], ['PF5', 5, 0]
].map((entry, i) => ({
  id: `lewis-${i + 1}`,
  formula: entry[0],
  answerLinks: entry[1],
  answerLonePairs: entry[2],
  prompt: `Para ${entry[0]} indica enlaces alrededor del átomo central y pares libres del átomo central.`
}));

const enlaceBank: EnlaceQ[] = [0.1, 0.2, 0.3, 0.4, 0.49, 0.5, 0.7, 0.9, 1.1, 1.3, 1.5, 1.7, 1.71, 1.8, 2.0, 2.2, 2.5, 2.8, 3.0, 3.2]
  .map((delta, i) => ({
    id: `enlace-${i + 1}`,
    deltaEN: delta,
    prompt: `Clasifica un enlace con ΔEN = ${delta.toFixed(2)}.`,
    answer: delta < 0.5 ? 'Covalente no polar' : delta <= 1.7 ? 'Covalente polar' : 'Iónico'
  }));

const normalize = (s: string) => s.toLowerCase().normalize('NFD').replace(/\p{Diacritic}/gu, '').replace(/\s+/g, ' ').trim();

const nomenclaturaBank: NomenQ[] = [
  ['FeCl3', ['cloruro de hierro (iii)', 'cloruro ferrico']],
  ['CO2', ['dioxido de carbono', 'oxido de carbono (iv)']],
  ['Na2O', ['oxido de sodio']],
  ['SO3', ['trioxido de azufre', 'oxido de azufre (vi)']],
  ['Cu2O', ['oxido de cobre (i)', 'oxido cuproso']],
  ['CuO', ['oxido de cobre (ii)', 'oxido cuprico']],
  ['FeO', ['oxido de hierro (ii)', 'oxido ferroso']],
  ['Fe2O3', ['oxido de hierro (iii)', 'oxido ferrico']],
  ['NaCl', ['cloruro de sodio']],
  ['KBr', ['bromuro de potasio']],
  ['CaO', ['oxido de calcio']],
  ['Al2O3', ['oxido de aluminio']],
  ['N2O5', ['pentaoxido de dinitrogeno', 'oxido de nitrogeno (v)']],
  ['PCl3', ['tricloruro de fosforo', 'cloruro de fosforo (iii)']],
  ['PCl5', ['pentacloruro de fosforo', 'cloruro de fosforo (v)']],
  ['MgCl2', ['cloruro de magnesio']],
  ['AgNO3', ['nitrato de plata']],
  ['Na2SO4', ['sulfato de sodio']],
  ['HCl', ['acido clorhidrico', 'cloruro de hidrogeno']],
  ['H2SO4', ['acido sulfurico']]
].map((item, i) => ({
  id: `nom-${i + 1}`,
  formula: item[0],
  accepted: item[1],
  prompt: `Nombra correctamente el compuesto ${item[0]}.`
}));

const esteqBank: EsteqQ[] = [
  ['2H2 + O2 -> 2H2O', 4, 'H2', 'H2O', 2, 2],
  ['N2 + 3H2 -> 2NH3', 6, 'H2', 'NH3', 3, 2],
  ['2Na + Cl2 -> 2NaCl', 10, 'Na', 'NaCl', 2, 2],
  ['2KClO3 -> 2KCl + 3O2', 4, 'KClO3', 'O2', 2, 3],
  ['CaCO3 -> CaO + CO2', 5, 'CaCO3', 'CO2', 1, 1],
  ['2Al + 3Cl2 -> 2AlCl3', 3, 'Cl2', 'AlCl3', 3, 2],
  ['CH4 + 2O2 -> CO2 + 2H2O', 6, 'O2', 'H2O', 2, 2],
  ['2SO2 + O2 -> 2SO3', 7, 'SO2', 'SO3', 2, 2],
  ['2Mg + O2 -> 2MgO', 4, 'Mg', 'MgO', 2, 2],
  ['2H2O2 -> 2H2O + O2', 6, 'H2O2', 'O2', 2, 1],
  ['4Fe + 3O2 -> 2Fe2O3', 8, 'Fe', 'Fe2O3', 4, 2],
  ['2NO + O2 -> 2NO2', 5, 'NO', 'NO2', 2, 2],
  ['C3H8 + 5O2 -> 3CO2 + 4H2O', 10, 'O2', 'CO2', 5, 3],
  ['2K + 2H2O -> 2KOH + H2', 4, 'K', 'H2', 2, 1],
  ['Zn + 2HCl -> ZnCl2 + H2', 6, 'HCl', 'H2', 2, 1],
  ['2NH3 + H2SO4 -> (NH4)2SO4', 8, 'NH3', '(NH4)2SO4', 2, 1],
  ['Ca(OH)2 + 2HCl -> CaCl2 + 2H2O', 3, 'Ca(OH)2', 'H2O', 1, 2],
  ['2NaOH + H2SO4 -> Na2SO4 + 2H2O', 6, 'NaOH', 'H2O', 2, 2],
  ['H2 + Cl2 -> 2HCl', 9, 'H2', 'HCl', 1, 2],
  ['2CO + O2 -> 2CO2', 5, 'CO', 'CO2', 2, 2]
].map((e, i) => ({
  id: `est-${i + 1}`,
  reaction: e[0],
  knownMoles: e[1],
  knownSubstance: e[2],
  askedSubstance: e[3],
  ratioKnown: e[4],
  ratioAsked: e[5],
  answer: Number(((e[1] / e[4]) * e[5]).toFixed(2)),
  prompt: `${e[0]} | Si tienes ${e[1]} mol de ${e[2]}, ¿cuántos mol de ${e[3]} se forman?`
}));

const concentracionBank: ConcQ[] = [
  [0.5, 1], [1, 2], [1.5, 0.5], [2, 4], [0.75, 0.25],
  [3, 1.5], [0.2, 0.4], [2.2, 1.1], [4, 2], [1.8, 0.6],
  [2.5, 5], [0.9, 0.3], [1.2, 0.8], [3.6, 1.2], [2.7, 0.9],
  [1.4, 0.7], [0.6, 0.2], [5, 2], [2.1, 0.7], [3.3, 1.1]
].map((p, i) => ({
  id: `con-${i + 1}`,
  moles: p[0],
  liters: p[1],
  answer: Number((p[0] / p[1]).toFixed(2)),
  prompt: `Calcula molaridad con ${p[0]} mol de soluto en ${p[1]} L de solución.`
}));

function pickWithoutRepeat<T>(bank: T[], count: number): T[] {
  const copy = [...bank];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy.slice(0, count);
}

function App() {
  const [timeLeft, setTimeLeft] = useState(10 * 60);
  const [strikes, setStrikes] = useState(0);
  const [gameState, setGameState] = useState<'playing' | 'won' | 'lost'>('playing');
  const [shake, setShake] = useState(false);
  const [results, setResults] = useState({ hits: 0, validated: 0 });

  const [modules, setModules] = useState<GameModule<ModuleType>[]>(() => {
    const selected = ['vsepr', 'lewis', 'enlace', 'nomenclatura', 'estequiometria', 'concentracion'] as ModuleType[];
    const activeCount = 6;
    return pickWithoutRepeat(selected, activeCount).map((moduleType) => {
      if (moduleType === 'vsepr') return { moduleType, question: pickWithoutRepeat(vseprBank, 1)[0], solved: false, attempts: 0, userInput: {} };
      if (moduleType === 'lewis') return { moduleType, question: pickWithoutRepeat(lewisBank, 1)[0], solved: false, attempts: 0, userInput: {} };
      if (moduleType === 'enlace') return { moduleType, question: pickWithoutRepeat(enlaceBank, 1)[0], solved: false, attempts: 0, userInput: {} };
      if (moduleType === 'nomenclatura') return { moduleType, question: pickWithoutRepeat(nomenclaturaBank, 1)[0], solved: false, attempts: 0, userInput: {} };
      if (moduleType === 'estequiometria') return { moduleType, question: pickWithoutRepeat(esteqBank, 1)[0], solved: false, attempts: 0, userInput: {} };
      return { moduleType, question: pickWithoutRepeat(concentracionBank, 1)[0], solved: false, attempts: 0, userInput: {} };
    });
  });

  const solvedCount = useMemo(() => modules.filter((m) => m.solved).length, [modules]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    if (solvedCount === modules.length) {
      setGameState('won');
      return;
    }
    const t = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setGameState('lost');
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(t);
  }, [gameState, solvedCount, modules.length]);

  useEffect(() => {
    if (gameState !== 'playing') return;
    const ctx = new AudioContext();
    const id = setInterval(() => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.frequency.value = 900;
      gain.gain.value = 0.02;
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.06);
    }, 1000);
    return () => {
      clearInterval(id);
      void ctx.close();
    };
  }, [gameState]);

  const registerStrike = () => {
    setShake(true);
    setTimeout(() => setShake(false), 400);
    const audio = new AudioContext();
    const osc = audio.createOscillator();
    const gain = audio.createGain();
    osc.type = 'sawtooth';
    osc.frequency.value = 180;
    gain.gain.value = 0.08;
    osc.connect(gain);
    gain.connect(audio.destination);
    osc.start();
    osc.stop(audio.currentTime + 0.25);

    setStrikes((prev) => {
      const next = prev + 1;
      if (next >= 3) setGameState('lost');
      return next;
    });
  };

  const updateInput = (moduleIndex: number, key: string, value: string) => {
    setModules((prev) => prev.map((mod, idx) => idx === moduleIndex ? { ...mod, userInput: { ...mod.userInput, [key]: value } } : mod));
  };

  const validateModule = (idx: number) => {
    if (gameState !== 'playing') return;
    const mod = modules[idx];
    if (mod.solved) return;
    let ok = false;

    if (mod.moduleType === 'vsepr') {
      ok = normalize(mod.userInput.geometry ?? '') === normalize(mod.question.answer);
    } else if (mod.moduleType === 'lewis') {
      const links = Number(mod.userInput.links);
      const lonePairs = Number(mod.userInput.lonePairs);
      ok = links === mod.question.answerLinks && lonePairs === mod.question.answerLonePairs;
    } else if (mod.moduleType === 'enlace') {
      ok = normalize(mod.userInput.type ?? '') === normalize(mod.question.answer);
    } else if (mod.moduleType === 'nomenclatura') {
      const attempt = normalize(mod.userInput.name ?? '');
      ok = mod.question.accepted.some((v) => attempt === normalize(v));
    } else if (mod.moduleType === 'estequiometria') {
      const val = Number(mod.userInput.moles);
      ok = Math.abs(val - mod.question.answer) < 0.01;
    } else if (mod.moduleType === 'concentracion') {
      const val = Number(mod.userInput.molarity);
      ok = Math.abs(val - mod.question.answer) < 0.01;
    }

    setResults((prev) => ({ hits: prev.hits + (ok ? 1 : 0), validated: prev.validated + 1 }));

    if (ok) {
      setModules((prev) => prev.map((m, index) => index === idx ? { ...m, solved: true, attempts: m.attempts + 1 } : m));
      return;
    }

    setModules((prev) => prev.map((m, index) => index === idx ? { ...m, attempts: m.attempts + 1 } : m));
    registerStrike();
  };

  const resetGame = () => window.location.reload();

  return (
    <div className={`app ${shake ? 'shake' : ''}`}>
      <header>
        <h1>💣 Desactiva la Bomba Química — BachUAA</h1>
        <p>Roles: Técnico (pantalla) + Experto (manual). Manual en <a href="/manual-experto.html" target="_blank" rel="noreferrer">segunda vista imprimible</a>.</p>
      </header>

      <section className="hud">
        <div className="timer">⏱️ {Math.floor(timeLeft / 60).toString().padStart(2, '0')}:{(timeLeft % 60).toString().padStart(2, '0')}</div>
        <div className="strikes">Errores: {'⚠️'.repeat(strikes)}{'⬜'.repeat(Math.max(0, 3 - strikes))}</div>
        <div className="progress">Módulos resueltos: {solvedCount}/{modules.length}</div>
      </section>

      <main className="grid">
        {modules.map((mod, idx) => (
          <article key={mod.question.id} className={`card ${mod.solved ? 'solved' : ''}`}>
            <h2>{moduleLabels[mod.moduleType]}</h2>
            <p>{mod.question.prompt}</p>

            {mod.moduleType === 'vsepr' && (
              <>
                <label>Geometría</label>
                <select value={mod.userInput.geometry ?? ''} onChange={(e) => updateInput(idx, 'geometry', e.target.value)}>
                  <option value="">Selecciona...</option>
                  {['Lineal', 'Trigonal plana', 'Tetraédrica', 'Trigonal piramidal', 'Angular', 'Bipiramidal trigonal', 'Octaédrica', 'Balancín', 'En T', 'Pirámide cuadrada', 'Cuadrada planar'].map((g) => <option key={g} value={g}>{g}</option>)}
                </select>
              </>
            )}

            {mod.moduleType === 'lewis' && (
              <div className="row">
                <div>
                  <label># enlaces</label>
                  <input type="number" onChange={(e) => updateInput(idx, 'links', e.target.value)} />
                </div>
                <div>
                  <label># pares libres centrales</label>
                  <input type="number" onChange={(e) => updateInput(idx, 'lonePairs', e.target.value)} />
                </div>
              </div>
            )}

            {mod.moduleType === 'enlace' && (
              <>
                <label>Tipo de enlace</label>
                <select value={mod.userInput.type ?? ''} onChange={(e) => updateInput(idx, 'type', e.target.value)}>
                  <option value="">Selecciona...</option>
                  <option>Covalente no polar</option>
                  <option>Covalente polar</option>
                  <option>Iónico</option>
                </select>
              </>
            )}

            {mod.moduleType === 'nomenclatura' && (
              <>
                <label>Nombre del compuesto</label>
                <input type="text" placeholder="Ej. óxido de hierro (III)" onChange={(e) => updateInput(idx, 'name', e.target.value)} />
              </>
            )}

            {mod.moduleType === 'estequiometria' && (
              <>
                <label>Respuesta en mol</label>
                <input type="number" step="0.01" onChange={(e) => updateInput(idx, 'moles', e.target.value)} />
              </>
            )}

            {mod.moduleType === 'concentracion' && (
              <>
                <label>Molaridad (mol/L)</label>
                <input type="number" step="0.01" onChange={(e) => updateInput(idx, 'molarity', e.target.value)} />
              </>
            )}

            <button disabled={mod.solved || gameState !== 'playing'} onClick={() => validateModule(idx)}>
              {mod.solved ? '✅ Resuelto' : 'Validar'}
            </button>
          </article>
        ))}
      </main>

      {gameState !== 'playing' && (
        <section className={`overlay ${gameState === 'lost' ? 'loss' : 'win'}`}>
          <h2>{gameState === 'won' ? '🎉 ¡BOMBA DESACTIVADA!' : '💥 EXPLOSIÓN'}</h2>
          <p>Tiempo restante: {Math.floor(timeLeft / 60)}m {timeLeft % 60}s</p>
          <p>Errores: {strikes}/3</p>
          <p>Aciertos: {results.hits} / Validaciones: {results.validated}</p>
          <button onClick={resetGame}>Jugar otra partida</button>
        </section>
      )}
    </div>
  );
}

export default App;
