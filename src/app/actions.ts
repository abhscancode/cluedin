'use server';

import type { Event } from '@/types/event';
import { mockEvents } from '@/lib/mockEvents';
import { summarizeEvent } from '@/ai/flows/summarize-event';

export async function getEventsWithSummaries(): Promise<Event[]> {
  // Simulate API call latency
  // await new Promise(resolve => setTimeout(resolve, 1000));

  const eventsWithSummaries = await Promise.all(
    mockEvents.map(async (event) => {
      try {
        const summaryResult = await summarizeEvent({ eventDescription: event.description });
        return { ...event, summary: summaryResult.summary };
      } catch (error) {
        console.error(`Failed to generate summary for event "${event.title}":`, error);
        // Fallback to original description or a predefined message if summary fails
        return { ...event, summary: "Summary currently unavailable. Please check back later." };
      }
    })
  );

  return eventsWithSummaries;
}
