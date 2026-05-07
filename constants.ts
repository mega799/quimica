import { Module } from './types';

export const MANUAL_MODULES: Module[] = [
  {
    id: 'intro',
    title: 'Introducción y Fundamentos',
    shortTitle: 'Introducción',
    description: 'Bases de la química del carbono, hibridación y reglas IUPAC esenciales.',
    sections: [
      {
        type: 'text',
        title: 'El Átomo de Carbono',
        content: 'La química orgánica se basa en la capacidad del carbono para formar enlaces estables consigo mismo (concatenación). El carbono es tetravalente, lo que significa que siempre forma 4 enlaces covalentes para completar su octeto. Sus propiedades dependen de la hibridación: sp3 (tetraédrica, enlaces simples, 109.5°), sp2 (trigonal plana, enlaces dobles, 120°) y sp (lineal, enlaces triples, 180°).'
      },
      {
        type: 'table',
        title: 'Prefijos Numéricos (Raíz IUPAC)',
        content: [
          { c: '1', pre: 'Met-', c2: '11', pre2: 'Undec-', c3: '21', pre3: 'Henicos-' },
          { c: '2', pre: 'Et-', c2: '12', pre2: 'Dodec-', c3: '30', pre3: 'Triacont-' },
          { c: '3', pre: 'Prop-', c2: '13', pre2: 'Tridec-', c3: '40', pre3: 'Tetracont-' },
          { c: '4', pre: 'But-', c2: '14', pre2: 'Tetradec-', c3: '50', pre3: 'Pentacont-' },
          { c: '5', pre: 'Pent-', c2: '15', pre2: 'Pentadec-', c3: '60', pre3: 'Hexacont-' },
          { c: '6', pre: 'Hex-', c2: '16', pre2: 'Hexadec-', c3: '70', pre3: 'Heptacont-' },
          { c: '7', pre: 'Hept-', c2: '17', pre2: 'Heptadec-', c3: '80', pre3: 'Octacont-' },
          { c: '8', pre: 'Oct-', c2: '18', pre2: 'Octadec-', c3: '90', pre3: 'Nonacont-' },
          { c: '9', pre: 'Non-', c2: '19', pre2: 'Nonadec-', c3: '100', pre3: 'Hect-' },
          { c: '10', pre: 'Dec-', c2: '20', pre2: 'Eicos-', c3: 'X', pre3: '-' },
        ]
      },
      {
        type: 'list',
        title: 'Pasos Generales para Nombrar (IUPAC)',
        content: [
          '1. Elegir la cadena principal: La más larga que contenga el grupo funcional principal.',
          '2. Numerar la cadena: Empezar por el extremo que otorgue los números más bajos al grupo funcional o sustituyentes.',
          '3. Nombrar sustituyentes: En orden alfabético (etil, metil, propil...).',
          '4. Ensamblar el nombre: Sustituyentes + Raíz (según # carbonos) + Sufijo (según grupo funcional).'
        ]
      }
    ],
    examples: [],
    quiz: [
      {
        id: 'intro1',
        question: '¿Qué prefijo se usa para una cadena principal de 4 carbonos?',
        options: ['Prop-', 'But-', 'Tetra-', 'Cuat-'],
        correctIndex: 1,
        explanation: 'El prefijo IUPAC para 4 carbonos es "But-".'
      },
      {
        id: 'intro2',
        question: '¿Cuántos enlaces forma el carbono en compuestos orgánicos neutros?',
        options: ['2', '3', '4', '6'],
        correctIndex: 2,
        explanation: 'El carbono es tetravalente en compuestos orgánicos estables.'
      },
      {
        id: 'intro3',
        question: '¿Qué hibridación corresponde a un enlace triple?',
        options: ['sp3', 'sp2', 'sp', 'spd'],
        correctIndex: 2,
        explanation: 'La hibridación sp genera geometría lineal característica de los triples enlaces.'
      }
    ]
  },
  {
    id: 'alcanos',
    title: '1. Alcanos (Parafinas)',
    shortTitle: 'Alcanos',
    description: 'Hidrocarburos saturados de cadena abierta. Fundamentos de la nomenclatura.',
    sections: [
      {
        type: 'text',
        content: 'Fórmula general: CnH2n+2. Solo contienen enlaces simples C-C y C-H. Todos los carbonos tienen hibridación sp3. Constituyen una serie homóloga donde cada término difiere del anterior en un grupo -CH2-.'
      },
      {
        type: 'text',
        title: '1. Propiedades Físicas y Químicas',
        content: 'Físicas: Son apolares e insolubles en agua (hidrofóbicos). Menos densos que el agua. Puntos de ebullición aumentan con la longitud de la cadena y disminuyen con las ramificaciones (menor superficie de contacto). Los primeros 4 son gases.\nQuímicas: Son poco reactivos (inertes). Reaccionan principalmente por combustión (exotérmica) y halogenación por radicales libres en presencia de luz UV.'
      },
      {
        type: 'list',
        title: '2. Reglas de Nomenclatura',
        content: [
          '1. Cadena Principal: Elegir la cadena continua de carbonos más larga.',
          '2. Numeración: Empezar por el extremo más cercano a la primera ramificación.',
          '3. Sustituyentes: Nombrar radicales alquilo (metil, etil...) alfabéticamente.',
          '4. Multiplicidad: Si un radical se repite, usar prefijos di-, tri-, tetra- (estos no cuentan para el orden alfabético).',
          '5. Nombre Final: Números separados por guiones, letras juntas. Terminación "-ano". Ej: 2,2-Dimetilbutano.'
        ]
      }
    ],
    examples: [
      { name: 'Metano', formula: 'CH4', smiles: 'C', description: 'El alcano más simple.' },
      { name: 'Etano', formula: 'C2H6', smiles: 'CC', description: 'Dos carbonos unidos.' },
      { name: 'Propano', formula: 'C3H8', smiles: 'CCC', description: 'Gas doméstico.' },
      { name: 'Butano', formula: 'C4H10', smiles: 'CCCC', description: 'Gas de encendedores.' },
      { name: 'Pentano', formula: 'C5H12', smiles: 'CCCCC', description: 'Líquido volátil.' },
      { name: '2-Metilpropano', formula: 'C4H10', smiles: 'CC(C)C', description: 'Isobutano. Isómero del butano.' },
      { name: '2-Metilbutano', formula: 'C5H12', smiles: 'CCC(C)C', description: 'Isopentano. Ramificado.' },
      { name: '2,2-Dimetilpropano', formula: 'C5H12', smiles: 'CC(C)(C)C', description: 'Neopentano. Carbono cuaternario central.' }
    ],
    quiz: [
      {
        id: 'alc1',
        question: '¿Cuál es el principal uso industrial de los alcanos?',
        options: ['Farmacéuticos', 'Combustibles', 'Colorantes', 'Explosivos'],
        correctIndex: 1,
        explanation: 'Debido a su alta entalpía de combustión, se usan como fuentes de energía.'
      },
      {
        id: 'alc2',
        question: '¿Cómo se llama el alcano de 3 carbonos?',
        options: ['Etano', 'Propano', 'Butano', 'Metano'],
        correctIndex: 1,
        explanation: 'Prefijo Prop- para 3 carbonos.'
      },
      {
        id: 'alc3',
        question: '¿Qué propiedad física caracteriza a los alcanos?',
        options: ['Solubles en agua', 'Conductores eléctricos', 'Insolubles en agua', 'Muy densos'],
        correctIndex: 2,
        explanation: 'Son apolares y no se mezclan con el agua.'
      }
    ]
  },
  {
    id: 'alquenos',
    title: '2. Alquenos (Olefinas)',
    shortTitle: 'Alquenos',
    description: 'Hidrocarburos insaturados con dobles enlaces carbono-carbono.',
    sections: [
      {
        type: 'text',
        content: 'Fórmula general: CnH2n (para un doble enlace). Contienen el grupo funcional doble enlace C=C. Los carbonos del doble enlace tienen hibridación sp2 y geometría trigonal plana.'
      },
      {
        type: 'text',
        title: '1. Propiedades',
        content: 'Físicas: Similares a los alcanos, insolubles en agua. Pueden presentar isomería geométrica (cis-trans o E-Z) debido a la restricción de rotación del doble enlace.\nQuímicas: Mucho más reactivos que los alcanos. Sufren reacciones de Adición Electrofílica (romper el enlace pi débil para añadir átomos), hidrogenación y polimerización.'
      },
      {
        type: 'list',
        title: '2. Reglas de Nomenclatura',
        content: [
          '1. Cadena Principal: La más larga que CONTENGA el doble enlace.',
          '2. Numeración: Empezar por el extremo más cercano al doble enlace (prioridad sobre ramificaciones).',
          '3. Sufijo: Cambiar la terminación "-ano" por "-eno".',
          '4. Posición: Indicar el número del primer carbono del doble enlace inmediatamente antes del sufijo (Ej: But-1-eno).',
          '5. Polialquenos: Si hay dos o más dobles enlaces, usar "-dieno", "-trieno". El localizador precede al sufijo. Ej: Buta-1,3-dieno.'
        ]
      }
    ],
    examples: [
      { name: 'Eteno', formula: 'C2H4', smiles: 'C=C', description: 'Etileno. Plásticos y maduración frutal.' },
      { name: 'Propeno', formula: 'C3H6', smiles: 'CC=C', description: 'Propileno. Polímeros.' },
      { name: 'But-1-eno', formula: 'C4H8', smiles: 'CCC=C', description: 'Doble enlace en el extremo.' },
      { name: 'But-2-eno', formula: 'C4H8', smiles: 'CC=CC', description: 'Doble enlace interno.' },
      { name: 'Pent-1-eno', formula: 'C5H10', smiles: 'CCCC=C', description: 'Alqueno líquido.' },
      { name: '2-Metilpropeno', formula: 'C4H8', smiles: 'CC(=C)C', description: 'Isobutileno.' },
      { name: 'Hex-1-eno', formula: 'C6H12', smiles: 'CCCCC=C', description: 'Cadena de 6 carbonos.' },
      { name: '3-Metilbut-1-eno', formula: 'C5H10', smiles: 'CC(C)C=C', description: 'Ramificación en carbono 3.' },
      { name: 'Buta-1,3-dieno', formula: 'C4H6', smiles: 'C=CC=C', description: 'Dieno conjugado. Monómero del caucho sintético.' },
      { name: 'Penta-1,3-dieno', formula: 'C5H8', smiles: 'CC=CC=C', description: 'Dieno conjugado de 5 carbonos. Dobles en C1 y C3.' },
      { name: 'Penta-1,4-dieno', formula: 'C5H8', smiles: 'C=CCC=C', description: 'Dieno aislado. Dobles en C1 y C4.' },
      { name: '2-Metilbuta-1,3-dieno', formula: 'C5H8', smiles: 'C=C(C)C=C', description: 'Isopreno. Monómero del caucho natural.' },
      { name: 'Hexa-2,4-dieno', formula: 'C6H10', smiles: 'CC=CC=CC', description: 'Dieno conjugado. Dobles en C2 y C4.' }
    ],
    quiz: [
      {
        id: 'alq1',
        question: '¿Qué tipo de reacción es típica de los alquenos?',
        options: ['Sustitución', 'Adición', 'Neutralización', 'Precipitación'],
        correctIndex: 1,
        explanation: 'Los reactivos se "añaden" al doble enlace rompiendo el enlace pi.'
      },
      {
        id: 'alq2',
        question: '¿Qué plástico se obtiene polimerizando el eteno?',
        options: ['PVC', 'Teflón', 'Polietileno', 'Poliestireno'],
        correctIndex: 2,
        explanation: 'El polietileno es el polímero del etileno (eteno).'
      }
    ]
  },
  {
    id: 'alquinos',
    title: '3. Alquinos (Acetilenos)',
    shortTitle: 'Alquinos',
    description: 'Hidrocarburos insaturados con triples enlaces.',
    sections: [
      {
        type: 'text',
        content: 'Fórmula general CnH2n-2. Caracterizados por el triple enlace C≡C. Los carbonos tienen hibridación sp y geometría lineal (180°).'
      },
      {
        type: 'text',
        title: '1. Propiedades',
        content: 'Físicas: Puntos de ebullición ligeramente más altos que alquenos. Insolubles en agua.\nQuímicas: Muy reactivos (tienen dos enlaces pi). Los alquinos terminales (R-C≡C-H) tienen un hidrógeno ligeramente ácido y pueden formar acetiluros metálicos.'
      },
      {
        type: 'list',
        title: '2. Reglas de Nomenclatura',
        content: [
          '1. Cadena Principal: La más larga que contenga el triple enlace.',
          '2. Numeración: Prioridad al triple enlace (extremo más cercano).',
          '3. Sufijo: Cambiar terminación por "-ino".',
          '4. Posición: Indicar localizador del triple enlace antes del sufijo (Ej: Pent-2-ino).',
          '5. Eninos: Si hay dobles y triples enlaces, la cadena se numera para dar los números más bajos al conjunto. Si hay empate, el doble enlace tiene preferencia en numeración, pero se nombra como "en-ino" (Ej: Hex-1-en-5-ino).'
        ]
      }
    ],
    examples: [
      { name: 'Etino', formula: 'C2H2', smiles: 'C#C', description: 'Acetileno. Soldadura.' },
      { name: 'Propino', formula: 'C3H4', smiles: 'CC#C', description: 'Alquino de 3 carbonos.' },
      { name: 'But-1-ino', formula: 'C4H6', smiles: 'CCC#C', description: 'Triple enlace terminal.' },
      { name: 'But-2-ino', formula: 'C4H6', smiles: 'CC#CC', description: 'Triple enlace interno.' },
      { name: 'Pent-1-ino', formula: 'C5H8', smiles: 'CCCC#C', description: 'Líquido incoloro.' },
      { name: 'Pent-2-ino', formula: 'C5H8', smiles: 'CCC#CC', description: 'Isómero de posición del pent-1-ino.' },
      { name: '4-Metilpent-2-ino', formula: 'C6H10', smiles: 'CC(C)C#CC', description: 'Ramificación en el carbono 4.' },
      { name: 'Hex-1-ino', formula: 'C6H10', smiles: 'CCCCC#C', description: 'Cadena lineal de 6.' },
      { name: 'Buta-1,3-diino', formula: 'C4H2', smiles: 'C#CC#C', description: 'Diino: dos triples enlaces conjugados.' },
      { name: 'Penta-1,4-diino', formula: 'C5H4', smiles: 'C#CCC#C', description: 'Diino: triples en C1 y C4 (aislados).' },
      { name: '3-Metilbut-1-ino', formula: 'C5H8', smiles: 'C#CC(C)C', description: 'Triple enlace terminal con ramificación en C3.' },
      { name: '4-Metilpent-1-ino', formula: 'C6H10', smiles: 'C#CCC(C)C', description: 'Triple enlace terminal con metilo en C4.' }
    ],
    quiz: [
      {
        id: 'alqino1',
        question: '¿Cuál es el uso principal del etino?',
        options: ['Anestésico', 'Combustible de autos', 'Soldadura oxiacetilénica', 'Fertilizante'],
        correctIndex: 2,
        explanation: 'Su combustión con oxígeno puro genera temperaturas extremas para fundir metales.'
      },
      {
        id: 'alqino2',
        question: '¿Cuántos enlaces pi tiene un triple enlace?',
        options: ['0', '1', '2', '3'],
        correctIndex: 2,
        explanation: 'El triple enlace consiste en 1 enlace sigma y 2 enlaces pi.'
      }
    ]
  },
  {
    id: 'cicloalcanos',
    title: '4. Cicloalcanos',
    shortTitle: 'Cicloalcanos',
    description: 'Cadenas cerradas de carbono saturado.',
    sections: [
      {
        type: 'text',
        content: 'Alcanos cíclicos con fórmula CnH2n (isómeros funcionales de los alquenos). Se nombran anteponiendo el prefijo "Ciclo-" al nombre del alcano.'
      },
      {
        type: 'text',
        title: '1. Propiedades y Tensión',
        content: 'Puntos de ebullición y fusión más altos que sus análogos lineales por mayor simetría y empaquetamiento. El Ciclopropano y ciclobutano son inestables debido a la "tensión angular" (ángulos de enlace forzados menores a 109.5°). El ciclohexano es muy estable y adopta conformación de "silla" para aliviar tensión.'
      },
      {
        type: 'list',
        title: '2. Reglas de Nomenclatura',
        content: [
          '1. Cadena Principal: El ciclo es la principal, a menos que la cadena abierta unida sea más grande.',
          '2. Prefijo: Añadir "Ciclo-" al nombre del alcano correspondiente (Ciclopropano, Ciclohexano).',
          '3. Numeración: Si hay un solo sustituyente, no se numera (es el carbono 1 implícito). Si hay dos o más, se numera para otorgar los localizadores más bajos posibles, siguiendo orden alfabético en caso de empate.',
          'Ejemplo: 1-Etil-2-metilciclohexano.'
        ]
      }
    ],
    examples: [
      { name: 'Ciclopropano', formula: 'C3H6', smiles: 'C1CC1', description: 'Anillo de 3 carbonos. Muy tenso.' },
      { name: 'Ciclobutano', formula: 'C4H8', smiles: 'C1CCC1', description: 'Anillo de 4 carbonos.' },
      { name: 'Ciclopentano', formula: 'C5H10', smiles: 'C1CCCC1', description: 'Anillo de 5. Estable.' },
      { name: 'Ciclohexano', formula: 'C6H12', smiles: 'C1CCCCC1', description: 'Anillo de 6. Materia prima del Nylon.' },
      { name: 'Cicloheptano', formula: 'C7H14', smiles: 'C1CCCCCC1', description: 'Anillo de 7 carbonos.' },
      { name: 'Metilciclopentano', formula: 'C6H12', smiles: 'CC1CCCC1', description: 'Sustituyente metil en anillo de 5.' },
      { name: 'Metilciclohexano', formula: 'C7H14', smiles: 'CC1CCCCC1', description: 'Disolvente común.' },
      { name: '1,1-Dimetilciclohexano', formula: 'C8H16', smiles: 'CC1(C)CCCCC1', description: 'Dos metiles en el mismo carbono.' }
    ],
    quiz: [
      {
        id: 'ciclo1',
        question: '¿Qué cicloalcano es el más utilizado para sintetizar Nylon?',
        options: ['Ciclopropano', 'Ciclobutano', 'Ciclopentano', 'Ciclohexano'],
        correctIndex: 3,
        explanation: 'El ciclohexano se oxida para producir los precursores del Nylon.'
      },
      {
        id: 'ciclo2',
        question: '¿Por qué el ciclopropano es inestable?',
        options: ['Alta masa molecular', 'Tensión angular extrema (60°)', 'Muchos hidrógenos', 'Es aromático'],
        correctIndex: 1,
        explanation: 'Los ángulos de enlace forzados a 60° crean mucha tensión en la molécula.'
      }
    ]
  },
  {
    id: 'alcoholes',
    title: '5. Alcoholes',
    shortTitle: 'Alcoholes',
    description: 'Compuestos con grupo Hidroxilo (-OH).',
    sections: [
      {
        type: 'text',
        content: 'Compuestos orgánicos que contienen el grupo funcional -OH unido a un carbono saturado (sp3). Se clasifican en primarios, secundarios o terciarios según el carbono al que se une el -OH.'
      },
      {
        type: 'text',
        title: '1. Propiedades',
        content: 'Físicas: Muy polares. Forman puentes de hidrógeno fuertes entre sus moléculas, elevando sus puntos de ebullición. Los de cadena corta (C1-C3) son totalmente solubles en agua.\nQuímicas: Comportamiento anfótero (pueden actuar como ácidos muy débiles o bases débiles). Se oxidan a aldehídos (si son 1°) o cetonas (si son 2°). Se deshidratan para formar alquenos.'
      },
      {
        type: 'list',
        title: '2. Reglas de Nomenclatura',
        content: [
          '1. Prioridad: El grupo -OH tiene prioridad sobre dobles enlaces, triples enlaces y halogenuros.',
          '2. Cadena Principal: La más larga que contenga al carbono unido al -OH.',
          '3. Numeración: Empezar por el extremo más cercano al -OH.',
          '4. Sufijo: Cambiar la terminación "-o" del alcano por "-ol".',
          '5. Polialcoholes: Usar "diol", "triol" si hay varios grupos OH. El localizador va inmediatamente antes del sufijo (Ej: Etano-1,2-diol).'
        ]
      }
    ],
    examples: [
      { name: 'Metanol', formula: 'CH3OH', smiles: 'CO', description: 'Alcohol de madera. Tóxico.' },
      { name: 'Etanol', formula: 'C2H5OH', smiles: 'CCO', description: 'Alcohol de bebidas.' },
      { name: 'Propan-1-ol', formula: 'C3H8O', smiles: 'CCCO', description: 'n-Propanol. Primario.' },
      { name: 'Propan-2-ol', formula: 'C3H8O', smiles: 'CC(O)C', description: 'Isopropanol. Secundario.' },
      { name: 'Butan-1-ol', formula: 'C4H10O', smiles: 'CCCCO', description: 'Disolvente industrial.' },
      { name: 'Butan-2-ol', formula: 'C4H10O', smiles: 'CCC(O)C', description: 'Alcohol secundario quiral.' },
      { name: '2-Metilpropan-1-ol', formula: 'C4H10O', smiles: 'CC(C)CO', description: 'Isobutanol.' },
      { name: '2-Metilpropan-2-ol', formula: 'C4H10O', smiles: 'CC(C)(O)C', description: 'terc-Butanol. Terciario.' },
      { name: 'Etano-1,2-diol', formula: 'C2H6O2', smiles: 'OCCO', description: 'Etilenglicol. Anticongelante. Dos -OH.' },
      { name: 'Propano-1,2-diol', formula: 'C3H8O2', smiles: 'CC(O)CO', description: 'Propilenglicol. Dos -OH. Aditivo alimentario.' },
      { name: 'Propano-1,3-diol', formula: 'C3H8O2', smiles: 'OCCCO', description: 'Diol con -OH en extremos opuestos.' },
      { name: 'Propano-1,2,3-triol', formula: 'C3H8O3', smiles: 'OCC(O)CO', description: 'Glicerol. Tres -OH. Espina dorsal de las grasas.' },
      { name: 'Butano-1,4-diol', formula: 'C4H10O2', smiles: 'OCCCCO', description: 'Diol simétrico. Precursor del THF y Nylon-4,4.' },
      { name: 'Butano-2,3-diol', formula: 'C4H10O2', smiles: 'CC(O)C(O)C', description: 'Diol con ambos -OH en posiciones internas.' }
    ],
    quiz: [
      {
        id: 'alcOH1',
        question: '¿Qué alcohol es seguro para consumo humano en moderación?',
        options: ['Metanol', 'Etanol', 'Isopropanol', 'Butanol'],
        correctIndex: 1,
        explanation: 'El etanol es el único alcohol metabolizable de forma relativamente segura en bebidas.'
      },
      {
        id: 'alcOH2',
        question: '¿Por qué los alcoholes son solubles en agua?',
        options: ['Por ser iónicos', 'Forman puentes de hidrógeno con el agua', 'Son apolares', 'Tienen baja densidad'],
        correctIndex: 1,
        explanation: 'El grupo -OH es muy afín al agua mediante puentes de hidrógeno.'
      }
    ]
  },
  {
    id: 'aldehidos',
    title: '6. Aldehídos',
    shortTitle: 'Aldehídos',
    description: 'Grupo Carbonilo terminal (-CHO).',
    sections: [
      {
        type: 'text',
        content: 'Contienen el grupo carbonilo (C=O) en el extremo de una cadena carbonada. El carbono del carbonilo está unido a al menos un hidrógeno. Sufijo IUPAC: "-al".'
      },
      {
        type: 'text',
        title: '1. Propiedades',
        content: 'Físicas: Puntos de ebullición más bajos que los alcoholes (no forman puentes de H entre sí) pero más altos que los alcanos. Olores penetrantes en cadenas cortas y frutales en cadenas medias.\nQuímicas: Se oxidan fácilmente a ácidos carboxílicos (son agentes reductores, dan positivo en prueba de Tollens). Sufren adición nucleofílica.'
      },
      {
        type: 'list',
        title: '2. Reglas de Nomenclatura',
        content: [
          '1. Prioridad: Mayor que alcoholes, cetonas y aminas.',
          '2. Cadena Principal: La más larga que contenga el grupo carbonilo (-CHO).',
          '3. Numeración: El carbono del carbonilo SIEMPRE es el número 1 (no se necesita indicar su posición).',
          '4. Sufijo: Cambiar "-o" por "-al" (Etanal, Propanal).',
          '5. Dialdehídos: Si hay dos grupos -CHO en los extremos, usar sufijo "-dial" (Ej: Butanodial o Butano-1,4-dial).'
        ]
      }
    ],
    examples: [
      { name: 'Metanal', formula: 'HCHO', smiles: 'C=O', description: 'Formaldehído. Conservante.' },
      { name: 'Etanal', formula: 'C2H4O', smiles: 'CC=O', description: 'Acetaldehído.' },
      { name: 'Propanal', formula: 'C3H6O', smiles: 'CCC=O', description: 'Aldehído de 3 carbonos.' },
      { name: 'Butanal', formula: 'C4H8O', smiles: 'CCCC=O', description: 'Olor acre.' },
      { name: 'Pentanal', formula: 'C5H10O', smiles: 'CCCCC=O', description: 'Valeraldehído.' },
      { name: 'Hexanal', formula: 'C6H12O', smiles: 'CCCCCC=O', description: 'Olor a hierba cortada.' },
      { name: '2-Metilpropanal', formula: 'C4H8O', smiles: 'CC(C)C=O', description: 'Isobutiraldehído.' },
      { name: '3-Metilbutanal', formula: 'C5H10O', smiles: 'CC(C)CC=O', description: 'Isovaleraldehído.' }
    ],
    quiz: [
      {
        id: 'ald1',
        question: '¿Qué compuesto se usa para conservar cadáveres y tejidos?',
        options: ['Etanol', 'Metanal (Formol)', 'Acetona', 'Vinagre'],
        correctIndex: 1,
        explanation: 'El formaldehído desnaturaliza proteínas evitando la descomposición.'
      },
      {
        id: 'ald2',
        question: 'La oxidación de un aldehído produce:',
        options: ['Un alcohol', 'Una cetona', 'Un ácido carboxílico', 'Un éster'],
        correctIndex: 2,
        explanation: 'El grupo -CHO gana un oxígeno convirtiéndose en -COOH.'
      }
    ]
  },
  {
    id: 'cetonas',
    title: '7. Cetonas',
    shortTitle: 'Cetonas',
    description: 'Grupo Carbonilo interno (R-CO-R).',
    sections: [
      {
        type: 'text',
        content: 'Contienen el grupo carbonilo (C=O) unido a dos átomos de carbono. Nunca están en los extremos. Sufijo IUPAC: "-ona". Se debe indicar la posición del grupo carbonilo con un número localizador.'
      },
      {
        type: 'text',
        title: '1. Propiedades',
        content: 'Físicas: Buenos disolventes orgánicos. Volátiles y olores agradables en general. Polares.\nQuímicas: Menos reactivas que los aldehídos (el carbono es menos electrófilo por efecto inductivo de los grupos alquilo). No se oxidan fácilmente (no reaccionan con Tollens).'
      },
      {
        type: 'list',
        title: '2. Reglas de Nomenclatura',
        content: [
          '1. Prioridad: Mayor que alcoholes, pero menor que aldehídos y ácidos.',
          '2. Cadena Principal: La más larga que contenga el grupo carbonilo.',
          '3. Numeración: Empezar por el extremo más cercano al grupo C=O.',
          '4. Sufijo: Cambiar "-o" por "-ona".',
          '5. Posición: Indicar el número del carbono carbonílico antes del sufijo (Ej: Pentan-2-ona).'
        ]
      }
    ],
    examples: [
      { name: 'Propanona', formula: 'C3H6O', smiles: 'CC(=O)C', description: 'Acetona. Disolvente común.' },
      { name: 'Butanona', formula: 'C4H8O', smiles: 'CCC(=O)C', description: 'Metil etil cetona (MEK).' },
      { name: 'Pentan-2-ona', formula: 'C5H10O', smiles: 'CCCC(=O)C', description: 'Metil propil cetona.' },
      { name: 'Pentan-3-ona', formula: 'C5H10O', smiles: 'CCC(=O)CC', description: 'Dietil cetona. Simétrica.' },
      { name: 'Hexan-2-ona', formula: 'C6H12O', smiles: 'CCCCC(=O)C', description: 'Cetona de 6 carbonos.' },
      { name: 'Hexan-3-ona', formula: 'C6H12O', smiles: 'CCCC(=O)CC', description: 'Etil propil cetona.' },
      { name: '3-Metilbutan-2-ona', formula: 'C5H10O', smiles: 'CC(C)C(=O)C', description: 'Isopropil metil cetona.' },
      { name: '3,3-Dimetilbutan-2-ona', formula: 'C6H12O', smiles: 'CC(C)(C)C(=O)C', description: 'Pinacolona.' }
    ],
    quiz: [
      {
        id: 'cet1',
        question: '¿Cuál es la diferencia estructural entre aldehído y cetona?',
        options: ['El número de oxígenos', 'La posición del grupo carbonilo', 'El tipo de enlace doble', 'La solubilidad'],
        correctIndex: 1,
        explanation: 'Aldehído: Carbonilo terminal. Cetona: Carbonilo interno.'
      },
      {
        id: 'cet2',
        question: 'Disolvente común quitaesmalte:',
        options: ['Etanol', 'Acetona', 'Formol', 'Benceno'],
        correctIndex: 1,
        explanation: 'La acetona (propanona) es el disolvente estándar para esmaltes.'
      }
    ]
  },
  {
    id: 'eteres',
    title: '8. Éteres',
    shortTitle: 'Éteres',
    description: 'Oxígeno puente entre carbonos (R-O-R).',
    sections: [
      {
        type: 'text',
        content: 'Compuestos donde un átomo de oxígeno une dos cadenas de hidrocarburos. Se pueden nombrar como alcoxi-alcanos (IUPAC sistemática) o alquil alquil éter (común).'
      },
      {
        type: 'text',
        title: '1. Propiedades',
        content: 'Físicas: Muy volátiles y altamente inflamables. Puntos de ebullición bajos (similares a alcanos) porque no forman puentes de H entre sí. Son ligeramente solubles en agua.\nQuímicas: Extraordinariamente inertes. No reaccionan con ácidos diluidos, bases ni oxidantes comunes, lo que los hace excelentes disolventes de reacción. Peligro: Forman peróxidos explosivos al contacto con aire y luz.'
      },
      {
        type: 'list',
        title: '2. Reglas de Nomenclatura',
        content: [
          '1. Nomenclatura Sustitutiva (IUPAC preferida): Se considera el grupo más pequeño (RO-) como un sustituyente "alcoxi" unido a la cadena principal (el alcano más largo).',
          'Ejemplo: CH3-O-CH2-CH3 se nombra Metoxietano (Metoxi + Etano).',
          '2. Nomenclatura Funcional (Común): Se nombran los dos grupos alquilo en orden alfabético terminados en "-il" y luego la palabra "éter", o "Éter" + radical1 + radical2 + "ílico".',
          'Ejemplo: Etil metil éter.'
        ]
      }
    ],
    examples: [
      { name: 'Metoximetano', formula: 'C2H6O', smiles: 'COC', description: 'Dimetil éter. Gas.' },
      { name: 'Metoxietano', formula: 'C3H8O', smiles: 'CCOC', description: 'Etil metil éter.' },
      { name: 'Etoxietano', formula: 'C4H10O', smiles: 'CCOCC', description: 'Dietil éter. Anestésico histórico.' },
      { name: '1-Metoxipropano', formula: 'C4H10O', smiles: 'CCCOC', description: 'Metil propil éter.' },
      { name: '2-Metoxipropano', formula: 'C4H10O', smiles: 'CC(C)OC', description: 'Isopropil metil éter.' },
      { name: '1-Etoxipropano', formula: 'C5H12O', smiles: 'CCCOCC', description: 'Etil propil éter.' },
      { name: '1-Metoxibutano', formula: 'C5H12O', smiles: 'CCCCOC', description: 'Butil metil éter.' },
      { name: '2-Isopropoxipropano', formula: 'C6H14O', smiles: 'CC(C)OC(C)C', description: 'Diisopropil éter.' }
    ],
    quiz: [
      {
        id: 'eter1',
        question: '¿Por qué los éteres se usan como disolventes de reacción?',
        options: ['Son muy reactivos', 'Son ácidos fuertes', 'Son químicamente inertes', 'Son sólidos'],
        correctIndex: 2,
        explanation: 'Su falta de reactividad permite disolver reactivos sin interferir en la reacción química.'
      },
      {
        id: 'eter2',
        question: 'Peligro principal del dietil éter en laboratorio:',
        options: ['Toxicidad extrema', 'Inflamabilidad y formación de peróxidos', 'Corrosividad', 'Radioactividad'],
        correctIndex: 1,
        explanation: 'Es extremadamente inflamable y puede formar peróxidos explosivos al almacenarse.'
      }
    ]
  },
  {
    id: 'acidos',
    title: '9. Ácidos Carboxílicos',
    shortTitle: 'Ác. Carboxílicos',
    description: 'Grupo Carboxilo (-COOH). Ácidos débiles.',
    sections: [
      {
        type: 'text',
        content: 'Contienen el grupo funcional carboxilo (-COOH) en el extremo. Es el grupo con mayor prioridad en nomenclatura orgánica básica. Sufijo: "ácido ...-oico".'
      },
      {
        type: 'text',
        title: '1. Propiedades',
        content: 'Físicas: Puntos de ebullición muy altos, incluso mayores que alcoholes, debido a la formación de dímeros estables por doble puente de hidrógeno. Olores fuertes y desagradables en cadenas medias (olor a cabra, sudor, rancio).\nQuímicas: Son ácidos débiles (pH 3-5). Reaccionan con bases para formar sales (neutralización) y con alcoholes para formar ésteres.'
      },
      {
        type: 'list',
        title: '2. Reglas de Nomenclatura',
        content: [
          '1. Prioridad: MÁXIMA. Tienen preferencia sobre todos los demás grupos.',
          '2. Cadena Principal: La más larga que contenga el grupo carboxilo (-COOH).',
          '3. Numeración: El carbono del carboxilo es SIEMPRE el número 1.',
          '4. Construcción: Palabra "Ácido" + raíz de la cadena + sufijo "-oico".',
          'Ejemplo: Ácido propanoico, Ácido 3-metilbutanoico.'
        ]
      }
    ],
    examples: [
      { name: 'Ácido metanoico', formula: 'HCOOH', smiles: 'OC=O', description: 'Ácido fórmico. Hormigas.' },
      { name: 'Ácido etanoico', formula: 'CH3COOH', smiles: 'CC(=O)O', description: 'Ácido acético. Vinagre.' },
      { name: 'Ácido propanoico', formula: 'C3H6O2', smiles: 'CCC(=O)O', description: 'Conservante.' },
      { name: 'Ácido butanoico', formula: 'C4H8O2', smiles: 'CCCC(=O)O', description: 'Olor a mantequilla rancia.' },
      { name: 'Ácido pentanoico', formula: 'C5H10O2', smiles: 'CCCCC(=O)O', description: 'Ácido valérico.' },
      { name: 'Ácido hexanoico', formula: 'C6H12O2', smiles: 'CCCCCC(=O)O', description: 'Ácido caproico (olor a cabra).' },
      { name: 'Ácido 2-metilpropanoico', formula: 'C4H8O2', smiles: 'CC(C)C(=O)O', description: 'Ácido isobutírico.' },
      { name: 'Ácido 3-metilbutanoico', formula: 'C5H10O2', smiles: 'CC(C)CC(=O)O', description: 'Ácido isovalérico.' }
    ],
    quiz: [
      {
        id: 'acid1',
        question: '¿Por qué hierven a temperaturas tan altas?',
        options: ['Son iónicos', 'Forman dímeros estables por puentes de hidrógeno', 'Tienen alto peso molecular', 'Son sólidos'],
        correctIndex: 1,
        explanation: 'Dos moléculas se unen fuertemente formando un par (dímero).'
      },
      {
        id: 'acid2',
        question: 'Componente ácido del vinagre:',
        options: ['Fórmico', 'Cítrico', 'Acético', 'Sulfúrico'],
        correctIndex: 2,
        explanation: 'El vinagre es una solución al 4-8% de ácido acético (etanoico).'
      }
    ]
  },
  {
    id: 'esteres',
    title: '10. Ésteres',
    shortTitle: 'Ésteres',
    description: 'Derivados de ácido responsables de aromas frutales.',
    sections: [
      {
        type: 'text',
        content: 'Compuestos derivados de los ácidos carboxílicos donde el hidrógeno del grupo -OH es sustituido por un grupo alquilo (R-COO-R\'). Nomenclatura: "...-ato de ...-ilo" (ej: Etanoato de metilo).'
      },
      {
        type: 'text',
        title: '1. Propiedades',
        content: 'Físicas: Moléculas polares pero sin capacidad de donar puentes de hidrógeno, por lo que hierven a menor temperatura que los ácidos. Muchos tienen olores agradables a frutas y flores.\nQuímicas: Sufren hidrólisis (ruptura con agua) para volver a dar ácido y alcohol. Con bases fuertes sufren saponificación (formación de jabón).'
      },
      {
        type: 'list',
        title: '2. Reglas de Nomenclatura',
        content: [
          '1. Estructura: Tienen dos partes: la que viene del ácido (R-C=O) y la que viene del alcohol (O-R\').',
          '2. Parte ácida: Se nombra contando los carbonos (incluyendo el carbonilo) y cambiando "-ico" del ácido por "-ato".',
          '3. Conector: Se usa la preposición "de".',
          '4. Parte alcohólica: Se nombra el grupo alquilo unido al oxígeno simple terminado en "-ilo".',
          'Ejemplo: CH3-COO-CH3 -> (2 carbonos ácido = Etanoato) de (1 carbono alcohol = metilo) = Etanoato de metilo.'
        ]
      }
    ],
    examples: [
      { name: 'Metanoato de metilo', formula: 'C2H4O2', smiles: 'COC=O', description: 'Éster más simple.' },
      { name: 'Etanoato de metilo', formula: 'C3H6O2', smiles: 'COC(=O)C', description: 'Disolvente.' },
      { name: 'Metanoato de etilo', formula: 'C3H6O2', smiles: 'CCOC=O', description: 'Sabor a ron.' },
      { name: 'Etanoato de etilo', formula: 'C4H8O2', smiles: 'CCOC(=O)C', description: 'Acetato de etilo. Pegamento.' },
      { name: 'Propanoato de etilo', formula: 'C5H10O2', smiles: 'CCOC(=O)CC', description: 'Olor a piña/pera.' },
      { name: 'Butanoato de metilo', formula: 'C5H10O2', smiles: 'COC(=O)CCC', description: 'Olor a manzana.' },
      { name: 'Etanoato de propilo', formula: 'C5H10O2', smiles: 'CCCOC(=O)C', description: 'Olor a pera.' },
      { name: 'Butanoato de etilo', formula: 'C6H12O2', smiles: 'CCOC(=O)CCC', description: 'Olor a piña.' }
    ],
    quiz: [
      {
        id: 'ester1',
        question: '¿Qué se obtiene al calentar un ácido con un alcohol?',
        options: ['Un éter', 'Un éster y agua', 'Una cetona', 'Un alqueno'],
        correctIndex: 1,
        explanation: 'Es la reacción de esterificación de Fischer.'
      },
      {
        id: 'ester2',
        question: '¿Qué es la saponificación?',
        options: ['Hacer jabón a partir de ésteres (grasas)', 'Hacer perfume', 'Quemar un éster', 'Congelar aceite'],
        correctIndex: 0,
        explanation: 'Hidrólisis básica de grasas (ésteres) para dar sales de ácidos grasos (jabón).'
      }
    ]
  },
  {
    id: 'halogenuros',
    title: '11. Halogenuros de Alquilo',
    shortTitle: 'Halogenuros',
    description: 'Sustitución de hidrógenos por halógenos (F, Cl, Br, I).',
    sections: [
      {
        type: 'text',
        content: 'Derivados de alcanos donde uno o más hidrógenos se reemplazan por átomos de halógeno (Grupo 17). Se nombran como sustituyentes (Fluoro-, Cloro-, Bromo-, Yodo-).'
      },
      {
        type: 'text',
        title: '1. Propiedades',
        content: 'Físicas: Polares, insolubles en agua. Tienen densidades más altas que los alcanos y el agua (especialmente bromuros y yoduros). Puntos de ebullición aumentan con el tamaño del halógeno (I > Br > Cl > F).\nQuímicas: El enlace C-X está polarizado, haciendo al carbono electrófilo. Sufren reacciones de Sustitución Nucleofílica (SN1, SN2) y Eliminación.'
      },
      {
        type: 'list',
        title: '2. Reglas de Nomenclatura',
        content: [
          '1. Prioridad: Se consideran SUSTITUYENTES, igual que los grupos alquilo (metil, etil). No tienen prioridad sobre alcoholes o insaturaciones.',
          '2. Nombres: Se usan los prefijos "Fluoro-", "Cloro-", "Bromo-", "Yodo-".',
          '3. Numeración: Se numera la cadena para dar los localizadores más bajos a los sustituyentes (sean halógenos o alquilos). Si hay empate, rige el orden alfabético.',
          'Ejemplo: 2-Cloropropano.'
        ]
      }
    ],
    examples: [
      { name: 'Clorometano', formula: 'CH3Cl', smiles: 'CCl', description: 'Cloruro de metilo.' },
      { name: 'Diclorometano', formula: 'CH2Cl2', smiles: 'ClCCl', description: 'Disolvente DCM.' },
      { name: 'Triclorometano', formula: 'CHCl3', smiles: 'ClC(Cl)Cl', description: 'Cloroformo.' },
      { name: 'Bromometano', formula: 'CH3Br', smiles: 'CBr', description: 'Fumigante.' },
      { name: 'Yodoetano', formula: 'C2H5I', smiles: 'CCI', description: 'Líquido denso.' },
      { name: '2-Cloropropano', formula: 'C3H7Cl', smiles: 'CC(Cl)C', description: 'Cloruro de isopropilo.' },
      { name: '1-Bromobutano', formula: 'C4H9Br', smiles: 'CCCCBr', description: 'Bromuro de n-butilo.' },
      { name: '2-Cloro-2-metilpropano', formula: 'C4H9Cl', smiles: 'CC(C)(Cl)C', description: 'Cloruro de terc-butilo.' },
      { name: '1-Cloro-2-metilpropano', formula: 'C4H9Cl', smiles: 'ClCC(C)C', description: 'Cl en C1 con ramificación metilo en C2.' },
      { name: '2-Bromo-2-metilpropano', formula: 'C4H9Br', smiles: 'CC(C)(Br)C', description: 'Carbono terciario con bromo. Bromuro de terc-butilo.' },
      { name: '2,2-Dicloropropano', formula: 'C3H6Cl2', smiles: 'CC(Cl)(Cl)C', description: 'Dos Cl en el mismo carbono central.' },
      { name: '2-Bromo-3-metilbutano', formula: 'C5H11Br', smiles: 'CC(Br)C(C)C', description: 'Bromo en C2 y metilo en C3.' },
      { name: '2-Cloro-2-metilbutano', formula: 'C5H11Cl', smiles: 'CCC(C)(Cl)C', description: 'Carbono terciario clorado con cadena de 4C.' },
      { name: '2,2-Diclorobutano', formula: 'C4H8Cl2', smiles: 'CCC(Cl)(Cl)C', description: 'Dos Cl en C2 de una cadena de 4 carbonos.' }
    ],
    quiz: [
      {
        id: 'halo1',
        question: '¿Qué tendencia siguen los puntos de ebullición?',
        options: ['F > Cl > Br', 'I > Br > Cl > F', 'Todos son iguales', 'F > I'],
        correctIndex: 1,
        explanation: 'A mayor masa y polarizabilidad del halógeno (I), mayor punto de ebullición.'
      },
      {
        id: 'halo2',
        question: 'Nombre IUPAC de CHCl3',
        options: ['Cloroformo', 'Triclorometano', 'Cloruro de metilo', 'Carbono clorado'],
        correctIndex: 1,
        explanation: 'Tiene 3 cloros en un carbono (metano).'
      }
    ]
  },
  {
    id: 'aminas',
    title: '12. Aminas',
    shortTitle: 'Aminas',
    description: 'Compuestos nitrogenados básicos derivados del amoníaco.',
    sections: [
      {
        type: 'text',
        content: 'Derivados del amoníaco (NH3) donde se sustituyen hidrógenos por cadenas de carbono. Se clasifican en primarias (R-NH2), secundarias (R2NH) y terciarias (R3N). Sufijo: "-amina".'
      },
      {
        type: 'text',
        title: '1. Propiedades',
        content: 'Físicas: Olores fuertes y desagradables (a pescado o descomposición). Primarias y secundarias forman puentes de H.\nQuímicas: Son BASES débiles (aceptan protones H+) debido al par libre de electrones del nitrógeno. Reaccionan con ácidos para formar sales de amonio solubles.'
      },
      {
        type: 'list',
        title: '2. Reglas de Nomenclatura',
        content: [
          '1. Aminas Primarias: Se elige la cadena más larga con el N. Se numera para dar al grupo amino la menor posición. Sufijo "-amina" con el localizador inmediatamente antes (Ej: Propan-1-amina).',
          '2. Aminas Secundarias y Terciarias: Se toma el radical más grande como cadena principal. Los otros radicales unidos al nitrógeno se nombran como sustituyentes usando la letra "N" como localizador.',
          'Ejemplo: N-Metiletanamina (Cadena principal etano, radical metil en el N).'
        ]
      }
    ],
    examples: [
      { name: 'Metanamina', formula: 'CH3NH2', smiles: 'CN', description: 'Metilamina. Gas.' },
      { name: 'Etanamina', formula: 'C2H5NH2', smiles: 'CCN', description: 'Etilamina.' },
      { name: 'Propan-1-amina', formula: 'C3H7NH2', smiles: 'CCCN', description: 'Propilamina.' },
      { name: 'Propan-2-amina', formula: 'C3H7NH2', smiles: 'CC(N)C', description: 'Isopropilamina.' },
      { name: 'N-Metilmetanamina', formula: 'C2H7N', smiles: 'CNC', description: 'Dimetilamina (secundaria).' },
      { name: 'N-Metiletanamina', formula: 'C3H9N', smiles: 'CCNC', description: 'Etilmetilamina.' },
      { name: 'N,N-Dimetilmetanamina', formula: 'C3H9N', smiles: 'CN(C)C', description: 'Trimetilamina (olor a pescado).' },
      { name: 'Butan-1-amina', formula: 'C4H11N', smiles: 'CCCCN', description: 'Butilamina.' }
    ],
    quiz: [
      {
        id: 'amin1',
        question: '¿Qué carácter químico tienen las aminas?',
        options: ['Ácido fuerte', 'Ácido débil', 'Base débil', 'Neutro'],
        correctIndex: 2,
        explanation: 'El par de electrones libres en el nitrógeno les confiere basicidad.'
      },
      {
        id: 'amin2',
        question: 'Compuesto responsable del olor a pescado:',
        options: ['Etanol', 'Ácido acético', 'Aminas (trimetilamina)', 'Ésteres'],
        correctIndex: 2,
        explanation: 'Las aminas volátiles tienen olores muy fuertes y desagradables.'
      }
    ]
  },
  {
    id: 'amidas',
    title: '13. Amidas',
    shortTitle: 'Amidas',
    description: 'Derivados de ácido con nitrógeno. Enlace peptídico.',
    sections: [
      {
        type: 'text',
        content: 'Compuestos con el grupo funcional R-CO-NR2. Se forman teóricamente al sustituir el -OH de un ácido por un grupo amino. Sufijo: "-amida".'
      },
      {
        type: 'text',
        title: '1. Propiedades',
        content: 'Físicas: Sólidos cristalinos (excepto formamida) con puntos de fusión altos por fuertes puentes de hidrógeno. Muy polares.\nQuímicas: Son NEUTRAS (no son básicas como las aminas) debido a la resonancia del par libre del nitrógeno con el grupo carbonilo. Muy estables y resistentes a la hidrólisis (base de las proteínas).'
      },
      {
        type: 'list',
        title: '2. Reglas de Nomenclatura',
        content: [
          '1. Principal: Se consideran derivadas de ácidos carboxílicos. Se sustituye el sufijo "-oico" por "-amida" y se elimina la palabra ácido.',
          '2. Carbono 1: Es siempre el carbono del grupo carbonilo.',
          '3. Sustituyentes en N: Si el nitrógeno tiene radicales alquilo, se indican con el localizador "N-".',
          'Ejemplo: N-Etil-N-metiletananamida.'
        ]
      }
    ],
    examples: [
      { name: 'Metanamida', formula: 'HCONH2', smiles: 'NC=O', description: 'Formamida. Líquida.' },
      { name: 'Etanamida', formula: 'C2H5NO', smiles: 'CC(N)=O', description: 'Acetamida. Sólido.' },
      { name: 'Propanamida', formula: 'C3H7NO', smiles: 'CCC(N)=O', description: 'Amida de 3 carbonos.' },
      { name: 'Butanamida', formula: 'C4H9NO', smiles: 'CCCC(N)=O', description: 'Butiramida.' },
      { name: 'N-Metiletanamida', formula: 'C3H7NO', smiles: 'CNC(C)=O', description: 'Amida sustituida en N.' },
      { name: 'N,N-Dimetiletanamida', formula: 'C4H9NO', smiles: 'CN(C)C(C)=O', description: 'DMA (Dimetilacetamida).' },
      { name: 'N-Etilpropanamida', formula: 'C5H11NO', smiles: 'CCNC(=O)CC', description: 'N-Etilpropionamida.' },
      { name: 'Pentanamida', formula: 'C5H11NO', smiles: 'CCCCC(N)=O', description: 'Valeramida.' }
    ],
    quiz: [
      {
        id: 'amid1',
        question: '¿Qué fibra sintética muy resistente es una poliamida?',
        options: ['Poliéster', 'Algodón', 'Kevlar', 'PVC'],
        correctIndex: 2,
        explanation: 'El Kevlar es una poliamida aromática usada en blindajes.'
      },
      {
        id: 'amid2',
        question: '¿Las amidas son básicas como las aminas?',
        options: ['Sí, más básicas', 'No, son neutras', 'Son muy ácidas', 'Depende del disolvente'],
        correctIndex: 1,
        explanation: 'El grupo carbonilo retira densidad electrónica del nitrógeno, anulando su basicidad.'
      }
    ]
  },
  {
    id: 'aromaticos',
    title: '14. Aromáticos (Benceno)',
    shortTitle: 'Aromáticos',
    description: 'Compuestos derivados del Benceno. Estabilidad excepcional.',
    sections: [
      {
        type: 'text',
        content: 'Hidrocarburos cíclicos planos con dobles enlaces conjugados deslocalizados que cumplen la regla de Hückel (4n+2 electrones pi). El padre de la familia es el Benceno (C6H6).'
      },
      {
        type: 'text',
        title: '1. Propiedades y Reactividad',
        content: 'A diferencia de los alquenos, NO sufren adición (no rompen su anillo). Su reacción característica es la Sustitución Electrofílica Aromática (SEAr), donde se reemplaza un hidrógeno por otro grupo (cloro, nitro, alquilo) manteniendo intacto el anillo bencénico y su estabilidad por resonancia.'
      },
      {
        type: 'list',
        title: '2. Reglas de Nomenclatura',
        content: [
          '1. Monosustituidos: Se nombra el sustituyente seguido de la palabra "benceno" (Ej: Clorobenceno, Etilbenceno). Algunos tienen nombres comunes aceptados (Tolueno = Metilbenceno, Fenol = Hidroxibenceno).',
          '2. Disustituidos: Se usan prefijos para indicar posición relativa:',
          '   - Orto (o-): Posiciones 1,2.',
          '   - Meta (m-): Posiciones 1,3.',
          '   - Para (p-): Posiciones 1,4.',
          '3. Polisustituidos: Se numera el anillo para dar los localizadores más bajos posibles a los sustituyentes. Se nombran alfabéticamente.'
        ]
      }
    ],
    examples: [
      { name: 'Benceno', formula: 'C6H6', smiles: 'c1ccccc1', description: 'Anillo aromático base.' },
      { name: 'Metilbenceno', formula: 'C7H8', smiles: 'Cc1ccccc1', description: 'Tolueno.' },
      { name: 'Etilbenceno', formula: 'C8H10', smiles: 'CCc1ccccc1', description: 'Precursor del estireno.' },
      { name: '1,2-Dimetilbenceno', formula: 'C8H10', smiles: 'Cc1ccccc1C', description: 'o-Xileno (Orto-xileno).' },
      { name: '1,3-Dimetilbenceno', formula: 'C8H10', smiles: 'Cc1cccc(C)c1', description: 'm-Xileno (Meta-xileno).' },
      { name: '1,4-Dimetilbenceno', formula: 'C8H10', smiles: 'Cc1ccc(C)cc1', description: 'p-Xileno (Para-xileno).' },
      { name: 'Clorobenceno', formula: 'C6H5Cl', smiles: 'Clc1ccccc1', description: 'Haluro de arilo.' },
      { name: 'Nitrobenceno', formula: 'C6H5NO2', smiles: 'O=[N+]([O-])c1ccccc1', description: 'Olor a almendras amargas (tóxico).' }
    ],
    quiz: [
      {
        id: 'arom1',
        question: '¿Cuál es la reacción característica del benceno?',
        options: ['Adición', 'Polimerización', 'Sustitución Electrofílica', 'Eliminación'],
        correctIndex: 2,
        explanation: 'Mantiene el anillo intacto sustituyendo hidrógenos, preservando la estabilidad aromática.'
      },
      {
        id: 'arom2',
        question: '¿Qué significa la posición "meta" en un benceno disustituido?',
        options: ['Posiciones 1,2', 'Posiciones 1,3', 'Posiciones 1,4', 'Posición solitaria'],
        correctIndex: 1,
        explanation: 'Orto (1,2), Meta (1,3) y Para (1,4) describen la posición relativa de dos sustituyentes.'
      },
      {
        id: 'arom3',
        question: 'Nombre común de Metilbenceno',
        options: ['Xileno', 'Tolueno', 'Estireno', 'Cumeno'],
        correctIndex: 1,
        explanation: 'Tolueno es el nombre industrial estándar.'
      }
    ]
  }
];