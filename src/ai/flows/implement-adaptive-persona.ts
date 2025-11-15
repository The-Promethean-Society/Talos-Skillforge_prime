'use server';

/**
 * @fileOverview This file implements the adaptive persona flow, which dynamically adjusts learning content based on user Skills Graph,
 * Karmic Alignment, and Profession Tag. It exports the adaptivePersona function, AdaptivePersonaInput type, and AdaptivePersonaOutput type.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const AdaptivePersonaInputSchema = z.object({
  skillsGraph: z.string().describe('The user skills graph in JSON format.'),
  karmicAlignment: z.number().describe('The karmic alignment score of the user.'),
  professionTag: z.string().describe('The profession tag of the user.'),
});
export type AdaptivePersonaInput = z.infer<typeof AdaptivePersonaInputSchema>;

const AdaptivePersonaOutputSchema = z.object({
  personalizedContent: z.string().describe('The learning content personalized for the user.'),
});
export type AdaptivePersonaOutput = z.infer<typeof AdaptivePersonaOutputSchema>;

export async function adaptivePersona(input: AdaptivePersonaInput): Promise<AdaptivePersonaOutput> {
  return adaptivePersonaFlow(input);
}

const adaptivePersonaPrompt = ai.definePrompt({
  name: 'adaptivePersonaPrompt',
  input: {schema: AdaptivePersonaInputSchema},
  output: {schema: AdaptivePersonaOutputSchema},
  prompt: `You are an AI learning content personalizer. You will receive a user's skills graph, karmic alignment, and profession tag. Based on these, generate personalized learning content.

Skills Graph: {{{skillsGraph}}}
Karmic Alignment: {{{karmicAlignment}}}
Profession Tag: {{{professionTag}}}

Personalized Learning Content:`,
});

const adaptivePersonaFlow = ai.defineFlow(
  {
    name: 'adaptivePersonaFlow',
    inputSchema: AdaptivePersonaInputSchema,
    outputSchema: AdaptivePersonaOutputSchema,
  },
  async input => {
    const {output} = await adaptivePersonaPrompt(input);
    return output!;
  }
);
