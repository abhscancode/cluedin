'use client';

import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { 
  Globe, 
  Zap, 
  Calendar, 
  TrendingUp, 
  Menu, 
  X, 
  Home,
  Bell,
  Search,
  Settings,
  User,
  ChevronRight,
  ArrowRight,
  Activity,
  Clock,
  Eye,
  ChevronUp,
  Star,
  Sparkles
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AnimatedLayoutProps {
  children: React.ReactNode;
}

export function AnimatedLayout({ children }: AnimatedLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/' },
    { icon: Calendar, label: 'Events', href: '/events' },
    { icon: TrendingUp, label: 'Trending', href: '/trending' },
    { icon: Bell, label: 'Notifications', href: '/notifications', badge: '3' },
    { icon: Search, label: 'Search', href: '/search' },
    { icon: Settings, label: 'Settings', href: '/settings' },
  ];

  // Subtle floating elements
  const floatingElements = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    icon: [Star, Sparkles][i % 2],
    delay: i * 2,
    x: 15 + (i * 15),
    y: 20 + (i * 10),
  }));

  return (
    <div className="min-h-screen bg-black text-white relative overflow-hidden">
      {/* Subtle cursor follower */}
      <motion.div
        className="fixed w-4 h-4 bg-white/10 rounded-full pointer-events-none z-50 backdrop-blur-sm"
        animate={{
          x: mousePosition.x - 8,
          y: mousePosition.y - 8,
        }}
        transition={{ type: "spring", damping: 25, stiffness: 150 }}
      />

      {/* Minimal floating background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {floatingElements.map((element) => {
          const Icon = element.icon;
          return (
            <motion.div
              key={element.id}
              className="absolute opacity-5"
              style={{
                left: `${element.x}%`,
                top: `${element.y}%`,
              }}
              animate={{
                y: [0, -20, 0],
                opacity: [0.05, 0.1, 0.05],
              }}
              transition={{
                duration: 6,
                repeat: Infinity,
                delay: element.delay,
                ease: "easeInOut",
              }}
            >
              <Icon className="w-6 h-6 text-white" />
            </motion.div>
          );
        })}
      </div>

      {/* Gradient overlay */}
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900/20 via-black to-gray-900/20 pointer-events-none" />

      {/* Navigation Header */}
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrollY > 50 
            ? 'bg-black/80 backdrop-blur-xl border-b border-gray-800/50' 
            : 'bg-transparent'
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18">
            {/* Logo */}
            <motion.div 
              className="flex items-center space-x-3"
              whileHover={{ scale: 1.03 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className="w-10 h-10 bg-gradient-to-br from-white to-gray-300 rounded-xl flex items-center justify-center shadow-lg"
                whileHover={{ rotate: 5 }}
                transition={{ duration: 0.3 }}
              >
                <Zap className="w-5 h-5 text-black" />
              </motion.div>
              <div>
                <motion.h1 
                  className="text-xl font-bold text-white"
                  whileHover={{ 
                    textShadow: "0 0 8px rgba(255,255,255,0.3)" 
                  }}
                >
                  CluedIn
                </motion.h1>
                <p className="text-xs text-gray-400 -mt-1">See the Future First</p>
              </div>
            </motion.div>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-1">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="relative"
                  initial={{ opacity: 0, y: -15 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.4 }}
                >
                  <motion.a
                    href={item.href}
                    className="relative px-4 py-2.5 rounded-lg text-gray-300 hover:text-white transition-all duration-300 flex items-center space-x-2 group"
                    whileHover={{ 
                      y: -2,
                      backgroundColor: "rgba(255,255,255,0.05)"
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    <motion.div
                      className="group-hover:scale-110 transition-transform duration-200"
                    >
                      <item.icon className="w-4 h-4" />
                    </motion.div>
                    <span className="text-sm font-medium">{item.label}</span>
                    {item.badge && (
                      <motion.span 
                        className="ml-1 px-2 py-0.5 bg-white text-black text-xs rounded-full font-medium"
                        animate={{ scale: [1, 1.1, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      >
                        {item.badge}
                      </motion.span>
                    )}
                    <motion.div
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-white origin-left scale-x-0 group-hover:scale-x-100 transition-transform duration-300"
                    />
                  </motion.a>
                </motion.div>
              ))}
            </nav>

            {/* Mobile menu button */}
            <motion.button
              className="lg:hidden p-2.5 rounded-lg hover:bg-white/10 transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </motion.div>
            </motion.button>

            {/* User Profile */}
            <div className="hidden lg:flex items-center space-x-3">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-gray-700 hover:bg-white/10 bg-white/5 backdrop-blur-sm"
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Updates
                </Button>
              </motion.div>
              
              <motion.div 
                className="w-9 h-9 bg-gradient-to-r from-gray-200 to-white rounded-full flex items-center justify-center cursor-pointer shadow-lg"
                whileHover={{ 
                  scale: 1.1,
                  boxShadow: "0 0 20px rgba(255,255,255,0.3)"
                }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="w-4 h-4 text-black" />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-md" onClick={() => setIsMenuOpen(false)} />
            <motion.div
              className="absolute top-0 right-0 w-80 h-full bg-gradient-to-b from-gray-900 to-black border-l border-gray-800"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 20, stiffness: 200 }}
            >
              <div className="p-6 pt-24">
                <motion.div 
                  className="mb-8 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Zap className="w-6 h-6 text-black" />
                  </div>
                  <h2 className="text-lg font-semibold text-white">Menu</h2>
                </motion.div>

                <nav className="space-y-2">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className="flex items-center justify-between p-4 rounded-xl hover:bg-white/10 transition-all duration-200"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.3 }}
                      onClick={() => setIsMenuOpen(false)}
                      whileHover={{ scale: 1.02, x: 5 }}
                    >
                      <div className="flex items-center space-x-3">
                        <item.icon className="w-5 h-5 text-gray-400" />
                        <span className="text-gray-300 font-medium">{item.label}</span>
                        {item.badge && (
                          <span className="px-2 py-1 bg-white text-black text-xs rounded-full font-medium">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <ChevronRight className="w-4 h-4 text-gray-600" />
                    </motion.a>
                  ))}
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative pt-28 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center"
      >
        <div className="container mx-auto text-center relative">
          {/* Badge */}
          <motion.div
            className="inline-flex items-center space-x-3 bg-white/10 rounded-full px-5 py-2.5 mb-10 backdrop-blur-sm border border-white/20"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            whileHover={{ scale: 1.05 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            >
              <Globe className="w-4 h-4 text-white" />
            </motion.div>
            <span className="text-sm text-white font-medium">Live Updates • Real-time Events</span>
            <motion.div 
              className="w-2.5 h-2.5 bg-green-400 rounded-full"
              animate={{ scale: [1, 1.3, 1], opacity: [1, 0.7, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            />
          </motion.div>

          {/* Hero title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 0.8 }}
          >
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight"
              whileInView={{ 
                textShadow: [
                  "0 0 0px rgba(255,255,255,0)",
                  "0 0 20px rgba(255,255,255,0.1)",
                  "0 0 0px rgba(255,255,255,0)"
                ]
              }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              <motion.span 
                className="block text-white mb-3"
                animate={{ 
                  backgroundImage: [
                    "linear-gradient(45deg, #ffffff, #f0f0f0)",
                    "linear-gradient(45deg, #f0f0f0, #ffffff)",
                    "linear-gradient(45deg, #ffffff, #f0f0f0)"
                  ]
                }}
                style={{ backgroundClip: "text", WebkitBackgroundClip: "text" }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                See the Future
              </motion.span>
              <motion.span 
                className="block bg-gradient-to-r from-gray-300 via-white to-gray-300 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ['0%', '100%', '0%'] 
                }}
                style={{ backgroundSize: '200% 100%' }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                First
              </motion.span>
            </motion.h1>
          </motion.div>

          <motion.p 
            className="text-lg md:text-xl text-gray-300 mb-12 max-w-4xl mx-auto leading-relaxed"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 0.6 }}
          >
            Stay ahead with upcoming events and important updates across{' '}
            <motion.span 
              className="text-white font-medium"
              whileHover={{ 
                textShadow: "0 0 8px rgba(255,255,255,0.5)" 
              }}
            >
              politics, sports, culture, technology,
            </motion.span>{' '}
            and global affairs. Your smart solution for planning ahead.
          </motion.p>

          {/* CTA buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.6 }}
          >
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg" 
                className="bg-white text-black hover:bg-gray-200 px-8 py-3 rounded-xl font-semibold shadow-lg"
              >
                <span className="flex items-center space-x-2">
                  <span>Explore Events</span>
                  <motion.div
                    whileHover={{ x: 3 }}
                    transition={{ duration: 0.2 }}
                  >
                    <ArrowRight className="w-4 h-4" />
                  </motion.div>
                </span>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-2 border-white/30 hover:bg-white/10 hover:border-white/50 px-8 py-3 rounded-xl font-semibold backdrop-blur-sm"
              >
                <span className="flex items-center space-x-2">
                  <TrendingUp className="w-4 h-4" />
                  <span>See What's Trending</span>
                </span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats section */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            {[
              { icon: Activity, label: 'Live Events', value: '2,847' },
              { icon: Clock, label: 'Hours Saved', value: '10K+' },
              { icon: Eye, label: 'Accuracy', value: '95%' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="p-6 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 hover:border-white/20 transition-all duration-300"
                whileHover={{ 
                  y: -5, 
                  backgroundColor: "rgba(255,255,255,0.1)",
                  scale: 1.02
                }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.4 + index * 0.2, duration: 0.5 }}
              >
                <motion.div
                  className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center mb-4 mx-auto"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </motion.div>
                <motion.div 
                  className="text-3xl font-bold text-white mb-2"
                  whileHover={{ 
                    textShadow: "0 0 10px rgba(255,255,255,0.3)" 
                  }}
                >
                  {stat.value}
                </motion.div>
                <p className="text-gray-400">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content */}
      <motion.main 
        className="relative px-4 sm:px-6 lg:px-8 pb-20"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 0.8 }}
      >
        <div className="container mx-auto">
          {children}
        </div>
      </motion.main>

      {/* Footer */}
      <motion.footer 
        className="relative bg-gradient-to-t from-gray-900 to-black border-t border-gray-800"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.6 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center">
                  <Zap className="w-4 h-4 text-black" />
                </div>
                <span className="text-lg font-semibold text-white">CluedIn</span>
              </div>
              <p className="text-gray-400 leading-relaxed">
                Your smart solution for staying ahead of tomorrow's events.
              </p>
            </div>
            
            <div>
              <h3 className="text-white font-medium mb-4">Quick Links</h3>
              <div className="space-y-2">
                {['Dashboard', 'Events', 'Trending', 'About'].map((link) => (
                  <motion.a
                    key={link}
                    href={`/${link.toLowerCase()}`}
                    className="block text-gray-400 hover:text-white transition-colors duration-200"
                    whileHover={{ x: 5 }}
                  >
                    {link}
                  </motion.a>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-white font-medium mb-4">Support</h3>
              <div className="space-y-2">
                {['Privacy', 'Terms', 'Contact', 'Help'].map((link) => (
                  <motion.a
                    key={link}
                    href={`/${link.toLowerCase()}`}
                    className="block text-gray-400 hover:text-white transition-colors duration-200"
                    whileHover={{ x: 5 }}
                  >
                    {link}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-800 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-gray-500 text-sm mb-4 md:mb-0">
                © 2025 CluedIn. All rights reserved.
              </p>
              <motion.div 
                className="text-sm text-gray-400"
                animate={{ opacity: [0.7, 1, 0.7] }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                Made with care for the future
              </motion.div>
            </div>
          </div>
        </div>
      </motion.footer>

      {/* Scroll to top button */}
      <AnimatePresence>
        {scrollY > 400 && (
          <motion.button
            className="fixed bottom-6 right-6 w-12 h-12 bg-white hover:bg-gray-200 text-black rounded-full flex items-center justify-center shadow-lg z-40 backdrop-blur-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.8 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <ChevronUp className="w-5 h-5" />
          </motion.button>
        )}
      </AnimatePresence>

      {/* Progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-0.5 bg-white z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}