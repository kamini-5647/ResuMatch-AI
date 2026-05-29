'use server';
/**
 * @fileOverview An AI agent that calculates an ATS compatibility score for a resume against a job description.
 *
 * - scoreResume - A function that handles the ATS compatibility scoring process.
 * - ATSScoringInput - The input type for the scoreResume function.
 * - ATSScoringOutput - The return type for the scoreResume function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ATSScoringInputSchema = z.object({
  resumeText: z.string().describe('The full text content of the resume.'),
  jobDescriptionText: z.string().describe('The full text content of the job description.'),
});
export type ATSScoringInput = z.infer<typeof ATSScoringInputSchema>;

const ATSScoringOutputSchema = z.object({
  atsScore: z.number().describe('A compatibility score for the resume against the job description, ranging from 0 to 100.'),
  suggestions: z.string().describe('Actionable suggestions to improve the resume for a higher match.'),
  missingKeywords: z.array(z.string()).describe('An array of important keywords from the job description that are missing in the resume.'),
  skillGapAnalysis: z.string().describe('A detailed analysis of skill gaps between the resume and the job description.'),
  skillMatchPercentage: z.number().describe('The percentage of skills from the job description that are present in the resume, ranging from 0 to 100.')
});
export type ATSScoringOutput = z.infer<typeof ATSScoringOutputSchema>;

export async function scoreResume(input: ATSScoringInput): Promise<ATSScoringOutput> {
  return atsScoringFlow(input);
}

const atsScoringPrompt = ai.definePrompt({
  name: 'atsScoringPrompt',
  input: {schema: ATSScoringInputSchema},
  output: {schema: ATSScoringOutputSchema},
  prompt: `You are an expert Applicant Tracking System (ATS) and a helpful career coach.
Your task is to analyze a given resume against a job description.
Provide a compatibility score (0-100), identify missing keywords, analyze skill gaps, and offer concrete suggestions to improve the resume for a higher match.
Also, calculate the percentage of skills from the job description that are present in the resume.

Job Description:
{{{jobDescriptionText}}}

Resume:
{{{resumeText}}}

Please ensure the output strictly adheres to the JSON schema provided.`,
});

const atsScoringFlow = ai.defineFlow(
  {
    name: 'atsScoringFlow',
    inputSchema: ATSScoringInputSchema,
    outputSchema: ATSScoringOutputSchema,
  },
  async (input) => {
    const {output} = await atsScoringPrompt(input);
    return output!;
  }
);
