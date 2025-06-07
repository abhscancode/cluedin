// src/ai/flows/summarize-event.ts
'use server';

/**
 * @fileOverview Summarizes an event using AI.
 *
 * - summarizeEvent - A function that summarizes an event.
 * - SummarizeEventInput - The input type for the summarizeEvent function.
 * - SummarizeEventOutput - The return type for the summarizeEvent function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SummarizeEventInputSchema = z.object({
  eventDescription: z
    .string()
    .describe('The description of the event to be summarized.'),
});
export type SummarizeEventInput = z.infer<typeof SummarizeEventInputSchema>;

const SummarizeEventOutputSchema = z.object({
  summary: z.string().describe('A concise summary of the event.'),
});
export type SummarizeEventOutput = z.infer<typeof SummarizeEventOutputSchema>;

export async function summarizeEvent(input: SummarizeEventInput): Promise<SummarizeEventOutput> {
  return summarizeEventFlow(input);
}

const summarizeEventPrompt = ai.definePrompt({
  name: 'summarizeEventPrompt',
  input: {schema: SummarizeEventInputSchema},
  output: {schema: SummarizeEventOutputSchema},
  prompt: `Summarize the following event description in a concise manner:\n\n{{{eventDescription}}}`,
});

const summarizeEventFlow = ai.defineFlow(
  {
    name: 'summarizeEventFlow',
    inputSchema: SummarizeEventInputSchema,
    outputSchema: SummarizeEventOutputSchema,
  },
  async input => {
    const {output} = await summarizeEventPrompt(input);
    return output!;
  }
);
