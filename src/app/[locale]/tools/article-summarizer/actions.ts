'use server';

import { z } from 'zod';
import { summarizeArticle } from '@/ai/flows/article-summarizer';

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
