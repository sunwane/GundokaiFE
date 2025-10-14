'use client';
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

interface GundamModelConfig {
  // Scale settings
  defaultScale?: number;
  appearScale?: number;
  poseScale?: number;
  
  // Position settings
  defaultPosition?: [number, number, number];
  appearPosition?: [number, number, number];
  posePosition?: [number, number, number];
  
  // Rotation settings
  defaultRotation?: [number, number, number];
  
  // Animation settings
  appearAnimationNames?: string[];
  poseAnimationNames?: string[];
  transitionDuration?: number;
  appearCutTime?: number; // Thời gian cắt animation appear (giây)
  
  // Material settings
  colorMultiplier?: number;
  metalnessAdjust?: number;
  roughnessAdjust?: number;
  envMapIntensityAdjust?: number;
  aoMapIntensity?: number;
}

interface GundamModelProps {
  modelPath: string;
  config?: GundamModelConfig;
}

function GundamModel({ modelPath, config = {} }: GundamModelProps) {
  const modelRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF(modelPath);
  const { actions, mixer } = useAnimations(animations, modelRef);
  const [hasAppeared, setHasAppeared] = useState(false);
  
  // Default config values (giữ nguyên hiện tại)
  const defaultConfig: Required<GundamModelConfig> = {
    defaultScale: 1.6,
    appearScale: 1.9,
    poseScale: 1.6,
    defaultPosition: [0.5, -1.6, 0],
    appearPosition: [0.9, -1.85, 0],
    posePosition: [0.5, -1.5, 0],
    defaultRotation: [0, -Math.PI / 10, 0],
    appearAnimationNames: ['01-APPEAR', 'APPEAR', 'appear'],
    poseAnimationNames: ['99-POSE2', 'POSE2', 'pose2'],
    transitionDuration: 0.3,
    appearCutTime: 6,
    colorMultiplier: 0.92,
    metalnessAdjust: -0.4,
    roughnessAdjust: 0.5,
    envMapIntensityAdjust: -0.5,
    aoMapIntensity: 2.0,
  };
  
  // Merge user config với default
  const finalConfig = { ...defaultConfig, ...config };
  
  useEffect(() => {
    if (scene) {
      // Set position và rotation theo config
      scene.position.set(...finalConfig.defaultPosition);
      scene.rotation.set(...finalConfig.defaultRotation);
      
      // Điều chỉnh material theo config
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.material instanceof THREE.MeshStandardMaterial) {
            // Reset về màu gốc nếu có
            if (!child.material.userData.originalColor) {
              child.material.userData.originalColor = child.material.color.clone();
            }
            child.material.color.copy(child.material.userData.originalColor);
            child.material.color.multiplyScalar(finalConfig.colorMultiplier);
            child.material.metalness = Math.max(0, child.material.metalness + finalConfig.metalnessAdjust);
            child.material.roughness = Math.min(1, child.material.roughness + finalConfig.roughnessAdjust);
            child.material.envMapIntensity = Math.max(0, (child.material.envMapIntensity || 1) + finalConfig.envMapIntensityAdjust);
            child.material.aoMapIntensity = finalConfig.aoMapIntensity;
            child.material.needsUpdate = true;
          }
          
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }

    // Animation logic với config
    if (actions && Object.keys(actions).length > 0) {
      console.log('Available animations:', Object.keys(actions));
      
      // Tìm animation appear theo config
      const appearAction = finalConfig.appearAnimationNames
        .map(name => actions[name])
        .find(action => action);
      
      // Tìm animation pose theo config  
      const poseAction = finalConfig.poseAnimationNames
        .map(name => actions[name])
        .find(action => action) || Object.values(actions)[2];
      
      if (appearAction && !hasAppeared) {
        console.log('Playing appear animation:', appearAction.getClip().name);
        
        // Set scale và position cho appear animation theo config
        scene.scale.setScalar(finalConfig.appearScale);
        scene.position.set(...finalConfig.appearPosition);
        
        // Dừng tất cả animations trước
        Object.values(actions).forEach(action => {
          if (action) action.stop();
        });
        
        // Chạy appear animation
        appearAction.reset().play();
        appearAction.setLoop(THREE.LoopOnce, 1);
        appearAction.clampWhenFinished = true;
        
        // Tính toán thời điểm chuyển đổi theo config
        const originalDuration = appearAction.getClip().duration;
        const transitionTime = Math.max(0, originalDuration - finalConfig.appearCutTime);
        
        console.log(`Appear duration: ${originalDuration}s, will transition at: ${transitionTime}s`);
        
        // Timeout để chuyển sang pose
        const transitionTimeout = setTimeout(() => {
          console.log('Transitioning to pose animation...');
          
          if (poseAction) {
            // Smooth scale transition theo config
            const scaleAnimation = () => {
              const duration = 500; // 0.5 giây
              const startScale = finalConfig.appearScale;
              const endScale = finalConfig.poseScale;
              const startTime = Date.now();
              
              const animate = () => {
                const elapsed = Date.now() - startTime;
                const progress = Math.min(elapsed / duration, 1);
                
                // Easing function (ease-out)
                const easeOut = 1 - Math.pow(1 - progress, 3);
                const currentScale = startScale + (endScale - startScale) * easeOut;
                
                scene.scale.setScalar(currentScale);
                
                // Smooth position transition
                const startPos = finalConfig.appearPosition;
                const endPos = finalConfig.posePosition;
                const currentPos = startPos.map((start, i) => 
                  start + (endPos[i] - start) * easeOut
                ) as [number, number, number];
                scene.position.set(...currentPos);
                
                if (progress < 1) {
                  requestAnimationFrame(animate);
                }
              };
              
              animate();
            };
            
            // Bắt đầu transition animations
            scaleAnimation();
            
            // Sử dụng crossFadeTo với duration từ config
            appearAction.crossFadeTo(poseAction, finalConfig.transitionDuration, true);
            poseAction.setLoop(THREE.LoopRepeat, Infinity);
            console.log('Playing pose animation:', poseAction.getClip().name);
            
            setHasAppeared(true);
          }
        }, transitionTime * 1000);
        
        return () => {
          clearTimeout(transitionTimeout);
        };
        
      } else if (hasAppeared && poseAction) {
        // Set scale và position cho pose animation theo config
        scene.scale.setScalar(finalConfig.poseScale);
        scene.position.set(...finalConfig.posePosition);
        
        console.log('Running pose animation:', poseAction.getClip().name);
        poseAction.reset().play();
        poseAction.setLoop(THREE.LoopRepeat, Infinity);
        
      } else if (!appearAction && poseAction) {
        // Set scale và position mặc định khi không có appear animation
        scene.scale.setScalar(finalConfig.defaultScale);
        scene.position.set(...finalConfig.defaultPosition);
        
        console.log('No appear animation found, playing pose:', poseAction.getClip().name);
        poseAction.reset().play();
        poseAction.setLoop(THREE.LoopRepeat, Infinity);
        setHasAppeared(true);
      }
    }

    // Cleanup function
    return () => {
      if (actions) {
        Object.values(actions).forEach(action => {
          if (action) action.stop();
        });
      }
    };
  }, [actions, scene, hasAppeared, mixer, finalConfig]);

  // Update animation mixer
  useFrame((state, delta) => {
    if (mixer) {
      mixer.update(delta);
    }
  });

  return (
    <group ref={modelRef}>
      <primitive object={scene} />
    </group>
  );
}

interface GundamScene3DProps {
  className?: string;
  style?: React.CSSProperties;
  modelPath?: string;
  config?: GundamModelConfig; // Thêm prop config
}

export default function GundamScene3D({ 
  className, 
  style, 
  modelPath = '/model/gat-x105_aile_strike.glb',
  config = {} // Default empty config
}: GundamScene3DProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div style={{ ...styles.container, ...style }} className={className}>
      {isLoading && (
        <div style={styles.loadingOverlay}>
          <div style={styles.loadingContent}>
            <div style={styles.loadingSpinner}></div>
            <p style={styles.loadingText}>Đang tải mô hình Gundam...</p>
          </div>
        </div>
      )}
      
      <Canvas
        camera={{ 
          position: [0, 0, 5],
          fov: 45,
          near: 0.1,
          far: 1000
        }}
        style={styles.canvas}
        onCreated={() => setIsLoading(false)}
        shadows
      >
        <ambientLight intensity={0.8} />
        
        <directionalLight 
          position={[3, 8, 5]} 
          intensity={0.9}
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        <pointLight 
          position={[-2, 2, 3]} 
          intensity={0.7}
          color="#4a90e2"
        />
        
        <spotLight 
          position={[-3, 5, -2]} 
          intensity={0.8}
          angle={Math.PI / 6}
          penumbra={0.4}
          color="#ffffff"
          castShadow
        />
        
        <pointLight 
          position={[0, 2, -5]} 
          intensity={0.3}
          color="#1e3a8a"
        />
        
        <Environment preset="dawn" />
        
        <fog attach="fog" args={['#2a2a3e', 6, 18]} />
        
        {/* Gundam Model với config */}
        <GundamModel modelPath={modelPath} config={config} />
        
        <OrbitControls
          enablePan={false}
          enableZoom={false}
          enableRotate={true}
          autoRotate={false}
          target={[0, 0, 0]}
          minDistance={5}
          maxDistance={5}
          minPolarAngle={Math.PI / 8}
          maxPolarAngle={Math.PI * 0.75}
          minAzimuthAngle={-Math.PI}
          maxAzimuthAngle={Math.PI}
          dampingFactor={0.1}
          enableDamping={true}
        />
      </Canvas>
      
      <div style={styles.controlsHint}>
        🖱️ Kéo để xoay mô hình
      </div>
    </div>
  );
}

// Styles giữ nguyên...
const styles = {
  container: {
    position: 'relative' as const,
    width: '100%',
    height: '100%',
    borderRadius: '0',
    overflow: 'hidden',
    background: 'none',
  },
  canvas: {
    width: '100%',
    height: '100%',
    background: 'transparent',
  },
  loadingOverlay: {
    position: 'absolute' as const,
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'transparent',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  loadingContent: {
    textAlign: 'center' as const,
    color: '#fff',
  },
  loadingSpinner: {
    width: '40px',
    height: '40px',
    border: '3px solid rgba(89, 150, 248, 0.3)',
    borderTop: '3px solid rgb(37, 121, 255)',
    borderRadius: '50%',
    animation: 'spin 1s linear infinite',
    margin: '0 auto 16px',
  },
  loadingText: {
    margin: 0,
    fontSize: '14px',
    fontWeight: '500',
  },
  controlsHint: {
    position: 'absolute' as const,
    top: '16px',
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    color: '#e5e7eb',
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '12px',
    zIndex: 5,
    border: '1px solid rgba(59, 130, 246, 0.3)',
  },
};

if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
  `;
  document.head.appendChild(style);
}

useGLTF.preload('/model/gat-x105_aile_strike.glb');
useGLTF.preload('/model/33tos_4TH.glb');
useGLTF.preload('/model/MBF-02StrikeRougeOotori.glb');