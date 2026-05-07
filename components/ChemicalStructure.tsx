import React, { useEffect, useRef, useState } from 'react';

// Declaration for global script
declare global {
  interface Window {
    SmiDrawer: any;
  }
}

interface ChemicalStructureProps {
  smiles: string;
  width?: number;
  height?: number;
  className?: string;
}

export const ChemicalStructure: React.FC<ChemicalStructureProps> = ({ smiles, width = 280, height = 180, className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Reset state when SMILES changes
    setHasError(false);
    setLoading(true);

    if (!smiles) {
      setLoading(false);
      return;
    }

    // Attempt to draw using local canvas
    const drawStructure = async () => {
      try {
        if (!window.SmiDrawer) {
          throw new Error("SmilesDrawer library not loaded");
        }

        const canvas = canvasRef.current;
        if (!canvas) return;

        // Clear canvas
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.clearRect(0, 0, width, height);

        // Configure options
        const isSmallMolecule = smiles.replace(/[^A-Za-z]/g, '').length <= 2;

        const drawer = new window.SmiDrawer({
          width: width,
          height: height,
          bondThickness: 1.4,
          bondLength: 22,
          shortBondLength: 0.85,
          bondSpacing: 0.2 * 22,
          atomVisualization: 'default',
          isometric: true,
          debug: false,
          terminalCarbons: true, 
          explicitHydrogens: isSmallMolecule, 
          overlapSensitivity: 0.42,
          overlapResolutionIterations: 5, 
          compactDrawing: false,
          fontSizeLarge: 7,
          fontSizeSmall: 5,
          padding: 10,
          colorBond: '#0f172a',
          colorAtom: '#0ea5e9',
          themes: {
            light: {
              C: '#0f172a',
              O: '#ef4444',
              N: '#3b82f6',
              F: '#10b981',
              CL: '#10b981',
              BR: '#8b5cf6',
              I: '#a855f7',
              H: '#94a3b8'
            }
          }
        });

        // Parse and draw
        window.SmiDrawer.parse(smiles, (tree: any) => {
          try {
            drawer.draw(tree, canvas, 'light', false);
            setLoading(false);
          } catch (drawErr) {
            console.warn("Canvas draw failed, switching to fallback:", drawErr);
            setHasError(true); 
            setLoading(false);
          }
        }, (err: any) => {
            console.warn("SMILES parse failed:", err);
            setHasError(true); 
            setLoading(false);
        });

      } catch (err) {
        console.error("General structure error:", err);
        setHasError(true);
        setLoading(false);
      }
    };

    const timer = setTimeout(drawStructure, 100);
    return () => clearTimeout(timer);

  }, [smiles, width, height]);

  const fallbackImageUrl = `https://pubchem.ncbi.nlm.nih.gov/rest/pug/compound/smiles/${encodeURIComponent(smiles)}/PNG?record_type=2d&image_size=${width}x${height}`;

  if (hasError) {
    return (
      <div 
        className={`flex justify-center items-center bg-white p-2 rounded-xl border border-slate-100 shadow-inner overflow-hidden mx-auto ${className}`}
        style={{ maxWidth: '100%', height: 'auto', aspectRatio: `${width}/${height}` }}
      >
        <img 
          src={fallbackImageUrl} 
          alt={`Estructura de ${smiles}`}
          className="max-w-full h-auto object-contain mix-blend-multiply"
          onError={(e) => {
            (e.target as HTMLImageElement).style.display = 'none';
          }}
        />
      </div>
    );
  }

  return (
    <div 
      ref={containerRef}
      className={`relative flex justify-center items-center bg-white p-2 rounded-xl border border-slate-100 shadow-inner overflow-hidden mx-auto ${className}`}
      style={{ maxWidth: '100%' }}
    >
      {/* Canvas for local drawing */}
      <canvas 
        ref={canvasRef} 
        width={width} 
        height={height}
        className="max-w-full h-auto"
        style={{ maxHeight: height }}
      />
      
      {/* Loading state */}
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center bg-slate-50/80 backdrop-blur-sm">
          <div className="w-5 h-5 border-2 border-science-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}
    </div>
  );
};