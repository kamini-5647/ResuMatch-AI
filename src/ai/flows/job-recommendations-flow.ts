'use server';
/**
 * @fileOverview An AI agent that provides job recommendations based on a user's resume.
 *
 * - recommendJobs - A function that handles the job recommendation process.
 * - JobRecommendationsInput - The input type for the recommendJobs function.
 * - JobRecommendationsOutput - The return type for the recommendJobs function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const JobRecommendationsInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      "A user's resume, as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type JobRecommendationsInput = z.infer<typeof JobRecommendationsInputSchema>;

const JobRecommendationSchema = z.object({
  title: z.string().describe('The title of the recommended job.'),
  company: z.string().describe('The company offering the job.'),
  location: z.string().describe('The location of the job.'),
  matchPercentage: z.number().int().min(0).max(100).describe('The percentage match between the resume and the job requirements (0-100).'),
  skillsRequired: z.array(z.string()).describe('A list of key skills required for the job.'),
  jobDescriptionSummary: z.string().describe('A brief summary of the job description.'),
  link: z.string().url().optional().describe('An optional link to the job application page.'),
});

const JobRecommendationsOutputSchema = z.object({
  recommendations: z.array(JobRecommendationSchema).describe('A list of job recommendations tailored to the resume.'),
});
export type JobRecommendationsOutput = z.infer<typeof JobRecommendationsOutputSchema>;

export async function recommendJobs(input: JobRecommendationsInput): Promise<JobRecommendationsOutput> {
  return jobRecommendationsFlow(input);
}

const prompt = ai.definePrompt({
  name: 'jobRecommendationsPrompt',
  input: { schema: JobRecommendationsInputSchema },
  output: { schema: JobRecommendationsOutputSchema },
  prompt: `You are an expert career advisor and job recommendation AI. Your goal is to analyze the provided resume and suggest highly relevant job opportunities.

Analyze the user's resume for skills, experience, qualifications, and career aspirations.
Then, generate a list of 3-5 job recommendations. For each job, provide the following details:
- Job Title
- Company Name
- Job Location (e.g., 'Remote', 'New York, NY', 'London, UK')
- A match percentage (0-100) indicating how well the resume aligns with the job.
- A list of key skills required for the job.
- A brief summary of the job description (1-2 sentences).
- An optional, placeholder URL for the job application (e.g., 'https://example.com/job/123').

Prioritize jobs that are a strong match for the resume's content.

Resume: {{media url=resumeDataUri}}`,
});

const jobRecommendationsFlow = ai.defineFlow(
  {
    name: 'jobRecommendationsFlow',
    inputSchema: JobRecommendationsInputSchema,
    outputSchema: JobRecommendationsOutputSchema,
  },
  async (input) => {
    const { output } = await prompt(input);
    return output!;
  }
);
