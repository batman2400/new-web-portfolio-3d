export interface Project {
  id: string;
  title: string;
  category: string;
  description: string;
  longDescription: string;
  tags: string[];
  metrics: string;
  demoUrl: string;
  githubUrl: string;
  color: string;
  accent: string;
  featured: boolean;
}

export interface SkillCategory {
  category: string;
  description: string;
  skills: { name: string; level: number; iconText: string; highlight?: boolean }[];
}

export interface TimelineItem {
  year: string;
  role: string;
  company: string;
  description: string;
  achievements: string[];
  tech: string[];
}

export const PORTFOLIO_DATA = {
  personal: {
    name: "Mohan",
    role: "Full Stack 3D & Creative Systems Engineer",
    tagline: "Architecting high-performance WebGL ecosystems, distributed backends, and tactile user interfaces.",
    location: "Global / Remote",
    status: "Available for ambitious opportunities",
    bio: "Passionate engineer specializing in modern web performance, declarative 3D graphics with React Three Fiber, and resilient microservices architectures. I blend rigorous software engineering with cinematic visual design to build digital experiences that leave a lasting impression.",
    socials: {
      github: "https://github.com",
      linkedin: "https://linkedin.com",
      twitter: "https://twitter.com",
      email: "mohan@example.com",
    },
    stats: [
      { label: "Years Experience", value: "5+" },
      { label: "Production Apps", value: "24+" },
      { label: "Open Source Stars", value: "1.2k+" },
      { label: "WebGL FPS Target", value: "60 FPS" },
    ],
  },
  projects: [
    {
      id: "aether-cloud",
      title: "Aether Engine: Distributed 3D Simulation",
      category: "3D & Cloud Systems",
      description: "Cloud-native real-time spatial simulator leveraging WebGPU, R3F shaders, and distributed WebSocket streaming.",
      longDescription: "Engineered a low-latency WebGL/WebGPU simulation platform capable of rendering 100,000+ physics particles at 60 FPS while synchronizing spatial coordinate state across distributed multi-tenant servers.",
      tags: ["React Three Fiber", "WebGPU", "Next.js", "Go", "Redis", "Tailwind CSS"],
      metrics: "100k+ dynamic particles @ 60 FPS",
      demoUrl: "https://github.com",
      githubUrl: "https://github.com",
      color: "from-cyan-500/20 to-blue-600/20",
      accent: "#00f0ff",
      featured: true,
    },
    {
      id: "quantum-flow",
      title: "QuantumFlow: AI Observability Suite",
      category: "AI & Full Stack",
      description: "Interactive observability dashboard with 3D cluster topology graphs, real-time LLM token tracing, and anomaly alerts.",
      longDescription: "Built an enterprise observability pipeline that models complex multi-agent LLM execution graphs in 3D space, cutting debugging time by 45% and providing sub-millisecond trace telemetry.",
      tags: ["Next.js 15", "Three.js", "Python FastAPI", "Tailwind CSS", "TypeScript", "ClickHouse"],
      metrics: "<15ms telemetry ingestion rate",
      demoUrl: "https://github.com",
      githubUrl: "https://github.com",
      color: "from-purple-500/20 to-pink-600/20",
      accent: "#a855f7",
      featured: true,
    },
    {
      id: "nexus-cad",
      title: "Nexus CAD: Browser Geometric Modeler",
      category: "Creative Tools",
      description: "Parametric CSG 3D modeling tool running entirely in the browser with WebAssembly and Draco asset compression.",
      longDescription: "Created a zero-install browser CAD editor featuring boolean mesh operations, real-time physically based materials, and direct export to GLTF, OBJ, and STL with sub-2MB Draco compression.",
      tags: ["TypeScript", "Three.js", "Wasm / Rust", "Zustand", "Tailwind CSS"],
      metrics: "90% smaller payload via Draco",
      demoUrl: "https://github.com",
      githubUrl: "https://github.com",
      color: "from-emerald-500/20 to-teal-600/20",
      accent: "#00ff88",
      featured: true,
    },
    {
      id: "hyper-terminal",
      title: "HyperSync: Zero-Knowledge Vault",
      category: "Security & FinTech",
      description: "End-to-end encrypted collaborative workspace with real-time biometric verification and audit trail logging.",
      longDescription: "Architected a compliant financial document store utilizing client-side AES-256-GCM encryption, WebAuthn passkeys, and tamper-evident Merkle tree transaction proofs.",
      tags: ["Next.js", "Web Crypto API", "Node.js", "PostgreSQL", "Docker"],
      metrics: "SOC2 Type II compliance ready",
      demoUrl: "https://github.com",
      githubUrl: "https://github.com",
      color: "from-amber-500/20 to-orange-600/20",
      accent: "#f59e0b",
      featured: false,
    },
  ] as Project[],
  skillCategories: [
    {
      category: "3D & Creative Engineering",
      description: "Real-time rendering, spatial shaders, and procedural graphics.",
      skills: [
        { name: "React Three Fiber (R3F)", level: 95, iconText: "R3F", highlight: true },
        { name: "Three.js & WebGL", level: 92, iconText: "3D", highlight: true },
        { name: "@react-three/drei", level: 90, iconText: "DR" },
        { name: "GLSL Shaders", level: 85, iconText: "FX" },
        { name: "Blender Asset Pipeline", level: 80, iconText: "BL" },
        { name: "Draco Mesh Compression", level: 88, iconText: "DC" },
      ],
    },
    {
      category: "Frontend Architecture",
      description: "Modern declarative interfaces and micro-interactions.",
      skills: [
        { name: "Next.js (App Router)", level: 96, iconText: "NXT", highlight: true },
        { name: "React 19 & TypeScript", level: 98, iconText: "TS", highlight: true },
        { name: "Tailwind CSS", level: 95, iconText: "TW" },
        { name: "Framer Motion & GSAP", level: 90, iconText: "GS" },
        { name: "Web Audio API", level: 84, iconText: "AUD" },
        { name: "State Management (Zustand)", level: 92, iconText: "ZU" },
      ],
    },
    {
      category: "Backend & Systems",
      description: "Scalable APIs, distributed messaging, and high-concurrency datastores.",
      skills: [
        { name: "Node.js / Express", level: 92, iconText: "JS" },
        { name: "PostgreSQL & Prisma", level: 88, iconText: "SQL" },
        { name: "Redis Caching", level: 85, iconText: "RD" },
        { name: "REST & GraphQL APIs", level: 90, iconText: "API" },
        { name: "Docker & Microservices", level: 82, iconText: "DK" },
        { name: "Cloudflare Workers / Edge", level: 86, iconText: "EDG" },
      ],
    },
  ] as SkillCategory[],
  timeline: [
    {
      year: "2024 - Present",
      role: "Lead 3D Web Architect",
      company: "Spatial Labs",
      description: "Spearheading browser-based 3D applications, WebGL optimization, and interactive design engineering.",
      achievements: [
        "Reduced initial 3D load times by 62% using dynamic mesh level-of-detail and Draco compression.",
        "Delivered interactive product showcase visited by 250k+ monthly active users.",
        "Mentored team of 8 frontend developers in declarative R3F patterns.",
      ],
      tech: ["React Three Fiber", "Next.js", "TypeScript", "Tailwind CSS", "GLTF"],
    },
    {
      year: "2022 - 2024",
      role: "Senior Full Stack Engineer",
      company: "CyberMatrix Technologies",
      description: "Engineered scalable telemetry portals and real-time visualization dashboards.",
      achievements: [
        "Built distributed real-time dashboard tracking 50,000 concurrent IoT device connections.",
        "Designed reusable UI component library reducing sprint turnaround time by 30%.",
      ],
      tech: ["React", "Node.js", "Three.js", "PostgreSQL", "Docker", "Tailwind"],
    },
    {
      year: "2020 - 2022",
      role: "Frontend Engineer",
      company: "NextGen Media",
      description: "Developed responsive client-facing web applications with rich micro-animations.",
      achievements: [
        "Increased conversion rates by 28% through accessible UI redesigns and core web vitals optimization.",
        "Authored custom WebGL background canvas transitions.",
      ],
      tech: ["JavaScript", "TypeScript", "CSS3 / Canvas", "REST APIs"],
    },
  ] as TimelineItem[],
};
