import Image from 'next/image';
import type { Event, EventCategory } from '@/types/event';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { CalendarDays, Users, Palette, Scale, Ticket, Megaphone, Tag } from 'lucide-react';
import { format, parseISO, isFuture, isPast, formatDistanceToNow } from 'date-fns';

interface EventCardProps {
  event: Event;
}

const categoryIcons: Record<EventCategory, React.ElementType> = {
  Society: Users,
  Culture: Palette,
  Governance: Scale,
  Entertainment: Ticket,
  "Public Interest": Megaphone,
};

const categoryImageHints: Record<EventCategory, string> = {
  Society: "community meeting",
  Culture: "art gallery",
  Governance: "government building",
  Entertainment: "concert crowd",
  "Public Interest": "technology conference",
};

export default function EventCard({ event }: EventCardProps) {
  const IconComponent = categoryIcons[event.category] || Tag;
  const eventDate = parseISO(event.date);

  const formatDate = (date: Date): string => {
    if (isFuture(date)) {
      return `Upcoming: ${format(date, 'MMMM d, yyyy')} (${formatDistanceToNow(date, { addSuffix: true })})`;
    }
    if (isPast(date)) {
      return `Occurred: ${format(date, 'MMMM d, yyyy')} (${formatDistanceToNow(date, { addSuffix: true })})`;
    }
    return format(date, 'MMMM d, yyyy');
  };
  
  return (
    <Card className="flex flex-col overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out h-full">
      <CardHeader className="p-0">
        <div className="relative w-full h-48">
          <Image
            src={event.image}
            alt={event.title}
            layout="fill"
            objectFit="cover"
            data-ai-hint={categoryImageHints[event.category] || "event placeholder"}
          />
        </div>
      </CardHeader>
      <CardContent className="p-6 flex-grow">
        <CardTitle className="text-xl font-semibold mb-2 leading-tight">{event.title}</CardTitle>
        <div className="flex items-center text-sm text-muted-foreground mb-3">
          <CalendarDays className="w-4 h-4 mr-2" />
          <span>{formatDate(eventDate)}</span>
        </div>
        <p className="text-sm text-foreground/80 leading-relaxed line-clamp-4 mb-4">
          {event.summary || event.description}
        </p>
      </CardContent>
      <CardFooter className="p-6 pt-0">
        <Badge variant="secondary" className="flex items-center gap-2 text-xs">
          <IconComponent className="w-3.5 h-3.5" />
          {event.category}
        </Badge>
      </CardFooter>
    </Card>
  );
}
