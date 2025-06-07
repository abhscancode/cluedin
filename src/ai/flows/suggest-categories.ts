'use server';
/**
 * @fileOverview Suggests relevant categories for a given event description using AI.
 *
 * - suggestCategories - A function that suggests categories for an event description.
 * - SuggestCategoriesInput - The input type for the suggestCategories function.
 * - SuggestCategoriesOutput - The return type for the suggestCategories function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const SuggestCategoriesInputSchema = z.object({
  eventDescription: z
    .string()
    .describe('The description of the event for which to suggest categories.'),
});
export type SuggestCategoriesInput = z.infer<typeof SuggestCategoriesInputSchema>;

const SuggestCategoriesOutputSchema = z.object({
  categories: z
    .array(z.string())
    .describe('An array of suggested categories for the event.'),
});
export type SuggestCategoriesOutput = z.infer<typeof SuggestCategoriesOutputSchema>;

export async function suggestCategories(input: SuggestCategoriesInput): Promise<SuggestCategoriesOutput> {
  return suggestCategoriesFlow(input);
}

const prompt = ai.definePrompt({
  name: 'suggestCategoriesPrompt',
  input: {schema: SuggestCategoriesInputSchema},
  output: {schema: SuggestCategoriesOutputSchema},
  prompt: `You are an event categorization expert. Given the following event description, suggest a list of relevant categories. Possible categories include: Society, Culture, Governance, Entertainment, Public Interest.

Event Description: {{{eventDescription}}}

Categories:`, // Prompt should end with 'Categories:' to encourage a list format.
});

const suggestCategoriesFlow = ai.defineFlow(
  {
    name: 'suggestCategoriesFlow',
    inputSchema: SuggestCategoriesInputSchema,
    outputSchema: SuggestCategoriesOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
