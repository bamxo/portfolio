import { Html, OrbitControls, useProgress } from '@react-three/drei';
import { Canvas, useLoader, useFrame } from '@react-three/fiber';
import { Suspense, useRef, useEffect, useState } from 'react';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import * as THREE from 'three';

function Loader() {
  const { progress } = useProgress();
  const radius = 100;
  const strokeWidth = 6;
  const normalizedRadius = radius - strokeWidth * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const strokeDashoffset = circumference - progress / 100 * circumference;

  return (
    <Html center>
      <div style={{ position: 'relative', width: radius * 2, height: radius * 2 }}>
        <svg
          height={radius * 2}
          width={radius * 2}
          style={{ transform: 'rotate(-90deg)' }}
        >
          {/* Background circle */}
          <circle
            stroke="#e6e6e6"
            fill="transparent"
            strokeWidth={strokeWidth}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          {/* Progress circle */}
          <circle
            stroke="#CF9FFF"
            fill="transparent"
            strokeWidth={strokeWidth}
            strokeDasharray={circumference + ' ' + circumference}
            style={{ strokeDashoffset, transition: 'stroke-dashoffset 0.3s ease' }}
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '14px',
          fontWeight: 'bold',
          color: '#CF9FFF'
        }}>
          {Math.round(progress)}%
        </div>
      </div>
    </Html>
  );
}

function Model() {
  const modelRef = useRef();
  const [opacity, setOpacity] = useState(0);
  const gltf = useLoader(GLTFLoader, '/models/e939c35d-fbd7-4651-8029-2790c00539fa.glb');

  useEffect(() => {
    // Fade in animation
    const fadeIn = () => {
      setOpacity(prev => Math.min(prev + 0.01, 1));
    };
    
    const intervalId = setInterval(fadeIn, 16);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    // Apply opacity to all materials in the model
    gltf.scene.traverse((child) => {
      if (child.isMesh && child.material) {
        const oldMaterial = child.material;
        child.material = new THREE.MeshStandardMaterial({
          color: oldMaterial.color,
          map: oldMaterial.map,
          normalMap: oldMaterial.normalMap,
          roughnessMap: oldMaterial.roughnessMap,
          metalnessMap: oldMaterial.metalnessMap,
          transparent: true,
          opacity: opacity,
        });
      }
    });
  }, [opacity, gltf]);

  useFrame(() => {
    if (modelRef.current) {
      modelRef.current.rotation.y -= 0.003;
      modelRef.current.rotation.x -= 0.001;
    }
  });

  return (
    <primitive
      ref={modelRef}
      object={gltf.scene}
      position={[0, 1, 0]}
      children-0-castShadow
    />
  );
}

function Scene3D() {
  return (
    <>
      <ambientLight intensity={3} />
      <directionalLight
        position={[5, 5, 5]}
        castShadow
        intensity={4}
      />
      <Model />
      <OrbitControls 
        target={[0, 1, 0]} 
        enableZoom={false}
        enablePan={false}
      />
    </>
  );
}

const Scene = () => {
  return (
    <Canvas camera={{ position: [-0.5, 1, 4.75] }} shadows>
      <Suspense fallback={<Loader />}>
        <Scene3D />
      </Suspense>
    </Canvas>
  );
};

export default Scene; 