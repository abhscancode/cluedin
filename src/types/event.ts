export interface Event {
  id: string;
  title: string;
  description: string;
  summary?: string; // Optional, as AI might fail or it might not be generated yet
  date: string; // ISO date string
  category: EventCategory;
  image: string; // URL for placeholder image
  source?: string; // Optional: where the event info came from
}

export type EventCategory = "Society" | "Culture" | "Governance" | "Entertainment" | "Public Interest";

export const ALL_CATEGORIES: EventCategory[] = ["Society", "Culture", "Governance", "Entertainment", "Public Interest"];
