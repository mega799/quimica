// Tutor local de química orgánica — sin dependencias externas ni API

interface ExerciseState {
  options: string[];
  correctIndex: number;
  explanation: string;
}

let pendingExercise: ExerciseState | null = null;

// ============================================================
// BANCO DE EJERCICIOS (extraído de los módulos)
// ============================================================
const QUIZ_BANK = [
  { question: '¿Qué prefijo se usa para una cadena principal de 4 carbonos?', options: ['Prop-', 'But-', 'Tetra-', 'Cuat-'], correctIndex: 1, explanation: 'El prefijo IUPAC para 4 carbonos es "But-".' },
  { question: '¿Cuántos enlaces forma el carbono en compuestos orgánicos neutros?', options: ['2', '3', '4', '6'], correctIndex: 2, explanation: 'El carbono es tetravalente en compuestos orgánicos estables.' },
  { question: '¿Qué hibridación corresponde a un enlace triple?', options: ['sp³', 'sp²', 'sp', 'spd'], correctIndex: 2, explanation: 'La hibridación sp genera geometría lineal, característica de los triples enlaces.' },
  { question: '¿Cuál es el principal uso industrial de los alcanos?', options: ['Farmacéuticos', 'Combustibles', 'Colorantes', 'Explosivos'], correctIndex: 1, explanation: 'Debido a su alta entalpía de combustión, se usan como fuentes de energía.' },
  { question: '¿Cómo se llama el alcano de 3 carbonos?', options: ['Etano', 'Propano', 'Butano', 'Metano'], correctIndex: 1, explanation: 'Prefijo Prop- para 3 carbonos → Propano.' },
  { question: '¿Qué propiedad física caracteriza a los alcanos?', options: ['Solubles en agua', 'Conductores eléctricos', 'Insolubles en agua', 'Muy densos'], correctIndex: 2, explanation: 'Son apolares y no se mezclan con el agua.' },
  { question: '¿Qué tipo de reacción es típica de los alquenos?', options: ['Sustitución', 'Adición', 'Neutralización', 'Precipitación'], correctIndex: 1, explanation: 'Los reactivos se "añaden" al doble enlace rompiendo el enlace pi.' },
  { question: '¿Qué plástico se obtiene polimerizando el eteno?', options: ['PVC', 'Teflón', 'Polietileno', 'Poliestireno'], correctIndex: 2, explanation: 'El polietileno es el polímero del etileno (eteno).' },
  { question: '¿Cuál es el uso principal del etino?', options: ['Anestésico', 'Combustible de autos', 'Soldadura oxiacetilénica', 'Fertilizante'], correctIndex: 2, explanation: 'Su combustión con oxígeno puro genera temperaturas extremas para fundir metales.' },
  { question: '¿Cuántos enlaces pi tiene un triple enlace?', options: ['0', '1', '2', '3'], correctIndex: 2, explanation: 'El triple enlace consiste en 1 enlace sigma y 2 enlaces pi.' },
  { question: '¿Qué cicloalcano es el más utilizado para sintetizar Nylon?', options: ['Ciclopropano', 'Ciclobutano', 'Ciclopentano', 'Ciclohexano'], correctIndex: 3, explanation: 'El ciclohexano se oxida para producir los precursores del Nylon.' },
  { question: '¿Por qué el ciclopropano es inestable?', options: ['Alta masa molecular', 'Tensión angular extrema (60°)', 'Muchos hidrógenos', 'Es aromático'], correctIndex: 1, explanation: 'Los ángulos de enlace forzados a 60° crean mucha tensión en la molécula.' },
  { question: '¿Qué alcohol es seguro para consumo humano en moderación?', options: ['Metanol', 'Etanol', 'Isopropanol', 'Butanol'], correctIndex: 1, explanation: 'El etanol es el único alcohol metabolizable de forma relativamente segura en bebidas.' },
  { question: '¿Por qué los alcoholes son solubles en agua?', options: ['Por ser iónicos', 'Forman puentes de hidrógeno con el agua', 'Son apolares', 'Tienen baja densidad'], correctIndex: 1, explanation: 'El grupo -OH es muy afín al agua mediante puentes de hidrógeno.' },
  { question: '¿Qué compuesto se usa para conservar cadáveres y tejidos?', options: ['Etanol', 'Metanal (Formol)', 'Acetona', 'Vinagre'], correctIndex: 1, explanation: 'El formaldehído desnaturaliza proteínas evitando la descomposición.' },
  { question: 'La oxidación de un aldehído produce:', options: ['Un alcohol', 'Una cetona', 'Un ácido carboxílico', 'Un éster'], correctIndex: 2, explanation: 'El grupo -CHO gana un oxígeno convirtiéndose en -COOH.' },
  { question: '¿Cuál es la diferencia estructural entre aldehído y cetona?', options: ['El número de oxígenos', 'La posición del grupo carbonilo', 'El tipo de enlace doble', 'La solubilidad'], correctIndex: 1, explanation: 'Aldehído: Carbonilo terminal. Cetona: Carbonilo interno.' },
  { question: 'Disolvente común quitaesmalte:', options: ['Etanol', 'Acetona', 'Formol', 'Benceno'], correctIndex: 1, explanation: 'La acetona (propanona) es el disolvente estándar para esmaltes.' },
  { question: '¿Por qué los éteres se usan como disolventes de reacción?', options: ['Son muy reactivos', 'Son ácidos fuertes', 'Son químicamente inertes', 'Son sólidos'], correctIndex: 2, explanation: 'Su falta de reactividad permite disolver reactivos sin interferir en la reacción química.' },
  { question: 'Peligro principal del dietil éter en laboratorio:', options: ['Toxicidad extrema', 'Inflamabilidad y formación de peróxidos', 'Corrosividad', 'Radioactividad'], correctIndex: 1, explanation: 'Es extremadamente inflamable y puede formar peróxidos explosivos al almacenarse.' },
  { question: '¿Por qué los ácidos carboxílicos hierven a temperaturas tan altas?', options: ['Son iónicos', 'Forman dímeros estables por puentes de hidrógeno', 'Tienen alto peso molecular', 'Son sólidos'], correctIndex: 1, explanation: 'Dos moléculas se unen fuertemente formando un par (dímero).' },
  { question: 'Componente ácido del vinagre:', options: ['Fórmico', 'Cítrico', 'Acético', 'Sulfúrico'], correctIndex: 2, explanation: 'El vinagre es una solución al 4-8% de ácido acético (etanoico).' },
  { question: '¿Qué se obtiene al calentar un ácido con un alcohol?', options: ['Un éter', 'Un éster y agua', 'Una cetona', 'Un alqueno'], correctIndex: 1, explanation: 'Es la reacción de esterificación de Fischer.' },
  { question: '¿Qué es la saponificación?', options: ['Hacer jabón a partir de ésteres (grasas)', 'Hacer perfume', 'Quemar un éster', 'Congelar aceite'], correctIndex: 0, explanation: 'Hidrólisis básica de grasas (ésteres) para dar sales de ácidos grasos (jabón).' },
  { question: '¿Qué tendencia siguen los puntos de ebullición de los halogenuros?', options: ['F > Cl > Br', 'I > Br > Cl > F', 'Todos son iguales', 'F > I'], correctIndex: 1, explanation: 'A mayor masa y polarizabilidad del halógeno (I), mayor punto de ebullición.' },
  { question: 'Nombre IUPAC de CHCl₃:', options: ['Cloroformo', 'Triclorometano', 'Cloruro de metilo', 'Carbono clorado'], correctIndex: 1, explanation: 'Tiene 3 cloros en un carbono (metano): Triclorometano.' },
  { question: '¿Qué carácter químico tienen las aminas?', options: ['Ácido fuerte', 'Ácido débil', 'Base débil', 'Neutro'], correctIndex: 2, explanation: 'El par de electrones libres en el nitrógeno les confiere basicidad.' },
  { question: 'Compuesto responsable del olor a pescado:', options: ['Etanol', 'Ácido acético', 'Aminas (trimetilamina)', 'Ésteres'], correctIndex: 2, explanation: 'Las aminas volátiles tienen olores muy fuertes y desagradables.' },
  { question: '¿Qué fibra sintética muy resistente es una poliamida?', options: ['Poliéster', 'Algodón', 'Kevlar', 'PVC'], correctIndex: 2, explanation: 'El Kevlar es una poliamida aromática usada en blindajes.' },
  { question: '¿Las amidas son básicas como las aminas?', options: ['Sí, más básicas', 'No, son neutras', 'Son muy ácidas', 'Depende del disolvente'], correctIndex: 1, explanation: 'El grupo carbonilo retira densidad electrónica del nitrógeno, anulando su basicidad.' },
  { question: '¿Cuál es la reacción característica del benceno?', options: ['Adición', 'Polimerización', 'Sustitución Electrofílica', 'Eliminación'], correctIndex: 2, explanation: 'Mantiene el anillo intacto sustituyendo hidrógenos, preservando la estabilidad aromática.' },
  { question: '¿Qué significa la posición "meta" en un benceno disustituido?', options: ['Posiciones 1,2', 'Posiciones 1,3', 'Posiciones 1,4', 'Posición solitaria'], correctIndex: 1, explanation: 'Orto (1,2), Meta (1,3) y Para (1,4) describen la posición relativa de dos sustituyentes.' },
  { question: 'Nombre común de Metilbenceno:', options: ['Xileno', 'Tolueno', 'Estireno', 'Cumeno'], correctIndex: 1, explanation: 'Tolueno es el nombre industrial estándar.' },

  // ── PREFIJOS / INTRODUCCIÓN ─────────────────────────────────────────────
  { question: '¿Qué prefijo corresponde a una cadena de 7 carbonos?', options: ['Hex-', 'Hept-', 'Oct-', 'Sep-'], correctIndex: 1, explanation: 'Hept- corresponde a 7 carbonos (de "hepta-" en griego).' },
  { question: '¿Cuál es la fórmula general de los alcanos?', options: ['CₙH₂ₙ', 'CₙH₂ₙ₊₂', 'CₙH₂ₙ₋₂', 'CₙHₙ'], correctIndex: 1, explanation: 'Los alcanos tienen la fórmula CₙH₂ₙ₊₂, el máximo de hidrógenos posibles para n carbonos enlazados simplemente.' },

  // ── ALCANOS ─────────────────────────────────────────────────────────────
  { question: '¿Cómo se llama el alcano lineal de 8 carbonos?', options: ['Heptano', 'Octano', 'Nonano', 'Hexano'], correctIndex: 1, explanation: 'Oct- corresponde a 8 carbonos → Octano.' },
  { question: '¿Cuál es el nombre IUPAC de CH₃-CH(CH₃)-CH(CH₃)-CH₃?', options: ['2,3-Dimetilbutano', '2-Metilpentano', '3,4-Dimetilbutano', '2,3-Dimetilpropano'], correctIndex: 0, explanation: 'Cadena principal de 4 carbonos (butano) con grupos metilo en C2 y C3 → 2,3-Dimetilbutano.' },

  // ── ALQUENOS ────────────────────────────────────────────────────────────
  { question: '¿Qué sufijo indica dos dobles enlaces en la cadena principal?', options: ['-dieno', '-bieno', '-doble eno', '-deno'], correctIndex: 0, explanation: 'El multiplicador "di-" + "eno" forman "-dieno" para indicar dos dobles enlaces.' },
  { question: '¿Cómo se llama CH₂=CH-CH=CH₂ (monómero del caucho sintético)?', options: ['Buta-1,2-dieno', 'Buta-1,3-dieno', 'Butadieno-2,4', 'Prop-1-eno'], correctIndex: 1, explanation: '4 carbonos con dobles enlaces en posiciones 1 y 3 → Buta-1,3-dieno. Es la base del caucho sintético (SBR).' },
  { question: '¿Cómo se llama CH₂=CH-CH₂-CH=CH₂ (penta-dieno con dobles en 1 y 4)?', options: ['Penta-1,3-dieno', 'Penta-1,4-dieno', 'Penta-2,4-dieno', 'Pent-1-eno'], correctIndex: 1, explanation: 'Los dobles enlaces están en C1 y C4 de la cadena de 5 carbonos → Penta-1,4-dieno.' },

  // ── ALQUINOS ────────────────────────────────────────────────────────────
  { question: '¿Qué sufijo se usa para un compuesto con un doble Y un triple enlace?', options: ['-en-ino', '-ino-eno', '-dienino', '-alquenino'], correctIndex: 0, explanation: 'Los compuestos con doble y triple enlace son "eninos". Se indica primero el doble (-en-) y luego el triple (-ino).' },
  { question: '¿Cómo se llama CH₂=CH-C≡CH (vinilacetileno, 4 carbonos)?', options: ['But-3-en-1-ino', 'But-1-en-3-ino', 'Buta-1,3-diino', 'But-2-en-1-ino'], correctIndex: 1, explanation: 'Se numera para dar el localizador más bajo al doble enlace: C1=C2-C3≡C4 → But-1-en-3-ino.' },

  // ── CICLOALCANOS ─────────────────────────────────────────────────────────
  { question: '¿Cómo se nombra un ciclohexano con etilo en C1 y metilo en C2?', options: ['1-Metil-2-etilciclohexano', '1-Etil-2-metilciclohexano', '2-Etil-1-metilciclohexano', 'Etilmetilciclohexano'], correctIndex: 1, explanation: 'Los sustituyentes se listan en orden alfabético: "etil" (E) precede a "metil" (M) → 1-Etil-2-metilciclohexano.' },
  { question: '¿Cuál es el ángulo de enlace aproximado del ciclopentano?', options: ['60°', '90°', '108°', '120°'], correctIndex: 2, explanation: 'El ciclopentano tiene ángulos de ~108°, muy cercanos al ideal sp³ (109.5°), lo que explica su estabilidad.' },

  // ── ALCOHOLES ────────────────────────────────────────────────────────────
  { question: '¿Qué sufijo describe un compuesto con tres grupos -OH?', options: ['-diol', '-triol', '-tetrol', '-poliol'], correctIndex: 1, explanation: 'El prefijo "tri-" indica tres grupos: "-triol" para tres grupos hidroxilo.' },
  { question: '¿Cómo se llama HO-CH₂-CH₂-OH, el anticongelante más común?', options: ['Etanol', 'Etano-1,2-diol', 'Propano-1,2-diol', 'Metanol'], correctIndex: 1, explanation: 'El etilenglicol tiene dos grupos -OH en una cadena de 2 carbonos → Etano-1,2-diol.' },
  { question: '¿Cuál es el nombre IUPAC del glicerol (componente de las grasas)?', options: ['Propan-1-ol', 'Etano-1,2-diol', 'Propano-1,2,3-triol', 'Propano-1,3-diol'], correctIndex: 2, explanation: 'El glicerol tiene 3 grupos -OH en los 3 carbonos de la cadena → Propano-1,2,3-triol.' },

  // ── ALDEHÍDOS ────────────────────────────────────────────────────────────
  { question: '¿Qué sufijo indica dos grupos -CHO en los extremos de una cadena?', options: ['-dial', '-dialdehído', '-aldial', '-dicarbonilo'], correctIndex: 0, explanation: 'El sufijo -dial se usa cuando hay grupos -CHO en ambos extremos. Ejemplo: Butanodial (succinaldehído).' },
  { question: '¿Cómo se llama OHC-CH₂-CHO (3 carbonos con -CHO en ambos extremos)?', options: ['Propanodial', 'Butanodial', 'Etanodial', 'Malonaldehído (nombre común)'], correctIndex: 0, explanation: '3 carbonos con grupos -CHO en C1 y C3 → Propanodial. El nombre común es malonaldehído.' },

  // ── CETONAS ─────────────────────────────────────────────────────────────
  { question: '¿Qué sufijo indica dos grupos cetona (C=O interno) en la misma cadena?', options: ['-diona', '-dicetona', '-bisona', '-dioxo'], correctIndex: 0, explanation: 'Se usa "di-" + "-ona" → -diona para indicar dos grupos cetona en la cadena.' },
  { question: '¿Cómo se llama CH₃-CO-CO-CH₃ (responsable del aroma a mantequilla)?', options: ['Propanona', 'Butano-2,3-diona', 'Pentan-2,3-diona', 'Etanal'], correctIndex: 1, explanation: '4 carbonos con carbonilos en C2 y C3 → Butano-2,3-diona (diacetilo). Es el aroma artificial a mantequilla.' },

  // ── ÉTERES ──────────────────────────────────────────────────────────────
  { question: '¿Cuál es el nombre IUPAC del dietil éter (CH₃CH₂-O-CH₂CH₃)?', options: ['Dietoxietano', 'Etoxietano', '1-Etoxietano', 'Oxietano'], correctIndex: 1, explanation: 'El grupo más pequeño (-OC₂H₅) es "etoxi-", la cadena principal es etano → Etoxietano.' },
  { question: '¿Cómo se llama CH₃-O-CH₂CH₂CH₃ en nomenclatura IUPAC?', options: ['Propoximetano', '3-Metoxipropano', '1-Metoxipropano', 'Metil propil éter'], correctIndex: 2, explanation: 'El grupo metoxi (-OCH₃) se une al extremo (C1) de la cadena de propano → 1-Metoxipropano.' },

  // ── ÁCIDOS CARBOXÍLICOS ──────────────────────────────────────────────────
  { question: '¿Cuántos carbonos tiene la cadena principal del ácido etanoico?', options: ['1 (sin el COOH)', '2 (incluyendo el COOH)', '3', '4'], correctIndex: 1, explanation: 'El carbono del grupo -COOH se incluye en el conteo. Ácido etanoico = 2 carbonos totales (Et-).' },
  { question: '¿Cómo se llama HOOC-CH₂-CH₂-COOH (interviene en el ciclo de Krebs)?', options: ['Ácido malónico', 'Ácido butanodioico', 'Ácido oxálico', 'Ácido adípico'], correctIndex: 1, explanation: '4 carbonos con -COOH en ambos extremos → Ácido butanodioico (succínico). Participa en el ciclo de Krebs.' },

  // ── ÉSTERES ─────────────────────────────────────────────────────────────
  { question: '¿Cómo se llama CH₃COO-CH₂CH₂CH₃ (olor a pera)?', options: ['Propanoato de etilo', 'Etanoato de propilo', 'Butanoato de etilo', 'Metanoato de propilo'], correctIndex: 1, explanation: 'Parte ácida: CH₃CO- = etanoato (2C). Parte alcohólica: -CH₂CH₂CH₃ = propilo → Etanoato de propilo.' },
  { question: '¿Qué dos compuestos reaccionan para formar un éster en la esterificación de Fischer?', options: ['Aldehído + cetona', 'Ácido carboxílico + alcohol', 'Éter + agua', 'Amina + ácido'], correctIndex: 1, explanation: 'La esterificación de Fischer: ácido carboxílico + alcohol → éster + agua (con catalizador ácido y calor).' },

  // ── HALOGENUROS ─────────────────────────────────────────────────────────
  { question: '¿Cómo se llama CH₂Cl₂ (disolvente de decapantes y pinturas)?', options: ['Clorometano', 'Diclorometano', 'Triclorometano', 'Tetraclorometano'], correctIndex: 1, explanation: 'Metano con 2 cloros en el mismo carbono → Diclorometano (DCM). Disolvente industrial muy común.' },
  { question: '¿Cómo se llama CH₃-CHCl-CHCl-CH₃ (diclorobutano simétrico)?', options: ['2-Clorobutano', '2,3-Diclorobutano', '1,2-Diclorobutano', '3,4-Diclorobutano'], correctIndex: 1, explanation: 'Cadena de 4C con Cl en C2 y C3 → 2,3-Diclorobutano. Se numeran para dar los localizadores más bajos.' },

  // ── AMINAS ──────────────────────────────────────────────────────────────
  { question: '¿Cuántas clases de aminas existen según sustitución en el nitrógeno?', options: ['2', '3', '4', '5'], correctIndex: 1, explanation: 'Primaria (R-NH₂), secundaria (R₂NH) y terciaria (R₃N) — 3 clases según cuántos H del NH₃ fueron reemplazados.' },
  { question: '¿Cómo se llama H₂N-CH₂-CH₂-NH₂ (base del nylon-6,6)?', options: ['Etanamina', 'N-Metilmetanamina', 'Etano-1,2-diamina', 'Dimetilamina'], correctIndex: 2, explanation: 'Cadena de 2 carbonos con grupos -NH₂ en C1 y C2 → Etano-1,2-diamina (etilendiamina). Precursora del nylon.' },

  // ── AMIDAS ──────────────────────────────────────────────────────────────
  { question: '¿Cuál es la amida derivada del ácido propanoico?', options: ['Metanamida', 'Etanamida', 'Propanamida', 'Butanamida'], correctIndex: 2, explanation: 'Se reemplaza "-oico" por "-amida" y se elimina "ácido": Ácido propanoico → Propanamida.' },
  { question: '¿Qué enlace une los aminoácidos en las proteínas?', options: ['R-CO-O-R\' (éster)', 'R-CO-NH-R\' (amida/peptídico)', 'R-NH-R\' (amina)', 'R-O-R\' (éter)'], correctIndex: 1, explanation: 'El enlace peptídico (-CO-NH-) es un enlace amídico que une aminoácidos. Su estabilidad sostiene las proteínas.' },

  // ── AROMÁTICOS ───────────────────────────────────────────────────────────
  { question: '¿Cómo se llama el benceno con grupos Cl en posiciones 1 y 3?', options: ['1,2-Diclorobenceno', '1,3-Diclorobenceno (m-diclorobenceno)', '1,4-Diclorobenceno', 'Triclorobenceno'], correctIndex: 1, explanation: 'Cl en posiciones 1 y 3 (meta) → 1,3-Diclorobenceno (m-diclorobenceno).' },
  { question: '¿Cómo se llama el benceno con tres metilos en posiciones 1, 3 y 5 (mesitileno)?', options: ['1,2,3-Trimetilbenceno', '1,2,4-Trimetilbenceno', '1,3,5-Trimetilbenceno', 'Trimetilbenceno'], correctIndex: 2, explanation: 'Metilos en posiciones 1, 3 y 5 (distribución simétrica) → 1,3,5-Trimetilbenceno (mesitileno).' },
  { question: 'Si un benceno tiene sustituyentes en posiciones 1 y 4, ¿cómo se denomina esa relación?', options: ['Orto', 'Meta', 'Para', 'Geminal'], correctIndex: 2, explanation: 'Para (p-) indica sustituyentes en posiciones 1 y 4, opuestos entre sí en el anillo bencénico.' },

  // ── ALQUENOS — múltiples dobles enlaces ──────────────────────────────────
  { question: '¿Cómo se llama CH₂=CH-CH=CH-CH₃ (5C con dobles enlaces en C1 y C3)?', options: ['Penta-1,4-dieno', 'Penta-1,3-dieno', 'Penta-2,4-dieno', 'Pent-1,3-eno'], correctIndex: 1, explanation: '5 carbonos con dobles enlaces conjugados en posiciones 1 y 3 → Penta-1,3-dieno. Los dobles están en C1=C2 y C3=C4.' },
  { question: '¿Cómo se llama CH₃-CH=CH-CH=CH-CH₃ (hexa-2,4-dieno)?', options: ['Hexa-1,3-dieno', 'Hexa-1,4-dieno', 'Hexa-2,4-dieno', 'Hexa-2,3-dieno'], correctIndex: 2, explanation: 'Cadena de 6C; se numera desde el extremo que dé localizadores más bajos: dobles en C2 y C4 → Hexa-2,4-dieno.' },
  { question: '¿Cómo se llama CH₂=CH-CH=CH-CH=CH₂ (3 dobles enlaces conjugados en 6C)?', options: ['Hexa-1,3,4-trieno', 'Hexa-1,3,5-trieno', 'Hexa-2,4,6-trieno', 'Hexatrieno'], correctIndex: 1, explanation: '6 carbonos con dobles enlaces en C1, C3 y C5 → Hexa-1,3,5-trieno. Sufijo -trieno para 3 dobles enlaces.' },
  { question: '¿Qué fórmula general corresponde a un hidrocarburo con DOS dobles enlaces?', options: ['CₙH₂ₙ₊₂', 'CₙH₂ₙ', 'CₙH₂ₙ₋₂', 'CₙH₂ₙ₋₄'], correctIndex: 2, explanation: 'Cada doble enlace resta 2 H al alcano (CₙH₂ₙ₊₂). Con dos dobles → CₙH₂ₙ₋₂. Igual que los alquinos.' },

  // ── ALQUINOS — múltiples triples enlaces / diinos ────────────────────────
  { question: '¿Qué sufijo indica DOS triples enlaces en la cadena?', options: ['-diino', '-bisino', '-deno', '-trino'], correctIndex: 0, explanation: '"di-" + "-ino" = "-diino" para dos triples enlaces. Ejemplo: HC≡C-C≡CH → Buta-1,3-diino.' },
  { question: '¿Cómo se llama HC≡C-C≡CH (4C con triples en C1 y C3)?', options: ['Buta-1,2-diino', 'Buta-1,3-diino', 'Tetraino', 'But-1-ino'], correctIndex: 1, explanation: '4 carbonos con triples enlaces en posiciones 1 y 3 → Buta-1,3-diino.' },
  { question: '¿Cómo se llama HC≡C-CH₂-C≡CH (5C con triples en C1 y C4)?', options: ['Penta-1,3-diino', 'Penta-1,4-diino', 'Penta-2,4-diino', 'Pent-1-ino'], correctIndex: 1, explanation: '5 carbonos con triples enlaces en posiciones 1 y 4 (no conjugados) → Penta-1,4-diino.' },
  { question: '¿Qué fórmula general tienen los alquinos con UN triple enlace?', options: ['CₙH₂ₙ₊₂', 'CₙH₂ₙ', 'CₙH₂ₙ₋₂', 'CₙH₂ₙ₋₄'], correctIndex: 2, explanation: 'Un triple enlace tiene 2 enlaces π, eliminando 4 H respecto al alcano → CₙH₂ₙ₋₂ (igual que los dienos).' },

  // ── ALCOHOLES — múltiples grupos -OH ────────────────────────────────────
  { question: '¿Cuál es el sufijo IUPAC para un compuesto con exactamente DOS grupos -OH?', options: ['-ol', '-diol', '-triol', '-tetrol'], correctIndex: 1, explanation: '"di-" + "-ol" = "-diol" para dos grupos hidroxilo. Ejemplo: Etano-1,2-diol (etilenglicol).' },
  { question: '¿Cómo se llama HOCH₂-CH(OH)-CH₂-CH₂OH (butano con OH en C1, C2 y C4)?', options: ['Butano-1,2,3-triol', 'Butano-1,2,4-triol', 'Butano-1,3,4-triol', 'Propano-1,2,3-triol'], correctIndex: 1, explanation: '4 carbonos con grupos -OH en posiciones 1, 2 y 4 → Butano-1,2,4-triol.' },
  { question: '¿Cómo se llama HOCH₂-CH(OH)-CH(OH)-CH₂OH (cuatro grupos -OH en butano)?', options: ['Butano-1,2,3-triol', 'Butano-1,2,3,4-tetrol', 'Propano-1,2,3-triol', 'Butano-2,3-diol'], correctIndex: 1, explanation: '4 carbonos con -OH en C1, C2, C3 y C4 → Butano-1,2,3,4-tetrol (eritritol/treitol). Sufijo -tetrol para 4 grupos OH.' },
  { question: 'El glicerol tiene 3 grupos -OH. ¿Cuál es su rol en las grasas?', options: ['Es el grupo funcional ácido', 'Es la espina dorsal (backbone) de los triglicéridos', 'Actúa como halógeno', 'Es el enlace peptídico'], correctIndex: 1, explanation: 'El glicerol (Propano-1,2,3-triol) es el esqueleto al que se unen los 3 ácidos grasos para formar triglicéridos.' },

  // ── HALOGENUROS — con ramificaciones de carbono ──────────────────────────
  { question: '¿Cómo se llama CH₃-CCl₂-CH₃ (propano con 2 Cl en el carbono central)?', options: ['1,1-Dicloropropano', '2,2-Dicloropropano', '1,2-Dicloropropano', '2-Cloropropano'], correctIndex: 1, explanation: 'Cadena de 3C con dos cloros sobre el C2 → 2,2-Dicloropropano. "di-" + localizador "2,2-" indica ambos Cl en el mismo carbono.' },
  { question: '¿Cómo se llama (CH₃)₃C-Br (terc-bromuro de butilo)?', options: ['1-Bromo-2-metilpropano', '2-Bromo-2-metilpropano', '3-Bromopropano', '2-Metil-1-bromopropano'], correctIndex: 1, explanation: 'Propano con bromo y metilo ambos en C2 → 2-Bromo-2-metilpropano. El C2 es un carbono terciario.' },
  { question: '¿Cómo se llama CH₂Cl-CH(CH₃)-CH₂-CH₃ (Cl en extremo, metilo en C2)?', options: ['2-Cloro-3-metilbutano', '1-Cloro-2-metilbutano', '1-Cloro-3-metilbutano', '2-Metil-4-clorobutano'], correctIndex: 1, explanation: 'Cadena principal de 4C; Cl en C1 y metil en C2 → 1-Cloro-2-metilbutano. Se numera desde el extremo con el Cl.' },
  { question: '¿Cómo se llama CH₃-CHBr-CH(CH₃)-CH₂-CH₃ (bromo y metilo en pentano)?', options: ['3-Bromo-3-metilpentano', '4-Bromo-3-metilpentano', '2-Bromo-3-metilpentano', '3-Metil-2-bromopentano'], correctIndex: 2, explanation: 'Cadena de 5C; se numeran desde el extremo más cercano al Br: Br en C2, metil en C3 → 2-Bromo-3-metilpentano.' },
  { question: '¿Cómo se llama CH₃-CCl₂-CH₂-CH₃ (2 Cl en el mismo C, cadena de 4)?', options: ['1,1-Diclorobutano', '2,2-Diclorobutano', '2,3-Diclorobutano', '3,3-Diclorobutano'], correctIndex: 1, explanation: '4 carbonos con dos Cl sobre C2 → 2,2-Diclorobutano. Ambos cloros en C2 se indican con el localizador "2,2-".' },
];

// ============================================================
// UTILIDADES
// ============================================================
function normalize(text: string): string {
  return text.toLowerCase()
    .normalize('NFD')
    .replace(/[̀-ͯ]/g, '')
    .replace(/[^a-z0-9\s]/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
}

function has(text: string, ...terms: string[]): boolean {
  const n = normalize(text);
  return terms.some(t => n.includes(normalize(t)));
}

// ============================================================
// GENERADOR DE EJERCICIO
// ============================================================
function generateExercise(): string {
  const q = QUIZ_BANK[Math.floor(Math.random() * QUIZ_BANK.length)];
  pendingExercise = { options: q.options, correctIndex: q.correctIndex, explanation: q.explanation };
  const labels = ['A', 'B', 'C', 'D'];
  let res = `**Ejercicio de Práctica** 🎯\n\n**${q.question}**\n\n`;
  q.options.forEach((opt, i) => { res += `**${labels[i]})** ${opt}\n`; });
  res += `\nResponde con la letra (A, B, C o D).`;
  return res;
}

function handleExerciseAnswer(msg: string): string | null {
  if (!pendingExercise) return null;
  const n = normalize(msg).trim();
  const labels = ['a', 'b', 'c', 'd'];
  let selected = -1;
  for (let i = 0; i < 4; i++) {
    if (n === labels[i] || n.startsWith(labels[i] + ' ') || n.startsWith(labels[i] + ')') || n.startsWith(labels[i] + '.')) {
      selected = i;
      break;
    }
  }
  if (selected === -1) {
    return `Por favor responde con la letra **A**, **B**, **C** o **D**.`;
  }
  const { correctIndex, explanation, options } = pendingExercise;
  pendingExercise = null;
  if (selected === correctIndex) {
    return `✅ **¡Correcto!** Excelente.\n\n📖 ${explanation}\n\n¿Quieres otro ejercicio o preguntar algo más?`;
  }
  return `❌ **Incorrecto.** La respuesta correcta era **${labels[correctIndex].toUpperCase()})** *${options[correctIndex]}*\n\n📖 ${explanation}\n\n¿Quieres intentar otro ejercicio?`;
}

// ============================================================
// BASE DE CONOCIMIENTOS
// ============================================================
function buildResponse(msg: string): string {

  // --- Ejercicio: respuesta pendiente ---
  const exerciseReply = handleExerciseAnswer(msg);
  if (exerciseReply !== null) return exerciseReply;

  // --- Solicitud de ejercicio ---
  if (has(msg, 'ejercicio', 'practica', 'examen', 'quiz', 'evalua', 'pon a prueba', 'pregunta', 'test')) {
    return generateExercise();
  }

  // --- Saludos ---
  if (has(msg, 'hola', 'buenos dias', 'buenas tardes', 'buenas noches', 'hi', 'hey', 'saludos', 'buenas')) {
    return '¡Hola! Soy tu tutor de química orgánica IUPAC. Puedo explicarte cualquier grupo funcional, reglas de nomenclatura, propiedades o darte ejercicios de práctica. ¿En qué tema tienes dudas?';
  }

  // --- Agradecimiento ---
  if (has(msg, 'gracias', 'muchas gracias', 'thanks', 'perfecto', 'excelente respuesta', 'muy bien', 'genial')) {
    return '¡De nada! Si tienes más dudas sobre química orgánica, aquí estoy. ¿Quieres explorar otro tema o hacer un ejercicio de práctica?';
  }

  // --- Ayuda / menú ---
  if (has(msg, 'que puedes hacer', 'para que sirves', 'ayuda', 'menu', 'opciones', 'que sabes')) {
    return `Soy tu **Tutor de Química Orgánica IUPAC**. Puedo ayudarte con:\n\n📚 **Conceptos y definiciones** de cualquier grupo funcional:\nAlcanos · Alquenos · Alquinos · Cicloalcanos · Alcoholes · Aldehídos · Cetonas · Éteres · Ácidos Carboxílicos · Ésteres · Halogenuros · Aminas · Amidas · Aromáticos\n\n📝 **Reglas de nomenclatura** IUPAC para cada grupo.\n\n🔬 **Propiedades** físicas y químicas.\n\n⚗️ **Reacciones** características.\n\n🎯 **Ejercicios de práctica** (escribe "dame un ejercicio").\n\n📊 **Comparaciones** entre grupos funcionales.\n\n¿Por dónde empezamos?`;
  }

  // --- Hibridación ---
  if (has(msg, 'hibridacion', 'sp3', 'sp2', 'hibrid')) {
    return `**Hibridación del Carbono**\n\n**sp³** — Enlace simple (σ). Geometría **tetraédrica** (109.5°).\n*Ejemplos: Alcanos, Cicloalcanos, Alcoholes.*\n\n**sp²** — Enlace doble (σ + π). Geometría **trigonal plana** (120°).\n*Ejemplos: Alquenos, Aldehídos, Cetonas, Aromáticos.*\n\n**sp** — Enlace triple (σ + 2π). Geometría **lineal** (180°).\n*Ejemplos: Alquinos.*\n\n💡 *Regla fácil: cuantos más enlaces π, más carácter "s" tiene la hibridación.*`;
  }

  // --- Prefijos numéricos ---
  if (has(msg, 'prefijo', 'prefijos', 'raiz numerica', 'raíz numerica', 'met-', 'et-', 'prop-', 'tabla de prefijos')) {
    return `**Prefijos Numéricos IUPAC**\n\n| # C | Prefijo | # C | Prefijo |\n|:---:|:-------:|:---:|:-------:|\n| 1 | Met- | 6 | Hex- |\n| 2 | Et- | 7 | Hept- |\n| 3 | Prop- | 8 | Oct- |\n| 4 | But- | 9 | Non- |\n| 5 | Pent- | 10 | Dec- |\n\nMás: 11=Undec-, 12=Dodec-, 20=Eicos-, 21=Henicos-, 30=Triacont-\n\n**Prefijos de multiplicidad** (no cuentan en orden alfabético):\ndi-, tri-, tetra-, penta-, hexa-`;
  }

  // --- Pasos IUPAC generales ---
  if (has(msg, 'como nombrar', 'cómo nombrar', 'pasos para nombrar', 'reglas generales', 'nomenclatura iupac', 'nombrar un compuesto', 'nombrar compuesto')) {
    return `**Pasos Generales para Nombrar (IUPAC)**\n\n1. **Identificar el grupo funcional principal** → determina el sufijo y da prioridad a la cadena.\n2. **Elegir la cadena principal:** La más larga que contenga el grupo funcional.\n3. **Numerar la cadena:** Comenzar desde el extremo que dé el número más bajo al grupo principal.\n4. **Nombrar sustituyentes:** En orden alfabético, con sus localizadores.\n5. **Ensamblar el nombre:** Localizadores-Sustituyentes + Raíz + Sufijo.\n\n**Orden de prioridad de sufijos:**\nÁcidos (-oico) > Ésteres (-ato de -ilo) > Aldehídos (-al) > Cetonas (-ona) > Alcoholes (-ol) > Alquenos (-eno) > Alquinos (-ino)`;
  }

  // --- Prioridad de grupos ---
  if (has(msg, 'prioridad', 'orden de prioridad', 'mayor prioridad', 'jerarquia', 'jerarquía')) {
    return `**Orden de Prioridad de Grupos Funcionales** (mayor → menor)\n\n1. 🔴 **Ácidos Carboxílicos** (-COOH) → *ácido ...-oico*\n2. 🟠 **Ésteres** (-COO-) → *...-ato de ...-ilo*\n3. 🟡 **Aldehídos** (-CHO) → *-al*\n4. 🟢 **Cetonas** (C=O interno) → *-ona*\n5. 🔵 **Alcoholes** (-OH) → *-ol*\n6. ⚫ **Alquenos** (C=C) → *-eno*\n7. ⚫ **Alquinos** (C≡C) → *-ino*\n8. ⚪ **Halogenuros** y **Aminas** → prefijos/sufijos\n\n*El grupo de mayor prioridad dicta la cadena principal y la numeración.*`;
  }

  // --- Química orgánica general ---
  if (has(msg, 'quimica organica', 'que estudia la quimica', 'que es la quimica organica')) {
    return `**Química Orgánica**\n\nEstudia los compuestos del **carbono** (salvo CO₂, carbonatos y carburos simples).\n\n**¿Por qué el carbono es especial?**\n- Es **tetravalente** (4 enlaces covalentes).\n- Se une consigo mismo en cadenas largas (concatenación).\n- Genera millones de compuestos distintos.\n\n**Hibridaciones:** sp³ (tetraédrico) · sp² (plano) · sp (lineal)\n\nEsta app cubre los 14 grupos funcionales principales. ¿Cuál quieres explorar?`;
  }

  // ============================================================
  // GRUPOS FUNCIONALES
  // ============================================================

  // --- ALCANOS ---
  if (has(msg, 'alcano', 'parafina')) {
    if (has(msg, 'nomenclatura', 'nombrar', 'nombre', 'sufijo', 'regla', 'como se llama')) {
      return `**Nomenclatura de Alcanos** (sufijo **-ano**)\n\n1. Elegir la cadena continua más larga.\n2. Numerar desde el extremo más cercano a la primera ramificación.\n3. Nombrar radicales alquilo en orden **alfabético** con sus localizadores.\n4. Usar prefijos di-, tri-, tetra- si un sustituyente se repite (no cuentan para el orden alfabético).\n\n**Ejemplos:**\n- CH₄ → Metano\n- CH₃-CH₂-CH₃ → Propano\n- CH₃-CH(CH₃)-CH₂-CH₃ → 2-Metilbutano\n- C(CH₃)₄ → 2,2-Dimetilpropano`;
    }
    if (has(msg, 'propiedad', 'ebullicion', 'solubilidad', 'fisic', 'quimic', 'reaccion')) {
      return `**Propiedades de los Alcanos**\n\n**Físicas:**\n- Apolares e insolubles en agua.\n- Punto de ebullición ↑ con la longitud de cadena; ↓ con las ramificaciones.\n- C1-C4: gases. C5-C17: líquidos. C18+: sólidos.\n\n**Químicas:**\n- Poco reactivos (inertes a ácidos, bases y oxidantes).\n- Reaccionan por **combustión** (muy exotérmica) y **halogenación** (con luz UV).\n- No decoloran el KMnO₄ ni el Br₂.`;
    }
    return `**Alcanos (Parafinas)**\n\nHidrocarburos **saturados** de cadena abierta. Solo tienen enlaces simples C-C y C-H.\n\n📋 **Fórmula:** CₙH₂ₙ₊₂ · 🔗 **Hibridación:** sp³ (109.5°) · 🏷️ **Sufijo:** -ano\n\n**Serie:** Metano · Etano · Propano · Butano · Pentano · Hexano · Heptano · Octano · Nonano · Decano\n\nBase de los combustibles fósiles. ¿Quieres saber sobre su nomenclatura, propiedades o hacer un ejercicio?`;
  }

  // --- ALQUENOS ---
  if (has(msg, 'alqueno', 'olefina', 'doble enlace c', 'etileno', 'propeno', 'buteno', 'dieno', 'trieno')) {
    if (has(msg, 'nomenclatura', 'nombrar', 'sufijo', 'regla')) {
      return `**Nomenclatura de Alquenos** (sufijo **-eno**)\n\n1. La cadena principal debe **contener el doble enlace**.\n2. Numerar desde el extremo más cercano al doble enlace (prioridad sobre ramificaciones).\n3. Indicar la posición del doble enlace antes del sufijo (But-**1**-eno).\n4. Varios dobles enlaces: -dieno, -trieno.\n\n**Ejemplos:**\n- CH₂=CH₂ → Eteno\n- CH₃-CH=CH₂ → Prop-1-eno\n- CH₃-CH=CH-CH₃ → But-2-eno\n- CH₂=CH-CH=CH₂ → Buta-1,3-dieno`;
    }
    return `**Alquenos (Olefinas)**\n\nHidrocarburos con al menos un **doble enlace C=C**.\n\n📋 **Fórmula:** CₙH₂ₙ · 🔗 **Hibridación:** sp² (120°) · 🏷️ **Sufijo:** -eno\n\n**Reacción típica:** Adición electrofílica (H₂, HBr, H₂O...)\n**Isomería cis-trans:** El doble enlace no rota libremente.\n\n**Uso clave:** Eteno → polietileno (plástico más común del mundo).`;
  }

  // --- ALQUINOS ---
  if (has(msg, 'alquino', 'acetileno', 'triple enlace', 'etino', 'propino')) {
    if (has(msg, 'nomenclatura', 'nombrar', 'sufijo', 'regla')) {
      return `**Nomenclatura de Alquinos** (sufijo **-ino**)\n\n1. Cadena principal debe incluir el triple enlace.\n2. Numerar desde el extremo más cercano al triple enlace.\n3. **Eninos** (doble + triple): dar menores localizadores al conjunto; si hay empate, el doble enlace tiene preferencia.\n\n**Ejemplos:**\n- HC≡CH → Etino (acetileno)\n- CH₃-C≡CH → Propino\n- CH₃-CH₂-C≡CH → But-1-ino\n- CH₃-C≡C-CH₃ → But-2-ino\n- HC≡C-CH=CH₂ → But-1-en-3-ino`;
    }
    return `**Alquinos (Acetilenos)**\n\nHidrocarburos con un **triple enlace C≡C**.\n\n📋 **Fórmula:** CₙH₂ₙ₋₂ · 🔗 **Hibridación:** sp (180°, lineal) · 🏷️ **Sufijo:** -ino\n\n**Propiedades:**\n- Muy reactivos (2 enlaces π disponibles).\n- Alquinos terminales (R-C≡C-H): el H es débilmente ácido → forman acetiluros metálicos.\n\n**Uso del etino:** Soldadura oxiacetilénica (>3 000°C).`;
  }

  // --- CICLOALCANOS ---
  if (has(msg, 'cicloalcano', 'ciclo propano', 'ciclopropano', 'ciclobutano', 'ciclopentano', 'ciclohexano', 'cicloheptano', 'anillo saturado')) {
    if (has(msg, 'nomenclatura', 'nombrar', 'prefijo', 'regla')) {
      return `**Nomenclatura de Cicloalcanos**\n\nPrefijo **Ciclo-** + nombre del alcano correspondiente.\n\n1. El ciclo es la cadena principal (salvo que haya una cadena abierta más larga).\n2. Un solo sustituyente: no se numera (posición 1 implícita).\n3. Dos o más sustituyentes: numerar para los localizadores más bajos, en orden alfabético ante empate.\n\n**Ejemplos:**\n- Anillo C3 → Ciclopropano\n- Anillo C6 → Ciclohexano\n- CH₃ en ciclohexano → Metilciclohexano\n- CH₃ y C₂H₅ → 1-Etil-2-metilciclohexano`;
    }
    return `**Cicloalcanos**\n\nAlcanos cíclicos (carbono en anillo cerrado). Isómeros funcionales de los alquenos.\n\n📋 **Fórmula:** CₙH₂ₙ · 🏷️ **Prefijo:** Ciclo-\n\n**Estabilidad:**\n- C3 (Ciclopropano): muy inestable, tensión angular 60°\n- C4 (Ciclobutano): inestable\n- C5 (Ciclopentano): estable\n- C6 (Ciclohexano): muy estable, conformación de **silla**\n\n**Dato:** El ciclohexano es materia prima del Nylon.`;
  }

  // --- ALCOHOLES ---
  if (has(msg, 'alcohol', 'hidroxilo', 'grupo -oh', 'grupo oh', 'metanol', 'etanol', 'propanol', 'butanol', 'diol', 'triol')) {
    if (has(msg, 'tipo', 'clasificacion', 'primario', 'secundario', 'terciario')) {
      return `**Clasificación de Alcoholes**\n\n**Primario (1°):** El C-OH está unido a **1 carbono**.\nSe oxida → Aldehído → Ácido carboxílico.\n*Ej: Propan-1-ol*\n\n**Secundario (2°):** El C-OH está unido a **2 carbonos**.\nSe oxida → Cetona.\n*Ej: Propan-2-ol*\n\n**Terciario (3°):** El C-OH está unido a **3 carbonos**.\nNo se oxida fácilmente.\n*Ej: 2-Metilpropan-2-ol (terc-butanol)*`;
    }
    if (has(msg, 'nomenclatura', 'nombrar', 'sufijo', 'regla')) {
      return `**Nomenclatura de Alcoholes** (sufijo **-ol**)\n\n1. El -OH tiene prioridad sobre dobles enlaces, halogenuros y aminas.\n2. Cadena más larga que contenga el carbono unido al -OH.\n3. Numerar desde el extremo más cercano al -OH.\n4. Localizador inmediatamente antes del sufijo: Propan-**1**-ol.\n5. Polialcoholes: diol, triol. Ej: Etano-1,2-diol.\n\n**Ejemplos:**\n- CH₃OH → Metanol\n- CH₃CH₂OH → Etanol\n- (CH₃)₂CHOH → Propan-2-ol\n- CC(C)(O)C → 2-Metilpropan-2-ol`;
    }
    return `**Alcoholes**\n\nContienen el grupo **-OH** unido a un carbono sp³.\n\n🔵 **Sufijo:** -ol · ⬆️ **Prioridad:** sobre alquenos, alquinos y halogenuros\n\n**Propiedades:**\n- Muy polares; forman puentes de H → puntos de ebullición altos.\n- C1-C3 son miscibles con agua.\n\n**Clasificación:** 1° (→ aldehído) · 2° (→ cetona) · 3° (no se oxida)\n\n⚠️ Metanol es letal. Solo el etanol es seguro en bebidas.`;
  }

  // --- ALDEHÍDOS ---
  if (has(msg, 'aldehido', 'aldehído', 'grupo cho', 'carbonilo terminal', 'metanal', 'etanal', 'formaldehido', 'formol', 'propanal', 'butanal')) {
    if (has(msg, 'nomenclatura', 'nombrar', 'sufijo', 'regla')) {
      return `**Nomenclatura de Aldehídos** (sufijo **-al**)\n\n1. El grupo **-CHO** siempre está en el extremo de la cadena.\n2. El carbono del carbonilo es el **C1** (no hace falta indicar su posición).\n3. Reemplazar la "-o" final del alcano por "-al".\n4. Dialdehídos (dos extremos -CHO): sufijo **-dial**.\n\n**Ejemplos:**\n- HCHO → Metanal (formaldehído)\n- CH₃CHO → Etanal (acetaldehído)\n- CH₃CH₂CHO → Propanal\n- OHCCH₂CH₂CHO → Butanodial (succinaldehído)`;
    }
    return `**Aldehídos**\n\nContienen el grupo **-CHO** en el extremo de la cadena (carbonilo terminal).\n\n🟡 **Sufijo:** -al · ⬆️ **Prioridad:** mayor que cetonas y alcoholes\n\n**Propiedades:**\n- Se oxidan fácilmente a ácidos carboxílicos (son agentes reductores).\n- Dan positivo en la prueba de **Tollens** (espejo de plata).\n- El metanal (formol) se usa como conservante y desinfectante.\n- Olores penetrantes en cadenas cortas, frutales en cadenas medias.`;
  }

  // --- CETONAS ---
  if (has(msg, 'cetona', 'acetona', 'propanona', 'butanona', 'carbonilo interno', 'carbonilo intern')) {
    if (has(msg, 'nomenclatura', 'nombrar', 'sufijo', 'regla')) {
      return `**Nomenclatura de Cetonas** (sufijo **-ona**)\n\n1. El C=O está en posición interna (nunca en los extremos).\n2. Cadena más larga que incluya el carbonilo.\n3. Numerar desde el extremo más cercano al C=O.\n4. Indicar la posición del carbonilo antes del sufijo.\n\n**Ejemplos:**\n- CH₃COCH₃ → Propanona (acetona)\n- CH₃COC₂H₅ → Butanona (MEK)\n- CH₃COCH₂CH₂CH₃ → Pentan-2-ona\n- C₂H₅COC₂H₅ → Pentan-3-ona`;
    }
    return `**Cetonas**\n\nContienen el grupo **C=O** unido a dos átomos de carbono (carbonilo interno).\n\n🟢 **Sufijo:** -ona · 🔸 **Prioridad:** menor que aldehídos y ácidos\n\n**Propiedades:**\n- Buenos disolventes orgánicos (acetona disuelve esmaltes).\n- Menos reactivas que los aldehídos.\n- **NO** reaccionan con el reactivo de Tollens (no son reductoras).\n\n**Diferencia clave con aldehídos:** El carbonilo de la cetona está interno; el del aldehído, en el extremo.`;
  }

  // --- ÉTERES ---
  if (has(msg, 'eter', 'éter', 'alcoxi', 'r-o-r', 'oxigeno puente', 'dietil', 'metoxietano', 'etoxietano')) {
    if (has(msg, 'nomenclatura', 'nombrar', 'prefijo', 'regla')) {
      return `**Nomenclatura de Éteres**\n\n**IUPAC (sustitutiva):** El grupo más pequeño (R-O-) es un sustituyente "alcoxi" sobre la cadena principal.\n- CH₃-O-CH₃ → Metoximetano\n- CH₃-O-C₂H₅ → Metoxietano\n- C₂H₅-O-C₂H₅ → Etoxietano (dietil éter)\n\n**Nomenclatura funcional (común):** Radicales por orden alfabético + "éter"\n- CH₃-O-C₂H₅ → Etil metil éter\n\n💡 *Radical alcoxi = nombre del alcohol sin "-ol" + "-oxi". Metanol → Metoxi-*`;
    }
    return `**Éteres (R-O-R')**\n\nÁtomo de oxígeno uniendo dos cadenas de carbono.\n\n**Nomenclatura:** alcoxi + alcano (IUPAC) · o alquil alquil éter (común)\n\n**Propiedades:**\n- Muy volátiles e inflamables.\n- Químicamente inertes → excelentes disolventes de reacción.\n- ⚠️ Peligro: forman **peróxidos explosivos** al contacto con el aire.\n\n**Historia:** El dietil éter fue el primer anestésico general de la cirugía moderna.`;
  }

  // --- ÁCIDOS CARBOXÍLICOS ---
  if (has(msg, 'acido carboxilico', 'acido carboxílico', 'carboxilo', 'cooh', 'acido acetico', 'vinagre', 'acido formico', 'acido propanoico', 'acido butanoico')) {
    if (has(msg, 'nomenclatura', 'nombrar', 'sufijo', 'regla')) {
      return `**Nomenclatura de Ácidos Carboxílicos** (fórmula: **Ácido ...-oico**)\n\n1. El grupo **-COOH** tiene la **máxima prioridad**.\n2. El carbono del carboxilo es siempre el **C1**.\n3. Nombre: *"Ácido"* + raíz (# carbonos incluyendo el COOH) + *"-oico"*.\n\n**Ejemplos:**\n- HCOOH → Ácido metanoico (fórmico)\n- CH₃COOH → Ácido etanoico (acético)\n- CH₃CH₂COOH → Ácido propanoico\n- (CH₃)₂CHCOOH → Ácido 2-metilpropanoico`;
    }
    return `**Ácidos Carboxílicos**\n\nContienen el grupo **-COOH** en el extremo.\n\n🔴 **Sufijo:** ácido ...-oico · ⬆️ **Prioridad: MÁXIMA**\n\n**Propiedades:**\n- Ácidos débiles (pH 3-5).\n- Puntos de ebullición muy altos por formación de **dímeros** (doble puente de H).\n- Olores fuertes: butanoico (rancio), hexanoico (cabra), octanoico (sudor).\n\n**Reacciones:**\n- Con bases → sales (neutralización)\n- Con alcoholes → ésteres + H₂O (esterificación de Fischer)`;
  }

  // --- ÉSTERES ---
  if (has(msg, 'ester', 'éster', 'ato de', 'esterificacion', 'saponificacion', 'aroma frutal', 'acetato', 'metanoato', 'etanoato', 'propanoato', 'butanoato')) {
    if (has(msg, 'nomenclatura', 'nombrar', 'sufijo', 'regla')) {
      return `**Nomenclatura de Ésteres** (fórmula: **...-ato de ...-ilo**)\n\n1. **Parte del ácido** (R-C=O-): contar todos los carbonos incluyendo el carbonilo → cambiar "-ico" por "-ato".\n2. Preposición **"de"**.\n3. **Parte del alcohol** (-O-R'): nombre del radical alquilo + "-ilo".\n\n**Ejemplos:**\n- HCOO-CH₃ → Metanoato de metilo\n- CH₃COO-CH₃ → Etanoato de metilo\n- CH₃COO-C₂H₅ → Etanoato de etilo (acetato de etilo)\n- CH₃CH₂CH₂COO-C₂H₅ → Butanoato de etilo (aroma a piña)`;
    }
    return `**Ésteres (R-COO-R')**\n\nDerivados de ácidos carboxílicos donde el H del -OH fue sustituido por un radical alquilo.\n\n**Nomenclatura:** ...-ato de ...-ilo\n\n**Propiedades:**\n- Muchos tienen olores agradables a **frutas y flores**.\n- No forman puentes de H entre sí → menor punto de ebullición que los ácidos.\n\n**Aromas:**\n- Butanoato de metilo → manzana\n- Propanoato de etilo → pera/piña\n- Butanoato de etilo → piña\n\n**Reacciones:**\n- **Esterificación:** ácido + alcohol ⇌ éster + H₂O\n- **Saponificación:** éster + NaOH → jabón (sal de ácido graso) + alcohol`;
  }

  // --- HALOGENUROS ---
  if (has(msg, 'halogenuro', 'halogeno', 'halógeno', 'cloroformo', 'clorometano', 'bromometano', 'yodoetano', 'fluoruro', 'cloruro de', 'bromuro de')) {
    if (has(msg, 'nomenclatura', 'nombrar', 'prefijo', 'regla')) {
      return `**Nomenclatura de Halogenuros de Alquilo**\n\nSe tratan como **sustituyentes** (prefijos):\n- F → **Fluoro-**\n- Cl → **Cloro-**\n- Br → **Bromo-**\n- I → **Yodo-**\n\nLa cadena se numera para dar los localizadores más bajos a todos los sustituyentes.\n\n**Ejemplos:**\n- CH₃Cl → Clorometano\n- CH₂Cl₂ → Diclorometano (DCM)\n- CHCl₃ → Triclorometano (cloroformo)\n- CH₃CHClCH₃ → 2-Cloropropano\n- CH₃(CH₂)₃Br → 1-Bromobutano`;
    }
    return `**Halogenuros de Alquilo**\n\nAlcanos donde uno o más H son reemplazados por un halógeno (F, Cl, Br, I).\n\n⚪ **Nomenclatura:** prefijos Fluoro-, Cloro-, Bromo-, Yodo- (actúan como sustituyentes)\n\n**Propiedades:**\n- Polares, insolubles en agua.\n- Punto de ebullición: I > Br > Cl > F (mayor masa = mayor temperatura).\n- El enlace C-X es polar (C es electrófilo).\n\n**Reacciones:** Sustitución Nucleofílica (SN1, SN2) y Eliminación (E1, E2).`;
  }

  // --- AMINAS ---
  if (has(msg, 'amina', 'grupo amino', 'nh2', 'metilamina', 'etilamina', 'propilamina', 'dimetilamina', 'trimetilamina', 'olor pescado', 'nitrogenado')) {
    if (has(msg, 'nomenclatura', 'nombrar', 'sufijo', 'regla')) {
      return `**Nomenclatura de Aminas** (sufijo **-amina**)\n\n**Primarias (R-NH₂):** Cadena más larga con el N. Localizador antes del sufijo.\n- CH₃CH₂CH₂NH₂ → Propan-1-amina\n- (CH₃)₂CHNH₂ → Propan-2-amina\n\n**Secundarias (R₂NH) y terciarias (R₃N):** La cadena más larga es la principal. Los radicales en el N usan el localizador **"N-"**.\n- CH₃-NH-C₂H₅ → N-Metiletanamina\n- (CH₃)₃N → N,N-Dimetilmetanamina (trimetilamina)`;
    }
    return `**Aminas**\n\nDerivadas del amoníaco (NH₃). El nitrógeno tiene un **par libre de electrones**.\n\n🔵 **Sufijo:** -amina · **Clasificación:** 1° (R-NH₂) · 2° (R₂NH) · 3° (R₃N)\n\n**Propiedades:**\n- **Bases débiles** (aceptan H⁺ gracias al par libre del N).\n- Olores muy fuertes y desagradables (pescado, descomposición).\n- La trimetilamina es responsable del olor a pescado fresco.\n\n**Diferencia con amidas:** Las aminas son básicas; las amidas son neutras (el carbonilo desactiva el N).`;
  }

  // --- AMIDAS ---
  if (has(msg, 'amida', 'conh', 'enlace peptidico', 'enlace peptídico', 'proteina', 'proteína', 'nylon', 'kevlar', 'acetamida', 'metanamida')) {
    if (has(msg, 'nomenclatura', 'nombrar', 'sufijo', 'regla')) {
      return `**Nomenclatura de Amidas** (sufijo **-amida**)\n\nReemplaza "-oico" del ácido y elimina la palabra "ácido".\n1. El carbono del carbonilo es el **C1**.\n2. Sustituyentes en el N: usar prefijo **"N-"**.\n\n**Ejemplos:**\n- HCONH₂ → Metanamida\n- CH₃CONH₂ → Etanamida (acetamida)\n- CH₃CH₂CONH₂ → Propanamida\n- CH₃CO-NH-CH₃ → N-Metiletanamida\n- CH₃CON(CH₃)₂ → N,N-Dimetiletanamida (DMA)`;
    }
    return `**Amidas (R-CO-NR₂)**\n\nContienen el grupo carbonilo unido a nitrógeno.\n\n🟣 **Sufijo:** -amida · **Derivadas de:** ácidos carboxílicos\n\n**Propiedades:**\n- Sólidos cristalinos con puntos de fusión altos (fuertes puentes de H).\n- **Neutras** (no básicas): la resonancia con C=O desactiva el par libre del N.\n- Muy estables a la hidrólisis → base del **enlace peptídico** en proteínas.\n\n**Aplicaciones:**\n- Nylon → poliamida alifática (ropa, engranajes)\n- Kevlar → poliamida aromática (blindajes, chalecos)`;
  }

  // --- AROMÁTICOS ---
  if (has(msg, 'aromatico', 'aromático', 'benceno', 'anillo aromatico', 'huckel', 'tolueno', 'xileno', 'orto', 'meta', 'para', 'sustitución electrofilica', 'sea aromatica')) {
    if (has(msg, 'nomenclatura', 'nombrar', 'regla', 'orto', 'meta', 'para')) {
      return `**Nomenclatura de Aromáticos**\n\n**Monosustituidos:** sustituyente + "benceno"\n- CH₃-C₆H₅ → Metilbenceno (*Tolueno*)\n- Cl-C₆H₅ → Clorobenceno\n- C₂H₅-C₆H₅ → Etilbenceno\n\n**Disustituidos:** prefijos de posición relativa\n- **Orto (o-):** posiciones 1,2 (adyacentes)\n- **Meta (m-):** posiciones 1,3\n- **Para (p-):** posiciones 1,4 (opuestos)\n\n**Polisustituidos:** numerar el anillo con los localizadores más bajos en orden alfabético.\n\n**Nombres comunes aceptados:** Tolueno, Fenol, Anilina, Estireno.`;
    }
    if (has(msg, 'reaccion', 'sea', 'electrofil', 'substitucion')) {
      return `**Reactividad de los Aromáticos — SEAr**\n\n**Reacción característica:** Sustitución Electrofílica Aromática\n\nA diferencia de los alquenos, el benceno **NO sufre adición** (no rompe su anillo aromático). En cambio, **sustituye** un H manteniendo la estabilidad por resonancia.\n\n**Ejemplos de SEAr:**\n- Halogenación: C₆H₆ + Cl₂/FeCl₃ → Clorobenceno + HCl\n- Nitración: C₆H₆ + HNO₃/H₂SO₄ → Nitrobenceno\n- Sulfonación: C₆H₆ + H₂SO₄ → Ácido bencenosulfónico\n- Alquilación de Friedel-Crafts`;
    }
    return `**Compuestos Aromáticos**\n\nHidrocarburos cíclicos con dobles enlaces conjugados **deslocalizados**. Cumplen la **Regla de Hückel:** 4n+2 electrones π.\n\n**Benceno (C₆H₆):** 6 carbonos sp², anillo plano, 6 electrones π (n=1).\n\n**Propiedades:**\n- Extraordinariamente estables por resonancia.\n- Reacción típica: **SEAr** (no adición como los alquenos).\n\n**Nomenclatura disustituida:**\n- 1,2 = orto (o-) · 1,3 = meta (m-) · 1,4 = para (p-)`;
  }

  // --- Comparaciones ---
  if (has(msg, 'diferencia entre aldehido', 'diferencia entre aldehído', 'aldehido vs cetona', 'aldehído vs cetona', 'diferencia aldehido cetona')) {
    return `**Aldehídos vs Cetonas**\n\n| | Aldehído | Cetona |\n|---|---|---|\n| Grupo | -CHO (extremo) | C=O (interno) |\n| Sufijo | -al | -ona |\n| Prioridad | Mayor | Menor |\n| Oxidación | → Ácido carboxílico | No se oxida fácilmente |\n| Reducción | → Alcohol 1° | → Alcohol 2° |\n| Tollens | ✅ Positivo | ❌ Negativo |\n\n**Regla rápida:** Si el carbonilo tiene al menos un H directamente unido al carbono carbonílico, es **aldehído**. Si está entre dos C, es **cetona**.`;
  }

  if (has(msg, 'diferencia entre amina', 'amina vs amida', 'diferencia amina amida')) {
    return `**Aminas vs Amidas**\n\n| | Amina | Amida |\n|---|---|---|\n| Grupo | R-NH₂ (o R₂NH, R₃N) | R-CO-NR₂ |\n| Sufijo | -amina | -amida |\n| Carácter | **Base débil** | **Neutra** |\n| Origen | Derivada del NH₃ | Derivada del ácido carboxílico |\n| Estabilidad | Moderada | Alta (resiste hidrólisis) |\n\n**¿Por qué la amida es neutra?** El carbonilo (C=O) retira la densidad electrónica del N por resonancia, anulando su basicidad.`;
  }

  if (has(msg, 'diferencia entre alcohol', 'alcohol vs eter', 'alcohol vs aldehido')) {
    return `**Alcoholes vs Éteres** (misma fórmula molecular, distintos grupos funcionales)\n\n**Alcohol (R-OH):**\n- Grupo -OH unido a C sp³.\n- Forman puentes de H → alto punto de ebullición.\n- Se oxidan a aldehídos o cetonas.\n\n**Éter (R-O-R'):**\n- Oxígeno entre dos cadenas de C.\n- No forman puentes de H entre sí → menor punto de ebullición.\n- Químicamente muy inertes (disolventes ideales).\n\n*Ejemplo isómeros: Etanol (C₂H₅OH) y Metoximetano (CH₃OCH₃) ambos son C₂H₆O.*`;
  }

  // --- Compuestos específicos conocidos ---
  if (has(msg, 'metano') && !has(msg, 'metanol', 'metanamida', 'metanal', 'metanoato')) {
    return `**Metano (CH₄)**\nAlcano más simple: 1 carbono, 4 hidrógenos.\n- Hibridación sp³, geometría tetraédrica perfecta.\n- Principal componente del **gas natural** (70-90%).\n- Gas incoloro e inodoro (el olor del gas doméstico viene de un aditivo de seguridad).\n- Potente gas de efecto invernadero.`;
  }

  if (has(msg, 'etanol') || (has(msg, 'alcohol') && has(msg, 'bebida', 'tomar', 'cerveza', 'vino', 'licor'))) {
    return `**Etanol (C₂H₅OH)**\nEl alcohol más conocido.\n- Nombre IUPAC: Etanol\n- Único alcohol seguro para bebidas alcohólicas.\n- Punto de ebullición: 78.4°C (por puentes de H).\n- Completamente miscible con agua.\n- **Usos:** bebidas, antiséptico (70%), combustible (bioetanol), disolvente industrial.`;
  }

  if (has(msg, 'acetona') || (has(msg, 'propanona'))) {
    return `**Propanona — Acetona (CH₃COCH₃)**\nCetona más simple.\n- 3 carbonos, grupo C=O en posición 2.\n- Líquido incoloro de olor característico.\n- Excelente disolvente (esmaltes, pinturas, resinas).\n- Completamente miscible con agua.\n- Principal componente del **quitaesmalte de uñas**.`;
  }

  if (has(msg, 'benceno') && !has(msg, 'clorobenceno', 'nitrobenceno', 'metilbenceno', 'tolueno', 'etilbenceno')) {
    return `**Benceno (C₆H₆)**\nCompuesto aromático prototipo.\n- 6 carbonos en anillo plano, con 6 electrones π deslocalizados.\n- Cumple la regla de Hückel: 4(1)+2 = 6 e⁻ π.\n- Estabilidad excepcional por resonancia.\n- Reacción típica: SEAr (no adición).\n- ⚠️ **Cancerígeno comprobado** (categoría 1A).`;
  }

  // --- Respuesta por defecto ---
  return `Entiendo que tienes una duda sobre química orgánica. Puedo ayudarte con:\n\n- Nomenclatura IUPAC de cualquier grupo funcional\n- Propiedades físicas y químicas\n- Reglas paso a paso para nombrar compuestos\n- Comparaciones entre grupos funcionales\n- Ejercicios de práctica\n\n¿Podrías ser más específico? Por ejemplo:\n- *"¿Cuál es el sufijo de los alcoholes?"*\n- *"Explícame la nomenclatura de los ésteres"*\n- *"Dame un ejercicio de alquenos"*`;
}

// ============================================================
// EXPORTACIÓN — misma firma que la versión con Gemini
// ============================================================
export const sendMessageToGemini = async (
  message: string,
  _history: { role: string; parts: { text: string }[] }[] = []
): Promise<string> => {
  // Simular latencia mínima para que el loading se note
  await new Promise(resolve => setTimeout(resolve, 300));
  return buildResponse(message);
};
