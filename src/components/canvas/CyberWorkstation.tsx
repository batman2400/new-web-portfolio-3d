'use client';

import { Float, Html } from '@react-three/drei';
import { useFrame } from '@react-three/fiber';
import { useMemo, useRef, useState } from 'react';
import * as THREE from 'three';
import { sound } from '@/utils/soundEngine';

interface CyberWorkstationProps {
  onMonitorClick?: () => void;
  activePreset?: string;
}

export default function CyberWorkstation({ onMonitorClick }: CyberWorkstationProps) {
  const [hovered, setHovered] = useState(false);
  const steamRef = useRef<THREE.Points>(null);
  const ringRef = useRef<THREE.Group>(null);
  const monitorGlowRef = useRef<THREE.PointLight>(null);

  // Dynamic code canvas texture for the main monitor screen
  const codeTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 1024;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    const renderCanvas = (time = 0) => {
      // Dark IDE background
      ctx.fillStyle = '#070b14';
      ctx.fillRect(0, 0, 1024, 512);

      // Top title bar
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, 1024, 40);
      ctx.fillStyle = '#ff5f56';
      ctx.beginPath();
      ctx.arc(24, 20, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#ffbd2e';
      ctx.beginPath();
      ctx.arc(44, 20, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#27c93f';
      ctx.beginPath();
      ctx.arc(64, 20, 6, 0, Math.PI * 2);
      ctx.fill();

      // Tab title
      ctx.fillStyle = '#94a3b8';
      ctx.font = '16px monospace';
      ctx.fillText('⚡ portfolio-engine.ts — Spatial Mesh Runtime', 90, 26);

      // Simulated code lines
      const codeLines = [
        { text: 'import { Engine, WebGPU, ShaderPass } from "@core/graphics";', color: '#a855f7' },
        { text: 'import { useQuantumCluster } from "@neural/state";', color: '#a855f7' },
        { text: '', color: '#fff' },
        { text: 'export async function initializeScene(canvas: HTMLCanvasElement) {', color: '#00f0ff' },
        { text: '  const gpu = await WebGPU.requestAdapter({ powerPreference: "high-perf" });', color: '#38bdf8' },
        { text: '  const cluster = new useQuantumCluster({ nodes: 100_000, targetFPS: 60 });', color: '#facc15' },
        { text: '  const shaderPipeline = ShaderPass.compose(["bloom", "raymarch", "chroma"]);', color: '#00ff88' },
        { text: '  ', color: '#fff' },
        { text: '  cluster.onUpdate((delta, telemetry) => {', color: '#00f0ff' },
        { text: '    telemetry.streamMetrics({ frameDelta: delta, memoryBandwidth: "1.4 GB/s" });', color: '#f43f5e' },
        { text: '    gpu.renderPass(cluster.geometry, shaderPipeline);', color: '#38bdf8' },
        { text: '  });', color: '#00f0ff' },
        { text: '}', color: '#00f0ff' },
      ];

      codeLines.forEach((line, idx) => {
        ctx.fillStyle = '#334155';
        ctx.font = '16px monospace';
        ctx.fillText(String(idx + 1).padStart(2, '0'), 25, 75 + idx * 28);

        ctx.fillStyle = line.color;
        ctx.font = '18px monospace';
        ctx.fillText(line.text, 65, 75 + idx * 28);
      });

      // Flashing cursor
      if (Math.floor(time * 2) % 2 === 0) {
        ctx.fillStyle = '#00f0ff';
        ctx.fillRect(480, 75 + 11 * 28 - 14, 10, 20);
      }

      // Bottom status bar
      ctx.fillStyle = '#00f0ff';
      ctx.fillRect(0, 485, 1024, 27);
      ctx.fillStyle = '#070b14';
      ctx.font = 'bold 14px monospace';
      ctx.fillText('READY  ● Git: main*  ● UTF-8  ● TypeScript 5.7  ● 60.0 FPS  ● All Systems Nominal', 20, 503);
    };

    renderCanvas(0);
    const texture = new THREE.CanvasTexture(canvas);
    texture.minFilter = THREE.LinearFilter;
    texture.magFilter = THREE.LinearFilter;
    return { texture, canvas, ctx, renderCanvas };
  }, []);

  // Vertical telemetry screen texture
  const sideTexture = useMemo(() => {
    if (typeof document === 'undefined') return null;
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 512;
    const ctx = canvas.getContext('2d');
    if (!ctx) return null;

    ctx.fillStyle = '#0b0f19';
    ctx.fillRect(0, 0, 256, 512);

    ctx.fillStyle = '#00f0ff';
    ctx.font = 'bold 16px monospace';
    ctx.fillText('TELEMETRY', 20, 30);

    ctx.fillStyle = '#38bdf8';
    ctx.font = '12px monospace';
    ctx.fillText('GPU Load:  18%', 20, 60);
    ctx.fillText('VRAM:      1.2 GB', 20, 80);
    ctx.fillText('Framerate: 60 FPS', 20, 100);
    ctx.fillText('Latency:   4.2 ms', 20, 120);

    // Wave graph
    ctx.strokeStyle = '#00ff88';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(20, 200);
    for (let x = 20; x < 236; x += 5) {
      const y = 200 + Math.sin(x * 0.1) * 20 + Math.cos(x * 0.05) * 10;
      ctx.lineTo(x, y);
    }
    ctx.stroke();

    ctx.fillStyle = '#a855f7';
    ctx.fillText('SERVICES STATUS', 20, 260);
    const services = ['API Gateway: OK', 'Edge Nodes: 12/12', 'Cache Hit: 99.4%', 'Auth Service: UP'];
    services.forEach((s, idx) => {
      ctx.fillStyle = '#94a3b8';
      ctx.fillText(s, 20, 290 + idx * 24);
    });

    const texture = new THREE.CanvasTexture(canvas);
    return texture;
  }, []);

  // Coffee steam particle data
  const steamParticles = useMemo(() => {
    const count = 35;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 0.08;
      positions[i * 3 + 1] = Math.random() * 0.4;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 0.08;
    }
    return { positions, count };
  }, []);

  useFrame((state, delta) => {
    const time = state.clock.getElapsedTime();

    // Animate monitor canvas blinking cursor
    if (codeTexture && Math.floor(time * 2) !== Math.floor((time - delta) * 2)) {
      codeTexture.renderCanvas(time);
      codeTexture.texture.needsUpdate = true;
    }

    // Animate holographic rings
    if (ringRef.current) {
      ringRef.current.rotation.y = time * 0.3;
      ringRef.current.rotation.z = Math.sin(time * 0.2) * 0.15;
    }

    // Animate coffee steam
    if (steamRef.current) {
      const posAttr = steamRef.current.geometry.attributes.position as THREE.BufferAttribute;
      const array = posAttr.array as Float32Array;
      for (let i = 0; i < steamParticles.count; i++) {
        const i3 = i * 3;
        array[i3 + 1] += delta * 0.25; // rise up
        array[i3] += Math.sin(time * 2 + i) * 0.001; // sway
        if (array[i3 + 1] > 0.5) {
          array[i3 + 1] = 0.05;
          array[i3] = (Math.random() - 0.5) * 0.08;
        }
      }
      posAttr.needsUpdate = true;
    }

    // Subtle breathing glow from main monitor
    if (monitorGlowRef.current) {
      monitorGlowRef.current.intensity = 1.2 + Math.sin(time * 3) * 0.3;
    }
  });

  return (
    <group position={[0, -0.2, 0]}>
      {/* --- DESK SURFACE --- */}
      {/* Main desktop slab */}
      <mesh position={[0, 1.0, 0]} receiveShadow castShadow>
        <boxGeometry args={[4.2, 0.1, 2.2]} />
        <meshStandardMaterial
          color="#0f172a"
          roughness={0.25}
          metalness={0.8}
        />
      </mesh>

      {/* Desk edge cyan neon strip */}
      <mesh position={[0, 0.98, 1.1]}>
        <boxGeometry args={[4.22, 0.04, 0.04]} />
        <meshStandardMaterial
          color="#00f0ff"
          emissive="#00f0ff"
          emissiveIntensity={1.5}
        />
      </mesh>

      {/* Desk metallic legs */}
      <mesh position={[-1.9, 0.5, 0.9]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 1.0]} />
        <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[1.9, 0.5, 0.9]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 1.0]} />
        <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[-1.9, 0.5, -0.9]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 1.0]} />
        <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.1} />
      </mesh>
      <mesh position={[1.9, 0.5, -0.9]} castShadow>
        <cylinderGeometry args={[0.04, 0.04, 1.0]} />
        <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* Extended mousepad */}
      <mesh position={[0, 1.055, 0.2]}>
        <boxGeometry args={[3.2, 0.01, 1.2]} />
        <meshStandardMaterial color="#07090e" roughness={0.9} />
      </mesh>

      {/* --- MONITORS --- */}
      {/* Central Ultra-wide Curved Monitor */}
      <group
        position={[0, 1.85, -0.35]}
        onPointerOver={(e) => {
          e.stopPropagation();
          setHovered(true);
          sound.playBlip(680, 0.03, 0.06);
        }}
        onPointerOut={(e) => {
          e.stopPropagation();
          setHovered(false);
        }}
        onClick={(e) => {
          e.stopPropagation();
          sound.playSuccess();
          onMonitorClick?.();
        }}
      >
        {/* Monitor Frame */}
        <mesh castShadow>
          <boxGeometry args={[2.5, 1.25, 0.08]} />
          <meshStandardMaterial
            color="#1e293b"
            metalness={0.7}
            roughness={0.3}
          />
        </mesh>

        {/* Screen Display */}
        <mesh position={[0, 0, 0.045]}>
          <planeGeometry args={[2.42, 1.18]} />
          {codeTexture ? (
            <meshBasicMaterial map={codeTexture.texture} />
          ) : (
            <meshStandardMaterial color="#070b14" emissive="#00f0ff" emissiveIntensity={0.2} />
          )}
        </mesh>

        {/* Monitor Stand Base & Arm */}
        <mesh position={[0, -0.65, -0.2]}>
          <cylinderGeometry args={[0.04, 0.04, 0.6]} />
          <meshStandardMaterial color="#334155" metalness={0.9} roughness={0.2} />
        </mesh>
        <mesh position={[0, -0.82, -0.1]}>
          <cylinderGeometry args={[0.3, 0.3, 0.04, 32]} />
          <meshStandardMaterial color="#1e293b" metalness={0.8} />
        </mesh>

        {/* Dynamic Light coming from monitor face */}
        <pointLight
          ref={monitorGlowRef}
          position={[0, 0, 0.4]}
          color="#00f0ff"
          distance={3}
          intensity={hovered ? 2.5 : 1.4}
        />

        {/* 3D Interactive Badge on hover */}
        {hovered && (
          <Html position={[0, 0.8, 0]} center distanceFactor={8} zIndexRange={[100, 0]}>
            <div className="pointer-events-none rounded-full border border-cyan-400/60 bg-slate-950/90 px-3 py-1 text-xs font-mono text-cyan-300 shadow-glow-cyan backdrop-blur-md">
              ⚡ Click to Inspect Architecture
            </div>
          </Html>
        )}
      </group>

      {/* Secondary Vertical Monitor (Right side) */}
      <group position={[1.55, 1.85, -0.15]} rotation={[0, -0.38, 0]}>
        <mesh castShadow>
          <boxGeometry args={[0.75, 1.35, 0.06]} />
          <meshStandardMaterial color="#1e293b" metalness={0.7} roughness={0.3} />
        </mesh>
        <mesh position={[0, 0, 0.035]}>
          <planeGeometry args={[0.7, 1.3]} />
          {sideTexture ? (
            <meshBasicMaterial map={sideTexture} />
          ) : (
            <meshStandardMaterial color="#0b0f19" />
          )}
        </mesh>
        <mesh position={[0, -0.7, -0.1]}>
          <cylinderGeometry args={[0.03, 0.03, 0.5]} />
          <meshStandardMaterial color="#334155" metalness={0.9} />
        </mesh>
      </group>

      {/* --- MECHANICAL KEYBOARD --- */}
      <group position={[-0.15, 1.07, 0.35]} rotation={[-0.05, 0, 0]}>
        {/* Keyboard Base Chasis */}
        <mesh castShadow>
          <boxGeometry args={[1.05, 0.04, 0.38]} />
          <meshStandardMaterial
            color="#0f172a"
            metalness={0.6}
            roughness={0.4}
          />
        </mesh>
        {/* Keyboard RGB underglow */}
        <mesh position={[0, -0.015, 0]}>
          <boxGeometry args={[1.08, 0.01, 0.4]} />
          <meshStandardMaterial
            color="#a855f7"
            emissive="#a855f7"
            emissiveIntensity={2.0}
          />
        </mesh>
        {/* Keycaps block */}
        <mesh position={[0, 0.03, 0]}>
          <boxGeometry args={[0.98, 0.02, 0.34]} />
          <meshStandardMaterial
            color="#1e293b"
            roughness={0.5}
          />
        </mesh>
      </group>

      {/* --- ERGONOMIC MOUSE --- */}
      <group position={[0.75, 1.075, 0.35]} rotation={[0, -0.1, 0]}>
        <mesh castShadow>
          <capsuleGeometry args={[0.045, 0.07, 8, 16]} />
          <meshStandardMaterial color="#1e293b" metalness={0.5} roughness={0.3} />
        </mesh>
        {/* Scroll wheel RGB line */}
        <mesh position={[0, 0.04, -0.02]}>
          <boxGeometry args={[0.01, 0.015, 0.04]} />
          <meshStandardMaterial color="#00f0ff" emissive="#00f0ff" emissiveIntensity={2.5} />
        </mesh>
      </group>

      {/* --- COFFEE MUG WITH STEAM --- */}
      <group position={[-1.2, 1.15, 0.3]}>
        <mesh castShadow>
          <cylinderGeometry args={[0.09, 0.075, 0.18, 24]} />
          <meshStandardMaterial color="#f8fafc" roughness={0.2} metalness={0.1} />
        </mesh>
        {/* Coffee liquid surface */}
        <mesh position={[0, 0.07, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.01, 24]} />
          <meshStandardMaterial color="#3b1d0c" roughness={0.1} />
        </mesh>
        {/* Rising steam particles */}
        <points ref={steamRef} position={[0, 0.1, 0]}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              args={[steamParticles.positions, 3]}
            />
          </bufferGeometry>
          <pointsMaterial
            size={0.035}
            color="#94a3b8"
            transparent
            opacity={0.35}
            depthWrite={false}
          />
        </points>
      </group>

      {/* --- HOLOGRAPHIC QUANTUM RINGS --- */}
      <Float speed={2} rotationIntensity={0.4} floatIntensity={0.5}>
        <group ref={ringRef} position={[0, 2.8, -0.5]}>
          {/* Outer ring */}
          <mesh>
            <torusGeometry args={[1.8, 0.012, 16, 64]} />
            <meshStandardMaterial
              color="#00f0ff"
              emissive="#00f0ff"
              emissiveIntensity={1.8}
              transparent
              opacity={0.45}
            />
          </mesh>
          {/* Inner ring */}
          <mesh rotation={[Math.PI / 4, 0, 0]}>
            <torusGeometry args={[1.3, 0.008, 16, 64]} />
            <meshStandardMaterial
              color="#a855f7"
              emissive="#a855f7"
              emissiveIntensity={2.0}
              transparent
              opacity={0.5}
            />
          </mesh>
        </group>
      </Float>

      {/* --- CYBER FLOOR GRID & REFLECTION --- */}
      <mesh position={[0, 0, 0]} rotation={[-Math.PI / 2, 0, 0]} receiveShadow>
        <planeGeometry args={[20, 20]} />
        <meshStandardMaterial
          color="#05070c"
          roughness={0.6}
          metalness={0.4}
        />
      </mesh>
      <gridHelper args={[20, 20, '#00f0ff', '#1e293b']} position={[0, 0.005, 0]} />
    </group>
  );
}
