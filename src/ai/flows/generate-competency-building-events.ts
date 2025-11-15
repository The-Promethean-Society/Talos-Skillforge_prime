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

const CbeSchema = z.object({
  Academic_Objective: z.string().describe('The academic objective of the event. Should be a concise, actionable learning goal.'),
  Quest_Objective: z.string().describe('The objective framed as a quest or a challenge in a gamified context.'),
  Assessment_Method: z.string().describe('How the user\'s competency will be assessed upon completion.'),
  Karmic_Impact: z.number().describe('A score from -1 (negative impact) to 1 (positive impact) representing the ethical implications of this skill/event.'),
  Target_Skill: z.string().describe('The primary skill that this event is designed to develop.'),
});

const GenerateCompetencyBuildingEventsOutputSchema = z.object({
  events: z.array(CbeSchema).describe('A list of competency-building events personalized for the user.'),
});
export type GenerateCompetencyBuildingEventsOutput = z.infer<typeof GenerateCompetencyBuildingEventsOutputSchema>;

export async function generateCompetencyBuildingEvents(input: GenerateCompetencyBuildingEventsInput): Promise<GenerateCompetencyBuildingEventsOutput> {
  return generateCompetencyBuildingEventsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'generateCompetencyBuildingEventsPrompt',
  input: {schema: GenerateCompetencyBuildingEventsInputSchema},
  output: {schema: GenerateCompetencyBuildingEventsOutputSchema},
  prompt: `You are an AI learning assistant that creates structured Competency-Building Events (CBEs) based on a user's profile.

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

  Based on this information, suggest 5 diverse and relevant competency-building events. For each event, you must generate a JSON object that follows the specified output schema, including all fields: Academic_Objective, Quest_Objective, Assessment_Method, Karmic_Impact, and Target_Skill.

  Ensure the objectives are concise and actionable.
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
