'use server';

/**
 * @fileOverview Provides personalized tutoring and instant feedback from the AI Tutor (Talos Agent).
 *
 * - providePersonalizedTutoring - A function that handles the personalized tutoring process.
 * - ProvidePersonalizedTutoringInput - The input type for the providePersonalizedTutoring function.
 * - ProvidePersonalizedTutoringOutput - The return type for the providePersonalizedTutoring function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ProvidePersonalizedTutoringInputSchema = z.object({
  skillGaps: z.string().describe('The identified skill gaps of the user.'),
  learningStyle: z.string().describe('The preferred learning style of the user.'),
  material: z.string().describe('The learning material to be tutored on.'),
  question: z.string().describe('The specific question or topic the user needs help with.'),
});

export type ProvidePersonalizedTutoringInput = z.infer<typeof ProvidePersonalizedTutoringInputSchema>;

const ProvidePersonalizedTutoringOutputSchema = z.object({
  explanation: z.string().describe('A personalized explanation of the material, tailored to the user\'s skill gaps and learning style.'),
  feedback: z.string().describe('Instant feedback on the user\'s understanding and progress.'),
});

export type ProvidePersonalizedTutoringOutput = z.infer<typeof ProvidePersonalizedTutoringOutputSchema>;

export async function providePersonalizedTutoring(input: ProvidePersonalizedTutoringInput): Promise<ProvidePersonalizedTutoringOutput> {
  return providePersonalizedTutoringFlow(input);
}

const providePersonalizedTutoringPrompt = ai.definePrompt({
  name: 'providePersonalizedTutoringPrompt',
  input: {schema: ProvidePersonalizedTutoringInputSchema},
  output: {schema: ProvidePersonalizedTutoringOutputSchema},
  prompt: `You are Talos, an AI Tutor specializing in providing personalized tutoring and instant feedback.

You will tailor your explanations and feedback based on the user's skill gaps and learning style.

Skill Gaps: {{{skillGaps}}}
Learning Style: {{{learningStyle}}}
Learning Material: {{{material}}}
Question: {{{question}}}

Provide a personalized explanation of the material, addressing the user's skill gaps and learning style.
Also, provide instant feedback on the user's understanding and progress.

Explanation:
Feedback: `,
});

const providePersonalizedTutoringFlow = ai.defineFlow(
  {
    name: 'providePersonalizedTutoringFlow',
    inputSchema: ProvidePersonalizedTutoringInputSchema,
    outputSchema: ProvidePersonalizedTutoringOutputSchema,
  },
  async input => {
    const {output} = await providePersonalizedTutoringPrompt(input);
    return output!;
  }
);
