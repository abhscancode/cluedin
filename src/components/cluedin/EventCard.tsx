import Image from 'next/image';
import type { Event, EventCategory } from '@/types/event';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Users, Palette, Scale, Ticket, Megaphone, Tag, Globe, UserCheck, Leaf, Cpu, Trophy, Handshake, Clock, TrendingUp, ArrowRight, Sparkles, Eye, Calendar, MapPin } from 'lucide-react';
import { format, parseISO, isFuture, isPast, formatDistanceToNow } from 'date-fns';
import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

interface EventCardProps {
  event: Event;
}

// Extended category icons for all categories
const categoryIcons: Record<EventCategory | string, React.ElementType> = {
  Society: Users,
  Culture: Palette,
  Governance: Scale,
  Entertainment: Ticket,
  "Public Interest": Megaphone,
  Sports: Trophy,
  Diplomacy: Handshake,
  Environment: Leaf,
  Technology: Cpu,
  "World Affairs": Globe,
  Community: UserCheck,
  Global: Globe,
};

// Enhanced category-specific colors with more vibrant gradients
const categoryStyles: Record<string, { 
  gradient: string; 
  badgeColor: string; 
  iconBg: string;
  accentColor: string;
  glowColor: string;
}> = {
  Society: { 
    gradient: "bg-gradient-to-br from-blue-400 via-blue-500 to-indigo-700", 
    badgeColor: "bg-blue-500 hover:bg-blue-600", 
    iconBg: "bg-blue-100",
    accentColor: "text-blue-600",
    glowColor: "shadow-blue-500/25"
  },
  Culture: { 
    gradient: "bg-gradient-to-br from-purple-400 via-purple-500 to-pink-700", 
    badgeColor: "bg-purple-500 hover:bg-purple-600", 
    iconBg: "bg-purple-100",
    accentColor: "text-purple-600",
    glowColor: "shadow-purple-500/25"
  },
  Governance: { 
    gradient: "bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-700", 
    badgeColor: "bg-emerald-500 hover:bg-emerald-600", 
    iconBg: "bg-emerald-100",
    accentColor: "text-emerald-600",
    glowColor: "shadow-emerald-500/25"
  },
  Entertainment: { 
    gradient: "bg-gradient-to-br from-orange-400 via-orange-500 to-red-700", 
    badgeColor: "bg-orange-500 hover:bg-orange-600", 
    iconBg: "bg-orange-100",
    accentColor: "text-orange-600",
    glowColor: "shadow-orange-500/25"
  },
  "Public Interest": { 
    gradient: "bg-gradient-to-br from-green-400 via-green-500 to-emerald-700", 
    badgeColor: "bg-green-500 hover:bg-green-600", 
    iconBg: "bg-green-100",
    accentColor: "text-green-600",
    glowColor: "shadow-green-500/25"
  },
  Sports: { 
    gradient: "bg-gradient-to-br from-yellow-400 via-yellow-500 to-orange-700", 
    badgeColor: "bg-yellow-500 hover:bg-yellow-600", 
    iconBg: "bg-yellow-100",
    accentColor: "text-yellow-600",
    glowColor: "shadow-yellow-500/25"
  },
  Diplomacy: { 
    gradient: "bg-gradient-to-br from-indigo-400 via-indigo-500 to-purple-700", 
    badgeColor: "bg-indigo-500 hover:bg-indigo-600", 
    iconBg: "bg-indigo-100",
    accentColor: "text-indigo-600",
    glowColor: "shadow-indigo-500/25"
  },
  Environment: { 
    gradient: "bg-gradient-to-br from-green-300 via-green-400 to-emerald-700", 
    badgeColor: "bg-green-400 hover:bg-green-500", 
    iconBg: "bg-green-100",
    accentColor: "text-green-600",
    glowColor: "shadow-green-500/25"
  },
  Technology: { 
    gradient: "bg-gradient-to-br from-cyan-400 via-cyan-500 to-blue-700", 
    badgeColor: "bg-cyan-500 hover:bg-cyan-600", 
    iconBg: "bg-cyan-100",
    accentColor: "text-cyan-600",
    glowColor: "shadow-cyan-500/25"
  },
  "World Affairs": { 
    gradient: "bg-gradient-to-br from-slate-400 via-slate-500 to-gray-700", 
    badgeColor: "bg-slate-500 hover:bg-slate-600", 
    iconBg: "bg-slate-100",
    accentColor: "text-slate-600",
    glowColor: "shadow-slate-500/25"
  },
};

export default function EventCard({ event }: EventCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isPressed, setIsPressed] = useState(false);
  
  const IconComponent = categoryIcons[event.category] || Tag;
  const eventDate = parseISO(event.date);
  const isUpcoming = isFuture(eventDate);
  const categoryStyle = categoryStyles[event.category] || categoryStyles["World Affairs"];
  
  const formatDate = (date: Date): string => {
    if (isFuture(date)) {
      return `${format(date, 'MMM d, yyyy')} • ${formatDistanceToNow(date, { addSuffix: true })}`;
    }
    if (isPast(date)) {
      return `${format(date, 'MMM d, yyyy')} • ${formatDistanceToNow(date, { addSuffix: true })}`;
    }
    return format(date, 'MMM d, yyyy');
  };

  const cardVariants = {
    initial: { 
      opacity: 0, 
      y: 30,
      scale: 0.95,
      rotateX: 15
    },
    animate: { 
      opacity: 1, 
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1
      }
    },
    hover: { 
      scale: 1.03,
      y: -12,
      rotateX: 5,
      rotateY: 5,
      transition: { 
        duration: 0.3,
        ease: [0.16, 1, 0.3, 1]
      }
    },
    tap: {
      scale: 0.98,
      transition: { duration: 0.1 }
    }
  };

  const headerVariants = {
    initial: { opacity: 0, y: -20 },
    animate: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5, delay: 0.2 }
    }
  };

  const contentVariants = {
    initial: { opacity: 0, x: -20 },
    animate: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5, delay: 0.3 }
    }
  };

  const iconVariants = {
    initial: { scale: 0, rotate: -180 },
    animate: { 
      scale: 1, 
      rotate: 0,
      transition: { 
        type: "spring",
        stiffness: 200,
        damping: 15,
        delay: 0.4
      }
    },
    hover: {
      scale: 1.2,
      rotate: 360,
      transition: { duration: 0.6 }
    }
  };

  const sparkleVariants = {
    initial: { scale: 0, opacity: 0 },
    animate: { 
      scale: [0, 1, 0],
      opacity: [0, 1, 0],
      transition: {
        duration: 2,
        repeat: Infinity,
        repeatDelay: 3,
        ease: "easeInOut"
      }
    }
  };

  return (
    <motion.div 
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      onTapStart={() => setIsPressed(true)}
      // onTapEnd={() => setIsPressed(false)}
      className="h-full perspective-1000"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <Card className={`
        relative flex flex-col overflow-hidden 
        bg-white/80 backdrop-blur-sm
        shadow-xl hover:shadow-2xl 
        transition-all duration-500 h-full 
        border border-white/20
        ${isHovered ? `${categoryStyle.glowColor} shadow-2xl` : ''}
      `}>
        {/* Animated background glow */}
        <div className={`
          absolute inset-0 opacity-0 hover:opacity-20 
          transition-opacity duration-500 pointer-events-none
          ${categoryStyle.gradient}
        `} />

        {/* Enhanced gradient header */}
        <CardHeader className="p-0 relative overflow-hidden">
          <motion.div 
            variants={headerVariants}
            className={`relative w-full h-52 ${categoryStyle.gradient} flex items-center justify-center overflow-hidden`}
          >
            {/* Animated background particles */}
            <div className="absolute inset-0">
              {[...Array(8)].map((_, i) => (
                <motion.div
                  key={i}
                  className="absolute w-2 h-2 bg-white/20 rounded-full"
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                  animate={{
                    y: [0, -20, 0],
                    opacity: [0.2, 0.8, 0.2],
                    scale: [1, 1.5, 1],
                  }}
                  transition={{
                    duration: 3 + Math.random() * 2,
                    repeat: Infinity,
                    delay: Math.random() * 2,
                    ease: "easeInOut"
                  }}
                />
              ))}
            </div>

            {/* Floating geometric shapes */}
            <div className="absolute inset-0">
              <motion.div 
                className="absolute top-6 right-8 w-20 h-20 bg-white/10 rounded-full"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 180, 360],
                }}
                transition={{
                  duration: 8,
                  repeat: Infinity,
                  ease: "linear"
                }}
              />
              <motion.div 
                className="absolute bottom-8 left-6 w-16 h-16 bg-white/5 rounded-lg"
                animate={{
                  rotate: [0, -180, 0],
                  scale: [1, 0.8, 1],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            </div>
            
            {/* Enhanced category icon with sparkles */}
            <div className="relative z-10 flex flex-col items-center justify-center text-white">
              <motion.div 
                variants={iconVariants}
                className="relative mb-4 p-5 rounded-full bg-white/25 backdrop-blur-md border border-white/20"
              >
                <IconComponent className="w-10 h-10" />
                
                {/* Sparkle effects */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      variants={sparkleVariants}
                      initial="initial"
                      animate="animate"
                      exit="initial"
                      className="absolute -top-1 -right-1"
                    >
                      <Sparkles className="w-4 h-4 text-yellow-300" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              <motion.div 
                className="text-sm font-semibold opacity-95 uppercase tracking-wider"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                {event.category}
              </motion.div>
            </div>

            {/* Enhanced upcoming indicator */}
            {isUpcoming && (
              <motion.div 
                className="absolute top-4 right-4 px-4 py-2 bg-white/25 rounded-full backdrop-blur-md border border-white/20"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.6, type: "spring", stiffness: 200 }}
                whileHover={{ scale: 1.1 }}
              >
                <div className="flex items-center space-x-2 text-white text-xs font-semibold">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  >
                    <TrendingUp className="w-3.5 h-3.5" />
                  </motion.div>
                  <span>Upcoming</span>
                </div>
              </motion.div>
            )}

            {/* Animated mesh gradient overlay */}
            <motion.div 
              className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent"
              animate={{
                background: [
                  "linear-gradient(to top, rgba(0,0,0,0.3), transparent, transparent)",
                  "linear-gradient(to top, rgba(0,0,0,0.2), transparent, transparent)",
                  "linear-gradient(to top, rgba(0,0,0,0.3), transparent, transparent)",
                ]
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            />
          </motion.div>
        </CardHeader>

        <CardContent className="p-7 flex-grow">
          <motion.div variants={contentVariants}>
            <CardTitle className="text-xl font-bold mb-4 leading-tight text-gray-900 hover:text-gray-700 transition-colors duration-300">
              {event.title}
              <motion.span
                className="inline-block ml-2 opacity-0 group-hover:opacity-100"
                animate={isHovered ? { x: 5, opacity: 1 } : { x: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <ArrowRight className="w-4 h-4 inline" />
              </motion.span>
            </CardTitle>
          </motion.div>
          
          {/* Enhanced date display with glass morphism */}
          <motion.div 
            className="flex items-center justify-between text-sm text-gray-700 mb-5 bg-gradient-to-r from-gray-50/80 to-white/80 backdrop-blur-sm rounded-xl p-4 border border-gray-200/50"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center">
              <motion.div
                animate={{ rotate: isHovered ? 360 : 0 }}
                transition={{ duration: 0.5 }}
              >
                <CalendarDays className={`w-4 h-4 mr-3 ${categoryStyle.accentColor}`} />
              </motion.div>
              <span className="font-medium">{formatDate(eventDate)}</span>
            </div>
            {isUpcoming && (
              <motion.div 
                className="flex items-center text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full"
                animate={{ 
                  scale: [1, 1.05, 1],
                  boxShadow: [
                    "0 0 0 0 rgba(16, 185, 129, 0.3)",
                    "0 0 0 4px rgba(16, 185, 129, 0.1)",
                    "0 0 0 0 rgba(16, 185, 129, 0.3)"
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Clock className="w-3.5 h-3.5 mr-1" />
                <span className="text-xs font-semibold">Soon</span>
              </motion.div>
            )}
          </motion.div>

          {/* Enhanced description */}
          <motion.p 
            className="text-sm text-gray-700 leading-relaxed mb-5 overflow-hidden" 
            style={{
              display: '-webkit-box',
              WebkitLineClamp: 3,
              WebkitBoxOrient: 'vertical',
            }}
            variants={contentVariants}
          >
            {event.description}
          </motion.p>

          {/* Enhanced source attribution */}
          {event.source && (
            <motion.div 
              className="text-xs text-gray-500 mb-2 flex items-center"
              variants={contentVariants}
            >
              <Eye className="w-3 h-3 mr-2" />
              <span className="font-medium">Source:</span> 
              <span className="ml-1 text-gray-600">{event.source}</span>
            </motion.div>
          )}
        </CardContent>

        <CardFooter className="p-7 pt-0">
          <div className="flex items-center justify-between w-full">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
            >
              <Badge 
                className={`
                  flex items-center gap-2 text-xs font-semibold
                  ${categoryStyle.badgeColor} text-white border-0 
                  px-4 py-2 rounded-full
                  transition-all duration-300
                  shadow-lg hover:shadow-xl
                  ${isHovered ? 'shadow-xl' : ''}
                `}
              >
                <motion.div
                  animate={isHovered ? { rotate: 360 } : {}}
                  transition={{ duration: 0.5 }}
                >
                  <IconComponent className="w-3.5 h-3.5" />
                </motion.div>
                {event.category}
              </Badge>
            </motion.div>
            
            {/* Enhanced time indicator */}
            <motion.div 
              className={`
                text-xs font-semibold px-3 py-1 rounded-full
                ${isUpcoming 
                  ? 'text-emerald-600 bg-emerald-50 border border-emerald-200' 
                  : 'text-gray-500 bg-gray-50 border border-gray-200'
                }
              `}
              animate={isUpcoming ? { 
                opacity: [0.7, 1, 0.7],
                scale: [1, 1.05, 1]
              } : {}}
              transition={isUpcoming ? { 
                duration: 2, 
                repeat: Infinity,
                ease: "easeInOut"
              } : {}}
            >
              {isUpcoming ? 'Upcoming' : 'Past Event'}
            </motion.div>
          </div>
        </CardFooter>

        {/* Interactive hover overlay */}
        <motion.div 
          className="absolute inset-0 bg-gradient-to-t from-black/5 via-transparent to-transparent pointer-events-none"
          animate={{
            opacity: isHovered ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
        />

        {/* Subtle border glow effect */}
        <motion.div
          className={`
            absolute inset-0 rounded-lg pointer-events-none
            transition-all duration-300
            ${isHovered ? `ring-2 ring-${categoryStyle.badgeColor.split('-')[1]}-400/30` : ''}
          `}
        />
      </Card>
    </motion.div>
  );
}