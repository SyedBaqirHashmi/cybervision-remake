'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';
function Network({
  active
}: {
  active: boolean;
}) {
  const group = useRef<THREE.Group>(null);
  const {
    points,
    links
  } = useMemo(() => {
    const positions: number[] = [];
    const edges: number[] = [];
    const n = 90;
    for (let i = 0; i < n; i++) {
      const y = 1 - i / (n - 1) * 2;
      const radius = Math.sqrt(1 - y * y);
      const angle = Math.PI * (3 - Math.sqrt(5)) * i;
      positions.push(Math.cos(angle) * radius * 2, y * 2, Math.sin(angle) * radius * 2);
    }
    for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) {
      const distance = Math.hypot(positions[i * 3] - positions[j * 3], positions[i * 3 + 1] - positions[j * 3 + 1], positions[i * 3 + 2] - positions[j * 3 + 2]);
      if (distance < .77) edges.push(...positions.slice(i * 3, i * 3 + 3), ...positions.slice(j * 3, j * 3 + 3));
    }
    return {
      points: new Float32Array(positions),
      links: new Float32Array(edges)
    };
  }, []);
  useFrame(({
    pointer
  }, delta) => {
    if (!active || !group.current) return;
    const d = Math.min(delta, .05);
    group.current.rotation.y += d * .055;
    group.current.rotation.x = THREE.MathUtils.damp(group.current.rotation.x, pointer.y * .1, 2, d);
    group.current.position.x = THREE.MathUtils.damp(group.current.position.x, pointer.x * .1, 2, d);
  });
  return <group ref={group} rotation={[.15, .35, .15]}>
  <points>
    <bufferGeometry>
      <bufferAttribute attach="attributes-position" args={[points, 3]} />
    </bufferGeometry>
    <pointsMaterial color="#a5f3fc" size={.046} sizeAttenuation transparent opacity={.95} />
  </points>
  <lineSegments>
    <bufferGeometry>
      <bufferAttribute attach="attributes-position" args={[links, 3]} />
    </bufferGeometry>
    <lineBasicMaterial color="#38bdf8" transparent opacity={.22} />
  </lineSegments>
  <mesh rotation={[1.1, .3, .2]}>
    <torusGeometry args={[2.32, .008, 8, 128]} />
    <meshBasicMaterial color="#818cf8" transparent opacity={.8} />
  </mesh>
  <mesh rotation={[.1, 1.2, -.4]}>
    <torusGeometry args={[2.55, .006, 8, 128]} />
    <meshBasicMaterial color="#67e8f9" transparent opacity={.55} />
  </mesh>
  <mesh>
    <sphereGeometry args={[1.52, 24, 16]} />
    <meshBasicMaterial color="#0c1630" transparent opacity={.75} />
  </mesh>
  </group>;
}
export default function NeuralScene({
  active
}: {
  active: boolean;
}) {
  return <Canvas camera={{
    position: [0, 0, 7],
    fov: 45
  }} dpr={[1, 1.5]} gl={{
    antialias: false,
    alpha: true,
    powerPreference: 'low-power'
  }} frameloop={active ? 'always' : 'demand'} style={{
    touchAction: 'pan-y'
  }}>
  <Network active={active} />
  </Canvas>;
}
