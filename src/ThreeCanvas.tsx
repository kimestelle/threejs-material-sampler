import { useRef } from 'react'
import * as THREE from 'three'
import { Canvas } from '@react-three/fiber'
import './App.css'
import { MeshTransmissionMaterial, MeshReflectorMaterial } from '@react-three/drei'
import { OrbitControls, Environment } from '@react-three/drei'
// import { GodRays } from '@react-three/postprocessing'
import { useAppContext } from './context/AppContext'

export default function ThreeCanvas() {
  const materialRef = useRef<THREE.Mesh>(null)
  const directionalLightRef = useRef<THREE.DirectionalLight>(null)

  const { canvas, lighting, innerShape, outerShape, baseShape } = useAppContext();

  return (
    <Canvas camera={{ position: [0, 20, 15], 
      //angle of camera
      fov: 40, 
      //clipping planes
      near: 1, far: 60 }} 
      //for performance improvement
      gl={{ antialias: canvas.antialiasing }}
    >
      {canvas.backgroundEnv ? (
        <Environment preset={canvas.backgroundEnv} environmentIntensity={canvas.envIntensity} background />
      ) : null}

      <OrbitControls />
      <color attach="background" args={[canvas.backgroundColor]} />
      <ambientLight           
          color={lighting.ambientColor}
          intensity={lighting.ambientIntensity}
          />
      <directionalLight ref={directionalLightRef}
          color={lighting.color}
          position={[lighting.xPos, lighting.yPos, lighting.zPos]}
          intensity={lighting.intensity}
          />
      <mesh ref={materialRef} position={[lighting.xPos, lighting.yPos, lighting.zPos]}> 
        <boxGeometry args={[0.2, 0.2, 0.2]} />
        <meshStandardMaterial color="red" transparent={true} />
      </mesh>
          
      {/* {materialRef.current && <GodRays sun={materialRef.current} exposure={0.1} decay={0.8} />} */}
      <group>
        <mesh position={[0, 1, 0]} rotation={outerShape.type === 'Torus' ? [0, Math.PI / 2, 0] : undefined}>
          {outerShape.type === 'Box' && <boxGeometry args={[5, 5, 5]} />}  
          {outerShape.type === 'Sphere' && <sphereGeometry args={[3, 32, 32]} />}
          {outerShape.type === 'Torus' && <torusGeometry args={[2.8, 0.4, 16, 100]} />}
          {/* <meshStandardMaterial color="red" />  */}
          <MeshTransmissionMaterial
            transmission={outerShape.transmission}
            thickness={outerShape.thickness}
            roughness={outerShape.roughness}
            metalness={outerShape.metalness}
            reflectivity={outerShape.reflectivity}
            clearcoat={outerShape.clearcoat}
            clearcoatRoughness={outerShape.clearcoatRoughness}
            attenuationDistance={outerShape.attenuationDistance}
            attenuationColor={outerShape.attenuationColor}
            anisotropy={outerShape.anisotropy}
            chromaticAberration={outerShape.chromaticAberration}
            color={outerShape.color}
          />
        </mesh>
        <group>
        <mesh position={[0, -2, 0]}>
          <cylinderGeometry args={[2, 2.5, 1, 32]}/>
          <meshBasicMaterial
            color={baseShape.color || '#ffffff'}
            wireframe={baseShape.wireframe || false}
            opacity={baseShape.opacity || 1}
            transparent={baseShape.transparent || false}
          />
        </mesh> 
        <mesh position={[0, -2.4, 0]}>
          <cylinderGeometry args={[2.5, 2.5, 0.2, 32]}/>
          <meshBasicMaterial
            color={baseShape.color || '#ffffff'}
            wireframe={baseShape.wireframe || false}
            opacity={baseShape.opacity || 1}
            transparent={baseShape.transparent || false}
            />
        </mesh> 
        </group>
        <mesh position={[0, 1, 0]}>
          {innerShape.type === 'Box' && <boxGeometry args={[2.5, 2.5, 2.5]} />}
          {innerShape.type === 'Sphere' && <sphereGeometry args={[2, 32, 32]} />}
          {innerShape.type === 'TorusKnot' && <torusKnotGeometry args={[1.2, 0.5, 64, 100]} />}
            <meshStandardMaterial metalness={1} roughness={0.1}/>
        </mesh>
        <Floor />
      </group>

    </Canvas>
  )
}

const Floor = () => {
  const { floor } = useAppContext();
  return (
    <mesh position={[0, -2.4, 0]} receiveShadow rotation={[-Math.PI / 2, 0, 0]}>
      <planeGeometry args={[20, 20]} />
      <MeshReflectorMaterial
        color={floor.color}
        blur={floor.blur}
        resolution={floor.resolution}
        mixBlur={floor.mixBlur}
        mixStrength={floor.mixStrength}
        roughness={floor.roughness}
        depthScale={floor.depthScale}
        minDepthThreshold={floor.minDepthThreshold}
        maxDepthThreshold={floor.maxDepthThreshold}
        metalness={floor.metalness}
        mirror={floor.mirror}
      />
    </mesh>
  );
};
