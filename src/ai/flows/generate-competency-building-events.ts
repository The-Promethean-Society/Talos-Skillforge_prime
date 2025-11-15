'use server';
/**
 * @fileOverview Generates personalized Competency-Building Events (CBEs) based on user skills and learning goals.
 *
 * - generateCompetencyBuildingEvents - A function to generate CBEs.
 * - GenerateCompetencyBuildingEventsInput - The input type for the generateCompetencyBuildingEvents function.
 * - GenerateCompetencyBuildingEventsOutput - The return type for the generateCompetencyBuildingEvents function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const GenerateCompetencyBuildingEventsInputSchema = z.object({
  userSkills: z.array(z.string()).describe('The current skills of the user.'),
  learningGoals: z.string().describe('The learning goals of the user.'),
  professionTag: z.string().describe('The profession of the user.'),
});
export type GenerateCompetencyBuildingEventsInput = z.infer<typeof GenerateCompetencyBuildingEventsInputSchema>;

const GenerateCompetencyBuildingEventsOutputSchema = z.object({
  events: z.array(z.string()).describe('A list of competency-building events personalized for the user.'),
});
export type GenerateCompetencyBuildingEventsOutput = z.infer<typeof GenerateCompetencyBuildingEventsOutputSchema>;

export async function generateCompetencyBuildingEvents(input: GenerateCompetencyBuildingEventsInput): Promise<GenerateCompetencyBuildingEventsOutput> {
  return generateCompetencyBuildingEventsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCompetencyBuildingEventsPrompt',
  input: {schema: GenerateCompetencyBuildingEventsInputSchema},
  output: {schema: GenerateCompetencyBuildingEventsOutputSchema},
  prompt: `You are an AI learning assistant that suggests Competency-Building Events (CBEs) to users based on their skills and goals.

  The user's current skills are:
  {{#if userSkills}}
  {{#each userSkills}}
  - {{{this}}}
  {{/each}}
  {{else}}
  No skills listed.
  {{/if}}

  The user's learning goals are: {{{learningGoals}}}.

  The user's profession is: {{{professionTag}}}.

  Based on this information, suggest 5 relevant competency-building events.
  The events should be diverse, covering both academic and practical (quest-based) objectives.
  Return the events in JSON format.
  Make the events short, no more than 20 words.
  Be precise, specific, and do not be too verbose. Focus on specific competency that will be built during the event. For example:
  "Complete a data science course focusing on predictive modeling"
  "Participate in a team project to develop a mobile app"
  "Attend a workshop on effective communication skills"
  "Research and write a report on the latest advancements in AI"
  "Shadow a senior engineer to learn about system architecture"
  `,
});

const generateCompetencyBuildingEventsFlow = ai.defineFlow(
  {
    name: 'generateCompetencyBuildingEventsFlow',
    inputSchema: GenerateCompetencyBuildingEventsInputSchema,
    outputSchema: GenerateCompetencyBuildingEventsOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
