// Article Summarizer Flow
'use server';

/**
 * @fileOverview A summarization AI agent for guide articles.
 *
 * - summarizeArticle - A function that handles the article summarization process.
 * - ArticleSummarizerInput - The input type for the summarizeArticle function.
 * - ArticleSummarizerOutput - The return type for the summarizeArticle function.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

const ArticleSummarizerInputSchema = z.object({
  articleText: z.string().describe('The text content of the article to summarize.'),
});
export type ArticleSummarizerInput = z.infer<typeof ArticleSummarizerInputSchema>;

const ArticleSummarizerOutputSchema = z.object({
  summary: z.string().describe('A TL;DR summary of the article.'),
});
export type ArticleSummarizerOutput = z.infer<typeof ArticleSummarizerOutputSchema>;

export async function summarizeArticle(input: ArticleSummarizerInput): Promise<ArticleSummarizerOutput> {
  return articleSummarizerFlow(input);
}

const prompt = ai.definePrompt({
  name: 'articleSummarizerPrompt',
  input: {schema: ArticleSummarizerInputSchema},
  output: {schema: ArticleSummarizerOutputSchema},
  prompt: `You are an expert summarizer. Please provide a concise TL;DR summary of the following article. The summary should be no more than 5 sentences long.\n\nArticle:\n{{{articleText}}}`,
});

const articleSummarizerFlow = ai.defineFlow(
  {
    name: 'articleSummarizerFlow',
    inputSchema: ArticleSummarizerInputSchema,
    outputSchema: ArticleSummarizerOutputSchema,
  },
  async input => {
    const {output} = await prompt(input);
    return output!;
  }
);
