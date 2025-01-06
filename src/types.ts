export type BackgroundEnv =
  | "apartment"
  | "city"
  | "dawn"
  | "forest"
  | "lobby"
  | "night"
  | "park"
  | "studio"
  | "sunset"
  | "warehouse"
  | undefined;

export interface CanvasType {
    backgroundColor: string;
    antialiasing: boolean;
    backgroundEnv: BackgroundEnv;
    envIntensity: number;
  }

export interface CameraType {
    fov: number;
    near: number;
    far: number;
    xPos: number;
    yPos: number;
    zPos: number;
    xRot: number;
    yRot: number;
    zRot: number;
  }
  
export interface LightingType {
    ambientIntensity: number;
    ambientColor: string;
    intensity: number;
    color: string;
    xPos: number;
    yPos: number;
    zPos: number;
  }
  
  export interface InnerShapeType {
    type: 'Box' | 'Sphere' | 'TorusKnot';
    color: string;
    opacity: number;
    roughness: number;
    metalness: number;
    emissive: string;
    emissiveIntensity: number;
    wireframe: boolean;
}

export interface OuterShapeType {
    type: 'Box' | 'Sphere' | 'Torus' | undefined;
    color: string;
    transmission: number;
    thickness: number;
    roughness: number;
    metalness: number;
    chromaticAberration: number;
    anisotropy: number;
    reflectivity: number;
    clearcoat: number;
    clearcoatRoughness: number;
    attenuationDistance: number;
    attenuationColor: string;
}

export interface BaseShapeType {
    color: string;
    wireframe: boolean;
    opacity: number;
    transparent: boolean;
}
  
export interface FloorType {
  color: string;
  blur: [number, number];
  resolution: number;
  mixBlur: number;
  mixStrength: number;
  roughness: number;
  depthScale: number;
  minDepthThreshold: number;
  maxDepthThreshold: number;
  metalness: number;
  mirror: number;
}
