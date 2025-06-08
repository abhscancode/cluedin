'use client';

import type { Event, EventCategory } from '@/types/event';
import { ALL_CATEGORIES } from '@/types/event';
import { useState, useMemo, useEffect } from 'react';
import EventFilters from './EventFilters';
import EventList from './EventList';
import { Loader2 } from 'lucide-react';

interface CluedInAppProps {
  initialEvents: Event[];
}

export default function CluedInApp({ initialEvents }: CluedInAppProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  // const [searchTerm, setSearchTerm] = useState<string>(''); // Placeholder for future search
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    // This ensures client-side logic runs after hydration
    setMounted(true);
  }, []);

  const filteredAndSortedEvents = useMemo(() => {
    if (!mounted) { 
      // Return empty array or initial sorted if preferred during SSR, 
      // but for consistency with client-side sorting/filtering, can wait until mounted
      return initialEvents.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    }

    let events = [...initialEvents]; // Create a new array to avoid mutating the prop

    if (selectedCategory !== 'All') {
      events = events.filter(event => event.category === selectedCategory);
    }
    
   

    // Sort by date descending (upcoming/most recent first)
    return events.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [initialEvents, selectedCategory, mounted]);

  if (!mounted) {
    // Basic loader to prevent flash of unfiltered/unsorted content or hydration mismatch
    // This content should be simple and not rely on complex client state
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-200px)]"> {/* Adjust height as needed */}
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <EventFilters
        categories={ALL_CATEGORIES}
        selectedCategory={selectedCategory}
        onSelectCategory={setSelectedCategory}
      />
      {/* 
 
      */}
      <EventList events={filteredAndSortedEvents} />
    </div>
  );
}
