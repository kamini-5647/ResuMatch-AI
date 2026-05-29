import { config } from 'dotenv';
config();

import '@/ai/flows/resume-parsing.ts';
import '@/ai/flows/job-recommendations-flow.ts';
import '@/ai/flows/ats-scoring.ts';