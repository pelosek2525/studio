
'use server';

/**
 * @fileOverview A summarization AI agent for guide articles.
 *
 * - summarizeArticle - A function that handles the article summarization process.
 * - ArticleSummarizerInput - The input type for the summarizeArticle function.
 * - ArticleSummarizerOutput - The return type for the summarizeArticle function.
 */

import {ai} from '@/lib/genkit';
import {z} from 'genkit';

const ArticleSummarizerInputSchema = z.object({
  articleText: z.string().min(100, "Article text must be at least 100 characters long."),
});
export type ArticleSummarizerInput = z.infer<typeof ArticleSummarizerInputSchema>;

const ArticleSummarizerOutputSchema = z.object({
  summary: z.string().describe('A TL;DR summary of the article.'),
});
export type ArticleSummarizerOutput = z.infer<typeof ArticleSummarizerOutputSchema>;


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

export async function summarizeArticle(input: ArticleSummarizerInput): Promise<ArticleSummarizerOutput> {
  return articleSummarizerFlow(input);
}


// --- Form Action Logic ---

const formSchema = z.object({
  articleText: z.string().min(100, "Article text must be at least 100 characters long."),
});

interface FormState {
  summary?: string;
  error?: string;
  isError: boolean;
}

export async function generateSummaryAction(prevState: FormState, formData: FormData): Promise<FormState> {
  const validatedFields = formSchema.safeParse({
    articleText: formData.get('articleText'),
  });

  if (!validatedFields.success) {
    return {
      isError: true,
      error: validatedFields.error.flatten().fieldErrors.articleText?.join(', '),
    };
  }

  try {
    const result = await summarizeArticle({ articleText: validatedFields.data.articleText });
    if (result.summary) {
      return { isError: false, summary: result.summary };
    } else {
      return { isError: true, error: "The AI model could not generate a summary. Please try again." };
    }
  } catch (e: any) {
    console.error(e);
    return { isError: true, error: "An unexpected error occurred. Please check the server logs." };
  }
}
