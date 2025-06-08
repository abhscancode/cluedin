import Image from 'next/image';
import type { Event, EventCategory } from '@/types/event';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Users, Palette, Scale, Ticket, Megaphone, Tag, Globe, UserCheck, Leaf, Cpu, Trophy, Handshake, Clock, TrendingUp } from 'lucide-react';
import { format, parseISO, isFuture, isPast, formatDistanceToNow } from 'date-fns';
import { motion } from 'framer-motion';

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

// Category-specific colors using standard Tailwind classes
const categoryStyles: Record<string, { 
  gradient: string; 
  badgeColor: string; 
  iconBg: string;
}> = {
  Society: { 
    gradient: "bg-gradient-to-br from-blue-500 to-indigo-600", 
    badgeColor: "bg-blue-500 hover:bg-blue-600", 
    iconBg: "bg-blue-100"
  },
  Culture: { 
    gradient: "bg-gradient-to-br from-purple-500 to-pink-600", 
    badgeColor: "bg-purple-500 hover:bg-purple-600", 
    iconBg: "bg-purple-100"
  },
  Governance: { 
    gradient: "bg-gradient-to-br from-emerald-500 to-teal-600", 
    badgeColor: "bg-emerald-500 hover:bg-emerald-600", 
    iconBg: "bg-emerald-100"
  },
  Entertainment: { 
    gradient: "bg-gradient-to-br from-orange-500 to-red-600", 
    badgeColor: "bg-orange-500 hover:bg-orange-600", 
    iconBg: "bg-orange-100"
  },
  "Public Interest": { 
    gradient: "bg-gradient-to-br from-green-500 to-emerald-600", 
    badgeColor: "bg-green-500 hover:bg-green-600", 
    iconBg: "bg-green-100"
  },
  Sports: { 
    gradient: "bg-gradient-to-br from-yellow-500 to-orange-600", 
    badgeColor: "bg-yellow-500 hover:bg-yellow-600", 
    iconBg: "bg-yellow-100"
  },
  Diplomacy: { 
    gradient: "bg-gradient-to-br from-indigo-500 to-purple-600", 
    badgeColor: "bg-indigo-500 hover:bg-indigo-600", 
    iconBg: "bg-indigo-100"
  },
  Environment: { 
    gradient: "bg-gradient-to-br from-green-400 to-emerald-600", 
    badgeColor: "bg-green-400 hover:bg-green-500", 
    iconBg: "bg-green-100"
  },
  Technology: { 
    gradient: "bg-gradient-to-br from-cyan-500 to-blue-600", 
    badgeColor: "bg-cyan-500 hover:bg-cyan-600", 
    iconBg: "bg-cyan-100"
  },
  "World Affairs": { 
    gradient: "bg-gradient-to-br from-slate-500 to-gray-600", 
    badgeColor: "bg-slate-500 hover:bg-slate-600", 
    iconBg: "bg-slate-100"
  },
};

export default function EventCard({ event }: EventCardProps) {
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

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} 
      animate={{ opacity: 1, y: 0 }} 
      transition={{ duration: 0.5, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.02, 
        y: -8,
        transition: { duration: 0.2 }
      }}
      className="h-full"
    >
      <Card className="relative flex flex-col overflow-hidden bg-white shadow-lg hover:shadow-2xl transition-all duration-300 h-full border border-gray-200">
        {/* Beautiful gradient header instead of image */}
        <CardHeader className="p-0 relative">
          <div className={`relative w-full h-48 ${categoryStyle.gradient} flex items-center justify-center overflow-hidden`}>
            {/* Decorative background elements */}
            <div className="absolute inset-0">
              <div className="absolute top-4 right-4 w-16 h-16 bg-white bg-opacity-10 rounded-full"></div>
              <div className="absolute bottom-6 left-6 w-20 h-20 bg-white bg-opacity-5 rounded-full"></div>
              <div className="absolute top-1/2 left-1/3 w-2 h-2 bg-white bg-opacity-20 rounded-full animate-pulse"></div>
              <div className="absolute top-1/3 right-1/4 w-1 h-1 bg-white bg-opacity-30 rounded-full animate-pulse delay-700"></div>
            </div>
            
            {/* Category icon */}
            <motion.div 
              className="relative z-10 flex flex-col items-center justify-center text-white"
              whileHover={{ scale: 1.1 }}
              transition={{ duration: 0.2 }}
            >
              <div className="mb-3 p-4 rounded-full bg-white bg-opacity-20 backdrop-blur-sm">
                <IconComponent className="w-8 h-8" />
              </div>
              <div className="text-sm font-medium opacity-90 uppercase tracking-wide">
                {event.category}
              </div>
            </motion.div>

            {/* Upcoming indicator */}
            {isUpcoming && (
              <motion.div 
                className="absolute top-4 right-4 px-3 py-1 bg-white bg-opacity-20 rounded-full backdrop-blur-sm"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.3, duration: 0.3 }}
              >
                <div className="flex items-center space-x-1 text-white text-xs font-medium">
                  <TrendingUp className="w-3 h-3" />
                  <span>Upcoming</span>
                </div>
              </motion.div>
            )}

            {/* Animated overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black bg-opacity-10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </CardHeader>

        <CardContent className="p-6 flex-grow">
          <CardTitle className="text-xl font-bold mb-3 leading-tight text-gray-900 hover:text-gray-700 transition-colors duration-200">
            {event.title}
          </CardTitle>
          
          {/* Enhanced date display */}
          <div className="flex items-center justify-between text-sm text-gray-600 mb-4 bg-gray-50 rounded-lg p-3">
            <div className="flex items-center">
              <CalendarDays className="w-4 h-4 mr-2 text-gray-500" />
              <span className="font-medium">{formatDate(eventDate)}</span>
            </div>
            {isUpcoming && (
              <motion.div 
                className="flex items-center text-emerald-600"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <Clock className="w-3.5 h-3.5 mr-1" />
                <span className="text-xs font-medium">Soon</span>
              </motion.div>
            )}
          </div>

          {/* Summary with better typography */}
          <p className="text-sm text-gray-700 leading-relaxed mb-4 overflow-hidden" style={{
            display: '-webkit-box',
            WebkitLineClamp: 3,
            WebkitBoxOrient: 'vertical',
          }}>
            {event.description}
          </p>

          {/* Source attribution */}
          {event.source && (
            <div className="text-xs text-gray-500 mb-2">
              <span className="font-medium">Source:</span> {event.source}
            </div>
          )}
        </CardContent>

        <CardFooter className="p-6 pt-0">
          <div className="flex items-center justify-between w-full">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Badge 
                className={`flex items-center gap-2 text-xs font-medium ${categoryStyle.badgeColor} text-white border-0 px-3 py-1.5 transition-colors duration-200`}
              >
                <IconComponent className="w-3.5 h-3.5" />
                {event.category}
              </Badge>
            </motion.div>
            
            {/* Time indicator with animation */}
            <motion.div 
              className={`text-xs font-medium ${isUpcoming ? 'text-emerald-600' : 'text-gray-500'}`}
              animate={isUpcoming ? { opacity: [0.7, 1, 0.7] } : {}}
              transition={isUpcoming ? { duration: 2, repeat: Infinity } : {}}
            >
              {isUpcoming ? 'Upcoming' : 'Past Event'}
            </motion.div>
          </div>
        </CardFooter>

        {/* Subtle hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black bg-opacity-0 hover:bg-opacity-5 transition-all duration-300 pointer-events-none"></div>
      </Card>
    </motion.div>
  );
}