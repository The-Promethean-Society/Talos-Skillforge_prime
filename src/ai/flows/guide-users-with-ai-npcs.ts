'use server';
/**
 * @fileOverview AI-driven NPCs that teach and mentor users, with behavior influenced by the user's Karmic Alignment.
 *
 * - guideUsersWithAiNpcs - A function that handles the interaction with AI NPCs.
 * - GuideUsersWithAiNpcsInput - The input type for the guideUsersWithAiNpcs function.
 * - GuideUsersWithAiNpcsOutput - The return type for the guideUsersWithAiNpcs function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GuideUsersWithAiNpcsInputSchema = z.object({
  karmicAlignment: z.number().describe('The user\'s karmic alignment, a value between -1 and 1.'),
  query: z.string().describe('The user\'s query or request.'),
});
export type GuideUsersWithAiNpcsInput = z.infer<typeof GuideUsersWithAiNpcsInputSchema>;

const GuideUsersWithAiNpcsOutputSchema = z.object({
  npcResponse: z.string().describe('The NPC\'s response to the user\'s query, influenced by their karmic alignment.'),
});
export type GuideUsersWithAiNpcsOutput = z.infer<typeof GuideUsersWithAiNpcsOutputSchema>;

export async function guideUsersWithAiNpcs(input: GuideUsersWithAiNpcsInput): Promise<GuideUsersWithAiNpcsOutput> {
  return guideUsersWithAiNpcsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'guideUsersWithAiNpcsPrompt',
  input: {schema: GuideUsersWithAiNpcsInputSchema},
  output: {schema: GuideUsersWithAiNpcsOutputSchema},
  prompt: `You are an AI NPC in a skill-building game. Your behavior and guidance are influenced by the user's Karmic Alignment.

  Karmic Alignment: {{karmicAlignment}}
  User Query: {{query}}

  Respond to the user's query, adjusting your tone and guidance based on their karmic alignment.

  If the karmic alignment is high (close to 1), be encouraging and supportive.
  If the karmic alignment is low (close to -1), be stern but fair, focusing on the importance of ethical skill development.
  If the karmic alignment is neutral (close to 0), provide balanced guidance.

  NPC Response:`,
});

const guideUsersWithAiNpcsFlow = ai.defineFlow(
  {
    name: 'guideUsersWithAiNpcsFlow',
    inputSchema: GuideUsersWithAiNpcsInputSchema,
    outputSchema: GuideUsersWithAiNpcsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
