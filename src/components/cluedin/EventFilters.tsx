'use client';

import { Button } from '@/components/ui/button';
import type { EventCategory } from '@/types/event';
import { ALL_CATEGORIES } from '@/types/event';
import { cn } from '@/lib/utils';

interface EventFiltersProps {
  categories: EventCategory[];
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
}

export default function EventFilters({
  categories,
  selectedCategory,
  onSelectCategory,
}: EventFiltersProps) {
  const allDisplayCategories = ['All', ...categories];

  return (
    <div className="mb-8 flex flex-wrap gap-2 justify-center">
      {allDisplayCategories.map((category) => (
        <Button
          key={category}
          variant={selectedCategory === category ? 'default' : 'outline'}
          onClick={() => onSelectCategory(category)}
          className={cn(
            "transition-all duration-200 ease-in-out",
            selectedCategory === category ? 'bg-primary text-primary-foreground shadow-md' : 'hover:bg-accent hover:text-accent-foreground'
          )}
          aria-pressed={selectedCategory === category}
        >
          {category}
        </Button>
      ))}
    </div>
  );
}
