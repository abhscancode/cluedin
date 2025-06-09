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
  Star,
  Activity,
  Clock,
  Sparkles,
  Eye,

  Rocket
} from 'lucide-react';
import { Button } from '@/components/ui/button';

interface AnimatedLayoutProps {
  children: React.ReactNode;
}

export function AnimatedLayout({ children }: AnimatedLayoutProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHeroVisible, setIsHeroVisible] = useState(true);
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll();
  
  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '50%']);
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '200%']);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
      if (heroRef.current) {
        const heroBottom = heroRef.current.offsetTop + heroRef.current.offsetHeight;
        setIsHeroVisible(window.scrollY < heroBottom - 100);
      }
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
    { icon: Home, label: 'Dashboard', href: '/', color: 'from-blue-500 to-cyan-500' },
    { icon: Calendar, label: 'Events', href: '/events', color: 'from-purple-500 to-pink-500' },
    { icon: TrendingUp, label: 'Trending', href: '/trending', color: 'from-emerald-500 to-teal-500' },
    { icon: Bell, label: 'Notifications', href: '/notifications', color: 'from-orange-500 to-red-500', badge: '3' },
    { icon: Search, label: 'Search', href: '/search', color: 'from-indigo-500 to-purple-500' },
    { icon: Settings, label: 'Settings', href: '/settings', color: 'from-gray-500 to-slate-500' },
  ];

  const floatingElements = Array.from({ length: 12 }, (_, i) => ({
    id: i,
    icon: [Star, Sparkles, Zap, Eye, Activity][i % 5],
    delay: i * 0.5,
    duration: 3 + (i % 3),
    x: Math.random() * 100,
    y: Math.random() * 100,
  }));

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Dynamic cursor follower */}
      <motion.div
        className="fixed w-6 h-6 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full pointer-events-none z-50 opacity-20 blur-sm"
        animate={{
          x: mousePosition.x - 12,
          y: mousePosition.y - 12,
        }}
        transition={{ type: "spring", damping: 30, stiffness: 200 }}
      />

      {/* Enhanced floating background elements */}
      <div className="fixed inset-0 pointer-events-none">
        {floatingElements.map((element) => {
          const Icon = element.icon;
          return (
            <motion.div
              key={element.id}
              className="absolute opacity-10"
              style={{
                left: `${element.x}%`,
                top: `${element.y}%`,
              }}
              animate={{
                y: [0, -30, 0],
                rotate: [0, 180, 360],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: element.duration,
                repeat: Infinity,
                delay: element.delay,
                ease: "easeInOut",
              }}
            >
              <Icon className="w-8 h-8 text-white" />
            </motion.div>
          );
        })}
      </div>

      {/* Navigation Header with enhanced glass effect */}
      <motion.header 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrollY > 50 
            ? 'bg-slate-950/60 backdrop-blur-2xl border-b border-slate-700/30 shadow-2xl shadow-blue-500/10' 
            : 'bg-transparent'
        }`}
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Enhanced Logo */}
            <motion.div 
              className="flex items-center space-x-4"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <div className="relative group">
                <motion.div 
                  className="w-12 h-12 bg-gradient-to-br from-blue-500 via-purple-600 to-pink-500 rounded-2xl flex items-center justify-center shadow-lg"
                  animate={{ 
                    boxShadow: [
                      '0 0 20px rgba(59, 130, 246, 0.5)',
                      '0 0 30px rgba(147, 51, 234, 0.5)',
                      '0 0 20px rgba(59, 130, 246, 0.5)'
                    ]
                  }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <Zap className="w-7 h-7 text-white" />
                </motion.div>
                <motion.div 
                  className="absolute -top-2 -right-2 w-5 h-5 bg-gradient-to-r from-emerald-400 to-teal-400 rounded-full"
                  animate={{ scale: [1, 1.3, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              </div>
              <div>
                <motion.h1 
                  className="text-2xl font-bold bg-gradient-to-r from-white via-blue-200 to-purple-200 bg-clip-text text-transparent"
                  animate={{ 
                    backgroundPosition: ['0%', '100%', '0%'] 
                  }}
                  transition={{ duration: 3, repeat: Infinity }}
                >
                  CluedIn
                </motion.h1>
                <p className="text-xs text-gray-400 -mt-1 font-medium">See the Future First</p>
              </div>
            </motion.div>

            {/* Enhanced Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-2">
              {navItems.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="relative"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                >
                  <motion.a
                    href={item.href}
                    className="group relative px-5 py-3 rounded-xl text-gray-300 hover:text-white transition-all duration-300 flex items-center space-x-3 overflow-hidden"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-20 rounded-xl transition-opacity duration-300`}
                    />
                    <div className="relative flex items-center space-x-2">
                      <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                      <span className="text-sm font-medium">{item.label}</span>
                      {item.badge && (
                        <motion.span 
                          className="absolute -top-2 -right-2 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center"
                          animate={{ scale: [1, 1.2, 1] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          {item.badge}
                        </motion.span>
                      )}
                    </div>
                  </motion.a>
                </motion.div>
              ))}
            </nav>

            {/* Mobile menu button */}
            <motion.button
              className="lg:hidden p-3 rounded-xl hover:bg-slate-800/50 transition-colors relative overflow-hidden group"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              whileTap={{ scale: 0.9 }}
            >
              <motion.div
                className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
              />
              <motion.div
                animate={{ rotate: isMenuOpen ? 180 : 0 }}
                transition={{ duration: 0.3 }}
              >
                {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </motion.div>
            </motion.button>

            {/* Enhanced User Profile */}
            <div className="hidden lg:flex items-center space-x-4">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="border-slate-600 hover:bg-slate-800 bg-slate-900/50 backdrop-blur-sm relative overflow-hidden group"
                >
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-blue-500/20 to-purple-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                  />
                  <Bell className="w-4 h-4 mr-2" />
                  <span>Updates</span>
                  <motion.div 
                    className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  />
                </Button>
              </motion.div>
              
              <motion.div 
                className="relative w-10 h-10 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-500 rounded-full flex items-center justify-center cursor-pointer shadow-lg"
                whileHover={{ scale: 1.1, rotate: 5 }}
                whileTap={{ scale: 0.9 }}
                animate={{ 
                  boxShadow: [
                    '0 0 20px rgba(20, 184, 166, 0.3)',
                    '0 0 30px rgba(6, 182, 212, 0.4)',
                    '0 0 20px rgba(20, 184, 166, 0.3)'
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <User className="w-5 h-5 text-white" />
                <motion.div 
                  className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-400 rounded-full border-2 border-slate-950"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Enhanced Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            className="fixed inset-0 z-40 lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute inset-0 bg-slate-950/90 backdrop-blur-2xl" onClick={() => setIsMenuOpen(false)} />
            <motion.div
              className="absolute top-0 right-0 w-80 h-full bg-gradient-to-b from-slate-900 to-slate-950 border-l border-slate-700/50 shadow-2xl"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="p-6 pt-24">
                <motion.div 
                  className="mb-8 text-center"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="w-8 h-8 text-white" />
                  </div>
                  <h2 className="text-xl font-bold text-white">CluedIn Menu</h2>
                </motion.div>

                <nav className="space-y-3">
                  {navItems.map((item, index) => (
                    <motion.a
                      key={item.label}
                      href={item.href}
                      className="group flex items-center justify-between p-4 rounded-xl hover:bg-slate-800/50 transition-all duration-300 relative overflow-hidden"
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1 + 0.3, duration: 0.4 }}
                      onClick={() => setIsMenuOpen(false)}
                      whileHover={{ scale: 1.02, x: 5 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <motion.div
                        className={`absolute inset-0 bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}
                      />
                      <div className="flex items-center space-x-4 relative">
                        <div className={`p-2 rounded-lg bg-gradient-to-r ${item.color} bg-opacity-20`}>
                          <item.icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="text-gray-300 group-hover:text-white font-medium text-lg">{item.label}</span>
                        {item.badge && (
                          <span className="px-2 py-1 bg-red-500 text-white text-sm rounded-full">
                            {item.badge}
                          </span>
                        )}
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-600 group-hover:text-gray-400 group-hover:translate-x-1 transition-all duration-200" />
                    </motion.a>
                  ))}
                </nav>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Revolutionary Hero Section */}
      <motion.section 
        ref={heroRef}
        className="relative pt-32 pb-20 px-4 sm:px-6 lg:px-8 min-h-screen flex items-center"
        style={{ y: backgroundY }}
      >
        <div className="container mx-auto text-center relative">
          {/* Animated badge */}
          <motion.div
            className="inline-flex items-center space-x-3 bg-slate-800/30 rounded-full px-6 py-3 mb-8 backdrop-blur-xl border border-slate-700/30 shadow-2xl"
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.6, type: "spring" }}
            whileHover={{ scale: 1.05, y: -2 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            >
              <Globe className="w-5 h-5 text-emerald-400" />
            </motion.div>
            <span className="text-sm text-gray-300 font-medium">Live Updates • Real-time Events</span>
            <motion.div 
              className="w-3 h-3 bg-emerald-400 rounded-full"
              animate={{ scale: [1, 1.5, 1], opacity: [1, 0.5, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>

          {/* Hero title with enhanced animation */}
          <motion.div
            style={{ y: textY }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8, duration: 1 }}
          >
            <motion.h1 className="text-5xl md:text-7xl lg:text-8xl font-black mb-8 leading-tight">
              <motion.span 
                className="block bg-gradient-to-r from-white via-gray-100 to-white bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ['0%', '100%', '0%'],
                  textShadow: [
                    '0 0 50px rgba(255, 255, 255, 0.1)',
                    '0 0 80px rgba(255, 255, 255, 0.2)',
                    '0 0 50px rgba(255, 255, 255, 0.1)'
                  ]
                }}
                transition={{ duration: 4, repeat: Infinity }}
              >
                See the Future
              </motion.span>
              <motion.span 
                className="block bg-gradient-to-r from-blue-400 via-purple-500 via-pink-500 to-emerald-400 bg-clip-text text-transparent"
                animate={{ 
                  backgroundPosition: ['0%', '200%', '0%'] 
                }}
                transition={{ duration: 5, repeat: Infinity }}
              >
                First
              </motion.span>
            </motion.h1>
          </motion.div>

          <motion.p 
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-4xl mx-auto leading-relaxed font-light"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
          >
            Stay ahead with upcoming events and important updates across{' '}
            <motion.span 
              className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400 font-medium"
              animate={{ opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              politics, sports, culture, technology,
            </motion.span>{' '}
            and global affairs. Your smart solution for planning ahead.
          </motion.p>

          {/* Enhanced CTA buttons */}
          <motion.div 
            className="flex flex-col sm:flex-row items-center justify-center space-y-4 sm:space-y-0 sm:space-x-6 mb-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.5, duration: 0.8 }}
          >
            <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
              <Button 
                size="lg" 
                className="group relative bg-gradient-to-r from-blue-500 via-purple-600 to-pink-500 hover:from-blue-600 hover:via-purple-700 hover:to-pink-600 text-white px-10 py-4 rounded-2xl font-bold shadow-2xl text-lg overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                />
                <div className="relative flex items-center space-x-3">
                  <Rocket className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                  <span>Explore Events</span>
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                </div>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05, y: -3 }} whileTap={{ scale: 0.95 }}>
              <Button 
                variant="outline" 
                size="lg" 
                className="group border-2 border-slate-600 hover:border-slate-500 bg-slate-900/30 hover:bg-slate-800/50 backdrop-blur-xl px-10 py-4 rounded-2xl font-bold text-lg relative overflow-hidden"
              >
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                />
                <div className="relative flex items-center space-x-3">
                  <TrendingUp className="w-6 h-6 group-hover:scale-110 transition-transform duration-200" />
                  <span>See What's Trending</span>
                </div>
              </Button>
            </motion.div>
          </motion.div>

          {/* Stats section */}
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.8, duration: 0.8 }}
          >
            {[
              { icon: Activity, label: 'Live Events', value: '2,847' },
              { icon: Clock, label: 'Hours Saved', value: '10K+' },
              { icon: Eye, label: 'Predictions', value: '95%' }
            ].map((stat, index) => (
              <motion.div
                key={stat.label}
                className="group p-6 bg-slate-800/20 backdrop-blur-xl rounded-2xl border border-slate-700/30 hover:border-slate-600/50 transition-all duration-300"
                whileHover={{ scale: 1.05, y: -5 }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 2 + index * 0.2, duration: 0.6 }}
              >
                <motion.div
                  className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center mb-4 mx-auto group-hover:scale-110 transition-transform duration-300"
                >
                  <stat.icon className="w-6 h-6 text-white" />
                </motion.div>
                <motion.div 
                  className="text-3xl font-bold text-white mb-2"
                  animate={{ 
                    textShadow: [
                      '0 0 10px rgba(255, 255, 255, 0.1)',
                      '0 0 20px rgba(59, 130, 246, 0.3)',
                      '0 0 10px rgba(255, 255, 255, 0.1)'
                    ]
                  }}
                  transition={{ duration: 3, repeat: Infinity, delay: index * 0.5 }}
                >
                  {stat.value}
                </motion.div>
                <p className="text-gray-400 font-medium">{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.section>

      {/* Main Content with parallax */}
      <motion.main 
        className="relative px-4 sm:px-6 lg:px-8 pb-20"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.2, duration: 1 }}
      >
        <div className="container mx-auto">
          {children}
        </div>
      </motion.main>

      {/* Enhanced Footer */}
      <motion.footer 
        className="relative bg-gradient-to-t from-slate-950 via-slate-900 to-slate-900/50 border-t border-slate-700/30 backdrop-blur-xl"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.5, duration: 0.8 }}
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
            <div className="flex flex-col items-center md:items-start">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center">
                  <Zap className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold text-white">CluedIn</span>
              </div>
              <p className="text-gray-400 text-center md:text-left leading-relaxed">
                Your smart solution for staying ahead of tomorrow's events.
              </p>
            </div>
            
            <div className="text-center">
              <h3 className="text-lg font-semibold text-white mb-4">Quick Links</h3>
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
            
            <div className="text-center md:text-right">
              <h3 className="text-lg font-semibold text-white mb-4">Connect</h3>
              <div className="space-y-2">
                {['Privacy', 'Terms', 'Contact', 'Support'].map((link) => (
                  <motion.a
                    key={link}
                    href={`/${link.toLowerCase()}`}
                    className="block text-gray-400 hover:text-white transition-colors duration-200"
                    whileHover={{ x: -5 }}
                  >
                    {link}
                  </motion.a>
                ))}
              </div>
            </div>
          </div>
          
          <div className="border-t border-slate-700/30 pt-8">
            <div className="flex flex-col md:flex-row items-center justify-between">
              <p className="text-gray-500 text-sm mb-4 md:mb-0">
                © 2025 CluedIn. All rights reserved. Stay ahead of tomorrow.
              </p>
              <motion.div 
                className="text-sm text-gray-400"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                Made with ❤️ for the future
              </motion.div>
            </div>
          </div>
        </div>
      </motion.footer>

 {/* Scroll to top button */}
      <AnimatePresence>
        {scrollY > 500 && (
          <motion.button
            className="fixed bottom-8 right-8 w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center shadow-2xl z-40 hover:shadow-blue-500/25 transition-shadow duration-300"
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1, y: -2 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          >
            <motion.div
              animate={{ y: [-2, 2, -2] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <ChevronRight className="w-6 h-6 text-white rotate-[-90deg]" />
            </motion.div>
          </motion.button>
        )}
      </AnimatePresence>

      {/* Floating action buttons */}
      <motion.div
        className="fixed bottom-8 left-8 flex flex-col space-y-4 z-40"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 3, duration: 0.8 }}
      >
        {isHeroVisible && (
          <motion.button
            className="w-12 h-12 bg-gradient-to-r from-emerald-500 to-teal-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-emerald-500/25 transition-all duration-300 group"
            whileHover={{ scale: 1.1, rotate: 5 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 3.2 }}
          >
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              <Sparkles className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" />
            </motion.div>
          </motion.button>
        )}
        
        <motion.button
          className="w-12 h-12 bg-gradient-to-r from-purple-500 to-pink-600 rounded-full flex items-center justify-center shadow-2xl hover:shadow-purple-500/25 transition-all duration-300 group"
          whileHover={{ scale: 1.1, rotate: -5 }}
          whileTap={{ scale: 0.9 }}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 3.4 }}
        >
          <Bell className="w-6 h-6 text-white group-hover:scale-110 transition-transform duration-200" />
          <motion.div
            className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"
            animate={{ scale: [1, 1.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
        </motion.button>
      </motion.div>

      {/* Progress indicator */}
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 z-50 origin-left"
        style={{ scaleX: scrollYProgress }}
      />
    </div>
  );
}