'use server';
/**
 * @fileOverview A Genkit flow for parsing resume documents and extracting key information.
 *
 * - parseResume - A function that handles the resume parsing process.
 * - ResumeParsingInput - The input type for the parseResume function.
 * - ResumeParsingOutput - The return type for the parseResume function.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const ResumeParsingInputSchema = z.object({
  resumeDataUri: z
    .string()
    .describe(
      "A resume document, as a data URI that must include a MIME type (application/pdf or application/vnd.openxmlformats-officedocument.wordprocessingml.document) and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type ResumeParsingInput = z.infer<typeof ResumeParsingInputSchema>;

const ResumeParsingOutputSchema = z.object({
  contactDetails: z.object({
    name: z.string().describe('The full name of the applicant.'),
    email: z.string().email().describe('The email address of the applicant.'),
    phone: z.string().optional().describe('The phone number of the applicant.'),
    linkedin: z.string().url().optional().describe('The LinkedIn profile URL of the applicant.'),
    portfolio: z.string().url().optional().describe('The personal portfolio URL of the applicant.')
  }).describe('Extracted contact and personal information.'),
  skills: z
    .array(z.string())
    .describe('A list of technical and soft skills mentioned in the resume.'),
  experience: z
    .array(
      z.object({
        title: z.string().describe('Job title or role.'),
        company: z.string().describe('Company name.'),
        duration: z.string().describe('Employment duration (e.g., "Jan 2020 - Dec 2022").'),
        description: z.string().optional().describe('Key responsibilities and achievements in the role.'),
      })
    )
    .describe('A list of work experiences.'),
  education: z
    .array(
      z.object({
        degree: z.string().describe('Degree or qualification obtained.'),
        institution: z.string().describe('Educational institution name.'),
        duration: z.string().describe('Study period (e.g., "Sep 2018 - May 2022").'),
      })
    )
    .describe('A list of educational background.'),
  summary: z.string().optional().describe('A brief professional summary or objective if present.')
});
export type ResumeParsingOutput = z.infer<typeof ResumeParsingOutputSchema>;

export async function parseResume(input: ResumeParsingInput): Promise<ResumeParsingOutput> {
  return resumeParsingFlow(input);
}

const resumeParsingPrompt = ai.definePrompt({
  name: 'resumeParsingPrompt',
  input: { schema: ResumeParsingInputSchema },
  output: { schema: ResumeParsingOutputSchema },
  prompt: `You are an expert resume parser. Your task is to extract key information from the provided resume document.

Carefully read the resume and identify the following details:
- Contact Details: Name, Email, Phone number (if available), LinkedIn profile URL (if available), and Personal portfolio URL (if available).
- Skills: A comprehensive list of technical, soft, and industry-specific skills.
- Experience: For each work experience, extract the job title, company name, employment duration, and a brief description of responsibilities and achievements.
- Education: For each educational entry, extract the degree/qualification, institution name, and duration of study.
- Summary: A professional summary or objective if explicitly stated.

Return the extracted information as a JSON object, strictly adhering to the provided output schema. Ensure all fields are correctly populated. If a field is not found, omit optional fields or use an empty array for lists.

Resume Document: {{media url=resumeDataUri}}`,
});

const resumeParsingFlow = ai.defineFlow(
  {
    name: 'resumeParsingFlow',
    inputSchema: ResumeParsingInputSchema,
    outputSchema: ResumeParsingOutputSchema,
  },
  async (input) => {
    const { output } = await resumeParsingPrompt(input);
    return output!;
  }
);
