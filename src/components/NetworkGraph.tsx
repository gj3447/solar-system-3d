// @ts-nocheck
import React, { useEffect } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';

function Box() {
  useEffect(() => {
    console.log('Box 컴포넌트가 마운트되었습니다');
  }, []);

  return (
    <mesh>
      <boxGeometry args={[3, 3, 3]} />
      <meshStandardMaterial color="orange" />
    </mesh>
  );
}

export default function NetworkGraph() {
  useEffect(() => {
    console.log('NetworkGraph 컴포넌트가 마운트되었습니다');
    // WebGL 지원 여부 확인
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      console.log('WebGL이 지원됩니다');
      console.log('WebGL 버전:', gl.getParameter(gl.VERSION));
      console.log('WebGL 벤더:', gl.getParameter(gl.VENDOR));
      console.log('WebGL 렌더러:', gl.getParameter(gl.RENDERER));
    } else {
      console.log('WebGL이 지원되지 않습니다');
    }
  }, []);

  return (
    <div style={{ 
      width: '100%', 
      height: '100vh', 
      background: '#000000',
      position: 'relative',
      zIndex: 1
    }}>
      <Canvas
        camera={{ position: [0, 0, 10] }}
        style={{ position: 'absolute', top: 0, left: 0 }}
        gl={{ antialias: true, alpha: false }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <Box />
        <OrbitControls enableDamping={false} />
      </Canvas>
    </div>
  );
} 