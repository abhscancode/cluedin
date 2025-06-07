import CluedInHeader from '@/components/cluedin/CluedInHeader';
import CluedInApp from '@/components/cluedin/CluedInApp';
import { getEventsWithSummaries } from '@/app/actions';
import type { Event } from '@/types/event';

export default async function HomePage() {
  const initialEvents: Event[] = await getEventsWithSummaries();

  return (
    <div className="min-h-screen flex flex-col">
      <CluedInHeader />
      <main className="container mx-auto px-4 py-8 flex-grow">
        <CluedInApp initialEvents={initialEvents} />
      </main>
      <footer className="py-6 text-center text-sm text-muted-foreground border-t border-border/60 mt-12">
        © {new Date().getFullYear()} CluedIn. All rights reserved.
      </footer>
    </div>
  );
}
