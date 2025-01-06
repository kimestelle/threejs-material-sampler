import React, { createContext, useContext, useEffect, useState } from 'react';
import { CanvasType, LightingType, InnerShapeType, OuterShapeType, BaseShapeType, FloorType } from '../types';

interface AppContextType {
  canvas: CanvasType;
  setCanvas: React.Dispatch<React.SetStateAction<CanvasType>>;
  lighting: LightingType;
  setLighting: React.Dispatch<React.SetStateAction<LightingType>>;
  innerShape: InnerShapeType;
  setInnerShape: React.Dispatch<React.SetStateAction<InnerShapeType>>;
  outerShape: OuterShapeType;
  setOuterShape: React.Dispatch<React.SetStateAction<OuterShapeType>>;
  baseShape: BaseShapeType;
  setBaseShape: React.Dispatch<React.SetStateAction<BaseShapeType>>;
  floor: FloorType;
  setFloor: React.Dispatch<React.SetStateAction<FloorType>>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext must be used within an AppProvider');
  }
  return context;
};

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  
  const [canvas, setCanvas] = useState<CanvasType>({
    backgroundEnv: 'forest',
    backgroundColor: '#050505',
    antialiasing: true,
    envIntensity: 0.5,
  });

  useEffect(() => {
    console.log('Canvas state updated:', canvas);
  }, [canvas]);

  const [lighting, setLighting] = useState<LightingType>({
    ambientColor: '#ffffff',
    ambientIntensity: 0.5,
    intensity: 1,
    color: '#ffffff',
    xPos: 2,
    yPos: 10,
    zPos: 0,
  });

  const [innerShape, setInnerShape] = useState<InnerShapeType>({
    type: 'Box',
    color: '#ffffff',
    opacity: 1,
    roughness: 0.5,
    metalness: 0.5,
    emissive: '#000000',
    emissiveIntensity: 0.5,
    wireframe: false,
  });

  const [outerShape, setOuterShape] = useState<OuterShapeType>({
    type: 'Sphere',
    color: '#ffffff',
    transmission: 0.9,
    thickness: 0.1,
    roughness: 0,
    metalness: 0,
    chromaticAberration: 0.5,
    anisotropy: 0.5,
    reflectivity: 0.5,
    clearcoat: 0.5,
    clearcoatRoughness: 0,
    attenuationDistance: 0.5,
    attenuationColor: '#ffffff',
  });

  const [baseShape, setBaseShape] = useState<BaseShapeType>({
    color: '#333333',
    wireframe: false,
    opacity: 1,
    transparent: false,
  });

  const [floor, setFloor] = useState<FloorType>({
    color: '#202020',
    blur: [300, 50],
    resolution: 1024,
    mixBlur: 1,
    mixStrength: 50,
    roughness: 1,
    depthScale: 1.2,
    minDepthThreshold: 0.4,
    maxDepthThreshold: 1.4,
    metalness: 0,
    mirror: 1,
});


  return (
    <AppContext.Provider
      value={{
        canvas,
        setCanvas,
        lighting,
        setLighting,
        innerShape,
        setInnerShape,
        outerShape,
        setOuterShape,
        baseShape,
        setBaseShape,
        floor,
        setFloor,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
