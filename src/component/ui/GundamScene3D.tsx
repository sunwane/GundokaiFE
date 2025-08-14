'use client';
import React, { useRef, useEffect, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { useGLTF, OrbitControls, Environment, useAnimations } from '@react-three/drei';
import * as THREE from 'three';

function GundamModel() {
  const modelRef = useRef<THREE.Group>(null);
  const { scene, animations } = useGLTF('/model/gat-x105_aile_strike.glb');
  const { actions, mixer } = useAnimations(animations, modelRef);
  const [hasAppeared, setHasAppeared] = useState(false);
  
  useEffect(() => {
    if (scene) {
      // Scale nhỏ hơn để thấy toàn thân
      scene.scale.setScalar(1.6);
      
      // Dịch chuyển model lên để thấy toàn thân
      scene.position.set(0.5, -1.5, 0);
      
      // Đặt tư thế mặc định - Quay sang trái 45 độ
      scene.rotation.set(0, Math.PI / 32, 0);
      
      // ✅ Điều chỉnh material để che nhựa nhưng giữ màu trắng
      scene.traverse((child) => {
        if (child instanceof THREE.Mesh) {
          if (child.material instanceof THREE.MeshStandardMaterial) {
            child.material.color.multiplyScalar(0.92);
            child.material.metalness = Math.max(0, child.material.metalness - 0.4);
            child.material.roughness = Math.min(1, child.material.roughness + 0.5);
            child.material.envMapIntensity = Math.max(0, (child.material.envMapIntensity || 1) - 0.5);
            child.material.aoMapIntensity = 2.0;
            child.material.needsUpdate = true;
          }
          
          child.castShadow = true;
          child.receiveShadow = true;
        }
      });
    }

    // Chạy animation sequence
    if (actions && Object.keys(actions).length > 0) {
      console.log('Available animations:', Object.keys(actions));
      
      // Tìm animation appear
      const appearAction = actions['01-APPEAR'] || actions['APPEAR'] || actions['appear'];
      const pose2Action = actions['99-POSE2'] || actions['POSE2'] || actions['pose2'] || Object.values(actions)[2];
      
      if (appearAction && !hasAppeared) {
        console.log('Playing appear animation:', appearAction.getClip().name);
        
        // Dừng tất cả animations trước
        Object.values(actions).forEach(action => {
          if (action) action.stop();
        });
        
        // Chạy appear animation
        appearAction.reset().play();
        appearAction.setLoop(THREE.LoopOnce, 1);
        appearAction.clampWhenFinished = true;
        
        // ✅ Tính toán thời điểm chuyển đổi - cắt 3s cuối
        const originalDuration = appearAction.getClip().duration;
        const transitionTime = Math.max(0, originalDuration - 6); // Cắt 3s cuối
        
        console.log(`Appear duration: ${originalDuration}s, will transition at: ${transitionTime}s`);
        
        // ✅ Timeout để chuyển sớm sang pose2
        const transitionTimeout = setTimeout(() => {
          console.log('Transitioning to pose 2 early...');
          
          if (pose2Action) {
            // ✅ Sử dụng crossFadeTo để transition mượt mà
            appearAction.crossFadeTo(pose2Action, 0.3, true); // 0.3s crossfade
            pose2Action.setLoop(THREE.LoopRepeat, Infinity);
            console.log('Playing pose 2 animation:', pose2Action.getClip().name);
            
            setHasAppeared(true);
          }
        }, transitionTime * 1000); // Convert to milliseconds
        
        // ✅ Cleanup timeout nếu component unmount
        return () => {
          clearTimeout(transitionTimeout);
        };
        
      } else if (hasAppeared && pose2Action) {
        // Chỉ chạy pose 2 khi đã appear
        console.log('Running pose 2 animation:', pose2Action.getClip().name);
        pose2Action.reset().play();
        pose2Action.setLoop(THREE.LoopRepeat, Infinity);
        
      } else if (!appearAction && pose2Action) {
        // Nếu không có appear animation, chạy pose 2 luôn
        console.log('No appear animation found, playing pose 2:', pose2Action.getClip().name);
        pose2Action.reset().play();
        pose2Action.setLoop(THREE.LoopRepeat, Infinity);
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
  }, [actions, scene, hasAppeared, mixer]);

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
}

export default function GundamScene3D({ className, style }: GundamScene3DProps) {
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
        {/* ✅ Giảm ambient light để tạo contrast tốt hơn */}
        <ambientLight intensity={0.8} /> {/* Giảm từ 1.1 xuống 0.8 */}
        
        {/* Key light - ánh sáng chính từ trên */}
        <directionalLight 
          position={[3, 8, 5]} 
          intensity={0.9} // ✅ Giảm từ 1.0 xuống 0.9
          castShadow
          shadow-mapSize-width={2048}
          shadow-mapSize-height={2048}
          shadow-camera-far={50}
          shadow-camera-left={-10}
          shadow-camera-right={10}
          shadow-camera-top={10}
          shadow-camera-bottom={-10}
        />
        
        {/* Fill light - ánh sáng phụ */}
        <pointLight 
          position={[-2, 2, 3]} 
          intensity={0.7} // ✅ Giảm từ 1.0 xuống 0.7
          color="#4a90e2"
        />
        
        {/* Rim light - ánh sáng viền */}
        <spotLight 
          position={[-3, 5, -2]} 
          intensity={0.8} // ✅ Giảm từ 1.0 xuống 0.8
          angle={Math.PI / 6}
          penumbra={0.4} // ✅ Tăng penumbra để mềm hơn
          color="#ffffff"
          castShadow
        />
        
        {/* Back light để tạo depth */}
        <pointLight 
          position={[0, 2, -5]} 
          intensity={0.3} // ✅ Giảm từ 0.4 xuống 0.3
          color="#1e3a8a"
        />
        
        {/* Environment với độ sáng vừa phải */}
        <Environment preset="dawn" /> {/* ✅ Đổi từ "night" sang "dawn" để balanced hơn */}
        
        {/* Fog để che các chi tiết xa và tạo depth */}
        <fog attach="fog" args={['#2a2a3e', 6, 18]} /> {/* ✅ Điều chỉnh màu và khoảng cách */}
        
        {/* Gundam Model */}
        <GundamModel />
        
        {/* Controls */}
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
      
      {/* Controls hint */}
      <div style={styles.controlsHint}>
        🖱️ Kéo để xoay mô hình
      </div>
    </div>
  );
}

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
    backgroundColor: 'rgba(0, 0, 0, 0.8)', // ✅ Tối hơn
    color: '#e5e7eb', // ✅ Màu chữ sáng hơn
    padding: '8px 16px',
    borderRadius: '20px',
    fontSize: '12px',
    zIndex: 5,
    border: '1px solid rgba(59, 130, 246, 0.3)', // ✅ Thêm border
  },
};

// Add CSS keyframes for spinner animation
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

// Preload the GLTF
useGLTF.preload('/model/gat-x105_aile_strike.glb');