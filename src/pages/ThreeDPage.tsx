// @ts-nocheck
import React, { useRef, useEffect, useMemo, useState } from 'react';
import { Canvas, useFrame, extend, useThree } from '@react-three/fiber';
import { OrbitControls, Stars, Trail, useTexture } from '@react-three/drei';
import * as THREE from 'three';

// 행성 정보 데이터
const PLANET_INFO = {
  mercury: {
    name: "수성",
    description: "태양계에서 가장 작고 가장 안쪽에 있는 행성. 표면은 크레이터로 가득하며, 낮과 밤의 온도차가 매우 큽니다.",
    diameter: "4,879 km",
    temperature: "-180°C ~ 430°C",
    day: "58.6일",
    year: "88일"
  },
  venus: {
    name: "금성",
    description: "태양계에서 가장 뜨거운 행성. 두꺼운 대기층으로 인한 온실효과로 표면 온도가 매우 높습니다.",
    diameter: "12,104 km",
    temperature: "462°C",
    day: "243일",
    year: "225일"
  },
  earth: {
    name: "지구",
    description: "생명체가 존재하는 유일한 행성. 물이 액체 상태로 존재하며, 산소가 풍부한 대기층을 보유하고 있습니다.",
    diameter: "12,742 km",
    temperature: "-88°C ~ 58°C",
    day: "24시간",
    year: "365일"
  },
  mars: {
    name: "화성",
    description: "붉은 행성으로 알려진 화성은 과거에 물이 흘렀던 흔적이 있으며, 인류의 다음 탐사 목표입니다.",
    diameter: "6,779 km",
    temperature: "-140°C ~ 20°C",
    day: "24시간 37분",
    year: "687일"
  },
  jupiter: {
    name: "목성",
    description: "태양계에서 가장 큰 행성. 거대한 가스 행성으로 대적점이라는 거대한 폭풍이 특징입니다.",
    diameter: "139,820 km",
    temperature: "-110°C",
    day: "10시간",
    year: "12년"
  },
  saturn: {
    name: "토성",
    description: "아름다운 고리로 유명한 가스 행성. 수많은 위성을 거느리고 있습니다.",
    diameter: "116,460 km",
    temperature: "-140°C",
    day: "10.7시간",
    year: "29.5년"
  },
  uranus: {
    name: "천왕성",
    description: "옆으로 누운 듯한 자전축을 가진 얼음 거인. 푸른빛을 띄는 대기층이 특징입니다.",
    diameter: "50,724 km",
    temperature: "-195°C",
    day: "17.2시간",
    year: "84년"
  },
  neptune: {
    name: "해왕성",
    description: "태양계의 마지막 행성. 강한 바람과 폭풍이 특징인 얼음 거인입니다.",
    diameter: "49,244 km",
    temperature: "-200°C",
    day: "16.1시간",
    year: "165년"
  }
};

function Tooltip({ content, position }) {
  if (!content) return null;
  
  return (
    <div style={{
      position: 'absolute',
      left: position.x + 10,
      top: position.y + 10,
      padding: '10px',
      background: 'rgba(0, 0, 0, 0.8)',
      border: '1px solid #444',
      borderRadius: '5px',
      color: 'white',
      fontSize: '14px',
      maxWidth: '300px',
      pointerEvents: 'none',
      zIndex: 100,
    }}>
      <h3 style={{ margin: '0 0 8px 0', color: '#88ccff' }}>{content.name}</h3>
      <p style={{ margin: '0 0 8px 0' }}>{content.description}</p>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'auto 1fr',
        gap: '4px 8px',
        fontSize: '12px',
        color: '#ccc'
      }}>
        <span>지름:</span><span>{content.diameter}</span>
        <span>온도:</span><span>{content.temperature}</span>
        <span>자전주기:</span><span>{content.day}</span>
        <span>공전주기:</span><span>{content.year}</span>
      </div>
    </div>
  );
}

function Sun() {
  const meshRef = useRef<THREE.Mesh>(null);
  
  useFrame(() => {
    if (meshRef.current) {
      meshRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2.5, 32, 32]} />
      <meshStandardMaterial
        color="#FDB813"
        emissive="#FDB813"
        emissiveIntensity={2}
      />
      <pointLight intensity={1.5} distance={50} decay={2} />
    </mesh>
  );
}

function Planet({ orbitRadius, speed, size, color, initialAngle = 0, planetKey }) {
  const meshRef = useRef();
  const [angle, setAngle] = React.useState(initialAngle);
  const [hovered, setHovered] = useState(false);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const { camera, size: canvasSize } = useThree();

  useFrame(() => {
    if (meshRef.current) {
      setAngle((prev) => prev + speed);
      const x = Math.cos(angle) * orbitRadius;
      const z = Math.sin(angle) * orbitRadius;
      meshRef.current.position.x = x;
      meshRef.current.position.z = z;
      meshRef.current.rotation.y += 0.01;

      if (hovered) {
        const vector = new THREE.Vector3();
        meshRef.current.getWorldPosition(vector);
        vector.project(camera);
        
        setTooltipPosition({
          x: (vector.x + 1) * canvasSize.width / 2,
          y: (-vector.y + 1) * canvasSize.height / 2
        });
      }
    }
  });

  return (
    <>
      <mesh
        ref={meshRef}
        position={[orbitRadius, 0, 0]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color={color}
          metalness={0.4}
          roughness={0.7}
        />
      </mesh>
      {hovered && (
        <Tooltip
          content={PLANET_INFO[planetKey]}
          position={tooltipPosition}
        />
      )}
    </>
  );
}

function CometCore({ size }) {
  const coreRef = useRef();
  
  useFrame(({ clock }) => {
    if (coreRef.current) {
      coreRef.current.material.emissiveIntensity = 1 + Math.sin(clock.getElapsedTime() * 2) * 0.3;
    }
  });

  return (
    <group>
      <mesh ref={coreRef}>
        <sphereGeometry args={[size, 32, 32]} />
        <meshStandardMaterial
          color="#ffffff"
          emissive="#88ccff"
          emissiveIntensity={1}
          transparent
          opacity={0.9}
        />
      </mesh>
      
      {/* 주 이온 꼬리 (밝은 파란색) */}
      <Trail
        width={3}
        length={100}
        decay={1}
        local={false}
        stride={10}
        interval={1}
        color={new THREE.Color(0x88ccff)}
        attenuation={(t) => {
          return 1 - t;
        }}
      >
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#88ccff" transparent opacity={0} />
        </mesh>
      </Trail>

      {/* 보조 이온 꼬리 (연한 파란색) */}
      <Trail
        width={2}
        length={80}
        decay={1}
        local={false}
        stride={8}
        interval={1}
        color={new THREE.Color(0xaaddff)}
        attenuation={(t) => {
          return (1 - t) * 0.7;
        }}
      >
        <mesh position={[0, 0.1, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#aaddff" transparent opacity={0} />
        </mesh>
      </Trail>

      {/* 주 먼지 꼬리 (밝은 노란색) */}
      <Trail
        width={5}
        length={50}
        decay={1}
        local={false}
        stride={5}
        interval={1}
        color={new THREE.Color(0xffcc88)}
        attenuation={(t) => {
          return 1 - t;
        }}
      >
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#ffcc88" transparent opacity={0} />
        </mesh>
      </Trail>

      {/* 보조 먼지 꼬리 (연한 노란색) */}
      <Trail
        width={4}
        length={40}
        decay={1}
        local={false}
        stride={4}
        interval={1}
        color={new THREE.Color(0xffeedd)}
        attenuation={(t) => {
          return (1 - t) * 0.6;
        }}
      >
        <mesh position={[0, -0.1, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#ffeedd" transparent opacity={0} />
        </mesh>
      </Trail>

      {/* 가스 꼬리 (녹색 계열) */}
      <Trail
        width={2.5}
        length={30}
        decay={1}
        local={false}
        stride={3}
        interval={1}
        color={new THREE.Color(0x88ffaa)}
        attenuation={(t) => {
          return (1 - t) * 0.5;
        }}
      >
        <mesh position={[0, 0.05, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#88ffaa" transparent opacity={0} />
        </mesh>
      </Trail>

      {/* 플라즈마 꼬리 (보라색 계열) */}
      <Trail
        width={2}
        length={60}
        decay={1}
        local={false}
        stride={6}
        interval={1}
        color={new THREE.Color(0xcc88ff)}
        attenuation={(t) => {
          return (1 - t) * 0.4;
        }}
      >
        <mesh position={[0, -0.05, 0]}>
          <sphereGeometry args={[0.05, 8, 8]} />
          <meshBasicMaterial color="#cc88ff" transparent opacity={0} />
        </mesh>
      </Trail>
    </group>
  );
}

function Comet({ orbitA = 20, orbitB = 12, speed = 0.005, size = 0.3 }) {
  const meshRef = useRef();
  const [angle, setAngle] = React.useState(0);
  const dustParticlesRef = useRef([]);
  const particleCount = 200;

  // 초기 먼지 입자 생성
  React.useEffect(() => {
    dustParticlesRef.current = Array(particleCount).fill().map(() => ({
      position: new THREE.Vector3(),
      scale: Math.random() * 0.2 + 0.1,
      velocity: new THREE.Vector3(
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02,
        (Math.random() - 0.5) * 0.02
      ),
      offset: Math.random() * Math.PI * 2,
      lifetime: Math.random() * 2 + 1
    }));
  }, []);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      setAngle((prev) => prev + speed);
      
      // 혜성 위치 계산
      const x = Math.cos(angle) * orbitA;
      const z = Math.sin(angle) * orbitB;
      meshRef.current.position.x = x;
      meshRef.current.position.z = z;

      // 태양으로부터의 방향 벡터 계산
      const toSun = new THREE.Vector3(-x, 0, -z).normalize();
      const fromSun = toSun.clone().multiplyScalar(-1);

      // 먼지 입자 업데이트
      dustParticlesRef.current.forEach(particle => {
        particle.position.x = x + fromSun.x * (particle.lifetime * 8 + Math.cos(clock.getElapsedTime() + particle.offset));
        particle.position.z = z + fromSun.z * (particle.lifetime * 8 + Math.sin(clock.getElapsedTime() + particle.offset));
        particle.position.y = Math.sin(clock.getElapsedTime() * 0.5 + particle.offset) * 0.5;
        
        particle.lifetime -= 0.01;
        if (particle.lifetime <= 0) {
          particle.lifetime = Math.random() * 2 + 1;
          particle.position.copy(new THREE.Vector3(x, 0, z));
        }
      });
    }
  });

  return (
    <group>
      {/* 궤도 */}
      <line>
        <bufferGeometry>
          <float32BufferAttribute
            attach="attributes-position"
            count={128}
            array={new Float32Array(
              [...Array(129)].map((_, i) => {
                const angle = (i / 128) * Math.PI * 2;
                return [Math.cos(angle) * orbitA, 0, Math.sin(angle) * orbitB];
              }).flat()
            )}
            itemSize={3}
          />
        </bufferGeometry>
        <lineBasicMaterial color="#4a4a4a" opacity={0.1} transparent={true} />
      </line>

      <group ref={meshRef}>
        {/* 혜성 핵심부 */}
        <CometCore size={size} />
        
        {/* 코마 (혜성 머리 부분의 발광 효과) */}
        <pointLight color="#88ccff" intensity={10} distance={8} decay={2} />
        <pointLight color="#ffffff" intensity={5} distance={3} decay={2} />

        {/* 먼지 파티클 */}
        {dustParticlesRef.current.map((particle, i) => (
          <mesh
            key={i}
            position={particle.position}
            scale={particle.scale}
          >
            <sphereGeometry args={[0.1, 8, 8]} />
            <meshBasicMaterial
              color="#ffcc88"
              transparent
              opacity={0.4 * particle.lifetime}
              blending={THREE.AdditiveBlending}
            />
          </mesh>
        ))}
      </group>
    </group>
  );
}

function Asteroid({ orbitRadius, speed, size, color, initialAngle = 0 }) {
  const meshRef = useRef();
  const [angle, setAngle] = React.useState(initialAngle);
  const rotationSpeed = useRef(Math.random() * 0.01 + 0.005);

  useFrame((state) => {
    setAngle((prev) => prev + speed);
    const x = Math.cos(angle) * orbitRadius;
    const z = Math.sin(angle) * orbitRadius;
    meshRef.current.position.x = x;
    meshRef.current.position.z = z;
    meshRef.current.rotation.y += rotationSpeed.current;
  });

  return (
    <mesh
      ref={meshRef}
      position={[orbitRadius, 0, 0]}
      raycast={() => null} // 레이캐스팅 비활성화
    >
      <dodecahedronGeometry args={[size]} />
      <meshStandardMaterial
        color={color}
        roughness={0.8}
        metalness={0.2}
      />
    </mesh>
  );
}

function AsteroidBelt({ minRadius, maxRadius, count }) {
  const asteroids = useMemo(() => {
    return Array.from({ length: count }).map((_, i) => ({
      radius: minRadius + (Math.random() * (maxRadius - minRadius)),
      speed: 0.001 + Math.random() * 0.002,
      size: 0.05 + Math.random() * 0.1,
      angle: (Math.PI * 2 * i) / count,
      color: new THREE.Color().setHSL(0.1, 0.3 + Math.random() * 0.2, 0.3 + Math.random() * 0.2),
      yOffset: (Math.random() - 0.5) * 0.5 // y축 오프셋 추가
    }));
  }, [minRadius, maxRadius, count]);

  return (
    <group>
      {asteroids.map((asteroid, i) => (
        <Asteroid
          key={i}
          orbitRadius={asteroid.radius}
          speed={asteroid.speed}
          size={asteroid.size}
          color={asteroid.color}
          initialAngle={asteroid.angle}
          y={asteroid.yOffset}
        />
      ))}
    </group>
  );
}

function SpaceDust() {
  const count = 1000;
  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const radius = 5 + Math.random() * 25;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.random() * Math.PI * 2;
      
      pos[i * 3] = radius * Math.cos(theta) * Math.cos(phi);
      pos[i * 3 + 1] = radius * Math.sin(phi);
      pos[i * 3 + 2] = radius * Math.sin(theta) * Math.cos(phi);
    }
    return pos;
  }, []);

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={count}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#ffffff"
        transparent
        opacity={0.3}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export default function ThreeDPage() {
  const [tooltipInfo, setTooltipInfo] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    console.log('3D 페이지가 마운트되었습니다');
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (gl) {
      console.log('WebGL 정보:', {
        version: gl.getParameter(gl.VERSION),
        vendor: gl.getParameter(gl.VENDOR),
        renderer: gl.getParameter(gl.RENDERER)
      });
    }
  }, []);

  return (
    <div style={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(to bottom, #000000, #0a0a2a)',
      margin: 0,
      padding: 0,
      overflow: 'hidden',
      position: 'fixed',
      top: 0,
      left: 0,
      zIndex: 10
    }}>
      {tooltipInfo && (
        <div style={{
          position: 'absolute',
          left: tooltipPosition.x + 10,
          top: tooltipPosition.y + 10,
          padding: '10px',
          background: 'rgba(0, 0, 0, 0.8)',
          border: '1px solid #444',
          borderRadius: '5px',
          color: 'white',
          fontSize: '14px',
          maxWidth: '300px',
          pointerEvents: 'none',
          zIndex: 100,
        }}>
          <h3 style={{ margin: '0 0 8px 0', color: '#88ccff' }}>{tooltipInfo.name}</h3>
          <p style={{ margin: '0 0 8px 0' }}>{tooltipInfo.description}</p>
          <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'auto 1fr',
            gap: '4px 8px',
            fontSize: '12px',
            color: '#ccc'
          }}>
            <span>지름:</span><span>{tooltipInfo.diameter}</span>
            <span>온도:</span><span>{tooltipInfo.temperature}</span>
            <span>자전주기:</span><span>{tooltipInfo.day}</span>
            <span>공전주기:</span><span>{tooltipInfo.year}</span>
          </div>
        </div>
      )}
      <Canvas
        camera={{ position: [0, 30, 60], fov: 60 }}
        style={{ width: '100%', height: '100%' }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: 'high-performance'
        }}
      >
        <color attach="background" args={['#000000']} />
        <ambientLight intensity={0.1} />
        
        <Stars 
          radius={100} 
          depth={50} 
          count={10000} 
          factor={4} 
          saturation={0} 
          fade 
          speed={1} 
        />
        
        <SolarSystemWithTooltips setTooltipInfo={setTooltipInfo} setTooltipPosition={setTooltipPosition} />
        
        <OrbitControls
          enableZoom={true}
          enablePan={true}
          enableRotate={true}
          zoomSpeed={0.5}
          panSpeed={0.5}
          rotateSpeed={0.5}
          minDistance={20}
          maxDistance={150}
        />
      </Canvas>
    </div>
  );
}

function SolarSystemWithTooltips({ setTooltipInfo, setTooltipPosition }) {
  return (
    <group>
      <Sun />
      {/* 수성 */}
      <PlanetWithTooltip
        orbitRadius={4}
        speed={0.025}
        size={0.2}
        color="#A0522D"
        initialAngle={0}
        planetInfo={PLANET_INFO.mercury}
        setTooltipInfo={setTooltipInfo}
        setTooltipPosition={setTooltipPosition}
      />
      {/* 금성 */}
      <PlanetWithTooltip
        orbitRadius={6}
        speed={0.02}
        size={0.4}
        color="#DEB887"
        initialAngle={2}
        planetInfo={PLANET_INFO.venus}
        setTooltipInfo={setTooltipInfo}
        setTooltipPosition={setTooltipPosition}
      />
      {/* 지구 */}
      <PlanetWithTooltip
        orbitRadius={8}
        speed={0.015}
        size={0.4}
        color="#4169E1"
        initialAngle={4}
        planetInfo={PLANET_INFO.earth}
        setTooltipInfo={setTooltipInfo}
        setTooltipPosition={setTooltipPosition}
      />
      {/* 화성 */}
      <PlanetWithTooltip
        orbitRadius={10}
        speed={0.012}
        size={0.3}
        color="#CD5C5C"
        initialAngle={1}
        planetInfo={PLANET_INFO.mars}
        setTooltipInfo={setTooltipInfo}
        setTooltipPosition={setTooltipPosition}
      />
      
      {/* 소행성대 */}
      <AsteroidBelt minRadius={12} maxRadius={14} count={200} />
      
      {/* 목성 */}
      <PlanetWithTooltip
        orbitRadius={16}
        speed={0.008}
        size={1.2}
        color="#DAA520"
        initialAngle={3}
        planetInfo={PLANET_INFO.jupiter}
        setTooltipInfo={setTooltipInfo}
        setTooltipPosition={setTooltipPosition}
      />
      {/* 토성 */}
      <PlanetWithTooltip
        orbitRadius={20}
        speed={0.006}
        size={1.0}
        color="#F4A460"
        initialAngle={5}
        planetInfo={PLANET_INFO.saturn}
        setTooltipInfo={setTooltipInfo}
        setTooltipPosition={setTooltipPosition}
      />
      {/* 천왕성 */}
      <PlanetWithTooltip
        orbitRadius={24}
        speed={0.004}
        size={0.8}
        color="#87CEEB"
        initialAngle={2}
        planetInfo={PLANET_INFO.uranus}
        setTooltipInfo={setTooltipInfo}
        setTooltipPosition={setTooltipPosition}
      />
      {/* 해왕성 */}
      <PlanetWithTooltip
        orbitRadius={28}
        speed={0.003}
        size={0.8}
        color="#1E90FF"
        initialAngle={4}
        planetInfo={PLANET_INFO.neptune}
        setTooltipInfo={setTooltipInfo}
        setTooltipPosition={setTooltipPosition}
      />
      
      {/* 우주 먼지 */}
      <SpaceDust />
      
      {/* 혜성 */}
      <Comet orbitA={32} orbitB={24} speed={0.002} size={0.4} />
    </group>
  );
}

function PlanetWithTooltip({ orbitRadius, speed, size, color, initialAngle, planetInfo, setTooltipInfo, setTooltipPosition }) {
  const meshRef = useRef();
  const [angle, setAngle] = React.useState(initialAngle);
  const { camera, size: canvasSize } = useThree();

  useFrame(() => {
    if (meshRef.current) {
      setAngle((prev) => prev + speed);
      const x = Math.cos(angle) * orbitRadius;
      const z = Math.sin(angle) * orbitRadius;
      meshRef.current.position.x = x;
      meshRef.current.position.z = z;
      meshRef.current.rotation.y += 0.01;
    }
  });

  const updateTooltipPosition = () => {
    if (meshRef.current) {
      const vector = new THREE.Vector3();
      meshRef.current.getWorldPosition(vector);
      vector.project(camera);
      
      setTooltipPosition({
        x: (vector.x + 1) * canvasSize.width / 2,
        y: (-vector.y + 1) * canvasSize.height / 2
      });
    }
  };

  return (
    <mesh
      ref={meshRef}
      position={[orbitRadius, 0, 0]}
      onPointerOver={(e) => {
        e.stopPropagation();
        setTooltipInfo(planetInfo);
        updateTooltipPosition();
      }}
      onPointerMove={updateTooltipPosition}
      onPointerOut={() => {
        setTooltipInfo(null);
      }}
    >
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial
        color={color}
        metalness={0.4}
        roughness={0.7}
      />
    </mesh>
  );
} 