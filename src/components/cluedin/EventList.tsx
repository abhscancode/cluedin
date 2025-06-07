import type { Event } from '@/types/event';
import EventCard from './EventCard';

interface EventListProps {
  events: Event[];
}

export default function EventList({ events }: EventListProps) {
  if (events.length === 0) {
    return <p className="text-center text-muted-foreground">No events match your current filters. Try selecting a different category!</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event, index) => (
        <div 
          key={event.id} 
          className="animate-in fade-in-0 slide-in-from-bottom-5 duration-500"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <EventCard event={event} />
        </div>
      ))}
    </div>
  );
}
