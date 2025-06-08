export interface Event {
  id: string;
  title: string;
  description: string;
  summary?: string; // Optional, as AI might fail or it might not be generated yet
  date: string; // ISO date string
  category: EventCategory;
  
  source?: string; // Optional: where the event info came from
}

export type EventCategory = 
  | "Society"
  | "Culture"
  | "Governance"
  | "Entertainment"
  | "Public Interest"
  | "Sports"
  | "Diplomacy"
  | "Environment"
  | "Technology"
  | "World Affairs"; // or "Global" if you prefer that


export const ALL_CATEGORIES: EventCategory[] = ["Society", "Culture", "Governance", "Entertainment", "Public Interest"];
