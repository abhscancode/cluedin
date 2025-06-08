import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { Toaster } from "@/components/ui/toaster";
import { AnimatedLayout } from '@/components/layout/AnimatedLayout';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'CluedIn: See the Future First',
  description: 'Stay updated with upcoming events and important updates across politics, sports, culture, technology, and global affairs. Your smart solution for planning ahead.',
  keywords: 'upcoming events, news, future updates, politics, sports, culture, technology, global affairs',
  authors: [{ name: 'CluedIn Team' }],
  openGraph: {
    title: 'CluedIn: See the Future First',
    description: 'Your smart solution for staying ahead with upcoming events across all domains',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'CluedIn: See the Future First',
    description: 'Stay updated with upcoming events and important updates across all domains',
  },
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#0f172a',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body 
        className={`${geistSans.variable} ${geistMono.variable} font-sans antialiased bg-slate-950 text-white overflow-x-hidden`}
        suppressHydrationWarning
      >
        {/* Animated background */}
        <div className="fixed inset-0 -z-10">
          {/* Gradient background */}
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>
          
          {/* Animated grid pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px] animate-pulse"></div>
          </div>
          
          {/* Floating orbs */}
          <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-blue-500 rounded-full opacity-5 blur-3xl animate-pulse"></div>
          <div className="absolute top-3/4 right-1/4 w-96 h-96 bg-purple-500 rounded-full opacity-5 blur-3xl animate-pulse delay-1000"></div>
          <div className="absolute top-1/2 left-1/2 w-96 h-96 bg-emerald-500 rounded-full opacity-5 blur-3xl animate-pulse delay-2000"></div>
          
          {/* Moving particles */}
          <div className="absolute inset-0">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className={`absolute w-2 h-2 bg-white rounded-full opacity-20 animate-bounce`}
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${i * 0.5}s`,
                  animationDuration: `${3 + Math.random() * 2}s`
                }}
              ></div>
            ))}
          </div>
        </div>

        {/* Main content wrapper */}
        <AnimatedLayout>
          {children}
        </AnimatedLayout>
        
        <Toaster />
      </body>
    </html>
  );
}