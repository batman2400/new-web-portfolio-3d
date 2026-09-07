import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Mohan | Full Stack 3D & Creative Systems Engineer',
  description:
    'Interactive 3D developer portfolio built with React Three Fiber (R3F), Drei, Next.js 15, and Tailwind CSS. Showcasing WebGL architectures, spatial interfaces, and high-concurrency systems.',
  keywords: [
    'React Three Fiber',
    'Three.js',
    'Next.js',
    '3D Portfolio',
    'Tailwind CSS',
    'Creative Developer',
    'WebGL',
    'Full Stack Engineer',
  ],
  authors: [{ name: 'Mohan' }],
  creator: 'Mohan',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://mohan-portfolio-3d.vercel.app',
    title: 'Mohan | Full Stack 3D & Creative Systems Engineer',
    description:
      'High-performance 3D WebGL developer portfolio featuring interactive isometric cyber workstation and scroll-driven particle cosmos.',
    siteName: 'Mohan 3D Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mohan | Full Stack 3D & Creative Systems Engineer',
    description:
      'Interactive 3D portfolio powered by React Three Fiber, Drei, and Next.js.',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@300;400;500;600;700&family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#07090e] text-slate-100 antialiased selection:bg-cyan-500 selection:text-slate-950 font-sans min-h-screen">
        {children}
      </body>
    </html>
  );
}
